import React from "react";
import { testimonials } from "@/data/testimonials";

const TestimonialsSection = () => {
  return (
    <section className="relative pt-6 pb-10 sm:pt-10 sm:pb-24 bg-slate-900">
      {/* Dark Background with Gradient */}
      <div className="absolute inset-0 bg-slate-900">
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-gradient-to-br from-indigo-500/10 to-blue-500/10"></div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-10 sm:mb-16">
          <h3 className="text-base font-semibold leading-7 text-indigo-400 uppercase tracking-wide">
            Success Stories
          </h3>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            See How JobPsych Transforms Careers & Hiring
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Real stories from job seekers and HR professionals who've
            experienced the power of our AI-driven solutions, including our
            revolutionary tools that help candidates ace interviews and
            recruiters find top talent.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <div className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-full shadow-lg border border-emerald-500/30 transition-all duration-300">
              Role Suggestions
            </div>

            <div className="inline-flex items-center px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-full shadow-lg border border-orange-500/30 transition-all duration-300">
              ATS Analyzer
            </div>
            <div className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-full shadow-lg border border-blue-500/30 transition-all duration-300">
              InterviewPrep AI
            </div>
            <div className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-full shadow-lg border border-purple-500/30 transition-all duration-300">
              HireDisk
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="relative bg-slate-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-700 hover:border-indigo-500/50"
              >
                <div className="absolute top-0 right-0 -mt-4 mr-4 px-4 py-1 bg-indigo-600 rounded-full text-white text-sm font-semibold border border-indigo-500/30">
                  {testimonial.category}
                </div>

                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 bg-indigo-500 rounded-full opacity-30 blur-sm"></div>
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="relative w-16 h-16 rounded-full object-cover border-2 border-indigo-500/30"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-300">{testimonial.role}</p>
                    <p className="text-sm text-indigo-400">
                      {testimonial.company}
                    </p>
                  </div>
                </div>

                <blockquote className="text-gray-300 mb-6">
                  "{testimonial.quote}"
                </blockquote>

                <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-700">
                  <div className="bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
                    <span className="text-emerald-400 text-sm font-medium">
                      {testimonial.result}
                    </span>
                  </div>
                  <div className="bg-indigo-500/20 px-3 py-1 rounded-full border border-indigo-500/30">
                    <span className="text-indigo-400 text-sm font-medium">
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
