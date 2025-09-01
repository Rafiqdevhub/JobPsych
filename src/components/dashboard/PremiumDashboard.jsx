import React, { useState } from "react";
import { useUser, useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import {
  ChartBarIcon,
  DocumentTextIcon,
  StarIcon,
  TrophyIcon,
  BoltIcon,
  UserCircleIcon,
  ChevronDownIcon,
  StarIcon as StarIconSolid,
  SparklesIcon as SparklesIconSolid,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
import ResumeUpload from "../resume/ResumeUpload";
import ResumeDetailsWrapper from "../resume/ResumeDetailsWrapper";
import GeneratedQuestions from "../GeneratedQuestions";
// import SubscriptionManagement from "./SubscriptionManagement";
import Toast from "../toast/Toast";
import { API_ENDPOINTS } from "../../utils/api";
import { getErrorCategory, formatErrorMessage } from "../../utils/errorHandler";
import StandardQuestions from "../StandardQuestions";
import { features } from "../../data/features";

const PremiumDashboard = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();

  // For local dev, ignore payment/scan limits
  const [uploadCount] = useState(0);
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
      // For local dev, ignore scan limits

      setToastMessage(
        "Resume analyzed successfully! Premium insights generated. Scroll down to see the analysis."
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
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 w-full relative rounded-2xl shadow-lg border border-gray-200 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 p-4 md:p-6">
        <div className="w-full md:w-auto flex justify-start mb-4 md:mb-0">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg text-blue-700 font-semibold hover:bg-white hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-blue-600"
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
            Back to Home
          </button>
        </div>

        <div className="flex-1 flex justify-center items-center text-center px-2">
          <blockquote className="italic text-lg text-gray-700 max-w-xl mx-auto">
            "Upload and review candidate resumes. Instantly analyze their fit,
            skills, and readiness for your open roles. Make confident hiring
            decisions with AI-powered insights."
          </blockquote>
        </div>

        <div className="w-full md:w-auto flex justify-end relative">
          <button
            onClick={toggleProfileDropdown}
            className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg px-4 py-2 hover:bg-white hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
          >
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                {user?.imageUrl ? (
                  <img
                    src={user.imageUrl}
                    alt="Profile"
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <UserCircleIcon className="h-5 w-5 text-white" />
                )}
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-medium text-gray-900 truncate max-w-24">
                  {user?.firstName ||
                    user?.emailAddresses[0]?.emailAddress?.split("@")[0] ||
                    "User"}
                </p>
                <p className="text-xs text-gray-500">Premium Member</p>
              </div>
            </div>
            <ChevronDownIcon
              className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                showProfileDropdown ? "rotate-180" : ""
              }`}
            />
          </button>
          {showProfileDropdown && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.firstName} {user?.lastName || ""}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.emailAddresses[0]?.emailAddress}
                </p>
              </div>
              <div className="py-1">
                <button
                  onClick={handleSignOut}
                  className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-sm hover:shadow-md border border-transparent hover:border-red-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
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

      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 mb-8 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/90 via-purple-600/90 to-pink-600/90"></div>
        <div className="absolute -top-4 -right-4 transform rotate-12">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <StarIconSolid key={i} className="h-4 w-4 text-yellow-300/60" />
            ))}
          </div>
        </div>
        <div className="absolute -bottom-2 -left-2">
          <SparklesIconSolid className="h-16 w-16 text-white/20" />
        </div>
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
              <TrophyIcon className="h-10 w-10 text-yellow-300" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">
                Candidate Review Dashboard
              </h1>
              <p className="text-indigo-100 text-lg">
                For HR: Upload, analyze, and hire the best candidates with
                confidence.
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
            <div className="flex -space-x-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-6 w-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full border-2 border-white"
                ></div>
              ))}
            </div>
            <span className="text-white text-sm font-medium">HR Access</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  Scans Remaining (dev)
                </p>
                <p className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  ∞
                </p>
              </div>
              <div className="p-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl shadow-lg">
                <DocumentTextIcon className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Monthly limit</span>
                <span className="font-semibold text-gray-900">∞</span>
              </div>
              <div className="relative">
                <div className="flex h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500 ease-out relative overflow-hidden"
                    style={{ width: `100%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  Total Scans
                </p>
                <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {uploadCount}
                </p>
              </div>
              <div className="p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl shadow-lg">
                <ChartBarIcon className="h-8 w-8 text-white" />
              </div>
            </div>
            <p className="text-sm text-gray-600 flex items-center">
              <TrophyIcon className="h-4 w-4 mr-1 text-amber-500" />
              All-time analyses completed
            </p>
          </div>
        </div>
        <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  Plan Status (dev)
                </p>
                <div className="flex items-center space-x-2">
                  <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Free (local)
                  </p>
                </div>
              </div>
              <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg">
                <StarIcon className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">
                No payment required (dev)
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50 mb-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-3">
            Premium Features Suite
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Unlock the full potential of AI-powered career advancement tools
            designed for professionals
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-xl`}
              ></div>
              <div className="relative z-10">
                <div className="flex items-start space-x-4">
                  <div
                    className={`p-3 bg-gradient-to-r ${feature.gradient} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                        {feature.title}
                      </h3>
                      <CheckCircleIcon className="h-5 w-5 text-green-500 opacity-80" />
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Categorized HR Questions Section  */}
      <StandardQuestions />

      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 px-8 py-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Candidate Resume Analysis
              </h2>
              <p className="text-gray-600">
                Upload a candidate's resume to instantly assess their fit,
                skills, and readiness for your open position. Use the insights
                to make informed hiring decisions.
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-3 bg-white/50 backdrop-blur-sm rounded-xl px-4 py-2">
              <BoltIcon className="h-5 w-5 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">HR Tool</span>
            </div>
          </div>
        </div>
        <div className="p-8">
          <div className="space-y-6">
            <div className="flex items-center justify-center space-x-8 py-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">∞</div>
                <div className="text-sm text-gray-500">Scans Left (dev)</div>
              </div>
              <div className="h-8 w-px bg-gray-200"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {uploadCount}
                </div>
                <div className="text-sm text-gray-500">Completed</div>
              </div>
              <div className="h-8 w-px bg-gray-200"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">AI+</div>
                <div className="text-sm text-gray-500">Dev Mode</div>
              </div>
            </div>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                if (currentFile) handleFileUpload(currentFile);
              }}
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Target Role
                </label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g. Software Engineer"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Description
                </label>
                <textarea
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description here"
                  rows={4}
                  required
                />
              </div>
              <div>
                <ResumeUpload
                  onFileUpload={(file) => setCurrentFile(file)}
                  isLoading={isLoading}
                  isPremium={true}
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
              <button
                type="submit"
                className="w-full mt-2 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                disabled={isLoading || !currentFile}
              >
                {isLoading
                  ? "Analyzing..."
                  : "Analyze & Review Candidate Resume"}
              </button>
            </form>
          </div>
        </div>
      </div>
      {resumeData && (
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden mb-10">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-8 py-6 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-green-600"
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
              Candidate Analysis Results
            </h2>
            <p className="text-gray-600">
              Review the candidate's fit, strengths, and areas for growth. Use
              these insights to support your hiring decision.
            </p>
          </div>
          <div className="p-8 space-y-8">
            {fitStatus && (
              <div className="mb-6 p-6 rounded-xl bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 shadow">
                <div className="flex items-center mb-2">
                  <span className="inline-block px-3 py-1 rounded-full bg-blue-600 text-white text-sm font-semibold mr-3">
                    Fit Status: {fitStatus}
                  </span>
                  <span className="text-gray-500 text-sm">(AI Assessment)</span>
                </div>
                {reasoning && (
                  <div className="mt-2 text-gray-700 text-base">
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
              isPremium={true}
            />
            {roleRecommendations && roleRecommendations.length > 0 && (
              <div className="mb-6 p-6 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 shadow">
                <div className="font-semibold text-purple-700 mb-4 text-xl">
                  Recommended Roles:
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {roleRecommendations.map((role, idx) => {
                    if (typeof role === "string") {
                      return (
                        <div
                          key={idx}
                          className="bg-white border border-gray-200 rounded-xl shadow p-4 flex flex-col justify-between"
                        >
                          <div className="font-semibold text-lg text-gray-800">
                            {role}
                          </div>
                        </div>
                      );
                    } else if (typeof role === "object" && role !== null) {
                      return (
                        <div
                          key={idx}
                          className="bg-gradient-to-br from-purple-100 to-pink-100 border border-purple-200 rounded-xl shadow-md p-5 flex flex-col justify-between"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-semibold text-lg text-purple-700">
                              {role.roleName}
                            </div>
                            <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                              {role.matchPercentage}% match
                            </span>
                          </div>
                          {role.reasoning && (
                            <div className="text-sm text-gray-600 mb-2">
                              <span className="font-medium">Reasoning:</span>{" "}
                              {role.reasoning}
                            </div>
                          )}
                          {role.requiredSkills && (
                            <div className="mb-1">
                              <span className="font-medium text-gray-800">
                                Required Skills:
                              </span>
                              <span className="text-gray-700">
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
                                <span className="font-medium text-red-600">
                                  Missing Skills:
                                </span>
                                <span className="text-red-500">
                                  {" "}
                                  {role.missingSkills.join(", ")}
                                </span>
                              </div>
                            )}
                          {role.careerLevel && (
                            <div className="mb-1">
                              <span className="font-medium text-gray-800">
                                Career Level:
                              </span>
                              <span className="text-gray-700">
                                {" "}
                                {role.careerLevel}
                              </span>
                            </div>
                          )}
                          {role.salaryRange && (
                            <div className="mb-1">
                              <span className="font-medium text-gray-800">
                                Salary Range:
                              </span>
                              <span className="text-gray-700">
                                {" "}
                                {role.salaryRange}
                              </span>
                            </div>
                          )}
                          {role.industryFit && (
                            <div className="mb-1">
                              <span className="font-medium text-gray-800">
                                Industry Fit:
                              </span>
                              <span className="text-gray-700">
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
      )}

      {questions.length > 0 && (
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden mb-10">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-8 py-6 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-purple-600"
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
              Premium Interview Questions
            </h2>
            <p className="text-gray-600">
              Personalized interview questions based on your resume and job
              requirements
            </p>
          </div>
          <div className="p-8">
            <GeneratedQuestions questions={questions} isPlan="pro" />
          </div>
        </div>
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
    </div>
  );
};

export default PremiumDashboard;
