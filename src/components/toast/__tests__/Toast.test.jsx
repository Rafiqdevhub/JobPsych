import React from "react";
import { render, screen, fireEvent, act } from "@test/test-utils";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import Toast from "../Toast";

describe("Toast Component", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it("renders with default error type", () => {
    render(<Toast message="Test error message" show={true} />);

    expect(screen.getByText("Test error message")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("renders with success type", () => {
    render(<Toast message="Success message" type="success" show={true} />);

    expect(screen.getByText("Success message")).toBeInTheDocument();

    // Check for success styling - look for the gradient background
    const toast = document.querySelector(".from-green-50\\/90");
    expect(toast).toBeInTheDocument();
  });

  it("renders with warning type", () => {
    render(<Toast message="Warning message" type="warning" show={true} />);

    expect(screen.getByText("Warning message")).toBeInTheDocument();

    // Check for warning styling
    const toast = document.querySelector(".from-amber-50\\/90");
    expect(toast).toBeInTheDocument();
  });

  it("renders with info type", () => {
    render(<Toast message="Info message" type="info" show={true} />);

    expect(screen.getByText("Info message")).toBeInTheDocument();

    // Check for info styling
    const toast = document.querySelector(".from-blue-50\\/90");
    expect(toast).toBeInTheDocument();
  });

  it("renders with title when provided", () => {
    render(<Toast title="Test Title" message="Test message" show={true} />);

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test message")).toBeInTheDocument();
  });

  it("does not render when show is false", () => {
    render(<Toast message="Hidden message" show={false} />);

    expect(screen.queryByText("Hidden message")).not.toBeInTheDocument();
  });

  it("renders close button when onClose is provided", () => {
    const mockOnClose = vi.fn();
    render(<Toast message="Test message" show={true} onClose={mockOnClose} />);

    const closeButton = screen.getByRole("button", { name: /close/i });
    expect(closeButton).toBeInTheDocument();
  });

  it("does not render close button when onClose is not provided", () => {
    render(<Toast message="Test message" show={true} />);

    const closeButton = screen.queryByRole("button", { name: /close/i });
    expect(closeButton).not.toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", async () => {
    const mockOnClose = vi.fn();
    render(<Toast message="Test message" show={true} onClose={mockOnClose} />);

    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    // Advance timer by 300ms (handleClose delay)
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  }, 2000);

  it.skip("auto-dismisses after specified duration", async () => {
    const mockOnClose = vi.fn();
    render(
      <Toast
        message="Auto-dismiss message"
        onClose={mockOnClose}
        duration={3000}
      />,
    );

    // Initially visible
    expect(screen.getByText("Auto-dismiss message")).toBeInTheDocument();

    // Advance timer by more than enough time to complete the auto-dismiss
    act(() => {
      vi.advanceTimersByTime(5000);
    });

    // The toast should be hidden after auto-dismiss
    expect(screen.queryByText("Auto-dismiss message")).not.toBeInTheDocument();
  }, 5000);

  it("does not auto-dismiss when duration is 0", () => {
    const mockOnClose = vi.fn();
    render(
      <Toast
        message="No auto-dismiss message"
        show={true}
        onClose={mockOnClose}
        duration={0}
      />,
    );

    // Advance timer by 5 seconds
    act(() => {
      vi.advanceTimersByTime(5000);
    });

    // Should still be visible
    expect(screen.getByText("No auto-dismiss message")).toBeInTheDocument();
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it("shows progress bar by default", () => {
    render(<Toast message="Progress test" show={true} />);

    const progressBar = document.querySelector(".h-full");
    expect(progressBar).toBeInTheDocument();
  });

  it("hides progress bar when showProgress is false", () => {
    render(
      <Toast message="No progress test" show={true} showProgress={false} />,
    );

    const progressBar = document.querySelector(".h-full");
    expect(progressBar).not.toBeInTheDocument();
  });

  it("renders in different positions", () => {
    const { rerender } = render(
      <Toast message="Position test" show={true} position="top-left" />,
    );

    expect(document.querySelector(".top-4.left-4")).toBeInTheDocument();

    rerender(
      <Toast message="Position test" show={true} position="bottom-right" />,
    );
    expect(document.querySelector(".bottom-4.right-4")).toBeInTheDocument();

    rerender(
      <Toast message="Position test" show={true} position="top-center" />,
    );
    expect(document.querySelector(".top-4.left-1\\/2")).toBeInTheDocument();
  });

  it("renders action buttons when provided", () => {
    const mockAction = vi.fn();
    const actions = [
      { label: "Retry", onClick: mockAction, variant: "primary" },
      { label: "Cancel", onClick: vi.fn(), variant: "secondary" },
    ];

    render(<Toast message="Actions test" show={true} actions={actions} />);

    expect(screen.getByText("Retry")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("calls action onClick when action button is clicked", () => {
    const mockAction = vi.fn();
    const actions = [
      { label: "Retry", onClick: mockAction, variant: "primary" },
    ];

    render(<Toast message="Action test" show={true} actions={actions} />);

    const retryButton = screen.getByText("Retry");
    fireEvent.click(retryButton);

    expect(mockAction).toHaveBeenCalledTimes(1);
  });

  it("determines toast type from errorData", () => {
    const errorData = { errorType: "network" };
    render(<Toast message="Network error" show={true} errorData={errorData} />);

    // Should use networkError styling
    const toast = document.querySelector(".from-orange-50\\/90");
    expect(toast).toBeInTheDocument();
  });

  it("falls back to error type for unknown errorData", () => {
    const errorData = { errorType: "unknown" };
    render(<Toast message="Unknown error" show={true} errorData={errorData} />);

    // Should use error styling
    const toast = document.querySelector(".from-red-50\\/90");
    expect(toast).toBeInTheDocument();
  });

  it("shows shake animation for error types", () => {
    render(<Toast message="Shake test" type="error" show={true} />);

    // Initially should have shake class
    const toast = document.querySelector(".animate-pulse");
    expect(toast).toBeInTheDocument();
  });

  it("renders backdrop blur overlay", () => {
    render(<Toast message="Backdrop test" show={true} />);

    const backdrop = document.querySelector(".bg-black\\/20.backdrop-blur-sm");
    expect(backdrop).toBeInTheDocument();
  });

  it("closes when backdrop is clicked", async () => {
    const mockOnClose = vi.fn();
    render(<Toast message="Backdrop test" show={true} onClose={mockOnClose} />);

    const backdrop = document.querySelector(".bg-black\\/20.backdrop-blur-sm");
    fireEvent.click(backdrop);

    // Advance timer by 300ms (handleClose delay)
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  }, 2000);

  it("applies correct accessibility attributes", () => {
    render(<Toast message="Accessibility test" show={true} />);

    const alert = screen.getByRole("alert");
    expect(alert).toHaveAttribute("aria-live", "polite");
  });

  it("maintains component stability during re-renders", () => {
    const { rerender } = render(<Toast message="Stability test" show={true} />);

    // Check initial render
    expect(screen.getByText("Stability test")).toBeInTheDocument();

    // Re-render
    rerender(<Toast message="Stability test" show={true} />);

    // Should still be there
    expect(screen.getByText("Stability test")).toBeInTheDocument();
  });

  it("handles show prop changes correctly", () => {
    const { rerender } = render(<Toast message="Show test" show={true} />);

    expect(screen.getByText("Show test")).toBeInTheDocument();

    rerender(<Toast message="Show test" show={false} />);

    expect(screen.queryByText("Show test")).not.toBeInTheDocument();
  });
});
