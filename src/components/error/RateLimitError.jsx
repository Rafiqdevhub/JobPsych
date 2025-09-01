import React, { useEffect, useState } from "react";
import { XMarkIcon, ClockIcon } from "@heroicons/react/24/outline";

const RateLimitError = ({ rateLimitData, onClose, onUpgrade }) => {
  const [timeRemaining, setTimeRemaining] = useState(null);

  useEffect(() => {
    const calculateTimeUntilMidnightUTC = () => {
      const now = new Date();
      const nextMidnightUTC = new Date(now);

      nextMidnightUTC.setUTCHours(24, 0, 0, 0);

      return nextMidnightUTC.getTime();
    };

    const resetTimeMs = calculateTimeUntilMidnightUTC();

    const updateTimer = () => {
      const now = Date.now();
      const remaining = resetTimeMs - now;

      if (remaining <= 0) {
        setTimeRemaining(null);
        return;
      }

      const hours = Math.floor(remaining / (1000 * 60 * 60));
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

      setTimeRemaining({ hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [rateLimitData]);

  const formatTimeRemaining = () => {
    if (!timeRemaining) return "soon";

    const { hours, minutes, seconds } = timeRemaining;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  };

  const getNextMidnightUTCString = () => {
    const now = new Date();
    const nextMidnightUTC = new Date(now);
    nextMidnightUTC.setUTCHours(24, 0, 0, 0);

    return nextMidnightUTC.toLocaleString("en-US", {
      timeZone: "UTC",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });
  };

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-all duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="max-w-lg w-full">
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center border-2 border-gray-200 relative overflow-hidden transform transition-all duration-500 hover:scale-[1.02] ring-4 ring-white/50">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-50/90 via-white to-purple-50/90 -z-10"></div>

            <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-pink-400 rounded-full opacity-20 animate-ping"></div>
              <div
                className="absolute -top-1 -right-3 w-3 h-3 bg-purple-400 rounded-full opacity-30 animate-ping"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div
                className="absolute -bottom-2 -left-1 w-2 h-2 bg-pink-400 rounded-full opacity-25 animate-ping"
                style={{ animationDelay: "1s" }}
              ></div>
            </div>

            {onClose && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-all duration-200 transform hover:scale-110 hover:rotate-90 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                <XMarkIcon className="h-5 w-5 text-gray-500" />
              </button>
            )}

            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-2xl bg-gradient-to-br from-pink-100 to-purple-200 mb-6 relative shadow-lg">
              <div className="absolute inset-0 bg-pink-500 rounded-2xl opacity-10 animate-pulse"></div>
              <div className="absolute inset-0 bg-purple-400 rounded-2xl opacity-5 animate-ping"></div>
              <ClockIcon className="h-10 w-10 text-pink-600 relative z-10 transform transition-transform duration-300 hover:scale-110 hover:rotate-12" />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
              Rate Limit Exceeded
            </h3>

            <p className="text-gray-600 mb-6 leading-relaxed text-base">
              {rateLimitData?.message ||
                "You've reached the maximum number of resume analyses allowed (2 per 24 hours)."}
            </p>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-100 rounded-xl p-6 mb-6 shadow-md">
              <div className="flex items-center justify-center mb-3">
                <ClockIcon className="h-6 w-6 text-blue-600 mr-2" />
                <span className="text-lg font-bold text-blue-800">
                  Reset in: {formatTimeRemaining()}
                </span>
              </div>
              <p className="text-sm text-blue-600">
                Next reset: {getNextMidnightUTCString()}
              </p>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-100 rounded-xl p-6 mb-6 shadow-md">
              <p className="text-purple-800 text-base mb-4 font-semibold">
                💼 <strong>Need more resume analyses?</strong>
                <br />
                Upgrade to a premium plan for unlimited access and advanced
                features.
              </p>
              {onUpgrade && (
                <button
                  onClick={onUpgrade}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl border border-transparent text-base font-semibold hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-purple-500 transform transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                >
                  🚀 View Pricing Plans
                </button>
              )}
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-blue-50 border-2 border-gray-200 rounded-xl p-6 mb-6 shadow-md text-left">
              <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                💡 Tips while you wait:
              </h4>
              <ul className="space-y-2 text-sm text-gray-700 leading-relaxed">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Review and refine your resume based on previous feedback
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Research the company and position you're applying for
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Prepare thoughtful answers to common interview questions
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Practice your elevator pitch and professional summary
                </li>
              </ul>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl border border-transparent text-base font-semibold hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-500 transform transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              I Understand
            </button>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
                <span>Rate Limit ID: {Date.now()}</span>
                <span>•</span>
                <span>JobPsych AI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RateLimitError;
