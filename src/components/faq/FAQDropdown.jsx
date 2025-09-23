import React, { useState } from "react";

const FAQDropdown = ({ question, answer, type = "general" }) => {
  const [open, setOpen] = useState(false);

  const getTypeStyles = () => {
    switch (type) {
      case "interview":
        return {
          bgColor: "bg-blue-900/30 hover:bg-blue-800/40",
          borderColor: "border-blue-500/30",
          accentColor: "bg-blue-500",
        };
      case "career":
        return {
          bgColor: "bg-emerald-900/30 hover:bg-emerald-800/40",
          borderColor: "border-emerald-500/30",
          accentColor: "bg-emerald-500",
        };
      case "hiring":
        return {
          bgColor: "bg-purple-900/30 hover:bg-purple-800/40",
          borderColor: "border-purple-500/30",
          accentColor: "bg-purple-500",
        };
      case "ats":
        return {
          bgColor: "bg-orange-900/30 hover:bg-orange-800/40",
          borderColor: "border-orange-500/30",
          accentColor: "bg-orange-500",
        };
      default:
        return {
          bgColor: "bg-indigo-900/30 hover:bg-indigo-800/40",
          borderColor: "border-indigo-500/30",
          accentColor: "bg-indigo-500",
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div
      className={`bg-slate-800 backdrop-blur-sm rounded-2xl shadow-lg border transition-all duration-300 hover:shadow-xl ${styles.borderColor}`}
    >
      <button
        className={`w-full flex items-center justify-between px-6 py-5 rounded-2xl focus:outline-none transition-all duration-300 cursor-pointer ${
          open ? styles.bgColor : "bg-slate-700/50"
        }`}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        <div className="flex items-center space-x-3 flex-1">
          <span className="text-lg font-semibold text-white text-left leading-tight">
            {question}
          </span>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          {type === "ats" && (
            <span className="px-2 py-1 bg-orange-800/70 text-orange-300 text-xs font-medium rounded-full">
              ATS Analyzer
            </span>
          )}
          {type === "interview" && (
            <span className="px-2 py-1 bg-blue-800/70 text-blue-300 text-xs font-medium rounded-full">
              InterviewPrep AI
            </span>
          )}
          {type === "career" && (
            <span className="px-2 py-1 bg-emerald-800/70 text-emerald-300 text-xs font-medium rounded-full">
              Career Guidance
            </span>
          )}
          {type === "hiring" && (
            <span className="px-2 py-1 bg-purple-800/70 text-purple-300 text-xs font-medium rounded-full">
              Hiring Tools
            </span>
          )}
          {type === "general" && (
            <span className="px-2 py-1 bg-indigo-800/70 text-indigo-300 text-xs font-medium rounded-full">
              General
            </span>
          )}
          <svg
            className={`h-6 w-6 text-gray-400 ml-2 transform transition-transform duration-300 ${
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
            className={`px-6 pb-6 text-gray-300 leading-relaxed ${styles.bgColor} rounded-b-2xl border-t ${styles.borderColor}`}
          >
            <div className="pt-4">
              {type === "interview" && (
                <div className="mb-3 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-blue-400">
                    InterviewPrep AI Feature
                  </span>
                </div>
              )}
              <div className="prose prose-sm max-w-none">{answer}</div>
              {type === "ats" && (
                <div className="mt-4 p-3 bg-orange-900/30 rounded-lg border border-orange-500/30">
                  <p className="text-sm text-orange-300 font-medium mb-1">
                    Pro Tip:
                  </p>
                  <p className="text-sm text-orange-200">
                    Use ATS Analyzer to optimize your resume and increase your
                    chances of getting past automated screening systems!
                  </p>
                </div>
              )}
              {type === "interview" && (
                <div className="mt-4 p-3 bg-blue-900/30 rounded-lg border border-blue-500/30">
                  <p className="text-sm text-blue-300 font-medium mb-1">
                    Pro Tip:
                  </p>
                  <p className="text-sm text-blue-200">
                    Practice regularly with InterviewPrep AI to build confidence
                    and improve your interview performance!
                  </p>
                </div>
              )}
              {type === "career" && (
                <div className="mt-4 p-3 bg-emerald-900/30 rounded-lg border border-emerald-500/30">
                  <p className="text-sm text-emerald-300 font-medium mb-1">
                    Pro Tip:
                  </p>
                  <p className="text-sm text-emerald-200">
                    Upload your resume to Role Suggestions for personalized
                    career recommendations tailored to your experience!
                  </p>
                </div>
              )}
              {type === "hiring" && (
                <div className="mt-4 p-3 bg-purple-900/30 rounded-lg border border-purple-500/30">
                  <p className="text-sm text-purple-300 font-medium mb-1">
                    Pro Tip:
                  </p>
                  <p className="text-sm text-purple-200">
                    HireDisk Pro offers advanced AI screening to help you find
                    the perfect candidates faster!
                  </p>
                </div>
              )}
              {type === "general" && (
                <div className="mt-4 p-3 bg-indigo-900/30 rounded-lg border border-indigo-500/30">
                  <p className="text-sm text-indigo-300 font-medium mb-1">
                    Pro Tip:
                  </p>
                  <p className="text-sm text-indigo-200">
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
