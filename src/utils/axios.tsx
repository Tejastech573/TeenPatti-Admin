import axios, {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosError,
} from "axios";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders;
}

// Determine the base URL based on the environment
const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://admin-panel-env.eba-wrphxypt.ap-south-1.elasticbeanstalk.com/api";

// Create an axios instance with the dynamic base URL
export const axiosInstance = axios.create({
  baseURL,
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
  (response) => {
    if (response.data.status === "405") {
      deleteCookie("token");
      window.location.href = "/";
    }
    return response;
  },
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Unauthorized: Clear cookies and redirect to login
      deleteCookie("token");
      window.location.href = "/login";
    } else if (error.response?.status === 400) {
      // Handle 400 errors more gracefully
      console.error("Bad Request:", error.response.data);
      return Promise.reject({
        status: 400,
        message: error.response.data || "Bad Request",
      });
    }
    return Promise.reject(error);
  },
);
