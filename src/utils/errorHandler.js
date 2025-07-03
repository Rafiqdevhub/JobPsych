export const ERROR_TYPES = {
  NETWORK: "network",
  SERVER: "server",
  VALIDATION: "validation",
  FILE: "file",
  TIMEOUT: "timeout",
  RATE_LIMIT: "rate_limit",
  UNKNOWN: "unknown",
};

const ERROR_MESSAGES = {
  "validation errors for ResumeData":
    "Unable to analyze some parts of your resume. Please make sure your resume is properly formatted and contains the necessary information.",
  "File type not supported":
    "Please upload a valid resume file. Supported formats are PDF and DOCX.",
  "File too large":
    "The resume file is too large. Please upload a file smaller than 5MB.",
  "Failed to fetch":
    "Unable to connect to the server. Please check your internet connection and try again.",
  NetworkError:
    "Unable to connect to the server. Please check your internet connection and try again.",
  "Failed to analyze resume":
    "We encountered an issue while analyzing your resume. Please try again or upload a different file.",
  "Rate limit exceeded":
    "Daily upload limit reached. You can upload 2 resumes per day.",
  500: "Server error occurred. Our team has been notified. Please try again later.",
  503: "Service temporarily unavailable. Please try again in a few moments.",
  timeout: "Request timed out. Please check your connection and try again.",
  cors: "Connection blocked by browser security. Please try refreshing the page.",
};

export const formatErrorMessage = (error) => {
  if (!error) return "An unexpected error occurred. Please try again later.";

  const errorString = typeof error === "string" ? error : error.toString();

  const matchedError = Object.entries(ERROR_MESSAGES).find(([key]) =>
    errorString.toLowerCase().includes(key.toLowerCase())
  );

  return matchedError
    ? matchedError[1]
    : "An unexpected error occurred. Please try again later.";
};

export const getErrorType = (error, errorData) => {
  if (!error) return ERROR_TYPES.UNKNOWN;

  const errorString = typeof error === "string" ? error : error.toString();
  const lowerError = errorString.toLowerCase();

  if (
    lowerError.includes("rate limit exceeded") ||
    lowerError.includes("daily limit") ||
    lowerError.includes("too many requests") ||
    lowerError.includes("upload limit") ||
    (errorData?.detail &&
      typeof errorData.detail === "object" &&
      (errorData.detail.error?.includes("rate limit") ||
        errorData.detail.message?.includes("daily limit")))
  ) {
    return ERROR_TYPES.RATE_LIMIT;
  }

  if (
    lowerError.includes("network") ||
    lowerError.includes("failed to fetch") ||
    lowerError.includes("connection")
  ) {
    return ERROR_TYPES.NETWORK;
  }

  if (
    lowerError.includes("500") ||
    lowerError.includes("503") ||
    lowerError.includes("server")
  ) {
    return ERROR_TYPES.SERVER;
  }

  if (lowerError.includes("validation") || lowerError.includes("format")) {
    return ERROR_TYPES.VALIDATION;
  }

  if (lowerError.includes("file") || lowerError.includes("upload")) {
    return ERROR_TYPES.FILE;
  }

  if (lowerError.includes("timeout")) {
    return ERROR_TYPES.TIMEOUT;
  }

  return ERROR_TYPES.UNKNOWN;
};

export const getErrorCategory = (error) => {
  const errorType = getErrorType(error);

  switch (errorType) {
    case ERROR_TYPES.NETWORK:
    case ERROR_TYPES.TIMEOUT:
      return "network";
    case ERROR_TYPES.SERVER:
      return "server";
    case ERROR_TYPES.FILE:
    case ERROR_TYPES.VALIDATION:
      return "upload";
    default:
      return "general";
  }
};

export const shouldShowRetry = (errorType) => {
  return [
    ERROR_TYPES.NETWORK,
    ERROR_TYPES.SERVER,
    ERROR_TYPES.TIMEOUT,
  ].includes(errorType);
};

export const shouldShowReset = (errorType) => {
  return [ERROR_TYPES.FILE, ERROR_TYPES.VALIDATION].includes(errorType);
};
