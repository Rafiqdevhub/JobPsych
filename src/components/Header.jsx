import React from "react";
import NavigationButton from "./NavigationButton";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const Header = () => {
  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for fixed header
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-md shadow-lg py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between bg-gradient-to-r from-white/90 to-indigo-50/60 rounded-xl border border-indigo-100/30 shadow-lg shadow-indigo-100/20 backdrop-blur-md px-6 py-3 hover:shadow-xl hover:border-blue-200/30 transition-all duration-300">
          <NavigationButton
            to="/"
            className="flex items-center space-x-4 bg-transparent border-0 group"
          >
            <div className="flex items-center relative overflow-visible">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-md opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

              <div className="relative z-10 flex justify-center items-center h-14 w-14 p-1 transition-all duration-300">
                <img
                  src="/logo.png"
                  alt="JobPsych Logo"
                  className="h-14 w-14 object-contain transform transition-all duration-300 group-hover:scale-105"
                />
              </div>

              <h1 className="ml-3 text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-500 to-blue-600 bg-clip-text text-transparent transition-all duration-300 tracking-tight">
                JobPsych
              </h1>

              <div className="absolute -bottom-1 left-14 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </NavigationButton>
          <div className="flex items-center space-x-6">
            <nav className="hidden lg:flex items-center space-x-1">
              <button
                onClick={() => scrollToSection("features")}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50/50 rounded-lg transition-all duration-300 cursor-pointer relative group"
              >
                <span className="relative z-10">Features</span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              <button
                onClick={() => scrollToSection("pricing")}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50/50 rounded-lg transition-all duration-300 cursor-pointer relative group"
              >
                <span className="relative z-10">Pricing</span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </nav>

            <div className="flex space-x-3">
              <SignedIn>
                <NavigationButton
                  to="/dashboard"
                  className="px-5 py-2 text-sm font-medium text-gray-700 hover:text-white border border-transparent hover:border-indigo-500 hover:bg-indigo-600 rounded-md transition-all duration-300 cursor-pointer"
                >
                  Dashboard
                </NavigationButton>
              </SignedIn>

              <SignedOut>
                <SignInButton mode="modal">
                  <button className="px-5 py-2 text-sm font-medium rounded-md bg-indigo-600 text-white shadow-md hover:shadow-lg hover:bg-indigo-700 border border-indigo-500/30 transition-all duration-300 cursor-pointer">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <UserButton
                  userProfileMode="modal"
                  userProfileUrl="/user-profile"
                  appearance={{
                    elements: {
                      userButtonAvatarBox:
                        "w-9 h-9 border-2 border-indigo-100 hover:border-indigo-300 transition-all",
                    },
                  }}
                />
              </SignedIn>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-r from-indigo-200/10 to-purple-200/5 rounded-full blur-3xl -z-10"></div>
      </div>
    </header>
  );
};

export default Header;
