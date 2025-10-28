import React, { useState, useEffect } from "react";
import { formatErrorMessage, getErrorCategory } from "@utils/errorHandler";
import { generalTips } from "@data/candidateTips";
import ResumeUpload from "@components/resume/ResumeUpload";
import NavigationButton from "@components/buttons/NavigationButton";
import NetworkError from "@components/error/NetworkError";
import LoadingError from "@components/error/LoadingError";
import ResumeRateLimitError from "@components/error/ResumeRateLimitError";
import { ANALYZE_RESUME } from "../utils/api";
import {
  getResumeAnalysisRateLimit,
  canMakeResumeAnalysisRequest,
  incrementResumeAnalysisCount,
  handleRateLimitHeaders,
} from "../utils/resumeRateLimitService";

const RoleSuggestion = () => {
  const [resumeData, setResumeData] = useState(null);
  const [roleRecommendations, setRoleRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [targetRole, setTargetRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [error, setError] = useState({
    show: false,
    message: "",
    type: "error",
    category: null,
    originalError: null,
  });
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [rateLimitInfo, setRateLimitInfo] = useState(null);
  const [showRateLimitModal, setShowRateLimitModal] = useState(false);

  // Load persisted data and rate limit info on component mount
  useEffect(() => {
    const persistedData = localStorage.getItem("roleSuggestionData");
    if (persistedData) {
      try {
        const {
          resumeData: savedResumeData,
          roleRecommendations: savedRecommendations,
          targetRole: savedTargetRole,
          jobDescription: savedJobDescription,
        } = JSON.parse(persistedData);
        if (savedResumeData) {
          setResumeData(savedResumeData);
          setRoleRecommendations(savedRecommendations || []);
          setTargetRole(savedTargetRole || "");
          setJobDescription(savedJobDescription || "");
        }
      } catch (error) {
        console.warn("Failed to load persisted data:", error);
      }
    }

    const rateLimitData = getResumeAnalysisRateLimit();
    setRateLimitInfo(rateLimitData);
  }, []);

  const persistData = (data) => {
    try {
      localStorage.setItem("roleSuggestionData", JSON.stringify(data));
    } catch (error) {
      console.warn("Failed to persist data:", error);
    }
  };

  const clearPersistedData = () => {
    try {
      localStorage.removeItem("roleSuggestionData");
    } catch (error) {
      console.warn("Failed to clear persisted data:", error);
    }
  };

  const handleFileUpload = async (file) => {
    setResumeData(null);
    setRoleRecommendations([]);
    clearPersistedData();

    setUploadedFile(file);
    setAlertMessage(
      "Resume uploaded successfully! Click 'Analyze Resume' to start the analysis."
    );
    setAlertType("success");

    setTimeout(() => {
      setAlertMessage("");
      setAlertType("");
    }, 5000);
  };

  const analyzeResume = async () => {
    if (!uploadedFile) return;

    if (!canMakeResumeAnalysisRequest()) {
      const rateLimitData = getResumeAnalysisRateLimit();
      setRateLimitInfo(rateLimitData);
      setShowRateLimitModal(true);
      return;
    }

    setIsLoading(true);
    setError({
      show: false,
      message: "",
      type: "error",
      category: null,
      originalError: null,
    });

    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    if (uploadedFile.size > MAX_FILE_SIZE) {
      setError({
        show: true,
        message:
          "The file is too large (max 5MB). Please upload a smaller file or compress the current one.",
        type: "warning",
        category: "file",
        originalError: "File too large",
      });
      setIsLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", uploadedFile);

      if (targetRole.trim()) {
        formData.append("target_role", targetRole.trim());
      }
      if (jobDescription.trim()) {
        formData.append("job_description", jobDescription.trim());
      }

      try {
        incrementResumeAnalysisCount();
      } catch (rateLimitError) {
        setError({
          show: true,
          message: rateLimitError.message,
          type: "error",
          category: "rate_limit",
          originalError: rateLimitError,
        });
        setIsLoading(false);
        return;
      }

      const response = await fetch(ANALYZE_RESUME, {
        method: "POST",
        body: formData,
        mode: "cors",
      });

      // Handle server-side rate limiting headers
      const serverRateLimit = handleRateLimitHeaders(response);
      if (serverRateLimit) {
        setRateLimitInfo(serverRateLimit);
      }

      if (!response.ok) {
        const errorText = await response.text();

        let error;
        try {
          error = JSON.parse(errorText);
        } catch {
          error = { message: errorText || "Unknown error occurred" };
        }

        // Special handling for rate limit errors
        if (response.status === 429) {
          const rateLimitData = getResumeAnalysisRateLimit();
          setRateLimitInfo(rateLimitData);
          setShowRateLimitModal(true);
          setIsLoading(false);
          return;
        }

        throw new Error(error.message || "Failed to analyze resume");
      }

      let responseData;
      try {
        responseData = await response.json();
      } catch (jsonError) {
        throw new Error(
          "Failed to parse API response. The server may have returned invalid data.",
          jsonError
        );
      }

      if (!responseData) {
        throw new Error("No data returned from API");
      }

      const resumeDataFromResponse = {
        ...(responseData.resumeData || responseData),
        // Flatten preparationPlan nested fields to top level for easier access
        ...(responseData.preparationPlan && {
          interview_preparation:
            responseData.preparationPlan.interview_preparation,
          resume_improvements: responseData.preparationPlan.resume_improvements,
          success_metrics: responseData.preparationPlan.success_metrics,
        }),
      };
      const roleRecommendationsFromResponse =
        responseData.roleRecommendations || [];

      const successMessage = targetRole
        ? `Resume analyzed for ${targetRole} position! Scroll down to see your role fit analysis and recommendations.`
        : "Resume uploaded successfully! Scroll down to see the analysis of your resume.";

      setAlertMessage(successMessage);
      setAlertType("success");

      setTimeout(() => {
        setAlertMessage("");
        setAlertType("");
      }, 5000);

      setResumeData(resumeDataFromResponse);
      setRoleRecommendations(roleRecommendationsFromResponse);

      persistData({
        resumeData: resumeDataFromResponse,
        roleRecommendations: roleRecommendationsFromResponse,
        targetRole,
        jobDescription,
        timestamp: new Date().toISOString(),
      });

      const updatedRateLimit = getResumeAnalysisRateLimit();
      setRateLimitInfo(updatedRateLimit);

      setIsLoading(false);
    } catch (error) {
      const errorCategory = getErrorCategory(error);

      if (errorCategory === "network" || errorCategory === "loading") {
        setError({
          show: true,
          message: formatErrorMessage(error),
          type: "error",
          category: errorCategory || "unknown",
          originalError: error,
        });
        setIsLoading(false);
        return;
      }

      setError({
        show: true,
        message: formatErrorMessage(error),
        type: "error",
        category: errorCategory || "unknown",
        originalError: error,
      });
      setAlertMessage(formatErrorMessage(error));
      setAlertType("error");
      setIsLoading(false);
    }
  };

  const renderSpecialError = () => {
    if (error.show && error.category === "network") {
      return <NetworkError onClose={handleErrorClose} />;
    }
    if (error.show && error.category === "loading") {
      return <LoadingError onClose={handleErrorClose} />;
    }
    return null;
  };

  const handleErrorClose = () => {
    setError({ ...error, show: false });
    setAlertMessage("");
    setAlertType("");
  };

  const handleRateLimitModalClose = () => {
    setShowRateLimitModal(false);
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-x-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-cyan-900/10 to-rose-900/20"></div>
      </div>

      <header className="sticky top-4 z-30 mx-4 mt-4">
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl p-4">
          <div className="container mx-auto flex items-center justify-between gap-4">
            <NavigationButton
              to="/"
              className="group relative overflow-hidden bg-gradient-to-r from-violet-600 to-cyan-600 px-6 py-3 text-white font-bold rounded-xl shadow-lg hover:shadow-violet-500/25 transition-all duration-300 transform hover:scale-105 cursor-pointer"
              aria-label="Go to Home Dashboard"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center gap-2">
                <svg
                  className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform duration-300"
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
                <span className="sm:hidden">Home</span>
              </div>
            </NavigationButton>

            <div className="flex items-center gap-3">
              {rateLimitInfo && (
                <div className="relative group">
                  <div
                    className={`absolute inset-0 ${
                      rateLimitInfo.remaining > 3
                        ? "bg-gradient-to-r from-emerald-600/20 to-emerald-500/20"
                        : rateLimitInfo.remaining > 1
                        ? "bg-gradient-to-r from-amber-600/20 to-amber-500/20"
                        : "bg-gradient-to-r from-red-600/20 to-red-500/20"
                    } rounded-xl blur opacity-75`}
                  ></div>
                  <div
                    className={`relative bg-slate-800/90 backdrop-blur-sm px-4 py-2 rounded-xl border ${
                      rateLimitInfo.remaining > 3
                        ? "border-emerald-500/30"
                        : rateLimitInfo.remaining > 1
                        ? "border-amber-500/30"
                        : "border-red-500/30"
                    } transition-all duration-300`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full animate-pulse ${
                          rateLimitInfo.remaining > 3
                            ? "bg-emerald-400"
                            : rateLimitInfo.remaining > 1
                            ? "bg-amber-400"
                            : "bg-red-400"
                        }`}
                      ></div>
                      <div className="flex items-center gap-1.5">
                        <svg
                          className="h-4 w-4 text-slate-400"
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
                        <span className="text-white font-semibold text-sm">
                          <span
                            className={
                              rateLimitInfo.remaining > 3
                                ? "text-emerald-400"
                                : rateLimitInfo.remaining > 1
                                ? "text-amber-400"
                                : "text-red-400"
                            }
                          >
                            {rateLimitInfo.remaining}
                          </span>
                          <span className="text-slate-400">/5</span>
                        </span>
                        <span className="hidden md:inline text-slate-300 text-xs">
                          analyses left
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-full right-0 mt-2 w-64 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-50">
                    <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-xl p-3 shadow-2xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-white">
                          Daily Analysis Quota
                        </span>
                        <span className="text-xs text-slate-400">
                          {(() => {
                            const now = Date.now();
                            const timeRemaining = rateLimitInfo.resetTime - now;
                            if (timeRemaining <= 0) return "Resets soon";
                            const hours = Math.floor(
                              timeRemaining / (1000 * 60 * 60)
                            );
                            const minutes = Math.floor(
                              (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
                            );
                            return hours > 0
                              ? `Resets in ${hours}h ${minutes}m`
                              : `Resets in ${minutes}m`;
                          })()}
                        </span>
                      </div>
                      <div className="w-full bg-slate-700/50 rounded-full h-1.5 mb-2">
                        <div
                          className={`h-1.5 rounded-full transition-all duration-500 ${
                            rateLimitInfo.remaining > 3
                              ? "bg-gradient-to-r from-emerald-500 to-emerald-400"
                              : rateLimitInfo.remaining > 1
                              ? "bg-gradient-to-r from-amber-500 to-amber-400"
                              : "bg-gradient-to-r from-red-500 to-red-400"
                          }`}
                          style={{
                            width: `${(rateLimitInfo.remaining / 5) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <p className="text-xs text-slate-300">
                        {rateLimitInfo.remaining > 0
                          ? `You have ${rateLimitInfo.remaining} resume ${
                              rateLimitInfo.remaining === 1
                                ? "analysis"
                                : "analyses"
                            } remaining today`
                          : "Daily limit reached. Upgrade for unlimited access"}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div
                className={`relative ${
                  rateLimitInfo ? "hidden lg:block" : "hidden md:block"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full blur opacity-75 animate-pulse"></div>
                <div className="relative bg-slate-800/90 backdrop-blur-sm px-6 py-2 rounded-full border border-slate-600/50">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400 font-bold text-sm">
                    AI-Powered Career Intelligence
                  </span>
                </div>
              </div>

              {resumeData && (
                <button
                  onClick={() => {
                    clearPersistedData();
                    setResumeData(null);
                    setRoleRecommendations([]);
                    setUploadedFile(null);
                    setTargetRole("");
                    setJobDescription("");
                    setAlertMessage("All data cleared successfully!");
                    setAlertType("success");
                    setTimeout(() => {
                      setAlertMessage("");
                      setAlertType("");
                    }, 3000);
                  }}
                  className="group relative overflow-hidden px-4 py-2 text-sm font-bold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 bg-slate-800/60 border border-slate-600/50 hover:border-rose-500/50 text-rose-400 hover:text-rose-300"
                  title="Clear all analysis data cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center gap-2">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    <span className="hidden sm:inline">Clear</span>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 relative z-10 px-4">
        <div className="container mx-auto py-12 space-y-12">
          <div className="relative">
            <div className="text-center space-y-8">
              <div className="relative inline-block">
                <div className="relative bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-12 shadow-2xl">
                  <div className="space-y-6">
                    <div className="flex justify-center">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full blur-lg opacity-50 animate-ping"></div>
                        <div className="relative bg-gradient-to-r from-violet-600 to-cyan-600 p-4 rounded-full">
                          <svg
                            className="h-12 w-12 text-white"
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
                        </div>
                      </div>
                    </div>

                    <h1
                      className="text-5xl md:text-7xl font-black tracking-tight"
                      style={{ fontFamily: "'Tinos', serif" }}
                    >
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-cyan-400 to-rose-400 animate-pulse">
                        Resume
                      </span>
                      <br />
                      <span className="text-white">Intelligence Hub</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                      Transform your career with our{" "}
                      <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                        AI-powered
                      </span>{" "}
                      resume analysis. Get instant role recommendations, skill
                      gap analysis, and personalized career insights.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-violet-600 to-cyan-600 p-3 rounded-2xl mb-4">
                  <svg
                    className="h-8 w-8 text-white"
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
                  <h2 className="text-2xl font-bold text-white">
                    Expert Resume Tips
                  </h2>
                </div>
                <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                  Boost your resume's impact with these proven strategies from
                  top career experts
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {generalTips.map((tip, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden bg-slate-800/60 backdrop-blur-sm border border-slate-600/50 rounded-2xl p-6 hover:border-violet-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-violet-500/10"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-sm">
                            {index + 1}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-slate-200 leading-relaxed group-hover:text-white transition-colors duration-300">
                          {tip}
                        </p>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-violet-600 to-cyan-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-600/10 via-violet-600/10 to-cyan-600/10 rounded-3xl blur-xl"></div>
            <div className="relative bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl overflow-hidden">
              {resumeData ? (
                <div className="p-8">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-600 p-3 rounded-2xl mb-4">
                      <svg
                        className="h-8 w-8 text-white"
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
                      <h2 className="text-2xl font-bold text-white">
                        Analysis Complete
                      </h2>
                    </div>
                    <div className="flex justify-center gap-2">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                      <div
                        className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-8 md:p-16 text-center">
                  <div className="max-w-4xl mx-auto space-y-8">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                      <div className="relative bg-gradient-to-r from-violet-600 to-cyan-600 p-6 rounded-3xl inline-block">
                        <svg
                          className="h-20 w-20 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h3 className="text-4xl md:text-5xl font-black text-white leading-tight">
                        Discover Your
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                          Career Potential
                        </span>
                      </h3>

                      <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        Upload your resume and unlock personalized career
                        insights powered by advanced AI analysis
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {resumeData?.resumeScore && (
            <div className="relative">
              <div className="relative bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-2xl mb-4">
                    <svg
                      className="h-8 w-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                    <h2 className="text-3xl font-bold text-white">
                      Resume Score
                    </h2>
                  </div>
                  <p className="text-slate-300 text-lg">
                    Your resume performance breakdown
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
                  {[
                    {
                      label: "Overall",
                      value: resumeData.resumeScore.overall_score,
                      color: "from-violet-600 to-purple-600",
                    },
                    {
                      label: "Technical",
                      value: resumeData.resumeScore.technical_score,
                      color: "from-cyan-600 to-blue-600",
                    },
                    {
                      label: "Experience",
                      value: resumeData.resumeScore.experience_score,
                      color: "from-emerald-600 to-teal-600",
                    },
                    {
                      label: "Education",
                      value: resumeData.resumeScore.education_score,
                      color: "from-rose-600 to-pink-600",
                    },
                    {
                      label: "Communication",
                      value: resumeData.resumeScore.communication_score,
                      color: "from-amber-600 to-orange-600",
                    },
                  ].map((score, idx) => (
                    <div key={idx} className="text-center">
                      <div
                        className={`relative w-24 h-24 mx-auto mb-4 bg-gradient-to-r ${score.color} rounded-2xl flex items-center justify-center shadow-lg`}
                      >
                        <div className="text-3xl font-black text-white">
                          {Math.round(score.value)}
                        </div>
                      </div>
                      <div className="text-sm font-semibold text-slate-300">
                        {score.label}
                      </div>
                    </div>
                  ))}
                </div>

                {resumeData.resumeScore.reasoning && (
                  <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-600/30 mb-4">
                    <h4 className="text-sm font-semibold text-blue-400 mb-2">
                      Analysis
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {resumeData.resumeScore.reasoning}
                    </p>
                  </div>
                )}

                {resumeData.resumeScore.strengths &&
                  resumeData.resumeScore.strengths.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-sm font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                        Strengths
                      </h4>
                      <ul className="space-y-2">
                        {resumeData.resumeScore.strengths.map(
                          (strength, idx) => (
                            <li
                              key={idx}
                              className="flex gap-3 text-sm text-slate-300"
                            >
                              <span className="text-emerald-400 flex-shrink-0">
                                ✓
                              </span>
                              <span>{strength}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                {resumeData.resumeScore.weaknesses &&
                  resumeData.resumeScore.weaknesses.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-sm font-semibold text-amber-400 mb-3 flex items-center gap-2">
                        <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                        Areas to Improve
                      </h4>
                      <ul className="space-y-2">
                        {resumeData.resumeScore.weaknesses.map(
                          (weakness, idx) => (
                            <li
                              key={idx}
                              className="flex gap-3 text-sm text-slate-300"
                            >
                              <span className="text-amber-400 flex-shrink-0">
                                ⚠
                              </span>
                              <span>{weakness}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                {resumeData.resumeScore.improvement_suggestions &&
                  resumeData.resumeScore.improvement_suggestions.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-sm font-semibold text-cyan-400 mb-3 flex items-center gap-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                        Improvement Suggestions
                      </h4>
                      <ul className="space-y-2">
                        {resumeData.resumeScore.improvement_suggestions.map(
                          (suggestion, idx) => (
                            <li
                              key={idx}
                              className="flex gap-3 text-sm text-slate-300"
                            >
                              <span className="text-cyan-400 flex-shrink-0">
                                →
                              </span>
                              <span>{suggestion}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
              </div>
            </div>
          )}

          {resumeData?.personalityInsights && (
            <div className="relative">
              <div className="relative bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-600 to-rose-600 p-3 rounded-2xl mb-4">
                    <svg
                      className="h-8 w-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <h2 className="text-3xl font-bold text-white">
                      Personality Profile
                    </h2>
                  </div>
                  <p className="text-slate-300 text-lg">
                    Your work style and professional traits
                  </p>
                </div>

                {resumeData.personalityInsights.traits && (
                  <div className="space-y-4 mb-8">
                    {Object.entries(resumeData.personalityInsights.traits).map(
                      ([trait, score]) => (
                        <div key={trait}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-semibold text-slate-300 capitalize">
                              {trait}
                            </span>
                            <span className="text-xs font-bold text-cyan-400">
                              {Math.round(score)}%
                            </span>
                          </div>
                          <div className="w-full bg-slate-700/50 rounded-full h-2 border border-slate-600/30">
                            <div
                              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${score}%` }}
                            ></div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}

                {resumeData.personalityInsights.work_style && (
                  <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-600/30 mb-4">
                    <h4 className="text-sm font-semibold text-pink-400 mb-2">
                      Work Style
                    </h4>
                    <p className="text-slate-300 text-sm">
                      {resumeData.personalityInsights.work_style}
                    </p>
                  </div>
                )}

                {(resumeData.personalityInsights.leadership_potential !==
                  undefined ||
                  resumeData.personalityInsights.team_player_score !==
                    undefined) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {resumeData.personalityInsights.leadership_potential !==
                      undefined && (
                      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-600/30">
                        <h4 className="text-sm font-semibold text-amber-400 mb-3">
                          Leadership Potential
                        </h4>
                        <div className="flex items-center gap-4">
                          <div className="text-3xl font-bold text-amber-400">
                            {Math.round(
                              resumeData.personalityInsights
                                .leadership_potential
                            )}
                            %
                          </div>
                          <div className="flex-1">
                            <div className="w-full bg-slate-700/50 rounded-full h-2 border border-slate-600/30">
                              <div
                                className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full transition-all duration-500"
                                style={{
                                  width: `${resumeData.personalityInsights.leadership_potential}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {resumeData.personalityInsights.team_player_score !==
                      undefined && (
                      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-600/30">
                        <h4 className="text-sm font-semibold text-teal-400 mb-3">
                          Team Player Score
                        </h4>
                        <div className="flex items-center gap-4">
                          <div className="text-3xl font-bold text-teal-400">
                            {Math.round(
                              resumeData.personalityInsights.team_player_score
                            )}
                            %
                          </div>
                          <div className="flex-1">
                            <div className="w-full bg-slate-700/50 rounded-full h-2 border border-slate-600/30">
                              <div
                                className="bg-gradient-to-r from-teal-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
                                style={{
                                  width: `${resumeData.personalityInsights.team_player_score}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {resumeData.personalityInsights.analysis && (
                  <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-600/30">
                    <h4 className="text-sm font-semibold text-rose-400 mb-2">
                      Analysis
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {resumeData.personalityInsights.analysis}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
          {roleRecommendations.length > 0 && (
            <div className="relative">
              <div className="relative bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-10 shadow-2xl">
                <div className="text-center mb-16">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-600 p-4 rounded-2xl mb-6 shadow-lg shadow-emerald-500/20">
                    <h2 className="text-4xl font-black text-white">
                      Career Matches
                    </h2>
                  </div>
                  <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed">
                    Discover the perfect roles tailored to your unique skill set
                    and experience
                  </p>
                  <div className="mt-6 flex justify-center gap-2">
                    <div className="h-1 w-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
                    <div className="h-1 w-8 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full opacity-60"></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                  {roleRecommendations.map((role, index) => {
                    const isBestMatch = index === 0;
                    const gradients = [
                      "from-violet-600 to-purple-600",
                      "from-cyan-600 to-blue-600",
                      "from-emerald-600 to-teal-600",
                      "from-rose-600 to-pink-600",
                      "from-amber-600 to-orange-600",
                    ];
                    const gradient = gradients[index % gradients.length];

                    return (
                      <div
                        key={index}
                        className={`group relative overflow-hidden rounded-2xl transition-all duration-500 transform ${
                          isBestMatch
                            ? "md:col-span-2 xl:col-span-1 hover:scale-105"
                            : "hover:scale-105"
                        }`}
                      >
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                        ></div>

                        <div
                          className={`relative h-full bg-gradient-to-br from-slate-800/80 to-slate-900/95 backdrop-blur-xl border transition-all duration-500 rounded-2xl p-6 flex flex-col ${
                            isBestMatch
                              ? "border-emerald-500/40 shadow-2xl shadow-emerald-500/20 ring-2 ring-emerald-400/30"
                              : "border-slate-700/50 shadow-lg hover:shadow-2xl hover:border-slate-600/80"
                          }`}
                        >
                          <div
                            className={`absolute top-0 left-0 h-1 w-0 group-hover:w-full bg-gradient-to-r ${gradient} transition-all duration-500 rounded-t-2xl`}
                          ></div>

                          {isBestMatch && (
                            <div className="absolute -top-2 -right-2 z-20">
                              <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur-lg animate-pulse"></div>
                                <div className="relative bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-xl border border-emerald-300/50 flex items-center gap-1">
                                  <svg
                                    className="w-4 h-4"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                  Best Match
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="flex justify-between items-start mb-5">
                            <div
                              className={`relative w-14 h-14 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110`}
                            >
                              <svg
                                className="h-7 w-7 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m-8 0V6a2 2 0 00-2 2v6.341"
                                />
                              </svg>
                            </div>

                            <div className="text-right">
                              <div
                                className={`text-4xl font-black mb-1 ${
                                  role.matchPercentage >= 85
                                    ? "text-emerald-400"
                                    : role.matchPercentage >= 70
                                    ? "text-cyan-400"
                                    : "text-amber-400"
                                }`}
                              >
                                {Math.round(role.matchPercentage)}%
                              </div>
                              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                Match
                              </div>
                            </div>
                          </div>

                          <h3 className="text-lg font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors duration-300 line-clamp-2">
                            {role.roleName}
                          </h3>

                          <div className="flex gap-2 mb-4">
                            <span className="inline-block bg-slate-700/50 text-slate-300 text-xs font-semibold px-2 py-1 rounded-lg border border-slate-600/30">
                              {role.careerLevel}
                            </span>
                            <span className="inline-block bg-emerald-500/10 text-emerald-400 text-xs font-semibold px-2 py-1 rounded-lg border border-emerald-500/30">
                              {role.industryFit}
                            </span>
                          </div>

                          <div className="mb-5 p-3 bg-slate-900/50 rounded-lg border border-slate-700/50 group-hover:border-slate-600/75 transition-all duration-300">
                            <p className="text-slate-300 text-xs leading-relaxed line-clamp-3">
                              {role.reasoning}
                            </p>
                          </div>

                          <div className="mb-4">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                                Matching Skills
                              </h4>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {role.requiredSkills &&
                              role.requiredSkills.length > 0 ? (
                                role.requiredSkills
                                  .slice(0, 3)
                                  .map((skill, skillIndex) => (
                                    <span
                                      key={skillIndex}
                                      className="bg-emerald-500/15 text-emerald-300 text-xs px-2.5 py-1 rounded-lg border border-emerald-500/30 hover:bg-emerald-500/25 hover:border-emerald-400/50 transition-all duration-200 font-medium truncate"
                                    >
                                      ✓{" "}
                                      {skill.length > 10
                                        ? skill.slice(0, 8) + "..."
                                        : skill}
                                    </span>
                                  ))
                              ) : (
                                <span className="text-slate-400 text-xs italic">
                                  No matches detected
                                </span>
                              )}
                              {role.requiredSkills &&
                                role.requiredSkills.length > 3 && (
                                  <span className="text-slate-400 text-xs font-medium flex items-center">
                                    +{role.requiredSkills.length - 3} more
                                  </span>
                                )}
                            </div>
                          </div>

                          <div className="mb-5">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                                Growth Areas
                              </h4>
                            </div>
                            <div className="bg-amber-500/8 rounded-lg p-3 border border-amber-500/20">
                              {role.missingSkills &&
                              role.missingSkills.length > 0 ? (
                                <ul className="text-amber-300 text-xs space-y-1.5">
                                  {role.missingSkills
                                    .slice(0, 2)
                                    .map((skill, skillIndex) => (
                                      <li
                                        key={skillIndex}
                                        className="flex items-center gap-2"
                                      >
                                        <span className="w-1.5 h-1.5 bg-amber-400 rounded-full flex-shrink-0"></span>
                                        <span>{skill}</span>
                                      </li>
                                    ))}
                                  {role.missingSkills.length > 2 && (
                                    <li className="text-slate-400 italic text-xs">
                                      +{role.missingSkills.length - 2} more
                                      skills to develop
                                    </li>
                                  )}
                                </ul>
                              ) : (
                                <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
                                  <svg
                                    className="w-4 h-4"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  No major gaps!
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {resumeData?.careerPath && (
            <div className="relative">
              <div className="relative bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-teal-600 to-cyan-600 p-3 rounded-2xl mb-4">
                    <svg
                      className="h-8 w-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <h2 className="text-3xl font-bold text-white">
                      Career Roadmap
                    </h2>
                  </div>
                  <p className="text-slate-300 text-lg">
                    Your path to professional growth
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {resumeData.careerPath.current_level && (
                    <div className="bg-slate-800/60 rounded-xl p-6 border border-slate-600/50">
                      <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                        Current Level
                      </h4>
                      <p className="text-xl font-bold text-cyan-400">
                        {resumeData.careerPath.current_level}
                      </p>
                    </div>
                  )}
                  {resumeData.careerPath.timeline && (
                    <div className="bg-slate-800/60 rounded-xl p-6 border border-slate-600/50">
                      <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                        Timeline
                      </h4>
                      <p className="text-xl font-bold text-teal-400">
                        {resumeData.careerPath.timeline}
                      </p>
                    </div>
                  )}
                </div>

                {resumeData.careerPath.next_roles &&
                  resumeData.careerPath.next_roles.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                        Recommended Next Roles
                      </h4>
                      <ul className="space-y-2">
                        {resumeData.careerPath.next_roles.map((role, idx) => (
                          <li
                            key={idx}
                            className="flex gap-3 text-sm text-slate-300"
                          >
                            <span className="text-emerald-400 flex-shrink-0">
                              →
                            </span>
                            <span>{role}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                {resumeData.careerPath.required_development &&
                  resumeData.careerPath.required_development.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-sm font-semibold text-amber-400 mb-3 flex items-center gap-2">
                        <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                        Required Development Areas
                      </h4>
                      <ul className="space-y-2">
                        {resumeData.careerPath.required_development.map(
                          (item, idx) => (
                            <li
                              key={idx}
                              className="flex gap-3 text-sm text-slate-300"
                            >
                              <span className="text-amber-400 flex-shrink-0">
                                •
                              </span>
                              <span>{item}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
              </div>
            </div>
          )}

          {resumeData?.preparationPlan && (
            <div className="relative">
              <div className="relative bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-600 to-amber-600 p-3 rounded-2xl mb-4">
                    <svg
                      className="h-8 w-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <h2 className="text-3xl font-bold text-white">
                      Preparation Plan
                    </h2>
                  </div>
                  <p className="text-slate-300 text-lg">
                    Strategic steps for your development
                  </p>
                </div>

                {resumeData.preparationPlan.role_fit_score && (
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-semibold text-slate-300">
                        Role Fit Score
                      </span>
                      <span className="text-2xl font-black text-orange-400">
                        {Math.round(resumeData.preparationPlan.role_fit_score)}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-700/50 rounded-full h-3 border border-slate-600/30">
                      <div
                        className="bg-gradient-to-r from-orange-500 to-amber-500 h-3 rounded-full transition-all duration-500"
                        style={{
                          width: `${resumeData.preparationPlan.role_fit_score}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                )}

                {resumeData.preparationPlan.role_fit_assessment && (
                  <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-600/30 mb-6">
                    <h4 className="text-sm font-semibold text-orange-400 mb-2">
                      Assessment
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {resumeData.preparationPlan.role_fit_assessment}
                    </p>
                  </div>
                )}

                {resumeData.preparationPlan.critical_skill_gaps &&
                  resumeData.preparationPlan.critical_skill_gaps.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-red-400 mb-3 flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        Critical Skill Gaps
                      </h4>
                      <div className="space-y-3">
                        {resumeData.preparationPlan.critical_skill_gaps.map(
                          (gap, idx) => (
                            <div
                              key={idx}
                              className="bg-red-500/10 rounded-lg p-4 border border-red-500/20"
                            >
                              <div className="flex items-start gap-3">
                                <span className="text-red-400 flex-shrink-0 font-bold">
                                  !
                                </span>
                                <div>
                                  <h5 className="text-sm font-semibold text-red-300 mb-1">
                                    {gap.skill}
                                  </h5>
                                  <p className="text-xs text-slate-300 mb-2">
                                    <strong>Importance:</strong>{" "}
                                    {gap.importance}
                                  </p>
                                  <p className="text-xs text-slate-400 leading-relaxed">
                                    {gap.how_to_develop}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                {resumeData.preparationPlan.personality_alignment && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-purple-400 mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      Personality Alignment
                    </h4>
                    <div className="space-y-4">
                      {resumeData.preparationPlan.personality_alignment
                        .aligned_traits &&
                        resumeData.preparationPlan.personality_alignment
                          .aligned_traits.length > 0 && (
                          <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
                            <h5 className="text-xs font-semibold text-purple-400 mb-2 uppercase tracking-wider">
                              Aligned Traits
                            </h5>
                            <ul className="space-y-1">
                              {resumeData.preparationPlan.personality_alignment.aligned_traits.map(
                                (trait, idx) => (
                                  <li
                                    key={idx}
                                    className="flex gap-2 text-xs text-purple-300"
                                  >
                                    <span className="text-purple-400 flex-shrink-0">
                                      ✓
                                    </span>
                                    <span>{trait}</span>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        )}
                      {resumeData.preparationPlan.personality_alignment
                        .traits_to_develop &&
                        resumeData.preparationPlan.personality_alignment
                          .traits_to_develop.length > 0 && (
                          <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
                            <h5 className="text-xs font-semibold text-blue-400 mb-2 uppercase tracking-wider">
                              Traits to Develop
                            </h5>
                            <ul className="space-y-1">
                              {resumeData.preparationPlan.personality_alignment.traits_to_develop.map(
                                (trait, idx) => (
                                  <li
                                    key={idx}
                                    className="flex gap-2 text-xs text-blue-300"
                                  >
                                    <span className="text-blue-400 flex-shrink-0">
                                      →
                                    </span>
                                    <span>{trait}</span>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        )}
                      {resumeData.preparationPlan.personality_alignment
                        .personality_tips && (
                        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-600/30">
                          <h5 className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                            Tips
                          </h5>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {
                              resumeData.preparationPlan.personality_alignment
                                .personality_tips
                            }
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {resumeData.preparationPlan.strengths_to_leverage &&
                  resumeData.preparationPlan.strengths_to_leverage.length >
                    0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                        Strengths to Leverage
                      </h4>
                      <div className="space-y-3">
                        {resumeData.preparationPlan.strengths_to_leverage.map(
                          (strength, idx) => (
                            <div
                              key={idx}
                              className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/20"
                            >
                              <h5 className="text-sm font-semibold text-emerald-300 mb-2">
                                {strength.strength}
                              </h5>
                              <p className="text-xs text-slate-300 leading-relaxed">
                                <strong>How to Highlight:</strong>{" "}
                                {strength.how_to_highlight}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                {resumeData.preparationPlan.development_areas &&
                  resumeData.preparationPlan.development_areas.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-rose-400 mb-3 flex items-center gap-2">
                        <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
                        Development Areas
                      </h4>
                      <div className="space-y-3">
                        {resumeData.preparationPlan.development_areas.map(
                          (area, idx) => (
                            <div
                              key={idx}
                              className="bg-rose-500/10 rounded-lg p-4 border border-rose-500/20"
                            >
                              <h5 className="text-sm font-semibold text-rose-300 mb-2">
                                {area.weakness}
                              </h5>
                              <p className="text-xs text-slate-300 leading-relaxed">
                                <strong>Action Plan:</strong> {area.action_plan}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                {resumeData.preparationPlan.preparation_timeline && (
                  <div className="mt-6 space-y-4">
                    <h4 className="text-sm font-semibold text-amber-400 flex items-center gap-2">
                      <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                      Timeline
                    </h4>
                    {Object.entries(
                      resumeData.preparationPlan.preparation_timeline
                    ).map(([phase, items]) => (
                      <div
                        key={phase}
                        className="bg-slate-800/30 rounded-lg p-4 border border-slate-600/30"
                      >
                        <h5 className="text-sm font-bold text-amber-300 mb-2 capitalize">
                          {phase.replace(/_/g, " ")}
                        </h5>
                        {Array.isArray(items) && (
                          <ul className="space-y-1">
                            {items.map((item, idx) => (
                              <li
                                key={idx}
                                className="flex gap-2 text-xs text-slate-300"
                              >
                                <span className="text-amber-400 flex-shrink-0">
                                  ✓
                                </span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {(resumeData?.preparationPlan?.estimated_readiness_timeline ||
            resumeData?.preparationPlan?.motivation_summary) && (
            <div className="relative">
              <div className="relative bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-rose-600 to-pink-600 p-3 rounded-2xl mb-4">
                    <svg
                      className="h-8 w-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <h2 className="text-3xl font-bold text-white">
                      Your Journey
                    </h2>
                  </div>
                  <p className="text-slate-300 text-lg">
                    Timeline and motivation for success
                  </p>
                </div>

                {resumeData.preparationPlan.estimated_readiness_timeline && (
                  <div className="mb-8 bg-slate-800/60 rounded-xl p-6 border border-slate-600/50">
                    <h4 className="text-sm font-semibold text-rose-400 mb-3 flex items-center gap-2">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Estimated Readiness Timeline
                    </h4>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {resumeData.preparationPlan.estimated_readiness_timeline}
                    </p>
                  </div>
                )}

                {resumeData.preparationPlan.motivation_summary && (
                  <div className="bg-gradient-to-r from-rose-500/10 to-pink-500/10 rounded-xl p-6 border border-rose-500/20">
                    <h4 className="text-sm font-semibold text-pink-400 mb-3 flex items-center gap-2">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Your Success Message
                    </h4>
                    <p className="text-sm text-pink-300 leading-relaxed italic">
                      "{resumeData.preparationPlan.motivation_summary}"
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {resumeData?.interview_preparation && (
            <div className="relative">
              <div className="relative bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-2xl mb-4">
                    <svg
                      className="h-8 w-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <h2 className="text-3xl font-bold text-white">
                      Interview Preparation
                    </h2>
                  </div>
                  <p className="text-slate-300 text-lg">
                    Key strategies for successful interviews
                  </p>
                </div>

                {resumeData.interview_preparation.key_points_to_emphasize &&
                  resumeData.interview_preparation.key_points_to_emphasize
                    .length > 0 && (
                    <div className="mb-8">
                      <h4 className="text-sm font-semibold text-emerald-400 mb-4 flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                        Key Points to Emphasize
                      </h4>
                      <ul className="space-y-3">
                        {resumeData.interview_preparation.key_points_to_emphasize.map(
                          (point, idx) => (
                            <li
                              key={idx}
                              className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/20"
                            >
                              <p className="text-sm text-emerald-300">
                                {point}
                              </p>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                {resumeData.interview_preparation.common_interview_questions &&
                  resumeData.interview_preparation.common_interview_questions
                    .length > 0 && (
                    <div className="mb-8">
                      <h4 className="text-sm font-semibold text-cyan-400 mb-4 flex items-center gap-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                        Common Interview Questions
                      </h4>
                      <div className="space-y-3">
                        {resumeData.interview_preparation.common_interview_questions.map(
                          (question, idx) => (
                            <div
                              key={idx}
                              className="bg-cyan-500/10 rounded-lg p-4 border border-cyan-500/20"
                            >
                              <p className="text-sm text-cyan-300 font-semibold">
                                {idx + 1}. {question}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                {resumeData.interview_preparation.best_answers_outline && (
                  <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-600/30">
                    <h4 className="text-sm font-semibold text-purple-400 mb-2">
                      Answering Strategy
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {resumeData.interview_preparation.best_answers_outline}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {resumeData?.resume_improvements &&
            resumeData.resume_improvements.length > 0 && (
              <div className="relative">
                <div className="relative bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
                  <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 p-3 rounded-2xl mb-4">
                      <svg
                        className="h-8 w-8 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <h2 className="text-3xl font-bold text-white">
                        Resume Enhancements
                      </h2>
                    </div>
                    <p className="text-slate-300 text-lg">
                      Section-by-section improvements
                    </p>
                  </div>

                  <div className="space-y-6">
                    {resumeData.resume_improvements.map((improvement, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-800/60 rounded-xl p-6 border border-slate-600/50"
                      >
                        <div className="mb-4">
                          <h4 className="text-sm font-bold text-green-400 mb-2 uppercase tracking-wider">
                            {improvement.section}
                          </h4>
                          <div className="flex gap-4 text-xs">
                            <div>
                              <span className="text-slate-400">
                                Current Gap:
                              </span>
                              <p className="text-slate-300 mt-1">
                                {improvement.current_gap}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/20">
                          <h5 className="text-xs font-semibold text-emerald-400 mb-2 uppercase tracking-wider">
                            Recommended Improvement
                          </h5>
                          <p className="text-sm text-emerald-300 leading-relaxed">
                            {improvement.improvement}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          {resumeData?.success_metrics && (
            <div className="relative">
              <div className="relative bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-600 to-amber-600 p-3 rounded-2xl mb-4">
                    <svg
                      className="h-8 w-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                    <h2 className="text-3xl font-bold text-white">
                      Success Metrics
                    </h2>
                  </div>
                  <p className="text-slate-300 text-lg">
                    Milestones for achieving your career goals
                  </p>
                </div>

                {resumeData.success_metrics.skill_readiness && (
                  <div className="mb-6 bg-slate-800/60 rounded-xl p-6 border border-slate-600/50">
                    <h4 className="text-sm font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      Skill Readiness
                    </h4>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {resumeData.success_metrics.skill_readiness}
                    </p>
                  </div>
                )}

                {resumeData.success_metrics.experience_requirements && (
                  <div className="mb-6 bg-slate-800/60 rounded-xl p-6 border border-slate-600/50">
                    <h4 className="text-sm font-semibold text-amber-400 mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                      Experience Requirements
                    </h4>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {resumeData.success_metrics.experience_requirements}
                    </p>
                  </div>
                )}

                {resumeData.success_metrics.confidence_checklist &&
                  resumeData.success_metrics.confidence_checklist.length >
                    0 && (
                    <div className="bg-orange-500/10 rounded-xl p-6 border border-orange-500/20">
                      <h4 className="text-sm font-semibold text-orange-400 mb-4 flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                        Confidence Checklist
                      </h4>
                      <ul className="space-y-2">
                        {resumeData.success_metrics.confidence_checklist.map(
                          (item, idx) => (
                            <li
                              key={idx}
                              className="flex gap-3 text-sm text-orange-300"
                            >
                              <span className="text-orange-400 flex-shrink-0 font-bold">
                                ✓
                              </span>
                              <span>{item}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
              </div>
            </div>
          )}

          {renderSpecialError()}

          {alertMessage && (
            <div
              className={`fixed top-6 right-6 z-50 min-w-[260px] max-w-xs px-4 py-3 rounded-lg shadow-lg text-base flex items-center gap-3 font-semibold transition-all duration-300
                ${
                  alertType === "success"
                    ? "bg-slate-800 text-emerald-400 border border-emerald-500/30"
                    : "bg-slate-800 text-red-400 border border-red-500/30"
                }
              `}
              role="alert"
            >
              {alertType === "success" ? (
                <svg
                  className="h-5 w-5 text-emerald-400"
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
              ) : (
                <svg
                  className="h-5 w-5 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
              <span className="flex-1">{alertMessage}</span>
              <button
                onClick={handleErrorClose}
                className="ml-2 text-lg font-bold focus:outline-none text-slate-400 hover:text-slate-200"
                aria-label="Close alert"
              >
                &times;
              </button>
            </div>
          )}
        </div>

        <div className="relative">
          <div className="relative bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-600 to-violet-600 p-3 rounded-2xl mb-4">
                  <svg
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <h2 className="text-2xl font-bold text-white">
                    Upload & Analyze
                  </h2>
                </div>
                <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                  Enhance your analysis with targeted role and job description
                  matching
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <div className="relative group">
                    <label
                      htmlFor="targetRole"
                      className="text-sm font-bold text-violet-400 mb-3 flex items-center gap-2"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m-8 0V6a2 2 0 00-2 2v6.341"
                        />
                      </svg>
                      Target Role (Optional)
                    </label>
                    <div className="relative">
                      <input
                        id="targetRole"
                        name="targetRole"
                        type="text"
                        value={targetRole}
                        onChange={(e) => setTargetRole(e.target.value)}
                        placeholder="e.g., Software Engineer, Data Scientist, Product Manager"
                        className="w-full px-6 py-4 bg-slate-800/60 backdrop-blur-sm border border-slate-600/50 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400/50 text-white text-lg placeholder-slate-400 transition-all duration-300 group-hover:border-violet-500/30"
                        disabled={isLoading}
                        autoComplete="off"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-cyan-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                    <p className="mt-3 text-sm text-slate-400 flex items-center gap-2">
                      <svg
                        className="h-4 w-4 text-violet-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
                        />
                      </svg>
                      Get targeted analysis for specific roles
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="relative group">
                    <label
                      htmlFor="jobDescription"
                      className="text-sm font-bold text-cyan-400 mb-3 flex items-center gap-2"
                    >
                      <svg
                        className="h-5 w-5"
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
                      Job Description (Optional)
                    </label>
                    <div className="relative">
                      <textarea
                        id="jobDescription"
                        name="jobDescription"
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        placeholder="Paste the job description here for more accurate role fit analysis..."
                        rows={4}
                        className="w-full px-6 py-4 bg-slate-800/60 backdrop-blur-sm border border-slate-600/50 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 resize-vertical text-white text-lg placeholder-slate-400 transition-all duration-300 group-hover:border-cyan-500/30"
                        disabled={isLoading}
                        autoComplete="off"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/10 to-violet-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                    <p className="mt-3 text-sm text-slate-400 flex items-center gap-2">
                      <svg
                        className="h-4 w-4 text-cyan-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                      Enhanced skill gap analysis with job requirements
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-rose-600/5 to-amber-600/5 rounded-2xl"></div>
                <div className="relative">
                  <ResumeUpload
                    onFileUpload={handleFileUpload}
                    isLoading={isLoading}
                    onError={(errorData) => {
                      setError({
                        show: true,
                        message: errorData.message || "Error with file upload",
                        type: errorData.type || "warning",
                        category: errorData.category || "file",
                        originalError: errorData,
                      });
                    }}
                  />
                </div>
              </div>

              {uploadedFile && !resumeData && (
                <div className="relative mt-8">
                  <div className="relative bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
                    <div className="text-center">
                      <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-600 p-3 rounded-2xl mb-6">
                        <svg
                          className="h-8 w-8 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                          />
                        </svg>
                        <h3 className="text-2xl font-bold text-white">
                          Ready to Analyze
                        </h3>
                      </div>

                      <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
                        Your resume "{uploadedFile.name}" has been uploaded
                        successfully. Click the button below to start the
                        AI-powered analysis and get personalized career
                        insights.
                      </p>

                      <button
                        onClick={analyzeResume}
                        disabled={
                          isLoading ||
                          (rateLimitInfo && rateLimitInfo.remaining <= 0)
                        }
                        className="group relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 px-12 py-4 text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative flex items-center gap-3">
                          {isLoading ? (
                            <>
                              <svg
                                className="animate-spin h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              <span>Analyzing Resume...</span>
                            </>
                          ) : rateLimitInfo && rateLimitInfo.remaining <= 0 ? (
                            <>
                              <svg
                                className="h-6 w-6 text-red-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                                />
                              </svg>
                              <span>Daily Limit Reached</span>
                            </>
                          ) : (
                            <>
                              <svg
                                className="h-6 w-6 transform group-hover:rotate-12 transition-transform duration-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                              </svg>
                              <span>Analyze Resume</span>
                            </>
                          )}
                        </div>
                      </button>

                      <div className="mt-6 flex justify-center gap-2">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                        <div
                          className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {renderSpecialError()}

        {alertMessage && (
          <div className="fixed top-8 right-8 z-50 max-w-md">
            <div className="relative">
              <div
                className={`absolute inset-0 ${
                  alertType === "success"
                    ? "bg-gradient-to-r from-emerald-600 to-green-600"
                    : "bg-gradient-to-r from-red-600 to-rose-600"
                } rounded-2xl blur-lg opacity-30 animate-pulse`}
              ></div>
              <div
                className={`relative bg-slate-900/95 backdrop-blur-xl border rounded-2xl p-6 shadow-2xl ${
                  alertType === "success"
                    ? "border-emerald-500/30 text-emerald-300"
                    : "border-red-500/30 text-red-300"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      alertType === "success" ? "bg-emerald-600" : "bg-red-600"
                    }`}
                  >
                    {alertType === "success" ? (
                      <svg
                        className="h-5 w-5 text-white"
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
                    ) : (
                      <svg
                        className="h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium leading-relaxed">
                      {alertMessage}
                    </p>
                  </div>
                  <button
                    onClick={handleErrorClose}
                    className="flex-shrink-0 text-slate-400 hover:text-white transition-colors duration-200 focus:outline-none"
                    aria-label="Close alert"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {showRateLimitModal && (
        <ResumeRateLimitError
          onClose={handleRateLimitModalClose}
          resetTime={rateLimitInfo?.resetTime}
        />
      )}
    </div>
  );
};

export default RoleSuggestion;
