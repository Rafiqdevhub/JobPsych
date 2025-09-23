import React, { useState, useRef } from "react";

const CloudArrowUpIcon = ({ className, ...props }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
    />
  </svg>
);

const DocumentIcon = ({ className, ...props }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
    />
  </svg>
);

function ResumeUpload({
  onFileUpload,
  isLoading = false,
  onError,
  isPremium = false,
  onResumeUploaded,
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (file) => {
    if (!file) return;

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

    if (allowedTypes.includes(file.type) || isValidExtension) {
      setSelectedFile(file);
      if (onFileUpload) {
        onFileUpload(file);
      }
      if (isPremium && onResumeUploaded) {
        onResumeUploaded();
      }
    } else {
      if (onError) {
        onError({
          message: `Invalid file type: ${file.type}. Please upload a PDF or Word document.`,
          type: "warning",
          category: "file",
        });
      }
      console.warn(
        "Invalid file type:",
        file.type,
        "Extension:",
        fileExtension
      );
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (isLoading) return;

    const files = e.dataTransfer?.files;
    if (files?.[0]) {
      handleFileChange(files[0]);
    }
  };

  const handleInputChange = (e) => {
    if (isLoading) return;

    const file = e.target?.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const openFileDialog = () => {
    if (!isLoading && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-slate-700/80 p-6 rounded-xl shadow-lg border border-slate-600">
      <h2 className="text-2xl font-semibold text-white mb-6 text-center">
        Review Candidate Resume
      </h2>

      {isPremium && (
        <div className="mb-4 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30 rounded-lg p-3">
          <div className="flex items-center justify-center space-x-2">
            <svg
              className="h-5 w-5 text-amber-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-medium text-amber-300">
              Premium Analysis Enabled
            </span>
          </div>
        </div>
      )}

      <div
        className={`relative p-10 border-2 border-dashed rounded-xl text-center cursor-pointer ${
          isLoading
            ? "bg-slate-600/30 border-slate-500 cursor-not-allowed"
            : selectedFile
            ? "bg-indigo-500/20 border-indigo-400"
            : "border-slate-500 hover:border-indigo-400 hover:bg-indigo-500/10"
        }`}
        onClick={openFileDialog}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={(e) => e.preventDefault()}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleInputChange}
          accept=".pdf,.doc,.docx"
          disabled={isLoading}
        />

        {isLoading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-400"></div>
            <p className="mt-4 text-base text-indigo-300">
              Processing resume...
            </p>
          </div>
        ) : selectedFile ? (
          <>
            <DocumentIcon className="mx-auto h-12 w-12 text-indigo-400" />
            <p className="mt-4 text-base font-medium text-indigo-300">
              {selectedFile.name}
            </p>
            <p className="mt-2 text-xs text-slate-400">
              {(selectedFile.size / 1024).toFixed(1)} KB
            </p>
          </>
        ) : (
          <>
            <CloudArrowUpIcon className="mx-auto h-12 w-12 text-slate-400" />
            <p className="mt-4 text-base text-slate-300">
              Upload candidate's resume (drag & drop or click here)
            </p>
            <p className="mt-2 text-xs text-slate-400">
              Accepts PDF, DOC, and DOCX formats
            </p>
          </>
        )}
      </div>

      <div className="mt-4 text-center space-y-2">
        <p className="text-xs text-slate-400">
          Our AI will analyze the resume and help you prepare for the interview
        </p>
        <p className="text-xs text-indigo-400">
          Get instant insights and tailored interview questions
        </p>
      </div>
    </div>
  );
}

export default ResumeUpload;
