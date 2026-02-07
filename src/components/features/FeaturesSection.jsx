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
            Complete Career Readiness
            <br />
            <span className="text-indigo-400">
              Document Optimization & Interview Success
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-16">
          <div className="group relative bg-slate-800 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-700 hover:border-blue-500/50 hover:-translate-y-1">
            <div className="absolute inset-0 bg-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-800/70 text-blue-300 text-xs font-medium mb-4">
                Career Exploration
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                Career Path Exploration
              </h3>

              <p className="text-gray-300 leading-relaxed">
                Prepare for your career transition with AI-guided role discovery
                that matches your skills and aspirations.
              </p>
            </div>
          </div>

          <div className="group relative bg-slate-800 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-700 hover:border-emerald-500/50 hover:-translate-y-1">
            <div className="absolute inset-0 bg-emerald-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-800/70 text-emerald-300 text-xs font-medium mb-4">
                Document Analysis
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors duration-300">
                Professional Document Analysis
              </h3>

              <p className="text-gray-300 leading-relaxed">
                Ensure interview readiness with resume optimization that
                identifies gaps and enhances content for maximum impact.
              </p>
            </div>
          </div>
          <div className="group relative bg-slate-800 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-700 hover:border-purple-500/50 hover:-translate-y-1">
            <div className="absolute inset-0 bg-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-800/70 text-purple-300 text-xs font-medium mb-4">
                Interview Mastery
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors duration-300">
                AI-Assisted Interview Practice
              </h3>

              <p className="text-gray-300 leading-relaxed">
                Build complete interview readiness through AI-powered practice,
                intelligent feedback, and confidence-building preparation.
              </p>
            </div>
          </div>
        </div>
        {/* How JobPsych Works Section */}
        <div className="text-center bg-slate-800 border border-slate-700 rounded-3xl p-6 sm:p-12 text-white">
          <h3 className="text-3xl md:text-4xl font-bold mb-8 text-white">
            How Our System Works
          </h3>
          <div className="mb-8 max-w-4xl mx-auto text-lg text-gray-300 text-center">
            <p className="mb-2">
              Career Path Exploration helps you discover ideal roles through
              AI-guided role discovery that matches your skills and aspirations.
            </p>
            <p className="mb-2">
              Professional Document Analysis optimizes your document to ensure
              maximum impact with content enhancement and gap identification.
            </p>
            <p className="mb-2">
              AI-Assisted Interview Practice provides intelligent feedback and
              confidence-building preparation for complete interview readiness.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-12 max-w-6xl mx-auto">
            {/* Career Path Exploration */}
            <div className="bg-slate-700/50 border border-slate-600 rounded-2xl p-4 sm:p-6">
              <h4 className="text-xl font-bold mb-6 text-blue-400">
                Career Path Exploration
              </h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-sm font-bold text-white">
                    1
                  </div>
                  <span className="text-gray-300 text-sm">
                    Upload your document
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-sm font-bold text-white">
                    2
                  </div>
                  <span className="text-gray-300 text-sm">
                    Define target roles & goals
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-sm font-bold text-white">
                    3
                  </div>
                  <span className="text-gray-300 text-sm">
                    Receive career recommendations
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-slate-700/50 border border-slate-600 rounded-2xl p-4 sm:p-6">
              <h4 className="text-xl font-bold mb-6 text-emerald-400">
                Document Analysis
              </h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-sm font-bold text-white">
                    1
                  </div>
                  <span className="text-gray-300">Upload your document</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-sm font-bold text-white">
                    2
                  </div>
                  <span className="text-gray-300">
                    Get content analysis & gaps
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-sm font-bold text-white">
                    3
                  </div>
                  <span className="text-gray-300">
                    Receive optimization tips
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-slate-700/50 border border-slate-600 rounded-2xl p-4 sm:p-6">
              <h4 className="text-xl font-bold mb-6 text-purple-400">
                Interview Practice
              </h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-sm font-bold text-white">
                    1
                  </div>
                  <span className="text-gray-300">
                    Access practice scenarios
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-sm font-bold text-white">
                    2
                  </div>
                  <span className="text-gray-300">
                    Practice with AI interviewer
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-sm font-bold text-white">
                    3
                  </div>
                  <span className="text-gray-300">Get feedback & improve</span>
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
