import React, { useState, useEffect } from "react";
import { testimonials } from "@/data/testimonials";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);

  useEffect(() => {
    if (!autoScroll) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoScroll]);

  const handlePrev = () => {
    setAutoScroll(false);
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setAutoScroll(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handleDotClick = (index) => {
    setAutoScroll(false);
    setCurrentIndex(index);
  };
  return (
    <section className="relative pt-6 pb-10 sm:pt-10 sm:pb-24 bg-slate-900">
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
            See How Our AI-Based System Transforms
            <br />
            <span className="text-indigo-300">Career Readiness & Interview Success</span>
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Real stories from professionals who've transformed their careers using our comprehensive AI-Based Career Readiness and Interview Preparation System, featuring Career Path Exploration, Professional Document Analysis, and AI-Assisted Interview Practice.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <div className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-full shadow-lg border border-blue-500/30 transition-all duration-300">
              Career Path Exploration
            </div>

            <div className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-full shadow-lg border border-emerald-500/30 transition-all duration-300">
              Document Analysis
            </div>
            <div className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-full shadow-lg border border-purple-500/30 transition-all duration-300">
              Interview Practice
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl">
          <div className="relative">
            {/* Carousel Container */}
            <div className="relative overflow-hidden">
              <div className="flex transition-transform duration-500 ease-out">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className={`w-full flex-shrink-0 transition-opacity duration-500 ${
                      index === currentIndex ? "opacity-100" : "opacity-0 absolute"
                    }`}
                  >
                    <div className="mx-auto max-w-3xl">
                      <div className="relative bg-slate-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-700 hover:border-indigo-500/50 pt-16">
                        <div className="absolute top-4 left-4 right-4 px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white text-xs sm:text-sm font-semibold border border-indigo-500/30 text-center">
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

                        <blockquote className="text-gray-300 mb-6 text-lg leading-relaxed">
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
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 sm:-translate-x-16 z-10 p-2 sm:p-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                aria-label="Previous testimonial"
              >
                <ChevronLeftIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 sm:translate-x-16 z-10 p-2 sm:p-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                aria-label="Next testimonial"
              >
                <ChevronRightIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Carousel Indicators/Dots */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 ${
                    index === currentIndex
                      ? "bg-indigo-500 w-3 h-3 sm:w-4 sm:h-4"
                      : "bg-slate-600 hover:bg-slate-500 w-2 h-2 sm:w-3 sm:h-3"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Auto-scroll indicator */}
            <div className="flex items-center justify-center mt-6">
              <span className="text-sm text-slate-400">
                {currentIndex + 1} / {testimonials.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
