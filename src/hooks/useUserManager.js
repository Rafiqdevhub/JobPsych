/**
 * User Management Hook
 * Custom React hook for integrating Clerk auth with backend user management
 */

import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import {
  getUserSubscriptionStatus,
  ensureUserInBackend,
  updateUserPlan,
} from "../utils/userManager";

/**
 * Custom hook for managing user authentication and backend synchronization
 * @returns {Object} User management state and functions
 */
export const useUserManager = () => {
  const { user: clerkUser, isSignedIn, isLoaded } = useUser();
  const [backendUser, setBackendUser] = useState(null);
  const [userPlan, setUserPlan] = useState("free");
  const [subscriptionStatus, setSubscriptionStatus] = useState("inactive");
  const [isBackendSynced, setIsBackendSynced] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState(null);

  // Sync user with backend when Clerk user changes
  useEffect(() => {
    const syncUser = async () => {
      if (!isLoaded || !isSignedIn || !clerkUser) {
        setBackendUser(null);
        setIsBackendSynced(false);
        return;
      }

      if (isBackendSynced) {
        return; // Already synced
      }

      try {
        setIsSyncing(true);
        setSyncError(null);

        const userStatus = await ensureUserInBackend(clerkUser);

        if (userStatus.exists && userStatus.user) {
          setBackendUser(userStatus.user);
          setUserPlan(userStatus.plan_type);
          setSubscriptionStatus(userStatus.subscription_status);
        } else {
          // Set defaults if backend sync failed
          setUserPlan("free");
          setSubscriptionStatus("inactive");
        }

        setIsBackendSynced(true);
      } catch (error) {
        console.error("Error syncing user with backend:", error);
        setSyncError(error.message);

        // Set defaults on error
        setUserPlan("free");
        setSubscriptionStatus("inactive");
        setIsBackendSynced(false);
      } finally {
        setIsSyncing(false);
      }
    };

    syncUser();
  }, [clerkUser, isSignedIn, isLoaded, isBackendSynced]);

  // Function to refresh user data from backend
  const refreshUserData = async () => {
    if (!clerkUser?.primaryEmailAddress?.emailAddress) {
      return;
    }

    try {
      setIsSyncing(true);
      const subscriptionData = await getUserSubscriptionStatus(
        clerkUser.primaryEmailAddress.emailAddress
      );

      if (subscriptionData) {
        setUserPlan(subscriptionData.plan_type);
        setSubscriptionStatus(subscriptionData.subscription_status);

        // Update the full backend user data
        const userStatus = await ensureUserInBackend(clerkUser);
        if (userStatus.user) {
          setBackendUser(userStatus.user);
        }
      }
    } catch (error) {
      console.error("Error refreshing user data:", error);
      setSyncError(error.message);
    } finally {
      setIsSyncing(false);
    }
  };

  // Function to update user plan
  const upgradeUserPlan = async (newPlan, newStatus = "active") => {
    if (!clerkUser?.primaryEmailAddress?.emailAddress) {
      throw new Error("User email not available");
    }

    try {
      setIsSyncing(true);
      const updatedUser = await updateUserPlan(
        clerkUser.primaryEmailAddress.emailAddress,
        newPlan,
        newStatus
      );

      if (updatedUser) {
        setBackendUser(updatedUser);
        setUserPlan(updatedUser.plan_type);
        setSubscriptionStatus(updatedUser.subscription_status);

        // Also update localStorage for backward compatibility
        localStorage.setItem("userPlan", updatedUser.plan_type);
        localStorage.setItem(
          "subscriptionActive",
          newStatus === "active" ? "true" : "false"
        );
        localStorage.setItem("subscriptionDate", new Date().toISOString());

        return updatedUser;
      } else {
        throw new Error("Failed to update user plan in backend");
      }
    } catch (error) {
      console.error("Error upgrading user plan:", error);
      setSyncError(error.message);
      throw error;
    } finally {
      setIsSyncing(false);
    }
  };

  // Function to get user's resume upload limit
  const getResumeUploadLimit = () => {
    if (userPlan === "pro" || userPlan === "premium") {
      return -1; // Unlimited
    }
    return 2; // Free plan limit
  };

  // Function to check if user can upload more resumes
  const canUploadResume = (currentUploads = 0) => {
    const limit = getResumeUploadLimit();
    return limit === -1 || currentUploads < limit;
  };

  // Function to get user display information
  const getUserDisplayInfo = () => {
    const email = clerkUser?.primaryEmailAddress?.emailAddress || "";
    const name = clerkUser
      ? `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() ||
        "JobPsych User"
      : "Guest";

    return {
      email,
      name,
      plan: userPlan,
      status: subscriptionStatus,
      isActive: subscriptionStatus === "active",
      isPro: userPlan === "pro" || userPlan === "premium",
      resumeLimit: getResumeUploadLimit(),
      canUpload: canUploadResume(),
    };
  };

  return {
    // Clerk user data
    clerkUser,
    isSignedIn,
    isLoaded,

    // Backend user data
    backendUser,
    userPlan,
    subscriptionStatus,

    // Sync status
    isBackendSynced,
    isSyncing,
    syncError,

    // Functions
    refreshUserData,
    upgradeUserPlan,
    getResumeUploadLimit,
    canUploadResume,
    getUserDisplayInfo,

    // Helper properties
    isActive: subscriptionStatus === "active",
    isPro: userPlan === "pro" || userPlan === "premium",
    resumeLimit: getResumeUploadLimit(),
  };
};

export default useUserManager;
