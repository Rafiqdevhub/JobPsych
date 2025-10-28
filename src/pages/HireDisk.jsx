import React from "react";
import useToast from "@/hooks/useToast";

const HireDisk = () => {
  const { showSuccess } = useToast();

  const handleStartHireDisk = () => {
    showSuccess("Redirecting to HireDisk in a new tab...");
    setTimeout(() => {
      window.open("https://hiredesk.vercel.app/", "_blank");
    }, 1000);
  };

  return (
    <div
      className="min-h-screen bg-slate-900 flex flex-col relative overflow-hidden"
      style={{ pointerEvents: "auto" }}
    >
      <div className="absolute inset-0 bg-slate-900">
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-gradient-to-br from-indigo-500/10 to-blue-500/10"></div>
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
                className="inline-flex items-center gap-2 bg-indigo-600 px-6 py-3 text-white font-semibold rounded-xl shadow-lg hover:bg-indigo-700 cursor-pointer"
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
                  Smart hiring starts with intelligent analysis. Make
                  data-driven decisions.
                </blockquote>
              </div>
            </div>

            <div className="flex-shrink-0 text-center sm:text-right">
              <div className="flex items-center justify-center sm:justify-end space-x-3">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-bold text-white">
                    HireDisk
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 max-h-none lg:max-h-[75vh]">
          <div className="lg:col-span-3">
            <div className="bg-slate-800/90 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-700 overflow-hidden h-auto min-h-[50vh] sm:min-h-[60vh] lg:h-[70vh] flex flex-col">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 sm:px-6 py-3 sm:py-4 text-center">
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
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  HR Intelligence Platform
                </h2>
              </div>

              <div className="p-4 sm:p-6 flex-1 flex flex-col min-h-0">
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center max-w-xl mx-auto px-2">
                    <div className="mb-4 sm:mb-6">
                      <div className="relative mb-3 sm:mb-4">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur-xl opacity-20"></div>
                        <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 p-3 sm:p-4 rounded-xl sm:rounded-2xl inline-block">
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
                              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            />
                          </svg>
                        </div>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 sm:mb-3 leading-tight">
                        Ready to Transform Your
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                          Hiring Process?
                        </span>
                      </h3>

                      <p className="text-slate-300 text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed px-2">
                        Experience our comprehensive HR intelligence platform
                        with advanced analytics, candidate insights, and
                        data-driven hiring solutions.
                      </p>
                    </div>

                    <button
                      onClick={handleStartHireDisk}
                      className="group relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 text-white font-bold rounded-lg sm:rounded-xl shadow-2xl hover:shadow-indigo-500/25 cursor-pointer text-base sm:text-lg w-full sm:w-auto"
                      style={{
                        pointerEvents: "auto",
                        zIndex: 10,
                        position: "relative",
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100"></div>
                      <div className="relative flex items-center justify-center gap-2 sm:gap-3">
                        <span>Start HireDisk</span>
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
                      Opens in a new tab • Advanced HR analytics platform
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4 max-h-none lg:max-h-[70vh] lg:overflow-y-auto">
            {/* Why Choose Our HR Platform */}
            <div className="bg-slate-800/60 rounded-xl sm:rounded-2xl shadow-xl border border-slate-700 p-3 sm:p-4 hover:shadow-2xl hover:border-indigo-500/30">
              <h3 className="text-sm sm:text-md font-bold text-indigo-400 mb-2 sm:mb-3 flex items-center gap-2">
                Why Our HR Platform?
              </h3>
              <div className="space-y-1.5 sm:space-y-2">
                <div className="flex items-start gap-2 p-1.5 sm:p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xs">1</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-xs mb-0.5 sm:mb-1">
                      Advanced Analytics
                    </h4>
                    <p className="text-slate-300 text-xs">
                      Data-driven hiring insights
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2 p-1.5 sm:p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xs">2</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-xs mb-0.5 sm:mb-1">
                      Candidate Intelligence
                    </h4>
                    <p className="text-slate-300 text-xs">
                      Comprehensive candidate profiles
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2 p-1.5 sm:p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xs">3</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-xs mb-0.5 sm:mb-1">
                      Smart Matching
                    </h4>
                    <p className="text-slate-300 text-xs">
                      AI-powered candidate-job matching
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* What You'll Master */}
            <div className="bg-slate-800/60 rounded-xl sm:rounded-2xl shadow-xl border border-slate-700 p-3 sm:p-4 hover:shadow-2xl hover:border-purple-500/30">
              <h3 className="text-sm sm:text-md font-bold text-purple-400 mb-2 sm:mb-3 flex items-center gap-2">
                HR Skills You'll Enhance
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
                      Talent Acquisition
                    </h4>
                    <p className="text-slate-300 text-xs">
                      Strategic hiring strategies
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-2 p-1.5 sm:p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
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
                      Data Analytics
                    </h4>
                    <p className="text-slate-300 text-xs">
                      HR metrics and insights
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
                      Decision Making
                    </h4>
                    <p className="text-slate-300 text-xs">
                      Evidence-based HR decisions
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ready to Practice */}
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg sm:rounded-xl p-3 sm:p-4">
              <div className="text-center">
                <p className="text-white font-semibold text-xs sm:text-sm mb-1 sm:mb-2">
                  Transform Your Hiring Today!
                </p>
                <p className="text-slate-300 text-xs">
                  Join HR professionals using data-driven solutions
                </p>
              </div>
            </div>

            {/* HR Intelligence Integration - Hidden on mobile for space */}
            <div className="hidden sm:block bg-slate-800/60 rounded-xl sm:rounded-2xl border border-emerald-500/30 p-4 sm:p-6 hover:shadow-2xl hover:border-emerald-500/50">
              <div className="flex items-start space-x-3">
                <div className="flex-1">
                  <h4 className="text-xs sm:text-sm font-bold text-emerald-400 mb-2 flex items-center gap-2">
                    HR Intelligence Integrated
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    Click the "Start HireDisk" button to open our advanced HR
                    intelligence platform in a new tab. Experience comprehensive
                    candidate analytics, hiring insights, and data-driven
                    recruitment solutions.
                  </p>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    <span className="px-2 sm:px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs rounded-full border border-emerald-500/30">
                      Advanced Analytics
                    </span>
                    <span className="px-2 sm:px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs rounded-full border border-emerald-500/30">
                      Candidate Intelligence
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Call-to-Action - Only visible on mobile */}
        <div className="block sm:hidden mt-4">
          <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 rounded-xl p-4">
            <div className="text-center">
              <h4 className="text-sm font-bold text-emerald-400 mb-2">
                🚀 HR Intelligence Ready?
              </h4>
              <p className="text-xs text-slate-300 mb-3">
                Tap the button above to start your comprehensive HR analytics
                experience
              </p>
              <div className="flex justify-center gap-2">
                <span className="px-2 py-1 bg-emerald-500/20 text-emerald-300 text-xs rounded-full border border-emerald-500/30">
                  Advanced Analytics
                </span>
                <span className="px-2 py-1 bg-emerald-500/20 text-emerald-300 text-xs rounded-full border border-emerald-500/30">
                  Smart Hiring
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HireDisk;
