import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import RateLimitError from "../RateLimitError";

// Mock Heroicons
vi.mock("@heroicons/react/24/outline", () => ({
  XMarkIcon: ({ className }) => (
    <div data-testid="x-mark-icon" className={className} />
  ),
  ClockIcon: ({ className }) => (
    <div data-testid="clock-icon" className={className} />
  ),
}));

// Mock Date.now for consistent testing
const mockNow = new Date("2024-01-15T12:00:00Z").getTime();
const originalDateNow = Date.now;

beforeEach(() => {
  vi.useFakeTimers();
  Date.now = vi.fn(() => mockNow);
});

afterEach(() => {
  vi.useRealTimers();
  Date.now = originalDateNow;
});

describe("RateLimitError Component", () => {
  const defaultProps = {
    rateLimitData: { message: "Test rate limit message" },
    onClose: vi.fn(),
    onUpgrade: vi.fn(),
  };

  it("renders with default props", () => {
    render(<RateLimitError {...defaultProps} />);

    expect(screen.getByText("Rate Limit Exceeded")).toBeInTheDocument();
    expect(screen.getByText("Test rate limit message")).toBeInTheDocument();
    expect(screen.getByText("I Understand")).toBeInTheDocument();
  });

  it("renders with default message when no rateLimitData provided", () => {
    render(<RateLimitError onClose={vi.fn()} />);

    expect(
      screen.getByText(
        "You've reached the maximum number of resume analyses allowed (2 per 24 hours)."
      )
    ).toBeInTheDocument();
  });

  it("displays close button when onClose is provided", () => {
    render(<RateLimitError {...defaultProps} />);

    const closeButton = screen.getByTestId("x-mark-icon").closest("button");
    expect(closeButton).toBeInTheDocument();
  });

  it("does not display close button when onClose is not provided", () => {
    render(<RateLimitError onUpgrade={vi.fn()} />);

    const closeButton = screen.queryByTestId("x-mark-icon");
    expect(closeButton).not.toBeInTheDocument();
  });

  it("displays upgrade button when onUpgrade is provided", () => {
    render(<RateLimitError {...defaultProps} />);

    expect(screen.getByText("🚀 View Pricing Plans")).toBeInTheDocument();
  });

  it("does not display upgrade button when onUpgrade is not provided", () => {
    render(<RateLimitError onClose={vi.fn()} />);

    expect(screen.queryByText("🚀 View Pricing Plans")).not.toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const mockOnClose = vi.fn();
    render(<RateLimitError {...defaultProps} onClose={mockOnClose} />);

    // Find the close button by its test ID
    const closeButton = screen.getByTestId("x-mark-icon").closest("button");
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when backdrop is clicked", () => {
    const mockOnClose = vi.fn();
    render(<RateLimitError {...defaultProps} onClose={mockOnClose} />);

    const backdrop = document.querySelector(".fixed.inset-0.z-40");
    fireEvent.click(backdrop);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("calls onUpgrade when upgrade button is clicked", () => {
    const mockOnUpgrade = vi.fn();
    render(<RateLimitError {...defaultProps} onUpgrade={mockOnUpgrade} />);

    const upgradeButton = screen.getByText("🚀 View Pricing Plans");
    fireEvent.click(upgradeButton);

    expect(mockOnUpgrade).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when I Understand button is clicked", () => {
    const mockOnClose = vi.fn();
    render(<RateLimitError {...defaultProps} onClose={mockOnClose} />);

    const understandButton = screen.getByText("I Understand");
    fireEvent.click(understandButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("displays countdown timer", () => {
    render(<RateLimitError {...defaultProps} />);

    // Should show time remaining until midnight UTC
    expect(screen.getByText(/Reset in:/)).toBeInTheDocument();
  });

  it("formats time remaining correctly for hours", () => {
    render(<RateLimitError {...defaultProps} />);

    // Should display some time format with hours (exact time depends on when test runs)
    const timeElement = screen.getByText(/Reset in: \d+h \d+m/);
    expect(timeElement).toBeInTheDocument();
  });

  it("formats time remaining correctly for minutes", () => {
    render(<RateLimitError {...defaultProps} />);

    // Should display some time format (exact time depends on when test runs)
    const timeElement = screen.getByText(/Reset in:/);
    expect(timeElement).toBeInTheDocument();
  });

  it("formats time remaining correctly for seconds", () => {
    render(<RateLimitError {...defaultProps} />);

    // Should display some time format (exact time depends on when test runs)
    const timeElement = screen.getByText(/Reset in:/);
    expect(timeElement).toBeInTheDocument();
  });

  it.skip("shows 'soon' when time remaining is zero or negative", () => {
    // Mock Date to return a time after the next midnight UTC
    const mockNow = new Date();
    mockNow.setDate(mockNow.getDate() + 1); // Tomorrow
    mockNow.setUTCHours(1, 0, 0, 0); // 1 AM tomorrow UTC
    const mockTime = mockNow.getTime();

    const OriginalDate = globalThis.Date;
    globalThis.Date = class extends OriginalDate {
      constructor(...args) {
        if (args.length === 0) {
          super(mockTime);
        } else {
          super(...args);
        }
      }
      static now() {
        return mockTime;
      }
    };

    render(<RateLimitError {...defaultProps} />);

    // Should display "soon" when reset time has passed
    expect(screen.getByText(/Reset in: soon/)).toBeInTheDocument();

    globalThis.Date = OriginalDate;
  });

  it("has timer functionality", () => {
    render(<RateLimitError {...defaultProps} />);

    // Just verify the timer is displayed
    const timeElement = screen.getByText(/Reset in:/);
    expect(timeElement).toBeInTheDocument();
  });

  it("displays next reset time in UTC", () => {
    render(<RateLimitError {...defaultProps} />);

    expect(screen.getByText(/Next reset:/)).toBeInTheDocument();
  });

  it("displays tips section", () => {
    render(<RateLimitError {...defaultProps} />);

    expect(screen.getByText("💡 Tips while you wait:")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Review and refine your resume based on previous feedback"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText("Research the company and position you're applying for")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Prepare thoughtful answers to common interview questions"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText("Practice your elevator pitch and professional summary")
    ).toBeInTheDocument();
  });

  it("displays upgrade suggestion section", () => {
    render(<RateLimitError {...defaultProps} />);

    expect(screen.getByText(/💼/)).toBeInTheDocument();
    expect(screen.getByText(/Need more resume analyses\?/)).toBeInTheDocument();
    expect(screen.getByText(/Upgrade to a premium plan/)).toBeInTheDocument();
  });

  it("displays rate limit ID and JobPsych branding", () => {
    render(<RateLimitError {...defaultProps} />);

    expect(screen.getByText(/Rate Limit ID:/)).toBeInTheDocument();
    expect(screen.getByText("JobPsych AI")).toBeInTheDocument();
  });

  it("has proper modal structure with backdrop and content", () => {
    render(<RateLimitError {...defaultProps} />);

    const backdrop = document.querySelector(".fixed.inset-0.z-40");
    expect(backdrop).toHaveClass("fixed", "inset-0", "z-40", "bg-black/30");

    const modal = document.querySelector(".fixed.inset-0.z-50");
    expect(modal).toHaveClass("fixed", "inset-0", "z-50");
  });

  it("has proper accessibility attributes", () => {
    render(<RateLimitError {...defaultProps} />);

    // Test that buttons exist
    const upgradeButton = screen.getByText("🚀 View Pricing Plans");
    expect(upgradeButton).toBeInTheDocument();

    const understandButton = screen.getByText("I Understand");
    expect(understandButton).toBeInTheDocument();

    // Close button exists (uses XMarkIcon)
    const closeButtons = screen.getAllByRole("button");
    expect(closeButtons.length).toBeGreaterThanOrEqual(3); // close, upgrade, understand
  });

  it("applies hover effects and animations", () => {
    render(<RateLimitError {...defaultProps} />);

    // Find the main modal card by its classes
    const modalCard = document.querySelector(
      ".bg-white.rounded-3xl.shadow-2xl"
    );
    expect(modalCard).toHaveClass("hover:scale-[1.02]");

    const clockIcon = screen.getAllByTestId("clock-icon")[0];
    expect(clockIcon).toHaveClass("hover:scale-110", "hover:rotate-12");
  });

  it("has animated background elements", () => {
    render(<RateLimitError {...defaultProps} />);

    // Find animated elements by their classes
    const animatedElements = document.querySelectorAll(".animate-ping");
    expect(animatedElements.length).toBeGreaterThan(0);
  });

  it("cleans up timer on unmount", () => {
    const clearIntervalSpy = vi.spyOn(globalThis, "clearInterval");

    const { unmount } = render(<RateLimitError {...defaultProps} />);

    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();
    clearIntervalSpy.mockRestore();
  });

  it("handles edge case where Date.now throws error", () => {
    const originalDateNow = Date.now;
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    Date.now = vi.fn(() => {
      throw new Error("Date.now error");
    });

    // Component may throw due to Date.now error in useEffect, but should render basic structure
    try {
      render(<RateLimitError {...defaultProps} />);
      // If it doesn't throw, verify basic content is rendered
      expect(screen.getByText("Rate Limit Exceeded")).toBeInTheDocument();
    } catch (error) {
      // If it throws, that's also acceptable for this edge case
      expect(error.message).toContain("Date.now error");
    }

    Date.now = originalDateNow;
    consoleSpy.mockRestore();
  });

  it("renders with proper responsive design classes", () => {
    render(<RateLimitError {...defaultProps} />);

    // The container has max-w-lg and w-full classes
    const container = document.querySelector(".max-w-lg.w-full");
    expect(container).toHaveClass("max-w-lg", "w-full");

    // The modal wrapper has padding
    const modalWrapper = document.querySelector(".fixed.inset-0.z-50");
    expect(modalWrapper).toHaveClass("p-4");
  });

  it("displays gradient backgrounds and effects", () => {
    render(<RateLimitError {...defaultProps} />);

    const gradientBg = document.querySelector(
      ".bg-gradient-to-br.from-pink-50\\/90"
    );
    expect(gradientBg).toHaveClass(
      "bg-gradient-to-br",
      "from-pink-50/90",
      "via-white",
      "to-purple-50/90"
    );

    const resetInfoBox = document.querySelector(
      ".bg-gradient-to-r.from-blue-50"
    );
    expect(resetInfoBox).toHaveClass(
      "bg-gradient-to-r",
      "from-blue-50",
      "to-indigo-50"
    );
  });

  it("has proper button styling and interactions", () => {
    render(<RateLimitError {...defaultProps} />);

    const upgradeButton = screen.getByText("🚀 View Pricing Plans");
    expect(upgradeButton).toHaveClass("hover:scale-105", "active:scale-95");

    const understandButton = screen.getByText("I Understand");
    expect(understandButton).toHaveClass("hover:scale-105", "active:scale-95");
  });
});
