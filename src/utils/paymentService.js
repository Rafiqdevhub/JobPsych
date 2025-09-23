import { API_ENDPOINTS } from "./api";

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
        return null;
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
    popular: key === "pro",
  }));
};

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

export const getPlanComparison = async () => {
  try {
    const plansData = await fetchAvailablePlans();
    return transformPlansForUI(plansData);
  } catch (error) {
    console.error("Error getting plan comparison:", error);
    return getDefaultPlans();
  }
};

export const getDefaultPlans = () => {
  return DEFAULT_PLANS;
};

export const createPayment = createSubscription;
export const fetchPlans = fetchAvailablePlans;

export const pollPaymentStatus = async (
  paymentId,
  maxAttempts = 20,
  intervalMs = 2000
) => {
  let attempts = 0;

  while (attempts < maxAttempts) {
    try {
      const status = await getPaymentStatus(paymentId);

      if (status && status.success) {
        const paymentStatus = status.data.status;

        if (
          ["succeeded", "canceled", "payment_failed"].includes(paymentStatus)
        ) {
          return status;
        }
      }

      attempts++;

      if (attempts < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, intervalMs));
      }
    } catch (error) {
      console.error(
        `Payment status polling attempt ${attempts + 1} failed:`,
        error
      );
      attempts++;

      if (attempts < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, intervalMs));
      }
    }
  }

  throw new Error("Payment status polling timed out");
};

export const getSubscriptionDetails = async (email) => {
  try {
    const user = await getUserByEmail(email);

    if (!user || !user.success) {
      return null;
    }

    const userData = user.data;

    return {
      user_id: userData.user_id,
      email: userData.email,
      name: userData.name,
      plan_type: userData.plan_type,
      subscription_status: userData.subscription_status,
      created_at: userData.created_at,
      updated_at: userData.updated_at,
      plan_details:
        getDefaultPlans().find((plan) => plan.id === userData.plan_type) ||
        getDefaultPlans()[0],
    };
  } catch (error) {
    console.error("Error getting subscription details:", error);
    return null;
  }
};

export const cancelSubscription = async (email) => {
  try {
    const user = await getUserByEmail(email);

    if (!user || !user.success) {
      throw new Error("User not found");
    }

    const response = await fetch(
      `${API_ENDPOINTS.UPDATE_USER}/${user.data.user_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscription_status: "canceled",
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to cancel subscription: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error canceling subscription:", error);
    throw error;
  }
};

export const validatePaymentAmount = (planId, amount) => {
  const plan = getDefaultPlans().find((p) => p.id === planId);
  if (!plan) return false;

  const expectedAmount = parseInt(plan.price.replace("$", "")) || 0;
  return expectedAmount === amount;
};

export const generatePaymentSummary = (planId, email) => {
  const plan =
    getDefaultPlans().find((p) => p.id === planId) || getDefaultPlans()[0];
  const amount = parseInt(plan.price.replace("$", "")) || 0;

  return {
    plan: {
      id: planId,
      name: plan.name,
      description: plan.description,
      features: plan.features,
      resumeLimit: plan.resumeLimit,
    },
    payment: {
      amount: amount,
      currency: "USD",
      formatted_amount: plan.price,
      is_free: amount === 0,
    },
    customer: {
      email: email,
    },
    summary: {
      total: amount,
      tax: 0,
      grand_total: amount,
      billing_cycle: planId === "pro" ? "monthly" : "one-time",
    },
  };
};
