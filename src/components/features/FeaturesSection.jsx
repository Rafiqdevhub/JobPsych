import React from "react";

const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="relative pt-6 pb-10 sm:pt-10 sm:pb-24 bg-slate-900"
    >
      <div className="absolute inset-0 bg-slate-900">
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-gradient-to-br from-indigo-500/10 to-blue-500/10"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center px-8 py-4 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-sm font-medium mb-8">
            Powerful Features for Modern Hiring
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-6">
            Four Powerful Tools for
            <br />
            <span className="text-indigo-400">
              Career Success & Smart Hiring
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-16">
          <div className="group relative bg-slate-800 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-700 hover:border-indigo-500/50 hover:-translate-y-1">
            <div className="absolute inset-0 bg-indigo-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-800/70 text-indigo-300 text-xs font-medium mb-4">
                Role Suggestions
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors duration-300">
                Free Career Guidance
              </h3>

              <p className="text-gray-300 leading-relaxed">
                Upload your resume, mention target role & job description to get
                personalized career recommendations completely free!
              </p>
            </div>
          </div>

          <div className="group relative bg-slate-800 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-700 hover:border-blue-500/50 hover:-translate-y-1">
            <div className="absolute inset-0 bg-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-800/70 text-purple-300 text-xs font-medium mb-4">
                InterviewPrep AI
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors duration-300">
                AI Interview Practice
              </h3>

              <p className="text-gray-300 leading-relaxed">
                Practice real interview questions with AI feedback. Get instant
                tips and improve your interview skills.
              </p>
            </div>
          </div>

          <div className="group relative bg-slate-800 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-700 hover:border-emerald-500/50 hover:-translate-y-1">
            <div className="absolute inset-0 bg-emerald-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-800/70 text-emerald-300 text-xs font-medium mb-4">
                ATS Analyzer
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors duration-300">
                Beat Applicant Tracking Systems
              </h3>

              <p className="text-gray-300 leading-relaxed">
                Optimize your resume to pass ATS filters with AI-powered
                analysis, keyword optimization, and compatibility scoring across
                major ATS platforms.
              </p>
            </div>
          </div>

          <div className="group relative bg-slate-800 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-700 hover:border-orange-500/50 hover:-translate-y-1">
            <div className="absolute inset-0 bg-orange-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-800/70 text-orange-300 text-xs font-medium mb-4">
                HireDisk
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors duration-300">
                AI-Powered Hiring Tool
              </h3>

              <p className="text-gray-300 leading-relaxed">
                Advanced AI resume screening, candidate insights, and interview
                question generation for HR teams and recruiters.
              </p>
            </div>
          </div>

          <div className="group relative bg-slate-800 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-700 hover:border-indigo-500/50 hover:-translate-y-1">
            <div className="absolute inset-0 bg-indigo-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-800/70 text-indigo-300 text-xs font-medium mb-4">
                Smart Analysis
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors duration-300">
                Role Fit Assessment
              </h3>

              <p className="text-gray-300 leading-relaxed">
                Get detailed analysis of how well you match specific roles with
                skill gap identification and improvement suggestions.
              </p>
            </div>
          </div>

          <div className="group relative bg-slate-800 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-700 hover:border-indigo-500/50 hover:-translate-y-1">
            <div className="absolute inset-0 bg-indigo-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-800/70 text-indigo-300 text-xs font-medium mb-4">
                Instant Results
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors duration-300">
                Real-time Processing
              </h3>

              <p className="text-gray-300 leading-relaxed">
                Upload resumes and receive instant analysis results within
                seconds for both career guidance and hiring decisions.
              </p>
            </div>
          </div>
        </div>
        {/* How JobPsych Works Section */}
        <div className="text-center bg-slate-800 border border-slate-700 rounded-3xl p-6 sm:p-12 text-white">
          <h3 className="text-3xl md:text-4xl font-bold mb-8 text-white">
            How JobPsych Works
          </h3>
          <div className="mb-8 max-w-4xl mx-auto text-lg text-gray-300 text-center">
            <p className="mb-2">
              Role Suggestions is completely free for job seekers. Just upload
              your resume and get instant career recommendations.
            </p>
            <p className="mb-2">
              InterviewPrep AI is our AI-powered interview practice tool for
              practicing real interview questions with instant feedback.
            </p>
            <p className="mb-2">
              HireDisk is our AI hiring tool for HR teams and recruiters.
            </p>
            <p className="mb-2">
              ATS Analyzer helps you optimize your resume to beat Applicant
              Tracking Systems and land more interviews.
            </p>

            <p className="mt-2">
              <span className="font-bold text-white">How to choose?</span> If
              you're a job seeker, use{" "}
              <span className="text-yellow-400 font-bold">
                Role Suggestions
              </span>{" "}
              for free career guidance,{" "}
              <span className="text-purple-400 font-bold">ATS Analyzer</span> to
              optimize your resume, or try{" "}
              <span className="text-blue-400 font-bold">InterviewPrep AI</span>{" "}
              for interview practice. If you're an HR team or recruiter, start
              with <span className="text-orange-400 font-bold">HireDisk</span>.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-12 max-w-6xl mx-auto">
            {/* Role Suggestions Flow */}
            <div className="bg-slate-700/50 border border-slate-600 rounded-2xl p-4 sm:p-6">
              <h4 className="text-xl font-bold mb-6 text-yellow-400">
                Role Suggestions
              </h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-sm font-bold text-white">
                    1
                  </div>
                  <span className="text-gray-300 text-sm">
                    Upload your resume
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-sm font-bold text-white">
                    2
                  </div>
                  <span className="text-gray-300 text-sm">
                    Mention target role & job description
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-sm font-bold text-white">
                    3
                  </div>
                  <span className="text-gray-300 text-sm">
                    Get career recommendations & role fit analysis
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-slate-700/50 border border-slate-600 rounded-2xl p-4 sm:p-6">
              <h4 className="text-xl font-bold mb-6 text-blue-400">
                InterviewPrep AI
              </h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-sm font-bold text-white">
                    1
                  </div>
                  <span className="text-gray-300">
                    Access practice dashboard
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-sm font-bold text-white">
                    2
                  </div>
                  <span className="text-gray-300">
                    Practice with sample questions
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-sm font-bold text-white">
                    3
                  </div>
                  <span className="text-gray-300">Get AI feedback & tips</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-700/50 border border-slate-600 rounded-2xl p-4 sm:p-6">
              <h4 className="text-xl font-bold mb-6 text-purple-400">
                ATS Analyzer
              </h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-sm font-bold text-white">
                    1
                  </div>
                  <span className="text-gray-300">
                    Upload your resume for analysis
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-sm font-bold text-white">
                    2
                  </div>
                  <span className="text-gray-300">
                    Get ATS compatibility scoring
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-sm font-bold text-white">
                    3
                  </div>
                  <span className="text-gray-300">
                    Receive optimization recommendations
                  </span>
                </div>
              </div>
            </div>

            {/* HireDisk Flow */}
            <div className="bg-slate-700/50 border border-slate-600 rounded-2xl p-4 sm:p-6">
              <h4 className="text-xl font-bold mb-6 text-emerald-400">
                HireDisk
              </h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-sm font-bold text-white">
                    1
                  </div>
                  <span className="text-gray-300">
                    AI-powered resume screening
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-sm font-bold text-white">
                    2
                  </div>
                  <span className="text-gray-300">
                    Generate interview questions
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-sm font-bold text-white">
                    3
                  </div>
                  <span className="text-gray-300">
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
