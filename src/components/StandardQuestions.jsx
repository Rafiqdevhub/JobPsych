import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { StandardQuestionsCategories } from "@data/questions";

const StandardQuestions = () => {
  const [openHrCategory, setOpenHrCategory] = useState(null);

  return (
    <div className="relative mb-8 md:mb-16">
      {/* Background Effects - Responsive */}
      <div className="absolute -inset-4 md:-inset-8 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 rounded-[2rem] md:rounded-[3rem] blur-2xl md:blur-3xl"></div>
      <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-cyan-600/5 via-blue-600/5 to-indigo-600/5 rounded-[1.5rem] md:rounded-[2.5rem] blur-xl md:blur-2xl"></div>

      <div className="relative bg-gradient-to-br from-slate-800/95 via-slate-800/90 to-slate-900/95 backdrop-blur-xl rounded-2xl md:rounded-3xl border border-slate-700/50 overflow-hidden shadow-2xl">
        {/* Enhanced Header - Responsive */}
        <div className="relative bg-gradient-to-r from-cyan-600/20 via-blue-600/20 to-indigo-600/20 p-4 md:p-8 border-b border-slate-700/50">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(14,165,233,0.15),transparent)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.1),transparent)]"></div>

          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3 md:space-x-4">
              <div className="relative">
                <div className="p-3 md:p-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl md:rounded-2xl shadow-lg">
                  <svg
                    className="h-6 w-6 md:h-8 md:w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl md:rounded-2xl blur-md opacity-30"></div>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
                  <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
                    HR Interview Questions
                  </span>
                </h2>
                <p className="text-slate-300 text-base md:text-lg">
                  Master the art of behavioral interviews with our curated
                  question bank
                </p>
              </div>
            </div>

            <div className="flex md:hidden items-center justify-center">
              <div className="flex items-center px-3 py-1.5 rounded-full bg-green-500/20 border border-green-400/30">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                <span className="text-green-400 text-xs font-medium">
                  Ready to Use
                </span>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-3">
              <div className="flex items-center px-4 py-2 rounded-full bg-green-500/20 border border-green-400/30">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                <span className="text-green-400 text-sm font-medium">
                  Ready to Use
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modern Tips Section */}
        <div className="p-4 md:p-8">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
            <div className="relative bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-indigo-500/10 rounded-xl md:rounded-2xl p-4 md:p-6 border border-cyan-500/20">
              <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="flex-shrink-0">
                  <div className="p-2 md:p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg md:rounded-xl">
                    <svg
                      className="h-5 w-5 md:h-6 md:w-6 text-cyan-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg md:text-xl font-semibold text-white mb-3">
                    💡 Interview Preparation Tips
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-1.5 md:mt-2 flex-shrink-0"></div>
                      <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                        Click category headers to explore questions and insights
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 md:mt-2 flex-shrink-0"></div>
                      <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                        Questions evaluate soft skills and behavioral
                        competencies
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Categories */}
        <div className="px-4 md:px-8 pb-6 md:pb-8 space-y-4 md:space-y-6">
          {StandardQuestionsCategories.map((cat, catIdx) => {
            const isOpen = openHrCategory === catIdx;
            return (
              <div key={catIdx} className="group">
                {/* Category Button */}
                <button
                  className={`w-full relative overflow-hidden rounded-2xl transition-all duration-500 focus:outline-none ${
                    isOpen
                      ? "ring-4 ring-cyan-400/30 shadow-2xl"
                      : "hover:shadow-xl"
                  }`}
                  onClick={() => setOpenHrCategory(isOpen ? null : catIdx)}
                  aria-expanded={isOpen}
                >
                  {/* Button Background Effects */}
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-700/80 via-slate-700/90 to-slate-800/80 backdrop-blur-sm"></div>
                  <div
                    className={`absolute inset-0 bg-gradient-to-r transition-all duration-500 ${
                      isOpen
                        ? "from-cyan-600/20 via-blue-600/20 to-indigo-600/20"
                        : "from-slate-600/10 via-slate-700/10 to-slate-800/10 group-hover:from-cyan-500/15 group-hover:via-blue-500/15 group-hover:to-indigo-500/15"
                    }`}
                  ></div>

                  {/* Animated Border */}
                  <div
                    className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
                      isOpen
                        ? "bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 p-0.5"
                        : "bg-gradient-to-r from-transparent via-slate-600/50 to-transparent p-0.5 group-hover:from-cyan-400/50 group-hover:via-blue-400/50 group-hover:to-indigo-400/50"
                    }`}
                  >
                    <div className="w-full h-full bg-slate-800/90 rounded-xl"></div>
                  </div>

                  <div className="relative px-4 md:px-8 py-4 md:py-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                      <div className="flex items-center space-x-3 md:space-x-4">
                        <div
                          className={`p-2 md:p-3 rounded-lg md:rounded-xl transition-all duration-300 ${
                            isOpen
                              ? "bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg"
                              : "bg-gradient-to-br from-slate-600/50 to-slate-700/50 group-hover:from-cyan-500/20 group-hover:to-blue-500/20"
                          }`}
                        >
                          <svg
                            className={`h-5 w-5 md:h-6 md:w-6 transition-colors duration-300 ${
                              isOpen
                                ? "text-white"
                                : "text-slate-300 group-hover:text-cyan-400"
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                            />
                          </svg>
                        </div>

                        <div>
                          <h3
                            className={`text-lg md:text-xl font-bold transition-colors duration-300 ${
                              isOpen
                                ? "text-white"
                                : "text-slate-200 group-hover:text-cyan-300"
                            }`}
                          >
                            {cat.category}
                          </h3>
                          <p
                            className={`text-xs md:text-sm transition-colors duration-300 ${
                              isOpen
                                ? "text-slate-300"
                                : "text-slate-400 group-hover:text-blue-300"
                            }`}
                          >
                            {cat.items.length} questions • Behavioral assessment
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end space-x-2 sm:space-x-3 w-full sm:w-auto">
                        <div
                          className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                            isOpen
                              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/30"
                              : "bg-slate-600/30 text-slate-400 border border-slate-500/30 group-hover:bg-blue-500/20 group-hover:text-blue-300 group-hover:border-blue-400/30"
                          }`}
                        >
                          {cat.items.length} Qs
                        </div>

                        <ChevronDownIcon
                          className={`h-5 w-5 sm:h-6 sm:w-6 transition-all duration-500 flex-shrink-0 ${
                            isOpen
                              ? "text-cyan-400 rotate-180"
                              : "text-slate-400 group-hover:text-blue-400"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </button>

                {/* Questions Grid */}
                <div
                  className={`transition-all duration-500 overflow-hidden ${
                    isOpen
                      ? "max-h-[2000px] opacity-100 mt-6"
                      : "max-h-0 opacity-0"
                  }`}
                  style={{ transitionProperty: "max-height, opacity" }}
                >
                  {isOpen && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      {cat.items.map((q, idx) => (
                        <div
                          key={idx}
                          className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-700/60 to-slate-800/60 backdrop-blur-sm border border-slate-600/30 hover:border-cyan-400/30 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10"
                        >
                          {/* Card Hover Effect */}
                          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                          <div className="relative p-4 md:p-6">
                            {/* Question Header */}
                            <div className="flex items-start space-x-3 mb-3 md:mb-4">
                              <div className="flex-shrink-0">
                                <div className="p-1.5 md:p-2 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-md md:rounded-lg group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all duration-300">
                                  <svg
                                    className="h-3.5 w-3.5 md:h-4 md:w-4 text-cyan-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                </div>
                              </div>
                              <div className="flex-1">
                                <h4 className="text-white font-semibold text-sm md:text-base leading-relaxed group-hover:text-cyan-100 transition-colors duration-300">
                                  {q.question}
                                </h4>
                              </div>
                            </div>

                            {/* Insight Section */}
                            {q.insight && (
                              <div className="flex items-start space-x-3 pt-3 md:pt-4 border-t border-slate-600/30">
                                <div className="flex-shrink-0">
                                  <div className="p-1 md:p-1.5 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-md">
                                    <svg
                                      className="h-3 w-3 md:h-3.5 md:w-3.5 text-yellow-400"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 2a7 7 0 017 7c0 3.87-3.13 7-7 7s-7-3.13-7-7a7 7 0 017-7zm0 14v2m0 2h.01"
                                      />
                                    </svg>
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <p className="text-slate-300 text-xs md:text-sm italic leading-relaxed">
                                    {q.insight}
                                  </p>
                                </div>
                              </div>
                            )}

                            {/* Question Number Badge */}
                            <div className="absolute top-3 right-3 md:top-4 md:right-4">
                              <div className="px-1.5 md:px-2 py-0.5 md:py-1 bg-slate-600/50 rounded-full text-xs text-slate-400 font-medium">
                                #{idx + 1}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StandardQuestions;
