import api from "../apollo/api";
import { handleError } from "../utils/errorHandler";

// Loading state management
let loadingCount = 0;
const loadingCallbacks = [];

export const registerLoadingCallback = (callback) => {
  loadingCallbacks.push(callback);
};

const setLoading = (isLoading) => {
  if (isLoading) {
    loadingCount++;
  } else {
    loadingCount = Math.max(0, loadingCount - 1);
  }

  const isAnyRequestLoading = loadingCount > 0;
  loadingCallbacks.forEach((callback) => callback(isAnyRequestLoading));
};

/**
 * Make a GET request to the specified URL
 * @param {String} url - The endpoint URL
 * @param {Boolean} showError - Whether to show error toast on failure
 * @returns {Promise<Object>} Response data
 */
export const getRequest = async (url, showError = true) => {
  setLoading(true);
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    handleError(error, showError);
    throw error;
  } finally {
    setLoading(false);
  }
};

/**
 * Make a POST request to the specified URL
 * @param {String} url - The endpoint URL
 * @param {Object} data - The data to send
 * @param {Boolean} showError - Whether to show error toast on failure
 * @returns {Promise<Object>} Response data
 */
export const postRequest = async (url, data, showError = true) => {
  setLoading(true);
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    handleError(error, showError);
    throw error;
  } finally {
    setLoading(false);
  }
};

/**
 * Make a PUT request to the specified URL
 * @param {String} url - The endpoint URL
 * @param {Object} data - The data to send
 * @param {Boolean} showError - Whether to show error toast on failure
 * @returns {Promise<Object>} Response data
 */
export const putRequest = async (url, data, showError = true) => {
  setLoading(true);
  try {
    const response = await api.put(url, data);
    return response.data;
  } finally {
    setLoading(false);
  }
};

/**
 * Make a DELETE request to the specified URL
 * @param {String} url - The endpoint URL
 * @param {Boolean} showError - Whether to show error toast on failure
 * @returns {Promise<Object>} Response data
 */
export const deleteRequest = async (url, showError = true) => {
  setLoading(true);
  try {
    const response = await api.delete(url);
    return response.data;
  } catch (error) {
    handleError(error, showError);
    throw error;
  } finally {
    setLoading(false);
  }
};
