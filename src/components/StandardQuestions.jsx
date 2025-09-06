import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { StandardQuestionsCategories } from "@data/questions";

const StandardQuestions = () => {
  const [openHrCategory, setOpenHrCategory] = useState(null);

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden mb-10">
      <div className="bg-purple-50 px-8 py-6 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
          Standard HR Interview Questions
        </h2>
        <p className="text-gray-600">
          Common HR questions grouped by category. These help assess your
          problem solving, teamwork, and workplace skills.
        </p>
      </div>
      <div className="mt-6 mb-3 p-0">
        <div className="flex items-center bg-blue-100 rounded-xl border border-blue-200 shadow-sm px-6 py-5">
          <div className="flex-shrink-0 flex items-center justify-center mr-5"></div>
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-blue-800 mb-2">
              Tips for Using This Section
            </h4>
            <ul className="text-base text-blue-700 space-y-2">
              <li className="flex items-start">
                <span className="mr-2 text-blue-500">•</span>
                <span>
                  Click on category headers to expand and see questions
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-blue-500">•</span>
                <span>
                  Questions are designed to evaluate the candidate's soft skills
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="p-8 space-y-6">
        {StandardQuestionsCategories.map((cat, catIdx) => {
          const isOpen = openHrCategory === catIdx;
          return (
            <div key={catIdx} className="mb-6">
              <button
                className={`w-full flex items-center justify-between px-6 py-5 rounded-2xl shadow-lg border border-purple-200 bg-purple-100 transition-all duration-200 focus:outline-none hover:bg-purple-200/60 hover:shadow-2xl cursor-pointer ${
                  isOpen ? "ring-4 ring-purple-300 scale-[1.01]" : ""
                }`}
                onClick={() => setOpenHrCategory(isOpen ? null : catIdx)}
                aria-expanded={isOpen}
              >
                <span className="text-xl font-bold text-purple-700 flex items-center">
                  {cat.category}
                </span>
                <ChevronDownIcon
                  className={`h-7 w-7 text-purple-500 ml-2 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "max-h-[1000px] opacity-100 mt-4"
                    : "max-h-0 opacity-0"
                }`}
                style={{ transitionProperty: "max-height, opacity" }}
              >
                {isOpen && (
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {cat.items.map((q, idx) => (
                      <li
                        key={idx}
                        className="bg-purple-50 border border-purple-100 rounded-xl p-6 shadow-lg flex flex-col justify-between hover:shadow-2xl transition-all duration-200"
                      >
                        <div className="flex items-center mb-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-purple-400 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                          <span className="font-semibold text-gray-900 text-base">
                            {q.question}
                          </span>
                        </div>
                        {q.insight && (
                          <div className="flex items-center text-sm text-pink-600 mt-1 italic">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-yellow-500 mr-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 2a7 7 0 017 7c0 3.87-3.13 7-7 7s-7-3.13-7-7a7 7 0 017-7zm0 14v2m0 2h.01"
                              />
                            </svg>
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
