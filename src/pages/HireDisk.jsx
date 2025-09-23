import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserCircleIcon,
  ChevronDownIcon,
  StarIcon as StarIconSolid,
  SparklesIcon as SparklesIconSolid,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
import ResumeUpload from "@components/resume/ResumeUpload";
import ResumeDetailsWrapper from "@components/resume/ResumeDetailsWrapper";
import GeneratedQuestions from "@components/GeneratedQuestions";
import Toast from "@components/toast/Toast";
import { API_ENDPOINTS } from "@utils/api";
import { getErrorCategory, formatErrorMessage } from "@utils/errorHandler";
import StandardQuestions from "@components/StandardQuestions";
import { features } from "@data/features";

const HireDisk = () => {
  const navigate = useNavigate();

  const [user] = useState({
    firstName: "User",
    lastName: "",
    email: "user@example.com",
    imageUrl: null,
  });

  const [currentFile, setCurrentFile] = useState(null);
  const [targetRole, setTargetRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resumeData, setResumeData] = useState(null);
  const [fitStatus, setFitStatus] = useState("");
  const [reasoning, setReasoning] = useState("");
  const [roleRecommendations, setRoleRecommendations] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState({
    show: false,
    message: "",
    type: "error",
    category: null,
    originalError: null,
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    if (showProfileDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileDropdown]);

  const handleFileUpload = async (file) => {
    setIsLoading(true);
    setError({
      show: false,
      message: "",
      type: "error",
      category: null,
      originalError: null,
    });

    if (!file) {
      setError({
        show: true,
        message: "No file selected.",
        type: "warning",
        category: "file",
        originalError: "No file selected",
      });
      setIsLoading(false);
      return;
    }

    if (!file.type.match(/pdf|msword|officedocument/)) {
      setError({
        show: true,
        message:
          "File type not supported. Please upload a PDF or Word document.",
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
      formData.append("target_role", targetRole);

      formData.append("job_description", jobDescription);

      const response = await fetch(API_ENDPOINTS.HIREDESK_ANALYZE, {
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

      setFitStatus(responseData.fit_status || "");
      setReasoning(responseData.reasoning || "");
      setRoleRecommendations(responseData.roleRecommendations || []);
      setResumeData(responseData.resumeData || responseData);
      setQuestions(responseData.questions || []);
      setQuestions(responseData.questions || []);

      setToastMessage(
        "Resume analyzed successfully! AI insights generated. Scroll down to see the analysis."
      );
      setToastType("success");
      setShowToast(true);

      setIsLoading(false);
    } catch (error) {
      const errorCategory = getErrorCategory(error);
      setError({
        show: true,
        message: formatErrorMessage(error),
        type: "error",
        category: errorCategory,
        originalError: error,
      });
      setIsLoading(false);
    }
  };

  const handleGenerateQuestions = async (jobDescription) => {
    if (!resumeData) {
      setError({
        show: true,
        message: "Please upload your resume first.",
        type: "warning",
        category: "validation",
        originalError: null,
      });
      return;
    }

    if (questions && questions.length > 0) {
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

    try {
      const resume_text = resumeData.resume_text || resumeData.resumeText || "";

      const response = await fetch(API_ENDPOINTS.GENERATE_QUESTIONS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resume_text: resume_text,
          job_description: jobDescription,
        }),
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

        throw new Error(error.message || "Failed to generate questions");
      }

      const data = await response.json();
      const generatedQuestions = data.questions || data || [];
      setQuestions(generatedQuestions);
      setIsLoading(false);
    } catch (error) {
      const errorCategory = getErrorCategory(error);

      setError({
        show: true,
        message: formatErrorMessage(error),
        type: "error",
        category: errorCategory,
        originalError: error,
      });

      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResumeData(null);
    setQuestions([]);
    setCurrentFile(null);
    setError({
      show: false,
      message: "",
      type: "error",
      category: null,
      originalError: null,
    });
  };

  const handleToastClose = () => {
    setShowToast(false);
  };

  const handleSignOut = async () => {
    try {
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-50">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2s"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4s"></div>
        </div>
        <div className="absolute inset-0 bg-grid-slate-700/[0.04] bg-[size:20px_20px]"></div>
      </div>

      <nav className="relative z-50 backdrop-blur-xl bg-slate-900/80 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/")}
                className="group flex items-center space-x-3 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 hover:from-indigo-500/30 hover:to-purple-500/30 transition-all duration-300"
              >
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-indigo-400 group-hover:text-indigo-300 transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  <div className="absolute inset-0 bg-indigo-400/20 rounded-full blur-sm group-hover:bg-indigo-300/30 transition-all"></div>
                </div>
                <span className="text-slate-200 font-semibold group-hover:text-white transition-colors">
                  Back to Home
                </span>
              </button>
            </div>

            <div className="hidden md:block">
              <div className="text-center">
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
                  HireDisk AI
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Intelligent Candidate Analysis
                </p>
              </div>
            </div>

            <div className="relative">
              <button
                onClick={toggleProfileDropdown}
                className="group flex items-center space-x-3 p-2 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50 hover:border-slate-600/50 transition-all duration-300"
              >
                <div className="relative">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                    {user?.imageUrl ? (
                      <img
                        src={user.imageUrl}
                        alt="Profile"
                        className="h-8 w-8 rounded-lg object-cover"
                      />
                    ) : (
                      <UserCircleIcon className="h-5 w-5 text-white" />
                    )}
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-800 animate-pulse"></div>
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
                    {user?.firstName || "User"}
                  </p>
                  <p className="text-xs text-slate-400">HR Specialist</p>
                </div>
                <ChevronDownIcon
                  className={`h-4 w-4 text-slate-400 group-hover:text-slate-300 transition-all duration-300 ${
                    showProfileDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showProfileDropdown && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-3 w-72 bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 py-2 z-50 animate-in slide-in-from-top-2 duration-200"
                >
                  <div className="px-6 py-4 border-b border-slate-700/50">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                          <UserCircleIcon className="h-7 w-7 text-white" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-800"></div>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-100">
                          {user?.firstName} {user?.lastName || ""}
                        </p>
                        <p className="text-xs text-slate-400">{user?.email}</p>
                        <div className="flex items-center mt-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                          <span className="text-xs text-green-400">Online</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <button
                      onClick={handleSignOut}
                      className="group flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all duration-200 border border-transparent hover:border-red-500/20"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative overflow-hidden rounded-3xl mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800"></div>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 px-8 py-16">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                <SparklesIconSolid className="h-5 w-5 text-yellow-300 mr-2" />
                <span className="text-white/90 text-sm font-medium">
                  AI-Powered Recruitment
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                <span className="bg-gradient-to-r from-white to-indigo-100 bg-clip-text text-transparent">
                  Smart Candidate
                </span>
                <br />
                <span className="text-white">Analysis Hub</span>
              </h1>

              <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                Transform your hiring process with AI-driven insights. Upload
                resumes, analyze candidates, and make confident hiring decisions
                with our intelligent recruitment platform.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="flex items-center px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                  <span className="text-white/90 text-sm">
                    Real-time Analysis
                  </span>
                </div>
                <div className="flex items-center px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 animate-pulse"></div>
                  <span className="text-white/90 text-sm">Skills Matching</span>
                </div>
                <div className="flex items-center px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3 animate-pulse"></div>
                  <span className="text-white/90 text-sm">
                    Interview Questions
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-1 text-yellow-300">
                {[...Array(5)].map((_, i) => (
                  <StarIconSolid key={i} className="h-5 w-5" />
                ))}
                <span className="ml-2 text-white/90 text-sm">
                  Trusted by 1000+ HR Teams
                </span>
              </div>
            </div>
          </div>
        </div>

        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
                AI-Powered Features
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Harness the power of artificial intelligence to revolutionize your
              recruitment process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 hover:border-indigo-500/50 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative p-8">
                  <div className="flex items-start space-x-4">
                    <div className="relative">
                      <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg group-hover:shadow-indigo-500/25 transition-all duration-300 group-hover:scale-110">
                        <feature.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="absolute inset-0 bg-indigo-500/20 rounded-2xl blur-xl group-hover:bg-indigo-500/40 transition-all duration-300"></div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-bold text-white group-hover:text-indigo-200 transition-colors duration-300">
                          {feature.title}
                        </h3>
                        <CheckCircleIcon className="h-5 w-5 text-green-400 opacity-80 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50">
              <div className="relative bg-gradient-to-r from-indigo-600/20 to-purple-600/20 px-8 py-6 border-b border-slate-700/50">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10"></div>
                <div className="relative">
                  <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
                    <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl mr-3">
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
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    Candidate Resume Analysis
                  </h2>
                  <p className="text-slate-300">
                    Upload and analyze candidate resumes with AI-powered
                    insights for smarter hiring decisions
                  </p>
                </div>
              </div>

              <div className="p-8">
                <form
                  className="space-y-6"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (currentFile) handleFileUpload(currentFile);
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-medium text-slate-300 mb-2">
                        <div className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></div>
                        Target Role
                      </label>
                      <input
                        type="text"
                        className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300"
                        value={targetRole}
                        onChange={(e) => setTargetRole(e.target.value)}
                        placeholder="e.g. Senior Software Engineer"
                        required
                      />
                    </div>

                    <div className="md:col-span-1">
                      <label className="flex items-center text-sm font-medium text-slate-300 mb-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                        Resume Upload
                      </label>
                      <ResumeUpload
                        onFileUpload={(file) => setCurrentFile(file)}
                        isLoading={isLoading}
                        onError={(errorData) => {
                          setError({
                            show: true,
                            message:
                              errorData.message || "Error with file upload",
                            type: errorData.type || "warning",
                            category: errorData.category || "file",
                            originalError: errorData,
                          });
                        }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-medium text-slate-300 mb-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                      Job Description
                    </label>
                    <textarea
                      className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300 resize-none"
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      placeholder="Paste the complete job description here..."
                      rows={4}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || !currentFile}
                    className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-white font-semibold shadow-lg hover:shadow-indigo-500/25 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center justify-center">
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                          Analyzing Resume...
                        </>
                      ) : (
                        <>
                          <SparklesIconSolid className="h-5 w-5 mr-3" />
                          Analyze Candidate Resume
                        </>
                      )}
                    </div>
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl bg-gradient-to-br from-indigo-600/20 to-purple-600/20 backdrop-blur-sm border border-indigo-500/30 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <div className="w-2 h-2 bg-indigo-400 rounded-full mr-3 animate-pulse"></div>
                Analysis Stats
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Processing Time</span>
                  <span className="text-indigo-300 font-semibold">
                    ~30 seconds
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Accuracy Rate</span>
                  <span className="text-green-400 font-semibold">95%+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Supported Formats</span>
                  <span className="text-purple-300 font-semibold">
                    PDF, DOC
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-green-600/20 to-teal-600/20 backdrop-blur-sm border border-green-500/30 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3" />
                What You Get
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center text-slate-300">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-3"></div>
                  Skills matching analysis
                </li>
                <li className="flex items-center text-slate-300">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-3"></div>
                  Role recommendations
                </li>
                <li className="flex items-center text-slate-300">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-3"></div>
                  Custom interview questions
                </li>
                <li className="flex items-center text-slate-300">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-3"></div>
                  Detailed candidate insights
                </li>
              </ul>
            </div>
          </div>
        </section>

        <StandardQuestions />

        {resumeData && (
          <section className="mb-16">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50">
              <div className="relative bg-gradient-to-r from-green-600/20 to-emerald-600/20 px-8 py-6 border-b border-slate-700/50">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10"></div>
                <div className="relative flex items-center">
                  <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mr-4 shadow-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
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
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1 flex items-center">
                      Analysis Complete
                      <div className="ml-3 flex items-center px-3 py-1 rounded-full bg-green-500/20 border border-green-400/30">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                        <span className="text-green-400 text-xs font-medium">
                          SUCCESS
                        </span>
                      </div>
                    </h2>
                    <p className="text-slate-300">
                      Comprehensive candidate analysis with AI-powered insights
                      and recommendations
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-8 space-y-8">
                {fitStatus && (
                  <div className="mb-6 p-6 rounded-xl bg-indigo-500/20 border border-indigo-500/30 shadow">
                    <div className="flex items-center mb-2">
                      <span className="inline-block px-3 py-1 rounded-full bg-indigo-600 text-white text-sm font-semibold mr-3">
                        Fit Status: {fitStatus}
                      </span>
                      <span className="text-gray-400 text-sm">
                        (AI Assessment)
                      </span>
                    </div>
                    {reasoning && (
                      <div className="mt-2 text-gray-300 text-base">
                        <span className="font-semibold">Reasoning:</span>{" "}
                        {reasoning}
                      </div>
                    )}
                  </div>
                )}
                <ResumeDetailsWrapper
                  resumeData={resumeData}
                  onGenerateQuestions={handleGenerateQuestions}
                  isLoading={isLoading}
                />
                {roleRecommendations && roleRecommendations.length > 0 && (
                  <div className="mb-6 p-6 rounded-xl bg-purple-500/20 border border-purple-500/30 shadow">
                    <div className="font-semibold text-purple-300 mb-4 text-xl">
                      Recommended Roles:
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {roleRecommendations.map((role, idx) => {
                        if (typeof role === "string") {
                          return (
                            <div
                              key={idx}
                              className="bg-slate-700/50 border border-slate-600 rounded-xl shadow p-4 flex flex-col justify-between"
                            >
                              <div className="font-semibold text-lg text-gray-200">
                                {role}
                              </div>
                            </div>
                          );
                        } else if (typeof role === "object" && role !== null) {
                          return (
                            <div
                              key={idx}
                              className="bg-purple-500/20 border border-purple-500/30 rounded-xl shadow-md p-5 flex flex-col justify-between"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <div className="font-semibold text-lg text-purple-300">
                                  {role.roleName}
                                </div>
                                <span className="text-xs font-bold text-green-400 bg-green-500/20 px-2 py-1 rounded-full">
                                  {role.matchPercentage}% match
                                </span>
                              </div>
                              {role.reasoning && (
                                <div className="text-sm text-gray-300 mb-2">
                                  <span className="font-medium">
                                    Reasoning:
                                  </span>{" "}
                                  {role.reasoning}
                                </div>
                              )}
                              {role.requiredSkills && (
                                <div className="mb-1">
                                  <span className="font-medium text-gray-200">
                                    Required Skills:
                                  </span>
                                  <span className="text-gray-300">
                                    {" "}
                                    {Array.isArray(role.requiredSkills)
                                      ? role.requiredSkills.join(", ")
                                      : role.requiredSkills}
                                  </span>
                                </div>
                              )}
                              {role.missingSkills &&
                                role.missingSkills.length > 0 && (
                                  <div className="mb-1">
                                    <span className="font-medium text-red-400">
                                      Missing Skills:
                                    </span>
                                    <span className="text-red-300">
                                      {" "}
                                      {role.missingSkills.join(", ")}
                                    </span>
                                  </div>
                                )}
                              {role.careerLevel && (
                                <div className="mb-1">
                                  <span className="font-medium text-gray-200">
                                    Career Level:
                                  </span>
                                  <span className="text-gray-300">
                                    {" "}
                                    {role.careerLevel}
                                  </span>
                                </div>
                              )}
                              {role.salaryRange && (
                                <div className="mb-1">
                                  <span className="font-medium text-gray-200">
                                    Salary Range:
                                  </span>
                                  <span className="text-gray-300">
                                    {" "}
                                    {role.salaryRange}
                                  </span>
                                </div>
                              )}
                              {role.industryFit && (
                                <div className="mb-1">
                                  <span className="font-medium text-gray-200">
                                    Industry Fit:
                                  </span>
                                  <span className="text-gray-300">
                                    {" "}
                                    {role.industryFit}
                                  </span>
                                </div>
                              )}
                            </div>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {questions.length > 0 && (
          <section className="mb-16">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50">
              <div className="relative bg-gradient-to-r from-purple-600/20 to-indigo-600/20 px-8 py-6 border-b border-slate-700/50">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10"></div>
                <div className="relative flex items-center">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl mr-4 shadow-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
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
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1 flex items-center">
                      AI Interview Questions
                      <div className="ml-3 flex items-center px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30">
                        <SparklesIconSolid className="w-3 h-3 text-purple-400 mr-2" />
                        <span className="text-purple-400 text-xs font-medium">
                          AI GENERATED
                        </span>
                      </div>
                    </h2>
                    <p className="text-slate-300">
                      Personalized interview questions tailored to the
                      candidate's background and role requirements
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <GeneratedQuestions questions={questions} />
              </div>
            </div>
          </section>
        )}

        {error.show && (
          <Toast
            type={error.type}
            title={error.category === "limit" ? "Upload Limit" : "Error"}
            message={error.message}
            show={error.show}
            onClose={() => setError({ ...error, show: false })}
            duration={error.category === "limit" ? 4000 : 6000}
            errorData={{
              errorType: error.category,
              errorCategory: error.category,
              originalError: error.originalError,
            }}
            actions={
              error.category === "file"
                ? [
                    {
                      label: "Try Again",
                      onClick: () => {
                        setError({ ...error, show: false });
                        handleReset();
                      },
                      variant: "primary",
                    },
                  ]
                : [
                    {
                      label: "Retry",
                      onClick: () => {
                        setError({ ...error, show: false });
                        if (currentFile) {
                          handleFileUpload(currentFile);
                        }
                      },
                      variant: "primary",
                    },
                  ]
            }
          />
        )}
        {showToast && (
          <Toast
            message={toastMessage}
            type={toastType}
            onClose={handleToastClose}
          />
        )}
      </main>
    </div>
  );
};

export default HireDisk;
