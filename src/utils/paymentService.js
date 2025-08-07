/**
 * Payment Service - Handles all payment-related API calls
 * Integrates with the backend payment service for JobPsych
 */

import { API_ENDPOINTS } from "./api";

/**
 * Default plans configuration for fallback
 */
export const DEFAULT_PLANS = [
  {
    id: "free",
    name: "JobPsych Free",
    price: "$0",
    period: "2 Resume Analyses",
    description: "Basic plan with limited features",
    features: [
      "Upload up to 2 resumes",
      "Basic job matching",
      "Basic career insights",
    ],
    resumeLimit: 2,
    popular: false,
  },
  {
    id: "pro",
    name: "JobPsych Pro",
    price: "$50",
    period: "50 Resume Analyses",
    description: "Professional plan with unlimited resume uploads",
    features: [
      "Unlimited resume uploads",
      "Advanced job matching",
      "Detailed personality insights",
      "Career recommendations",
      "Priority support",
    ],
    resumeLimit: -1,
    popular: true,
  },
];

/**
 * Fetch available plans from the payment service
 * @returns {Promise<Object>} Plans data from backend
 */
export const fetchAvailablePlans = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.GET_PLANS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch plans: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching available plans:", error);
    throw error;
  }
};

/**
 * Create a subscription for the selected plan (free or pro)
 * @param {string} plan - Plan ID ('free' or 'pro')
 * @param {string} customerEmail - Customer email address
 * @param {string} customerName - Customer name
 * @param {Object} metadata - Additional metadata
 * @returns {Promise<Object>} Subscription response
 */
export const createSubscription = async (
  plan,
  customerEmail,
  customerName = "",
  metadata = {}
) => {
  try {
    const response = await fetch(API_ENDPOINTS.CREATE_SUBSCRIPTION, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        plan: plan.toLowerCase(),
        customer_email: customerEmail,
        customer_name: customerName,
        metadata,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Subscription creation failed: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating subscription:", error);
    throw error;
  }
};

/**
 * Get payment status by payment ID
 * @param {string} paymentId - Payment intent ID
 * @returns {Promise<Object>} Payment status
 */
export const getPaymentStatus = async (paymentId) => {
  try {
    const response = await fetch(
      `${API_ENDPOINTS.GET_PAYMENT_STATUS}/${paymentId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to get payment status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting payment status:", error);
    throw error;
  }
};

/**
 * Create a user in the payment system
 * @param {string} email - User email
 * @param {string} name - User name
 * @returns {Promise<Object>} User creation response
 */
export const createUser = async (email, name) => {
  try {
    const response = await fetch(API_ENDPOINTS.CREATE_USER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        name,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `User creation failed: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

/**
 * Get user by email
 * @param {string} email - User email
 * @returns {Promise<Object>} User data
 */
export const getUserByEmail = async (email) => {
  try {
    const response = await fetch(
      `${API_ENDPOINTS.GET_USER_BY_EMAIL}/${encodeURIComponent(email)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return null; // User not found
      }
      throw new Error(`Failed to get user: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting user by email:", error);
    throw error;
  }
};

/**
 * Store subscription data in MongoDB
 * @param {Object} subscriptionData - Subscription data to store
 * @returns {Promise<Object>} Storage response
 */
export const storeSubscriptionData = async (subscriptionData) => {
  try {
    const response = await fetch(API_ENDPOINTS.STORE_SUBSCRIPTION, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subscriptionData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Failed to store subscription: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error storing subscription data:", error);
    throw error;
  }
};

/**
 * Transform backend plan data to frontend format
 * @param {Object} backendPlans - Plans from backend API
 * @returns {Array} Formatted plans for frontend
 */
export const transformPlansForUI = (backendPlans) => {
  if (!backendPlans || !backendPlans.plans) {
    return [];
  }

  return Object.entries(backendPlans.plans).map(([key, plan]) => ({
    id: key,
    name: plan.name,
    price: plan.price,
    description: plan.description,
    features: plan.features || [],
    resumeLimit: plan.resumeLimit,
    popular: key === "pro", // Mark pro plan as popular
  }));
};

/**
 * Check if payment service is available
 * @returns {Promise<boolean>} Service availability
 */
export const checkPaymentServiceHealth = async () => {
  try {
    const response = await fetch(`${API_ENDPOINTS.GET_PLANS}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.ok;
  } catch (error) {
    console.error("Payment service health check failed:", error);
    return false;
  }
};

/**
 * Get plan comparison data from backend
 * @returns {Promise<Array>} Plan comparison data
 */
export const getPlanComparison = async () => {
  try {
    const plansData = await fetchAvailablePlans();
    return transformPlansForUI(plansData);
  } catch (error) {
    console.error("Error getting plan comparison:", error);
    // Return default fallback plans
    return getDefaultPlans();
  }
};

/**
 * Get default fallback plans if backend is unavailable
 * @returns {Array} Default plans
 */
export const getDefaultPlans = () => {
  return DEFAULT_PLANS;
};

// Legacy function names for backward compatibility
export const createPayment = createSubscription;
export const fetchPlans = fetchAvailablePlans;
