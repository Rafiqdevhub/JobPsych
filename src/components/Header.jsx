import React from "react";
import NavigationButton from "./NavigationButton";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const Header = ({ scrollToContact, scrollToPricing }) => {
  return (
    <header className="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-md shadow-lg py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between bg-gradient-to-r from-white/90 to-indigo-50/60 rounded-xl border border-indigo-100/30 shadow-lg shadow-indigo-100/20 backdrop-blur-md px-6 py-3 hover:shadow-xl hover:border-blue-200/30 transition-all duration-300">
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
              className="px-4 py-2 text-sm font-medium text-purple-600 bg-gradient-to-r from-purple-100 to-indigo-100 hover:from-purple-200 hover:to-indigo-200 rounded-lg transition-all duration-300 cursor-pointer shadow hover:shadow-md border-none"
            >
              Pricing
            </button>
            <button
              type="button"
              onClick={scrollToContact}
              className="px-4 py-2 text-sm font-medium text-indigo-600 bg-gradient-to-r from-indigo-100 to-purple-100 hover:from-indigo-200 hover:to-purple-200 rounded-lg transition-all duration-300 cursor-pointer shadow hover:shadow-md border-none"
            >
              Contact
            </button>
            <div className="flex items-center space-x-2">
              <SignedIn>
                <UserButton
                  userProfileMode="modal"
                  userProfileUrl="/user-profile"
                  appearance={{
                    elements: {
                      userButtonAvatarBox:
                        "w-8 h-8 border-2 border-indigo-200 hover:border-indigo-400 transition-all",
                    },
                  }}
                />
              </SignedIn>

              <SignedOut>
                <SignInButton mode="modal">
                  <button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
