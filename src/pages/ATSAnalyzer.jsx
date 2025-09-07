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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Navbar */}
        <header
          className="bg-white shadow-sm border-b border-blue-100"
          style={{ pointerEvents: "auto" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between py-4 sm:py-6">
              <div className="flex-shrink-0 mb-4 sm:mb-0">
                <button
                  onClick={() => (window.location.href = "/")}
                  className="inline-flex items-center gap-2 bg-blue-600 px-4 py-2 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                  style={{
                    pointerEvents: "auto",
                    zIndex: 10,
                    position: "relative",
                  }}
                >
                  Back to Home
                </button>
              </div>

              <div className="flex-1 text-center px-4 sm:px-8 mb-4 sm:mb-0">
                <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full">
                  <blockquote className="text-sm sm:text-base font-medium text-gray-700 italic">
                    Tailor your resume to pass ATS and land more interviews.
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 flex">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-full w-full">
            <div className="lg:col-span-3 h-full">
              <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden h-full flex flex-col">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-6 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <SparklesIcon className="h-8 w-8 text-white mr-3" />
                    <h2 className="text-2xl font-bold text-white">
                      ATS Resume Analyzer
                    </h2>
                  </div>
                  <p className="text-blue-100 text-sm">
                    Optimize your resume to beat Applicant Tracking Systems
                  </p>
                </div>

                <div className="p-8 flex-1 flex flex-col min-h-0">
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center max-w-lg">
                      <div className="mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
                          <CpuChipIcon className="h-10 w-10 text-blue-600" />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">
                          Ready to Beat the ATS?
                        </h3>
                        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                          Experience our advanced ATS analysis platform with
                          real-time optimization suggestions, keyword analysis,
                          and compatibility scoring across major ATS systems.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <button
                          onClick={handleStartATS}
                          className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 cursor-pointer text-lg shadow-xl hover:shadow-2xl transform hover:scale-105"
                          style={{
                            pointerEvents: "auto",
                            zIndex: 10,
                            position: "relative",
                          }}
                        >
                          <MagnifyingGlassIcon className="h-6 w-6 mr-3" />
                          Start ATS Analysis
                        </button>
                        <p className="text-sm text-gray-500">
                          Click the button above to open our advanced ATS
                          platform in a new tab
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 h-full overflow-y-auto">
              <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <CheckCircleIcon className="h-5 w-5 text-green-600" />
                  ATS Optimization Tips
                </h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start space-x-2 p-2 rounded-lg hover:bg-blue-50 transition-colors">
                    <span>
                      Use standard section headers (Experience, Education)
                    </span>
                  </li>
                  <li className="flex items-start space-x-2 p-2 rounded-lg hover:bg-blue-50 transition-colors">
                    <span>Include relevant keywords from job descriptions</span>
                  </li>
                  <li className="flex items-start space-x-2 p-2 rounded-lg hover:bg-blue-50 transition-colors">
                    <span>Use quantifiable achievements and metrics</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <SparklesIcon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 mb-1 flex items-center gap-2">
                      Advanced ATS Analysis
                    </h4>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      Our AI-powered platform analyzes your resume against
                      multiple ATS systems including Workday, Greenhouse, and
                      LinkedIn. Get detailed insights and optimization
                      recommendations.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-blue-200 text-blue-800 text-xs rounded-full">
                        Real-time Analysis
                      </span>
                      <span className="px-2 py-1 bg-purple-200 text-purple-800 text-xs rounded-full">
                        Multi-ATS Support
                      </span>
                      <span className="px-2 py-1 bg-green-200 text-green-800 text-xs rounded-full">
                        Keyword Optimization
                      </span>
                    </div>
                  </div>
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
