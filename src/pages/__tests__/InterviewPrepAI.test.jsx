import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import InterviewPrepAI from "../InterviewPrepAI";

// Mock useToast hook
const mockUseToast = {
  showSuccess: vi.fn(),
};
vi.mock("@hooks/useToast", () => ({
  default: () => mockUseToast,
}));

describe("InterviewPrepAI Component", () => {
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
    vi.clearAllMocks();
  });

  it("renders the InterviewPrepAI interface correctly", () => {
    render(<InterviewPrepAI />);

    // Check main heading
    expect(screen.getByText("InterviewPrep AI")).toBeInTheDocument();

    // Check main content
    expect(screen.getByText("Ready to Ace Your")).toBeInTheDocument();
    expect(screen.getByText("Interview?")).toBeInTheDocument();

    // Check buttons
    expect(screen.getByText("Back to Home")).toBeInTheDocument();
    expect(screen.getByText("Start AI Interview")).toBeInTheDocument();

    // Check feature sections
    expect(screen.getByText("Why Our AI Platform?")).toBeInTheDocument();
    expect(screen.getByText("Skills You'll Master")).toBeInTheDocument();

    // Check feature items
    expect(screen.getByText("Advanced AI Technology")).toBeInTheDocument();
    expect(screen.getByText("Instant Feedback")).toBeInTheDocument();
    expect(screen.getByText("Role-Specific Questions")).toBeInTheDocument();

    expect(screen.getByText("Behavioral Questions")).toBeInTheDocument();
    expect(screen.getByText("Technical Interviews")).toBeInTheDocument();
    expect(screen.getByText("Communication Skills")).toBeInTheDocument();
  });

  it("navigates back to home when Back to Home button is clicked", () => {
    render(<InterviewPrepAI />);

    const backButton = screen.getByText("Back to Home");

    act(() => {
      fireEvent.click(backButton);
    });

    expect(mockLocation.href).toBe("/");
  });

  it("shows success toast and opens new window when Start AI Interview is clicked", () => {
    vi.useFakeTimers();

    render(<InterviewPrepAI />);

    const startButton = screen.getByText("Start AI Interview");

    act(() => {
      fireEvent.click(startButton);
    });

    // Check that success toast was shown
    expect(mockUseToast.showSuccess).toHaveBeenCalledWith(
      "Redirecting to AI Interview in a new tab..."
    );

    // Fast-forward timers to trigger setTimeout
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // Check that window.open was called with correct URL
    expect(mockWindowOpen).toHaveBeenCalledWith(
      "https://ai-mock-interview-preparation-seven.vercel.app",
      "_blank"
    );

    vi.useRealTimers();
  });

  it("displays the correct quote in the header", () => {
    render(<InterviewPrepAI />);

    expect(
      screen.getByText(
        "Practice makes perfect. Every interview is a step closer to your dream job."
      )
    ).toBeInTheDocument();
  });

  it("displays AI interview information correctly", () => {
    render(<InterviewPrepAI />);

    expect(
      screen.getByText("AI Powered Interview Practice")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Experience our cutting-edge AI interview platform with personalized questions, instant feedback, and real-time analysis."
      )
    ).toBeInTheDocument();
  });

  it("displays the correct help text under the start button", () => {
    render(<InterviewPrepAI />);

    expect(
      screen.getByText(
        "Opens in a new tab • Personalized AI coaching experience"
      )
    ).toBeInTheDocument();
  });

  it("displays the call-to-action section", () => {
    render(<InterviewPrepAI />);

    expect(screen.getByText("Start Your Journey Today!")).toBeInTheDocument();
    expect(
      screen.getByText("Join thousands who landed their dream jobs")
    ).toBeInTheDocument();
  });

  it("maintains component stability during re-renders", () => {
    const { rerender } = render(<InterviewPrepAI />);

    // Check initial render
    expect(screen.getByText("InterviewPrep AI")).toBeInTheDocument();

    // Re-render
    rerender(<InterviewPrepAI />);

    // Check still renders correctly
    expect(screen.getByText("InterviewPrep AI")).toBeInTheDocument();
    expect(screen.getByText("Start AI Interview")).toBeInTheDocument();
  });
});
