/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { ToastProvider } from "../../components/toast/ToastManager";
import ErrorBoundary from "../../components/error/ErrorBoundary";
import { expect } from "vitest";
import {
  mockUserProfiles,
  mockResumeData,
  mockChatConversations,
} from "./fixtures.js";

// Enhanced providers for integration tests
const AllIntegrationProviders = ({ children, initialEntries = ["/"] }) => {
  return (
    <ErrorBoundary>
      <MemoryRouter initialEntries={initialEntries}>
        <ToastProvider>{children}</ToastProvider>
      </MemoryRouter>
    </ErrorBoundary>
  );
};

// Custom render function for integration tests
const integrationRender = (ui, options = {}) => {
  const { initialEntries, ...renderOptions } = options;

  return render(ui, {
    wrapper: ({ children }) => (
      <AllIntegrationProviders initialEntries={initialEntries}>
        {children}
      </AllIntegrationProviders>
    ),
    ...renderOptions,
  });
};

// Utility functions for integration tests
export const IntegrationUtils = {
  // User session management
  createMockUser: (userType = "basicUser") => {
    const user = mockUserProfiles[userType];
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  },

  clearMockUser: () => {
    localStorage.removeItem("user");
  },

  // Resume data management
  createMockResume: (resumeType = "basic") => {
    const resume = mockResumeData[resumeType];
    sessionStorage.setItem("currentResume", JSON.stringify(resume));
    return resume;
  },

  clearMockResume: () => {
    sessionStorage.removeItem("currentResume");
  },

  // Chat conversation management
  createMockConversation: (conversationType = "basic") => {
    const conversation = mockChatConversations[conversationType];
    sessionStorage.setItem("chatHistory", JSON.stringify(conversation));
    return conversation;
  },

  clearMockConversation: () => {
    sessionStorage.removeItem("chatHistory");
  },

  // Wait utilities for integration tests
  waitForLoadingToFinish: async (screen, timeout = 5000) => {
    await screen.findByText(/loading/i, { timeout }, { hidden: true });
  },

  waitForNetworkRequest: (_method = "GET", _url = "") => {
    return new Promise((resolve) => {
      // Mock network delay
      setTimeout(resolve, 100);
    });
  },

  // MSW server management for integration tests
  setupMSW: () => {
    // MSW is already set up in setup.js, this is just a placeholder
    return Promise.resolve();
  },

  cleanupMSW: () => {
    // MSW cleanup is handled in setup.js, this is just a placeholder
    return Promise.resolve();
  },

  // Mock network failures for testing error states
  mockNetworkFailure: (url) => {
    // This would override MSW handlers for specific URLs
    console.warn(`Mocking network failure for ${url}`);
  },

  mockRateLimit: (url) => {
    // This would override MSW handlers to return 429 status
    console.warn(`Mocking rate limit for ${url}`);
  },

  // Form interaction helpers
  fillFormField: async (screen, label, value) => {
    const field = screen.getByLabelText(label);
    field.value = value;
    field.dispatchEvent(new Event("change", { bubbles: true }));
    return field;
  },

  submitForm: async (screen, formTestId = "form") => {
    const form = screen.getByTestId(formTestId);
    form.dispatchEvent(new Event("submit", { bubbles: true }));
  },

  // File upload simulation
  createMockFile: (
    name = "test.pdf",
    size = 1024,
    type = "application/pdf"
  ) => {
    const file = new File(["mock file content"], name, { type });
    Object.defineProperty(file, "size", { value: size });
    return file;
  },

  // Navigation helpers
  navigateTo: (path) => {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new PopStateEvent("popstate"));
  },

  // Toast verification
  expectToast: async (screen, message, type = "success") => {
    const toast = await screen.findByText(message);
    expect(toast).toBeInTheDocument();
    expect(toast.closest("[data-testid='toast']")).toHaveAttribute(
      "data-type",
      type
    );
  },

  // Error boundary testing
  triggerError: (component) => {
    const error = new Error("Test error");
    component.dispatchEvent(new ErrorEvent("error", { error }));
  },
};

// Re-export everything from @testing-library/react
export * from "@testing-library/react";

// Override render method
export { integrationRender as render };
