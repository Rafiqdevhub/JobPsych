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
        return "bg-red-500/20";
      case "timeout":
        return "bg-orange-500/20";
      default:
        return "bg-indigo-500/20";
    }
  };

  const Icon = getIcon();

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-all duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-slate-800 rounded-3xl shadow-2xl p-8 text-center border-2 border-slate-600 relative overflow-hidden transform transition-all duration-500 hover:scale-[1.02] ring-4 ring-slate-700/50">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800/90 via-slate-800 to-slate-700/50 -z-10"></div>

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

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-700 transition-all duration-200 transform hover:scale-110 hover:rotate-90 focus:outline-none focus:ring-2 focus:ring-slate-500"
              >
                <XMarkIcon className="h-5 w-5 text-slate-400" />
              </button>
            )}

            <div
              className={`mx-auto flex items-center justify-center h-20 w-20 rounded-2xl ${getBackgroundColor()} mb-6 relative shadow-lg border border-slate-600`}
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

            <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
              {title}
            </h3>

            <p className="text-slate-300 mb-8 leading-relaxed text-base">
              {message}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {showRetry && onRetry && (
                <button
                  type="button"
                  onClick={onRetry}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-indigo-500 transform transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                >
                  <ArrowPathIcon className="h-5 w-5 mr-2" />
                  Try Again
                </button>
              )}

              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center px-6 py-3 border-2 border-slate-600 text-base font-semibold rounded-xl text-slate-300 bg-slate-700 hover:bg-slate-600 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-slate-500 transform transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                >
                  Cancel
                </button>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-600">
              <p className="text-sm text-slate-400 mb-2">
                Check your internet connection and try again
              </p>
              <div className="flex items-center justify-center space-x-4 text-xs text-slate-500">
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
