import { postRequest } from "./apiService";
import { ENDPOINTS } from "../config/apiConfig";

export const login = async (credentials, showError) => {
  return await postRequest(ENDPOINTS.LOGIN, credentials, showError);
};

export const changePassword = async (data, showError) => {
  return await postRequest(ENDPOINTS.CHANGE_PASSWORD, data, showError);
};
