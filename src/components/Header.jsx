import React, { useEffect, useState } from "react";
import NavigationButton from "./NavigationButton";
import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";

const Header = ({ scrollToContact, scrollToPricing }) => {
  const [scrolled, setScrolled] = useState(false);
  const { isSignedIn } = useUser();

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
                onClick={scrollToPricing}
                className="px-6 py-3 text-base font-semibold text-purple-700 bg-gradient-to-r from-purple-100 to-indigo-100 hover:from-purple-200 hover:to-indigo-200 rounded-xl transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl border-none"
                style={{ minWidth: "120px" }}
              >
                Pricing
              </button>
              <button
                type="button"
                onClick={scrollToContact}
                className="px-6 py-3 text-base font-semibold text-indigo-700 bg-gradient-to-r from-indigo-100 to-purple-100 hover:from-indigo-200 hover:to-purple-200 rounded-xl transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl border-none"
                style={{ minWidth: "120px" }}
              >
                Contact
              </button>
              {/* Clerk Auth Buttons */}
              {!isSignedIn ? (
                <SignInButton
                  mode="modal"
                  afterSignInUrl="/"
                  afterSignUpUrl="/"
                >
                  <button
                    type="button"
                    className="px-5 py-2 text-base font-semibold rounded-xl transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl border-none focus:outline-none bg-gradient-to-r from-green-100 to-blue-100 text-blue-700 hover:from-green-200 hover:to-blue-200"
                    style={{ minWidth: "100px" }}
                  >
                    Sign In
                  </button>
                </SignInButton>
              ) : (
                <div className="flex items-center space-x-2">
                  <UserButton />
                </div>
              )}
              {/* Up Arrow Button*/}
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
                  >
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
    </>
  );
};

export default Header;
