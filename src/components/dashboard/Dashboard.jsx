import React, { useState, useEffect } from "react";
import { useUser, SignedIn, SignedOut } from "@clerk/clerk-react";
import { formatErrorMessage, getErrorCategory } from "../../utils/errorHandler";
import { API_ENDPOINTS } from "../../utils/api";
import { generalTips } from "../../data/candidateTips";
import ResumeUpload from "../resume/ResumeUpload";
import NavigationButton from "../buttons/NavigationButton";
import ResumeDetailsWrapper from "../resume/ResumeDetailsWrapper";

const Dashboard = () => {
  const { user } = useUser();
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

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage("");
        setAlertType("");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  const redirectToPayment = (planId = "pro") => {
    localStorage.setItem("selectedPlan", planId);
    window.location.href = `/payment?plan=${planId}`;
  };

  useEffect(() => {
    const handleOpenPricingModal = (_event) => {
      redirectToPayment();
    };

    window.addEventListener("open-pricing-modal", handleOpenPricingModal);

    return () => {
      window.removeEventListener("open-pricing-modal", handleOpenPricingModal);
    };
  }, []);

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

      const response = await fetch(API_ENDPOINTS.ANALYZE_RESUME, {
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
    <div className="relative min-h-screen flex flex-col bg-blue-50 overflow-x-hidden">
      <header className="sticky top-0 z-30 w-full bg-white/70 backdrop-blur-xl border-b border-blue-200 shadow-lg">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <div className="flex items-center min-w-0 flex-shrink-0">
            <NavigationButton
              to="/"
              className="inline-flex items-center gap-2 bg-blue-600 px-4 py-2 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
              aria-label="Go to Home Dashboard"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Home</span>
            </NavigationButton>
          </div>
          <div className="flex-1 flex justify-center items-center"></div>
          <div className="flex items-center gap-4 min-w-0 flex-shrink-0">
            <span className="hidden md:inline px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-bold tracking-wide shadow border border-blue-200 animate-fade-in">
              AI-Powered Resume Screening
            </span>
            {user && user.imageUrl && (
              <img
                src={user.imageUrl}
                alt="Profile"
                className="h-12 w-12 rounded-full border-4 border-emerald-300 shadow-lg object-cover transition-transform duration-300 hover:scale-105"
              />
            )}
          </div>
        </div>
      </header>

      <div
        className="absolute top-0 left-0 w-80 h-80 bg-blue-300/30 rounded-full blur-3xl -z-10"
        style={{ filter: "blur(120px)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl -z-10"
        style={{ filter: "blur(120px)" }}
      />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="bg-blue-600 rounded-3xl p-8 mb-20 shadow-2xl text-white relative overflow-hidden">
            <div className="absolute right-0 top-0 w-40 h-40 bg-yellow-200/40 rounded-full blur-2xl opacity-60 -z-10" />
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight flex items-center gap-3 drop-shadow-lg">
                  Resume Analysis Dashboard
                </h1>
                <p className="text-blue-100 mt-3 text-lg md:text-xl font-medium max-w-2xl">
                  Upload your resume and get{" "}
                  <span className="font-bold text-yellow-200">AI-powered</span>{" "}
                  role-specific analysis and career recommendations.
                </p>
              </div>
            </div>
          </div>

          {/* Candidate Tips Section */}
          <div className="bg-white/90 p-8 rounded-3xl shadow-xl border border-gray-100 mb-10 hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold mb-6 text-indigo-700 border-b pb-2 flex items-center gap-2">
              Resume Optimization Tips
            </h2>
            <p className="text-gray-600 mb-6 text-base">
              Follow these expert tips to make your resume stand out and
              increase your chances of getting noticed by recruiters.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {generalTips.map((tip, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white/90 p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300 animate-fade-in-up">
            {resumeData ? (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-emerald-700 border-b pb-2 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-600"
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
                  Resume Analysis Results
                </h2>
                <ResumeDetailsWrapper
                  resumeData={resumeData}
                  isLoading={isLoading}
                />
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="mb-4">
                  <svg
                    className="mx-auto h-24 w-24 text-emerald-400 drop-shadow-lg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="mt-4 text-3xl font-extrabold text-emerald-700">
                  Ready to Discover Your True Potential?
                </h3>
                <p className="mt-4 text-lg text-gray-700 max-w-xl mx-auto">
                  Upload your resume below and let our advanced AI instantly
                  analyze your experience, skills, and strengths. Get
                  personalized career recommendations , role matches, and
                  actionable insights completely free!
                </p>
                <ul className="mt-6 space-y-3 max-w-lg mx-auto text-left text-base text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500 text-xl">✔️</span>
                    Instantly see which roles fit your background best
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500 text-xl">✔️</span>
                    Uncover your top skills and areas to improve
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500 text-xl">✔️</span>
                    Receive expert tips to boost your job search
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500 text-xl">✔️</span>
                    100% private & secure your data is never shared
                  </li>
                </ul>
              </div>
            )}
          </div>
          {/* Upload Resume Section */}

          {roleRecommendations.length > 0 && (
            <div className="mt-10 bg-emerald-50 p-8 rounded-3xl shadow-2xl border border-emerald-100 hover:shadow-emerald-200 transition-shadow duration-300">
              <h2 className="text-3xl font-extrabold mb-8 text-emerald-700 border-b pb-3 flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-emerald-600"
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
                Role Recommendations
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {roleRecommendations.map((role, index) => {
                  const isBestMatch = index === 0;
                  const roleIcon = (
                    <svg
                      className="h-10 w-10 text-emerald-300 drop-shadow-lg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 11c0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3-3-1.343-3-3zm-6 8v-1a4 4 0 014-4h4a4 4 0 014 4v1"
                      />
                    </svg>
                  );
                  return (
                    <div
                      key={index}
                      className={`relative bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-emerald-200 shadow-xl hover:shadow-emerald-400 hover:border-emerald-400 transition-all duration-300 group overflow-hidden ${
                        isBestMatch
                          ? "ring-2 ring-emerald-400 scale-[1.04] shadow-2xl"
                          : ""
                      }`}
                      style={{
                        background: isBestMatch ? "#d1fae5" : "#f0fdfa",
                        boxShadow: isBestMatch
                          ? "0 8px 32px 0 rgba(16,185,129,0.25), 0 1.5px 8px 0 #a7f3d0"
                          : undefined,
                      }}
                    >
                      \{" "}
                      {isBestMatch && (
                        <span className="absolute -top-4 -right-4 animate-ping-slow z-10">
                          <svg
                            className="h-16 w-16 text-yellow-200 opacity-60"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.07-7.07l-1.42 1.42M6.34 17.66l-1.42 1.42m12.02 0l-1.42-1.42M6.34 6.34L4.92 4.92"
                            />
                          </svg>
                        </span>
                      )}
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-10 opacity-80 group-hover:scale-110 transition-transform duration-300">
                        {roleIcon}
                      </div>
                      <div className="absolute top-6 right-6 z-10">
                        <div className="relative flex items-center justify-center">
                          <svg
                            className="h-16 w-16 rotate-[-90deg]"
                            viewBox="0 0 40 40"
                          >
                            <defs>
                              <linearGradient
                                id={`matchGradient${index}`}
                                x1="0"
                                y1="0"
                                x2="1"
                                y2="1"
                              >
                                <stop offset="0%" stopColor="#34d399" />
                                <stop offset="100%" stopColor="#34d399" />
                              </linearGradient>
                            </defs>
                            <circle
                              cx="20"
                              cy="20"
                              r="18"
                              fill="none"
                              stroke="#e5e7eb"
                              strokeWidth="4"
                            />
                            <circle
                              cx="20"
                              cy="20"
                              r="18"
                              fill="none"
                              stroke={`url(#matchGradient${index})`}
                              strokeWidth="4"
                              strokeDasharray={113}
                              strokeDashoffset={
                                113 -
                                (113 * Math.round(role.matchPercentage)) / 100
                              }
                              strokeLinecap="round"
                              style={{
                                transition:
                                  "stroke-dashoffset 0.7s cubic-bezier(.4,2,.6,1)",
                              }}
                            />
                          </svg>
                          <span className="absolute text-xl font-extrabold text-emerald-700 drop-shadow">
                            {Math.round(role.matchPercentage)}%
                          </span>
                        </div>
                      </div>
                      {isBestMatch && (
                        <span className="absolute top-4 left-4 bg-emerald-400 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg animate-pulse z-20">
                          Best Match
                        </span>
                      )}
                      <div className="flex items-center gap-3 mb-4 mt-20 justify-center">
                        <span className="text-2xl font-extrabold text-emerald-800 group-hover:text-emerald-900 transition-all tracking-tight">
                          {role.roleName}
                        </span>
                      </div>
                      <div className="mb-5">
                        <div className="flex items-center gap-2 mb-1">
                          <svg
                            className="h-5 w-5 text-blue-400"
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
                          <span className="font-semibold text-blue-700">
                            Why this role?
                          </span>
                        </div>
                        <p className="text-gray-700 text-base min-h-[60px] italic bg-blue-50/60 rounded-lg px-4 py-2 shadow-sm">
                          {role.reasoning}
                        </p>
                      </div>
                      <div className="mb-8">
                        <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-1">
                          <svg
                            className="h-5 w-5 text-green-600"
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
                          Matching Skills
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {role.requiredSkills &&
                          role.requiredSkills.length > 0 ? (
                            role.requiredSkills.map((skill, skillIndex) => (
                              <span
                                key={skillIndex}
                                className="bg-green-100 text-green-900 text-xs px-3 py-1 rounded-full shadow-sm flex items-center gap-1 hover:bg-green-200 transition-all duration-200 cursor-default"
                              >
                                <svg
                                  className="h-4 w-4 text-green-400 mr-1"
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
                                <span
                                  className="truncate max-w-[120px] inline-block align-middle"
                                  style={{ verticalAlign: "middle" }}
                                >
                                  {skill.length > 24
                                    ? skill.slice(0, 22) + "…"
                                    : skill}
                                </span>
                                {skill.length > 24 && (
                                  <span className="absolute z-10 left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded px-2 py-1 shadow-lg whitespace-pre-line">
                                    {skill}
                                  </span>
                                )}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-400 italic">
                              No matching skills detected.
                            </span>
                          )}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-1">
                          <svg
                            className="h-5 w-5 text-orange-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          Skills to Develop
                          <span
                            className="ml-1"
                            title="These are the skills you should focus on to improve your fit for this role."
                          >
                            <svg
                              className="h-4 w-4 text-gray-400 inline-block"
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
                          </span>
                        </h4>
                        <div className="bg-orange-50/60 rounded-lg px-4 py-3 shadow-sm text-orange-900 text-sm max-w-full">
                          {role.missingSkills &&
                          role.missingSkills.length > 0 ? (
                            <ul className="list-disc pl-5 space-y-1">
                              {role.missingSkills.map((skill, skillIndex) => (
                                <li key={skillIndex} className="break-words">
                                  {skill}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <span className="text-gray-400 italic">
                              No major skill gaps detected!
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {renderSpecialError()}

          {alertMessage && (
            <div
              className={`fixed top-6 right-6 z-50 min-w-[260px] max-w-xs px-4 py-3 rounded-lg shadow-lg text-base flex items-center gap-3 font-semibold transition-all duration-300
                ${
                  alertType === "success"
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }
              `}
              role="alert"
            >
              {alertType === "success" ? (
                <svg
                  className="h-5 w-5 text-emerald-500"
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
                  className="h-5 w-5 text-red-500"
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
                className="ml-2 text-lg font-bold focus:outline-none text-gray-400 hover:text-gray-700"
                aria-label="Close alert"
              >
                &times;
              </button>
            </div>
          )}
        </div>
        <div className="bg-white/90 p-8 rounded-3xl shadow-xl border border-gray-100 mb-10 hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-2xl font-bold mb-6 text-indigo-700 border-b pb-2 flex items-center gap-2">
            Upload Your Resume For Analysis
          </h2>

          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            <div>
              <label
                htmlFor="targetRole"
                className="block text-base font-semibold text-indigo-700 mb-2"
              >
                Target Role (Optional)
              </label>
              <input
                id="targetRole"
                name="targetRole"
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g., Software Engineer, Data Scientist, Product Manager"
                className="w-full px-4 py-3 border border-indigo-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white text-gray-800 text-lg"
                disabled={isLoading}
                autoComplete="off"
              />
              <p className="mt-2 text-xs text-gray-500">
                Specify the role you're applying for to get targeted analysis
                and career recommendations
              </p>
            </div>

            <div>
              <label
                htmlFor="jobDescription"
                className="block text-base font-semibold text-indigo-700 mb-2"
              >
                Job Description (Optional)
              </label>
              <textarea
                id="jobDescription"
                name="jobDescription"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here for more accurate role fit analysis..."
                rows={4}
                className="w-full px-4 py-3 border border-indigo-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 resize-vertical bg-white text-gray-800 text-lg"
                disabled={isLoading}
                autoComplete="off"
              />
              <p className="mt-2 text-xs text-gray-500">
                Provide job requirements to get better skill gap analysis and
                recommendations
              </p>
            </div>
          </div>

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
      </main>
    </div>
  );
};

const ProtectedDashboard = () => {
  return (
    <>
      <SignedIn>
        <Dashboard />
      </SignedIn>
      <SignedOut>
        <Dashboard />
      </SignedOut>
    </>
  );
};

export default ProtectedDashboard;
