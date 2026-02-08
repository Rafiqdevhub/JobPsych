import React from "react";
import { render, screen, fireEvent, act } from "@test/test-utils";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import SimpleToast from "../SimpleToast";

describe("SimpleToast Component", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it("renders with default error type", () => {
    render(<SimpleToast message="Test error message" />);

    expect(screen.getByText("Test error message")).toBeInTheDocument();
    // SimpleToast doesn't have a default message, it requires a message prop
  });

  it("renders with success type", () => {
    render(<SimpleToast message="Success message" type="success" />);

    expect(screen.getByText("Success message")).toBeInTheDocument();

    // Check for success styling
    const toast = document.querySelector(".bg-green-50");
    expect(toast).toBeInTheDocument();
  });

  it("renders with warning type", () => {
    render(<SimpleToast message="Warning message" type="warning" />);

    expect(screen.getByText("Warning message")).toBeInTheDocument();

    // Check for warning styling
    const toast = document.querySelector(".bg-yellow-50");
    expect(toast).toBeInTheDocument();
  });

  it("renders with error type explicitly", () => {
    render(<SimpleToast message="Error message" type="error" />);

    expect(screen.getByText("Error message")).toBeInTheDocument();

    // Check for error styling
    const toast = document.querySelector(".bg-red-50");
    expect(toast).toBeInTheDocument();
  });

  it("shows default message when no message provided", () => {
    render(<SimpleToast />);

    expect(screen.getByText("An error occurred")).toBeInTheDocument();
  });

  it("does not render when show is false", () => {
    render(<SimpleToast message="Hidden message" show={false} />);

    expect(screen.queryByText("Hidden message")).not.toBeInTheDocument();
  });

  it("renders close button when onClose is provided", () => {
    const mockOnClose = vi.fn();
    render(<SimpleToast message="Test message" onClose={mockOnClose} />);

    const closeButton = screen.getByRole("button", { name: /close/i });
    expect(closeButton).toBeInTheDocument();
  });

  it("does not render close button when onClose is not provided", () => {
    render(<SimpleToast message="Test message" />);

    const closeButton = screen.queryByRole("button", { name: /close/i });
    expect(closeButton).not.toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const mockOnClose = vi.fn();
    render(<SimpleToast message="Test message" onClose={mockOnClose} />);

    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("auto-dismisses after 5 seconds when onClose is provided", async () => {
    const mockOnClose = vi.fn();
    render(
      <SimpleToast message="Auto-dismiss message" onClose={mockOnClose} />,
    );

    // Initially visible
    expect(screen.getByText("Auto-dismiss message")).toBeInTheDocument();

    // Advance timer by 5 seconds
    act(() => {
      vi.advanceTimersByTime(5000);
    });

    // onClose should be called immediately after the timer
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  }, 7000);

  it("does not auto-dismiss when onClose is not provided", () => {
    render(<SimpleToast message="No auto-dismiss message" />);

    // Advance timer by 5 seconds
    act(() => {
      vi.advanceTimersByTime(5000);
    });

    // Should still be visible
    expect(screen.getByText("No auto-dismiss message")).toBeInTheDocument();
  });

  it("clears timeout on unmount", () => {
    const mockOnClose = vi.fn();
    const { unmount } = render(
      <SimpleToast message="Unmount test" onClose={mockOnClose} />,
    );

    unmount();

    // Advance timer - should not call onClose since component is unmounted
    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it("displays correct icon for success type", () => {
    render(<SimpleToast message="Success" type="success" />);

    // Check for success icon (check mark)
    const icon = document.querySelector("svg.h-5.w-5.text-green-400");
    expect(icon).toBeInTheDocument();
  });

  it("displays correct icon for warning type", () => {
    render(<SimpleToast message="Warning" type="warning" />);

    // Check for warning icon (exclamation triangle)
    const icon = document.querySelector("svg.h-5.w-5.text-yellow-400");
    expect(icon).toBeInTheDocument();
  });

  it("displays correct icon for error type", () => {
    render(<SimpleToast message="Error" type="error" />);

    // Check for error icon (X circle)
    const icon = document.querySelector("svg.h-5.w-5.text-red-400");
    expect(icon).toBeInTheDocument();
  });

  it("has correct positioning and z-index", () => {
    render(<SimpleToast message="Position test" />);

    const container = document.querySelector(".fixed.top-4.right-4.z-50");
    expect(container).toBeInTheDocument();
  });

  it("has correct responsive width", () => {
    render(<SimpleToast message="Width test" />);

    const container = document.querySelector(".w-full.max-w-sm");
    expect(container).toBeInTheDocument();
  });

  it("applies correct border styling", () => {
    render(<SimpleToast message="Border test" />);

    const toast = document.querySelector(".border-2");
    expect(toast).toBeInTheDocument();
  });

  it("maintains component stability during re-renders", () => {
    const { rerender } = render(<SimpleToast message="Stability test" />);

    // Check initial render
    expect(screen.getByText("Stability test")).toBeInTheDocument();

    // Re-render
    rerender(<SimpleToast message="Stability test" />);

    // Should still be there
    expect(screen.getByText("Stability test")).toBeInTheDocument();
  });

  it("handles type prop changes correctly", () => {
    const { rerender } = render(
      <SimpleToast message="Type change test" type="success" />,
    );

    // Initially success styling
    expect(document.querySelector(".bg-green-50")).toBeInTheDocument();

    // Change to error
    rerender(<SimpleToast message="Type change test" type="error" />);

    // Should have error styling
    expect(document.querySelector(".bg-red-50")).toBeInTheDocument();
  });
});
