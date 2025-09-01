import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import PaymentButton from "./PaymentButton";

const CheckoutForm = ({ clientSecret, onSuccess, onError, amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [stripeLoaded, setStripeLoaded] = useState(false);

  useEffect(() => {
    if (stripe && elements) {
      setStripeLoaded(true);
    }
  }, [stripe, elements, clientSecret, amount]);

  const handleCardChange = (event) => {
    if (event.error) {
      setCardError(event.error.message);
    } else {
      setCardError("");
    }
  };

  const handlePaymentError = (errorMessage) => {
    setCardError(errorMessage);
    if (onError) {
      onError(errorMessage);
    }
  };

  const handlePaymentSuccess = (paymentIntent) => {
    setCardError("");
    if (onSuccess) {
      onSuccess(paymentIntent);
    }
  };

  if (!stripeLoaded) {
    return (
      <div className="flex justify-center items-center my-6 p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-indigo-600 mr-3"></div>
        <p className="text-gray-700">Initializing secure payment...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Card details
        </label>
        <div className="border border-gray-300 rounded-md p-4 bg-white focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all duration-200 hover:border-indigo-400">
          <CardElement
            onChange={handleCardChange}
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  fontFamily: "'Inter', sans-serif",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                  iconColor: "#6366F1",
                },
                invalid: {
                  color: "#9e2146",
                  iconColor: "#ef4444",
                },
              },
              hidePostalCode: true,
            }}
          />
        </div>

        {cardError && (
          <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded animate-pulse">
            <p className="text-sm text-red-600 flex items-center">
              <svg
                className="w-4 h-4 mr-1 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              {cardError}
            </p>
          </div>
        )}

        <div className="mt-3 flex items-center">
          <div className="flex-shrink-0">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <p className="ml-2 text-xs text-gray-500">
            Your payment information is encrypted and secure
          </p>
        </div>
      </div>

      <div className="relative z-10">
        <PaymentButton
          clientSecret={clientSecret}
          amount={amount}
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
        />
      </div>

      <div className="mt-3 text-center">
        <p className="text-xs text-gray-500">
          By clicking "Pay", you agree to our{" "}
          <a href="#" className="text-indigo-600 hover:text-indigo-800">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-indigo-600 hover:text-indigo-800">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default CheckoutForm;
