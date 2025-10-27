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

    expect(screen.getByText("ATS Analyzer")).toBeInTheDocument();
    expect(
      screen.getByText("Beat ATS systems and land more interviews")
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
    expect(screen.getByText("ATS Analyzer")).toBeInTheDocument();
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
    expect(screen.getByText("Why Our ATS Platform?")).toBeInTheDocument();
    // Use getAllByText to handle multiple instances
    const realtimeElements = screen.getAllByText("Real-time Analysis");
    expect(realtimeElements.length).toBeGreaterThan(0);
    expect(screen.getByText("Multi-ATS Support")).toBeInTheDocument();
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

    // Note: Animated elements have been removed per design requirements
    // Check for static blur effects instead
    const blurElements = container.querySelectorAll("[class*='blur']");
    expect(blurElements.length).toBeGreaterThan(0);
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

    // Use getAllByText for elements that appear multiple times
    expect(screen.getByText("Why Our ATS Platform?")).toBeInTheDocument();
    expect(screen.getByText("ATS Tips & Best Practices")).toBeInTheDocument();
    expect(screen.getByText("Beat Every ATS System!")).toBeInTheDocument();

    // These appear in multiple places (in cards and as badges)
    const stdHeaderElements = screen.getAllByText("Standard Headers");
    expect(stdHeaderElements.length).toBeGreaterThan(0);

    const realtimeElements = screen.getAllByText("Real-time Analysis");
    expect(realtimeElements.length).toBeGreaterThan(0);
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
