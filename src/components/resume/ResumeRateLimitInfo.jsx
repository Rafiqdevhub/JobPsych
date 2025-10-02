import React from "react";

const ResumeRateLimitInfo = ({ remaining, total = 5, resetTime }) => {
  const formatResetTime = (resetTime) => {
    const now = Date.now();
    const timeRemaining = resetTime - now;

    if (timeRemaining <= 0) return "Soon";

    const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
    const minutes = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
    );

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const getStatusClasses = () => {
    const percentage = (remaining / total) * 100;
    if (percentage > 60) {
      return {
        background: "bg-gradient-to-r from-emerald-600/10 to-emerald-500/10",
        border: "border-emerald-500/30",
        dot: "bg-emerald-400",
        progress: "bg-gradient-to-r from-emerald-500 to-emerald-400",
      };
    }
    if (percentage > 20) {
      return {
        background: "bg-gradient-to-r from-amber-600/10 to-amber-500/10",
        border: "border-amber-500/30",
        dot: "bg-amber-400",
        progress: "bg-gradient-to-r from-amber-500 to-amber-400",
      };
    }
    return {
      background: "bg-gradient-to-r from-red-600/10 to-red-500/10",
      border: "border-red-500/30",
      dot: "bg-red-400",
      progress: "bg-gradient-to-r from-red-500 to-red-400",
    };
  };

  const statusClasses = getStatusClasses();
  const percentage = (remaining / total) * 100;

  return (
    <div className="relative">
      <div
        className={`absolute inset-0 ${statusClasses.background} rounded-2xl blur-xl`}
      ></div>
      <div
        className={`relative bg-slate-900/80 backdrop-blur-xl border ${statusClasses.border} rounded-2xl p-4 shadow-xl`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div
              className={`w-3 h-3 ${statusClasses.dot} rounded-full animate-pulse`}
            ></div>
            <span className="text-sm font-semibold text-white">
              Daily Analysis Quota
            </span>
          </div>
          <div className="text-xs text-slate-400">
            Resets in {formatResetTime(resetTime)}
          </div>
        </div>

        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-slate-300">
            {remaining} of {total} remaining
          </span>
          <span className="text-xs text-slate-400">
            {Math.round(percentage)}%
          </span>
        </div>

        <div className="w-full bg-slate-700/50 rounded-full h-2">
          <div
            className={`${statusClasses.progress} h-2 rounded-full transition-all duration-500`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>

        {remaining <= 1 && (
          <div className="mt-3 text-xs text-amber-300 flex items-center gap-1">
            <svg
              className="h-3 w-3"
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
            {remaining === 0 ? "Limit reached" : "Last analysis remaining"}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeRateLimitInfo;
