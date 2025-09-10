import React from "react";
import { faqs } from "@data/faqs";
import FAQDropdown from "@components/faq/FAQDropdown";

const FAQSection = () => {
  return (
    <section className="pt-6 pb-10 sm:pt-10 sm:pb-24 bg-indigo-50">
      <div className="mx-auto max-w-7xl px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-6">
            Frequently Asked Questions
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to know about JobPsych
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Get answers to common questions about our four powerful tools: Role
            Suggestions, InterviewPrep AI, ATS Analyzer, and HireDisk.
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
