import React from "react";
import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import Footer from "../Footer";

// Mock NavigationButton component
vi.mock("@components/buttons/NavigationButton", () => ({
  default: ({ to, children, className, ...props }) => (
    <button
      data-testid={`nav-button-${to}`}
      className={className}
      onClick={() => props.onClick?.()}
      {...props}
    >
      {children}
    </button>
  ),
}));

describe("Footer Component", () => {
  it("renders the footer with correct branding", () => {
    render(<Footer />);

    expect(screen.getByText("JobPsych")).toBeInTheDocument();
    expect(
      screen.getByText("Transforming careers with AI-powered intelligence")
    ).toBeInTheDocument();
  });

  it("displays animated status dots", () => {
    render(<Footer />);

    // Check for animated dots in the header
    const animatedDots = document.querySelectorAll(".animate-pulse");
    expect(animatedDots.length).toBeGreaterThan(0);
  });

  it("renders all four main sections", () => {
    render(<Footer />);

    expect(screen.getByText("About JobPsych")).toBeInTheDocument();
    expect(screen.getByText("Key Features")).toBeInTheDocument();
    expect(screen.getByText("Release Timeline")).toBeInTheDocument();
    expect(screen.getByText("Quick Access")).toBeInTheDocument();
  });

  it("displays about section content", () => {
    render(<Footer />);

    expect(
      screen.getByText(/A unified platform offering smart career direction/)
    ).toBeInTheDocument();

    // Check that the description contains the feature names
    const aboutText = screen.getByText(
      /A unified platform offering smart career direction/
    );
    expect(aboutText.textContent).toContain("Role Suggestions");
    expect(aboutText.textContent).toContain("InterviewPrep AI");
    expect(aboutText.textContent).toContain("ATS Analyzer");
    expect(aboutText.textContent).toContain("HireDisk");
  });

  it("displays key features list", () => {
    render(<Footer />);

    expect(screen.getByText("Career Role Matching")).toBeInTheDocument();
    expect(screen.getByText("Personality & Skills Fit")).toBeInTheDocument();
    expect(screen.getByText("AI Interview Practice")).toBeInTheDocument();
    expect(
      screen.getByText("Tailored Interview Questions")
    ).toBeInTheDocument();
    expect(screen.getByText("ATS Compatibility Analysis")).toBeInTheDocument();
    expect(
      screen.getByText("Recruiter-Friendly Summaries")
    ).toBeInTheDocument();
  });

  it("displays release timeline with version information", () => {
    render(<Footer />);

    expect(screen.getByText("v1.0.0")).toBeInTheDocument();
    expect(screen.getByText("Initial Launch")).toBeInTheDocument();
    expect(screen.getByText("May 2025")).toBeInTheDocument();

    expect(screen.getByText("v1.1.0")).toBeInTheDocument();
    expect(screen.getByText("AI Resume Tools")).toBeInTheDocument();

    expect(screen.getByText("v1.1.1")).toBeInTheDocument();
    expect(screen.getByText("Payment System")).toBeInTheDocument();

    expect(screen.getByText("v2.0.0")).toBeInTheDocument();
    expect(screen.getByText("Major Enhancements")).toBeInTheDocument();
  });

  it("renders quick access navigation buttons", () => {
    render(<Footer />);

    expect(
      screen.getByTestId("nav-button-/role-suggestions")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("nav-button-/interview-prepai")
    ).toBeInTheDocument();
    expect(screen.getByTestId("nav-button-/ats-analyzer")).toBeInTheDocument();
    expect(screen.getByTestId("nav-button-/hiredisk")).toBeInTheDocument();
  });

  it("displays quick access button labels", () => {
    render(<Footer />);

    expect(screen.getByText("Explore Role Suggestions")).toBeInTheDocument();
    expect(screen.getByText("Try InterviewPrep AI")).toBeInTheDocument();
    expect(screen.getByText("Analyze Resume with ATS")).toBeInTheDocument();
    expect(screen.getByText("HireDisk")).toBeInTheDocument();
  });

  it("displays platform statistics", () => {
    render(<Footer />);

    expect(screen.getByText("Active Platform")).toBeInTheDocument();
    expect(screen.getByText("15K+")).toBeInTheDocument();
    expect(screen.getByText("Happy Users")).toBeInTheDocument();
    expect(screen.getByText("94%")).toBeInTheDocument();
    expect(screen.getByText("Success Rate")).toBeInTheDocument();
  });

  it("displays star rating", () => {
    render(<Footer />);

    expect(screen.getByText("4.9/5 Rating")).toBeInTheDocument();

    // Check for 5 star icons
    const stars = document.querySelectorAll('svg[fill="currentColor"]');
    expect(stars.length).toBe(5);
  });

  it("displays copyright information with current year", () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear().toString();
    expect(
      screen.getByText(new RegExp(`© ${currentYear} JobPsych`))
    ).toBeInTheDocument();
  });

  it("displays privacy and terms links", () => {
    render(<Footer />);

    expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
    expect(screen.getByText("Terms of Service")).toBeInTheDocument();
  });

  it("displays data protection message", () => {
    render(<Footer />);

    // Check that the data protection message exists in the footer text
    expect(
      screen.getByText(/Your data remains private and protected/)
    ).toBeInTheDocument();
  });

  it("applies correct styling classes", () => {
    render(<Footer />);

    const footer = document.querySelector("footer");
    expect(footer).toHaveClass(
      "relative",
      "bg-gradient-to-br",
      "from-slate-900"
    );
  });

  it("has proper section structure", () => {
    render(<Footer />);

    // Check for main container
    const mainContainer = document.querySelector(".mx-auto.max-w-7xl");
    expect(mainContainer).toBeInTheDocument();

    // Check for grid layout
    const grid = document.querySelector(
      ".grid.grid-cols-1.gap-8.md\\:grid-cols-4"
    );
    expect(grid).toBeInTheDocument();
  });

  it("maintains component stability during re-renders", () => {
    const { rerender } = render(<Footer />);

    // Check initial render
    expect(screen.getByText("JobPsych")).toBeInTheDocument();

    // Re-render
    rerender(<Footer />);

    // Should still be there
    expect(screen.getByText("JobPsych")).toBeInTheDocument();
    expect(screen.getByText("About JobPsych")).toBeInTheDocument();
  });
});
