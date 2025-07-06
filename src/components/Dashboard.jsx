import React, { useState, useEffect } from "react";
import {
  useUser,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/clerk-react";
import ResumeUpload from "./ResumeUpload";
import ResumeDetailsWrapper from "./ResumeDetailsWrapper";
import GeneratedQuestions from "./GeneratedQuestions";
import Toast from "./Toast";
import NetworkError from "./NetworkError";
import LoadingError from "./LoadingError";
import RateLimitError from "./RateLimitError";
import PricingModal from "./PricingModal";
import NavigationButton from "./NavigationButton";
import {
  formatErrorMessage,
  getErrorCategory,
  shouldShowRetry,
  shouldShowReset,
} from "../utils/errorHandler";
import { API_ENDPOINTS } from "../utils/api";
import { shouldApplyRateLimits } from "../utils/env";

const Dashboard = () => {
  const { user } = useUser();
  const [resumeData, setResumeData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentFile, setCurrentFile] = useState(null);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [uploadCount, setUploadCount] = useState(0);

  const [error, setError] = useState({
    show: false,
    message: "",
    type: "error",
    category: null,
    originalError: null,
  });

  useEffect(() => {
    if (!user) {
      const storedCount = localStorage.getItem("resumeUploadCount");
      if (storedCount) {
        setUploadCount(parseInt(storedCount));
      }
    } else {
      setUploadCount(0);
    }
  }, [user]);

  useEffect(() => {
    if (!user && uploadCount >= 2 && shouldApplyRateLimits()) {
      const timer = setTimeout(() => {
        setShowPricingModal(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [uploadCount, user]);

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

        if (response.status === 429) {
          throw new Error(error.message || "Rate limit exceeded");
        } else {
          throw new Error(error.message || "Failed to analyze resume");
        }
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
      const questionsFromResponse = responseData.questions || [];

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

      // If questions are included in the response, set them as well
      if (questionsFromResponse && questionsFromResponse.length > 0) {
        setQuestions(questionsFromResponse);
      }

      // In development mode, still count uploads but don't enforce limits
      const newCount = uploadCount + 1;
      setUploadCount(newCount);
      localStorage.setItem("resumeUploadCount", newCount.toString());

      if (shouldApplyRateLimits()) {
        // Only show limit notifications in production mode
        if (newCount === 1) {
          setError({
            show: true,
            message:
              "You have 1 free resume upload remaining. Sign up for unlimited access.",
            type: "info",
            category: "limit",
            originalError: null,
          });
        } else if (newCount >= 2 && !user) {
          setError({
            show: true,
            message:
              "You've used all your free uploads. Please sign up to continue using JobPsych.",
            type: "warning",
            category: "limit",
            originalError: null,
          });

          setTimeout(() => {
            setShowPricingModal(true);
          }, 1500);
        }
      } else if (newCount > 0) {
        setError({
          show: true,
          message: `Development mode: Unlimited uploads (${newCount} so far)`,
          type: "info",
          category: "development",
          originalError: null,
        });
      }

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
            setResumeData(data);

            const newCount = uploadCount + 1;
            setUploadCount(newCount);
            localStorage.setItem("resumeUploadCount", newCount.toString());

            setIsLoading(false);
            return;
          }
        } catch (retryError) {
          console.error("Retry also failed:", retryError);
        }
      }

      const isRateLimit =
        error.message && error.message.toLowerCase().includes("rate limit");

      setError({
        show: true,
        message: formatErrorMessage(error),
        type: "error",
        category: isRateLimit ? "rate_limit" : errorCategory || "unknown",
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

        if (response.status === 429) {
          throw new Error(error.message || "Rate limit exceeded");
        } else {
          throw new Error(error.message || "Failed to generate questions");
        }
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

  const handleRetry = async () => {
    if (currentFile) {
      await handleFileUpload(currentFile);
    }
  };

  const handleUpgradeClick = () => {
    setShowPricingModal(true);
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
    } else if (error.category === "rate_limit") {
      return (
        <RateLimitError
          onUpgrade={handleUpgradeClick}
          onClose={handleErrorClose}
        />
      );
    } else if (error.category === "limit") {
      return (
        <Toast
          type={error.type}
          message={error.message}
          onClose={handleErrorClose}
        />
      );
    } else {
      return (
        <Toast
          type={error.type}
          message={error.message}
          onClose={handleErrorClose}
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
      {uploadCount >= 2 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.485 3.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 3.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                You've used all your free uploads. You will be redirected to
                sign up in a few seconds.{" "}
                <NavigationButton
                  to="/auth"
                  className="font-medium underline text-yellow-700 hover:text-yellow-600 bg-transparent border-0 p-0"
                >
                  Sign up now
                </NavigationButton>
              </p>
            </div>
          </div>
        </div>
      )}
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
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              JobPsych Dashboard
            </h1>
            {user && (
              <div className="mt-2 text-lg font-medium animate-fadeIn">
                Welcome,{" "}
                <span className="text-blue-200 font-semibold">
                  {user.fullName || "User"}
                </span>
                ! Ready to analyze the resume?
              </div>
            )}
          </div>
          {user && user.imageUrl && (
            <div className="mt-4 md:mt-0 bg-white p-1 rounded-full shadow-md transition-all duration-300 hover:shadow-lg hover:scale-110">
              <img
                src={user.imageUrl}
                alt={user.fullName || "User profile"}
                className="h-12 w-12 rounded-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6 hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2 text-blue-600"
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
              onGenerateQuestions={handleGenerateQuestions}
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
              analysis and personalized interview questions.
            </p>
          </div>
        )}
      </div>
      {questions.length > 0 && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-purple-600"
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
            Interview Questions
          </h2>
          <GeneratedQuestions questions={questions} />
        </div>
      )}
      = {error.show && renderErrorContent()}
      <PricingModal
        isOpen={showPricingModal}
        onClose={() => setShowPricingModal(false)}
      />
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
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export default ProtectedDashboard;
