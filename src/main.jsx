import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import "./index.css";
import App from "./App.jsx";
import DashboardWrapper from "@components/dashboard/DashboardWrapper.jsx";
import PaymentPage from "@components/payment/PaymentPage.jsx";
import ClerkAuth from "@components/clerk/ClerkAuth.jsx";
import ToastProvider from "@components/toast/ToastManager.jsx";
import ErrorBoundary from "@components/error/ErrorBoundary.jsx";
import NotFound from "@pages/NotFound.jsx";
import ATSAnalyzer from "@pages/ATSAnalyzer.jsx";
import LandingPage from "@pages/LandingPage.jsx";
import RoleSuggestion from "@pages/RoleSuggestion.jsx";
import InterviewPrepAI from "@pages/InterviewPrepAI.jsx";
import HireDisk from "@pages/HireDisk";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },

      {
        path: "dashboard",
        element: <RoleSuggestion />,
      },
      {
        path: "premium-dashboard",
        element: <DashboardWrapper />,
      },
      {
        path: "sign-in/*",
        element: <ClerkAuth mode="signIn" />,
      },
      {
        path: "sign-up/*",
        element: <ClerkAuth mode="signUp" />,
      },
      {
        path: "payment",
        element: <PaymentPage />,
      },
      {
        path: "interview-prep-ai",
        element: <InterviewPrepAI />,
      },
      {
        path: "ats-analyzer",
        element: <ATSAnalyzer />,
      },
      {
        path: "hire-disk",
        element: <HireDisk />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <ErrorBoundary>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </ClerkProvider>
    </ErrorBoundary>
  </StrictMode>
);
