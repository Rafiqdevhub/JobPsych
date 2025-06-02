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
};

export const formatErrorMessage = (error) => {
  const matchedError = Object.entries(ERROR_MESSAGES).find(([key]) =>
    error.includes(key)
  );
  return matchedError
    ? matchedError[1]
    : "An unexpected error occurred. Please try again later.";
};

export const getErrorType = (error) => {
  return error.includes("validation") ||
    error.includes("File type") ||
    error.includes("File too large")
    ? "warning"
    : "error";
};
