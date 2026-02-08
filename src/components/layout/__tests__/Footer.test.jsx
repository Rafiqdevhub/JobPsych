import React from "react";
import { render, screen } from "@test/test-utils";
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

    expect(screen.getByText("About JobPsych")).toBeInTheDocument();
    expect(
      screen.getByText(
        /An AI-Based Career Readiness and Interview Preparation System/,
      ),
    ).toBeInTheDocument();
  });

  it("displays animated status dots", () => {
    render(<Footer />);

    // Check for animated dots in the header
    const animatedDots = document.querySelectorAll(".animate-pulse");
    expect(animatedDots.length).toBeGreaterThan(0);
  });

  it("renders all three main sections", () => {
    render(<Footer />);

    expect(screen.getByText("About JobPsych")).toBeInTheDocument();
    expect(screen.getByText("Core Modules")).toBeInTheDocument();
    expect(screen.getByText("Explore Modules")).toBeInTheDocument();
  });

  it("displays about section content", () => {
    render(<Footer />);

    expect(
      screen.getByText(
        /An AI-Based Career Readiness and Interview Preparation System/,
      ),
    ).toBeInTheDocument();

    // Check that the description contains the module names
    const aboutText = screen.getByText(
      /An AI-Based Career Readiness and Interview Preparation System/,
    );
    expect(aboutText.textContent).toContain("Career Path Exploration Module");
    expect(aboutText.textContent).toContain(
      "Professional Document Analysis Module",
    );
    expect(aboutText.textContent).toContain(
      "AI-Assisted Interview Practice Module",
    );
  });

  it("displays core modules list", () => {
    render(<Footer />);

    const moduleNames = [
      "Career Path Exploration",
      "Professional Document Analysis",
      "AI-Powered Interview Simulation",
    ];
    moduleNames.forEach((name) => {
      const elements = screen.getAllByText(name);
      expect(elements.length).toBeGreaterThan(0);
    });
  });

  it("displays explore modules navigation buttons", () => {
    render(<Footer />);

    const buttonPaths = [
      "/role-suggestions",
      "/ats-analyzer",
      "/interview-prepai",
    ];
    buttonPaths.forEach((path) => {
      expect(screen.getByTestId(`nav-button-${path}`)).toBeInTheDocument();
    });
  });

  it("displays module button labels", () => {
    render(<Footer />);

    // Get all buttons with navigation
    const buttons = screen.getAllByRole("button");
    const buttonTexts = buttons.map((btn) => btn.textContent);

    expect(buttonTexts.some((text) => text.includes("Document Analysis"))).toBe(
      true,
    );
    expect(
      buttonTexts.some((text) => text.includes("Interview Practice")),
    ).toBe(true);
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
      screen.getByText(new RegExp(`© ${currentYear} JobPsych`)),
    ).toBeInTheDocument();
  });

  it("displays privacy, terms, and security links", () => {
    render(<Footer />);

    expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
    expect(screen.getByText("Terms of Service")).toBeInTheDocument();
    expect(screen.getByText("Security Audit")).toBeInTheDocument();
  });

  it("displays data protection message", () => {
    render(<Footer />);

    // Check that the data protection message exists in the footer text
    expect(
      screen.getByText(/Your data remains private and protected/),
    ).toBeInTheDocument();
  });

  it("applies correct styling classes", () => {
    render(<Footer />);

    const footer = document.querySelector("footer");
    expect(footer).toHaveClass(
      "relative",
      "bg-gradient-to-br",
      "from-slate-900",
    );
  });

  it("has proper section structure", () => {
    render(<Footer />);

    // Check for main container
    const mainContainer = document.querySelector(".mx-auto.max-w-7xl");
    expect(mainContainer).toBeInTheDocument();

    // Check for grid layout (updated to 3 columns)
    const grid = document.querySelector(
      ".grid.grid-cols-1.gap-8.md\\:grid-cols-3",
    );
    expect(grid).toBeInTheDocument();
  });

  it("maintains component stability during re-renders", () => {
    const { rerender } = render(<Footer />);

    // Check initial render
    expect(screen.getByText("About JobPsych")).toBeInTheDocument();

    // Re-render
    rerender(<Footer />);

    // Should still be there
    expect(screen.getByText("About JobPsych")).toBeInTheDocument();
    expect(screen.getByText("Core Modules")).toBeInTheDocument();
  });
});
