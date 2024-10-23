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

  // Flag to prevent multiple refresh attempts
  let isRefreshing = false;
  // Store pending requests
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
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          // If refreshing, add request to queue
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
          // Redirect to login on refresh failure
          document.getElementById("login-dialog-button")?.click();
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    },
  );

  return instance;
}
