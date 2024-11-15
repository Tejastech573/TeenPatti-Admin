// src/api/axiosInstance.ts
import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import { deleteCookie, getCookie } from "cookies-next";

// Define adapted Axios request configuration to ensure headers are properly typed
interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders;
}

// Determine the base URL from environment variables and enforce HTTPS
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(
  "http://",
  "https://",
);

// Create an axios instance with the dynamic base URL and a 20-second timeout
export const axiosInstance = axios.create({
  baseURL,
  timeout: 20000, // 20 seconds
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config): AdaptAxiosRequestConfig => {
    const token = getCookie("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config as AdaptAxiosRequestConfig;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  },
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  async (response) => {
    // If the API returns status 405, clear cookies and redirect to the login page
    if (response.data.status === "405") {
      deleteCookie("token");
      deleteCookie("userId");
      deleteCookie("username");
      window.location.href = "/";
    }
    return response;
  },
  async (error) => {
    console.error("Response error:", error);

    // Timeout Error Handling
    if (error.code === "ECONNABORTED") {
      console.error("Request timed out.");
      // You could add additional handling here, like showing a user notification
    }

    // Unauthorized Error Handling
    if (error.response?.status === 401) {
      deleteCookie("token");
      window.location.href = "/";
    }

    return Promise.reject(error);
  },
);
