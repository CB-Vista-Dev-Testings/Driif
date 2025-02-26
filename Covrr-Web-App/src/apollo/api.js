import axios from "axios";
import { refreshToken } from "./refreshToken";

const publicRoutes = ["/login", "/signup", "/forgot-password"];

const handleUnauthorized = () => {
  sessionStorage.clear();
  window.location.href = "/login"; // Using direct navigation instead of useNavigate
};

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 second timeout
});

// Request Interceptor: Add Authorization header
api.interceptors.request.use(
  (config) => {
    const currentPath = window.location.pathname;
    // Skip adding token for public routes
    if (publicRoutes.some((route) => currentPath.includes(route))) {
      return config;
    }
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!error.response) {
      // Network error handling
      return Promise.reject(new Error("Network error occurred"));
    }

    if (error.response.status === 401) {
      try {
        const newAccessToken = await refreshToken();
        const originalRequest = error.config;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        handleUnauthorized();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
