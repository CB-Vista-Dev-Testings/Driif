import { useCallback } from "react";
import { getRequest, postRequest, putRequest } from "../services/apiService";
import { useToast } from "../components/common/AppToaster";

export const useApi = () => {
  const { showSuccess, showError } = useToast();

  const get = useCallback(
    async (url, options = {}) => {
      try {
        return await getRequest(url, {
          onError: showError,
          ...options,
        });
      } catch (error) {
        console.error("GET request failed:", error);
        throw error;
      }
    },
    [showError]
  );

  const post = useCallback(
    async (url, data, options = {}) => {
      try {
        return await postRequest(url, data, {
          onError: showError,
          ...options,
        });
      } catch (error) {
        console.error("POST request failed:", error);
        throw error;
      }
    },
    [showError]
  );

  const put = useCallback(
    async (url, data, options = {}) => {
      try {
        return await putRequest(url, data, {
          onError: showError,
          ...options,
        });
      } catch (error) {
        console.error("PUT request failed:", error);
        throw error;
      }
    },
    [showError]
  );

  return {
    get,
    post,
    put,
  };
};
