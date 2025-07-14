import React, { useState, useEffect } from "react";
import { useUser, SignedIn, SignedOut } from "@clerk/clerk-react";
import ResumeUpload from "./ResumeUpload";
import ResumeDetailsWrapper from "./ResumeDetailsWrapper";
import { useToast } from "./ToastManager";
import Toast from "./Toast";
import SimpleToast from "./SimpleToast";
import NetworkError from "./NetworkError";
import LoadingError from "./LoadingError";
import NavigationButton from "./NavigationButton";
import {
  formatErrorMessage,
  getErrorCategory,
  shouldShowRetry,
  shouldShowReset,
} from "../utils/errorHandler";
import { API_ENDPOINTS } from "../utils/api";

const Dashboard = () => {
  const { user } = useUser();
  const { showSuccess } = useToast();
  const [resumeData, setResumeData] = useState(null);
  const [roleRecommendations, setRoleRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentFile, setCurrentFile] = useState(null);
  const [targetRole, setTargetRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [error, setError] = useState({
    show: false,
    message: "",
    type: "error",
    category: null,
    originalError: null,
  });
  const [showSimpleToast, setShowSimpleToast] = useState(false);

  // Helper function to redirect to payment
  const redirectToPayment = (planId = "pro") => {
    localStorage.setItem("selectedPlan", planId);
    window.location.href = `/payment?plan=${planId}`;
  };

  // Listen for the custom event to open pricing modal
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
    setCurrentFile(file);
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

      // Add target role and job description if provided
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

      // Extract data from unified response
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
        // We'll still set the data and let the wrapper component handle displaying appropriate messages
      }

      setResumeData(resumeDataFromResponse);
      setRoleRecommendations(roleRecommendationsFromResponse);

      // Show success toast
      const successMessage = targetRole
        ? `Resume analyzed for ${targetRole} position! Scroll down to see your role fit analysis and recommendations.`
        : "Resume uploaded successfully! Scroll down to see the analysis of your resume.";

      showSuccess(successMessage);

      setIsLoading(false);
    } catch (error) {
      const errorCategory = getErrorCategory(error);

      if (errorCategory === "network") {
        try {
          const formData = new FormData();
          formData.append("file", file);

          const response = await fetch(API_ENDPOINTS.ANALYZE_RESUME, {
            method: "POST",
            body: formData,
            mode: "cors",
          });

          if (response.ok) {
            const data = await response.json();
            setResumeData(data.resumeData || data);
            setRoleRecommendations(data.roleRecommendations || []);

            setIsLoading(false);
            return;
          }
        } catch (retryError) {
          console.error("Retry also failed:", retryError);
        }
      }

      setError({
        show: true,
        message: formatErrorMessage(error),
        type: "error",
        category: errorCategory || "unknown",
        originalError: error,
      });

      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResumeData(null);
    setRoleRecommendations([]);
    setCurrentFile(null);
    setTargetRole("");
    setJobDescription("");
    setError({
      show: false,
      message: "",
      type: "error",
      category: null,
      originalError: null,
    });
  };

  const handleRetry = async () => {
    if (currentFile) {
      await handleFileUpload(currentFile);
    }
  };

  const handleErrorClose = () => {
    setError({ ...error, show: false });
  };

  const renderErrorContent = () => {
    if (error.category === "network") {
      return (
        <NetworkError
          onClose={handleErrorClose}
          onRetry={shouldShowRetry(error.category) ? handleRetry : null}
          onReset={shouldShowReset(error.category) ? handleReset : null}
        />
      );
    } else if (error.category === "loading") {
      return (
        <LoadingError
          onClose={handleErrorClose}
          onRetry={shouldShowRetry(error.category) ? handleRetry : null}
          onReset={shouldShowReset(error.category) ? handleReset : null}
        />
      );
    } else {
      // Use the enhanced Toast component for all other errors
      return (
        <Toast
          type={error.type}
          title={error.category === "limit" ? "Upload Limit" : "Error"}
          message={error.message}
          show={error.show}
          onClose={handleErrorClose}
          duration={error.category === "limit" ? 4000 : 6000}
          errorData={{
            errorType: error.category,
            errorCategory: error.category,
            originalError: error.originalError,
          }}
          actions={
            error.category === "limit"
              ? [
                  {
                    label: "Sign Up",
                    onClick: () => {
                      handleErrorClose();
                      redirectToPayment();
                    },
                    variant: "primary",
                  },
                ]
              : error.category === "file"
              ? [
                  {
                    label: "Try Again",
                    onClick: () => {
                      handleErrorClose();
                      // Reset the file input
                      const fileInput =
                        document.querySelector('input[type="file"]');
                      if (fileInput) fileInput.value = "";
                    },
                    variant: "primary",
                  },
                ]
              : [
                  {
                    label: "Retry",
                    onClick: () => {
                      handleErrorClose();
                      if (currentFile) {
                        handleFileUpload(currentFile);
                      }
                    },
                    variant: "primary",
                  },
                ]
          }
        />
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6 relative z-10">
        <NavigationButton
          to="/"
          className="inline-flex items-center gap-2 bg-blue-600 px-5 py-3 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          aria-label="Back to home page"
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
          <span>Back to Home</span>
        </NavigationButton>
      </div>
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg p-6 mb-8 shadow-lg text-white transform transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mr-3 text-yellow-300"
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
              Resume Analysis Dashboard
            </h1>
            <p className="text-blue-100 mt-2 text-lg">
              Upload your resume and get role-specific analysis and career
              recommendations
            </p>
          </div>
          {user && user.imageUrl && (
            <img
              src={user.imageUrl}
              alt="Profile"
              className="h-12 w-12 rounded-full border-2 border-white shadow-md mt-4 md:mt-0"
            />
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6 hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2 text-indigo-600"
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
          Upload the Resume of the Candidate
        </h2>

        {/* Target Role and Job Description Form */}
        <div className="mb-6 space-y-4 relative z-10">
          <div>
            <label
              htmlFor="targetRole"
              className="block text-sm font-medium text-gray-700 mb-2"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              disabled={isLoading}
              autoComplete="off"
            />
            <p className="mt-1 text-xs text-gray-500">
              Specify the role you're applying for to get targeted analysis and
              career recommendations
            </p>
          </div>

          <div>
            <label
              htmlFor="jobDescription"
              className="block text-sm font-medium text-gray-700 mb-2"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical bg-white"
              disabled={isLoading}
              autoComplete="off"
            />
            <p className="mt-1 text-xs text-gray-500">
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

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
        {resumeData ? (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-green-600"
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
          <div className="text-center py-12">
            <div className="animate-pulse">
              <svg
                className="mx-auto h-16 w-16 text-blue-400"
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
            <h3 className="mt-4 text-xl font-medium text-gray-900">
              No Resume Uploaded Yet
            </h3>
            <p className="mt-2 text-gray-500 max-w-md mx-auto">
              Upload your resume using the section above to get detailed
              analysis and career recommendations.
            </p>
          </div>
        )}
      </div>
      {roleRecommendations.length > 0 && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-emerald-600"
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
          <div className="space-y-4">
            {roleRecommendations.map((role, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-lg border border-emerald-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-emerald-800 mb-2 flex items-center">
                      <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2 py-1 rounded-full mr-2">
                        {Math.round(role.matchPercentage)}% Match
                      </span>
                      {role.roleName}
                    </h3>
                    <p className="text-gray-700 mb-3">{role.reasoning}</p>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                          <svg
                            className="h-4 w-4 mr-1 text-green-600"
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
                          Matching Skills (Required)
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {role.requiredSkills &&
                            role.requiredSkills.map((skill, skillIndex) => (
                              <span
                                key={skillIndex}
                                className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
                              >
                                {skill}
                              </span>
                            ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                          <svg
                            className="h-4 w-4 mr-1 text-orange-600"
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
                          Skills to Develop (Missing)
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {role.missingSkills &&
                            role.missingSkills.map((skill, skillIndex) => (
                              <span
                                key={skillIndex}
                                className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full"
                              >
                                {skill}
                              </span>
                            ))}
                        </div>
                      </div>
                    </div>

                    {/* Additional role information */}
                    {(role.careerLevel ||
                      role.salaryRange ||
                      role.industryFit) && (
                      <div className="mt-4 pt-3 border-t border-emerald-200">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {role.careerLevel && (
                            <div className="bg-blue-50 p-2 rounded-lg">
                              <h5 className="text-xs font-medium text-gray-600 mb-1">
                                Career Level
                              </h5>
                              <p className="text-sm font-semibold text-blue-800">
                                {role.careerLevel}
                              </p>
                            </div>
                          )}
                          {role.salaryRange && (
                            <div className="bg-green-50 p-2 rounded-lg">
                              <h5 className="text-xs font-medium text-gray-600 mb-1">
                                Salary Range
                              </h5>
                              <p className="text-sm font-semibold text-green-800">
                                {role.salaryRange}
                              </p>
                            </div>
                          )}
                          {role.industryFit && (
                            <div className="bg-purple-50 p-2 rounded-lg">
                              <h5 className="text-xs font-medium text-gray-600 mb-1">
                                Industry Fit
                              </h5>
                              <p className="text-sm font-semibold text-purple-800">
                                {role.industryFit}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {error.show && renderErrorContent()}
      {showSimpleToast && (
        <SimpleToast
          message="Simple toast notification"
          type="warning"
          onClose={() => setShowSimpleToast(false)}
        />
      )}
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
