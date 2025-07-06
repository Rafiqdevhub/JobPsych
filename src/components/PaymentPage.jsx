import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Elements } from "@stripe/react-stripe-js";
import { createPayment, fetchAvailablePlans } from "../utils/paymentService";
import stripePromise from "../utils/stripe";
import CheckoutForm from "./CheckoutForm";

const PaymentForm = ({ selectedPlan, planId }) => {
  const { user } = useUser();
  const [clientSecret, setClientSecret] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Fetch client secret when component mounts
  useEffect(() => {
    const getPaymentIntent = async () => {
      if (planId === "free") return;

      try {
        setIsProcessing(true);

        const paymentData = await createPayment(
          planId,
          user?.primaryEmailAddress?.emailAddress || "",
          `${user?.firstName || ""} ${user?.lastName || ""}`.trim() ||
            "JobPsych User"
        );

        if (!paymentData.success) {
          throw new Error(
            paymentData.message || "Failed to create payment. Please try again."
          );
        }

        setClientSecret(paymentData.data.client_secret);
      } catch (err) {
        setError(err.message || "Payment setup failed. Please try again.");
      } finally {
        setIsProcessing(false);
      }
    };

    if (user && planId !== "free") {
      getPaymentIntent();
    }
  }, [planId, user]);

  const handlePaymentSuccess = (_paymentIntent) => {
    setSuccess(true);

    // Save subscription info in local storage for dashboard to use
    localStorage.setItem("userPlan", planId);
    localStorage.setItem("subscriptionActive", "true");
    localStorage.setItem("subscriptionDate", new Date().toISOString());

    // After successful payment, redirect to dashboard
    setTimeout(() => navigate("/dashboard"), 2000);
  };

  const handlePaymentError = (errorMessage) => {
    setError(errorMessage);
  };

  const handleActivateFreePlan = async () => {
    setIsProcessing(true);

    try {
      // Just record that the user has the free plan
      localStorage.setItem("userPlan", "free");
      localStorage.setItem("subscriptionActive", "true");
      localStorage.setItem("subscriptionDate", new Date().toISOString());

      setSuccess(true);
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      console.error("Free plan activation error:", err);
      setError("Failed to activate free plan. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (planId === "free") {
    return (
      <div className="my-6">
        <button
          onClick={handleActivateFreePlan}
          disabled={isProcessing}
          className={`w-full py-3 px-4 rounded-md text-white font-medium ${
            isProcessing
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-500"
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 flex justify-center`}
        >
          {isProcessing ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </>
          ) : (
            "Activate Free Plan"
          )}
        </button>
      </div>
    );
  }

  if (isProcessing && !clientSecret) {
    return (
      <div className="flex justify-center my-6">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        <p className="ml-3 text-lg font-medium text-gray-700">
          Setting up payment...
        </p>
      </div>
    );
  }

  if (error && !clientSecret) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4 my-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-red-800">
              Payment setup failed
            </p>
            <p className="mt-1 text-sm text-red-700">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 text-sm text-indigo-600 hover:text-indigo-500"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-md p-4 my-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-green-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-green-800">
              {planId === "free"
                ? "Free plan activated!"
                : "Payment successful!"}
            </p>
            <p className="mt-1 text-sm text-green-700">
              Redirecting you to the dashboard...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return clientSecret ? (
    <CheckoutForm
      clientSecret={clientSecret}
      onSuccess={handlePaymentSuccess}
      onError={handlePaymentError}
      planId={planId}
      amount={selectedPlan.price.replace("$", "")}
    />
  ) : null;
};

const PaymentPage = () => {
  const [searchParams] = useSearchParams();
  const planId = searchParams.get("plan");
  const { isSignedIn } = useUser();
  const [error] = useState(null);
  const [success, setSuccess] = useState(false);
  const [, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const [plans, setPlans] = useState({
    free: { name: "Free", price: "$0", period: "forever" },
    pro: { name: "Pro", price: "$29.99", period: "month" },
    premium: { name: "Premium", price: "$49.99", period: "month" },
  });

  const selectedPlan = plans[planId] || plans.free;

  // Fetch actual plan data from the API
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await fetchAvailablePlans();

        if (data.success) {
          const apiPlans = {
            free: {
              name: data.data.plans.free.name,
              price: "$0",
              period: "forever",
            },
            pro: {
              name: data.data.plans.pro.name,
              price: `$${data.data.plans.pro.price}`,
              period: "per user",
              features: data.data.plans.pro.features,
            },
          };
          setPlans(apiPlans);
        }
      } catch (err) {
        console.error("Failed to fetch plans:", err);
        // Fall back to default plans if API call fails
      }
    };

    fetchPlans();
  }, []);

  // Handle free plan activation automatically
  useEffect(() => {
    if (planId === "free" && !success) {
      // Free plan doesn't need payment processing
      setIsProcessing(true);

      // Just record that the user has the free plan
      localStorage.setItem("userPlan", "free");
      localStorage.setItem("subscriptionActive", "true");
      localStorage.setItem("subscriptionDate", new Date().toISOString());

      setSuccess(true);
      setTimeout(() => navigate("/dashboard"), 2000);
      setIsProcessing(false);
    }
    // For paid plans, the PaymentForm component handles the payment
  }, [planId, navigate, success]);

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (!isSignedIn) {
      localStorage.setItem("selectedPlan", planId);
      localStorage.setItem("redirectToPayment", "true");
      navigate("/sign-in");
    }
  }, [isSignedIn, navigate, planId]);

  // Show loading while redirecting to sign in
  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        <p className="ml-3 text-lg font-medium text-gray-700">
          Redirecting to sign in...
        </p>
      </div>
    );
  }

  // Main payment page content
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-12">
      <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-8 py-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Complete Your Subscription
            </h2>
            <p className="mt-2 text-gray-600">
              You're subscribing to the {selectedPlan.name} plan
            </p>
          </div>

          <div className="border-t border-b border-gray-200 py-6 my-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-medium">
                {selectedPlan.name} Plan
              </span>
              <span className="text-indigo-600 font-bold">
                {selectedPlan.price}/{selectedPlan.period}
              </span>
            </div>
            {planId !== "free" && (
              <p className="mt-2 text-sm text-gray-500">
                You'll be charged {selectedPlan.price} every{" "}
                {selectedPlan.period === "month"
                  ? "month"
                  : selectedPlan.period}
                . Cancel anytime.
              </p>
            )}
          </div>

          {success ? (
            <div className="bg-green-50 border border-green-200 rounded-md p-4 my-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-green-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">
                    {planId === "free"
                      ? "Free plan activated!"
                      : "Payment successful!"}
                  </p>
                  <p className="mt-1 text-sm text-green-700">
                    Redirecting you to the dashboard...
                  </p>
                </div>
              </div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 my-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">
                    Payment failed
                  </p>
                  <p className="mt-1 text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          ) : (
            <Elements stripe={stripePromise}>
              <PaymentForm selectedPlan={selectedPlan} planId={planId} />
            </Elements>
          )}

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              🔒 Your payment is secured with SSL encryption. Your data is
              always protected.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
