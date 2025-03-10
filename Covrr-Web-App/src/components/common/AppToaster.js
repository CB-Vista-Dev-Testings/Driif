import React, { createContext, useContext, useRef, useEffect } from "react";
import { Toast } from "primereact/toast";
import { setToastRef } from "../../utils/errorHandler";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const toast = useRef(null);

  const showToast = (severity, summary, detail, life = 3000) => {
    toast.current?.show({
      severity, // 'success' | 'info' | 'warn' | 'error'
      summary,
      detail,
      life,
    });
  };

  const showSuccess = (summary, detail) => showToast("success", summary, detail);
  const showError = (summary, detail) => showToast("error", summary, detail);
  const showInfo = (summary, detail) => showToast("info", summary, detail);
  const showWarn = (summary, detail) => showToast("warn", summary, detail);

  // Register the toast methods with our error handler
  useEffect(() => {
    setToastRef({ showSuccess, showError, showInfo, showWarn });
  }, []);

  return (
    <ToastContext.Provider value={{ showSuccess, showError, showInfo, showWarn }}>
      <Toast ref={toast} position="top-right" />
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
