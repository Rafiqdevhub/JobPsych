// Use localhost for development and testing, production URL for production builds
const isProduction = import.meta.env.PROD;
const isTest = import.meta.env.MODE === "test" || import.meta.env.VITEST;

export const AI_API_BASE_URL = isTest
  ? `/api`
  : isProduction
  ? `https://evaai-seven.vercel.app/api`
  : `http://localhost:5000/api`;

export const ANALYZE_RESUME = isTest
  ? `/api/analyze-resume`
  : isProduction
  ? `https://hr-resume-analyzer-backend.vercel.app/api/analyze-resume`
  : `http://localhost:8000/api/analyze-resume`;
