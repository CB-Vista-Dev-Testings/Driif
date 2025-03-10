import axios from "axios";
import { store } from "../store";
import { refreshToken } from "./refreshToken";
import { globalErrorHandler } from "../utils/errorHandler";

const publicRoutes = ["/login", "/signup", "/forgot-password"];
const isProduction = process.env.NODE_ENV === "production";

// Helper for generating unique request IDs
const generateRequestId = () => Math.random().toString(36).substring(2, 15);

const handleUnauthorized = () => {
  console.log("🔒 Authorization failed, redirecting to login");
  store.dispatch({ type: "LOGOUT" });
  window.location.href = "/login";
};

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 second timeout
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    // Add request ID and timestamp
    const requestId = generateRequestId();
    config.requestId = requestId;
    config.timestamp = Date.now();

    // Log outgoing requests in development
    // if (!isProduction) {
    //   console.log(`Request ${requestId} [${config.method.toUpperCase()}] ${config.url}`, config.data ? config.data : "");
    // }

    // Add auth token if needed
    const currentPath = window.location.pathname;
    if (!publicRoutes.some((route) => currentPath.includes(route))) {
      const state = store.getState();
      const token = state.auth.accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    globalErrorHandler(error);
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    const requestId = response.config.requestId;
    const elapsed = Date.now() - response.config.timestamp;

    // Only log response data in non-production
    // if (!isProduction) {
    //   console.log(`Response ${requestId} [${elapsed}ms]:`, response.data);
    // }
    return response;
  },
  async (error) => {
    // Handle different error scenarios
    if (!error.response) {
      const networkError = new Error("Network error occurred. Please check your connection.");
      return Promise.reject(networkError);
    }

    const requestId = error.config?.requestId || "unknown";
    const elapsed = error.config?.timestamp ? Date.now() - error.config.timestamp : 0;

    if (!isProduction) {
      console.error(`Error ${requestId} [${elapsed}ms] ${error.response.status}:`, error.response.data);
    }

    // Handle authentication errors
    if (error.response.status === 401) {
      try {
        console.log("🔄 Access token expired, attempting refresh...");
        const newAccessToken = await refreshToken();

        // Retry the original request with new token
        const originalRequest = error.config;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.log("🚫 Token refresh failed");
        handleUnauthorized();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
