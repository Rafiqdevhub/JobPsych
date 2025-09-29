const USE_PROD_BACKEND = "https://hr-resume-analyzer-backend.vercel.app";
// const USE_PROD_BACKEND = "http://localhost:8000";

export const BACKEND_API_BASE_URL = USE_PROD_BACKEND;

export const AI_API_BASE_URL = `https://evaai-seven.vercel.app/api`;
// export const AI_API_BASE_URL = `http://localhost:5000/api`;

export const VITE_BACKEND_URL =
  import.meta.env.VITE_BACKEND_API_URL || "http://localhost:5000";

export const API_ENDPOINTS = {
  ANALYZE_RESUME: `${BACKEND_API_BASE_URL}/api/analyze-resume`,
  HIREDESK_ANALYZE: `${BACKEND_API_BASE_URL}/api/hiredesk-analyze`,
  GENERATE_QUESTIONS: `${BACKEND_API_BASE_URL}/api/generate-questions`,
};
