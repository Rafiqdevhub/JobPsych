import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import ToastProvider from "@components/toast/ToastManager.jsx";
import ErrorBoundary from "@components/error/ErrorBoundary.jsx";
import NotFound from "@pages/NotFound.jsx";
import ATSAnalyzer from "@pages/ATSAnalyzer.jsx";
import LandingPage from "@pages/LandingPage.jsx";
import RoleSuggestion from "@pages/RoleSuggestion.jsx";
import InterviewPrepAI from "@pages/InterviewPrepAI.jsx";
import HireDisk from "@pages/HireDisk";

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
        path: "role-suggestions",
        element: <RoleSuggestion />,
      },

      {
        path: "interview-prepai",
        element: <InterviewPrepAI />,
      },
      {
        path: "ats-analyzer",
        element: <ATSAnalyzer />,
      },
      {
        path: "hiredisk",
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
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </ErrorBoundary>
  </StrictMode>
);
