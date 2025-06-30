// API configuration
// const API_BASE_URL = "https://jobpsych-backend.vercel.app";
const API_BASE_URL = "http://localhost:8000";

// API endpoints
export const API_ENDPOINTS = {
  ANALYZE_RESUME: `${API_BASE_URL}/api/analyze-resume`,
};

// Export base URL for flexibility
export { API_BASE_URL };
