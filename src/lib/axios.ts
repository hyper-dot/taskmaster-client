import { refreshToken } from "@/actions/auth.actions";
import { useSession } from "@/providers/SessionProvider";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export function useApiClient() {
  const { accessToken } = useSession();
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  let isRefreshing = false;
  let failedQueue: any[] = [];

  const processQueue = (error: any = null) => {
    failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve();
      }
    });
    failedQueue = [];
  };

  instance.interceptors.response.use(
    (response) => response.data,
    async (error) => {
      const originalRequest = error.config;

      // Handle server error response
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }

      // Handle 401 and token refresh
      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then(() => instance.request(originalRequest))
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          await refreshToken();
          processQueue();
          isRefreshing = false;
          return instance.request(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError);
          isRefreshing = false;
          document.getElementById("login-dialog-button")?.click();
          return Promise.reject(refreshError);
        }
      }

      // If no specific error format, throw the original error
      return Promise.reject(
        error.response?.data?.error ||
          error.message ||
          "An unexpected error occurred",
      );
    },
  );

  return instance;
}
