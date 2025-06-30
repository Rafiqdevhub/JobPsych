import React, { Fragment } from "react";

const XCircleIcon = ({ className, ...props }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const ExclamationTriangleIcon = ({ className, ...props }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
    />
  </svg>
);

const CheckCircleIcon = ({ className, ...props }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const XMarkIcon = ({ className, ...props }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const SimpleTransition = ({ show, children, className = "" }) => {
  if (!show) return null;
  return (
    <div className={`transition-all duration-300 ${className}`}>{children}</div>
  );
};

const ICONS = {
  error: XCircleIcon,
  warning: ExclamationTriangleIcon,
  success: CheckCircleIcon,
};

const STYLES = {
  error:
    "bg-gradient-to-r from-red-50 to-red-50/80 text-red-800 border-red-200 shadow-lg shadow-red-100/50 backdrop-blur-sm",
  warning:
    "bg-gradient-to-r from-yellow-50 to-amber-50/80 text-yellow-800 border-yellow-200 shadow-lg shadow-yellow-100/50 backdrop-blur-sm",
  success:
    "bg-gradient-to-r from-green-50 to-emerald-50/80 text-green-800 border-green-200 shadow-lg shadow-green-100/50 backdrop-blur-sm",
};

const ICON_STYLES = {
  error: "text-red-500 animate-bounce",
  warning: "text-yellow-500 animate-pulse",
  success: "text-green-500 animate-bounce",
};

function Toast({ message, type = "error", show, onClose }) {
  if (show && onClose) {
    setTimeout(() => {
      onClose();
    }, 5000);
  }

  if (!show) return null;

  const Icon = ICONS[type] || XCircleIcon;

  return (
    <SimpleTransition
      show={show}
      className="fixed top-4 right-4 z-50 w-full max-w-md transform-gpu"
    >
      <div
        className={`rounded-xl border-2 p-4 ${STYLES[type]} hover:scale-102 transition-all duration-300 ease-in-out`}
        style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)" }}
      >
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0 relative">
            <div className="absolute -inset-1 rounded-full blur-sm opacity-30 bg-current"></div>
            <Icon
              className={`h-6 w-6 relative ${ICON_STYLES[type]}`}
              aria-hidden="true"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold tracking-wide leading-5">
              {message || "An error occurred"}
            </p>
          </div>
          {onClose && (
            <div className="flex-shrink-0">
              <button
                type="button"
                className={`transform transition-all duration-200 inline-flex rounded-full p-1.5 hover:scale-110 hover:bg-opacity-10 hover:bg-current focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  type === "error"
                    ? "focus:ring-red-500"
                    : type === "warning"
                    ? "focus:ring-yellow-500"
                    : "focus:ring-green-500"
                }`}
                onClick={onClose}
              >
                <span className="sr-only">Close</span>
                <XMarkIcon
                  className={`h-5 w-5 transform hover:rotate-90 transition-transform duration-200 ${ICON_STYLES[type]}`}
                  aria-hidden="true"
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </SimpleTransition>
  );
}

export default Toast;
