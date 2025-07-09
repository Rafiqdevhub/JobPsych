import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";

function GeneratedQuestions({ questions, isPlan = "pro", onUpgradeClick }) {
  const { isSignedIn } = useUser();
  const [expandedCategories, setExpandedCategories] = useState({});

  // Function to limit questions based on plan type
  const limitQuestionsByPlan = (questions, category, planType) => {
    if (!questions) return [];

    const filteredQuestions = questions.filter((q) => q.type === category);

    // For free plan, only return the first question per category
    if (planType === "free" && filteredQuestions.length > 0) {
      return [filteredQuestions[0]];
    }

    return filteredQuestions;
  };

  // Function to count total available questions across all categories
  const getTotalQuestionsCount = () => {
    if (!questions) return 0;

    // Count original questions, not the limited ones
    const technicalQuestions = questions.filter(
      (q) => q.type === "technical"
    ).length;
    const behavioralQuestions = questions.filter(
      (q) => q.type === "behavioral"
    ).length;
    const experienceQuestions = questions.filter(
      (q) => q.type === "experience"
    ).length;

    return technicalQuestions + behavioralQuestions + experienceQuestions;
  };

  // Function to render free plan banner
  const renderFreePlanBanner = () => {
    if (isPlan === "free") {
      const totalQuestions = getTotalQuestionsCount();
      const visibleQuestions = 3; // One per category
      const hiddenQuestions = totalQuestions - visibleQuestions;

      return (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 mb-6 rounded-lg shadow-sm border border-blue-200">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="flex-shrink-0 mb-3 md:mb-0">
              <div className="bg-blue-100 p-2 rounded-full">
                <svg
                  className="h-8 w-8 text-blue-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div className="ml-0 md:ml-4 flex-grow">
              <h3 className="text-md font-semibold text-blue-800">
                Free Plan Preview
              </h3>
              <p className="mt-1 text-sm text-blue-700">
                You're viewing{" "}
                <span className="font-semibold">
                  1 sample question per category
                </span>
                .
                <span className="font-semibold text-indigo-700">
                  {" "}
                  Upgrade to Pro to unlock all {hiddenQuestions} additional
                  interview questions.
                </span>
              </p>

              <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center">
                  <div className="w-full max-w-[150px] bg-blue-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(
                          (visibleQuestions / totalQuestions) * 100,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                  <span className="ml-2 text-xs text-blue-700 whitespace-nowrap">
                    {visibleQuestions}/{totalQuestions} questions
                  </span>
                </div>

                <div className="flex-shrink-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();

                      // Check authentication first
                      if (!isSignedIn) {
                        // Redirect to sign-up page if not authenticated
                        window.location.href = "/sign-up";
                        return;
                      }

                      // If authenticated, show Pro-only pricing modal
                      if (onUpgradeClick) {
                        onUpgradeClick("pro-only");
                      } else {
                        window.dispatchEvent(
                          new CustomEvent("open-pricing-modal", {
                            detail: { showProOnly: true },
                          })
                        );
                      }
                    }}
                    className="bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800 text-white font-medium py-2 px-4 rounded text-sm inline-flex items-center transition-colors cursor-pointer z-10 relative shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    {isSignedIn ? "Unlock All Questions" : "Sign Up to Unlock"}
                    <svg
                      className="ml-1 h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const categories = {
    technical: {
      icon: () => (
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
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      title: "Technical Competency",
      description: "Questions focused on technical skills and knowledge",
      questions: limitQuestionsByPlan(questions, "technical", isPlan),
    },
    behavioral: {
      icon: () => (
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
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
          />
        </svg>
      ),
      title: "Behavioral & Cultural Fit",
      description: "Questions about work style and team collaboration",
      questions: limitQuestionsByPlan(questions, "behavioral", isPlan),
    },
    experience: {
      icon: () => (
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
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
      title: "Experience Validation",
      description: "Questions based on past work experience",
      questions: limitQuestionsByPlan(questions, "experience", isPlan),
    },
  };

  const toggleCategory = (categoryKey) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryKey]: !prev[categoryKey],
    }));
  };

  const ChatBubbleIcon = () => (
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
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  );

  const DocumentIcon = () => (
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
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );

  const UserGroupIcon = () => (
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
        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
      />
    </svg>
  );

  const LightBulbIcon = () => (
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
        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
      />
    </svg>
  );

  const ChevronDownIcon = () => (
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
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );

  const ChevronRightIcon = () => (
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
        d="M9 5l7 7-7 7"
      />
    </svg>
  );

  if (!questions || questions.length === 0)
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
        <p className="text-gray-500 text-center">
          Upload a resume to generate interview questions.
        </p>
      </div>
    );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8 transform transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <ChatBubbleIcon />
          <h2 className="text-2xl font-semibold text-gray-800 ml-2">
            Interview Guide
          </h2>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500 mr-2">
            Click categories to expand and view questions
          </span>
        </div>
      </div>

      {/* Free plan banner */}
      {renderFreePlanBanner()}

      {/* No debug UI */}

      <div className="space-y-4">
        {Object.entries(categories).map(([key, category]) => {
          const CategoryIcon = category.icon;
          const isExpanded = expandedCategories[key];

          return (
            category.questions.length > 0 && (
              <div
                key={key}
                className="border border-gray-200 rounded-xl overflow-hidden shadow-sm"
              >
                <div
                  onClick={() => toggleCategory(key)}
                  className={`flex items-center justify-between p-6 cursor-pointer transition-all duration-300 border-2 ${
                    isExpanded
                      ? "bg-blue-50 border-blue-200"
                      : "bg-gradient-to-r from-gray-50 to-gray-100 border-transparent hover:border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <CategoryIcon />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {category.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {category.description}
                      </p>
                      <span className="text-xs text-blue-500 font-medium">
                        {category.questions.length} questions available
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div
                      className={`transform transition-transform duration-300 ${
                        isExpanded ? "rotate-90" : "rotate-0"
                      }`}
                    >
                      <ChevronRightIcon />
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="bg-white">
                    <div className="px-6 py-4 border-t border-gray-100">
                      <div className="space-y-3">
                        {category.questions.map((question, index) => {
                          return (
                            <div
                              key={index}
                              className="p-4 rounded-lg transition-all duration-200 border-2 bg-gray-50 hover:bg-gray-100 border-transparent hover:border-gray-300"
                            >
                              <div className="flex-1">
                                <p className="font-medium text-gray-700 leading-relaxed">
                                  {question.question}
                                </p>
                                {question.context && (
                                  <p className="mt-2 text-sm text-gray-500 italic">
                                    💡 {question.context}
                                  </p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-0.5">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">💡</span>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-blue-800 mb-1">
              {isPlan === "pro" ? "Pro Tips:" : "Tips:"}
            </h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Click on category headers to expand and see questions</li>
              <li>
                • Questions are automatically tailored based on the candidate's
                resume
              </li>
              {isPlan === "free" && (
                <li className="text-indigo-600 font-medium">
                  • Upgrade to Pro to unlock all interview questions
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeneratedQuestions;
