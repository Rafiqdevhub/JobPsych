import React, { useState } from "react";

const FAQDropdown = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100">
      <button
        className={`w-full flex items-center justify-between px-6 py-5 rounded-2xl focus:outline-none transition-all duration-200 cursor-pointer ${
          open ? "bg-indigo-50" : ""
        }`}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        <span className="text-lg font-semibold text-gray-900 text-left">
          {question}
        </span>
        <svg
          className={`h-6 w-6 text-indigo-500 ml-2 transform transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`transition-all duration-300 overflow-hidden ${
          open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ transitionProperty: "max-height, opacity" }}
      >
        {open && (
          <div className="px-6 pb-6 text-gray-600 leading-relaxed">
            {answer}
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQDropdown;
