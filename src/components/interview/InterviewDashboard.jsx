import React, { useState } from "react";
import { PauseIcon, MicrophoneIcon } from "@heroicons/react/24/outline";

const InterviewDashboard = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const sampleQuestions = [
    "Tell me about yourself and your background.",
    "What are your greatest strengths and weaknesses?",
    "Why are you interested in this role?",
    "Describe a challenging project you worked on.",
    "Where do you see yourself in 5 years?",
  ];

  const handleRecording = () => {
    setIsRecording(!isRecording);
    // Demo functionality - in real implementation, this would handle actual recording
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50"
      style={{ pointerEvents: "auto" }}
    >
      <header
        className="bg-white shadow-sm border-b border-blue-100"
        style={{ pointerEvents: "auto" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex-shrink-0">
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

            <div className="flex-1 text-center px-8">
              <blockquote className="text-lg font-medium text-gray-700 italic">
                Practice makes perfect. Every interview is a step closer to your
                dream job.
              </blockquote>
              <cite className="text-sm text-blue-600 font-semibold mt-1 block">
                InterviewPrep AI
              </cite>
            </div>

            <div className="flex-shrink-0 text-right">
              <div className="flex items-center justify-end space-x-3">
                <h1 className="text-2xl font-bold text-gray-900">
                  InterviewPrep AI
                </h1>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                  Demo Version
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-600 px-6 py-4">
                <h2 className="text-xl font-semibold text-white">
                  Practice Interview
                </h2>
                <p className="text-blue-100 text-sm">
                  Question {currentQuestion + 1} of {sampleQuestions.length}
                </p>
              </div>

              <div className="p-6">
                <div className="mb-8">
                  <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                    <h3 className="text-lg font-medium text-blue-900 mb-2">
                      Current Question:
                    </h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {sampleQuestions[currentQuestion]}
                    </p>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex items-center justify-center space-x-4">
                    <button
                      onClick={handleRecording}
                      className={`flex items-center space-x-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 cursor-pointer ${
                        isRecording
                          ? "bg-red-500 hover:bg-red-600 text-white"
                          : "bg-blue-500 hover:bg-blue-600 text-white"
                      }`}
                    >
                      {isRecording ? (
                        <>
                          <PauseIcon className="h-6 w-6" />
                          <span>Stop Recording</span>
                        </>
                      ) : (
                        <>
                          <MicrophoneIcon className="h-6 w-6" />
                          <span>Start Recording</span>
                        </>
                      )}
                    </button>
                  </div>

                  {isRecording && (
                    <div className="mt-4 text-center">
                      <div className="inline-flex items-center space-x-2 bg-red-50 px-4 py-2 rounded-lg">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-red-700 font-medium">
                          Recording...
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div
                  className="flex justify-between items-center"
                  style={{ pointerEvents: "auto" }}
                >
                  <button
                    onClick={() => {
                      if (currentQuestion > 0) {
                        setCurrentQuestion(currentQuestion - 1);
                      }
                    }}
                    disabled={currentQuestion === 0}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                      currentQuestion === 0
                        ? "bg-gray-50 text-gray-400 cursor-not-allowed"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer"
                    }`}
                    style={{ pointerEvents: "auto", zIndex: 5 }}
                  >
                    Previous Question
                  </button>

                  <div className="flex space-x-2">
                    {sampleQuestions.map((_, index) => (
                      <div
                        key={index}
                        className={`w-3 h-3 rounded-full cursor-pointer ${
                          index === currentQuestion
                            ? "bg-blue-500"
                            : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      if (currentQuestion < sampleQuestions.length - 1) {
                        setCurrentQuestion(currentQuestion + 1);
                      }
                    }}
                    disabled={currentQuestion === sampleQuestions.length - 1}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                      currentQuestion === sampleQuestions.length - 1
                        ? "bg-blue-300 text-white cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
                    }`}
                    style={{ pointerEvents: "auto", zIndex: 5 }}
                  >
                    Next Question
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Your Progress
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Questions Completed</span>
                  <span className="font-medium">
                    {currentQuestion + 1}/{sampleQuestions.length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${
                        ((currentQuestion + 1) / sampleQuestions.length) * 100
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                💡 Interview Tips
              </h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Speak clearly and confidently</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Use the STAR method for behavioral questions</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Practice active listening</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Show enthusiasm for the role</span>
                </li>
              </ul>
            </div>

            <div className="bg-yellow-50 rounded-xl border border-yellow-200 p-6">
              <div className="flex items-start space-x-3">
                <div className="text-yellow-500 text-xl">⚠️</div>
                <div>
                  <h4 className="text-sm font-semibold text-yellow-800 mb-1">
                    Demo Version
                  </h4>
                  <p className="text-xs text-yellow-700">
                    This is a demo page. Recording functionality and AI analysis
                    will be available in the full version.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-blue-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600">
              🎯 <strong>InterviewPrep AI</strong> - Practice makes perfect
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Powered by JobPsych • Demo Version
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default InterviewDashboard;
