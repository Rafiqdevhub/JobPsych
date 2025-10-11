import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import ATSAnalyzer from "../ATSAnalyzer";

// Mock useToast hook
const mockShowSuccess = vi.fn();
vi.mock("@/hooks/useToast", () => ({
  default: () => ({
    showSuccess: mockShowSuccess,
  }),
}));

// Mock window.open and window.location
const mockWindowOpen = vi.fn();
delete window.location;
window.location = { href: "" };
Object.defineProperty(window, "open", {
  writable: true,
  value: mockWindowOpen,
});

describe("ATSAnalyzer Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it("renders the main ATS Analyzer interface", () => {
    render(<ATSAnalyzer />);

    expect(screen.getByText("ATS")).toBeInTheDocument();
    expect(screen.getByText("Analyzer")).toBeInTheDocument();
    expect(
      screen.getByText("AI-Powered Resume Optimization")
    ).toBeInTheDocument();
    expect(screen.getByText("Start ATS Analysis")).toBeInTheDocument();
  });

  it("has correct background and styling structure", () => {
    const { container } = render(<ATSAnalyzer />);

    const mainContainer = container.firstChild;
    expect(mainContainer).toHaveClass(
      "min-h-screen",
      "bg-slate-900",
      "flex",
      "flex-col"
    );
    expect(mainContainer).toHaveStyle({ pointerEvents: "auto" });
  });

  it("renders header with navigation elements", () => {
    render(<ATSAnalyzer />);

    expect(screen.getByText("Back to Home")).toBeInTheDocument();
    expect(screen.getByText("AI Powered")).toBeInTheDocument();
  });

  it("displays status indicators and badges", () => {
    render(<ATSAnalyzer />);

    expect(
      screen.getByText("Beat ATS systems and land more interviews")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Opens in a new tab • Advanced ATS optimization platform"
      )
    ).toBeInTheDocument();
  });

  it("shows feature highlights in sidebar", () => {
    render(<ATSAnalyzer />);

    // Check for the actual content that exists
    expect(screen.getByText("ATS Optimization Tips")).toBeInTheDocument();
    expect(screen.getByText("Standard Headers")).toBeInTheDocument();
    expect(screen.getByText("Keyword Optimization")).toBeInTheDocument();
    expect(screen.getByText("Quantifiable Results")).toBeInTheDocument();
  });

  it("handles Start ATS Analysis button click", () => {
    render(<ATSAnalyzer />);

    const startButton = screen.getByRole("button", {
      name: /start ats analysis/i,
    });

    act(() => {
      fireEvent.click(startButton);
    });

    expect(mockShowSuccess).toHaveBeenCalledWith(
      "Redirecting to ATS Cracker in a new tab..."
    );
    // Note: window.open is called via setTimeout, so we don't test the exact timing
  });

  it("handles Back to Home button click", () => {
    render(<ATSAnalyzer />);

    const backButton = screen.getByText("Back to Home");

    act(() => {
      fireEvent.click(backButton);
    });

    expect(window.location.href).toBe("/");
  });

  it("renders with proper responsive classes", () => {
    render(<ATSAnalyzer />);

    // Check for responsive grid classes
    const gridContainer = screen
      .getByText("Start ATS Analysis")
      .closest(".grid");
    expect(gridContainer).toHaveClass("grid-cols-1", "lg:grid-cols-4");
  });

  it("has proper accessibility attributes", () => {
    render(<ATSAnalyzer />);

    const startButton = screen.getByRole("button", {
      name: /start ats analysis/i,
    });
    expect(startButton.tagName).toBe("BUTTON");
    expect(startButton).toHaveStyle({
      pointerEvents: "auto",
      zIndex: "10",
      position: "relative",
    });
  });

  it("displays animated elements and gradients", () => {
    const { container } = render(<ATSAnalyzer />);

    // Check for gradient backgrounds
    const gradientElements = container.querySelectorAll(
      "[class*='bg-gradient-to']"
    );
    expect(gradientElements.length).toBeGreaterThan(0);

    // Check for animated elements
    const animatedElements = container.querySelectorAll("[class*='animate-']");
    expect(animatedElements.length).toBeGreaterThan(0);
  });

  it("maintains component stability during re-renders", () => {
    const { rerender } = render(<ATSAnalyzer />);

    expect(screen.getByText("Start ATS Analysis")).toBeInTheDocument();

    rerender(<ATSAnalyzer />);

    expect(screen.getByText("Start ATS Analysis")).toBeInTheDocument();
    expect(screen.getByText("Back to Home")).toBeInTheDocument();
  });

  it("handles multiple button clicks appropriately", () => {
    render(<ATSAnalyzer />);

    const startButton = screen.getByText("Start ATS Analysis");

    act(() => {
      fireEvent.click(startButton);
      fireEvent.click(startButton);
    });

    expect(mockShowSuccess).toHaveBeenCalledTimes(2);
    expect(mockShowSuccess).toHaveBeenCalledWith(
      "Redirecting to ATS Cracker in a new tab..."
    );
  });

  it("renders all feature cards in sidebar", () => {
    render(<ATSAnalyzer />);

    const featureTitles = [
      "ATS Optimization Tips",
      "Standard Headers",
      "Keyword Optimization",
      "Quantifiable Results",
      "ATS Analysis Ready?",
    ];

    featureTitles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it("has proper z-index layering", () => {
    const { container } = render(<ATSAnalyzer />);

    const header = container.querySelector("header");
    expect(header).toHaveClass("relative", "z-10");

    const main = container.querySelector("main");
    expect(main).toHaveClass("relative", "z-10");
  });

  it("includes proper icon elements", () => {
    const { container } = render(<ATSAnalyzer />);

    // Check for Heroicons
    const icons = container.querySelectorAll("svg");
    expect(icons.length).toBeGreaterThan(5); // Should have multiple icons
  });
});
