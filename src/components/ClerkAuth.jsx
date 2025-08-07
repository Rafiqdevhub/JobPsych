import React, { useEffect } from "react";
import {
  SignIn,
  SignUp,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  useUser,
} from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import NavigationButton from "./NavigationButton";
import { useUserManager } from "../hooks/useUserManager";

const ClerkAuth = ({ mode = "signIn" }) => {
  const { isSignedIn } = useUser();
  const { isBackendSynced, isSyncing } = useUserManager();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn && isBackendSynced && !isSyncing) {
      const redirectToPayment = localStorage.getItem("redirectToPayment");
      const selectedPlan = localStorage.getItem("selectedPlan");

      if (redirectToPayment === "true" && selectedPlan) {
        localStorage.removeItem("redirectToPayment");

        navigate(`/payment?plan=${selectedPlan}`);
      }
    }
  }, [isSignedIn, isBackendSynced, isSyncing, navigate]);

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center bg-gradient-to-b from-indigo-50 to-white px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {mode === "signIn"
            ? "Sign in to your account"
            : "Create your account"}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {mode === "signIn" ? (
          <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" />
        ) : (
          <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" />
        )}

        <div className="mt-10 text-center">
          <div className="mb-6 relative z-10">
            <NavigationButton
              to="/"
              className="inline-flex items-center gap-2 bg-blue-600 px-5 py-3 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              aria-label="Back to home page"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Back to Home</span>
            </NavigationButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProtectedRoute = ({ children }) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export default ClerkAuth;
