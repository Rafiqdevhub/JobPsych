import React from "react";
import {
  ChatBubbleLeftIcon,
  CheckCircleIcon,
  DocumentTextIcon,
  UserGroupIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";

function GeneratedQuestions({ questions }) {
  const toggleQuestion = (index) => {
    const element = document.querySelector(`[data-question-index="${index}"]`);
    if (element) {
      element.classList.toggle("bg-blue-50");
      element.classList.toggle("border-blue-200");
      const checkbox = element.querySelector('input[type="checkbox"]');
      if (checkbox) {
        checkbox.checked = !checkbox.checked;
      }
    }
  };

  if (!questions || questions.length === 0)
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
        <p className="text-gray-500 text-center">
          Upload a resume to generate interview questions.
        </p>
      </div>
    );

  const categories = {
    technical: {
      icon: DocumentTextIcon,
      title: "Technical Competency",
      description: "Questions focused on technical skills and knowledge",
      questions: questions.filter((q) => q.type === "technical"),
    },
    behavioral: {
      icon: UserGroupIcon,
      title: "Behavioral & Cultural Fit",
      description: "Questions about work style and team collaboration",
      questions: questions.filter((q) => q.type === "behavioral"),
    },
    experience: {
      icon: LightBulbIcon,
      title: "Experience Validation",
      description: "Questions based on past work experience",
      questions: questions.filter((q) => q.type === "experience"),
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8 transform transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <ChatBubbleLeftIcon className="h-6 w-6 text-blue-500 mr-2" />
          <h2 className="text-2xl font-semibold text-gray-800">
            Interview Guide
          </h2>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">
            Click questions to select them
          </span>
          <button
            onClick={() => {
              document
                .querySelectorAll("[data-question-index]")
                .forEach((el) => {
                  el.classList.remove("bg-blue-50", "border-blue-200");
                  const checkbox = el.querySelector('input[type="checkbox"]');
                  if (checkbox) checkbox.checked = false;
                });
            }}
            className="text-sm text-blue-500 hover:text-blue-600 transition-colors duration-200"
          >
            Clear selection
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {Object.entries(categories).map(([key, category]) => {
          const CategoryIcon = category.icon;
          return (
            category.questions.length > 0 && (
              <div key={key} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <CategoryIcon className="h-5 w-5 text-blue-500 mr-2" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">
                      {category.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {category.description}
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  {category.questions.map((question, index) => (
                    <div
                      key={index}
                      data-question-index={index}
                      onClick={() => toggleQuestion(index)}
                      className="p-4 rounded-lg transition-all duration-200 cursor-pointer bg-white hover:bg-gray-100 border-2 border-transparent"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          <input
                            type="checkbox"
                            className="h-5 w-5 text-blue-500 rounded focus:ring-blue-500"
                            onChange={() => {}}
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-700">
                            {question.question}
                          </p>
                          {question.context && (
                            <p className="mt-2 text-sm text-gray-500">
                              {question.context}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-600">
          Pro Tip: Select questions to create your interview script. These
          questions are automatically generated and tailored based on the
          candidate's resume.
        </p>
      </div>
    </div>
  );
}

export default GeneratedQuestions;
