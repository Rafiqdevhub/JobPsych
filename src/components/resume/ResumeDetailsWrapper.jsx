import React from "react";
import ResumeDetails from "./ResumeDetails";

const ResumeDetailsWrapper = ({ resumeData, isLoading }) => {
  if (!resumeData) {
    return (
      <div className="bg-slate-700/80 rounded-xl shadow-lg p-6 mt-8 border border-slate-600">
        <div className="flex items-center mb-6">
          <svg
            className="h-6 w-6 text-red-400 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h2 className="text-2xl font-semibold text-white">
            No Resume Data Available
          </h2>
        </div>
        <div className="bg-red-500/20 p-4 rounded-lg border border-red-500/30 mb-6">
          <p className="text-red-300">
            There was a problem retrieving resume analysis data.
          </p>
          <ul className="list-disc list-inside mt-2 text-red-300">
            <li>
              The server may have encountered an error processing the resume
            </li>
            <li>
              There might be connectivity issues with the analysis service
            </li>
            <li>The resume might not be in a parsable format</li>
          </ul>
          <p className="mt-4 text-red-300">
            Try uploading a different file or refreshing the page.
          </p>
        </div>
      </div>
    );
  }

  const normalizedResumeData = resumeData.resumeData || resumeData;

  const isValidStructure =
    typeof normalizedResumeData === "object" &&
    normalizedResumeData !== null &&
    (normalizedResumeData.personalInfo !== undefined ||
      normalizedResumeData.workExperience !== undefined ||
      normalizedResumeData.education !== undefined ||
      normalizedResumeData.skills !== undefined);

  if (!isValidStructure) {
    return (
      <div className="bg-slate-700/80 rounded-xl shadow-lg p-6 mt-8 border border-slate-600">
        <div className="flex items-center mb-6">
          <svg
            className="h-6 w-6 text-yellow-400 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h2 className="text-2xl font-semibold text-white">
            Resume Data Format Error
          </h2>
        </div>
        <div className="bg-yellow-500/20 p-4 rounded-lg border border-yellow-500/30 mb-6">
          <p className="text-yellow-300">
            The resume analysis data is in an unexpected format.
          </p>
          <p className="mt-2 text-yellow-300">
            Received data:{" "}
            {JSON.stringify(normalizedResumeData).substring(0, 200)}...
          </p>
          <p className="mt-4 text-yellow-300">
            This may be due to a change in the API response format or an issue
            with the backend service.
          </p>
        </div>
      </div>
    );
  }

  return (
    <ResumeDetails resumeData={normalizedResumeData} isLoading={isLoading} />
  );
};

export default ResumeDetailsWrapper;
