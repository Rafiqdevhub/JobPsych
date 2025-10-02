/**
 * Resume Analysis Rate Limiting Service
 * Handles the 5 requests per day per IP address limit for the analyze-resume endpoint
 */

const STORAGE_KEY = "resume_analysis_rate_limit";
const DAILY_LIMIT = 5;
const RESET_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

/**
 * Get current rate limit status from localStorage
 */
export const getResumeAnalysisRateLimit = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return {
        count: 0,
        resetTime: Date.now() + RESET_INTERVAL,
        remaining: DAILY_LIMIT,
      };
    }

    const data = JSON.parse(stored);
    const now = Date.now();

    // Reset if 24 hours have passed
    if (now >= data.resetTime) {
      const resetData = {
        count: 0,
        resetTime: now + RESET_INTERVAL,
        remaining: DAILY_LIMIT,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resetData));
      return resetData;
    }

    return {
      ...data,
      remaining: Math.max(0, DAILY_LIMIT - data.count),
    };
  } catch (error) {
    console.warn("Failed to parse rate limit data:", error);
    return {
      count: 0,
      resetTime: Date.now() + RESET_INTERVAL,
      remaining: DAILY_LIMIT,
    };
  }
};

/**
 * Check if user can make another request
 */
export const canMakeResumeAnalysisRequest = () => {
  const rateLimit = getResumeAnalysisRateLimit();
  return rateLimit.remaining > 0;
};

/**
 * Increment the request count
 */
export const incrementResumeAnalysisCount = () => {
  const rateLimit = getResumeAnalysisRateLimit();

  if (rateLimit.remaining <= 0) {
    throw new Error(
      "Rate limit exceeded. You can only analyze 5 resumes per day."
    );
  }

  const newData = {
    ...rateLimit,
    count: rateLimit.count + 1,
    remaining: rateLimit.remaining - 1,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  return newData;
};

/**
 * Get time until rate limit resets
 */
export const getTimeUntilReset = () => {
  const rateLimit = getResumeAnalysisRateLimit();
  const now = Date.now();
  const timeRemaining = rateLimit.resetTime - now;

  if (timeRemaining <= 0) {
    return null;
  }

  const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
};

/**
 * Get formatted rate limit message for UI
 */
export const getRateLimitMessage = () => {
  const rateLimit = getResumeAnalysisRateLimit();

  if (rateLimit.remaining > 0) {
    return {
      type: "info",
      message: `${rateLimit.remaining} of ${DAILY_LIMIT} daily analyses remaining`,
      canProceed: true,
    };
  }

  const timeUntilReset = getTimeUntilReset();
  return {
    type: "error",
    message: timeUntilReset
      ? `Daily limit reached (${DAILY_LIMIT}/day). Resets in ${timeUntilReset}`
      : "Daily limit reached. Your limit will reset shortly.",
    canProceed: false,
  };
};

/**
 * Handle API response headers for server-side rate limiting
 */
export const handleRateLimitHeaders = (response) => {
  const remaining = response.headers.get("X-RateLimit-Remaining");
  const reset = response.headers.get("X-RateLimit-Reset");
  const limit = response.headers.get("X-RateLimit-Limit");

  if (remaining !== null && reset !== null) {
    // Server provided rate limit info, update local storage
    const resetTime = parseInt(reset) * 1000; // Convert to milliseconds
    const data = {
      count: parseInt(limit) - parseInt(remaining),
      resetTime: resetTime,
      remaining: parseInt(remaining),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return data;
  }

  return null;
};

/**
 * Reset rate limit (for testing or admin purposes)
 */
export const resetResumeAnalysisRateLimit = () => {
  localStorage.removeItem(STORAGE_KEY);
};
