import React, { useState, useEffect } from "react";
import { useUserManager } from "../hooks/useUserManager";
import {
  getSubscriptionDetails,
  cancelSubscription,
} from "../utils/paymentService";

const SubscriptionManagement = () => {
  const {
    clerkUser,
    userPlan,
    subscriptionStatus,
    isActive,
    isPro,
    resumeLimit,
    refreshUserData,
  } = useUserManager();

  const [subscriptionDetails, setSubscriptionDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);

  useEffect(() => {
    const loadSubscriptionDetails = async () => {
      if (!clerkUser?.primaryEmailAddress?.emailAddress) {
        setIsLoading(false);
        return;
      }

      try {
        setError(null);
        const details = await getSubscriptionDetails(
          clerkUser.primaryEmailAddress.emailAddress
        );
        setSubscriptionDetails(details);
      } catch (err) {
        console.error("Error loading subscription details:", err);
        setError("Failed to load subscription details");
      } finally {
        setIsLoading(false);
      }
    };

    loadSubscriptionDetails();
  }, [clerkUser, userPlan, subscriptionStatus]);

  const handleCancelSubscription = async () => {
    if (!clerkUser?.primaryEmailAddress?.emailAddress) return;

    try {
      setIsCanceling(true);
      await cancelSubscription(clerkUser.primaryEmailAddress.emailAddress);
      await refreshUserData();
      setShowCancelModal(false);
    } catch (err) {
      console.error("Error canceling subscription:", err);
      setError("Failed to cancel subscription");
    } finally {
      setIsCanceling(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: "bg-green-100 text-green-800", label: "Active" },
      inactive: { color: "bg-gray-100 text-gray-800", label: "Inactive" },
      canceled: { color: "bg-red-100 text-red-800", label: "Canceled" },
      past_due: { color: "bg-yellow-100 text-yellow-800", label: "Past Due" },
      trialing: { color: "bg-blue-100 text-blue-800", label: "Trial" },
    };

    const config = statusConfig[status] || statusConfig.inactive;
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.label}
      </span>
    );
  };

  const getPlanBadge = (plan) => {
    const planConfig = {
      free: { color: "bg-emerald-100 text-emerald-800", label: "Free Plan" },
      pro: { color: "bg-indigo-100 text-indigo-800", label: "Pro Plan" },
      premium: {
        color: "bg-purple-100 text-purple-800",
        label: "Premium Plan",
      },
    };

    const config = planConfig[plan] || planConfig.free;
    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.color}`}
      >
        {config.label}
      </span>
    );
  };

  const getUsageInfo = () => {
    if (resumeLimit === -1) {
      return {
        text: "Unlimited resume uploads",
        color: "text-green-600",
        icon: "∞",
      };
    } else {
      return {
        text: `Up to ${resumeLimit} resume uploads`,
        color: "text-blue-600",
        icon: resumeLimit.toString(),
      };
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    );
  }

  const usageInfo = getUsageInfo();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Subscription Details
            </h3>
            <div className="flex items-center space-x-2">
              {getPlanBadge(userPlan)}
              {getStatusBadge(subscriptionStatus)}
            </div>
          </div>
        </div>

        <div className="px-6 py-4 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">
                Current Plan
              </h4>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                {subscriptionDetails?.plan_details?.name || "JobPsych Free"}
              </p>
              <p className="text-sm text-gray-600">
                {subscriptionDetails?.plan_details?.description ||
                  "Basic plan with limited features"}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500">
                Resume Uploads
              </h4>
              <div className="mt-1 flex items-center">
                <span className={`text-2xl font-bold ${usageInfo.color} mr-2`}>
                  {usageInfo.icon}
                </span>
                <span className="text-sm text-gray-600">{usageInfo.text}</span>
              </div>
            </div>
          </div>

          {subscriptionDetails?.plan_details?.features && (
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">
                Plan Features
              </h4>
              <ul className="space-y-1">
                {subscriptionDetails.plan_details.features.map(
                  (feature, index) => (
                    <li
                      key={index}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <svg
                        className="w-4 h-4 text-green-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  )
                )}
              </ul>
            </div>
          )}

          <div className="bg-gray-50 rounded-md p-4">
            <h4 className="text-sm font-medium text-gray-500 mb-2">
              Account Information
            </h4>
            <div className="space-y-1 text-sm text-gray-600">
              <p>
                <span className="font-medium">Email:</span>{" "}
                {subscriptionDetails?.email ||
                  clerkUser?.primaryEmailAddress?.emailAddress}
              </p>
              <p>
                <span className="font-medium">Name:</span>{" "}
                {subscriptionDetails?.name ||
                  `${clerkUser?.firstName || ""} ${
                    clerkUser?.lastName || ""
                  }`.trim()}
              </p>
              {subscriptionDetails?.created_at && (
                <p>
                  <span className="font-medium">Member since:</span>{" "}
                  {new Date(
                    subscriptionDetails.created_at
                  ).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
            <div className="flex space-x-3">
              {!isPro && isActive && (
                <button
                  onClick={() => (window.location.href = "/payment?plan=pro")}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
                >
                  Upgrade to Pro
                </button>
              )}

              <button
                onClick={refreshUserData}
                className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Refresh Status
              </button>
            </div>

            {isPro && isActive && (
              <button
                onClick={() => setShowCancelModal(true)}
                className="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Cancel Subscription
              </button>
            )}
          </div>
        </div>
      </div>

      {showCancelModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Cancel Subscription
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to cancel your subscription? You'll lose
              access to Pro features immediately.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={handleCancelSubscription}
                disabled={isCanceling}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-red-700 disabled:opacity-50 transition-colors"
              >
                {isCanceling ? "Canceling..." : "Yes, Cancel"}
              </button>
              <button
                onClick={() => setShowCancelModal(false)}
                disabled={isCanceling}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-400 disabled:opacity-50 transition-colors"
              >
                Keep Subscription
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionManagement;
