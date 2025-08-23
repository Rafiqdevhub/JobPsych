import React, { useEffect, useState } from "react";
import NavigationButton from "./NavigationButton";
import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { useUserManager } from "../hooks/useUserManager";
import { roleSuggestionsFeatures } from "../data/roleSuggetionsFeatures";
import { hrSuggestions } from "../data/hireSuggestions";

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

  const handleContactChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend

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
          className="fixed w-full top-0 left-0 z-40 h-[80px] pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, #ebf8ff 0%, #fff 60%, #d1fae5 100%)",
            opacity: 1,
          }}
        />
      )}
      <header
        className={`fixed w-full top-0 z-50 py-3 transition-all duration-300 ${
          scrolled ? " backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between rounded-xl px-6 py-3 transition-all duration-300
              ${
                scrolled
                  ? "bg-gradient-to-r from-white/90 to-indigo-50/60   backdrop-blur-md hover:shadow-xl "
                  : "bg-transparent "
              }
            `}
          >
            <NavigationButton
              to="/"
              className="flex items-center space-x-3 bg-transparent border-0 group"
            >
              <div className="flex items-center relative overflow-visible cursor-pointer">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-md opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

                <div className="relative z-10 flex justify-center items-center h-12 w-12 p-1 transition-all duration-300">
                  <img
                    src="/logo.png"
                    alt="JobPsych Logo"
                    className="h-12 w-12 object-contain transform transition-all duration-300 group-hover:scale-105"
                  />
                </div>
                <h1 className="ml-2 text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-500 to-blue-600 bg-clip-text text-transparent transition-all duration-300 tracking-tight cursor-pointer">
                  JobPsych
                </h1>
              </div>
            </NavigationButton>

            <div className="hidden md:block flex-1 text-center mx-8">
              <p className="text-sm text-gray-600 font-medium italic">
                Free career guidance for job seekers and smart AI hiring for HR
                teams
                <br />
                JobPsych empowers your next move.
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() => setShowFeatures(true)}
                className="px-6 py-3 text-base font-semibold text-emerald-700 bg-gradient-to-r from-emerald-100 to-blue-100 hover:from-emerald-200 hover:to-blue-200 rounded-xl transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl border-none"
                style={{ minWidth: "120px" }}
              >
                Features
              </button>
              <button
                type="button"
                onClick={scrollToPricing}
                className="px-6 py-3 text-base font-semibold text-purple-700 bg-gradient-to-r from-purple-100 to-indigo-100 hover:from-purple-200 hover:to-indigo-200 rounded-xl transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl border-none"
                style={{ minWidth: "120px" }}
              >
                Pricing
              </button>
              <button
                type="button"
                onClick={() => setShowContact(true)}
                className="px-6 py-3 text-base font-semibold text-indigo-700 bg-gradient-to-r from-indigo-100 to-purple-100 hover:from-indigo-200 hover:to-purple-200 rounded-xl transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl border-none"
                style={{ minWidth: "120px" }}
              >
                Contact
              </button>
              {!isSignedIn ? (
                <SignInButton mode="modal">
                  <button
                    type="button"
                    className="px-5 py-2 text-base font-semibold rounded-xl transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl border-none focus:outline-none bg-gradient-to-r from-green-100 to-blue-100 text-blue-700 hover:from-green-200 hover:to-blue-200"
                    style={{ minWidth: "100px" }}
                  >
                    Sign In
                  </button>
                </SignInButton>
              ) : (
                <div className="flex items-center space-x-3">
                  {isBackendSynced && (
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        isPro
                          ? "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800"
                          : "bg-gradient-to-r from-green-100 to-green-200 text-green-800"
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
                  className="ml-2 p-2 rounded-full bg-gradient-to-r from-indigo-200 to-purple-200 hover:from-indigo-300 hover:to-purple-300 shadow-lg transition-all duration-300 cursor-pointer border-none flex items-center justify-center"
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
          </div>
        </div>
      </header>

      {showFeatures && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-4xl w-full relative animate-fade-in-up">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none cursor-pointer"
              onClick={() => setShowFeatures(false)}
              aria-label="Close features modal"
            >
              &times;
            </button>
            <h2 className="text-3xl font-extrabold text-center mb-8 bg-gradient-to-r from-emerald-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Platform Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-6 shadow-xl border border-emerald-100 flex flex-col">
                <h3 className="text-2xl font-bold text-emerald-700 mb-4 flex items-center gap-2">
                  <span className="text-3xl">🧑‍💼</span> Role Suggestions
                </h3>
                <ul className="space-y-4">
                  {roleSuggestionsFeatures.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-2xl">{f.icon}</span>
                      <div>
                        <div className="font-semibold text-lg text-emerald-800">
                          {f.title}
                        </div>
                        <div className="text-gray-600 text-base">
                          {f.description}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 shadow-xl border border-yellow-100 flex flex-col">
                <h3 className="text-2xl font-bold text-yellow-700 mb-4 flex items-center gap-2">
                  <span className="text-3xl">💎</span> HireDesk
                </h3>
                <ul className="space-y-4">
                  {hrSuggestions.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-2xl">{f.icon}</span>
                      <div>
                        <div className="font-semibold text-lg text-yellow-800">
                          {f.title}
                        </div>
                        <div className="text-gray-600 text-base">
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
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-emerald-500 rounded-3xl shadow-2xl p-10 text-white relative overflow-hidden max-w-3xl w-full animate-fade-in-up">
            <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-br from-yellow-200/40 to-pink-200/10 rounded-full blur-2xl opacity-60 -z-10"></div>
            <div className="absolute left-0 bottom-0 w-40 h-40 bg-gradient-to-tr from-emerald-200/40 to-teal-200/10 rounded-full blur-2xl opacity-60 -z-10"></div>

            <button
              className="absolute top-4 right-4 text-white/80 hover:text-white text-2xl font-bold focus:outline-none cursor-pointer"
              onClick={() => setShowContact(false)}
              aria-label="Close contact modal"
            >
              &times;
            </button>

            <div className="flex flex-col items-center justify-center gap-6">
              <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white drop-shadow-lg">
                Get in Touch With Us
              </h2>

              <p className="text-lg text-white/90 mb-4 max-w-xl text-center">
                Have questions, need a custom solution, or want to learn more
                about JobPsych Premium? Our team is here to help you succeed.
              </p>

              {contactSubmitted ? (
                <div className="text-green-200 text-center font-semibold py-8 text-xl bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-inner">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                    <span className="text-4xl">✉️</span>
                  </div>
                  <h3 className="text-white text-2xl font-bold mb-2">
                    Thank you!
                  </h3>
                  <p className="text-white/90">We'll contact you soon.</p>
                </div>
              ) : (
                <form
                  onSubmit={handleContactSubmit}
                  className="space-y-5 bg-white/10 rounded-2xl p-8 shadow-xl"
                >
                  <div>
                    <label className="block text-sm font-medium text-indigo-700 mb-1">
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
                    <label className="block text-sm font-medium text-indigo-700 mb-1">
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
                    <label className="block text-sm font-medium text-indigo-700 mb-1">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={contactForm.message}
                      onChange={handleContactChange}
                      required
                      rows={4}
                      className="w-full rounded-lg border border-indigo-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white/80 text-gray-900 placeholder-gray-400 hover:border-indigo-300 transition-all duration-300 resize-none"
                      placeholder="Tell us about your needs..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold py-3 rounded-lg shadow hover:from-yellow-500 hover:to-orange-600 transition-all cursor-pointer text-lg transform hover:scale-[1.02]"
                  >
                    Send Message
                  </button>

                  <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-6">
                    <div className="flex items-center gap-2 text-indigo-700/80">
                      <svg
                        className="h-5 w-5 text-yellow-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <title>Custom Solutions Icon</title>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 12v1a4 4 0 01-4 4H8a4 4 0 01-4-4V8a4 4 0 014-4h4a4 4 0 014 4v1"
                        />
                      </svg>
                      <span>Custom AI Solutions</span>
                    </div>
                    <div className="flex items-center gap-2 text-indigo-700/80">
                      <svg
                        className="h-5 w-5 text-emerald-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <title>Support Icon</title>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3"
                        />
                      </svg>
                      <span>Dedicated Support</span>
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
