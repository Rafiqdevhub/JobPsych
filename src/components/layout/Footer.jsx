import React from "react";
import NavigationButton from "@components/buttons/NavigationButton";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-t border-slate-700/50">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-blue-500/5"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-indigo-500/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500/5 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-blue-500/5 rounded-full blur-lg"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl overflow-hidden px-6 py-16 sm:py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 mb-16">
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-indigo-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10">
            <div className="flex items-center mb-4">
              <h3 className="text-lg font-semibold text-white">
                About JobPsych
              </h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              A unified platform offering smart career direction for individuals
              through Role Suggestions, AI-powered interview practice with
              InterviewPrep AI, and resume optimization with ATS Analyzer.
            </p>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10">
            <div className="flex items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Key Features</h3>
            </div>
            <ul className="text-gray-300 space-y-3 text-sm">
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-3"></span>
                Career Role Matching
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></span>
                Personality & Skills Fit
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-pink-400 rounded-full mr-3"></span>
                ATS Compatibility Analysis
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3"></span>
                AI Interview Practice
              </li>

              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-3"></span>
                Recruiter-Friendly Summaries
              </li>
            </ul>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
            <div className="flex items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Quick Access</h3>
            </div>
            <div className="space-y-3">
              {[
                {
                  label: "Explore Role Suggestions",
                  to: "/role-suggestions",
                },
                {
                  label: "Analyze Resume with ATS",
                  to: "/ats-analyzer",
                },
                {
                  label: "Try InterviewPrep AI",
                  to: "/interview-prepai",
                },
              ].map((item, index) => (
                <NavigationButton
                  key={index}
                  to={item.to}
                  className="group flex items-center w-full p-3 bg-slate-700/30 hover:bg-slate-600/40 rounded-lg border border-slate-600/30 hover:border-indigo-500/50 transition-all duration-300 text-gray-300 hover:text-white cursor-pointer"
                >
                  <span className="text-lg mr-3">{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                  <svg
                    className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </NavigationButton>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700/50 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-gray-300 text-sm">Active Platform</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-indigo-400 font-bold text-sm">15K+</span>
                <span className="text-gray-300 text-sm">Happy Users</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-emerald-400 font-bold text-sm">94%</span>
                <span className="text-gray-300 text-sm">Success Rate</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-gray-300 text-sm ml-2">4.9/5 Rating</span>
              </div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-xs leading-5">
              &copy; {new Date().getFullYear()} JobPsych. All rights reserved.
              <span className="mx-2">•</span>
              Your data remains private and protected.
              <span className="mx-2">•</span>
              <NavigationButton
                to="/privacy-policy"
                className="text-indigo-400 hover:text-indigo-300 transition-colors duration-300 inline-block cursor-pointer"
              >
                Privacy Policy
              </NavigationButton>
              <span className="mx-2">•</span>
              <NavigationButton
                to="/terms-of-service"
                className="text-indigo-400 hover:text-indigo-300 transition-colors duration-300 inline-block cursor-pointer"
              >
                Terms of Service
              </NavigationButton>
              <span className="mx-2">•</span>
              <NavigationButton
                to="/security-audit"
                className="text-indigo-400 hover:text-indigo-300 transition-colors duration-300 inline-block cursor-pointer"
              >
                Security Audit
              </NavigationButton>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
