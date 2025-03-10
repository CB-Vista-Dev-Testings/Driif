import React, { createContext, useContext, useState, useEffect } from "react";
import { registerLoadingCallback } from "../../services/apiService";
import { ProgressSpinner } from "primereact/progressspinner";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    registerLoadingCallback((loading) => {
      setIsLoading(loading);
    });
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading }}>
      {children}
      {isLoading && (
        <div className="global-loading-overlay">
          <ProgressSpinner strokeWidth="4" />
        </div>
      )}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
