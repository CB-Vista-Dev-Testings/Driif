import axios from "axios";
import { store } from "../store";

export const refreshToken = async () => {
  try {
    const state = store.getState();
    const refreshToken = state.auth.refreshToken;

    if (!refreshToken) {
      console.error("🚫 Refresh failed: No refresh token available");
      throw new Error("No refresh token available");
    }

    console.log("🔄 Attempting to refresh token...");
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/auth/refresh-token`,
      { refreshToken },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { accessToken } = response.data;
    if (!accessToken) {
      throw new Error("No access token received");
    }

    console.log("✅ Token refresh successful");
    store.dispatch({
      type: "LOGIN_SUCCESS",
      payload: {
        ...state.auth,
        accessToken,
      },
    });

    return accessToken;
  } catch (error) {
    console.error("🚫 Token refresh error:", error.message);
    throw new Error("Failed to refresh token");
  }
};
