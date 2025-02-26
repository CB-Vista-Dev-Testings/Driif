import axios from "axios";

export const refreshToken = async () => {
  try {
    const refreshToken = sessionStorage.getItem("refreshToken");

    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/auth/refresh-token`,
      { refreshToken },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { accessToken } = response.data;
    sessionStorage.setItem("accessToken", accessToken);

    return accessToken;
  } catch (error) {
    throw new Error("Failed to refresh token");
  }
};
