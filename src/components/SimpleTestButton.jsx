import React, { useState } from "react";

const SimpleTestButton = ({ amount, onSuccess }) => {
  const [processing, setProcessing] = useState(false);

  const handleTestPayment = async () => {
    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      onSuccess({
        id: "test_payment_" + Date.now(),
        status: "succeeded",
        amount: amount * 100, // in cents
      });
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800">
          🧪 <strong>Test Mode:</strong> This will simulate a successful payment
          without charging any card.
        </p>
      </div>

      <button
        type="button"
        onClick={handleTestPayment}
        disabled={processing}
        className={`w-full py-3 px-4 rounded-md text-white font-medium transition-all duration-200 ${
          processing
            ? "bg-indigo-400 cursor-not-allowed opacity-60"
            : "bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 hover:shadow-lg cursor-pointer"
        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 flex justify-center items-center`}
      >
        {processing ? (
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
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Simulating Payment...
          </>
        ) : (
          <>🧪 Test Pay ${amount}</>
        )}
      </button>
    </div>
  );
};

export default SimpleTestButton;
