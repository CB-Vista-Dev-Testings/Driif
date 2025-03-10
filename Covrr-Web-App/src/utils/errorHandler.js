import { store } from "../store";

// Singleton to hold toast reference
let toastRef = null;

/**
 * Set the toast reference for the error handler
 * @param {Object} toast - Toast reference from useToast()
 */
export const setToastRef = (toast) => {
  toastRef = toast;
};

/**
 * Extract a readable error message from various error formats
 * @param {Error|Object} error - The error object
 * @returns {String} A user-friendly error message
 */
export const getErrorMessage = (error) => {
  if (!error) return "An unknown error occurred";

  // Handle axios error responses
  if (error.response && error.response.data) {
    if (error.response.data.message) {
      return error.response.data.message;
    } else if (error.response.data.detail && error.response.data.detail.message) {
      return error.response.data.detail.message;
    } else if (typeof error.response.data === "string") {
      return error.response.data;
    }
  }

  // Handle regular Error objects or strings
  if (error.message) return error.message;
  if (typeof error === "string") return error;

  return "Something went wrong";
};

/**
 * Display error using toast notification if showError is true
 * @param {Error|Object} error - The error object
 * @param {Boolean} showError - Whether to show the error toast
 * @returns {String} The error message
 */
export const handleError = (error, showError = true) => {
  const errorMessage = getErrorMessage(error);
  if (showError && toastRef) {
    toastRef.showError(errorMessage);
  }
  // console.error("API Error:", error);
  return errorMessage;
};

/**
 * Create a global error handler that can be used outside of React components
 * @returns {Function} Error handler function
 */
export const createGlobalErrorHandler = () => {
  return (error, showError = true) => handleError(error, showError);
};

// Initialize a global error handler that can be imported directly
export const globalErrorHandler = createGlobalErrorHandler();
