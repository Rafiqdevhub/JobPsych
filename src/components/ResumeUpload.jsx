import React from "react";

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

function ResumeUpload({ onFileUpload }) {
  // Handle file drop
  const handleFileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer?.files;
    if (files && files[0] && onFileUpload) {
      const file = files[0];
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
      ];

      if (allowedTypes.includes(file.type)) {
        onFileUpload(file);
      } else {
        console.warn("Invalid file type:", file.type);
      }
    }
  };

  // Handle file input change
  const handleFileInput = (e) => {
    const file = e.target?.files?.[0];
    if (file && onFileUpload) {
      onFileUpload(file);
    }
  };

  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handle drag enter
  const handleDragEnter = (e) => {
    e.preventDefault();
  };

  // Handle click to open file dialog
  const handleClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf,.doc,.docx";
    input.onchange = handleFileInput;
    input.click();
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Review Candidate Resume
      </h2>
      <div
        onDrop={handleFileDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onClick={handleClick}
        className="p-10 border-2 border-dashed rounded-xl text-center cursor-pointer transition-all duration-300 transform hover:scale-[1.02] border-gray-300 hover:border-blue-400 hover:bg-blue-50/30"
      >
        <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400 transition-colors duration-300" />
        <p className="mt-4 text-base text-gray-600 transition-colors duration-300">
          Upload candidate's resume (drag & drop or click)
        </p>
        <p className="mt-2 text-xs text-gray-500">
          Accepts PDF, DOC, and DOCX formats
        </p>
      </div>
      <div className="mt-4 text-center space-y-2">
        <p className="text-xs text-gray-400">
          Our AI will analyze the resume and help you prepare for the interview
        </p>
        <p className="text-xs text-blue-500">
          Get instant insights and tailored interview questions
        </p>
      </div>
    </div>
  );
}

export default ResumeUpload;
