import React, { useState, useEffect } from "react";
import { pollPaymentStatus } from "../../utils/paymentService";

const PaymentStatusTracker = ({
  paymentId,
  onSuccess,
  onError,
  onCancel,
  expectedAmount,
  planName,
}) => {
  const [status, setStatus] = useState("processing");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    if (!paymentId) return;

    let progressInterval;
    let timeInterval;
    let cancelled = false;

    const trackPayment = async () => {
      try {
        progressInterval = setInterval(() => {
          setProgress((prev) => Math.min(prev + 5, 90));
        }, 500);

        timeInterval = setInterval(() => {
          setTimeElapsed((prev) => prev + 1);
        }, 1000);

        const result = await pollPaymentStatus(paymentId, 30, 2000);

        if (cancelled) return;

        clearInterval(progressInterval);
        clearInterval(timeInterval);

        if (result && result.success) {
          const paymentStatus = result.data.status;

          setProgress(100);
          setStatus(paymentStatus);

          if (paymentStatus === "succeeded") {
            setTimeout(() => {
              if (!cancelled && onSuccess) {
                onSuccess(result.data);
              }
            }, 1000);
          } else if (paymentStatus === "payment_failed") {
            setError("Payment failed. Please try again.");
            if (onError) onError("Payment failed");
          } else if (paymentStatus === "canceled") {
            setError("Payment was canceled.");
            if (onCancel) onCancel();
          }
        } else {
          throw new Error("Invalid payment status response");
        }
      } catch (err) {
        if (cancelled) return;

        clearInterval(progressInterval);
        clearInterval(timeInterval);

        setError(err.message || "Payment tracking failed");
        setStatus("error");
        if (onError) onError(err.message);
      }
    };

    trackPayment();

    return () => {
      cancelled = true;
      clearInterval(progressInterval);
      clearInterval(timeInterval);
    };
  }, [paymentId, onSuccess, onError, onCancel]);

  const getStatusIcon = () => {
    switch (status) {
      case "succeeded":
        return (
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-green-600"
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
          </div>
        );
      case "payment_failed":
      case "error":
        return (
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        );
      case "canceled":
        return (
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L3.316 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
          </div>
        );
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case "succeeded":
        return "Payment successful! Redirecting to your dashboard...";
      case "payment_failed":
        return (
          error ||
          "Payment failed. Please check your payment method and try again."
        );
      case "canceled":
        return "Payment was canceled. You can try again when ready.";
      case "error":
        return error || "An error occurred while processing your payment.";
      default:
        return "Processing your payment securely...";
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "succeeded":
        return "text-green-800";
      case "payment_failed":
      case "error":
        return "text-red-800";
      case "canceled":
        return "text-yellow-800";
      default:
        return "text-indigo-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
      <div className="text-center">
        <div className="flex justify-center mb-4">{getStatusIcon()}</div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {planName} - ${expectedAmount}
        </h3>

        {status === "processing" && (
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        <p className={`text-sm font-medium mb-4 ${getStatusColor()}`}>
          {getStatusMessage()}
        </p>

        <div className="text-xs text-gray-500 space-y-1">
          <p>Payment ID: {paymentId}</p>
          {timeElapsed > 0 && <p>Time elapsed: {timeElapsed}s</p>}
        </div>

        {(status === "payment_failed" || status === "error") && (
          <div className="mt-6 space-y-2">
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => window.history.back()}
              className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
            >
              Go Back
            </button>
          </div>
        )}

        {status === "canceled" && (
          <div className="mt-6">
            <button
              onClick={() => window.history.back()}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Choose Plan Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentStatusTracker;
