import React, { useState, useEffect } from "react";
import {
  generatePaymentSummary,
  validatePaymentAmount,
} from "../utils/paymentService";
import { useUserManager } from "../hooks/useUserManager";

const PaymentConfirmation = ({
  planId,
  onConfirm,
  onCancel,
  isProcessing = false,
}) => {
  const { clerkUser } = useUserManager();
  const [paymentSummary, setPaymentSummary] = useState(null);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (planId && clerkUser?.primaryEmailAddress?.emailAddress) {
      const summary = generatePaymentSummary(
        planId,
        clerkUser.primaryEmailAddress.emailAddress
      );
      setPaymentSummary(summary);

      const valid = validatePaymentAmount(planId, summary.payment.amount);
      setIsValid(valid);
    }
  }, [planId, clerkUser]);

  if (!paymentSummary) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  const { plan, payment, customer, summary } = paymentSummary;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
        <h2 className="text-xl font-semibold text-white">
          Payment Confirmation
        </h2>
        <p className="text-indigo-100 text-sm mt-1">
          Please review your order before proceeding
        </p>
      </div>

      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900">{plan.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{plan.description}</p>

            <div className="mt-3">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                What's included:
              </h4>
              <ul className="space-y-1">
                {plan.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center text-sm text-gray-600"
                  >
                    <svg
                      className="w-4 h-4 text-green-500 mr-2 flex-shrink-0"
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
                ))}
              </ul>
            </div>
          </div>

          <div className="ml-6 text-right">
            <div className="text-2xl font-bold text-gray-900">
              {payment.formatted_amount}
            </div>
            {summary.billing_cycle !== "one-time" && (
              <div className="text-sm text-gray-500">
                per {summary.billing_cycle.replace("ly", "")}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h4 className="text-sm font-medium text-gray-700 mb-2">
          Account Details
        </h4>
        <div className="text-sm text-gray-600">
          <p>
            <span className="font-medium">Email:</span> {customer.email}
          </p>
          <p>
            <span className="font-medium">Plan:</span> {plan.name}
          </p>
          <p>
            <span className="font-medium">Resume Limit:</span>{" "}
            {plan.resumeLimit === -1
              ? "Unlimited"
              : `${plan.resumeLimit} resumes`}
          </p>
        </div>
      </div>

      <div className="px-6 py-4 border-b border-gray-200">
        <h4 className="text-sm font-medium text-gray-700 mb-3">
          Payment Summary
        </h4>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-900">${summary.total}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tax</span>
            <span className="text-gray-900">${summary.tax}</span>
          </div>
          <div className="flex justify-between text-base font-medium pt-2 border-t">
            <span className="text-gray-900">Total</span>
            <span className="text-gray-900">${summary.grand_total}</span>
          </div>
        </div>
      </div>

      <div className="px-6 py-3 bg-blue-50 border-b border-gray-200">
        <div className="flex items-center">
          <svg
            className="w-5 h-5 text-blue-500 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <p className="text-sm text-blue-700">
            Your payment is secured with SSL encryption
          </p>
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50">
        {!isValid && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">
              Payment validation failed. Please try again or contact support.
            </p>
          </div>
        )}

        <div className="flex space-x-3">
          <div
            className="w-full flex space-x-3 z-50"
            style={{ pointerEvents: "auto" }}
          >
            <button
              type="button"
              onClick={onCancel}
              disabled={isProcessing}
              className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-md font-medium hover:bg-gray-400 disabled:opacity-50 transition-colors cursor-pointer"
              style={{ pointerEvents: "auto", zIndex: 1000 }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isProcessing || !isValid}
              className="flex-1 bg-indigo-600 text-white py-3 px-4 rounded-md font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors flex items-center justify-center cursor-pointer"
              style={{ pointerEvents: "auto", zIndex: 1000 }}
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
              ) : payment.is_free ? (
                "Activate Free Plan"
              ) : (
                `Pay $${summary.grand_total}`
              )}
            </button>
          </div>
        </div>

        {!payment.is_free && (
          <p className="text-xs text-gray-500 text-center mt-2">
            You will be charged ${summary.grand_total}{" "}
            {summary.billing_cycle !== "one-time" &&
              `every ${summary.billing_cycle.replace("ly", "")}`}
          </p>
        )}
      </div>
    </div>
  );
};

export default PaymentConfirmation;
