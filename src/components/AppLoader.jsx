import React from "react";

const AppLoader = () => (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-200 bg-opacity-90 backdrop-blur-md">
    <div className="flex flex-col items-center gap-8">
      <div className="relative flex items-center justify-center">
        <svg className="h-24 w-24 animate-spin-slow" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="loader-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#a21caf" />
            </linearGradient>
          </defs>
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#e0e7ff"
            strokeWidth="10"
            opacity="0.25"
          />
          <path
            d="M50 10
              a 40 40 0 0 1 0 80
              a 40 40 0 0 1 0 -80"
            fill="none"
            stroke="url(#loader-gradient)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray="180 100"
          />
          <circle
            cx="50"
            cy="20"
            r="6"
            fill="#a21caf"
            className="animate-bounce"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-4xl font-extrabold text-indigo-700 tracking-widest select-none drop-shadow-xl animate-fade-in">
          <span className="sr-only">Loading</span>
          JP
        </span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-2xl font-bold text-indigo-700 animate-text-gradient bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Analyzing & Loading...
        </span>
        <span className="text-base text-gray-600 animate-pulse">
          Please wait while we prepare your experience
        </span>
      </div>
    </div>
    <style>{`
      @keyframes spin-slow { 100% { transform: rotate(360deg); } }
      .animate-spin-slow { animation: spin-slow 2.2s linear infinite; }
      @keyframes text-gradient {
        0%,100% { filter: hue-rotate(0deg); }
        50% { filter: hue-rotate(30deg); }
      }
      .animate-text-gradient { animation: text-gradient 2.5s ease-in-out infinite; }
    `}</style>
  </div>
);

export default AppLoader;
