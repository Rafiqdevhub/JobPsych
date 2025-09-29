import React, { useState } from "react";
import { formatErrorMessage, getErrorCategory } from "@utils/errorHandler";

import { generalTips } from "@data/candidateTips";
import ResumeUpload from "@components/resume/ResumeUpload";
import NavigationButton from "@components/buttons/NavigationButton";
import NetworkError from "@components/error/NetworkError";
import LoadingError from "@components/error/LoadingError";
import { ANALYZE_RESUME } from "../utils/api";

const RoleSuggestion = () => {
  const [resumeData, setResumeData] = useState(null);
  const [roleRecommendations, setRoleRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [targetRole, setTargetRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [error, setError] = useState({
    show: false,
    message: "",
    type: "error",
    category: null,
    originalError: null,
  });
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const handleFileUpload = async (file) => {
    setIsLoading(true);
    setError({
      show: false,
      message: "",
      type: "error",
      category: null,
      originalError: null,
    });

    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
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

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
      "application/octet-stream",
      "application/x-msword",
      "application/vnd.ms-word",
      "",
    ];

    const allowedExtensions = [".pdf", ".doc", ".docx"];
    const fileExtension = file.name
      .toLowerCase()
      .substring(file.name.lastIndexOf("."));
    const isValidExtension = allowedExtensions.includes(fileExtension);

    if (!allowedTypes.includes(file.type) && !isValidExtension) {
      setError({
        show: true,
        message: "Please upload a PDF or Word document (DOC/DOCX).",
        type: "warning",
        category: "file",
        originalError: "File type not supported",
      });
      setIsLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      if (targetRole.trim()) {
        formData.append("target_role", targetRole.trim());
      }
      if (jobDescription.trim()) {
        formData.append("job_description", jobDescription.trim());
      }

      const response = await fetch(ANALYZE_RESUME, {
        method: "POST",
        body: formData,
        mode: "cors",
      });

      if (!response.ok) {
        const errorText = await response.text();

        let error;
        try {
          error = JSON.parse(errorText);
        } catch {
          error = { message: errorText || "Unknown error occurred" };
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

      const resumeDataFromResponse = responseData.resumeData || responseData;
      const roleRecommendationsFromResponse =
        responseData.roleRecommendations || [];

      const requiredSections = [
        "personalInfo",
        "workExperience",
        "education",
        "skills",
      ];
      const missingSections = requiredSections.filter(
        (section) => !resumeDataFromResponse[section]
      );

      if (missingSections.length > 0) {
        setAlertMessage(
          `Some important sections are missing from your resume: ${missingSections.join(
            ", "
          )}.\nFor best results, please include Personal Info, Work Experience, Education, and Skills.`
        );
        setAlertType("warning");
      }

      setResumeData(resumeDataFromResponse);
      setRoleRecommendations(roleRecommendationsFromResponse);

      const successMessage = targetRole
        ? `Resume analyzed for ${targetRole} position! Scroll down to see your role fit analysis and recommendations.`
        : "Resume uploaded successfully! Scroll down to see the analysis of your resume.";

      setAlertMessage(successMessage);
      setAlertType("success");
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

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-x-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-cyan-900/10 to-rose-900/20"></div>
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>

        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-20 left-20 w-2 h-2 bg-violet-400/40 rounded-full animate-bounce"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-40 right-32 w-3 h-3 bg-cyan-400/40 rounded-full animate-bounce"
            style={{ animationDelay: "3s" }}
          ></div>
          <div
            className="absolute bottom-32 left-32 w-2 h-2 bg-rose-400/40 rounded-full animate-bounce"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute bottom-20 right-20 w-3 h-3 bg-amber-400/40 rounded-full animate-bounce"
            style={{ animationDelay: "4s" }}
          ></div>
        </div>
      </div>

      <header className="sticky top-4 z-30 mx-4 mt-4">
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl p-4">
          <div className="container mx-auto flex items-center justify-between">
            <NavigationButton
              to="/"
              className="group relative overflow-hidden bg-gradient-to-r from-violet-600 to-cyan-600 px-6 py-3 text-white font-bold rounded-xl shadow-lg hover:shadow-violet-500/25 transition-all duration-300 transform hover:scale-105"
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
                <span>Home</span>
              </div>
            </NavigationButton>

            <div className="hidden md:flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full blur opacity-75 animate-pulse"></div>
                <div className="relative bg-slate-800/90 backdrop-blur-sm px-6 py-2 rounded-full border border-slate-600/50">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400 font-bold text-sm">
                    ✨ AI-Powered Career Intelligence
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 relative z-10 px-4">
        <div className="container mx-auto py-12 space-y-12">
          {/* Hero Section with Floating Cards */}
          <div className="relative">
            <div className="text-center space-y-8">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-3xl blur-xl opacity-30 animate-pulse"></div>
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

                    <h1 className="text-5xl md:text-7xl font-black tracking-tight">
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

                    <div className="flex flex-wrap justify-center gap-4 pt-4">
                      <div className="flex items-center gap-2 bg-slate-800/60 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-600/50">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        <span className="text-slate-300 text-sm">
                          Real-time Analysis
                        </span>
                      </div>
                      <div className="flex items-center gap-2 bg-slate-800/60 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-600/50">
                        <span className="w-2 h-2 bg-violet-400 rounded-full animate-pulse"></span>
                        <span className="text-slate-300 text-sm">
                          AI-Powered Insights
                        </span>
                      </div>
                      <div className="flex items-center gap-2 bg-slate-800/60 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-600/50">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                        <span className="text-slate-300 text-sm">
                          Career Recommendations
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modern Tips Section */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-cyan-600/10 rounded-3xl blur-xl"></div>
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
          {/* Main Content Area - Dynamic */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-600/10 via-violet-600/10 to-cyan-600/10 rounded-3xl blur-xl"></div>
            <div className="relative bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl overflow-hidden">
              {resumeData ? (
                /* Resume Analysis Results */
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
                /* Upload Prompt */
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

                    {/* Feature Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                      <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-600/50 rounded-2xl p-4 hover:border-violet-500/50 transition-all duration-300 group">
                        <div className="w-12 h-12 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-300">
                          <svg
                            className="h-6 w-6 text-white"
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
                        </div>
                        <h4 className="font-bold text-white text-sm mb-1">
                          Instant Analysis
                        </h4>
                        <p className="text-slate-400 text-xs">
                          Get results in seconds
                        </p>
                      </div>

                      <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-600/50 rounded-2xl p-4 hover:border-cyan-500/50 transition-all duration-300 group">
                        <div className="w-12 h-12 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-300">
                          <svg
                            className="h-6 w-6 text-white"
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
                        </div>
                        <h4 className="font-bold text-white text-sm mb-1">
                          Role Matching
                        </h4>
                        <p className="text-slate-400 text-xs">
                          Find perfect fit roles
                        </p>
                      </div>

                      <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-600/50 rounded-2xl p-4 hover:border-emerald-500/50 transition-all duration-300 group">
                        <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-green-600 rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-300">
                          <svg
                            className="h-6 w-6 text-white"
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
                        </div>
                        <h4 className="font-bold text-white text-sm mb-1">
                          Skill Analysis
                        </h4>
                        <p className="text-slate-400 text-xs">
                          Identify strengths
                        </p>
                      </div>

                      <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-600/50 rounded-2xl p-4 hover:border-rose-500/50 transition-all duration-300 group">
                        <div className="w-12 h-12 bg-gradient-to-r from-rose-600 to-pink-600 rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-300">
                          <svg
                            className="h-6 w-6 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                        </div>
                        <h4 className="font-bold text-white text-sm mb-1">
                          100% Secure
                        </h4>
                        <p className="text-slate-400 text-xs">
                          Privacy guaranteed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Role Recommendations - Modern Cards */}
          {roleRecommendations.length > 0 && (
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 via-teal-600/10 to-cyan-600/10 rounded-3xl blur-xl"></div>
              <div className="relative bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
                <div className="text-center mb-12">
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
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m-8 0V6a2 2 0 00-2 2v6.341"
                      />
                    </svg>
                    <h2 className="text-3xl font-bold text-white">
                      Career Matches
                    </h2>
                  </div>
                  <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                    Discover the perfect roles that match your skills and
                    experience
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
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
                        className={`group relative overflow-hidden bg-slate-800/60 backdrop-blur-sm border border-slate-600/50 rounded-3xl p-6 hover:border-violet-500/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl ${
                          isBestMatch
                            ? "ring-2 ring-violet-400/50 shadow-violet-500/20 shadow-2xl"
                            : ""
                        }`}
                      >
                        {/* Background Effects */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${gradient}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                        ></div>
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                        {/* Best Match Badge */}
                        {isBestMatch && (
                          <div className="absolute -top-3 -right-3 z-20">
                            <div className="relative">
                              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full blur-md animate-pulse"></div>
                              <div className="relative bg-gradient-to-r from-violet-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg border border-violet-400/30">
                                ⭐ Best Match
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Match Percentage - Modern Design */}
                        <div className="flex justify-between items-start mb-6">
                          <div
                            className={`relative w-16 h-16 bg-gradient-to-r ${gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                          >
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
                                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m-8 0V6a2 2 0 00-2 2v6.341"
                              />
                            </svg>
                          </div>

                          <div className="text-right">
                            <div className="text-3xl font-black text-emerald-400 mb-1">
                              {Math.round(role.matchPercentage)}%
                            </div>
                            <div className="text-xs text-slate-400 uppercase tracking-wider">
                              Match Score
                            </div>
                          </div>
                        </div>

                        {/* Role Name */}
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-violet-300 transition-colors duration-300">
                          {role.roleName}
                        </h3>

                        {/* Reasoning */}
                        <div className="mb-6">
                          <div className="bg-slate-700/50 rounded-xl p-4 border border-slate-600/30">
                            <p className="text-slate-300 text-sm leading-relaxed italic">
                              "{role.reasoning}"
                            </p>
                          </div>
                        </div>

                        {/* Skills Grid */}
                        <div className="space-y-4">
                          {/* Matching Skills */}
                          <div>
                            <h4 className="text-sm font-semibold text-emerald-400 mb-2 flex items-center gap-2">
                              <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                              Matching Skills
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {role.requiredSkills &&
                              role.requiredSkills.length > 0 ? (
                                role.requiredSkills
                                  .slice(0, 4)
                                  .map((skill, skillIndex) => (
                                    <span
                                      key={skillIndex}
                                      className="bg-emerald-500/20 text-emerald-300 text-xs px-3 py-1 rounded-full border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors duration-200"
                                    >
                                      {skill.length > 12
                                        ? skill.slice(0, 10) + "..."
                                        : skill}
                                    </span>
                                  ))
                              ) : (
                                <span className="text-slate-400 text-xs italic">
                                  No matches detected
                                </span>
                              )}
                              {role.requiredSkills &&
                                role.requiredSkills.length > 4 && (
                                  <span className="text-slate-400 text-xs">
                                    +{role.requiredSkills.length - 4} more
                                  </span>
                                )}
                            </div>
                          </div>

                          {/* Skills to Develop */}
                          <div>
                            <h4 className="text-sm font-semibold text-amber-400 mb-2 flex items-center gap-2">
                              <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                              Growth Areas
                            </h4>
                            <div className="bg-amber-500/10 rounded-lg p-3 border border-amber-500/20">
                              {role.missingSkills &&
                              role.missingSkills.length > 0 ? (
                                <ul className="text-amber-300 text-xs space-y-1">
                                  {role.missingSkills
                                    .slice(0, 3)
                                    .map((skill, skillIndex) => (
                                      <li
                                        key={skillIndex}
                                        className="flex items-center gap-2"
                                      >
                                        <span className="w-1 h-1 bg-amber-400 rounded-full"></span>
                                        {skill}
                                      </li>
                                    ))}
                                  {role.missingSkills.length > 3 && (
                                    <li className="text-slate-400 italic">
                                      +{role.missingSkills.length - 3} more
                                      areas
                                    </li>
                                  )}
                                </ul>
                              ) : (
                                <span className="text-slate-400 text-xs italic">
                                  No major gaps detected!
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Career Level & Industry Fit */}
                        <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-600/30">
                          <div className="text-center">
                            <div className="text-xs text-slate-400 mb-1">
                              Level
                            </div>
                            <div className="text-sm font-semibold text-white">
                              {role.careerLevel}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-slate-400 mb-1">
                              Fit
                            </div>
                            <div className="text-sm font-semibold text-white">
                              {role.industryFit}
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

        {/* Modern Upload Form Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/10 via-violet-600/10 to-rose-600/10 rounded-3xl blur-xl"></div>
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

              {/* Enhanced Input Grid */}
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

              {/* Upload Component with Enhanced Styling */}
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
            </div>
          </div>
        </div>

        {/* Special Error Modals */}
        {renderSpecialError()}

        {/* Enhanced Alert Messages */}
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
    </div>
  );
};

export default RoleSuggestion;
