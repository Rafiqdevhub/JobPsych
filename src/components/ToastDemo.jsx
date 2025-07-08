import React from "react";
import { useToast } from "../hooks/useToast";

const ToastDemo = () => {
  const { showError, showSuccess, showWarning, showInfo } = useToast();

  const demoErrors = [
    {
      title: "Network Error Demo",
      message:
        "Failed to connect to the server. Please check your internet connection.",
      errorData: { errorType: "network", errorCategory: "network" },
      actions: [
        { label: "Retry", onClick: () => {}, variant: "primary" },
        { label: "Cancel", onClick: () => {} },
      ],
    },
    {
      title: "Server Error Demo",
      message: "Internal server error occurred. Our team has been notified.",
      errorData: { errorType: "server", errorCategory: "server" },
      actions: [
        { label: "Report Issue", onClick: () => {}, variant: "primary" },
      ],
    },
    {
      title: "File Upload Error Demo",
      message:
        "The file format is not supported. Please upload a PDF or DOCX file.",
      errorData: { errorType: "file", errorCategory: "upload" },
      actions: [
        { label: "Choose File", onClick: () => {}, variant: "primary" },
        { label: "Learn More", onClick: () => {} },
      ],
    },
    {
      title: "Rate Limit Error Demo",
      message:
        "You have exceeded the daily upload limit. Please try again tomorrow.",
      errorData: { errorType: "rate_limit", errorCategory: "limit" },
      actions: [
        { label: "Upgrade Plan", onClick: () => {}, variant: "primary" },
      ],
    },
    {
      title: "Timeout Error Demo",
      message: "The request timed out. Please try again.",
      errorData: { errorType: "timeout", errorCategory: "network" },
      actions: [{ label: "Try Again", onClick: () => {}, variant: "primary" }],
    },
  ];

  const handleShowError = (errorConfig) => {
    showError("Demo error message", {
      title: errorConfig.title,
      message: errorConfig.message,
      actions: errorConfig.actions,
      duration: 8000, // Longer duration for demo
      errorData: errorConfig.errorData,
    });
  };

  return (
    <div className="p-8 space-y-6 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Enhanced Error Toast Demo
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Error Types
          </h2>

          {demoErrors.map((error, index) => (
            <button
              key={index}
              onClick={() => handleShowError(error)}
              className="w-full p-4 text-left bg-gradient-to-r from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100 rounded-xl border-2 border-red-200 hover:border-red-300 transition-all duration-200 transform hover:scale-[1.02]"
            >
              <div className="font-semibold text-red-900">{error.title}</div>
              <div className="text-sm text-red-700 mt-1">{error.message}</div>
              <div className="text-xs text-red-600 mt-2">
                Type: {error.errorData.errorType} | Category:{" "}
                {error.errorData.errorCategory}
              </div>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4 mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Other Toast Types
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() =>
                showSuccess("Operation completed successfully!", {
                  title: "Success!",
                  actions: [
                    {
                      label: "Continue",
                      onClick: () => {},
                      variant: "primary",
                    },
                  ],
                })
              }
              className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 rounded-xl border-2 border-green-200 hover:border-green-300 transition-all duration-200 transform hover:scale-[1.02]"
            >
              <div className="font-semibold text-green-900">Success Toast</div>
              <div className="text-sm text-green-700">Show success message</div>
            </button>

            <button
              onClick={() =>
                showWarning("This action cannot be undone.", {
                  title: "Warning",
                  actions: [
                    { label: "Proceed", onClick: () => {}, variant: "primary" },
                    { label: "Cancel", onClick: () => {} },
                  ],
                })
              }
              className="p-4 bg-gradient-to-r from-yellow-50 to-amber-50 hover:from-yellow-100 hover:to-amber-100 rounded-xl border-2 border-yellow-200 hover:border-yellow-300 transition-all duration-200 transform hover:scale-[1.02]"
            >
              <div className="font-semibold text-yellow-900">Warning Toast</div>
              <div className="text-sm text-yellow-700">
                Show warning message
              </div>
            </button>

            <button
              onClick={() =>
                showInfo("New features are now available!", {
                  title: "Info",
                  actions: [
                    {
                      label: "Learn More",
                      onClick: () => {},
                      variant: "primary",
                    },
                  ],
                })
              }
              className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-xl border-2 border-blue-200 hover:border-blue-300 transition-all duration-200 transform hover:scale-[1.02]"
            >
              <div className="font-semibold text-blue-900">Info Toast</div>
              <div className="text-sm text-blue-700">Show info message</div>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Features</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Error-specific icons and colors
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Enhanced animations and hover effects
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Backdrop blur and overlay effect
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Floating particles and pulse animations
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Contextual action buttons
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Auto-categorization based on error type
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ToastDemo;
