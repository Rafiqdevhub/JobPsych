// Use localhost for development and testing, production URL for production builds
const isProduction = import.meta.env.PROD;
const isTest = import.meta.env.MODE === "test" || import.meta.env.VITEST;

export const AI_API_BASE_URL = isTest
  ? `/api`
  : isProduction
  ? `https://evaai-seven.vercel.app/api`
  : `http://localhost:5000/api`;

export const ROLE_SUGGESTION = isTest
  ? `/api/role-suggestion`
  : isProduction
  ? `https://role-suggestion.vercel.app/api/role-suggestion`
  : `http://localhost:8000/api/role-suggestion`;
