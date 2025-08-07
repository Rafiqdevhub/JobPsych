import { createUser, getUserByEmail } from "./paymentService";

export const syncUserWithBackend = async (clerkUser) => {
  try {
    if (!clerkUser) {
      throw new Error("Clerk user is required");
    }

    const email = clerkUser.primaryEmailAddress?.emailAddress;
    const firstName = clerkUser.firstName || "";
    const lastName = clerkUser.lastName || "";
    const fullName = `${firstName} ${lastName}`.trim() || "JobPsych User";

    if (!email) {
      throw new Error("User email is required");
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser && existingUser.success) {
      return existingUser.data;
    }

    const newUser = await createUser(email, fullName);

    if (newUser.success) {
      return newUser.data;
    } else {
      throw new Error(newUser.message || "Failed to create user in backend");
    }
  } catch (error) {
    console.error("Error syncing user with backend:", error);

    if (error.message && error.message.includes("already exists")) {
      try {
        const existingUser = await getUserByEmail(
          clerkUser.primaryEmailAddress?.emailAddress
        );
        return existingUser?.data || null;
      } catch (fetchError) {
        console.error("Failed to fetch existing user:", fetchError);
        return null;
      }
    }

    return null;
  }
};

export const getUserSubscriptionStatus = async (email) => {
  try {
    const user = await getUserByEmail(email);

    if (user && user.success) {
      return {
        plan_type: user.data.plan_type,
        subscription_status: user.data.subscription_status,
        stripe_customer_id: user.data.stripe_customer_id,
        user_id: user.data.user_id,
        created_at: user.data.created_at,
        updated_at: user.data.updated_at,
      };
    }

    return null;
  } catch (error) {
    console.error("Error getting user subscription status:", error);
    return null;
  }
};

export const updateUserPlan = async (
  email,
  planType,
  subscriptionStatus = "active"
) => {
  try {
    const user = await getUserByEmail(email);

    if (!user || !user.success) {
      throw new Error("User not found in backend");
    }

    const { API_ENDPOINTS } = await import("./api");

    const response = await fetch(
      `${API_ENDPOINTS.UPDATE_USER}/${user.data.user_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan_type: planType,
          subscription_status: subscriptionStatus,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to update user plan: ${response.status}`);
    }

    const data = await response.json();

    if (data.success) {
      return data.data;
    } else {
      throw new Error(data.message || "Failed to update user plan");
    }
  } catch (error) {
    console.error("Error updating user plan:", error);
    return null;
  }
};

export const ensureUserInBackend = async (clerkUser) => {
  try {
    const backendUser = await syncUserWithBackend(clerkUser);

    if (backendUser) {
      return {
        exists: true,
        user: backendUser,
        plan_type: backendUser.plan_type || "free",
        subscription_status: backendUser.subscription_status || "inactive",
      };
    } else {
      return {
        exists: false,
        user: null,
        plan_type: "free",
        subscription_status: "inactive",
      };
    }
  } catch (error) {
    console.error("Error ensuring user in backend:", error);
    return {
      exists: false,
      user: null,
      plan_type: "free",
      subscription_status: "inactive",
    };
  }
};

export const checkUserServiceHealth = async () => {
  try {
    const { API_ENDPOINTS } = await import("./api");
    const response = await fetch(API_ENDPOINTS.CREATE_USER, {
      method: "HEAD",
    });

    return response.status < 500;
  } catch (error) {
    console.error("User service health check failed:", error);
    return false;
  }
};
