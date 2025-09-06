import React, { useEffect, useState } from "react";
import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { useUserManager } from "@hooks/useUserManager";
import {
  roleSuggestionsFeatures,
  interviewPrepFeatures,
} from "@data/roleSuggetionsFeatures";
import { hrSuggestions } from "@data/hireSuggestions";
import NavigationButton from "@components/buttons/NavigationButton";

function Header({ scrollToPricing }) {
  const [scrolled, setScrolled] = useState(false);
  const { isSignedIn } = useUser();
  const { userPlan, isPro, isBackendSynced } = useUserManager();
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
          className="fixed w-full top-0 left-0 z-40 h-[64px] sm:h-[80px] pointer-events-none"
          style={{
            background: "#ebf8ff",
            opacity: 1,
          }}
        />
      )}
      <header
        className={`fixed w-full top-0 z-50 py-2 sm:py-3 transition-all duration-300 ${
          scrolled ? "backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div
            className={`flex flex-wrap items-center justify-between rounded-xl px-2 sm:px-6 py-2 sm:py-3 transition-all duration-300
              ${
                scrolled
                  ? "bg-white/90 backdrop-blur-md hover:shadow-xl"
                  : "bg-transparent"
              }
            `}
          >
            <NavigationButton
              to="/"
              className="flex items-center space-x-2 sm:space-x-3 bg-transparent border-0 group"
            >
              <div className="flex items-center relative overflow-visible cursor-pointer">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-md opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="relative z-10 flex justify-center items-center h-10 w-10 sm:h-12 sm:w-12 p-1 transition-all duration-300">
                  <img
                    src="/logo.png"
                    alt="JobPsych Logo"
                    className="h-10 w-10 sm:h-12 sm:w-12 object-contain transform transition-all duration-300 group-hover:scale-105"
                  />
                </div>
                <h1 className="ml-2 text-xl sm:text-2xl font-bold text-indigo-600 transition-all duration-300 tracking-tight cursor-pointer">
                  JobPsych
                </h1>
              </div>
            </NavigationButton>

            <div className="hidden md:block flex-1 text-center mx-2 sm:mx-8">
              <p className="text-xs sm:text-sm text-gray-600 font-medium italic">
                Free career guidance, AI interview practice, and smart hiring
                tools
                <br className="hidden sm:block" />
                JobPsych empowers your next move.
              </p>
            </div>

            <div className="hidden sm:flex items-center space-x-2 sm:space-x-4">
              <button
                type="button"
                onClick={() => setShowFeatures(true)}
                className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-xl transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl border-none"
                style={{ minWidth: "90px" }}
              >
                Features
              </button>
              <button
                type="button"
                onClick={scrollToPricing}
                className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold text-purple-700 bg-purple-100 hover:bg-purple-200 rounded-xl transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl border-none"
                style={{ minWidth: "90px" }}
              >
                Pricing
              </button>
              <button
                type="button"
                onClick={() => setShowContact(true)}
                className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold text-indigo-700 bg-indigo-100 hover:bg-indigo-200 rounded-xl transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl border-none"
                style={{ minWidth: "90px" }}
              >
                Contact
              </button>
              {!isSignedIn ? (
                <SignInButton mode="modal">
                  <button
                    type="button"
                    className="px-4 sm:px-5 py-2 text-sm sm:text-base font-semibold rounded-xl transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl border-none focus:outline-none bg-green-100 text-blue-700 hover:bg-green-200"
                    style={{ minWidth: "80px" }}
                  >
                    Sign In
                  </button>
                </SignInButton>
              ) : (
                <div className="flex items-center space-x-2 sm:space-x-3">
                  {isBackendSynced && (
                    <span
                      className={`px-2 sm:px-3 py-1 text-xs font-medium rounded-full ${
                        isPro
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {userPlan === "pro" ? "Pro Plan" : "Free Plan"}
                    </span>
                  )}
                  <UserButton />
                </div>
              )}
              {scrolled && (
                <button
                  type="button"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="ml-2 p-2 rounded-full bg-indigo-200 hover:bg-indigo-300 shadow-lg transition-all duration-300 cursor-pointer border-none flex items-center justify-center"
                  aria-label="Scroll to top"
                  style={{ minWidth: 0 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-6 w-6 text-indigo-700"
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

            <div className="flex sm:hidden items-center relative">
              <button
                id="mobile-nav-hamburger"
                type="button"
                aria-label="Open mobile menu"
                className="p-2 rounded-full bg-indigo-100 shadow border-none flex items-center justify-center"
                onClick={() => setMobileDropdownOpen((open) => !open)}
              >
                <svg
                  className="h-6 w-6 text-indigo-700"
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
                  className="absolute top-12 right-0 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-4 z-50 animate-fade-in-up"
                >
                  <nav className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowFeatures(true);
                        setMobileDropdownOpen(false);
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-base font-semibold text-emerald-700 bg-emerald-100 rounded-lg hover:bg-emerald-200 transition-all"
                    >
                      🧩 Features
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        scrollToPricing();
                        setMobileDropdownOpen(false);
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-base font-semibold text-purple-700 bg-purple-100 rounded-lg hover:bg-purple-200 transition-all"
                    >
                      💸 Pricing
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowContact(true);
                        setMobileDropdownOpen(false);
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-base font-semibold text-indigo-700 bg-indigo-100 rounded-lg hover:bg-indigo-200 transition-all"
                    >
                      ✉️ Contact
                    </button>
                    {!isSignedIn ? (
                      <SignInButton mode="modal">
                        <button
                          type="button"
                          className="flex items-center gap-2 px-4 py-2 text-base font-semibold rounded-lg bg-green-100 text-blue-700 hover:bg-green-200 transition-all"
                        >
                          🔑 Sign In
                        </button>
                      </SignInButton>
                    ) : (
                      <div className="flex items-center gap-2 mt-2 px-4">
                        {isBackendSynced && (
                          <span
                            className={`px-3 py-1 text-xs font-medium rounded-full ${
                              isPro
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {userPlan === "pro" ? "Pro" : "Free"}
                          </span>
                        )}
                        <UserButton />
                      </div>
                    )}
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {showFeatures && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm px-2">
          <div className="bg-white rounded-3xl shadow-2xl p-4 sm:p-8 max-w-xs sm:max-w-6xl w-full relative animate-fade-in-up overflow-y-auto max-h-[90vh]">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none cursor-pointer"
              onClick={() => setShowFeatures(false)}
              aria-label="Close features modal"
            >
              &times;
            </button>
            <h2 className="text-xl sm:text-3xl font-extrabold text-center mb-6 sm:mb-8 text-indigo-600">
              JobPsych Tools & Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
              <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-4 sm:p-6 shadow-xl border border-emerald-100 flex flex-col">
                <h3 className="text-base sm:text-2xl font-bold text-emerald-700 mb-3 sm:mb-4 flex items-center gap-2">
                  Suggestions
                </h3>
                <ul className="space-y-3 sm:space-y-4">
                  {roleSuggestionsFeatures.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 sm:gap-3">
                      <span className="text-lg sm:text-2xl">{f.icon}</span>
                      <div>
                        <div className="font-semibold text-sm sm:text-lg text-emerald-800">
                          {f.title}
                        </div>
                        <div className="text-gray-600 text-xs sm:text-base">
                          {f.description}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 sm:p-6 shadow-xl border border-blue-100 flex flex-col">
                <h3 className="text-base sm:text-2xl font-bold text-blue-700 mb-3 sm:mb-4 flex items-center gap-2">
                  InterviewPrep AI
                </h3>
                <ul className="space-y-3 sm:space-y-4">
                  {interviewPrepFeatures.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 sm:gap-3">
                      <span className="text-lg sm:text-2xl">{f.icon}</span>
                      <div>
                        <div className="font-semibold text-sm sm:text-lg text-blue-800">
                          {f.title}
                        </div>
                        <div className="text-gray-600 text-xs sm:text-base">
                          {f.description}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-4 sm:p-6 shadow-xl border border-yellow-100 flex flex-col">
                <h3 className="text-base sm:text-2xl font-bold text-yellow-700 mb-3 sm:mb-4 flex items-center gap-2">
                  HireDesk
                </h3>
                <ul className="space-y-3 sm:space-y-4">
                  {hrSuggestions.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 sm:gap-3">
                      <span className="text-lg sm:text-2xl">{f.icon}</span>
                      <div>
                        <div className="font-semibold text-sm sm:text-lg text-yellow-800">
                          {f.title}
                        </div>
                        <div className="text-gray-600 text-xs sm:text-base">
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
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm px-2">
          <div className="bg-indigo-600 rounded-3xl shadow-2xl p-4 sm:p-10 text-white relative overflow-hidden max-w-xs sm:max-w-3xl w-full animate-fade-in-up">
            <div className="absolute right-0 top-0 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-br from-yellow-200/40 to-pink-200/10 rounded-full blur-2xl opacity-60 -z-10"></div>
            <div className="absolute left-0 bottom-0 w-24 h-24 sm:w-40 sm:h-40 bg-gradient-to-tr from-emerald-200/40 to-teal-200/10 rounded-full blur-2xl opacity-60 -z-10"></div>

            <button
              className="absolute top-4 right-4 text-white/80 hover:text-white text-2xl font-bold focus:outline-none cursor-pointer"
              onClick={() => setShowContact(false)}
              aria-label="Close contact modal"
            >
              &times;
            </button>

            <div className="flex flex-col items-center justify-center gap-4 sm:gap-6">
              <h2 className="text-2xl sm:text-4xl font-bold mb-2 text-white drop-shadow-lg text-center">
                Get in Touch With Us
              </h2>

              <p className="text-base sm:text-lg text-white/90 mb-4 max-w-xs sm:max-w-xl text-center">
                Have questions about Role Suggestions, InterviewPrep AI(JobCrack
                AI), or HireDisk? Need enterprise solutions or want to learn
                more about our AI-powered tools? Our team is here to help you
                succeed.
              </p>

              {contactSubmitted ? (
                <div className="text-green-200 text-center font-semibold py-8 text-lg sm:text-xl bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-inner">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full mb-4">
                    <span className="text-3xl sm:text-4xl">✉️</span>
                  </div>
                  <h3 className="text-white text-xl sm:text-2xl font-bold mb-2">
                    Thank you!
                  </h3>
                  <p className="text-white/90">We'll contact you soon.</p>
                </div>
              ) : (
                <form
                  onSubmit={handleContactSubmit}
                  className="space-y-4 sm:space-y-5 bg-white/10 rounded-2xl p-4 sm:p-8 shadow-xl w-full"
                >
                  <div>
                    <label className="block text-sm font-medium text-white mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={contactForm.name}
                      onChange={handleContactChange}
                      required
                      className="w-full rounded-lg border border-indigo-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white/80 text-gray-900 placeholder-gray-400 hover:border-indigo-300 transition-all duration-300"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleContactChange}
                      required
                      className="w-full rounded-lg border border-indigo-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white/80 text-gray-900 placeholder-gray-400 hover:border-indigo-300 transition-all duration-300"
                      placeholder="you@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-1">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={contactForm.message}
                      onChange={handleContactChange}
                      required
                      rows={4}
                      className="w-full rounded-lg border border-indigo-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white/80 text-gray-900 placeholder-gray-400 hover:border-indigo-300 transition-all duration-300 resize-none"
                      placeholder="Tell us about your career goals, interview preparation needs, or hiring requirements..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-yellow-400 text-white font-semibold py-3 rounded-lg shadow hover:bg-yellow-500 transition-all cursor-pointer text-base sm:text-lg transform hover:scale-[1.02]"
                  >
                    Send Message
                  </button>

                  <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                    <div className="flex items-center gap-2 text-white">
                      <svg
                        className="h-5 w-5 text-yellow-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <title>Career Guidance Icon</title>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-xs sm:text-base">
                        Career Guidance
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-white">
                      <svg
                        className="h-5 w-5 text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <title>Interview Practice Icon</title>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                        />
                      </svg>
                      <span className="text-xs sm:text-base">JobCrack AI</span>
                    </div>
                    <div className="flex items-center gap-2 text-white  ">
                      <svg
                        className="h-5 w-5 text-emerald-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <title>Hiring Intelligence Icon</title>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0V8a2 2 0 01-2 2H8a2 2 0 01-2-2V6m8 0H8"
                        />
                      </svg>
                      <span className="text-xs sm:text-base">
                        Hiring Intelligence
                      </span>
                    </div>
                  </div>
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
