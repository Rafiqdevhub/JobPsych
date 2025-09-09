import React from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import TypewriterText from "@components/TypewriterText";

const HeroSection = ({ isSignedIn, resumeData }) => {
  return (
    <section id="hero" className="relative isolate overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:pt-24 sm:pb-12 md:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-8">
            Career Guidance, InterviewPrep AI, ATS Resume Analyzer & Hiring
            Intelligence
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-6 text-gray-800">
            <TypewriterText
              text="Master Interviews with InterviewPrep AI Your Personal Career Coach, Applicant Tracking Advocate and Hiring Assistant."
              className="text-blue-600"
              loop={true}
              delay={3}
              eraseSpeed={50}
              typeSpeed={50}
            />
          </h1>

          <p className="mt-6 text-lg sm:text-xl md:text-2xl leading-relaxed text-gray-600 max-w-3xl mx-auto">
            <span className="font-semibold text-indigo-600">
              JobPsych offers four powerful tools:
            </span>{" "}
            Free career role suggestions, AI interview preparation, ATS resume
            optimization, and AI-powered hiring intelligence for recruiters.
          </p>
          <div className="mt-8 p-4 sm:p-6 bg-indigo-50 rounded-2xl shadow-inner border border-indigo-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-sm text-gray-700">
              <div className="text-center p-4 bg-white/60 rounded-xl border border-indigo-200">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="font-medium text-indigo-600">
                    Role Suggestions
                  </span>
                </div>
                <p className="text-xs text-gray-600">
                  Career guidance for job seekers
                </p>
              </div>
              <div className="text-center p-4 bg-white/60 rounded-xl border border-blue-200">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="font-medium text-blue-600">
                    InterviewPrep AI
                  </span>
                </div>
                <p className="text-xs text-gray-600">
                  Practice interviews with AI
                </p>
              </div>
              <div className="text-center p-4 bg-white/60 rounded-xl border border-purple-200">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="font-medium text-purple-600">
                    ATS Resume Analyzer
                  </span>
                </div>
                <p className="text-xs text-gray-600">
                  Optimize your resume for ATS systems
                </p>
              </div>
              <div className="text-center p-4 bg-white/60 rounded-xl border border-emerald-200">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="font-medium text-emerald-600">
                    HireDisk HR Assistant
                  </span>
                </div>
                <p className="text-xs text-gray-600">
                  AI-powered hiring intelligence for recruiters
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => (window.location.href = "/role-suggestions")}
              className="group relative px-8 py-4 min-w-[200px] bg-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 border-none cursor-pointer"
            >
              <span className="relative z-10">Role Suggestions</span>
              <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              <div className="absolute inset-0 bg-indigo-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            <button
              onClick={() => (window.location.href = "/interview-prep-ai")}
              className="group relative px-8 py-4 min-w-[200px] bg-blue-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 border-none cursor-pointer"
            >
              <span className="relative z-10">InterviewPrep AI</span>
              <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              <div className="absolute inset-0 bg-blue-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            <button
              onClick={() => (window.location.href = "/ats-analyzer")}
              className="group relative px-8 py-4 min-w-[200px] bg-purple-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 border-none cursor-pointer"
            >
              <span className="relative z-10">ATS Resume Analyzer</span>
              <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              <div className="absolute inset-0 bg-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            <button
              onClick={() => {
                if (!isSignedIn) {
                  window.location.href = "/sign-in";
                } else {
                  window.location.href = "/hire-disk";
                }
              }}
              className="group relative px-8 py-4 min-w-[200px] bg-emerald-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 border-none cursor-pointer"
            >
              <span className="relative z-10">HireDisk HR Assistant</span>
              <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              <div className="absolute inset-0 bg-emerald-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
          <div className="mt-4 space-y-2">
            {resumeData?.roleRecommendations?.map((role, index) => (
              <p
                key={index}
                className="text-sm text-indigo-700 font-medium bg-indigo-50 px-4 py-2 rounded-lg block"
              >
                <strong>{role.roleName}:</strong> {role.matchPercentage}% match
                - {role.reasoning}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div
        className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 aspect-[1155/678] w-[20rem] sm:w-[72.1875rem] -translate-x-1/2 bg-indigo-200 opacity-30 sm:left-[calc(50%-30rem)]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </section>
  );
};

export default HeroSection;
