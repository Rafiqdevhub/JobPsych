import { expect, test, describe } from "vitest";
import {
  ERROR_TYPES,
  formatErrorMessage,
  getErrorType,
  getErrorCategory,
  shouldShowRetry,
  shouldShowReset,
} from "../errorHandler";

describe("Error Handler Utilities", () => {
  describe("ERROR_TYPES", () => {
    test("contains all expected error types", () => {
      expect(ERROR_TYPES).toEqual({
        NETWORK: "network",
        SERVER: "server",
        VALIDATION: "validation",
        FILE: "file",
        TIMEOUT: "timeout",
        RATE_LIMIT: "rate_limit",
        UNKNOWN: "unknown",
      });
    });
  });

  describe("formatErrorMessage", () => {
    test("returns default message for null/undefined error", () => {
      expect(formatErrorMessage(null)).toBe(
        "An unexpected error occurred. Please try again later."
      );
      expect(formatErrorMessage(undefined)).toBe(
        "An unexpected error occurred. Please try again later."
      );
    });

    test("returns default message for empty error", () => {
      expect(formatErrorMessage("")).toBe(
        "An unexpected error occurred. Please try again later."
      );
    });

    test("matches exact error messages", () => {
      expect(formatErrorMessage("validation errors for ResumeData")).toBe(
        "Unable to analyze some parts of your resume. Please make sure your resume is properly formatted and contains the necessary information."
      );

      expect(formatErrorMessage("File type not supported")).toBe(
        "Please upload a valid resume file. Supported formats are PDF and DOCX."
      );

      expect(formatErrorMessage("File too large")).toBe(
        "The resume file is too large. Please upload a file smaller than 5MB."
      );

      expect(formatErrorMessage("Failed to fetch")).toBe(
        "Unable to connect to the server. Please check your internet connection and try again."
      );

      expect(formatErrorMessage("NetworkError")).toBe(
        "Unable to connect to the server. Please check your internet connection and try again."
      );

      expect(formatErrorMessage("Failed to analyze resume")).toBe(
        "We encountered an issue while analyzing your resume. Please try again or upload a different file."
      );

      expect(formatErrorMessage("Rate limit exceeded")).toBe(
        "Daily upload limit reached. You can upload 2 resumes per day."
      );

      expect(formatErrorMessage("500")).toBe(
        "Server error occurred. Our team has been notified. Please try again later."
      );

      expect(formatErrorMessage("503")).toBe(
        "Service temporarily unavailable. Please try again in a few moments."
      );

      expect(formatErrorMessage("timeout")).toBe(
        "Request timed out. Please check your connection and try again."
      );

      expect(formatErrorMessage("cors")).toBe(
        "Connection blocked by browser security. Please try refreshing the page."
      );
    });

    test("matches error messages case-insensitively", () => {
      expect(formatErrorMessage("VALIDATION ERRORS FOR RESUMEDATA")).toBe(
        "Unable to analyze some parts of your resume. Please make sure your resume is properly formatted and contains the necessary information."
      );

      expect(formatErrorMessage("failed to FETCH")).toBe(
        "Unable to connect to the server. Please check your internet connection and try again."
      );
    });

    test("returns default message for unmatched errors", () => {
      expect(formatErrorMessage("Some random error")).toBe(
        "An unexpected error occurred. Please try again later."
      );
    });

    test("handles Error objects", () => {
      const error = new Error("Failed to fetch");
      expect(formatErrorMessage(error)).toBe(
        "Unable to connect to the server. Please check your internet connection and try again."
      );
    });
  });

  describe("getErrorType", () => {
    test("returns UNKNOWN for null/undefined error", () => {
      expect(getErrorType(null)).toBe(ERROR_TYPES.UNKNOWN);
      expect(getErrorType(undefined)).toBe(ERROR_TYPES.UNKNOWN);
    });

    test("identifies rate limit errors", () => {
      expect(getErrorType("Rate limit exceeded")).toBe(ERROR_TYPES.RATE_LIMIT);
      expect(getErrorType("Daily limit reached")).toBe(ERROR_TYPES.RATE_LIMIT);
      expect(getErrorType("Too many requests")).toBe(ERROR_TYPES.RATE_LIMIT);
      expect(getErrorType("Upload limit reached")).toBe(ERROR_TYPES.RATE_LIMIT);
    });

    // Note: errorData parameter is used internally but not extensively tested
    // as it's mainly for server-side error handling

    test("identifies network errors", () => {
      expect(getErrorType("Network error")).toBe(ERROR_TYPES.NETWORK);
      expect(getErrorType("Failed to fetch")).toBe(ERROR_TYPES.NETWORK);
      expect(getErrorType("Connection failed")).toBe(ERROR_TYPES.NETWORK);
    });

    test("identifies server errors", () => {
      expect(getErrorType("500 Internal Server Error")).toBe(
        ERROR_TYPES.SERVER
      );
      expect(getErrorType("503 Service Unavailable")).toBe(ERROR_TYPES.SERVER);
      expect(getErrorType("Server error")).toBe(ERROR_TYPES.SERVER);
    });

    test("identifies validation errors", () => {
      expect(getErrorType("Validation error")).toBe(ERROR_TYPES.VALIDATION);
      expect(getErrorType("Invalid format")).toBe(ERROR_TYPES.VALIDATION);
    });

    test("identifies file errors", () => {
      expect(getErrorType("File error")).toBe(ERROR_TYPES.FILE);
      expect(getErrorType("Upload failed")).toBe(ERROR_TYPES.FILE);
    });

    test("identifies timeout errors", () => {
      expect(getErrorType("Request timeout")).toBe(ERROR_TYPES.TIMEOUT);
    });

    test("returns UNKNOWN for unmatched errors", () => {
      expect(getErrorType("Some random error")).toBe(ERROR_TYPES.UNKNOWN);
    });

    test("handles Error objects", () => {
      const error = new Error("Failed to fetch");
      expect(getErrorType(error)).toBe(ERROR_TYPES.NETWORK);
    });
  });

  describe("getErrorCategory", () => {
    test("categorizes network errors", () => {
      expect(getErrorCategory(ERROR_TYPES.NETWORK)).toBe("network");
      expect(getErrorCategory(ERROR_TYPES.TIMEOUT)).toBe("network");
    });

    test("categorizes server errors", () => {
      expect(getErrorCategory(ERROR_TYPES.SERVER)).toBe("server");
    });

    test("categorizes upload errors", () => {
      expect(getErrorCategory(ERROR_TYPES.FILE)).toBe("upload");
      expect(getErrorCategory(ERROR_TYPES.VALIDATION)).toBe("upload");
    });

    test("categorizes rate limit errors", () => {
      expect(getErrorCategory(ERROR_TYPES.RATE_LIMIT)).toBe("general");
    });

    test("categorizes unknown errors", () => {
      expect(getErrorCategory(ERROR_TYPES.UNKNOWN)).toBe("general");
    });
  });

  describe("shouldShowRetry", () => {
    test("returns true for retryable errors", () => {
      expect(shouldShowRetry(ERROR_TYPES.NETWORK)).toBe(true);
      expect(shouldShowRetry(ERROR_TYPES.SERVER)).toBe(true);
      expect(shouldShowRetry(ERROR_TYPES.TIMEOUT)).toBe(true);
    });

    test("returns false for non-retryable errors", () => {
      expect(shouldShowRetry(ERROR_TYPES.FILE)).toBe(false);
      expect(shouldShowRetry(ERROR_TYPES.VALIDATION)).toBe(false);
      expect(shouldShowRetry(ERROR_TYPES.RATE_LIMIT)).toBe(false);
      expect(shouldShowRetry(ERROR_TYPES.UNKNOWN)).toBe(false);
    });
  });

  describe("shouldShowReset", () => {
    test("returns true for reset-required errors", () => {
      expect(shouldShowReset(ERROR_TYPES.FILE)).toBe(true);
      expect(shouldShowReset(ERROR_TYPES.VALIDATION)).toBe(true);
    });

    test("returns false for non-reset errors", () => {
      expect(shouldShowReset(ERROR_TYPES.NETWORK)).toBe(false);
      expect(shouldShowReset(ERROR_TYPES.SERVER)).toBe(false);
      expect(shouldShowReset(ERROR_TYPES.TIMEOUT)).toBe(false);
      expect(shouldShowReset(ERROR_TYPES.RATE_LIMIT)).toBe(false);
      expect(shouldShowReset(ERROR_TYPES.UNKNOWN)).toBe(false);
    });
  });
});
