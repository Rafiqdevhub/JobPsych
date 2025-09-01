import React from "react";

const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="pt-6 pb-10 sm:pt-10 sm:pb-24 bg-gradient-to-br from-indigo-50 via-white to-purple-50"
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-sm font-medium mb-6">
            Powerful Features for Modern Hiring
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Three Powerful Tools for
            <br />
            <span className="text-indigo-600">
              Career Success & Smart Hiring
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            JobPsych provides three powerful tools for career success: Free
            career guidance for job seekers through Role Suggestions, AI-powered
            interview practice with InterviewPrep AI, and premium hiring
            intelligence for HR teams through HireDisk.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 mb-10 sm:mb-16">
          <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-indigo-200 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10">
              <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                ✅
              </div>

              <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-xs font-medium mb-4">
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
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10">
              <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                🎯
              </div>

              <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 text-xs font-medium mb-4">
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
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10">
              <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                🔒
              </div>

              <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 text-xs font-medium mb-4">
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
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10">
              <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                🎯
              </div>

              <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-xs font-medium mb-4">
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
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10">
              <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                ⚡
              </div>

              <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-xs font-medium mb-4">
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
        <div className="text-center bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-6 sm:p-12 text-white">
          <h3 className="text-3xl md:text-4xl font-bold mb-8">
            How JobPsych Works
          </h3>
          <div className="mb-8 max-w-4xl mx-auto text-lg text-white/90 text-center">
            <p className="mb-2">
              <span className="font-bold text-yellow-200">
                Role Suggestions
              </span>{" "}
              is{" "}
              <span className="font-bold text-green-300">completely free</span>{" "}
              for job seekers. Just upload your resume and get instant career
              recommendations—no payment or signup required!
            </p>
            <p className="mb-2">
              <span className="font-bold text-blue-200">InterviewPrep AI</span>{" "}
              is our AI-powered interview practice tool, currently available as
              a <span className="font-bold text-blue-300">demo version</span>{" "}
              for practicing real interview questions with instant feedback.
            </p>
            <p className="mb-2">
              <span className="font-bold text-emerald-200">HireDisk</span> is
              our premium AI hiring tool for HR teams and recruiters, with two
              plans:
            </p>
            <ul className="mb-2 list-none flex flex-col md:flex-row justify-center gap-4">
              <li className="bg-emerald-600/80 rounded-xl px-4 py-2 inline-flex items-center gap-2 text-white font-semibold shadow">
                <span className="text-orange-200 text-xl">Pro</span>
                <span className="bg-white/20 rounded px-2 py-1 text-sm font-bold">
                  $50/mo
                </span>
                <span className="hidden md:inline">— For small HR teams</span>
              </li>
              <li className="bg-yellow-500/80 rounded-xl px-4 py-2 inline-flex items-center gap-2 text-white font-semibold shadow">
                <span className="text-yellow-100 text-xl">Premium</span>
                <span className="bg-white/20 rounded px-2 py-1 text-sm font-bold">
                  Contact Us
                </span>
                <span className="hidden md:inline">
                  — For enterprises & custom needs
                </span>
              </li>
            </ul>
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
              <span className="text-orange-200 font-bold">HireDisk Pro</span>{" "}
              for $50/month, or{" "}
              <button
                type="button"
                className="text-yellow-100 font-bold underline hover:text-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-colors"
              >
                contact us
              </button>{" "}
              for a custom Premium plan.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-12 max-w-6xl mx-auto">
            {/* Role Suggestions Flow */}
            <div className="bg-white/10 rounded-2xl p-4 sm:p-6">
              <h4 className="text-xl font-bold mb-6 text-yellow-300">
                ✅ Role Suggestions (FREE)
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
                    Get career recommendations & role fit analysis
                  </span>
                </div>
                <div className="mt-4 text-green-200 text-sm font-semibold">
                  <span className="bg-green-700/60 rounded px-2 py-1">
                    Completely Free
                  </span>
                </div>
              </div>
            </div>

            {/* InterviewPrep AI Flow */}
            <div className="bg-white/10 rounded-2xl p-4 sm:p-6">
              <h4 className="text-xl font-bold mb-6 text-blue-300">
                🎯 InterviewPrep AI (Demo)
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
                <div className="mt-4 text-blue-200 text-sm font-semibold">
                  <span className="bg-blue-700/60 rounded px-2 py-1">
                    Demo Version
                  </span>
                </div>
              </div>
            </div>

            {/* HireDisk Flow */}
            <div className="bg-white/10 rounded-2xl p-4 sm:p-6">
              <h4 className="text-xl font-bold mb-6 text-emerald-300">
                🔒 HireDisk (Pro & Premium)
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
                <div className="mt-4 flex flex-col gap-2">
                  <span className="bg-orange-500/80 rounded px-2 py-1 text-white text-sm font-semibold inline-block">
                    Pro: $50/month
                  </span>
                  <span className="bg-yellow-500/80 rounded px-2 py-1 text-white text-sm font-semibold inline-block">
                    Premium: Contact Us
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-20 left-4 sm:left-10 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-r from-indigo-200/20 to-purple-200/20 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-4 sm:right-20 w-28 h-28 sm:w-48 sm:h-48 bg-gradient-to-r from-purple-200/20 to-blue-200/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-4 sm:left-20 w-24 h-24 sm:w-40 sm:h-40 bg-gradient-to-r from-blue-200/20 to-indigo-200/20 rounded-full blur-xl"></div>
      </div>
    </section>
  );
};

export default FeaturesSection;
