import React from "react";

const SimpleResumeUpload = ({ onFileUpload }) => {
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && onFileUpload) {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      const allowedExtensions = [".pdf", ".doc", ".docx"];
      const fileExtension = file.name
        .toLowerCase()
        .substring(file.name.lastIndexOf("."));

      if (
        allowedTypes.includes(file.type) ||
        allowedExtensions.includes(fileExtension)
      ) {
        onFileUpload(file);
      } else {
        console.warn("Invalid file type uploaded:", file.type, fileExtension);
      }
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && onFileUpload) {
      handleFileSelect({ target: { files: [file] } });
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Review Candidate Resume
      </h2>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="p-10 border-2 border-dashed rounded-xl text-center cursor-pointer transition-all duration-300 transform hover:scale-[1.02] border-gray-300 hover:border-blue-400 hover:bg-blue-50/30"
      >
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileSelect}
          className="hidden"
          id="resume-upload"
        />
        <label htmlFor="resume-upload" className="cursor-pointer">
          <svg
            className="mx-auto h-12 w-12 text-gray-400 transition-colors duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
            />
          </svg>
          <p className="mt-4 text-base text-gray-600 transition-colors duration-300">
            Upload candidate's resume (drag & drop or click)
          </p>
          <p className="mt-2 text-xs text-gray-500">
            Accepts PDF, DOC, and DOCX formats
          </p>
        </label>
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
};

export default SimpleResumeUpload;
