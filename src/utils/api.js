const USE_PROD_BACKEND = "https://hr-resume-analyzer-backend.vercel.app";
// const USE_PROD_BACKEND = "http://localhost:8000";

export const BACKEND_API_BASE_URL = USE_PROD_BACKEND;

// export const PAYMENT_API_BASE_URL = "https://jobpsych-payment.vercel.app";
export const VITE_BACKEND_URL =
  import.meta.env.VITE_BACKEND_API_URL || "http://localhost:5000";

export const API_ENDPOINTS = {
  ANALYZE_RESUME: `${BACKEND_API_BASE_URL}/api/analyze-resume`,
  HIREDESK_ANALYZE: `${BACKEND_API_BASE_URL}/api/hiredesk-analyze`,
  GENERATE_QUESTIONS: `${BACKEND_API_BASE_URL}/api/generate-questions`,

  GET_PLANS: `${VITE_BACKEND_URL}/api`,
  CREATE_SUBSCRIPTION: `${VITE_BACKEND_URL}/api/subscription`,
  GET_PAYMENT_STATUS: `${VITE_BACKEND_URL}/api/subscription`,
  STORE_SUBSCRIPTION: `${VITE_BACKEND_URL}/api/subscription/store`,

  CREATE_USER: `${VITE_BACKEND_URL}/api/users`,
  GET_USER_BY_ID: `${VITE_BACKEND_URL}/api/users`,
  GET_USER_BY_EMAIL: `${VITE_BACKEND_URL}/api/users/email`,
  UPDATE_USER: `${VITE_BACKEND_URL}/api/users`,

  USER_AUTH: `${VITE_BACKEND_URL}/api/auth`,
  SUBSCRIPTION: "/api/subscription",
  CREATE_PAYMENT: `${VITE_BACKEND_URL}/api/subscription`,
  PAYMENT_STATUS: `${VITE_BACKEND_URL}/api/subscription`,
};
