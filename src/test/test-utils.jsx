import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "@components/toast/ToastManager";
import ErrorBoundary from "@components/error/ErrorBoundary";

// Custom render function with providers
const AllTheProviders = ({ children }) => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ToastProvider>{children}</ToastProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

const customRender = (ui, options = {}) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
