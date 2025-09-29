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
  const [showContact, setShowContact] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

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

  const handleContactChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setShowContact(false);
      setContactForm({ name: "", email: "", message: "" });
    }, 2000);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {!scrolled && (
        <div
          className="fixed w-full top-0 left-0 z-40 h-[56px] xs:h-[64px] sm:h-[72px] md:h-[80px] pointer-events-none"
          style={{
            background: "#0f172a", // slate-900
            opacity: 1,
          }}
        />
      )}
      <header
        className={`fixed w-full top-0 z-50 py-1 xs:py-2 sm:py-3 transition-all duration-300 ${
          scrolled ? "backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-2 xs:px-3 sm:px-4 lg:px-8">
          <div
            className={`flex items-center justify-between rounded-lg xs:rounded-xl px-2 xs:px-3 sm:px-4 md:px-6 py-2 xs:py-2.5 sm:py-3 transition-all duration-300
              ${
                scrolled
                  ? "bg-slate-800/90 backdrop-blur-md hover:shadow-xl border border-slate-700"
                  : "bg-slate-800/50 backdrop-blur-sm border border-slate-700/50"
              }
            `}
          >
            <NavigationButton
              to="/"
              className="flex items-center space-x-1.5 xs:space-x-2 sm:space-x-3 bg-transparent border-0 group flex-shrink-0"
            >
              <div className="flex items-center relative overflow-visible cursor-pointer">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-md opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="relative z-10 flex justify-center items-center h-8 w-8 xs:h-9 xs:w-9 sm:h-10 sm:w-10 md:h-12 md:w-12 p-0.5 xs:p-1 transition-all duration-300">
                  <img
                    src="/logo.png"
                    alt="JobPsych Logo"
                    className="h-7 w-7 xs:h-8 xs:w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 object-contain transform transition-all duration-300 group-hover:scale-105"
                  />
                </div>
                <h1 className="ml-1.5 xs:ml-2 text-lg xs:text-xl sm:text-2xl font-bold text-indigo-400 transition-all duration-300 tracking-tight cursor-pointer">
                  <span className="hidden xs:inline">JobPsych</span>
                  <span className="xs:hidden">JobPsych</span>
                </h1>
              </div>
            </NavigationButton>

            <div className="hidden md:flex items-center space-x-1.5 xs:space-x-2 sm:space-x-3 lg:space-x-4 flex-shrink-0">
              <button
                type="button"
                onClick={() => setShowFeatures(true)}
                className="px-3 xs:px-4 sm:px-5 lg:px-6 py-1.5 xs:py-2 sm:py-2.5 lg:py-3 text-xs xs:text-sm sm:text-base font-semibold text-emerald-200 bg-emerald-800/70 hover:bg-emerald-700/80 rounded-lg xs:rounded-xl transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg border-none"
              >
                <span className="hidden sm:inline">Features</span>
                <span className="sm:hidden">🧩</span>
              </button>

              <button
                type="button"
                onClick={() => setShowContact(true)}
                className="px-3 xs:px-4 sm:px-5 lg:px-6 py-1.5 xs:py-2 sm:py-2.5 lg:py-3 text-xs xs:text-sm sm:text-base font-semibold text-indigo-200 bg-indigo-800/70 hover:bg-indigo-700/80 rounded-lg xs:rounded-xl transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg border-none"
              >
                <span className="hidden sm:inline">Contact</span>
                <span className="sm:hidden">✉️</span>
              </button>

              {scrolled && (
                <button
                  type="button"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="ml-1 xs:ml-2 p-1.5 xs:p-2 rounded-full bg-indigo-800/70 hover:bg-indigo-700/80 shadow-md transition-all duration-300 cursor-pointer border-none flex items-center justify-center"
                  aria-label="Scroll to top"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-4 w-4 xs:h-5 xs:w-5 text-indigo-200"
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

            <div className="md:hidden flex items-center relative">
              <button
                id="mobile-nav-hamburger"
                type="button"
                aria-label="Open mobile menu"
                className="p-1.5 xs:p-2 rounded-lg xs:rounded-xl bg-indigo-800/70 shadow-md border-none flex items-center justify-center hover:bg-indigo-700/80 transition-colors duration-300"
                onClick={() => setMobileDropdownOpen((open) => !open)}
              >
                <svg
                  className="h-5 w-5 xs:h-6 xs:w-6 text-indigo-200"
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
                  className="absolute top-10 xs:top-12 right-0 w-48 xs:w-56 bg-slate-800 rounded-lg xs:rounded-xl shadow-xl border border-slate-700 py-2 xs:py-4 z-50 animate-fade-in-up"
                >
                  <nav className="flex flex-col gap-1 xs:gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowFeatures(true);
                        setMobileDropdownOpen(false);
                      }}
                      className="flex items-center gap-2 xs:gap-3 px-3 xs:px-4 py-2 xs:py-2.5 text-sm xs:text-base font-semibold text-emerald-200 bg-emerald-800/70 rounded-md xs:rounded-lg hover:bg-emerald-700/80 transition-all mx-2"
                    >
                      <span className="text-sm xs:text-base">Features</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setShowContact(true);
                        setMobileDropdownOpen(false);
                      }}
                      className="flex items-center gap-2 xs:gap-3 px-3 xs:px-4 py-2 xs:py-2.5 text-sm xs:text-base font-semibold text-indigo-200 bg-indigo-800/70 rounded-md xs:rounded-lg hover:bg-indigo-700/80 transition-all mx-2"
                    >
                      <span className="text-sm xs:text-base">Contact</span>
                    </button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {showFeatures && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm px-2 xs:px-4">
          <div className="bg-slate-800 rounded-2xl xs:rounded-3xl shadow-2xl p-3 xs:p-4 sm:p-6 lg:p-8 max-w-sm xs:max-w-md sm:max-w-4xl lg:max-w-6xl w-full relative animate-fade-in-up overflow-y-auto max-h-[90vh] border border-slate-700">
            <button
              className="absolute top-3 xs:top-4 right-3 xs:right-4 text-slate-400 hover:text-slate-200 text-xl xs:text-2xl font-bold focus:outline-none cursor-pointer"
              onClick={() => setShowFeatures(false)}
              aria-label="Close features modal"
            >
              &times;
            </button>
            <h2 className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-extrabold text-center mb-4 xs:mb-6 sm:mb-8 text-indigo-300">
              JobPsych Tools & Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-4 lg:gap-6">
              <div className="bg-gradient-to-br from-emerald-900/50 to-blue-900/50 rounded-xl xs:rounded-2xl p-3 xs:p-4 sm:p-4 lg:p-6 shadow-xl border border-emerald-700/50 flex flex-col">
                <h3 className="text-sm xs:text-base sm:text-base lg:text-lg font-bold text-emerald-300 mb-2 xs:mb-3 sm:mb-3 lg:mb-4 flex items-center gap-1 xs:gap-2">
                  Role Suggestions
                </h3>
                <ul className="space-y-1 xs:space-y-2 sm:space-y-2 lg:space-y-3">
                  {roleSuggestionsFeatures.slice(0, 4).map((f, i) => (
                    <li key={i} className="flex items-start gap-2 xs:gap-3">
                      <span className="text-sm xs:text-base sm:text-base lg:text-lg flex-shrink-0">
                        {f.icon}
                      </span>
                      <div>
                        <div className="font-semibold text-xs xs:text-sm sm:text-sm lg:text-sm text-emerald-200">
                          {f.title}
                        </div>
                        <div className="text-slate-300 text-xs xs:text-xs sm:text-xs lg:text-xs leading-tight">
                          {f.description}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 rounded-xl xs:rounded-2xl p-3 xs:p-4 sm:p-4 lg:p-6 shadow-xl border border-blue-700/50 flex flex-col">
                <h3 className="text-sm xs:text-base sm:text-base lg:text-lg font-bold text-blue-300 mb-2 xs:mb-3 sm:mb-3 lg:mb-4 flex items-center gap-1 xs:gap-2">
                  InterviewPrep AI
                </h3>
                <ul className="space-y-1 xs:space-y-2 sm:space-y-2 lg:space-y-3">
                  {interviewPrepFeatures.slice(0, 4).map((f, i) => (
                    <li key={i} className="flex items-start gap-2 xs:gap-3">
                      <span className="text-sm xs:text-base sm:text-base lg:text-lg flex-shrink-0">
                        {f.icon}
                      </span>
                      <div>
                        <div className="font-semibold text-xs xs:text-sm sm:text-sm lg:text-sm text-blue-200">
                          {f.title}
                        </div>
                        <div className="text-slate-300 text-xs xs:text-xs sm:text-xs lg:text-xs leading-tight">
                          {f.description}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-xl xs:rounded-2xl p-3 xs:p-4 sm:p-4 lg:p-6 shadow-xl border border-purple-700/50 flex flex-col">
                <h3 className="text-sm xs:text-base sm:text-base lg:text-lg font-bold text-purple-300 mb-2 xs:mb-3 sm:mb-3 lg:mb-4 flex items-center gap-1 xs:gap-2">
                  ATS Analyzer
                </h3>
                <ul className="space-y-1 xs:space-y-2 sm:space-y-2 lg:space-y-3">
                  {atsAnalyzerFeatures.slice(0, 4).map((f, i) => (
                    <li key={i} className="flex items-start gap-2 xs:gap-3">
                      <span className="text-sm xs:text-base sm:text-base lg:text-lg flex-shrink-0">
                        {f.icon}
                      </span>
                      <div>
                        <div className="font-semibold text-xs xs:text-sm sm:text-sm lg:text-sm text-purple-200">
                          {f.title}
                        </div>
                        <div className="text-slate-300 text-xs xs:text-xs sm:text-xs lg:text-xs leading-tight">
                          {f.description}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-yellow-900/50 to-orange-900/50 rounded-xl xs:rounded-2xl p-3 xs:p-4 sm:p-4 lg:p-6 shadow-xl border border-yellow-700/50 flex flex-col">
                <h3 className="text-sm xs:text-base sm:text-base lg:text-lg font-bold text-yellow-300 mb-2 xs:mb-3 sm:mb-3 lg:mb-4 flex items-center gap-1 xs:gap-2">
                  HireDisk
                </h3>
                <ul className="space-y-1 xs:space-y-2 sm:space-y-2 lg:space-y-3">
                  {hrSuggestions.slice(0, 4).map((f, i) => (
                    <li key={i} className="flex items-start gap-2 xs:gap-3">
                      <span className="text-sm xs:text-base sm:text-base lg:text-lg flex-shrink-0">
                        {f.icon}
                      </span>
                      <div>
                        <div className="font-semibold text-xs xs:text-sm sm:text-sm lg:text-sm text-yellow-200">
                          {f.title}
                        </div>
                        <div className="text-slate-300 text-xs xs:text-xs sm:text-xs lg:text-xs leading-tight">
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

      {showContact && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm px-2 xs:px-4">
          <div className="bg-indigo-600 rounded-2xl xs:rounded-3xl shadow-2xl p-3 xs:p-4 sm:p-6 lg:p-10 text-white relative overflow-hidden max-w-sm xs:max-w-md sm:max-w-2xl lg:max-w-3xl w-full animate-fade-in-up">
            <div className="absolute right-0 top-0 w-16 h-16 xs:w-20 xs:h-20 sm:w-32 sm:h-32 bg-gradient-to-br from-yellow-200/40 to-pink-200/10 rounded-full blur-2xl opacity-60 -z-10"></div>
            <div className="absolute left-0 bottom-0 w-20 h-20 xs:w-24 xs:h-24 sm:w-40 sm:h-40 bg-gradient-to-tr from-emerald-200/40 to-teal-200/10 rounded-full blur-2xl opacity-60 -z-10"></div>

            <button
              className="absolute top-3 xs:top-4 right-3 xs:right-4 text-white/80 hover:text-white text-xl xs:text-2xl font-bold focus:outline-none cursor-pointer"
              onClick={() => setShowContact(false)}
              aria-label="Close contact modal"
            >
              &times;
            </button>

            <div className="flex flex-col items-center justify-center gap-3 xs:gap-4 sm:gap-6">
              <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 xs:mb-2 text-white drop-shadow-lg text-center">
                Get in Touch With Us
              </h2>

              <p className="text-sm xs:text-base sm:text-lg text-white/90 mb-3 xs:mb-4 max-w-xs xs:max-w-sm sm:max-w-xl text-center leading-relaxed">
                Have questions about Role Suggestions, InterviewPrep AI, ATS
                Analyzer, or HireDisk? Need enterprise solutions or want to
                learn more about our AI-powered tools? Our team is here to help
                you succeed.
              </p>

              {contactSubmitted ? (
                <div className="text-green-200 text-center font-semibold py-6 xs:py-8 text-base xs:text-lg sm:text-xl bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-inner w-full">
                  <div className="inline-flex items-center justify-center w-10 h-10 xs:w-12 xs:h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full mb-3 xs:mb-4">
                    <span className="text-2xl xs:text-3xl sm:text-4xl">✉️</span>
                  </div>
                  <h3 className="text-white text-lg xs:text-xl sm:text-2xl font-bold mb-1 xs:mb-2">
                    Thank you!
                  </h3>
                  <p className="text-white/90 text-sm xs:text-base">
                    We'll contact you soon.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleContactSubmit}
                  className="space-y-3 xs:space-y-4 sm:space-y-5 bg-white/10 rounded-2xl p-3 xs:p-4 sm:p-6 lg:p-8 shadow-xl w-full"
                >
                  <div>
                    <label className="block text-xs xs:text-sm font-medium text-white mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={contactForm.name}
                      onChange={handleContactChange}
                      required
                      className="w-full rounded-lg border border-slate-600 px-3 py-2 xs:py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-slate-700/80 text-slate-100 placeholder-slate-400 hover:border-slate-500 transition-all duration-300 text-sm xs:text-base"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs xs:text-sm font-medium text-white mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleContactChange}
                      required
                      className="w-full rounded-lg border border-slate-600 px-3 py-2 xs:py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-slate-700/80 text-slate-100 placeholder-slate-400 hover:border-slate-500 transition-all duration-300 text-sm xs:text-base"
                      placeholder="you@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs xs:text-sm font-medium text-white mb-1">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={contactForm.message}
                      onChange={handleContactChange}
                      required
                      rows={3}
                      className="w-full rounded-lg border border-slate-600 px-3 py-2 xs:py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-slate-700/80 text-slate-100 placeholder-slate-400 hover:border-slate-500 transition-all duration-300 resize-none text-sm xs:text-base"
                      placeholder="Tell us about your career goals, interview preparation needs, or hiring requirements..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white font-semibold py-2.5 xs:py-3 rounded-lg shadow hover:bg-indigo-700 transition-all cursor-pointer text-sm xs:text-base sm:text-lg transform hover:scale-[1.02]"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
