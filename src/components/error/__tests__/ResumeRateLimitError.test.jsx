import React from "react";
import { render, screen, fireEvent } from "@test/test-utils";
import { describe, it, expect, vi } from "vitest";
import ResumeRateLimitError from "../ResumeRateLimitError";

describe("ResumeRateLimitError Component", () => {
  const defaultProps = {
    onClose: vi.fn(),
    resetTime: Date.now() + 2 * 60 * 60 * 1000, // 2 hours from now
  };

  it("renders with default props", () => {
    render(<ResumeRateLimitError {...defaultProps} />);

    expect(screen.getByText("Daily Limit Reached")).toBeInTheDocument();
    expect(screen.getByText("Resume Analysis Rate Limit")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument(); // Daily limit
    expect(screen.getByText("0")).toBeInTheDocument(); // Remaining
  });

  it("renders without resetTime prop", () => {
    render(<ResumeRateLimitError onClose={vi.fn()} />);

    expect(screen.getByText("Soon")).toBeInTheDocument();
  });

  it("displays close button with proper accessibility", () => {
    render(<ResumeRateLimitError {...defaultProps} />);

    const closeButton = screen.getByRole("button", { name: "Close" });
    expect(closeButton).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const mockOnClose = vi.fn();
    render(<ResumeRateLimitError {...defaultProps} onClose={mockOnClose} />);

    const closeButton = screen.getByRole("button", { name: "Close" });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("displays upgrade buttons", () => {
    render(<ResumeRateLimitError {...defaultProps} />);

    expect(screen.getByText("Upgrade to Pro")).toBeInTheDocument();
    expect(screen.getByText("Learn More")).toBeInTheDocument();
  });

  it("formats reset time correctly for hours and minutes", () => {
    const twoHoursFromNow = Date.now() + 2 * 60 * 60 * 1000; // 2 hours from now
    render(
      <ResumeRateLimitError onClose={vi.fn()} resetTime={twoHoursFromNow} />,
    );

    // Should display approximately 2h 0m (exact time depends on when test runs)
    const timeElement = screen.getByText(/^\d+h \d+m$/);
    expect(timeElement).toBeInTheDocument();
  });

  it("formats reset time correctly for minutes only", () => {
    const thirtyMinutesFromNow = Date.now() + 30 * 60 * 1000; // 30 minutes from now
    render(
      <ResumeRateLimitError
        onClose={vi.fn()}
        resetTime={thirtyMinutesFromNow}
      />,
    );

    // Should display approximately 30m (exact time depends on when test runs)
    const timeElement = screen.getByText(/^\d+m$/);
    expect(timeElement).toBeInTheDocument();
  });

  it("displays 'shortly' when time remaining is zero or negative", () => {
    const pastTime = Date.now() - 1000; // 1 second ago
    render(<ResumeRateLimitError onClose={vi.fn()} resetTime={pastTime} />);

    expect(screen.getByText("shortly")).toBeInTheDocument();
  });

  it("displays limit information correctly", () => {
    render(<ResumeRateLimitError {...defaultProps} />);

    expect(screen.getByText("Daily Limit")).toBeInTheDocument();
    expect(screen.getByText("Remaining")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("displays progress bar at 100% when limit reached", () => {
    render(<ResumeRateLimitError {...defaultProps} />);

    // Find the progress bar by its gradient background classes
    const progressBar = document.querySelector(
      ".bg-gradient-to-r.from-red-500.to-rose-500",
    );
    expect(progressBar).toHaveStyle({ width: "100%" });
  });

  it("displays upgrade suggestion section", () => {
    render(<ResumeRateLimitError {...defaultProps} />);

    expect(screen.getByText("Need More Analyses?")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Upgrade to our Pro plan for unlimited resume analysis and advanced features",
      ),
    ).toBeInTheDocument();
  });

  it("has proper modal structure with backdrop", () => {
    render(<ResumeRateLimitError {...defaultProps} />);

    const modal = screen.getByText("Daily Limit Reached").closest(".fixed");
    expect(modal).toHaveClass(
      "fixed",
      "inset-0",
      "bg-black",
      "bg-opacity-50",
      "flex",
      "items-center",
      "justify-center",
      "z-50",
    );
  });

  it("has proper card styling", () => {
    render(<ResumeRateLimitError {...defaultProps} />);

    // Find the card by looking for the main content container with backdrop styling
    const card = document.querySelector(".bg-slate-900\\/95.backdrop-blur-xl");
    expect(card).toHaveClass(
      "relative",
      "bg-slate-900/95",
      "backdrop-blur-xl",
      "border",
      "border-red-500/30",
      "rounded-3xl",
      "p-8",
      "shadow-2xl",
    );
  });

  it("displays warning icon", () => {
    render(<ResumeRateLimitError {...defaultProps} />);

    const warningIcon = screen
      .getByText("Daily Limit Reached")
      .previousElementSibling?.querySelector("svg");
    expect(warningIcon).toBeInTheDocument();
  });

  it("displays clock icon in reset time section", () => {
    render(<ResumeRateLimitError {...defaultProps} />);

    const clockIcon = screen.getByText("1h 59m").previousElementSibling;
    expect(clockIcon).toBeInTheDocument();
  });

  it("has proper responsive design", () => {
    render(<ResumeRateLimitError {...defaultProps} />);

    const container = screen.getByText("Daily Limit Reached").closest(".fixed");
    expect(container).toHaveClass("p-4");
  });

  it("applies hover effects to buttons", () => {
    render(<ResumeRateLimitError {...defaultProps} />);

    const upgradeButton = screen.getByText("Upgrade to Pro");
    expect(upgradeButton).toHaveClass("hover:scale-105");

    const learnMoreButton = screen.getByText("Learn More");
    expect(learnMoreButton).toHaveClass("hover:bg-slate-600");
  });

  it("has animated background blur effect", () => {
    render(<ResumeRateLimitError {...defaultProps} />);

    const animatedBg = screen
      .getByText("Daily Limit Reached")
      .closest(".relative").previousElementSibling;
    expect(animatedBg).toHaveClass("animate-pulse");
  });

  it("displays gradient backgrounds", () => {
    render(<ResumeRateLimitError {...defaultProps} />);

    const gradientBg = screen
      .getByText("Daily Limit Reached")
      .closest(".relative").previousElementSibling;
    expect(gradientBg).toHaveClass(
      "bg-gradient-to-r",
      "from-red-600",
      "to-rose-600",
    );

    const upgradeSection = screen
      .getByText("Need More Analyses?")
      .closest(".bg-gradient-to-r");
    expect(upgradeSection).toHaveClass(
      "bg-gradient-to-r",
      "from-violet-600/10",
      "to-cyan-600/10",
    );
  });

  it("has proper button styling", () => {
    render(<ResumeRateLimitError {...defaultProps} />);

    const upgradeButton = screen.getByText("Upgrade to Pro");
    expect(upgradeButton).toHaveClass(
      "bg-gradient-to-r",
      "from-violet-600",
      "to-purple-600",
    );

    const learnMoreButton = screen.getByText("Learn More");
    expect(learnMoreButton).toHaveClass("bg-slate-700");
  });

  it("displays limit stats with proper layout", () => {
    render(<ResumeRateLimitError {...defaultProps} />);

    const limitContainer = screen
      .getByText("5")
      .closest(".flex.items-center.justify-center.gap-4");
    expect(limitContainer).toHaveClass(
      "flex",
      "items-center",
      "justify-center",
      "gap-4",
    );

    const divider = screen.getByText("5").parentElement?.nextElementSibling;
    expect(divider).toHaveClass("w-px", "h-12", "bg-red-400/30");
  });

  it("has proper text colors and styling", () => {
    render(<ResumeRateLimitError {...defaultProps} />);

    const title = screen.getByText("Daily Limit Reached");
    expect(title).toHaveClass("text-2xl", "font-bold", "text-white");

    const subtitle = screen.getByText("Resume Analysis Rate Limit");
    expect(subtitle).toHaveClass("text-red-300", "text-lg");

    const limitNumbers = screen.getAllByText(/^[50]$/);
    limitNumbers.forEach((number) => {
      expect(number).toHaveClass("text-3xl", "font-bold", "text-red-400");
    });
  });

  it("displays reset time with proper styling", () => {
    render(<ResumeRateLimitError {...defaultProps} />);

    const resetContainer = screen.getByText("1h 59m").parentElement;
    expect(resetContainer).toHaveClass(
      "inline-flex",
      "items-center",
      "gap-2",
      "bg-slate-800/60",
      "backdrop-blur-sm",
    );

    const resetText = screen.getByText("1h 59m");
    expect(resetText).toHaveClass("text-white", "font-semibold");
  });

  it("has proper accessibility structure", () => {
    render(<ResumeRateLimitError {...defaultProps} />);

    // Modal should be properly structured
    const modal = screen.getByText("Daily Limit Reached").closest(".fixed");
    expect(modal).toBeInTheDocument();

    // Close button should have proper aria-label
    const closeButton = screen.getByRole("button", { name: "Close" });
    expect(closeButton).toHaveAttribute("aria-label", "Close");
  });

  it("handles edge case where resetTime is undefined", () => {
    render(<ResumeRateLimitError onClose={vi.fn()} resetTime={undefined} />);

    expect(screen.getByText("Soon")).toBeInTheDocument();
  });

  it("handles edge case where resetTime is null", () => {
    render(<ResumeRateLimitError onClose={vi.fn()} resetTime={null} />);

    expect(screen.getByText("Soon")).toBeInTheDocument();
  });

  it("renders all required sections", () => {
    render(<ResumeRateLimitError {...defaultProps} />);

    expect(screen.getByText("Daily Limit Reached")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(
      screen.getByText("Your daily limit will reset in:"),
    ).toBeInTheDocument();
    expect(screen.getByText("Need More Analyses?")).toBeInTheDocument();
  });
});
