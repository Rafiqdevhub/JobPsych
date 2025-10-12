import React, { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import ToastProvider from "@components/toast/ToastManager.jsx";
import ErrorBoundary from "@components/error/ErrorBoundary.jsx";
import PageLoader from "@components/loading/PageLoader.jsx";
import "@utils/performanceMonitor.js";

const NotFound = lazy(() => import("@pages/NotFound.jsx"));
const ATSAnalyzer = lazy(() => import("@pages/ATSAnalyzer.jsx"));
const LandingPage = lazy(() => import("@pages/LandingPage.jsx"));
const RoleSuggestion = lazy(() => import("@pages/RoleSuggestion.jsx"));
const InterviewPrepAI = lazy(() => import("@pages/InterviewPrepAI.jsx"));
const HireDisk = lazy(() => import("@pages/HireDisk"));
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
