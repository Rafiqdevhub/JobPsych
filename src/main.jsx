import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import "./index.css";
import App from "./App.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import ToastProvider from "./components/ToastManager.jsx";
import LandingPage from "./components/LandingPage.jsx";
import Dashboard from "./components/Dashboard.jsx";
import DashboardWrapper from "./components/DashboardWrapper.jsx";
import PaymentPage from "./components/PaymentPage.jsx";
import ClerkAuth from "./components/ClerkAuth.jsx";
import AppLoader from "./components/AppLoader";

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
        element: <Dashboard />,
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
    ],
  },
]);

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <ErrorBoundary>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <ToastProvider>
          <RouterProvider router={router} fallbackElement={<AppLoader />} />
        </ToastProvider>
      </ClerkProvider>
    </ErrorBoundary>
  </StrictMode>
);
