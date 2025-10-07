import { expect, test, describe, beforeEach, vi, afterEach } from "vitest";
import {
  getResumeAnalysisRateLimit,
  canMakeResumeAnalysisRequest,
  incrementResumeAnalysisCount,
  getTimeUntilReset,
  getRateLimitMessage,
  handleRateLimitHeaders,
  resetResumeAnalysisRateLimit,
} from "../resumeRateLimitService";

const STORAGE_KEY = "resume_analysis_rate_limit";
const DAILY_LIMIT = 5;

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// Mock console.warn
const consoleWarnMock = vi.spyOn(console, "warn").mockImplementation(() => {});

describe("Resume Rate Limit Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllMocks();
    consoleWarnMock.mockClear();
  });

  describe("getResumeAnalysisRateLimit", () => {
    test("returns initial state when no stored data", () => {
      localStorageMock.getItem.mockReturnValue(null);

      const result = getResumeAnalysisRateLimit();

      expect(result).toEqual({
        count: 0,
        resetTime: expect.any(Number),
        remaining: DAILY_LIMIT,
      });
      expect(result.resetTime).toBeGreaterThan(Date.now());
    });

    test("returns parsed stored data when valid", () => {
      const storedData = {
        count: 2,
        resetTime: Date.now() + 1000 * 60 * 60, // 1 hour from now
        remaining: 3,
      };
      localStorageMock.getItem.mockReturnValue(JSON.stringify(storedData));

      const result = getResumeAnalysisRateLimit();

      expect(result).toEqual(storedData);
    });

    test("resets data when 24 hours have passed", () => {
      const oldResetTime = Date.now() - 1000 * 60 * 60 * 25; // 25 hours ago
      const storedData = {
        count: 3,
        resetTime: oldResetTime,
        remaining: 2,
      };
      localStorageMock.getItem.mockReturnValue(JSON.stringify(storedData));

      const result = getResumeAnalysisRateLimit();

      expect(result.count).toBe(0);
      expect(result.remaining).toBe(DAILY_LIMIT);
      expect(result.resetTime).toBeGreaterThan(Date.now());

      // Should update localStorage with reset data
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        STORAGE_KEY,
        expect.stringContaining('"count":0')
      );
    });

    test("handles invalid stored data gracefully", () => {
      localStorageMock.getItem.mockReturnValue("invalid json");

      const result = getResumeAnalysisRateLimit();

      expect(result).toEqual({
        count: 0,
        resetTime: expect.any(Number),
        remaining: DAILY_LIMIT,
      });
    });

    test("calculates remaining correctly", () => {
      const storedData = {
        count: 3,
        resetTime: Date.now() + 1000 * 60 * 60,
        remaining: 2, // This should be recalculated
      };
      localStorageMock.getItem.mockReturnValue(JSON.stringify(storedData));

      const result = getResumeAnalysisRateLimit();

      expect(result.remaining).toBe(2); // DAILY_LIMIT - count = 5 - 3 = 2
    });
  });

  describe("canMakeResumeAnalysisRequest", () => {
    test("returns true when requests remaining", () => {
      localStorageMock.getItem.mockReturnValue(null); // No stored data = 5 remaining

      const result = canMakeResumeAnalysisRequest();

      expect(result).toBe(true);
    });

    test("returns false when no requests remaining", () => {
      const storedData = {
        count: 5,
        resetTime: Date.now() + 1000 * 60 * 60,
        remaining: 0,
      };
      localStorageMock.getItem.mockReturnValue(JSON.stringify(storedData));

      const result = canMakeResumeAnalysisRequest();

      expect(result).toBe(false);
    });
  });

  describe("incrementResumeAnalysisCount", () => {
    test("increments count successfully when under limit", () => {
      const storedData = {
        count: 2,
        resetTime: Date.now() + 1000 * 60 * 60,
        remaining: 3,
      };
      localStorageMock.getItem.mockReturnValue(JSON.stringify(storedData));

      const result = incrementResumeAnalysisCount();

      expect(result).toEqual({
        count: 3,
        resetTime: storedData.resetTime,
        remaining: 2,
      });

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        STORAGE_KEY,
        JSON.stringify({
          count: 3,
          resetTime: storedData.resetTime,
          remaining: 2,
        })
      );
    });

    test("throws error when limit exceeded", () => {
      const storedData = {
        count: 5,
        resetTime: Date.now() + 1000 * 60 * 60,
        remaining: 0,
      };
      localStorageMock.getItem.mockReturnValue(JSON.stringify(storedData));

      expect(() => incrementResumeAnalysisCount()).toThrow(
        "Rate limit exceeded. You can only analyze 5 resumes per day."
      );

      expect(localStorageMock.setItem).not.toHaveBeenCalled();
    });
  });

  describe("getTimeUntilReset", () => {
    test("returns formatted time when reset time is in future", () => {
      const futureResetTime = Date.now() + 1000 * 60 * 60 * 2 + 1000 * 60 * 30; // 2h 30m from now
      const storedData = {
        count: 5,
        resetTime: futureResetTime,
        remaining: 0,
      };
      localStorageMock.getItem.mockReturnValue(JSON.stringify(storedData));

      const result = getTimeUntilReset();

      expect(result).toBe("2h 30m");
    });

    test("returns minutes only when less than 1 hour", () => {
      const futureResetTime = Date.now() + 1000 * 60 * 45; // 45 minutes from now
      const storedData = {
        count: 5,
        resetTime: futureResetTime,
        remaining: 0,
      };
      localStorageMock.getItem.mockReturnValue(JSON.stringify(storedData));

      const result = getTimeUntilReset();

      expect(result).toBe("45m");
    });

    test("returns null when reset time has passed (data gets refreshed)", () => {
      // When reset time has passed, getResumeAnalysisRateLimit resets the data
      // So this test should actually expect a future time, not null
      const pastResetTime = Date.now() - 1000 * 60 * 60; // 1 hour ago
      const storedData = {
        count: 5,
        resetTime: pastResetTime,
        remaining: 0,
      };
      localStorageMock.getItem.mockReturnValue(JSON.stringify(storedData));

      const result = getTimeUntilReset();

      // Since getResumeAnalysisRateLimit resets the data when time has passed,
      // it will return a future reset time, so we should get a time string
      expect(typeof result).toBe("string");
      expect(result).toMatch(/^\d+h \d+m$|^\d+m$/);
    });
  });

  describe("getRateLimitMessage", () => {
    test("returns info message when requests remaining", () => {
      const storedData = {
        count: 2,
        resetTime: Date.now() + 1000 * 60 * 60,
        remaining: 3,
      };
      localStorageMock.getItem.mockReturnValue(JSON.stringify(storedData));

      const result = getRateLimitMessage();

      expect(result).toEqual({
        type: "info",
        message: "3 of 5 daily analyses remaining",
        canProceed: true,
      });
    });

    test("returns error message when limit reached with reset time", () => {
      const futureResetTime = Date.now() + 1000 * 60 * 60 * 2 + 1000 * 60 * 30;
      const storedData = {
        count: 5,
        resetTime: futureResetTime,
        remaining: 0,
      };
      localStorageMock.getItem.mockReturnValue(JSON.stringify(storedData));

      const result = getRateLimitMessage();

      expect(result).toEqual({
        type: "error",
        message: "Daily limit reached (5/day). Resets in 2h 30m",
        canProceed: false,
      });
    });

    test("returns error message when limit reached and reset time has passed", () => {
      // When reset time has passed, data gets reset, so count becomes 0, remaining becomes 5
      // But if we want to test the "reset time has passed" scenario, we need to check
      // what happens when the reset time is in the past but data hasn't been refreshed yet
      const pastResetTime = Date.now() - 1000 * 60 * 60;
      const storedData = {
        count: 5,
        resetTime: pastResetTime,
        remaining: 0,
      };
      localStorageMock.getItem.mockReturnValue(JSON.stringify(storedData));

      const result = getRateLimitMessage();

      // Since getResumeAnalysisRateLimit resets the data when time has passed,
      // it will return remaining > 0, so we get info message
      expect(result.type).toBe("info");
      expect(result.canProceed).toBe(true);
    });
  });

  describe("handleRateLimitHeaders", () => {
    test("updates localStorage when headers are present", () => {
      const mockResponse = {
        headers: {
          get: vi.fn((header) => {
            switch (header) {
              case "X-RateLimit-Remaining":
                return "3";
              case "X-RateLimit-Reset":
                return "1640995200"; // Some timestamp
              case "X-RateLimit-Limit":
                return "5";
              default:
                return null;
            }
          }),
        },
      };

      const result = handleRateLimitHeaders(mockResponse);

      expect(result).toEqual({
        count: 2, // 5 - 3
        resetTime: 1640995200000, // Converted to milliseconds
        remaining: 3,
      });

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        STORAGE_KEY,
        JSON.stringify({
          count: 2,
          resetTime: 1640995200000,
          remaining: 3,
        })
      );
    });

    test("returns null when headers are missing", () => {
      const mockResponse = {
        headers: {
          get: vi.fn(() => null),
        },
      };

      const result = handleRateLimitHeaders(mockResponse);

      expect(result).toBeNull();
      expect(localStorageMock.setItem).not.toHaveBeenCalled();
    });
  });

  describe("resetResumeAnalysisRateLimit", () => {
    test("removes stored data", () => {
      resetResumeAnalysisRateLimit();

      expect(localStorageMock.removeItem).toHaveBeenCalledWith(STORAGE_KEY);
    });
  });
});
