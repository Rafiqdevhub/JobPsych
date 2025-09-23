import React from "react";
import {
  ChartBarIcon,
  CheckCircleIcon,
  SparklesIcon,
  CpuChipIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import useToast from "@/hooks/useToast";

const ATSAnalyzer = () => {
  const { showSuccess } = useToast();

  const handleStartATS = () => {
    showSuccess("Redirecting to ATS Cracker in a new tab...");
    setTimeout(() => {
      window.open("https://ats-cracker.vercel.app/", "_blank");
    }, 1000);
  };

  return (
    <div
      className="min-h-screen bg-slate-900 flex flex-col relative overflow-hidden"
      style={{ pointerEvents: "auto" }}
    >
      <div className="absolute inset-0 bg-slate-900">
        <div className="absolute inset-0 opacity-30">
          <div className="h-full w-full bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-blue-500/20"></div>
        </div>
        <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-48 sm:w-72 h-48 sm:h-72 bg-indigo-500/10 rounded-full blur-2xl sm:blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-64 sm:w-96 h-64 sm:h-96 bg-purple-500/10 rounded-full blur-2xl sm:blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 sm:w-80 h-56 sm:h-80 bg-blue-500/10 rounded-full blur-2xl sm:blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 w-full">
        <header
          className="relative z-10 overflow-hidden"
          style={{ pointerEvents: "auto" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 opacity-95"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/15 to-blue-500/10"></div>

          <div className="absolute top-2 left-1/4 w-1.5 h-1.5 bg-indigo-400/40 rounded-full animate-bounce delay-300"></div>
          <div className="absolute top-3 right-1/3 w-1 h-1 bg-purple-400/60 rounded-full animate-bounce delay-700"></div>
          <div className="absolute bottom-2 left-1/3 w-1 h-1 bg-blue-400/50 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute bottom-1 right-1/4 w-1 h-1 bg-pink-400/40 rounded-full animate-bounce delay-500"></div>

          <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-r from-indigo-500/15 to-purple-500/15 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-lg animate-pulse delay-1000"></div>

          <div className="relative z-10 backdrop-blur-2xl border-b border-indigo-500/20 shadow-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="py-3 sm:py-4">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
                  <div className="flex items-center">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-xl blur opacity-40 group-hover:opacity-60 transition-opacity duration-300 scale-105"></div>

                      <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 px-3 py-2 rounded-xl shadow-lg border border-white/20 group-hover:scale-105 transition-transform duration-300">
                        <div className="flex items-center gap-2">
                          <div className="relative">
                            <CpuChipIcon className="h-6 w-6 text-white drop-shadow-lg group-hover:rotate-12 transition-transform duration-500" />
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-ping"></div>
                          </div>

                          <div>
                            <h1 className="text-lg sm:text-xl font-black text-white tracking-tight leading-none">
                              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-100">
                                ATS
                              </span>
                              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300 ml-1">
                                Analyzer
                              </span>
                            </h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 text-center px-2 lg:px-4">
                    <p className="text-sm sm:text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-slate-300 via-white to-slate-300 leading-tight">
                      AI-Powered Resume Optimization
                    </p>
                    <p className="hidden sm:block text-xs text-slate-400 mt-1">
                      Beat ATS systems and land more interviews
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg blur opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
                      <div className="relative bg-gradient-to-r from-emerald-600 to-teal-600 px-3 py-1.5 rounded-lg border border-emerald-400/30 shadow-md group-hover:scale-105 transition-transform duration-300">
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse"></div>
                          <span className="text-white font-bold text-xs">
                            AI Powered
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="relative group">
                      <button
                        onClick={() => (window.location.href = "/")}
                        className="relative overflow-hidden bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-xl px-4 py-2 text-white font-semibold rounded-lg border border-indigo-500/30 hover:border-indigo-400/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group text-sm"
                        style={{
                          pointerEvents: "auto",
                          zIndex: 10,
                          position: "relative",
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                        <div className="relative flex items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform duration-300"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="hidden sm:inline">Back to Home</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 max-h-none lg:max-h-[70vh]">
            <div className="lg:col-span-3 order-1 lg:order-1">
              <div className="group bg-slate-800/30 backdrop-blur-2xl rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-700/30 overflow-hidden min-h-[50vh] sm:min-h-[55vh] lg:h-[60vh] flex flex-col relative hover:shadow-indigo-500/20 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-blue-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 px-4 sm:px-6 py-3 sm:py-4 text-center overflow-hidden">
                  <div className="absolute top-2 left-6 sm:left-10 w-2 h-2 bg-white/30 rounded-full animate-bounce"></div>
                  <div className="absolute top-3 sm:top-4 right-12 sm:right-16 w-1 h-1 bg-white/40 rounded-full animate-bounce delay-300"></div>
                  <div className="absolute bottom-2 sm:bottom-3 left-16 sm:left-20 w-1.5 h-1.5 bg-white/25 rounded-full animate-bounce delay-700"></div>

                  <h2 className="text-base sm:text-lg font-black text-white flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 relative z-10">
                    <div className="relative">
                      <SparklesIcon className="h-5 w-5 sm:h-6 sm:w-6 animate-pulse" />
                      <div className="absolute inset-0 bg-white/20 rounded-full blur-sm animate-ping"></div>
                    </div>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white animate-pulse text-center">
                      ATS Resume Analyzer
                    </span>
                    <div className="relative">
                      <SparklesIcon className="h-5 w-5 sm:h-6 sm:w-6 animate-pulse delay-500" />
                      <div className="absolute inset-0 bg-white/20 rounded-full blur-sm animate-ping delay-500"></div>
                    </div>
                  </h2>
                </div>

                <div className="p-4 sm:p-6 flex-1 flex flex-col min-h-0 relative">
                  <div className="absolute top-6 sm:top-10 right-6 sm:right-10 w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-xl animate-pulse"></div>
                  <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>

                  <div className="flex-1 flex items-center justify-center relative z-10">
                    <div className="text-center max-w-sm sm:max-w-lg mx-auto px-2 sm:px-4">
                      <div className="mb-4 sm:mb-6">
                        <div className="relative mb-3 sm:mb-4 flex justify-center">
                          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur-xl sm:blur-2xl opacity-30 animate-pulse scale-125 sm:scale-150"></div>
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-lg sm:blur-xl opacity-20 animate-pulse delay-300 scale-110 sm:scale-125"></div>
                          <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-2xl border border-white/10">
                            <CpuChipIcon className="h-10 w-10 sm:h-12 sm:w-12 text-white drop-shadow-lg" />
                            <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-ping"></div>
                            <div className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-ping delay-500"></div>
                          </div>
                        </div>

                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-2 sm:mb-3 leading-tight">
                          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300">
                            Ready to Beat
                          </span>
                          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 animate-pulse">
                            ATS Systems?
                          </span>
                        </h3>

                        <p className="text-slate-300 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed px-1 sm:px-2 backdrop-blur-sm bg-slate-800/20 rounded-lg sm:rounded-xl py-2 border border-slate-700/30">
                          Experience our cutting-edge AI platform with real-time
                          optimization, keyword analysis, and compatibility
                          scoring.
                        </p>
                      </div>

                      <div className="relative group/btn">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl sm:rounded-2xl blur opacity-75 group-hover/btn:opacity-100 transition duration-300 animate-pulse"></div>
                        <button
                          onClick={handleStartATS}
                          className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 px-6 sm:px-8 py-3 sm:py-4 text-white font-bold rounded-xl sm:rounded-2xl shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300 transform hover:scale-105 cursor-pointer text-sm sm:text-base w-full border border-white/10"
                          style={{
                            pointerEvents: "auto",
                            zIndex: 10,
                            position: "relative",
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                          <div className="relative flex items-center justify-center gap-2 sm:gap-3">
                            <div className="relative">
                              <MagnifyingGlassIcon className="h-4 w-4 sm:h-5 sm:w-5 group-hover/btn:rotate-12 transition-transform duration-300" />
                              <div className="absolute inset-0 bg-white/20 rounded-full blur-sm group-hover/btn:animate-ping"></div>
                            </div>
                            <span className="font-black tracking-wide">
                              Start ATS Analysis
                            </span>
                            <svg
                              className="h-4 w-4 sm:h-5 sm:w-5 group-hover/btn:translate-x-1 transition-transform duration-300"
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
                      </div>

                      <p className="text-slate-400 mt-3 sm:mt-4 text-xs sm:text-sm backdrop-blur-sm bg-slate-800/20 rounded-lg py-2 px-3 sm:px-4 border border-slate-700/30">
                        Opens in a new tab • Advanced ATS optimization platform
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block lg:col-span-1 order-2 lg:order-2">
              <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                <div className="group bg-slate-800/40 backdrop-blur-2xl rounded-2xl shadow-xl border border-slate-700/50 p-4 hover:shadow-2xl hover:border-indigo-500/50 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <h3 className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-3 flex items-center gap-2 relative z-10">
                    <div className="relative">
                      <CheckCircleIcon className="h-5 w-5 text-indigo-400 group-hover:rotate-12 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-indigo-400/20 rounded-full blur-sm group-hover:animate-ping"></div>
                    </div>
                    ATS Optimization Tips
                  </h3>
                  <div className="space-y-2 relative z-10">
                    {[
                      {
                        number: "1",
                        title: "Standard Headers",
                        desc: "Use clear section headers",
                        color: "from-indigo-500 to-purple-500",
                      },
                      {
                        number: "2",
                        title: "Keyword Optimization",
                        desc: "Include relevant keywords",
                        color: "from-purple-500 to-pink-500",
                      },
                      {
                        number: "3",
                        title: "Quantifiable Results",
                        desc: "Use metrics and numbers",
                        color: "from-emerald-500 to-teal-500",
                      },
                    ].map((tip, index) => (
                      <div
                        key={index}
                        className="group/tip flex items-start gap-3 p-2 rounded-xl bg-slate-700/30 backdrop-blur-sm border border-slate-600/30 hover:bg-slate-700/50 hover:border-slate-500/50 transition-all duration-300"
                      >
                        <div
                          className={`w-6 h-6 bg-gradient-to-r ${tip.color} rounded-full flex items-center justify-center flex-shrink-0 shadow-lg group-hover/tip:scale-110 transition-transform duration-300`}
                        >
                          <span className="text-white font-bold text-xs">
                            {tip.number}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold text-xs mb-1 group-hover/tip:text-indigo-300 transition-colors duration-300">
                            {tip.title}
                          </h4>
                          <p className="text-slate-300 text-xs group-hover/tip:text-slate-200 transition-colors duration-300">
                            {tip.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="group bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 border border-purple-500/40 rounded-2xl p-4 backdrop-blur-xl hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute top-2 right-2 w-3 h-3 bg-pink-400/30 rounded-full animate-bounce"></div>
                  <div className="absolute bottom-2 left-2 w-2 h-2 bg-purple-400/40 rounded-full animate-bounce delay-500"></div>

                  <div className="text-center relative z-10">
                    <p className="font-black text-sm mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">
                      Beat Every ATS System!
                    </p>
                    <p className="text-slate-300 text-xs group-hover:text-slate-200 transition-colors duration-300">
                      Join thousands who landed interviews
                    </p>
                  </div>
                </div>

                <div className="group bg-slate-800/40 backdrop-blur-2xl rounded-2xl border border-emerald-500/40 p-4 hover:shadow-2xl hover:border-emerald-500/60 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="flex items-start space-x-3 relative z-10">
                    <div className="flex-1">
                      <h4 className="text-xs font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 mb-2 flex items-center gap-2">
                        <div className="relative">
                          <SparklesIcon className="h-4 w-4 text-emerald-400 group-hover:rotate-180 transition-transform duration-500" />
                          <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-sm group-hover:animate-ping"></div>
                        </div>
                        Advanced Analysis
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed mb-2 group-hover:text-slate-200 transition-colors duration-300">
                        AI analyzes against major ATS systems including Workday,
                        Greenhouse, and LinkedIn.
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {["Multi-ATS", "Real-time"].map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-emerald-500/20 text-emerald-300 text-xs rounded-full border border-emerald-500/30 backdrop-blur-sm hover:bg-emerald-500/30 transition-colors duration-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="block lg:hidden mt-4 space-y-4">
            <div className="bg-slate-800/40 backdrop-blur-2xl rounded-2xl shadow-xl border border-slate-700/50 p-4">
              <h3 className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-3 flex items-center gap-2">
                <CheckCircleIcon className="h-5 w-5 text-indigo-400" />
                Quick ATS Tips
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    title: "Clear Headers",
                    desc: "Use standard section names",

                    color: "from-indigo-500 to-purple-500",
                  },
                  {
                    title: "Keywords",
                    desc: "Match job description",

                    color: "from-purple-500 to-pink-500",
                  },
                  {
                    title: "Metrics",
                    desc: "Include numbers & results",

                    color: "from-emerald-500 to-teal-500",
                  },
                ].map((tip, index) => (
                  <div
                    key={index}
                    className={`bg-gradient-to-r ${tip.color}/10 border border-slate-600/30 rounded-xl p-3 text-center hover:scale-105 transition-transform duration-300`}
                  >
                    <h4 className="text-white font-semibold text-xs mb-1">
                      {tip.title}
                    </h4>
                    <p className="text-slate-300 text-xs">{tip.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 rounded-2xl p-4">
              <div className="text-center">
                <h4 className="text-sm font-bold text-emerald-400 mb-2 flex items-center justify-center gap-2">
                  ATS Analysis Ready?
                </h4>
                <p className="text-xs text-slate-300 mb-3">
                  Tap the button above to optimize your resume for ATS systems
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="px-2 py-1 bg-emerald-500/20 text-emerald-300 text-xs rounded-full border border-emerald-500/30">
                    ATS Compatible
                  </span>
                  <span className="px-2 py-1 bg-emerald-500/20 text-emerald-300 text-xs rounded-full border border-emerald-500/30">
                    Keyword Optimized
                  </span>
                  <span className="px-2 py-1 bg-emerald-500/20 text-emerald-300 text-xs rounded-full border border-emerald-500/30">
                    Real-time Analysis
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ATSAnalyzer;
