const USE_PROD_BACKEND = "https://hr-resume-analyzer-backend.vercel.app";
// const USE_PROD_BACKEND = "http://localhost:8000";

export const BACKEND_API_BASE_URL = USE_PROD_BACKEND;

export const PAYMENT_API_BASE_URL = "https://jobpsych-payment.vercel.app";

export const API_ENDPOINTS = {
  // Resume Analysis
  ANALYZE_RESUME: `${BACKEND_API_BASE_URL}/api/analyze-resume`,
  HIREDESK_ANALYZE: `${BACKEND_API_BASE_URL}/api/hiredesk-analyze`,
  GENERATE_QUESTIONS: `${BACKEND_API_BASE_URL}/api/generate-questions`,

  // Payment & Subscription (Updated to match backend)
  GET_PLANS: `${PAYMENT_API_BASE_URL}/api`,
  CREATE_SUBSCRIPTION: `${PAYMENT_API_BASE_URL}/api/subscription`,
  GET_PAYMENT_STATUS: `${PAYMENT_API_BASE_URL}/api/subscription`,
  STORE_SUBSCRIPTION: `${PAYMENT_API_BASE_URL}/api/subscription/store`,

  // User Management (New endpoints)
  CREATE_USER: `${PAYMENT_API_BASE_URL}/api/users`,
  GET_USER_BY_ID: `${PAYMENT_API_BASE_URL}/api/users`,
  GET_USER_BY_EMAIL: `${PAYMENT_API_BASE_URL}/api/users/email`,
  UPDATE_USER: `${PAYMENT_API_BASE_URL}/api/users`,

  // Legacy endpoints (for backward compatibility)
  USER_AUTH: "/api/auth",
  SUBSCRIPTION: "/api/subscription",
  CREATE_PAYMENT: `${PAYMENT_API_BASE_URL}/api/subscription`,
  PAYMENT_STATUS: `${PAYMENT_API_BASE_URL}/api/subscription`,
};
