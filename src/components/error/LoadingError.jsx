import React from "react";

import {
  ExclamationCircleIcon,
  ArrowPathIcon,
  DocumentIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const LoadingError = ({
  title = "Upload Failed",
  message = "We couldn't process your resume. Please try again with a different file.",
  onRetry,
  onReset,
  onClose,
  showRetry = true,
  showReset = true,
  type = "upload",
}) => {
  const getDetails = () => {
    switch (type) {
      case "analysis":
        return {
          title: "Analysis Failed",
          message:
            "We encountered an issue while analyzing your resume. Please try again.",
          suggestions: [
            "Make sure your resume is in PDF or DOCX format",
            "Check that the file is not corrupted",
            "Ensure the file size is under 5MB",
          ],
        };
      case "upload":
        return {
          title: "Upload Failed",
          message: "We couldn't upload your resume. Please try again.",
          suggestions: [
            "Check your internet connection",
            "Make sure the file format is supported",
            "Try uploading a smaller file",
          ],
        };
      default:
        return {
          title,
          message,
          suggestions: [],
        };
    }
  };

  const details = getDetails();

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-all duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="max-w-lg w-full">
          <div className="bg-slate-800 rounded-3xl shadow-2xl p-8 text-center border-2 border-slate-600 relative overflow-hidden transform transition-all duration-500 hover:scale-[1.02] ring-4 ring-slate-700/50">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800/90 via-slate-700/70 to-slate-800/90 -z-10"></div>

            <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-red-400 rounded-full opacity-20 animate-ping"></div>
              <div
                className="absolute -top-1 -right-3 w-3 h-3 bg-orange-400 rounded-full opacity-30 animate-ping"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div
                className="absolute -bottom-2 -left-1 w-2 h-2 bg-yellow-400 rounded-full opacity-25 animate-ping"
                style={{ animationDelay: "1s" }}
              ></div>
            </div>

            {onClose && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-700 transition-all duration-200 transform hover:scale-110 hover:rotate-90 focus:outline-none focus:ring-2 focus:ring-slate-500"
              >
                <XMarkIcon className="h-5 w-5 text-slate-400" />
              </button>
            )}

            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-2xl bg-gradient-to-br from-red-500/20 to-red-600/20 mb-6 relative shadow-lg border border-red-500/30">
              <div className="absolute inset-0 bg-red-500 rounded-2xl opacity-10 animate-pulse"></div>
              <div className="absolute inset-0 bg-red-400 rounded-2xl opacity-5 animate-ping"></div>
              <ExclamationCircleIcon className="h-10 w-10 text-red-400 relative z-10 transform transition-transform duration-300 hover:scale-110 hover:rotate-12" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
              {details.title}
            </h3>

            <p className="text-slate-300 mb-8 leading-relaxed text-base">
              {details.message}
            </p>

            {details.suggestions.length > 0 && (
              <div className="mb-8 p-6 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 rounded-xl border-2 border-indigo-500/30 text-left shadow-md">
                <h4 className="text-base font-bold text-indigo-300 mb-3 flex items-center">
                  <DocumentIcon className="h-5 w-5 mr-2" />
                  Try these solutions:
                </h4>
                <ul className="text-sm text-indigo-200 space-y-2">
                  {details.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-indigo-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {showRetry && onRetry && (
                <button
                  onClick={onRetry}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-indigo-500 transform transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                >
                  <ArrowPathIcon className="h-5 w-5 mr-2" />
                  Try Again
                </button>
              )}

              {showReset && onReset && (
                <button
                  onClick={onReset}
                  className="inline-flex items-center px-6 py-3 border-2 border-slate-600 text-base font-semibold rounded-xl text-slate-300 bg-slate-700 hover:bg-slate-600 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-slate-500 transform transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                >
                  <DocumentIcon className="h-5 w-5 mr-2" />
                  Upload New File
                </button>
              )}

              {onClose && (
                <button
                  onClick={onClose}
                  className="inline-flex items-center px-6 py-3 border-2 border-slate-600 text-base font-semibold rounded-xl text-slate-300 bg-slate-700 hover:bg-slate-600 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-slate-500 transform transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                >
                  Cancel
                </button>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-600">
              <p className="text-sm text-slate-400 mb-2">
                Need help? Make sure your resume is properly formatted and try
                again.
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

export default LoadingError;
