import React, { useState } from "react";

const FAQDropdown = ({ question, answer, type = "general" }) => {
  const [open, setOpen] = useState(false);

  const getTypeStyles = () => {
    switch (type) {
      case "interview":
        return {
          bgColor: "bg-blue-50 hover:bg-blue-100",
          borderColor: "border-blue-200",

          accentColor: "bg-blue-500",
        };
      case "career":
        return {
          bgColor: "bg-emerald-50 hover:bg-emerald-100",
          borderColor: "border-emerald-200",

          accentColor: "bg-emerald-500",
        };
      case "hiring":
        return {
          bgColor: "bg-purple-50 hover:bg-purple-100",
          borderColor: "border-purple-200",

          accentColor: "bg-purple-500",
        };
      default:
        return {
          bgColor: "bg-indigo-50 hover:bg-indigo-100",
          borderColor: "border-indigo-200",

          accentColor: "bg-indigo-500",
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div
      className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border transition-all duration-300 hover:shadow-xl ${styles.borderColor}`}
    >
      <button
        className={`w-full flex items-center justify-between px-6 py-5 rounded-2xl focus:outline-none transition-all duration-300 cursor-pointer ${
          open ? styles.bgColor : "bg-white/60"
        }`}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        <div className="flex items-center space-x-3 flex-1">
          <span className="text-lg font-semibold text-gray-900 text-left leading-tight">
            {question}
          </span>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          {type === "interview" && (
            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
              InterviewPrep AI
            </span>
          )}
          {type === "career" && (
            <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
              Career Guidance
            </span>
          )}
          {type === "hiring" && (
            <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
              Hiring Tools
            </span>
          )}
          {type === "general" && (
            <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
              General
            </span>
          )}
          <svg
            className={`h-6 w-6 ${
              styles.iconColor
            } ml-2 transform transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>
      <div
        className={`transition-all duration-500 overflow-hidden ${
          open ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ transitionProperty: "max-height, opacity" }}
      >
        {open && (
          <div
            className={`px-6 pb-6 text-gray-700 leading-relaxed ${styles.bgColor} rounded-b-2xl border-t ${styles.borderColor}`}
          >
            <div className="pt-4">
              {type === "interview" && (
                <div className="mb-3 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-blue-700">
                    InterviewPrep AI Feature
                  </span>
                </div>
              )}
              <div className="prose prose-sm max-w-none">{answer}</div>
              {type === "interview" && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800 font-medium mb-1">
                    Pro Tip:
                  </p>
                  <p className="text-sm text-blue-700">
                    Practice regularly with InterviewPrep AI to build confidence
                    and improve your interview performance!
                  </p>
                </div>
              )}
              {type === "career" && (
                <div className="mt-4 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                  <p className="text-sm text-emerald-800 font-medium mb-1">
                    Pro Tip:
                  </p>
                  <p className="text-sm text-emerald-700">
                    Upload your resume to Role Suggestions for personalized
                    career recommendations tailored to your experience!
                  </p>
                </div>
              )}
              {type === "hiring" && (
                <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <p className="text-sm text-purple-800 font-medium mb-1">
                    Pro Tip:
                  </p>
                  <p className="text-sm text-purple-700">
                    HireDisk Pro offers advanced AI screening to help you find
                    the perfect candidates faster!
                  </p>
                </div>
              )}
              {type === "general" && (
                <div className="mt-4 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                  <p className="text-sm text-indigo-800 font-medium mb-1">
                    Pro Tip:
                  </p>
                  <p className="text-sm text-indigo-700">
                    Explore all JobPsych tools from free career guidance to
                    premium hiring intelligence!
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQDropdown;
