import React from "react";

const ResumeRateLimitError = ({ onClose, resetTime }) => {
  const formatResetTime = (resetTime) => {
    const now = Date.now();
    const timeRemaining = resetTime - now;

    if (timeRemaining <= 0) return "shortly";

    const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
    const minutes = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
    );

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="relative max-w-md w-full">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-rose-600 rounded-3xl blur-lg opacity-30 animate-pulse"></div>

        {/* Main card */}
        <div className="relative bg-slate-900/95 backdrop-blur-xl border border-red-500/30 rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-600 to-rose-600 rounded-2xl mb-4">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">
              Daily Limit Reached
            </h3>

            <p className="text-red-300 text-lg">Resume Analysis Rate Limit</p>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {/* Limit info */}
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-400">5</div>
                    <div className="text-sm text-red-300">Daily Limit</div>
                  </div>
                  <div className="w-px h-12 bg-red-400/30"></div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-400">0</div>
                    <div className="text-sm text-red-300">Remaining</div>
                  </div>
                </div>

                <div className="w-full bg-red-900/30 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-red-500 to-rose-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: "100%" }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Reset time */}
            <div className="text-center">
              <p className="text-slate-300 mb-2">
                Your daily limit will reset in:
              </p>
              <div className="inline-flex items-center gap-2 bg-slate-800/60 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-600/50">
                <svg
                  className="h-4 w-4 text-cyan-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-white font-semibold">
                  {resetTime ? formatResetTime(resetTime) : "Soon"}
                </span>
              </div>
            </div>

            {/* Upgrade suggestion */}
            <div className="bg-gradient-to-r from-violet-600/10 to-cyan-600/10 border border-violet-500/20 rounded-2xl p-6">
              <div className="text-center">
                <h4 className="text-lg font-semibold text-white mb-2">
                  Need More Analyses?
                </h4>
                <p className="text-slate-300 text-sm mb-4">
                  Upgrade to our Pro plan for unlimited resume analysis and
                  advanced features
                </p>
                <div className="flex gap-3 justify-center">
                  <button className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105">
                    Upgrade to Pro
                  </button>
                  <button className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-200">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white transition-colors duration-200 rounded-full hover:bg-slate-800/50"
            aria-label="Close"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeRateLimitError;
