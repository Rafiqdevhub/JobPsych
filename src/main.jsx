import React, { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import ToastProvider from "@components/toast/ToastManager.jsx";
import ErrorBoundary from "@components/error/ErrorBoundary.jsx";
import "@utils/performanceMonitor.js";

const NotFound = lazy(() => import("@pages/NotFound.jsx"));
const ATSAnalyzer = lazy(() => import("@pages/ATSAnalyzer.jsx"));
const LandingPage = lazy(() => import("@pages/LandingPage.jsx"));
const RoleSuggestion = lazy(() => import("@pages/RoleSuggestion.jsx"));
const InterviewPrepAI = lazy(() => import("@pages/InterviewPrepAI.jsx"));
const HireDisk = lazy(() => import("@pages/HireDisk"));
const PrivacyPolicy = lazy(() => import("@pages/PrivacyPolicy.jsx"));
const TermsOfService = lazy(() => import("@pages/TermsOfService.jsx"));

// Loading component for Suspense fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-900">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-400 mx-auto mb-4"></div>
      <p className="text-gray-300">Loading...</p>
    </div>
  </div>
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
        path: "hiredisk",
        element: (
          <Suspense fallback={<PageLoader />}>
            <HireDisk />
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
