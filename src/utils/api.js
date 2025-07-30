const USE_PROD_BACKEND = "https://hr-resume-analyzer-backend.vercel.app";
// const USE_PROD_BACKEND = "http://localhost:8000";

export const BACKEND_API_BASE_URL = USE_PROD_BACKEND;

export const PAYMENT_API_BASE_URL = "https://jobpsych-payment.vercel.app";

export const API_ENDPOINTS = {
  ANALYZE_RESUME: `${BACKEND_API_BASE_URL}/api/analyze-resume`,
  HIREDESK_ANALYZE: `${BACKEND_API_BASE_URL}/api/hiredesk-analyze`,

  USER_AUTH: "/api/auth",
  SUBSCRIPTION: "/api/subscription",

  GET_PLANS: `${PAYMENT_API_BASE_URL}/api`,
  CREATE_PAYMENT: `${PAYMENT_API_BASE_URL}/api/subscription`,
  PAYMENT_STATUS: `${PAYMENT_API_BASE_URL}/api/subscription`,
};
