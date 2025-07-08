import React, { createContext, useContext, useState, useCallback } from "react";
import Toast from "./Toast";
import {
  formatErrorMessage,
  getErrorType,
  getErrorCategory,
} from "../utils/errorHandler";

// Toast Manager Context
export const ToastContext = createContext();

// Toast Manager Provider
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toastData) => {
    const id = Date.now() + Math.random();
    const toast = {
      id,
      ...toastData,
      timestamp: new Date(),
    };

    setToasts((prev) => [...prev, toast]);

    // Auto-remove after duration if specified
    if (toast.duration !== 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, toast.duration || 5000);
    }

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const removeAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  // Enhanced error handler
  const showError = useCallback(
    (error, options = {}) => {
      const errorType = getErrorType(error);
      const errorCategory = getErrorCategory(error);
      const message = formatErrorMessage(error);

      const toastData = {
        type: "error",
        title: options.title || "Error",
        message: options.message || message,
        duration: options.duration !== undefined ? options.duration : 6000,
        showProgress: options.showProgress !== false,
        position: options.position || "top-right",
        actions: options.actions || null,
        errorData: {
          originalError: error,
          errorType,
          errorCategory,
        },
      };

      return addToast(toastData);
    },
    [addToast]
  );

  const showSuccess = useCallback(
    (message, options = {}) => {
      const toastData = {
        type: "success",
        title: options.title || "Success",
        message,
        duration: options.duration !== undefined ? options.duration : 4000,
        showProgress: options.showProgress !== false,
        position: options.position || "top-right",
        actions: options.actions || null,
      };

      return addToast(toastData);
    },
    [addToast]
  );

  const showWarning = useCallback(
    (message, options = {}) => {
      const toastData = {
        type: "warning",
        title: options.title || "Warning",
        message,
        duration: options.duration !== undefined ? options.duration : 5000,
        showProgress: options.showProgress !== false,
        position: options.position || "top-right",
        actions: options.actions || null,
      };

      return addToast(toastData);
    },
    [addToast]
  );

  const showInfo = useCallback(
    (message, options = {}) => {
      const toastData = {
        type: "info",
        title: options.title || "Information",
        message,
        duration: options.duration !== undefined ? options.duration : 4000,
        showProgress: options.showProgress !== false,
        position: options.position || "top-right",
        actions: options.actions || null,
      };

      return addToast(toastData);
    },
    [addToast]
  );

  const value = {
    toasts,
    addToast,
    removeToast,
    removeAllToasts,
    showError,
    showSuccess,
    showWarning,
    showInfo,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

// Toast Container Component
const ToastContainer = () => {
  const { toasts, removeToast } = useContext(ToastContext);

  // Group toasts by position
  const toastsByPosition = toasts.reduce((acc, toast) => {
    const position = toast.position || "top-right";
    if (!acc[position]) acc[position] = [];
    acc[position].push(toast);
    return acc;
  }, {});

  return (
    <>
      {Object.entries(toastsByPosition).map(([position, positionToasts]) => (
        <div key={position} className="fixed z-50 pointer-events-none">
          <div className={getPositionContainerClasses(position)}>
            {positionToasts.map((toast) => (
              <div
                key={toast.id}
                className="pointer-events-auto mb-4 last:mb-0"
              >
                <Toast
                  {...toast}
                  show={true}
                  onClose={() => removeToast(toast.id)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

// Helper function for container positioning
const getPositionContainerClasses = (position) => {
  switch (position) {
    case "top-left":
      return "top-4 left-4 flex flex-col max-w-sm";
    case "top-center":
      return "top-4 left-1/2 transform -translate-x-1/2 flex flex-col max-w-sm";
    case "top-right":
    default:
      return "top-4 right-4 flex flex-col max-w-sm";
    case "bottom-left":
      return "bottom-4 left-4 flex flex-col-reverse max-w-sm";
    case "bottom-center":
      return "bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col-reverse max-w-sm";
    case "bottom-right":
      return "bottom-4 right-4 flex flex-col-reverse max-w-sm";
  }
};

// Custom hook to use toast
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export default ToastProvider;
