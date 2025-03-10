import React, { createContext, useContext, useState } from "react";
import { useToast, ToastProvider } from "../components/common/AppToaster";
import api from "../apollo/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const { showSuccess } = useToast();

  const login = async (credentials) => {
    try {
      const response = await api.post("/login", credentials);
      if (response.status !== 200) {
        throw new Error("Login failed");
      }
      const data = response.data;
      setUser(data.user);
      sessionStorage.setItem("user", JSON.stringify(data.user));
      sessionStorage.setItem("accessToken", data.accessToken);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("accessToken");
    showSuccess("Logout Successful", "You have been logged out successfully");
    window.location.href = "/login";
  };

  return (
    <ToastProvider>
      <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
    </ToastProvider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
