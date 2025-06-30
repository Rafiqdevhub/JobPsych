import React from "react";
import {
  ExclamationCircleIcon,
  ArrowPathIcon,
  DocumentIcon,
} from "@heroicons/react/24/outline";

const LoadingError = ({
  title = "Upload Failed",
  message = "We couldn't process your resume. Please try again with a different file.",
  onRetry,
  onReset,
  showRetry = true,
  showReset = true,
  type = "upload", // "upload", "analysis", "general"
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
    <div className="flex items-center justify-center p-8">
      <div className="max-w-lg w-full">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-100 relative overflow-hidden">
          {/* Decorative background */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-50/30 via-orange-50/20 to-yellow-50/30 -z-10"></div>

          {/* Icon */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6 relative">
            <div className="absolute inset-0 bg-red-500 rounded-full opacity-10 animate-pulse"></div>
            <ExclamationCircleIcon className="h-8 w-8 text-red-600 relative z-10" />
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            {details.title}
          </h3>

          {/* Message */}
          <p className="text-gray-600 mb-6 leading-relaxed">
            {details.message}
          </p>

          {/* Suggestions */}
          {details.suggestions.length > 0 && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100 text-left">
              <h4 className="text-sm font-semibold text-blue-800 mb-2 flex items-center">
                <DocumentIcon className="h-4 w-4 mr-1" />
                Try these solutions:
              </h4>
              <ul className="text-sm text-blue-700 space-y-1">
                {details.suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {showRetry && onRetry && (
              <button
                onClick={onRetry}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
              >
                <ArrowPathIcon className="h-5 w-5 mr-2" />
                Try Again
              </button>
            )}

            {showReset && onReset && (
              <button
                onClick={onReset}
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
              >
                <DocumentIcon className="h-5 w-5 mr-2" />
                Upload New File
              </button>
            )}
          </div>

          {/* Help Text */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              Need help? Make sure your resume is properly formatted and try
              again.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingError;
