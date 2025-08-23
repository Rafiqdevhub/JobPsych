import React, { useState } from "react";
import hrCategories from "../data/questions";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

const StandardQuestions = () => {
  const [openHrCategory, setOpenHrCategory] = useState(null);

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden mb-10">
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-8 py-6 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2 text-gray-600"
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
          Standard HR Interview Questions
        </h2>
        <p className="text-gray-600">
          Common HR questions grouped by category. These help assess your
          problem solving, teamwork, and workplace skills.
        </p>
      </div>
      <div className="p-8 space-y-6">
        {hrCategories.map((cat, catIdx) => {
          const isOpen = openHrCategory === catIdx;
          return (
            <div key={catIdx} className="mb-4">
              <button
                className={`w-full flex items-center justify-between px-6 py-4 rounded-xl shadow border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 transition-all duration-200 focus:outline-none hover:bg-purple-100/60 hover:shadow-lg cursor-pointer ${
                  isOpen ? "ring-2 ring-purple-400" : ""
                }`}
                onClick={() => setOpenHrCategory(isOpen ? null : catIdx)}
                aria-expanded={isOpen}
              >
                <span className="text-lg font-semibold text-purple-700">
                  {cat.category}
                </span>
                <ChevronDownIcon
                  className={`h-6 w-6 text-purple-500 ml-2 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "max-h-[1000px] opacity-100 mt-2"
                    : "max-h-0 opacity-0"
                }`}
                style={{
                  transitionProperty: "max-height, opacity",
                }}
              >
                {isOpen && (
                  <ul className="space-y-4">
                    {cat.items.map((q, idx) => (
                      <li
                        key={idx}
                        className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
                      >
                        <div className="font-medium text-gray-900">
                          {q.question}
                        </div>
                        {q.insight && (
                          <div className="text-sm text-gray-500 mt-1">
                            {q.insight}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StandardQuestions;
