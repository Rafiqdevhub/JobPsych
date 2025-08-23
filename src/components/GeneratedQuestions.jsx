import React, { useState } from "react";

function GeneratedQuestions({ questions, isPlan = "pro" }) {
  const [expandedCategories, setExpandedCategories] = useState({});

  const limitQuestionsByPlan = (questions, category, planType) => {
    if (!questions) return [];

    const filteredQuestions = questions.filter((q) => q.type === category);

    if (planType === "free" && filteredQuestions.length > 0) {
      return [filteredQuestions[0]];
    }

    return filteredQuestions;
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

      <div className="mt-6 mb-8 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 shadow-sm">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 mt-1">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-sm">
              <span className="text-white text-sm font-bold">💡</span>
            </div>
          </div>
          <div className="flex-1">
            <h4 className="text-base font-semibold text-blue-800 mb-2">
              {isPlan === "pro" ? "Pro Tips:" : "Tips:"}
            </h4>
            <ul className="text-sm text-blue-700 space-y-2">
              <li className="flex items-start">
                <span className="mr-2 text-blue-500">•</span>
                <span>
                  Click on category headers to expand and see questions
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-blue-500">•</span>
                <span>
                  Questions are automatically tailored based on the candidate's
                  resume
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

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
                  className={`flex items-center justify-between p-6 cursor-pointer transition-all duration-300 border-2 hover:shadow-md ${
                    isExpanded
                      ? "bg-blue-50 border-blue-200 shadow-sm"
                      : "bg-gradient-to-r from-gray-50 to-gray-100 border-transparent hover:border-gray-200 hover:bg-gray-50 hover:from-blue-25 hover:to-blue-50"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`p-3 bg-white rounded-lg shadow-sm transition-all duration-300 ${
                        isExpanded
                          ? "bg-blue-100 shadow-md"
                          : "hover:bg-blue-50"
                      }`}
                    >
                      <CategoryIcon />
                    </div>
                    <div>
                      <h3
                        className={`text-lg font-semibold transition-colors duration-300 ${
                          isExpanded
                            ? "text-blue-800"
                            : "text-gray-800 hover:text-blue-700"
                        }`}
                      >
                        {category.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {category.description}
                      </p>
                      <span className="text-xs text-blue-500 font-medium">
                        • Click the icon to {isExpanded ? "collapse" : "expand"}{" "}
                        ➡️
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div
                      className={`transform transition-all duration-300 p-2 rounded-full hover:bg-blue-100 ${
                        isExpanded ? "rotate-90 bg-blue-50" : "rotate-0"
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
    </div>
  );
}

export default GeneratedQuestions;
