// Test file to demonstrate rate limit error handling
// This simulates the backend rate limit response format

export const simulateRateLimitError = () => {
  const rateLimitResponse = {
    detail: {
      error: "Rate limit exceeded",
      message: "You have exceeded the daily limit of 2 resume uploads per day.",
      reset_in: "23h 53m",
      retry_after: 85995,
    },
  };

  const error = new Error(rateLimitResponse.detail.message);
  error.data = rateLimitResponse;
  return error;
};

// Example of what the actual HTTP response would look like:
/*
HTTP 429 Too Many Requests

{
  "detail": {
    "error": "Rate limit exceeded",
    "message": "You have exceeded the daily limit of 2 resume uploads per day.",
    "reset_in": "23h 53m",
    "retry_after": 85995
  }
}
*/
