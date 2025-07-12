import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { createPayment } from "../utils/paymentService";

const PaymentDebug = () => {
  const { user } = useUser();
  const debugInfo = {
    stripeKey: !!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
    paymentApiUrl: import.meta.env.VITE_PAYMENT_API_URL,
    user: !!user,
    email: user?.primaryEmailAddress?.emailAddress,
  };
  const [testResult, setTestResult] = useState(null);
  const [testing, setTesting] = useState(false);

  const testPaymentCreation = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) {
      setTestResult({ error: "No user email available" });
      return;
    }

    setTesting(true);
    try {
      const result = await createPayment(
        "pro",
        user.primaryEmailAddress.emailAddress,
        `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Test User"
      );
      setTestResult({ success: true, data: result });
    } catch (error) {
      setTestResult({ error: error.message });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg max-w-2xl mx-auto mt-8">
      <h3 className="text-lg font-bold mb-4">Payment System Debug Info</h3>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span>Stripe Key Configured:</span>
          <span
            className={debugInfo.stripeKey ? "text-green-600" : "text-red-600"}
          >
            {debugInfo.stripeKey ? "✅ Yes" : "❌ No"}
          </span>
        </div>
        <div className="flex justify-between">
          <span>User Logged In:</span>
          <span className={debugInfo.user ? "text-green-600" : "text-red-600"}>
            {debugInfo.user ? "✅ Yes" : "❌ No"}
          </span>
        </div>
        <div className="flex justify-between">
          <span>User Email:</span>
          <span className="text-gray-700">{debugInfo.email || "N/A"}</span>
        </div>
        <div className="flex justify-between">
          <span>Payment API URL:</span>
          <span className="text-gray-700">
            {debugInfo.paymentApiUrl || "N/A"}
          </span>
        </div>
      </div>

      <button
        onClick={testPaymentCreation}
        disabled={testing || !user}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
      >
        {testing ? "Testing..." : "Test Payment Creation"}
      </button>

      {testResult && (
        <div className="mt-4 p-3 rounded-md">
          {testResult.error ? (
            <div className="bg-red-100 text-red-700">
              <strong>Error:</strong> {testResult.error}
            </div>
          ) : (
            <div className="bg-green-100 text-green-700">
              <strong>Success:</strong> Payment creation worked!
              <pre className="mt-2 text-xs overflow-auto">
                {JSON.stringify(testResult.data, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentDebug;
