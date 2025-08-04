import React from "react";
import NavigationButton from "./NavigationButton";

const Footer = ({ getDestination }) => {
  return (
    <footer className="bg-gray-900">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 mb-12">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">JobPsych</h3>
            <p className="text-gray-400 text-sm">
              A unified platform offering smart career direction for individuals
              through Role Suggestions, and AI-powered recruitment tools for HR
              with HireDisk Pro.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Key Features
            </h3>
            <ul className="text-gray-400 space-y-2 text-sm">
              <li>• Career Role Matching</li>
              <li>• Personality & Skills Fit</li>
              <li>• Resume Parsing & Scoring</li>
              <li>• Tailored Interview Questions</li>
              <li>• Recruiter-Friendly Summaries</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Release History
            </h3>
            <ul className="text-gray-400 space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-indigo-900 rounded text-xs text-indigo-300 font-medium">
                  v1.0.0
                </span>
                <span>Initial Launch (May 2025)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-emerald-900 rounded text-xs text-emerald-300 font-medium">
                  v1.1.0
                </span>
                <span>AI Resume Tools Added (June 2025)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-emerald-900 rounded text-xs text-emerald-300 font-medium">
                  v1.1.1
                </span>
                <span>Payment System Integrated (June 2025)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-purple-900 rounded text-xs text-purple-300 font-medium">
                  v2.0.0
                </span>
                <span>Major Enhancements (August 2025)</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Get Started
            </h3>
            <ul className="text-gray-400 space-y-2 text-sm">
              <li>
                •{" "}
                <NavigationButton
                  to={getDestination()}
                  className="hover:text-indigo-300 bg-transparent border-none p-0 cursor-pointer text-gray-400 font-inherit"
                >
                  Explore Role Suggestions
                </NavigationButton>
              </li>
              <li>
                •{" "}
                <NavigationButton
                  to="/sign-up"
                  className="hover:text-indigo-300 bg-transparent border-none p-0 cursor-pointer text-gray-400 font-inherit"
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
                  className="hover:text-indigo-300 bg-transparent border-none p-0 cursor-pointer text-gray-400 font-inherit"
                >
                  Learn More About Features
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-xs leading-5 text-gray-400">
            &copy; {new Date().getFullYear()} JobPsych. All rights reserved.
            Your data remains private and protected.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
