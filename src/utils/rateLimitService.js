import { API_ENDPOINTS } from "./api.js";

/**
 * Rate Limit Service - Handles rate limit status checks and related functionality
 */

/**
 * Get the current rate limit status for the user/IP
 * @returns {Promise<Object>} Rate limit status data
 */
export const getRateLimitStatus = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.RATE_LIMIT_STATUS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include cookies for authentication
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching rate limit status:", error);
    throw new Error("Failed to fetch rate limit status. Please try again.");
  }
};

/**
 * Get signup required information
 * @returns {Promise<Object>} Signup information
 */
export const getSignupRequiredInfo = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.SIGNUP_REQUIRED_INFO, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching signup info:", error);
    throw new Error("Failed to fetch signup information. Please try again.");
  }
};

/**
 * Get upgrade plan information
 * @returns {Promise<Object>} Upgrade plan information
 */
export const getUpgradePlanInfo = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.UPGRADE_PLAN_INFO, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching upgrade info:", error);
    throw new Error("Failed to fetch upgrade information. Please try again.");
  }
};

/**
 * Transform rate limit status for UI display
 * @param {Object} rateLimitData - Raw rate limit data from backend
 * @returns {Object} Formatted data for UI
 */
export const transformRateLimitForUI = (rateLimitData) => {
  if (!rateLimitData) return null;

  return {
    hasReachedLimit: rateLimitData.remaining_uploads === 0,
    remainingUploads: rateLimitData.remaining_uploads,
    uploadsUsed: rateLimitData.uploads_used,
    isAuthenticated: rateLimitData.authenticated || false,
    tier: rateLimitData.tier || "anonymous",
    isDevelopment: rateLimitData.is_development || false,
    signupUrl: rateLimitData.signup_url,
    upgradeUrl: rateLimitData.upgrade_url,
    limitType: rateLimitData.limit_type,
    userId: rateLimitData.user_id,
    ip: rateLimitData.ip,
  };
};

/**
 * Check if user can upload more resumes
 * @param {Object} rateLimitData - Rate limit data from backend
 * @returns {boolean} Whether user can upload
 */
export const canUploadMore = (rateLimitData) => {
  if (!rateLimitData) return true; // Default to allowing upload if no data

  // Development mode always allows uploads
  if (rateLimitData.is_development) return true;

  // Premium users always can upload
  if (rateLimitData.tier === "premium") return true;

  // Check remaining uploads
  return rateLimitData.remaining_uploads > 0;
};

/**
 * Get appropriate action for user based on rate limit status
 * @param {Object} rateLimitData - Rate limit data from backend
 * @returns {Object} Recommended action
 */
export const getRecommendedAction = (rateLimitData) => {
  if (!rateLimitData) {
    return { action: "upload", message: "Ready to upload" };
  }

  if (rateLimitData.is_development) {
    return {
      action: "upload",
      message: "Development mode - unlimited uploads",
    };
  }

  if (rateLimitData.tier === "premium") {
    return { action: "upload", message: "Premium user - unlimited uploads" };
  }

  if (rateLimitData.remaining_uploads > 0) {
    return {
      action: "upload",
      message: `${rateLimitData.remaining_uploads} upload${
        rateLimitData.remaining_uploads === 1 ? "" : "s"
      } remaining`,
    };
  }

  // User has reached their limit
  if (!rateLimitData.authenticated) {
    return {
      action: "signup",
      message: "Create account for 2 more free analyses",
      url: rateLimitData.signup_url || "/sign-up",
    };
  } else if (rateLimitData.tier === "free") {
    return {
      action: "upgrade",
      message: "Upgrade to Pro for unlimited access",
      url: rateLimitData.upgrade_url || "/pricing",
    };
  }

  return { action: "wait", message: "Rate limit exceeded" };
};
