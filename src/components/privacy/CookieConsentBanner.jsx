import React, { useState, useEffect } from "react";
import { PrivacyManager } from "@utils/securityAudit";
import NavigationButton from "@components/buttons/NavigationButton";
import {
  XMarkIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  MegaphoneIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

const CookieConsentBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const hasConsent = PrivacyManager.hasCookieConsent();
    const hasDeclined =
      localStorage.getItem("jobpsych_cookie_consent") === "declined";

    if (!hasConsent && !hasDeclined) {
      // Show banner after a short delay
      const timer = setTimeout(() => setShowBanner(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    PrivacyManager.setCookieConsent(true);
    setShowBanner(false);
  };

  const handleDecline = () => {
    PrivacyManager.setCookieConsent(false);
    setShowBanner(false);
  };

  const handleCustomize = () => {
    setShowDetails(!showDetails);
  };

  const handleClose = () => {
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
      <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"></div>{" "}
      <div className="relative bg-gradient-to-r from-slate-800/95 via-slate-800/98 to-slate-900/95 backdrop-blur-xl border-t border-slate-700/50 shadow-2xl">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
        <div className="absolute -top-20 left-1/4 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl"></div>
        <div className="absolute -top-20 right-1/4 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 p-2 text-gray-400 hover:text-white hover:bg-slate-700/80 rounded-lg transition-all duration-300 cursor-pointer shadow-lg border border-slate-600/30 hover:border-slate-500/50"
            aria-label="Close cookie banner"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 pr-10 sm:pr-12">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Cookie Preferences
                </h3>
                <div className="flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                  <div
                    className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>

              <p className="text-gray-300 text-sm mb-3 max-w-3xl">
                We use cookies to enhance your experience, analyze site usage,
                and provide personalized content. Your privacy matters to
                us—customize your preferences or accept all to continue.
              </p>
              {showDetails && (
                <div className="bg-slate-700/30 backdrop-blur-sm border border-slate-600/50 rounded-xl p-4 mb-4 animate-fade-in">
                  <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <Cog6ToothIcon className="w-5 h-5 text-indigo-400" />
                    Cookie Categories
                  </h4>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="flex items-start gap-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-emerald-500/20 rounded-lg border border-emerald-500/30 flex-shrink-0">
                        <ShieldCheckIcon className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white text-sm mb-1">
                          Essential
                        </p>
                        <p className="text-gray-400 text-xs">
                          Required for core functionality
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-500/20 rounded-lg border border-blue-500/30 flex-shrink-0">
                        <ChartBarIcon className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white text-sm mb-1">
                          Analytics
                        </p>
                        <p className="text-gray-400 text-xs">
                          Help us improve your experience
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-purple-500/20 rounded-lg border border-purple-500/30 flex-shrink-0">
                        <MegaphoneIcon className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white text-sm mb-1">
                          Marketing
                        </p>
                        <p className="text-gray-400 text-xs">
                          Personalized content for you
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-gray-400">
                    💡 You can modify these settings anytime in your browser
                    preferences.
                  </p>
                </div>
              )}
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2 w-full lg:w-auto">
              <button
                onClick={handleCustomize}
                className="group relative px-5 py-2.5 text-sm font-medium text-gray-300 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50 hover:border-indigo-500/50 rounded-lg transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Cog6ToothIcon className="w-4 h-4" />
                  {showDetails ? "Hide Details" : "Customize"}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              <button
                onClick={handleDecline}
                className="px-5 py-2.5 text-sm font-medium text-gray-300 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50 hover:border-slate-500/50 rounded-lg transition-all duration-300 cursor-pointer"
              >
                Only Essential
              </button>

              <button
                onClick={handleAccept}
                className="group relative px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-lg transition-all duration-300 cursor-pointer shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <ShieldCheckIcon className="w-4 h-4" />
                  Accept All
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/0 via-white/20 to-purple-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-700/50 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-2">
              <span className="w-1 h-1 bg-indigo-400 rounded-full"></span>
              Learn more:
            </span>
            <NavigationButton
              to="/privacy-policy"
              className="text-indigo-400 hover:text-indigo-300 transition-colors duration-300 cursor-pointer"
            >
              Privacy Policy
            </NavigationButton>
            <span className="text-slate-600">•</span>
            <NavigationButton
              to="/terms-of-service"
              className="text-indigo-400 hover:text-indigo-300 transition-colors duration-300 cursor-pointer"
            >
              Terms of Service
            </NavigationButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
