import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Elements } from "@stripe/react-stripe-js";
import { createPayment, fetchAvailablePlans } from "../utils/paymentService";
import stripePromise from "../utils/stripe";
import CheckoutForm from "./CheckoutForm";
import SimpleTestButton from "./SimpleTestButton";
import NavigationButton from "./NavigationButton";

const PaymentForm = ({ selectedPlan, planId }) => {
  const { user } = useUser();
  const [clientSecret, setClientSecret] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getPaymentIntent = async () => {
      if (planId === "free") {
        return;
      }

      try {
        setIsProcessing(true);
        setError(null);

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

        if (!paymentData.data?.client_secret) {
          throw new Error("No client secret received from payment service.");
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

    localStorage.setItem("userPlan", planId);
    localStorage.setItem("subscriptionActive", "true");
    localStorage.setItem("subscriptionDate", new Date().toISOString());

    setTimeout(() => {
      navigate("/dashboard", { replace: true });
    }, 1500);
  };

  const handlePaymentError = (errorMessage) => {
    setError(errorMessage);
  };

  const handleActivateFreePlan = () => {
    setIsProcessing(true);

    localStorage.setItem("userPlan", "free");
    localStorage.setItem("subscriptionActive", "true");
    localStorage.setItem("subscriptionDate", new Date().toISOString());

    setSuccess(true);
    setTimeout(() => {
      navigate("/dashboard", { replace: true });
    }, 1500);

    setIsProcessing(false);
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
            <button
              onClick={() => {
                try {
                  navigate("/dashboard");
                } catch (err) {
                  console.error(
                    "Manual navigation failed, using window.location",
                    err
                  );
                  window.location.href = "/dashboard";
                }
              }}
              className="mt-2 text-sm text-indigo-600 hover:text-indigo-500 underline"
            >
              Go to Dashboard Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  return clientSecret ? (
    <div>
      <CheckoutForm
        clientSecret={clientSecret}
        onSuccess={handlePaymentSuccess}
        onError={handlePaymentError}
        amount={selectedPlan.price.replace("$", "")}
      />
    </div>
  ) : error && error.includes("clientSecret") ? (
    <div className="space-y-4">
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-sm text-red-600">
          Payment system setup failed. Using test mode instead.
        </p>
      </div>
      <SimpleTestButton
        amount={selectedPlan.price.replace("$", "")}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  ) : (
    <div className="space-y-4">
      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-2 mb-4">
        <p className="text-xs text-yellow-600">
          DEBUG: No clientSecret - Error: {error || "none"} - Processing:{" "}
          {isProcessing}
        </p>
      </div>
      <div className="flex justify-center items-center my-6 p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600 mr-3"></div>
        <p className="text-lg font-medium text-gray-700">
          Setting up secure payment...
        </p>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-500 mb-4">
          If payment setup takes too long, you can use test mode:
        </p>
        <SimpleTestButton
          amount={selectedPlan.price.replace("$", "")}
          onSuccess={handlePaymentSuccess}
        />
        {import.meta.env.DEV && (
          <button
            onClick={() => {
              console.warn("Emergency success button clicked");
              handlePaymentSuccess({ id: "emergency_success_" + Date.now() });
            }}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
          >
            🚨 Emergency Success (Dev Only)
          </button>
        )}
      </div>
    </div>
  );
};

const PaymentPage = () => {
  const [searchParams] = useSearchParams();
  const planId = searchParams.get("plan");
  const { isSignedIn } = useUser();
  const [error] = useState(null);
  const [success, setSuccess] = useState(false);
  const [, setIsProcessing] = useState(false);
  const [stripeError, setStripeError] = useState(null);
  const navigate = useNavigate();
  const [plans, setPlans] = useState({
    free: { name: "Free", price: "$0", period: "2 Resume Analyses" },
    pro: { name: "Pro", price: "$50", period: "50 Resume Analyses" },
  });

  const selectedPlan = plans[planId] || plans.free;

  useEffect(() => {
    stripePromise.catch((err) => {
      console.error("Stripe loading error:", err);
      setStripeError(
        "Payment system configuration error. Please contact support."
      );
    });
  }, []);

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
      }
    };

    fetchPlans();
  }, []);

  useEffect(() => {
    if (planId === "free" && !success) {
      console.warn("PaymentPage: Auto-activating free plan");
      setIsProcessing(true);

      localStorage.setItem("userPlan", "free");
      localStorage.setItem("subscriptionActive", "true");
      localStorage.setItem("subscriptionDate", new Date().toISOString());

      console.warn("PaymentPage: Free plan data saved to localStorage");
      setSuccess(true);
      console.warn("PaymentPage: Redirecting to dashboard in 1.5 seconds...");
      setTimeout(() => {
        console.warn("PaymentPage: Executing navigation to /dashboard");
        try {
          navigate("/dashboard");
        } catch (err) {
          console.error(
            "PaymentPage: Navigation failed, using window.location",
            err
          );
          window.location.href = "/dashboard";
        }
      }, 1500);
      setIsProcessing(false);
    }
  }, [planId, navigate, success]);

  useEffect(() => {
    if (!isSignedIn) {
      localStorage.setItem("selectedPlan", planId);
      localStorage.setItem("redirectToPayment", "true");
      navigate("/sign-in");
    }
  }, [isSignedIn, navigate, planId]);

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
                  <button
                    onClick={() => {
                      try {
                        navigate("/dashboard");
                      } catch (err) {
                        console.error(
                          "Manual navigation failed, using window.location",
                          err
                        );
                        window.location.href = "/dashboard";
                      }
                    }}
                    className="mt-2 text-sm text-indigo-600 hover:text-indigo-500 underline"
                  >
                    Go to Dashboard Now
                  </button>
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
          ) : stripeError ? (
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
                    Payment System Error
                  </p>
                  <p className="mt-1 text-sm text-red-700">{stripeError}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="mt-2 text-sm text-indigo-600 hover:text-indigo-500"
                  >
                    Reload page
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Elements
              stripe={stripePromise}
              options={{
                appearance: {
                  theme: "stripe",
                  variables: {
                    colorPrimary: "#6366F1",
                    colorBackground: "#ffffff",
                    colorText: "#424770",
                    colorDanger: "#df1b41",
                  },
                },
              }}
            >
              <PaymentForm selectedPlan={selectedPlan} planId={planId} />
            </Elements>
          )}

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500 mb-1">
              🔒 Your payment is secured with SSL encryption. Your data is
              always protected.
            </p>
          </div>
          <div className="mb-6 relative z-10 mt-10 text-center">
            <NavigationButton
              to="/"
              className="inline-flex items-center gap-2 bg-blue-600 px-5 py-3 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              aria-label="Back to home page"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Back to Home</span>
            </NavigationButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
