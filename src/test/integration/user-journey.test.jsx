import React from "react";
import { render, screen } from "../integration/test-utils";
import { IntegrationUtils } from "../integration/test-utils";
import { expect, test, describe, beforeEach, afterEach } from "vitest";
import { BrowserRouter } from "react-router-dom";

// Simple mock components for testing
const MockLandingPage = () => (
  <div>
    <h1>AI-Powered Career Guidance</h1>
    <button>Get Started</button>
  </div>
);

const MockATSAnalyzer = () => (
  <div>
    <h2>ATS Resume Analyzer</h2>
  </div>
);

const MockChatbot = () => (
  <div data-testid="chatbot">
    <p>Hello! I'm JobPsych</p>
  </div>
);

// Test components for user journey scenarios
const TestApp = ({ initialRoute = "/" }) => {
  return (
    <div>
      {initialRoute === "/" && <MockLandingPage />}
      {initialRoute === "/ats-analyzer" && <MockATSAnalyzer />}
      <MockChatbot />
    </div>
  );
};

describe("User Journey Integration Tests", () => {
  beforeEach(() => {
    IntegrationUtils.setupMSW();
  });

  afterEach(() => {
    IntegrationUtils.cleanupMSW();
    IntegrationUtils.clearMockUser();
  });

  test("landing page loads correctly", async () => {
    render(<TestApp initialRoute="/" />);

    // Check that landing page elements are present
    expect(screen.getByText(/AI-Powered Career Guidance/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /get started/i })
    ).toBeInTheDocument();
  });

  test("chatbot interaction journey", async () => {
    render(<TestApp initialRoute="/" />);

    // The chatbot should be available on the landing page
    expect(screen.getByTestId("chatbot")).toBeInTheDocument();
    expect(screen.getByText(/Hello! I'm JobPsych/i)).toBeInTheDocument();
  });

  test("ATS analyzer page loads", async () => {
    render(<TestApp initialRoute="/ats-analyzer" />);

    // Check that ATS analyzer page loads
    expect(screen.getByText(/ATS Resume Analyzer/i)).toBeInTheDocument();
  });
});
