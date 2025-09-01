import React from "react";
import { faqs } from "../../data/faqs";
import FAQDropdown from "../FAQDropdown";

const FAQSection = () => {
  return (
    <section className="mt-10 sm:mt-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
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
