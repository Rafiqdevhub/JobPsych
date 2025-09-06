import React from "react";
import useToast from "../../hooks/useToast";

const InterviewDashboard = () => {
  const { showSuccess } = useToast();

  const handleStartInterview = () => {
    showSuccess("Redirecting to AI Interview in a new tab...");
    setTimeout(() => {
      window.open(
        "https://ai-mock-interview-preparation-seven.vercel.app/sign-in",
        "_blank"
      );
    }, 1000);
  };

  return (
    <div
      className="min-h-screen bg-blue-50 flex flex-col"
      style={{ pointerEvents: "auto" }}
    >
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
                  Practice makes perfect. Every interview is a step closer to
                  your dream job.
                </blockquote>
              </div>
            </div>

            <div className="flex-shrink-0 text-center sm:text-right">
              <div className="flex items-center justify-center sm:justify-end space-x-3">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                    InterviewPrep AI
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex-1 flex">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-full w-full">
          <div className="lg:col-span-3 h-full">
            <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden h-full flex flex-col">
              <div className="bg-blue-600 px-6 py-4 text-center">
                <h2 className="text-xl font-semibold text-white">
                  AI Powered Interview Practice
                </h2>
              </div>

              <div className="p-6 flex-1 flex flex-col min-h-0">
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="mb-8">
                      <h3 className="text-3xl font-bold text-gray-900 mb-4">
                        Ready to Ace Your Interview?
                      </h3>
                      <p className="text-gray-600 text-lg mb-6 max-w-md mx-auto">
                        Experience our cutting-edge AI interview platform with
                        personalized questions, instant feedback, and real-time
                        analysis.
                      </p>
                    </div>
                    <button
                      onClick={handleStartInterview}
                      className="inline-flex items-center px-10 py-5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all duration-300 cursor-pointer text-lg shadow-xl hover:shadow-2xl transform hover:scale-105"
                      style={{
                        pointerEvents: "auto",
                        zIndex: 10,
                        position: "relative",
                      }}
                    >
                      Start AI Interview
                    </button>
                    <p className="text-sm text-gray-500 mt-4">
                      Click the button above to open in a new tab and start your
                      interview.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 h-full overflow-y-auto">
            <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                Your Progress
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Interview Status</span>
                  <span className="font-medium text-green-600">
                    Ready to Start
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-500 h-3 rounded-full transition-all duration-300 shadow-sm"
                    style={{ width: "0%" }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Complete interviews to track your improvement
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                Interview Tips
              </h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start space-x-2 p-2 rounded-lg hover:bg-blue-50 transition-colors">
                  <span>Speak clearly and confidently</span>
                </li>
                <li className="flex items-start space-x-2 p-2 rounded-lg hover:bg-blue-50 transition-colors">
                  <span>Use the STAR method for behavioral questions</span>
                </li>
                <li className="flex items-start space-x-2 p-2 rounded-lg hover:bg-blue-50 transition-colors">
                  <span>Practice active listening</span>
                </li>
                <li className="flex items-start space-x-2 p-2 rounded-lg hover:bg-blue-50 transition-colors">
                  <span>Show enthusiasm for the role</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-xl border border-green-200 p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start space-x-3">
                <div>
                  <h4 className="text-sm font-semibold text-green-800 mb-1 flex items-center gap-2">
                    AI Interview Integrated
                  </h4>
                  <p className="text-xs text-green-700 leading-relaxed">
                    Click the "Start AI Interview" button to open our advanced
                    AI platform in a new tab. Experience personalized mock
                    interviews with real-time feedback and detailed performance
                    analysis.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-green-200 text-green-800 text-xs rounded-full">
                      Real-time Feedback
                    </span>
                    <span className="px-2 py-1 bg-green-200 text-green-800 text-xs rounded-full">
                      Personalized Questions
                    </span>
                    <span className="px-2 py-1 bg-green-200 text-green-800 text-xs rounded-full">
                      Performance Analysis
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InterviewDashboard;
