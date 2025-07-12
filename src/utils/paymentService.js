import { API_ENDPOINTS, PAYMENT_API_BASE_URL } from "./api.js";

/**
 * Payment Service - Handles all payment-related API calls
 * Integrates with the backend payment service for JobPsych
 */

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
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Validate the response structure
    if (!data || typeof data !== "object") {
      console.warn("Invalid API response format, returning fallback structure");
      return {
        success: false,
        error: "Invalid response format",
        data: null,
      };
    }

    return data;
  } catch (error) {
    console.error("Error fetching plans:", error);
    // Return a consistent error structure instead of throwing
    return {
      success: false,
      error:
        error.message || "Failed to fetch available plans. Please try again.",
      data: null,
    };
  }
};

/**
 * Create a payment/subscription for the selected plan
 * @param {string} plan - Plan ID ('free' or 'pro')
 * @param {string} customerEmail - Customer email address
 * @param {string} customerName - Customer name
 * @param {Object} metadata - Additional metadata
 * @returns {Promise<Object>} Payment response
 */
export const createPayment = async (
  plan,
  customerEmail,
  customerName = "",
  metadata = {}
) => {
  try {
    const response = await fetch(API_ENDPOINTS.CREATE_PAYMENT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        plan,
        customer_email: customerEmail,
        customer_name: customerName,
        metadata,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating payment:", error);
    throw new Error(
      error.message || "Failed to create payment. Please try again."
    );
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
      `${API_ENDPOINTS.PAYMENT_STATUS}/${paymentId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching payment status:", error);
    throw new Error(
      error.message || "Failed to fetch payment status. Please try again."
    );
  }
};

/**
 * Transform backend plan data to frontend format
 * @param {Object} backendPlans - Plans from backend API
 * @returns {Array} Formatted plans for frontend
 */
export const transformPlansForUI = (backendPlans) => {
  if (!backendPlans || !backendPlans.data || !backendPlans.data.plans) {
    return [];
  }

  const plans = backendPlans.data.plans;

  return [
    {
      id: "free",
      name: plans.free.name,
      price: "$0",
      period: "forever",
      description: plans.free.description,
      features: plans.free.features,
      resumeLimit: plans.free.resumeLimit,
      popular: false,
      current: false,
      buttonText: "Start Free",
      buttonDisabled: false,
    },
    {
      id: "pro",
      name: plans.pro.name,
      price: `$${plans.pro.price}`,
      period: "per user",
      description: plans.pro.description,
      features: plans.pro.features,
      resumeLimit: plans.pro.resumeLimit,
      popular: true,
      current: false,
      buttonText: "Upgrade to Pro",
      buttonDisabled: false,
    },
  ];
};

/**
 * Check if payment service is available
 * @returns {Promise<boolean>} Service availability
 */
export const checkPaymentServiceHealth = async () => {
  try {
    const response = await fetch(`${PAYMENT_API_BASE_URL}/health`, {
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
    return plansData.plan_comparison || [];
  } catch (error) {
    console.error("Error fetching plan comparison:", error);
    return [];
  }
};

// Default fallback plans if backend is unavailable
export const DEFAULT_PLANS = [
  {
    id: "free",
    name: "Free Trial",
    price: "$0",
    period: "no signup required",
    description: "Try JobPsych instantly without creating an account",
    features: ["2 resume analyses", "No account required", "Instant access"],
    resumeLimit: 2,
    popular: false,
    current: false,
    buttonText: "Try Free Now",
    buttonDisabled: false,
  },
  {
    id: "pro",
    name: "JobPsych Pro",
    price: "$50",
    period: "per month",
    description: "Full-featured platform for HR professionals and hiring teams",
    features: [
      "Unlimited resume analyses",
      "AI-enhanced interview questions",
      "Advanced candidate insights",
      "Skills gap analysis",
      "Priority email support",
      "Analytics dashboard",
    ],
    resumeLimit: -1,
    popular: true,
    current: false,
    buttonText: "Start Pro Trial",
    buttonDisabled: false,
  },
];
