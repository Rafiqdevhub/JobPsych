import React from "react";
import { faqs } from "@data/faqs";
import FAQDropdown from "@components/faq/FAQDropdown";

const FAQSection = () => {
  return (
    <section className="relative pt-6 pb-10 sm:pt-10 sm:pb-24 bg-slate-900">
      <div className="absolute inset-0 bg-slate-900">
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-gradient-to-br from-indigo-500/10 to-blue-500/10"></div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-10 sm:mb-16">
          <div className="group inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 border border-indigo-400/50 shadow-2xl hover:shadow-indigo-500/25 text-white text-sm font-medium mb-8 transition-all duration-500 hover:scale-110 hover:border-indigo-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-blue-500/20 animate-pulse"></div>
            <div className="relative z-10 flex items-center">
              <div className="w-2 h-2 bg-cyan-300 rounded-full mr-3 animate-bounce"></div>
              <span className="bg-gradient-to-r from-white via-cyan-200 to-indigo-200 bg-clip-text text-transparent font-bold tracking-wide">
                Common Questions
              </span>
              <div
                className="w-2 h-2 bg-cyan-300 rounded-full ml-3 animate-bounce"
                style={{ animationDelay: "0.3s" }}
              ></div>
            </div>
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Everything you need to know about
            <br />
            <span className="text-indigo-400">
              AI-Based Career Readiness and Interview Preparation
            </span>
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Get answers to common questions about our comprehensive system:
            <br />
            Career Path Exploration, Professional Document Analysis, and
            AI-Assisted Interview Practice.
          </p>
        </div>
        <div className="mx-auto max-w-4xl">
          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <FAQDropdown
                key={index}
                question={faq.question}
                answer={faq.answer}
                type={faq.type || "general"}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
