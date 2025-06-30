import React, { memo } from "react";
import { useDropzone } from "react-dropzone";

// Inline CloudArrowUpIcon to avoid external dependency issues
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

const ACCEPT_CONFIG = {
  "application/pdf": [".pdf"],
  "application/msword": [".doc"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
    ".docx",
  ],
};

// Define the component as a function declaration
function ResumeUploadComponent({ onFileUpload }) {
  // Define onDrop function without useCallback to avoid hook issues
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && onFileUpload) {
      onFileUpload(file);
    }
  };

  // Use dropzone hook inside the component body
  let dropzoneProps;
  try {
    const dropzone = useDropzone({
      onDrop,
      accept: ACCEPT_CONFIG,
      multiple: false,
    });
    dropzoneProps = dropzone;
  } catch (error) {
    console.warn("Dropzone hook failed, using fallback:", error);
    // Fallback when dropzone fails
    dropzoneProps = {
      getRootProps: () => ({
        onClick: () => {
          const input = document.createElement("input");
          input.type = "file";
          input.accept = ".pdf,.doc,.docx";
          input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) onDrop([file]);
          };
          input.click();
        },
      }),
      getInputProps: () => ({ style: { display: "none" } }),
      isDragActive: false,
    };
  }

  const { getRootProps, getInputProps, isDragActive } = dropzoneProps;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Review Candidate Resume
      </h2>
      <div
        {...getRootProps()}
        className={`p-10 border-2 border-dashed rounded-xl text-center cursor-pointer transition-all duration-300 transform hover:scale-[1.02]
          ${
            isDragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-blue-400 hover:bg-blue-50/30"
          }`}
      >
        <input {...getInputProps()} />
        <CloudArrowUpIcon
          className={`mx-auto h-12 w-12 transition-colors duration-300 ${
            isDragActive ? "text-blue-500" : "text-gray-400"
          }`}
        />
        <p
          className={`mt-4 text-base transition-colors duration-300 ${
            isDragActive ? "text-blue-600" : "text-gray-600"
          }`}
        >
          {isDragActive
            ? "Drop candidate's resume here..."
            : "Upload candidate's resume (drag & drop or click)"}
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

// Create memoized version of the component
const ResumeUpload = memo(ResumeUploadComponent);

// Add display name for better debugging
ResumeUpload.displayName = "ResumeUpload";

export default ResumeUpload;
