import React from "react";

import {
  WifiIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  GlobeAltIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const NetworkError = ({
  title = "Connection Problem",
  message = "Unable to connect to our servers. Please check your internet connection and try again.",
  onRetry,
  onClose,
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
    <>
      {/* Enhanced backdrop overlay for popup feel */}
      <div
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-all duration-300"
        onClick={onClose}
      />

      {/* Popup container - centered in screen */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center border-2 border-gray-200 relative overflow-hidden transform transition-all duration-500 hover:scale-[1.02] ring-4 ring-white/50">
            {/* Enhanced background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50/90 via-white to-gray-50/50 -z-10"></div>

            {/* Floating particles effect */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
              <div
                className={`absolute -top-2 -left-2 w-4 h-4 ${getIconColor().replace(
                  "text-",
                  "bg-"
                )} rounded-full opacity-20 animate-ping`}
              ></div>
              <div
                className={`absolute -top-1 -right-3 w-3 h-3 ${getIconColor().replace(
                  "text-",
                  "bg-"
                )} rounded-full opacity-30 animate-ping`}
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div
                className={`absolute -bottom-2 -left-1 w-2 h-2 ${getIconColor().replace(
                  "text-",
                  "bg-"
                )} rounded-full opacity-25 animate-ping`}
                style={{ animationDelay: "1s" }}
              ></div>
            </div>

            {/* Close button */}
            {onClose && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-all duration-200 transform hover:scale-110 hover:rotate-90 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                <XMarkIcon className="h-5 w-5 text-gray-500" />
              </button>
            )}

            {/* Enhanced icon with multiple animation layers */}
            <div
              className={`mx-auto flex items-center justify-center h-20 w-20 rounded-2xl ${getBackgroundColor()} mb-6 relative shadow-lg`}
            >
              <div
                className={`absolute inset-0 ${getIconColor().replace(
                  "text-",
                  "bg-"
                )} rounded-2xl opacity-10 animate-pulse`}
              ></div>
              <div
                className={`absolute inset-0 ${getIconColor().replace(
                  "text-",
                  "bg-"
                )} rounded-2xl opacity-5 animate-ping`}
              ></div>
              <Icon
                className={`h-10 w-10 ${getIconColor()} relative z-10 transform transition-transform duration-300 hover:scale-110 hover:rotate-12`}
              />
            </div>

            {/* Enhanced title and message */}
            <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
              {title}
            </h3>

            <p className="text-gray-600 mb-8 leading-relaxed text-base">
              {message}
            </p>

            {/* Enhanced action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {showRetry && onRetry && (
                <button
                  onClick={onRetry}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-500 transform transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                >
                  <ArrowPathIcon className="h-5 w-5 mr-2" />
                  Try Again
                </button>
              )}

              {onClose && (
                <button
                  onClick={onClose}
                  className="inline-flex items-center px-6 py-3 border-2 border-gray-300 text-base font-semibold rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-gray-300 transform transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                >
                  Cancel
                </button>
              )}
            </div>

            {/* Enhanced footer with more styling */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-500 mb-2">
                Check your internet connection and try again
              </p>
              <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
                <span>Error ID: {Date.now()}</span>
                <span>•</span>
                <span>JobPsych AI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NetworkError;
