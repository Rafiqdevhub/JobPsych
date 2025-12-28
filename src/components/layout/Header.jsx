import React, { useEffect, useState } from "react";
import {
  roleSuggestionsFeatures,
  interviewPrepFeatures,
} from "@data/roleSuggetionsFeatures";
import { hrSuggestions } from "@data/hireSuggestions";
import { atsAnalyzerFeatures } from "@data/atsAnalyzerFeatures";
import NavigationButton from "@components/buttons/NavigationButton";

function Header() {
  const [scrolled, setScrolled] = useState(false);

  const [showFeatures, setShowFeatures] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!mobileDropdownOpen) return;
    const handleClick = (e) => {
      if (
        !e.target.closest("#mobile-nav-dropdown") &&
        !e.target.closest("#mobile-nav-hamburger")
      ) {
        setMobileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [mobileDropdownOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-10 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-60"></div>
          <div className="absolute top-20 right-20 w-1 h-1 bg-purple-400 rounded-full animate-bounce opacity-40"></div>
          <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping opacity-50"></div>
          <div className="absolute top-1/3 right-10 w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-30"></div>
          <div className="absolute bottom-10 right-1/3 w-2 h-2 bg-indigo-400 rounded-full animate-bounce opacity-40"></div>
        </div>
      </div>

      {!scrolled && (
        <div
          className="fixed w-full top-0 left-0 z-40 h-[56px] xs:h-[64px] sm:h-[72px] md:h-[80px] pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
            opacity: 1,
          }}
        />
      )}
      <header
        className={`fixed w-full top-0 z-50 py-1 xs:py-2 sm:py-3 transition-all duration-500 ${
          scrolled ? "backdrop-blur-xl" : "bg-transparent"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="max-w-7xl mx-auto px-2 xs:px-3 sm:px-4 lg:px-8">
          <div
            className={`flex items-center justify-between rounded-lg xs:rounded-xl px-2 xs:px-3 sm:px-4 md:px-6 py-2 xs:py-2.5 sm:py-3 transition-all duration-500 relative overflow-hidden
              ${
                scrolled
                  ? "bg-gradient-to-r from-slate-800/95 via-slate-900/95 to-slate-800/95 backdrop-blur-xl hover:shadow-2xl border border-slate-700/80 shadow-lg"
                  : "bg-gradient-to-r from-slate-800/40 via-slate-900/60 to-slate-800/40 backdrop-blur-lg border border-slate-700/30 hover:border-slate-600/50"
              }
              ${isHovered ? "transform scale-[1.02] shadow-2xl" : ""}
            `}
          >
            <div className="absolute inset-0 rounded-lg xs:rounded-xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-emerald-500/20 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            <div className="absolute inset-0 rounded-lg xs:rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-50"></div>
            <NavigationButton
              to="/"
              className="flex items-center space-x-1.5 xs:space-x-2 sm:space-x-3 bg-transparent border-0 group flex-shrink-0 relative z-10"
            >
              <div className="flex items-center relative overflow-visible cursor-pointer">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>

                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 rounded-full opacity-0 group-hover:opacity-75 transition-opacity duration-300 animate-spin-slow"></div>

                <div className="relative z-10 flex justify-center items-center h-8 w-8 xs:h-9 xs:w-9 sm:h-10 sm:w-10 md:h-12 md:w-12 p-0.5 xs:p-1 transition-all duration-500 group-hover:scale-110">
                  <img
                    src="/logo.png"
                    alt="JobPsych Logo"
                    className="h-7 w-7 xs:h-8 xs:w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 object-contain transform transition-all duration-500 group-hover:rotate-12 group-hover:brightness-110 drop-shadow-lg"
                  />
                </div>
                <h1 className="ml-1.5 xs:ml-2 text-lg xs:text-xl sm:text-2xl font-bold transition-all duration-500 tracking-tight cursor-pointer relative">
                  <span className="hidden xs:inline bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent group-hover:from-blue-400 group-hover:via-indigo-400 group-hover:to-purple-400 transition-all duration-500">
                    JobPsych
                  </span>
                  <span className="xs:hidden bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent group-hover:from-blue-400 group-hover:via-indigo-400 group-hover:to-purple-400 transition-all duration-500">
                    JobPsych
                  </span>

                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-500"></div>
                </h1>
              </div>
            </NavigationButton>

            <div className="hidden md:flex items-center space-x-1.5 xs:space-x-2 sm:space-x-3 lg:space-x-4 flex-shrink-0 relative z-10">
              <button
                type="button"
                onClick={() => setShowFeatures(true)}
                className="relative px-3 xs:px-4 sm:px-5 lg:px-6 py-1.5 xs:py-2 sm:py-2.5 lg:py-3 text-xs xs:text-sm sm:text-base font-semibold text-emerald-200 bg-gradient-to-r from-emerald-800/70 to-emerald-700/70 hover:from-emerald-700/80 hover:to-emerald-600/80 rounded-lg xs:rounded-xl transition-all duration-500 cursor-pointer shadow-md hover:shadow-lg border border-emerald-600/50 hover:border-emerald-500/70 transform hover:scale-105 hover:-translate-y-0.5 group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-500"></div>

                <span className="hidden sm:inline relative z-10">Features</span>
              </button>

              {scrolled && (
                <button
                  type="button"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="ml-1 xs:ml-2 p-1.5 xs:p-2 rounded-full bg-gradient-to-r from-indigo-800/70 to-purple-800/70 hover:from-indigo-700/80 hover:to-purple-700/80 shadow-md transition-all duration-500 cursor-pointer border border-indigo-600/50 hover:border-purple-500/70 flex items-center justify-center transform hover:scale-110 hover:-translate-y-1 hover:rotate-12 group relative overflow-hidden"
                  aria-label="Scroll to top"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-4 w-4 xs:h-5 xs:w-5 text-indigo-200 relative z-10 transition-all duration-300 group-hover:text-white"
                    aria-hidden="true"
                  >
                    <title>Scroll to top</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                </button>
              )}
            </div>

            <div className="md:hidden flex items-center relative z-10">
              <button
                id="mobile-nav-hamburger"
                type="button"
                aria-label="Open mobile menu"
                className="relative p-1.5 xs:p-2 rounded-lg xs:rounded-xl bg-gradient-to-r from-indigo-800/70 to-purple-800/70 shadow-md border border-indigo-600/50 flex items-center justify-center hover:from-indigo-700/80 hover:to-purple-700/80 hover:border-purple-500/70 transition-all duration-500 transform hover:scale-110 group overflow-hidden"
                onClick={() => setMobileDropdownOpen((open) => !open)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg xs:rounded-xl"></div>

                <svg
                  className={`h-5 w-5 xs:h-6 xs:w-6 text-indigo-200 relative z-10 transition-all duration-300 ${
                    mobileDropdownOpen ? "rotate-90" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              {mobileDropdownOpen && (
                <div
                  id="mobile-nav-dropdown"
                  className="absolute top-16 xs:top-18 sm:top-20 right-0 w-56 xs:w-64 bg-slate-900 border-2 border-red-500 py-4 z-[100] rounded-xl shadow-2xl"
                  style={{
                    minHeight: "100px",
                    backgroundColor: "rgba(15, 23, 42, 0.95)",
                  }}
                >
                  <div className="text-white text-center mb-2 font-bold">
                    Mobile Menu
                  </div>

                  <nav className="flex flex-col gap-2 relative px-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowFeatures(true);
                        setMobileDropdownOpen(false);
                      }}
                      className="flex items-center justify-center gap-3 px-4 py-3 text-base font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg border-2 border-emerald-400 transition-all duration-300"
                    >
                      <span>Features</span>
                    </button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {showFeatures && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-md px-2 xs:px-4 animate-fade-in">
          <div className="bg-gradient-to-br from-slate-800/95 via-slate-900/95 to-slate-800/95 rounded-2xl xs:rounded-3xl shadow-2xl p-3 xs:p-4 sm:p-6 lg:p-8 max-w-sm xs:max-w-md sm:max-w-4xl lg:max-w-6xl w-full relative animate-fade-in-up overflow-y-auto max-h-[90vh] border border-slate-700/80 overflow-hidden">
            <div className="absolute inset-0 rounded-2xl xs:rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-emerald-500/20 opacity-50 animate-pulse"></div>

            <div className="absolute inset-0 rounded-2xl xs:rounded-3xl bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>

            <button
              className="absolute top-3 xs:top-4 right-3 xs:right-4 text-slate-400 hover:text-white text-xl xs:text-2xl font-bold focus:outline-none cursor-pointer z-10 transition-all duration-300 hover:scale-110 hover:rotate-90 bg-slate-700/50 hover:bg-slate-600/50 rounded-full w-8 h-8 xs:w-10 xs:h-10 flex items-center justify-center"
              onClick={() => setShowFeatures(false)}
              aria-label="Close features modal"
            >
              &times;
            </button>
            <h2 className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-extrabold text-center mb-4 xs:mb-6 sm:mb-8 bg-gradient-to-r from-indigo-300 via-purple-300 to-emerald-300 bg-clip-text text-transparent relative z-10">
              JobPsych Tools & Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-4 lg:gap-6 relative z-10">
              <div className="bg-gradient-to-br from-emerald-900/60 via-emerald-800/60 to-green-900/60 rounded-xl xs:rounded-2xl p-3 xs:p-4 sm:p-4 lg:p-6 shadow-xl border border-emerald-700/60 flex flex-col transform hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/20 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-green-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl xs:rounded-2xl"></div>

                <h3 className="text-sm xs:text-base sm:text-base lg:text-lg font-bold text-emerald-300 mb-2 xs:mb-3 sm:mb-3 lg:mb-4 flex items-center gap-1 xs:gap-2 relative z-10">
                  Role Suggestions
                </h3>
                <ul className="space-y-1 xs:space-y-2 sm:space-y-2 lg:space-y-3 relative z-10">
                  {roleSuggestionsFeatures.slice(0, 4).map((f, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 xs:gap-3 group/item"
                    >
                      <span className="text-sm xs:text-base sm:text-base lg:text-lg flex-shrink-0 transition-transform duration-300 group-hover/item:scale-110">
                        {f.icon}
                      </span>
                      <div>
                        <div className="font-semibold text-xs xs:text-sm sm:text-sm lg:text-sm text-emerald-200 group-hover/item:text-emerald-100 transition-colors duration-300">
                          {f.title}
                        </div>
                        <div className="text-slate-300 text-xs xs:text-xs sm:text-xs lg:text-xs leading-tight group-hover/item:text-slate-200 transition-colors duration-300">
                          {f.description}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-purple-900/60 via-purple-800/60 to-pink-900/60 rounded-xl xs:rounded-2xl p-3 xs:p-4 sm:p-4 lg:p-6 shadow-xl border border-purple-700/60 flex flex-col transform hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl xs:rounded-2xl"></div>

                <h3 className="text-sm xs:text-base sm:text-base lg:text-lg font-bold text-purple-300 mb-2 xs:mb-3 sm:mb-3 lg:mb-4 flex items-center gap-1 xs:gap-2 relative z-10">
                  ATS Analyzer
                </h3>
                <ul className="space-y-1 xs:space-y-2 sm:space-y-2 lg:space-y-3 relative z-10">
                  {atsAnalyzerFeatures.slice(0, 4).map((f, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 xs:gap-3 group/item"
                    >
                      <span className="text-sm xs:text-base sm:text-base lg:text-lg flex-shrink-0 transition-transform duration-300 group-hover/item:scale-110">
                        {f.icon}
                      </span>
                      <div>
                        <div className="font-semibold text-xs xs:text-sm sm:text-sm lg:text-sm text-purple-200 group-hover/item:text-purple-100 transition-colors duration-300">
                          {f.title}
                        </div>
                        <div className="text-slate-300 text-xs xs:text-xs sm:text-xs lg:text-xs leading-tight group-hover/item:text-slate-200 transition-colors duration-300">
                          {f.description}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-blue-900/60 via-blue-800/60 to-cyan-900/60 rounded-xl xs:rounded-2xl p-3 xs:p-4 sm:p-4 lg:p-6 shadow-xl border border-blue-700/60 flex flex-col transform hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl xs:rounded-2xl"></div>

                <h3 className="text-sm xs:text-base sm:text-base lg:text-lg font-bold text-blue-300 mb-2 xs:mb-3 sm:mb-3 lg:mb-4 flex items-center gap-1 xs:gap-2 relative z-10">
                  InterviewPrep AI
                </h3>
                <ul className="space-y-1 xs:space-y-2 sm:space-y-2 lg:space-y-3 relative z-10">
                  {interviewPrepFeatures.slice(0, 4).map((f, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 xs:gap-3 group/item"
                    >
                      <span className="text-sm xs:text-base sm:text-base lg:text-lg flex-shrink-0 transition-transform duration-300 group-hover/item:scale-110">
                        {f.icon}
                      </span>
                      <div>
                        <div className="font-semibold text-xs xs:text-sm sm:text-sm lg:text-sm text-blue-200 group-hover/item:text-blue-100 transition-colors duration-300">
                          {f.title}
                        </div>
                        <div className="text-slate-300 text-xs xs:text-xs sm:text-xs lg:text-xs leading-tight group-hover/item:text-slate-200 transition-colors duration-300">
                          {f.description}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-yellow-900/60 via-orange-800/60 to-red-900/60 rounded-xl xs:rounded-2xl p-3 xs:p-4 sm:p-4 lg:p-6 shadow-xl border border-yellow-700/60 flex flex-col transform hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-500/20 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-orange-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl xs:rounded-2xl"></div>

                <h3 className="text-sm xs:text-base sm:text-base lg:text-lg font-bold text-yellow-300 mb-2 xs:mb-3 sm:mb-3 lg:mb-4 flex items-center gap-1 xs:gap-2 relative z-10">
                  HireDisk
                </h3>
                <ul className="space-y-1 xs:space-y-2 sm:space-y-2 lg:space-y-3 relative z-10">
                  {hrSuggestions.slice(0, 4).map((f, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 xs:gap-3 group/item"
                    >
                      <span className="text-sm xs:text-base sm:text-base lg:text-lg flex-shrink-0 transition-transform duration-300 group-hover/item:scale-110">
                        {f.icon}
                      </span>
                      <div>
                        <div className="font-semibold text-xs xs:text-sm sm:text-sm lg:text-sm text-yellow-200 group-hover/item:text-yellow-100 transition-colors duration-300">
                          {f.title}
                        </div>
                        <div className="text-slate-300 text-xs xs:text-xs sm:text-xs lg:text-xs leading-tight group-hover/item:text-slate-200 transition-colors duration-300">
                          {f.description}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
