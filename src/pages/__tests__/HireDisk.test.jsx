import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import HireDisk from "../HireDisk";

// Mock useToast hook
const mockUseToast = {
  showSuccess: vi.fn(),
};
vi.mock("@hooks/useToast", () => ({
  default: () => mockUseToast,
}));

describe("HireDisk Component", () => {
  let mockWindowOpen;
  let mockLocation;

  beforeEach(() => {
    // Clear mocks
    vi.clearAllMocks();

    // Mock window.open
    mockWindowOpen = vi.fn();
    Object.defineProperty(window, "open", {
      writable: true,
      value: mockWindowOpen,
    });

    // Mock window.location
    mockLocation = { href: "" };
    Object.defineProperty(window, "location", {
      writable: true,
      value: mockLocation,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the HireDisk interface correctly", () => {
    render(<HireDisk />);

    // Check main heading
    expect(screen.getByText("HireDisk")).toBeInTheDocument();

    // Check main content
    expect(screen.getByText("Ready to Transform Your")).toBeInTheDocument();
    expect(screen.getByText("Hiring Process?")).toBeInTheDocument();

    // Check buttons
    expect(screen.getByText("Back to Home")).toBeInTheDocument();
    expect(screen.getByText("Start HireDisk")).toBeInTheDocument();

    // Check feature sections
    expect(screen.getByText("Why Our HR Platform?")).toBeInTheDocument();
    expect(screen.getByText("HR Skills You'll Enhance")).toBeInTheDocument();

    // Check feature items - use getAllByText for texts that appear multiple times
    const advancedAnalyticsElements = screen.getAllByText("Advanced Analytics");
    expect(advancedAnalyticsElements.length).toBeGreaterThan(0);
    const candidateIntelligenceElements = screen.getAllByText(
      "Candidate Intelligence"
    );
    expect(candidateIntelligenceElements.length).toBeGreaterThan(0);
    expect(screen.getByText("Smart Matching")).toBeInTheDocument();

    expect(screen.getByText("Talent Acquisition")).toBeInTheDocument();
    expect(screen.getByText("Data Analytics")).toBeInTheDocument();
    expect(screen.getByText("Decision Making")).toBeInTheDocument();
  });

  it("navigates back to home when Back to Home button is clicked", () => {
    render(<HireDisk />);

    const backButton = screen.getByText("Back to Home");

    act(() => {
      fireEvent.click(backButton);
    });

    expect(mockLocation.href).toBe("/");
  });

  it("shows success toast and opens new window when Start HireDisk is clicked", () => {
    vi.useFakeTimers();

    render(<HireDisk />);

    const startButton = screen.getByText("Start HireDisk");

    act(() => {
      fireEvent.click(startButton);
    });

    // Check that success toast was shown
    expect(mockUseToast.showSuccess).toHaveBeenCalledWith(
      "Redirecting to HireDisk in a new tab..."
    );

    // Fast-forward timers to trigger setTimeout
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // Check that window.open was called with correct URL
    expect(mockWindowOpen).toHaveBeenCalledWith(
      "https://hiredesk.vercel.app/",
      "_blank"
    );

    vi.useRealTimers();
  });

  it("displays the correct quote in the header", () => {
    render(<HireDisk />);

    expect(
      screen.getByText(
        "Smart hiring starts with intelligent analysis. Make data-driven decisions."
      )
    ).toBeInTheDocument();
  });

  it("displays HR intelligence information correctly", () => {
    render(<HireDisk />);

    expect(screen.getByText("HR Intelligence Platform")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Experience our comprehensive HR intelligence platform with advanced analytics, candidate insights, and data-driven hiring solutions."
      )
    ).toBeInTheDocument();
  });

  it("displays the correct help text under the start button", () => {
    render(<HireDisk />);

    expect(
      screen.getByText("Opens in a new tab • Advanced HR analytics platform")
    ).toBeInTheDocument();
  });

  it("displays the call-to-action section", () => {
    render(<HireDisk />);

    expect(
      screen.getByText("Transform Your Hiring Today!")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Join HR professionals using data-driven solutions")
    ).toBeInTheDocument();
  });

  it("maintains component stability during re-renders", () => {
    const { rerender } = render(<HireDisk />);

    // Check initial render
    expect(screen.getByText("HireDisk")).toBeInTheDocument();

    // Re-render
    rerender(<HireDisk />);

    // Check still renders correctly
    expect(screen.getByText("HireDisk")).toBeInTheDocument();
    expect(screen.getByText("Start HireDisk")).toBeInTheDocument();
  });
});
