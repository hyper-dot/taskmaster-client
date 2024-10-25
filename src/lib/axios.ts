import { logout, refreshToken } from "@/actions/auth.actions";
import { API_URL } from "@/constants";
import { useSession } from "@/providers/SessionProvider"; // Added updateSession to handle accessToken update
import axios from "axios";

// Axios instance creation with default settings
export const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export function useApiClient() {
  const { accessToken } = useSession(); // Retrieve accessToken from the session

  const instance = axios.create({
    baseURL: API_URL,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`, // Use initial accessToken
    },
  });

  // Add a response interceptor to handle 401 errors
  instance.interceptors.response.use(
    (response) => response.data, // Return the response if successful
    async (error) => {
      const originalRequest = error.config; // Save the original request
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // Mark request to avoid infinite loop

        refreshToken()
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return instance(originalRequest);
          })
          .catch((tokenError) => {
            logout();
            return Promise.reject(
              (tokenError as any).response?.data?.error ||
                "Token refresh failed",
            );
          });
      }

      // Extract the error message from the response and reject with that
      const errorMessage = error.response?.data?.error || "An error occurred";
      return Promise.reject(errorMessage);
    },
  );

  return instance;
}
