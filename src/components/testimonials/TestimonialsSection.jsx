import React from "react";
import { testimonials } from "../../data/testimonials";

const TestimonialsSection = () => {
  return (
    <section className="mt-8 sm:mt-15 bg-indigo-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-10 sm:mb-16">
          <h3 className="text-base font-semibold leading-7 text-indigo-600 uppercase tracking-wide">
            Success Stories
          </h3>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            See How JobPsych Transforms Careers & Hiring
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Real stories from job seekers and HR professionals who've
            experienced the power of our AI-driven solutions, including our
            revolutionary
            <span className="font-semibold text-indigo-600">
              {" "}
              InterviewPrep AI
            </span>{" "}
            that helps candidates ace interviews and recruiters find top talent.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <div className="inline-flex items-center px-4 py-2 bg-emerald-500 text-white text-sm font-medium rounded-full shadow-lg">
              Role Suggestions
            </div>
            <div className="inline-flex items-center px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-full shadow-lg">
              InterviewPrep AI
            </div>
            <div className="inline-flex items-center px-4 py-2 bg-purple-500 text-white text-sm font-medium rounded-full shadow-lg">
              HireDisk for Hiring
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="absolute top-0 right-0 -mt-4 mr-4 px-4 py-1 bg-indigo-500 rounded-full text-white text-sm font-semibold">
                  {testimonial.category}
                </div>

                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 bg-indigo-500 rounded-full opacity-20 blur-sm"></div>
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
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
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
    </section>
  );
};

export default TestimonialsSection;
