import React from "react";
import { enhancedPlans } from "../../data/enhancePlan";
import { faqs } from "../../data/faqs";
import { testimonials } from "../../data/testimonials";
import FAQDropdown from "../FAQDropdown";

const PricingSection = ({
  pricingRef,
  scrollToContact,
  handlePlanSelection,
}) => {
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
            Choose Role Suggestions for free career guidance or upgrade to
            HireDisk Pro for advanced AI-powered hiring intelligence and
            unlimited features.
          </p>
        </div>
        <div className="mx-auto mt-10 sm:mt-20 grid max-w-4xl grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3">
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
                    {plan.name === "Role Suggestions" ? "✅" : "🔒"}
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
            </div>
          ))}
          <div className="relative flex flex-col rounded-3xl p-6 sm:p-8 shadow-2xl ring-2 ring-yellow-400 bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 text-white scale-105">
            <div className="absolute -top-5 left-0 right-0 mx-auto w-40 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2 text-center text-sm font-bold text-white shadow-lg">
              Premium
            </div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 rounded-full bg-white/20">
                <span className="text-2xl">💎</span>
              </div>
              <h3 className="text-2xl font-bold text-white">Premium</h3>
            </div>
            <div className="mb-6">
              <div className="flex items-baseline">
                <span className="text-5xl font-extrabold tracking-tight text-white">
                  Custom
                </span>
              </div>
              <p className="mt-4 text-lg text-white/90">
                Enterprise-grade AI hiring solutions, custom integrations, and
                dedicated support. Contact us for pricing and access.
              </p>
            </div>
            <button
              onClick={scrollToContact}
              className="mb-8 w-full rounded-xl px-6 py-4 text-center text-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer border-none bg-yellow-400 text-red-700 hover:bg-yellow-300 border border-yellow-500"
              style={{ letterSpacing: "0.03em" }}
            >
              Contact Us
            </button>
            <ul className="space-y-4 flex-1">
              <li className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1 p-1 rounded-full bg-white/20">
                  <svg
                    className="h-4 w-4 text-white"
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
                <span className="text-base text-white/90">
                  Custom AI solutions
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1 p-1 rounded-full bg-white/20">
                  <svg
                    className="h-4 w-4 text-white"
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
                <span className="text-base text-white/90">
                  Dedicated support
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1 p-1 rounded-full bg-white/20">
                  <svg
                    className="h-4 w-4 text-white"
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
                <span className="text-base text-white/90">
                  Custom integrations
                </span>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-white/10 rounded-xl border border-white/20">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">💎</span>
                <span className="text-sm font-semibold text-white">
                  For Enterprises & Large Teams
                </span>
              </div>
              <p className="mt-2 text-sm text-white/80">
                Contact us for a tailored solution and pricing.
              </p>
            </div>
          </div>
        </div>{" "}
        {/* FAQ Section */}
        <div className="mt-10 sm:mt-20">
          <div className="mx-auto max-w-3xl text-center mb-8 sm:mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h3>
            <p className="text-lg text-gray-600">
              Everything you need to know about JobPsych and our pricing plans.
            </p>
          </div>
          <div className="mx-auto max-w-4xl">
            <div className="space-y-3 sm:space-y-4">
              {faqs.map((faq, index) => (
                <FAQDropdown
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </div>
        </div>
        {/* Testimonials Section */}
        <div className="mt-8 sm:mt-15">
          <div className="mx-auto max-w-3xl text-center mb-10 sm:mb-16">
            <h3 className="text-base font-semibold leading-7 text-indigo-600 uppercase tracking-wide">
              ⭐ Success Stories
            </h3>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              See How JobPsych Transforms Careers & Hiring
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Real stories from job seekers and HR professionals who've
              experienced the power of our AI-driven solutions.
            </p>
          </div>

          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  <div className="absolute top-0 right-0 -mt-4 mr-4 px-4 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full text-white text-sm font-semibold">
                    {testimonial.category}
                  </div>

                  <div className="flex items-center space-x-4 mb-6">
                    <div className="relative w-16 h-16">
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-20 blur-sm"></div>
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="relative w-16 h-16 rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {testimonial.role}
                      </p>
                      <p className="text-sm text-indigo-600">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>

                  <blockquote className="text-gray-700 mb-6">
                    "{testimonial.quote}"
                  </blockquote>

                  <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100">
                    <div className="bg-green-50 px-3 py-1 rounded-full">
                      <span className="text-green-700 text-sm font-medium">
                        {testimonial.result}
                      </span>
                    </div>
                    <div className="bg-indigo-50 px-3 py-1 rounded-full">
                      <span className="text-indigo-700 text-sm font-medium">
                        {testimonial.highlight}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
