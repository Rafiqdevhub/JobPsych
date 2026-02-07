import React from "react";
import useToast from "@/hooks/useToast";

const InterviewPrepAI = () => {
  const { showSuccess } = useToast();

  const handleStartInterview = () => {
    showSuccess("Redirecting to AI Interview in a new tab...");
    setTimeout(() => {
      window.open(
        "https://ai-mock-interview-preparation-seven.vercel.app",
        "_blank",
      );
    }, 1000);
  };

  return (
    <div
      className="min-h-screen bg-slate-900 flex flex-col relative overflow-hidden"
      style={{ pointerEvents: "auto" }}
    >
      <div className="absolute inset-0 bg-slate-900">
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-gradient-to-br from-purple-500/10 to-pink-500/10"></div>
        </div>
      </div>

      <header
        className="relative z-10 bg-slate-800/70 backdrop-blur-xl border-b border-slate-700 shadow-lg"
        style={{ pointerEvents: "auto" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between py-4 sm:py-6">
            <div className="flex-shrink-0 mb-4 sm:mb-0">
              <button
                onClick={() => (window.location.href = "/")}
                className="inline-flex items-center gap-2 bg-purple-600 px-6 py-3 text-white font-semibold rounded-xl shadow-lg hover:bg-purple-700 cursor-pointer"
                style={{
                  pointerEvents: "auto",
                  zIndex: 10,
                  position: "relative",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Back to Home
              </button>
            </div>

            <div className="flex-1 text-center px-4 sm:px-8 mb-4 sm:mb-0">
              <div className="inline-flex items-center gap-2 bg-slate-800 border border-slate-700 px-6 py-3 rounded-full">
                <blockquote className="text-sm sm:text-base font-medium text-slate-300 italic">
                  Build complete interview readiness with confidence
                </blockquote>
              </div>
            </div>

            <div className="flex-shrink-0 text-center sm:text-right">
              <div className="flex items-center justify-center sm:justify-end space-x-3">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-bold text-white">
                    AI-Assisted Interview Practice
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 max-h-none lg:max-h-[75vh]">
          <div className="lg:col-span-3">
            <div className="bg-slate-800/90 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-700 overflow-hidden h-auto min-h-[50vh] sm:min-h-[60vh] lg:h-[70vh] flex flex-col">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 sm:px-6 py-3 sm:py-4 text-center">
                <h2 className="text-lg sm:text-xl font-bold text-white flex items-center justify-center gap-2 sm:gap-3">
                  <svg
                    className="h-5 w-5 sm:h-6 sm:w-6"
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
                  AI-Assisted Interview Practice Module
                </h2>
              </div>

              <div className="p-4 sm:p-6 flex-1 flex flex-col min-h-0">
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center max-w-xl mx-auto px-2">
                    <div className="mb-4 sm:mb-6">
                      <div className="relative mb-3 sm:mb-4">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-xl opacity-20"></div>
                        <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 p-3 sm:p-4 rounded-xl sm:rounded-2xl inline-block">
                          <svg
                            className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1}
                              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            />
                          </svg>
                        </div>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 sm:mb-3 leading-tight">
                        Build Complete
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                          Interview Readiness?
                        </span>
                      </h3>

                      <p className="text-slate-300 text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed px-2">
                        Build complete interview readiness through AI-powered
                        practice, intelligent feedback, and confidence-building
                        preparation for every interview scenario.
                      </p>
                    </div>

                    <button
                      onClick={handleStartInterview}
                      className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 text-white font-bold rounded-lg sm:rounded-xl shadow-2xl hover:shadow-purple-500/25 cursor-pointer text-base sm:text-lg w-full sm:w-auto"
                      style={{
                        pointerEvents: "auto",
                        zIndex: 10,
                        position: "relative",
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative flex items-center justify-center gap-2 sm:gap-3">
                        <span>Start AI Interview</span>
                        <svg
                          className="h-4 w-4 sm:h-5 sm:w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </div>
                    </button>

                    <p className="text-slate-400 mt-3 sm:mt-4 text-xs sm:text-sm">
                      Opens in a new tab • Complete interview readiness platform
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4 max-h-none lg:max-h-[70vh] lg:overflow-y-auto">
            <div className="bg-slate-800/60 rounded-xl sm:rounded-2xl shadow-xl border border-slate-700 p-3 sm:p-4 hover:shadow-2xl hover:border-purple-500/30">
              <h3 className="text-sm sm:text-md font-bold text-purple-400 mb-2 sm:mb-3 flex items-center gap-2">
                Why Our Interview Practice Platform?
              </h3>
              <div className="space-y-1.5 sm:space-y-2">
                <div className="flex items-start gap-2 p-1.5 sm:p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xs">1</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-xs mb-0.5 sm:mb-1">
                      AI-Powered Practice
                    </h4>
                    <p className="text-slate-300 text-xs">
                      Realistic interview scenarios
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2 p-1.5 sm:p-2 rounded-lg bg-pink-500/10 border border-pink-500/20 hover:bg-pink-500/20">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xs">2</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-xs mb-0.5 sm:mb-1">
                      Intelligent Feedback
                    </h4>
                    <p className="text-slate-300 text-xs">
                      Actionable insights for improvement
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2 p-1.5 sm:p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xs">3</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-xs mb-0.5 sm:mb-1">
                      Confidence Building
                    </h4>
                    <p className="text-slate-300 text-xs">
                      Practice builds interview mastery
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/60 rounded-xl sm:rounded-2xl shadow-xl border border-slate-700 p-3 sm:p-4 hover:shadow-2xl hover:border-purple-500/30">
              <h3 className="text-sm sm:text-md font-bold text-purple-400 mb-2 sm:mb-3 flex items-center gap-2">
                Interview Readiness Features
              </h3>
              <div className="space-y-1.5 sm:space-y-2">
                <div className="flex items-start space-x-2 p-1.5 sm:p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-xs mb-0.5 sm:mb-1">
                      Behavioral Questions
                    </h4>
                    <p className="text-slate-300 text-xs">
                      STAR method & storytelling
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-2 p-1.5 sm:p-2 rounded-lg bg-pink-500/10 border border-pink-500/20 hover:bg-pink-500/20">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-xs mb-0.5 sm:mb-1">
                      Technical Interviews
                    </h4>
                    <p className="text-slate-300 text-xs">
                      Code challenges & system design
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-2 p-1.5 sm:p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-xs mb-0.5 sm:mb-1">
                      Complete Preparation
                    </h4>
                    <p className="text-slate-300 text-xs">
                      End-to-end interview readiness
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg sm:rounded-xl p-3 sm:p-4">
              <div className="text-center">
                <p className="text-white font-semibold text-xs sm:text-sm mb-1 sm:mb-2">
                  Build Interview Confidence!
                </p>
                <p className="text-slate-300 text-xs">
                  Master every interview scenario
                </p>
              </div>
            </div>

            <div className="hidden sm:block bg-slate-800/60 rounded-xl sm:rounded-2xl border border-purple-500/30 p-4 sm:p-6 hover:shadow-2xl hover:border-purple-500/50">
              <div className="flex items-start space-x-3">
                <div className="flex-1">
                  <h4 className="text-xs sm:text-sm font-bold text-purple-400 mb-2 flex items-center gap-2">
                    Interview Practice Integrated
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    Click the "Start AI Interview" button to open our
                    AI-assisted interview practice platform in a new tab. Build
                    complete interview readiness through AI-powered practice,
                    intelligent feedback, and confidence-building preparation.
                  </p>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    <span className="px-2 sm:px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30">
                      Intelligent Feedback
                    </span>
                    <span className="px-2 sm:px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30">
                      Confidence Building
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="block sm:hidden mt-4">
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-4">
            <div className="text-center">
              <h4 className="text-sm font-bold text-purple-400 mb-2">
                Interview Readiness Ready?
              </h4>
              <p className="text-xs text-slate-300 mb-3">
                Tap the button above to build complete interview confidence
              </p>
              <div className="flex justify-center gap-2">
                <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30">
                  AI-Powered
                </span>
                <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30">
                  Confidence Building
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InterviewPrepAI;
