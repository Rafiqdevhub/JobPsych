import React, { useEffect, useState } from "react";

// Enhanced Icon Components with animations
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

// New enhanced icons
const AlertCircleIcon = ({ className, ...props }) => (
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
      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const ShieldExclamationIcon = ({ className, ...props }) => (
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
      d="M12 9v2m0 4h.01m-6 5.5h12a6 6 0 006-6V4.5a6 6 0 00-6-6H6a6 6 0 00-6 6V15.5a6 6 0 006 6z"
    />
  </svg>
);

const WifiOffIcon = ({ className, ...props }) => (
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
      d="M3 3l18 18m-6.5-5.5A4.5 4.5 0 0015 12a4.5 4.5 0 00-6-4.24m-2.78 7.78A9 9 0 003 12a9 9 0 003.32-6.92m11.36 11.36A9 9 0 0021 12a9 9 0 00-3.32-6.92"
    />
  </svg>
);

const ServerIcon = ({ className, ...props }) => (
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
      d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
    />
  </svg>
);

const ClockIcon = ({ className, ...props }) => (
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
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const DocumentIcon = ({ className, ...props }) => (
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
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

const InfoIcon = ({ className, ...props }) => (
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
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
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

// Enhanced Toast Configuration with error-specific styling
const TOAST_CONFIG = {
  error: {
    icon: XCircleIcon,
    iconBg: "bg-gradient-to-br from-red-100 to-red-200",
    iconColor: "text-red-600",
    titleColor: "text-red-900",
    messageColor: "text-red-700",
    borderColor: "border-red-300",
    bgGradient: "from-red-50/90 via-white to-red-50/50",
    shadowColor: "shadow-red-200/60",
    progressBg: "bg-gradient-to-r from-red-500 to-red-600",
    buttonHover: "hover:bg-red-50",
    ringColor: "focus:ring-red-500",
    glowColor: "shadow-red-500/30",
    pulseColor: "bg-red-400",
    backdropBlur: "backdrop-blur-md",
  },
  // Network-specific error styling
  networkError: {
    icon: WifiOffIcon,
    iconBg: "bg-gradient-to-br from-orange-100 to-orange-200",
    iconColor: "text-orange-600",
    titleColor: "text-orange-900",
    messageColor: "text-orange-700",
    borderColor: "border-orange-300",
    bgGradient: "from-orange-50/90 via-white to-orange-50/50",
    shadowColor: "shadow-orange-200/60",
    progressBg: "bg-gradient-to-r from-orange-500 to-orange-600",
    buttonHover: "hover:bg-orange-50",
    ringColor: "focus:ring-orange-500",
    glowColor: "shadow-orange-500/30",
    pulseColor: "bg-orange-400",
    backdropBlur: "backdrop-blur-md",
  },
  // Server error styling
  serverError: {
    icon: ServerIcon,
    iconBg: "bg-gradient-to-br from-purple-100 to-purple-200",
    iconColor: "text-purple-600",
    titleColor: "text-purple-900",
    messageColor: "text-purple-700",
    borderColor: "border-purple-300",
    bgGradient: "from-purple-50/90 via-white to-purple-50/50",
    shadowColor: "shadow-purple-200/60",
    progressBg: "bg-gradient-to-r from-purple-500 to-purple-600",
    buttonHover: "hover:bg-purple-50",
    ringColor: "focus:ring-purple-500",
    glowColor: "shadow-purple-500/30",
    pulseColor: "bg-purple-400",
    backdropBlur: "backdrop-blur-md",
  },
  // File/validation error styling
  fileError: {
    icon: DocumentIcon,
    iconBg: "bg-gradient-to-br from-yellow-100 to-yellow-200",
    iconColor: "text-yellow-600",
    titleColor: "text-yellow-900",
    messageColor: "text-yellow-700",
    borderColor: "border-yellow-300",
    bgGradient: "from-yellow-50/90 via-white to-yellow-50/50",
    shadowColor: "shadow-yellow-200/60",
    progressBg: "bg-gradient-to-r from-yellow-500 to-yellow-600",
    buttonHover: "hover:bg-yellow-50",
    ringColor: "focus:ring-yellow-500",
    glowColor: "shadow-yellow-500/30",
    pulseColor: "bg-yellow-400",
    backdropBlur: "backdrop-blur-md",
  },
  // Timeout error styling
  timeoutError: {
    icon: ClockIcon,
    iconBg: "bg-gradient-to-br from-indigo-100 to-indigo-200",
    iconColor: "text-indigo-600",
    titleColor: "text-indigo-900",
    messageColor: "text-indigo-700",
    borderColor: "border-indigo-300",
    bgGradient: "from-indigo-50/90 via-white to-indigo-50/50",
    shadowColor: "shadow-indigo-200/60",
    progressBg: "bg-gradient-to-r from-indigo-500 to-indigo-600",
    buttonHover: "hover:bg-indigo-50",
    ringColor: "focus:ring-indigo-500",
    glowColor: "shadow-indigo-500/30",
    pulseColor: "bg-indigo-400",
    backdropBlur: "backdrop-blur-md",
  },
  // Rate limit error styling
  rateLimitError: {
    icon: ShieldExclamationIcon,
    iconBg: "bg-gradient-to-br from-pink-100 to-pink-200",
    iconColor: "text-pink-600",
    titleColor: "text-pink-900",
    messageColor: "text-pink-700",
    borderColor: "border-pink-300",
    bgGradient: "from-pink-50/90 via-white to-pink-50/50",
    shadowColor: "shadow-pink-200/60",
    progressBg: "bg-gradient-to-r from-pink-500 to-pink-600",
    buttonHover: "hover:bg-pink-50",
    ringColor: "focus:ring-pink-500",
    glowColor: "shadow-pink-500/30",
    pulseColor: "bg-pink-400",
    backdropBlur: "backdrop-blur-md",
  },
  warning: {
    icon: ExclamationTriangleIcon,
    iconBg: "bg-gradient-to-br from-amber-100 to-amber-200",
    iconColor: "text-amber-600",
    titleColor: "text-amber-900",
    messageColor: "text-amber-700",
    borderColor: "border-amber-300",
    bgGradient: "from-amber-50/90 via-white to-amber-50/50",
    shadowColor: "shadow-amber-200/60",
    progressBg: "bg-gradient-to-r from-amber-500 to-amber-600",
    buttonHover: "hover:bg-amber-50",
    ringColor: "focus:ring-amber-500",
    glowColor: "shadow-amber-500/30",
    pulseColor: "bg-amber-400",
    backdropBlur: "backdrop-blur-md",
  },
  success: {
    icon: CheckCircleIcon,
    iconBg: "bg-gradient-to-br from-green-100 to-green-200",
    iconColor: "text-green-600",
    titleColor: "text-green-900",
    messageColor: "text-green-700",
    borderColor: "border-green-300",
    bgGradient: "from-green-50/90 via-white to-green-50/50",
    shadowColor: "shadow-green-200/60",
    progressBg: "bg-gradient-to-r from-green-500 to-green-600",
    buttonHover: "hover:bg-green-50",
    ringColor: "focus:ring-green-500",
    glowColor: "shadow-green-500/30",
    pulseColor: "bg-green-400",
    backdropBlur: "backdrop-blur-md",
  },
  info: {
    icon: InfoIcon,
    iconBg: "bg-gradient-to-br from-blue-100 to-blue-200",
    iconColor: "text-blue-600",
    titleColor: "text-blue-900",
    messageColor: "text-blue-700",
    borderColor: "border-blue-300",
    bgGradient: "from-blue-50/90 via-white to-blue-50/50",
    shadowColor: "shadow-blue-200/60",
    progressBg: "bg-gradient-to-r from-blue-500 to-blue-600",
    buttonHover: "hover:bg-blue-50",
    ringColor: "focus:ring-blue-500",
    glowColor: "shadow-blue-500/30",
    pulseColor: "bg-blue-400",
    backdropBlur: "backdrop-blur-md",
  },
};

const getToastTypeFromError = (errorData) => {
  if (!errorData) return "error";

  const { errorType } = errorData;

  switch (errorType) {
    case "network":
      return "networkError";
    case "server":
      return "serverError";
    case "file":
    case "validation":
      return "fileError";
    case "timeout":
      return "timeoutError";
    case "rate_limit":
      return "rateLimitError";
    default:
      return "error";
  }
};

// Enhanced Toast Component with Beautiful Error Popup UI
function Toast({
  message,
  title,
  type = "error",
  show,
  onClose,
  duration = 5000,
  showProgress = true,
  position = "top-right",
  actions = null,
  errorData = null, // New prop for error-specific data
}) {
  const [isVisible, setIsVisible] = useState(show);
  const [progress, setProgress] = useState(100);
  const [isClosing, setIsClosing] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  // Determine the actual toast type based on error data
  const actualType = errorData ? getToastTypeFromError(errorData) : type;
  const config = TOAST_CONFIG[actualType] || TOAST_CONFIG.error;
  const Icon = config.icon;

  const handleClose = React.useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, 300);
  }, [onClose]);

  // Shake animation for critical errors
  useEffect(() => {
    if (
      show &&
      (actualType === "error" ||
        actualType === "networkError" ||
        actualType === "serverError")
    ) {
      setIsShaking(true);
      const shakeTimer = setTimeout(() => setIsShaking(false), 600);
      return () => clearTimeout(shakeTimer);
    }
  }, [show, actualType]);

  // Auto-close timer with progress bar
  useEffect(() => {
    if (show && duration > 0) {
      setIsVisible(true);
      setProgress(100);
      setIsClosing(false);

      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev - 100 / (duration / 100);
          if (newProgress <= 0) {
            clearInterval(interval);
            handleClose();
            return 0;
          }
          return newProgress;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [show, duration, handleClose]);

  useEffect(() => {
    setIsVisible(show);
    if (!show) {
      setIsClosing(false);
    }
  }, [show]);

  const getPositionClasses = () => {
    switch (position) {
      case "top-left":
        return "top-4 left-4";
      case "top-center":
        return "top-4 left-1/2 transform -translate-x-1/2";
      case "top-right":
      default:
        return "top-4 right-4";
      case "bottom-left":
        return "bottom-4 left-4";
      case "bottom-center":
        return "bottom-4 left-1/2 transform -translate-x-1/2";
      case "bottom-right":
        return "bottom-4 right-4";
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Enhanced backdrop overlay for popup feel */}
      <div
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-all duration-300"
        onClick={handleClose}
      />

      <div
        className={`fixed z-50 ${getPositionClasses()} max-w-md w-full mx-auto transform transition-all duration-500 ease-out ${
          isClosing
            ? "scale-90 opacity-0 translate-y-4"
            : "scale-100 opacity-100 translate-y-0"
        } ${isShaking ? "animate-pulse" : ""}`}
        role="alert"
        aria-live="polite"
      >
        {/* Enhanced backdrop blur effect with gradient */}
        <div
          className={`absolute inset-0 bg-white/95 ${config.backdropBlur} rounded-3xl`}
        ></div>

        {/* Floating particles effect for errors */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
          <div
            className={`absolute -top-2 -left-2 w-4 h-4 ${config.pulseColor} rounded-full opacity-20 animate-ping`}
          ></div>
          <div
            className={`absolute -top-1 -right-3 w-3 h-3 ${config.pulseColor} rounded-full opacity-30 animate-ping`}
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className={`absolute -bottom-2 -left-1 w-2 h-2 ${config.pulseColor} rounded-full opacity-25 animate-ping`}
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        {/* Main toast container with enhanced styling */}
        <div
          className={`
            relative bg-gradient-to-br ${config.bgGradient} 
            border-2 ${config.borderColor} 
            rounded-3xl shadow-2xl ${config.shadowColor}
            p-6 hover:shadow-3xl ${config.glowColor}
            transition-all duration-500 ease-out
            hover:scale-[1.02] hover:-translate-y-1
            ring-4 ring-white/50
          `}
        >
          {/* Enhanced progress bar with gradient */}
          {showProgress && duration > 0 && (
            <div className="absolute top-0 left-0 right-0 h-2 bg-gray-100/50 rounded-t-3xl overflow-hidden">
              <div
                className={`h-full ${config.progressBg} transition-all duration-100 ease-linear rounded-t-3xl relative overflow-hidden`}
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
              </div>
            </div>
          )}

          {/* Content with enhanced spacing */}
          <div className="flex items-start space-x-5">
            {/* Enhanced icon with multiple animation layers */}
            <div
              className={`flex-shrink-0 ${config.iconBg} rounded-2xl p-3 relative shadow-lg`}
            >
              <div
                className={`absolute inset-0 ${config.pulseColor} rounded-2xl opacity-10 animate-pulse`}
              ></div>
              <div
                className={`absolute inset-0 ${config.pulseColor} rounded-2xl opacity-5 animate-ping`}
              ></div>
              <Icon
                className={`h-7 w-7 ${config.iconColor} relative z-10 transform transition-transform duration-300 hover:scale-110 hover:rotate-12`}
                aria-hidden="true"
              />
            </div>

            {/* Enhanced message content */}
            <div className="flex-1 min-w-0">
              {title && (
                <h4
                  className={`text-base font-bold ${config.titleColor} mb-2 leading-tight`}
                >
                  {title}
                </h4>
              )}
              <p className={`text-sm ${config.messageColor} leading-relaxed`}>
                {message || `An ${type} occurred`}
              </p>

              {/* Enhanced action buttons */}
              {actions && (
                <div className="mt-4 flex space-x-3">
                  {actions.map((action, index) => (
                    <button
                      key={index}
                      onClick={action.onClick}
                      className={`
                        px-4 py-2 text-sm font-semibold rounded-xl 
                        transition-all duration-300 transform hover:scale-105 active:scale-95
                        shadow-lg hover:shadow-xl
                        ${
                          action.variant === "primary"
                            ? `${config.progressBg} text-white hover:opacity-90 shadow-lg ring-2 ring-white/50`
                            : `${config.buttonHover} ${config.titleColor} border-2 ${config.borderColor} bg-white/70`
                        }
                        focus:outline-none focus:ring-4 focus:ring-offset-2 ${
                          config.ringColor
                        }
                      `}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Enhanced close button */}
            {onClose && (
              <div className="flex-shrink-0">
                <button
                  type="button"
                  onClick={handleClose}
                  className={`
                    ${config.buttonHover} rounded-full p-2.5 
                    transition-all duration-300 transform hover:scale-110 hover:rotate-90 active:scale-90
                    shadow-lg hover:shadow-xl border-2 border-transparent hover:border-current/20
                    focus:outline-none focus:ring-4 focus:ring-offset-2 ${config.ringColor}
                    bg-white/70 backdrop-blur-sm
                  `}
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon
                    className={`h-5 w-5 ${config.iconColor}`}
                    aria-hidden="true"
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Toast;
