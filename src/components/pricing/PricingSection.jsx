import React from "react";
import { enhancedPlans } from "../../data/enhancePlan";

const PricingSection = ({ pricingRef, handlePlanSelection }) => {
  return (
    <section
      id="pricing"
      ref={pricingRef}
      className="mt-0 pt-0 pb-16 sm:pt-8 sm:pb-24 bg-gradient-to-br from-indigo-50 via-white to-purple-50"
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600 uppercase tracking-wide">
            Flexible Plans
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Choose the Perfect Plan for Your Team
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Choose Role Suggestions for free career guidance, try InterviewPrep
            AI for interview practice, or upgrade to HireDisk Pro for advanced
            AI-powered hiring intelligence and unlimited features.
          </p>
        </div>
        <div className="mx-auto mt-10 sm:mt-20 grid max-w-6xl grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {enhancedPlans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-3xl p-6 sm:p-8 shadow-2xl ring-1 ring-gray-200 transform transition-all duration-500 hover:scale-105 hover:shadow-3xl ${
                plan.popular
                  ? "bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white scale-105 border-2 border-yellow-400"
                  : "bg-white hover:bg-gradient-to-br hover:from-gray-50 hover:to-indigo-50 border border-indigo-100"
              }`}
              style={{
                animationDelay: `${index * 200}ms`,
                animation: "fadeInUp 0.8s ease-out forwards",
              }}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-0 right-0 mx-auto w-40 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2 text-center text-sm font-bold text-white shadow-lg">
                  {plan.highlight}
                </div>
              )}
              <div className="flex items-center space-x-3 mb-4">
                <div
                  className={`p-3 rounded-full shadow ${
                    plan.popular ? "bg-white/30" : "bg-indigo-100"
                  }`}
                >
                  <span className="text-2xl">
                    {plan.name === "Role Suggestions"
                      ? "✅"
                      : plan.name === "InterviewPrep AI"
                      ? "🎯"
                      : "🔒"}
                  </span>
                </div>
                <h3
                  className={`text-2xl font-bold tracking-wide ${
                    plan.popular
                      ? "text-yellow-200 drop-shadow"
                      : "text-gray-900"
                  }`}
                >
                  {plan.name}
                </h3>
              </div>
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span
                    className={`text-5xl font-extrabold tracking-tight ${
                      plan.popular ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {typeof plan.price.monthly === "number"
                      ? `$${plan.price.monthly}`
                      : plan.price.monthly}
                  </span>
                  {typeof plan.price.monthly === "number" && (
                    <span
                      className={`ml-1 text-xl font-semibold ${
                        plan.popular ? "text-white/80" : "text-gray-500"
                      }`}
                    >
                      /month
                    </span>
                  )}
                </div>
                <p
                  className={`mt-4 text-lg ${
                    plan.popular ? "text-white/90" : "text-gray-600"
                  }`}
                >
                  {plan.description}
                </p>
              </div>
              <button
                onClick={() => handlePlanSelection(plan.name.toLowerCase())}
                className={`mb-8 w-full rounded-xl px-6 py-4 text-center text-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer border-none ${
                  plan.popular
                    ? "bg-yellow-400 text-indigo-900 hover:bg-yellow-300 border border-yellow-500"
                    : plan.buttonStyle
                }`}
                style={{ letterSpacing: "0.03em" }}
              >
                {plan.buttonText}
              </button>
              <ul className="space-y-4 flex-1">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start space-x-3">
                    <div
                      className={`flex-shrink-0 mt-1 p-1 rounded-full ${
                        plan.popular ? "bg-white/20" : "bg-indigo-100"
                      }`}
                    >
                      <svg
                        className={`h-4 w-4 ${
                          plan.popular ? "text-white" : "text-indigo-600"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span
                      className={`text-base ${
                        plan.popular ? "text-white/90" : "text-gray-600"
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              {plan.name === "Role Suggestions" && (
                <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">✅</span>
                    <span className="text-sm font-semibold text-blue-800">
                      Perfect for Job Seekers
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-blue-700">
                    Get unlimited career guidance and role recommendations -
                    completely free!
                  </p>
                </div>
              )}
              {plan.name === "HireDisk" && !plan.popular && (
                <div className="mt-6 p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">🔒</span>
                    <span className="text-sm font-semibold text-indigo-800">
                      For HR Teams & Recruiters
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-indigo-700">
                    Advanced AI hiring intelligence with interview questions and
                    candidate insights.
                  </p>
                </div>
              )}
              {plan.name === "InterviewPrep AI" && (
                <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">🎯</span>
                    <span className="text-sm font-semibold text-blue-800">
                      Practice Makes Perfect
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-blue-700">
                    Practice real interview questions with AI feedback and
                    improve your interview skills.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>{" "}
      </div>
    </section>
  );
};

export default PricingSection;
