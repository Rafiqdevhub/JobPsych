import React, { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import ToastProvider from "@components/toast/ToastManager.jsx";
import ErrorBoundary from "@components/error/ErrorBoundary.jsx";
import PageLoader from "@components/loading/PageLoader.jsx";
import "@utils/performanceMonitor.js";

// Debug logging for WebKit issues
const isWebKit =
  navigator.userAgent.includes("WebKit") &&
  !navigator.userAgent.includes("Chrome");
if (isWebKit) {
  console.warn("WebKit detected, applying compatibility fixes");

  // WebKit-specific initialization
  const ensureBodyHeight = () => {
    document.body.style.minHeight = "100vh";
    document.body.style.height = "auto";
    document.documentElement.style.height = "100%";

    // Force layout recalculation
    document.body.offsetHeight;
  };

  // Apply immediately and after DOM ready
  ensureBodyHeight();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ensureBodyHeight);
  }

  // Force React to render in WebKit
  const forceWebKitRender = () => {
    const root = document.getElementById("root");
    if (root && root.children.length === 0) {
      console.warn("WebKit: Forcing React render...");
      // Add a small delay to ensure scripts are loaded
      setTimeout(() => {
        if (root.children.length === 0) {
          // Create a simple loading message
          root.innerHTML =
            '<div style="padding: 20px; text-align: center; font-family: Arial, sans-serif;"><h2>JobPsych</h2><p>Loading application...</p></div>';
        }
      }, 1000);
    }
  };

  // Apply after scripts load
  window.addEventListener("load", forceWebKitRender);
}

const NotFound = lazy(() => import("@pages/NotFound.jsx"));
const ATSAnalyzer = lazy(() => import("@pages/ATSAnalyzer.jsx"));
const LandingPage = lazy(() => import("@pages/LandingPage.jsx"));
const RoleSuggestion = lazy(() => import("@pages/RoleSuggestion.jsx"));
const InterviewPrepAI = lazy(() => import("@pages/InterviewPrepAI.jsx"));
const PrivacyPolicy = lazy(() => import("@pages/PrivacyPolicy.jsx"));
const TermsOfService = lazy(() => import("@pages/TermsOfService.jsx"));
const SecurityAuditDashboard = lazy(() =>
  import("@components/security/SecurityAuditDashboard.jsx")
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <LandingPage />
          </Suspense>
        ),
      },
      {
        path: "role-suggestions",
        element: (
          <Suspense fallback={<PageLoader />}>
            <RoleSuggestion />
          </Suspense>
        ),
      },
      {
        path: "interview-prepai",
        element: (
          <Suspense fallback={<PageLoader />}>
            <InterviewPrepAI />
          </Suspense>
        ),
      },
      {
        path: "ats-analyzer",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ATSAnalyzer />
          </Suspense>
        ),
      },
      {
        path: "privacy-policy",
        element: (
          <Suspense fallback={<PageLoader />}>
            <PrivacyPolicy />
          </Suspense>
        ),
      },
      {
        path: "terms-of-service",
        element: (
          <Suspense fallback={<PageLoader />}>
            <TermsOfService />
          </Suspense>
        ),
      },
      {
        path: "security-audit",
        element: (
          <Suspense fallback={<PageLoader />}>
            <SecurityAuditDashboard />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<PageLoader />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
]);

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <ErrorBoundary>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </ErrorBoundary>
  </StrictMode>
);
