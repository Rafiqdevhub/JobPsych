import React from "react";

const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="pt-6 pb-10 sm:pt-10 sm:pb-24 bg-indigo-50"
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-6">
            Powerful Features for Modern Hiring
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-indigo-600 mb-6">
            Three Powerful Tools for
            <br />
            <span className="text-indigo-600">
              Career Success & Smart Hiring
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 mb-10 sm:mb-16">
          <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-indigo-200 hover:-translate-y-1">
            <div className="absolute inset-0 bg-indigo-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-medium mb-4">
                Role Suggestions
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300">
                Free Career Guidance
              </h3>

              <p className="text-gray-600 leading-relaxed">
                Upload your resume, mention target role & job description to get
                personalized career recommendations - completely free!
              </p>
            </div>
          </div>

          <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:-translate-y-1">
            <div className="absolute inset-0 bg-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-medium mb-4">
                InterviewPrep AI
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                AI Interview Practice
              </h3>

              <p className="text-gray-600 leading-relaxed">
                Practice real interview questions with AI feedback. Get instant
                tips and improve your interview skills with our demo version.
              </p>
            </div>
          </div>

          <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-emerald-200 hover:-translate-y-1">
            <div className="absolute inset-0 bg-emerald-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-medium mb-4">
                HireDisk Premium
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors duration-300">
                AI-Powered Hiring Tool
              </h3>

              <p className="text-gray-600 leading-relaxed">
                Advanced AI resume screening, candidate insights, and interview
                question generation for HR teams and recruiters.
              </p>
            </div>
          </div>

          <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-indigo-200 hover:-translate-y-1">
            <div className="absolute inset-0 bg-indigo-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-medium mb-4">
                Smart Analysis
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300">
                Role Fit Assessment
              </h3>

              <p className="text-gray-600 leading-relaxed">
                Get detailed analysis of how well you match specific roles with
                skill gap identification and improvement suggestions.
              </p>
            </div>
          </div>

          <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-indigo-200 hover:-translate-y-1">
            <div className="absolute inset-0 bg-indigo-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-medium mb-4">
                Instant Results
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300">
                Real-time Processing
              </h3>

              <p className="text-gray-600 leading-relaxed">
                Upload resumes and receive instant analysis results within
                seconds for both career guidance and hiring decisions.
              </p>
            </div>
          </div>
        </div>
        {/* How JobPsych Works Section */}
        <div className="text-center bg-indigo-600 rounded-3xl p-6 sm:p-12 text-white">
          <h3 className="text-3xl md:text-4xl font-bold mb-8">
            How JobPsych Works
          </h3>
          <div className="mb-8 max-w-4xl mx-auto text-lg text-white/90 text-center">
            <p className="mb-2">
              Role Suggestions is completely free for job seekers. Just upload
              your resume and get instant career recommendations.
            </p>
            <p className="mb-2">
              InterviewPrep AI is our AI-powered interview practice tool for
              practicing real interview questions with instant feedback.
            </p>
            <p className="mb-2">
              HireDisk is our premium AI hiring tool for HR teams and
              recruiters.
            </p>

            <p className="mt-2">
              <span className="font-bold">How to choose?</span> If you're a job
              seeker, use{" "}
              <span className="text-yellow-200 font-bold">
                Role Suggestions
              </span>{" "}
              for free career guidance, or try{" "}
              <span className="text-blue-200 font-bold">InterviewPrep AI</span>{" "}
              for interview practice. If you're an HR team or recruiter, start
              with{" "}
              <span className="text-orange-200 font-bold">HireDisk Pro</span>.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-12 max-w-6xl mx-auto">
            {/* Role Suggestions Flow */}
            <div className="bg-white/10 rounded-2xl p-4 sm:p-6">
              <h4 className="text-xl font-bold mb-6 text-yellow-300">
                Role Suggestions
              </h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <span className="text-white/90">Upload your resume</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <span className="text-white/90">
                    Mention target role & job description
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <span className="text-white/90">
                    {" "}
                    Get career recommendations & role fit analysis
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white/10 rounded-2xl p-4 sm:p-6">
              <h4 className="text-xl font-bold mb-6 text-blue-300">
                InterviewPrep AI
              </h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <span className="text-white/90">
                    Access practice dashboard
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <span className="text-white/90">
                    Practice with sample questions
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <span className="text-white/90">Get AI feedback & tips</span>
                </div>
              </div>
            </div>

            {/* HireDisk Flow */}
            <div className="bg-white/10 rounded-2xl p-4 sm:p-6">
              <h4 className="text-xl font-bold mb-6 text-emerald-300">
                HireDisk
              </h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <span className="text-white/90">
                    AI-powered resume screening
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <span className="text-white/90">
                    Generate interview questions
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <span className="text-white/90">
                    Advanced candidate insights & analytics
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
