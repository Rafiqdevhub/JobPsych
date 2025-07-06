// Base URL for the FastAPI backend
export const BACKEND_API_BASE_URL =
  import.meta.env.VITE_BACKEND_API_URL || "http://localhost:8000";

// Base URL for the payment API
export const PAYMENT_API_BASE_URL =
  import.meta.env.VITE_PAYMENT_API_URL || "http://localhost:5000";

export const API_ENDPOINTS = {
  // Backend API endpoints
  ANALYZE_RESUME: `${BACKEND_API_BASE_URL}/api/analyze-resume`,
  GENERATE_QUESTIONS: `${BACKEND_API_BASE_URL}/api/generate-questions`,
  RATE_LIMIT_STATUS: `${BACKEND_API_BASE_URL}/api/rate-limit-status`,
  SIGNUP_REQUIRED_INFO: `${BACKEND_API_BASE_URL}/api/auth/signup-required`,
  UPGRADE_PLAN_INFO: `${BACKEND_API_BASE_URL}/api/upgrade-plan`,

  // Authentication endpoints
  USER_AUTH: "/api/auth",
  SUBSCRIPTION: "/api/subscription",

  // Payment API endpoints - Updated to match backend routes
  GET_PLANS: `${PAYMENT_API_BASE_URL}/api`,
  CREATE_PAYMENT: `${PAYMENT_API_BASE_URL}/api/subscription`,
  PAYMENT_STATUS: `${PAYMENT_API_BASE_URL}/api/subscription`,
};
