import React from "react";
import NavigationButton from "@components/buttons/NavigationButton";

const Footer = ({ getDestination }) => {
  return (
    <footer className="relative bg-slate-900">
      {/* Dark Background with Gradient - matching HeroSection */}
      <div className="absolute inset-0 bg-slate-900">
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-gradient-to-br from-indigo-500/10 to-blue-500/10"></div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 mb-12">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">JobPsych</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              A unified platform offering smart career direction for individuals
              through Role Suggestions, AI-powered interview practice with
              InterviewPrep AI, resume optimization with ATS Analyzer, and
              advanced recruitment tools for HR with HireDisk Pro.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Key Features
            </h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Career Role Matching</li>
              <li>• Personality & Skills Fit</li>
              <li>• AI Interview Practice</li>
              <li>• Tailored Interview Questions</li>
              <li>• ATS Compatibility Analysis</li>
              <li>• Recruiter-Friendly Summaries</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Release History
            </h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-slate-800 border border-indigo-500/30 rounded text-xs text-indigo-400 font-medium">
                  v1.0.0
                </span>
                <span>Initial Launch (May 2025)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-slate-800 border border-emerald-500/30 rounded text-xs text-emerald-400 font-medium">
                  v1.1.0
                </span>
                <span>AI Resume Tools Added (June 2025)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-slate-800 border border-emerald-500/30 rounded text-xs text-emerald-400 font-medium">
                  v1.1.1
                </span>
                <span>Payment System Integrated (June 2025)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-slate-800 border border-purple-500/30 rounded text-xs text-purple-400 font-medium">
                  v2.0.0
                </span>
                <span>Major Enhancements (August 2025)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-slate-800 border border-blue-500/30 rounded text-xs text-blue-400 font-medium">
                  v2.1.0
                </span>
                <span>InterviewPrep AI Added (September 2025)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-slate-800 border border-orange-500/30 rounded text-xs text-orange-400 font-medium">
                  v2.2.0
                </span>
                <span>ATS Analyzer Launched (September 2025)</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Get Started
            </h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>
                •{" "}
                <NavigationButton
                  to={getDestination()}
                  className="hover:text-indigo-400 bg-transparent border-none p-0 cursor-pointer text-gray-300 font-inherit transition-colors duration-300"
                >
                  Explore Role Suggestions
                </NavigationButton>
              </li>
              <li>
                •{" "}
                <NavigationButton
                  to="/interview-dashboard"
                  className="hover:text-indigo-400 bg-transparent border-none p-0 cursor-pointer text-gray-300 font-inherit transition-colors duration-300"
                >
                  Try InterviewPrep AI
                </NavigationButton>
              </li>
              <li>
                •{" "}
                <NavigationButton
                  to="/ats-analyzer"
                  className="hover:text-indigo-400 bg-transparent border-none p-0 cursor-pointer text-gray-300 font-inherit transition-colors duration-300"
                >
                  Analyze Resume with ATS
                </NavigationButton>
              </li>
              <li>
                •{" "}
                <NavigationButton
                  to="/sign-up"
                  className="hover:text-indigo-400 bg-transparent border-none p-0 cursor-pointer text-gray-300 font-inherit transition-colors duration-300"
                >
                  Upgrade to HireDisk Pro
                </NavigationButton>
              </li>
              <li>
                •{" "}
                <button
                  onClick={() => {
                    document
                      .getElementById("features")
                      .scrollIntoView({ behavior: "smooth" });
                  }}
                  className="hover:text-indigo-400 bg-transparent border-none p-0 cursor-pointer text-gray-300 font-inherit transition-colors duration-300"
                >
                  Learn More About Features
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-700 pt-8">
          <p className="text-center text-xs leading-5 text-gray-300">
            &copy; {new Date().getFullYear()} JobPsych. All rights reserved.
            Your data remains private and protected.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
