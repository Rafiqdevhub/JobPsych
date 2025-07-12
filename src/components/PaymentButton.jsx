import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const PaymentButton = ({
  clientSecret,
  amount,
  onSuccess,
  onError,
  disabled = false,
  className = "",
  children,
  ...props
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  const handlePayment = async () => {
    console.warn("PaymentButton clicked! Starting payment process...");

    // Prevent double-clicks
    if (processing || disabled) {
      console.warn(
        "Payment blocked: processing =",
        processing,
        "disabled =",
        disabled
      );
      return;
    }

    if (!stripe || !elements) {
      console.error(
        "Stripe not ready: stripe =",
        !!stripe,
        "elements =",
        !!elements
      );
      if (onError) {
        onError(
          "Payment system is still loading. Please wait a moment and try again."
        );
      }
      return;
    }

    if (!clientSecret) {
      console.error("No client secret provided");
      if (onError) {
        onError(
          "Payment setup incomplete. Please refresh the page and try again."
        );
      }
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      console.error("Card element not found");
      if (onError) {
        onError(
          "Card element not found. Please refresh the page and try again."
        );
      }
      return;
    }

    console.warn(
      "Starting payment process with client secret:",
      clientSecret ? "present" : "missing"
    );
    setProcessing(true);

    try {
      // First, create payment method to validate card
      const { error: methodError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
        });

      if (methodError) {
        console.error("Payment method creation failed:", methodError);
        if (onError) {
          onError(methodError.message);
        }
        return;
      }

      console.warn(
        "Payment method created successfully, confirming payment..."
      );

      // Then confirm the payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (result.error) {
        console.error("Payment confirmation failed:", result.error);
        if (onError) {
          onError(result.error.message);
        }
      } else if (result.paymentIntent.status === "succeeded") {
        console.warn("Payment succeeded:", result.paymentIntent.id);
        if (onSuccess) {
          onSuccess(result.paymentIntent);
        }
      } else {
        console.error("Payment intent status:", result.paymentIntent.status);
        if (onError) {
          onError("Payment was not completed successfully. Please try again.");
        }
      }
    } catch (error) {
      console.error("Payment error:", error);
      const errorMessage =
        error.message || "An unexpected error occurred. Please try again.";
      if (onError) {
        onError(errorMessage);
      }
    } finally {
      setProcessing(false);
    }
  };

  // Force the button to be clickable for debugging
  const isButtonDisabled = processing; // Remove the || disabled for now

  const defaultClassName = `w-full py-4 px-4 rounded-md text-white font-medium transition-all duration-300 ${
    isButtonDisabled
      ? "bg-indigo-400 cursor-not-allowed opacity-70"
      : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 active:from-indigo-800 active:to-purple-800 hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 flex justify-center items-center`;

  // Debug logging
  console.warn("PaymentButton props:", {
    clientSecret: !!clientSecret,
    amount,
    disabled,
    processing,
    isButtonDisabled,
    stripeReady: !!stripe,
    elementsReady: !!elements,
  });

  return (
    <button
      type="button"
      onClick={(e) => {
        console.warn("Button physically clicked!", e);
        handlePayment();
      }}
      disabled={isButtonDisabled}
      className={className || defaultClassName}
      style={{ pointerEvents: "auto", zIndex: 1000 }}
      {...props}
    >
      {processing ? (
        <div className="flex items-center justify-center">
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
          <span className="text-base">Processing Payment...</span>
        </div>
      ) : children ? (
        children
      ) : (
        <div className="flex items-center justify-center">
          <span className="mr-2 text-lg">🔒 Pay</span>
          <span className="font-bold text-lg">${amount}</span>
          <svg
            className="ml-2 h-5 w-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </div>
      )}
    </button>
  );
};

export default PaymentButton;
