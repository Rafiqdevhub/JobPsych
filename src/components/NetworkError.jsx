import React from "react";
import {
  WifiIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

const NetworkError = ({
  title = "Connection Problem",
  message = "Unable to connect to our servers. Please check your internet connection and try again.",
  onRetry,
  showRetry = true,
  type = "network",
}) => {
  const getIcon = () => {
    switch (type) {
      case "server":
        return GlobeAltIcon;
      case "timeout":
        return ExclamationTriangleIcon;
      default:
        return WifiIcon;
    }
  };

  const getIconColor = () => {
    switch (type) {
      case "server":
        return "text-red-600";
      case "timeout":
        return "text-orange-600";
      default:
        return "text-blue-600";
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case "server":
        return "bg-red-100";
      case "timeout":
        return "bg-orange-100";
      default:
        return "bg-blue-100";
    }
  };

  const Icon = getIcon();

  return (
    <div className="flex items-center justify-center p-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-100 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-white to-gray-50/30 -z-10"></div>

          <div
            className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full ${getBackgroundColor()} mb-6 relative`}
          >
            <div className="absolute inset-0 bg-current rounded-full opacity-10 animate-pulse"></div>
            <Icon className={`h-8 w-8 ${getIconColor()} relative z-10`} />
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>

          <p className="text-gray-600 mb-6 leading-relaxed">{message}</p>

          {showRetry && onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
            >
              <ArrowPathIcon className="h-5 w-5 mr-2" />
              Try Again
            </button>
          )}

          <div className="mt-6 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              Check your internet connection and try again
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkError;
