import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import NetworkError from "../NetworkError";
import { render } from "@test/test-utils";

// Mock Heroicons
vi.mock("@heroicons/react/24/outline", () => ({
  WifiIcon: ({ className }) => (
    <div data-testid="wifi-icon" className={className} />
  ),
  ExclamationTriangleIcon: ({ className }) => (
    <div data-testid="exclamation-icon" className={className} />
  ),
  XMarkIcon: ({ className }) => (
    <div data-testid="x-mark-icon" className={className} />
  ),
  ArrowPathIcon: ({ className }) => (
    <div data-testid="arrow-path-icon" className={className} />
  ),
}));

describe("NetworkError", () => {
  const defaultProps = {
    title: "Connection Lost",
    message:
      "Unable to connect to the server. Please check your internet connection.",
    onClose: vi.fn(),
    onRetry: vi.fn(),
    showRetry: true,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("renders with default props", () => {
      render(<NetworkError {...defaultProps} />);

      expect(screen.getByText("Connection Lost")).toBeInTheDocument();
      expect(
        screen.getByText(
          "Unable to connect to the server. Please check your internet connection."
        )
      ).toBeInTheDocument();
      expect(screen.getByText("Try Again")).toBeInTheDocument();
      expect(screen.getByText("Cancel")).toBeInTheDocument();
      expect(screen.getByTestId("x-mark-icon")).toBeInTheDocument();
    });

    it("renders with custom title and message", () => {
      const customProps = {
        ...defaultProps,
        title: "Custom Error Title",
        message: "Custom error message for testing.",
      };

      render(<NetworkError {...customProps} />);

      expect(screen.getByText("Custom Error Title")).toBeInTheDocument();
      expect(
        screen.getByText("Custom error message for testing.")
      ).toBeInTheDocument();
    });

    it("renders backdrop", () => {
      render(<NetworkError {...defaultProps} />);

      const backdrop = document.querySelector(".fixed.inset-0.z-40");
      expect(backdrop).toBeInTheDocument();
      expect(backdrop).toHaveClass("bg-black/50");
    });

    it("renders modal container with proper styling", () => {
      render(<NetworkError {...defaultProps} />);

      const modal = document.querySelector(".fixed.inset-0.z-50");
      expect(modal).toBeInTheDocument();

      const card = document.querySelector(".bg-slate-800");
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass("rounded-3xl", "shadow-2xl", "p-8");
    });
  });

  describe("Icon and Styling", () => {
    it("renders wifi icon for network errors", () => {
      render(<NetworkError {...defaultProps} />);

      expect(screen.getByTestId("wifi-icon")).toBeInTheDocument();
    });

    it("applies correct color scheme for network errors", () => {
      render(<NetworkError {...defaultProps} />);

      // Check for blue/indigo color scheme (network error)
      const iconContainer = document.querySelector(".bg-indigo-500\\/20");
      expect(iconContainer).toBeInTheDocument();
    });

    it("renders with animated background elements", () => {
      render(<NetworkError {...defaultProps} />);

      const animatedElements = document.querySelectorAll(".animate-ping");
      expect(animatedElements.length).toBeGreaterThan(0);
    });
  });

  describe("Button Interactions", () => {
    it("calls onClose when close button is clicked", () => {
      render(<NetworkError {...defaultProps} />);

      const closeButton = screen.getByTestId("x-mark-icon").closest("button");
      fireEvent.click(closeButton);

      expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    });

    it("calls onRetry when try again button is clicked", () => {
      render(<NetworkError {...defaultProps} />);

      const retryButton = screen.getByText("Try Again");
      fireEvent.click(retryButton);

      expect(defaultProps.onRetry).toHaveBeenCalledTimes(1);
    });

    it("calls onClose when cancel button is clicked", () => {
      render(<NetworkError {...defaultProps} />);

      const cancelButton = screen.getByText("Cancel");
      fireEvent.click(cancelButton);

      expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    });

    it("calls onClose when backdrop is clicked", () => {
      render(<NetworkError {...defaultProps} />);

      const backdrop = document.querySelector(".fixed.inset-0.z-40");
      fireEvent.click(backdrop);

      expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe("Conditional Rendering", () => {
    it("shows retry button when showRetry is true", () => {
      render(<NetworkError {...defaultProps} showRetry={true} />);

      expect(screen.getByText("Try Again")).toBeInTheDocument();
    });

    it("hides retry button when showRetry is false", () => {
      render(<NetworkError {...defaultProps} showRetry={false} />);

      expect(screen.queryByText("Try Again")).not.toBeInTheDocument();
    });

    it("shows close button when onClose is provided", () => {
      render(<NetworkError {...defaultProps} />);

      expect(screen.getByTestId("x-mark-icon")).toBeInTheDocument();
    });

    it("hides close button when onClose is not provided", () => {
      const propsWithoutClose = {
        title: "Error",
        message: "Message",
        onRetry: vi.fn(),
        showRetry: true,
      };

      render(<NetworkError {...propsWithoutClose} />);

      expect(screen.queryByTestId("x-mark-icon")).not.toBeInTheDocument();
    });

    it("shows cancel button when onClose is provided", () => {
      render(<NetworkError {...defaultProps} />);

      expect(screen.getByText("Cancel")).toBeInTheDocument();
    });

    it("hides cancel button when onClose is not provided", () => {
      const propsWithoutClose = {
        title: "Error",
        message: "Message",
        onRetry: vi.fn(),
        showRetry: true,
      };

      render(<NetworkError {...propsWithoutClose} />);

      expect(screen.queryByText("Cancel")).not.toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA attributes", () => {
      render(<NetworkError {...defaultProps} />);

      const buttons = screen.getAllByRole("button");
      buttons.forEach((button) => {
        expect(button).toHaveAttribute("type", "button");
      });
    });
  });

  describe("Footer Content", () => {
    it("renders help text", () => {
      render(<NetworkError {...defaultProps} />);

      expect(
        screen.getByText("Check your internet connection and try again")
      ).toBeInTheDocument();
    });

    it("renders error ID and branding", () => {
      render(<NetworkError {...defaultProps} />);

      expect(screen.getByText(/Error ID:/)).toBeInTheDocument();
      expect(screen.getByText("JobPsych AI")).toBeInTheDocument();
    });

    it("generates unique error ID", () => {
      const { rerender } = render(<NetworkError {...defaultProps} />);

      const firstErrorId = screen.getByText(/Error ID:/).textContent;
      rerender(<NetworkError {...defaultProps} key="new" />);
      const secondErrorId = screen.getByText(/Error ID:/).textContent;

      // Error IDs should be different (based on Date.now())
      expect(firstErrorId).not.toBe(secondErrorId);
    });
  });

  describe("Animation and Styling", () => {
    it("applies hover effects to buttons", () => {
      render(<NetworkError {...defaultProps} />);

      const retryButton = screen.getByText("Try Again");
      expect(retryButton).toHaveClass("hover:scale-105", "active:scale-95");
    });

    it("applies transform effects to icon", () => {
      render(<NetworkError {...defaultProps} />);

      const icon = screen.getByTestId("wifi-icon");
      expect(icon).toHaveClass("hover:scale-110", "hover:rotate-12");
    });

    it("applies backdrop blur and transition", () => {
      render(<NetworkError {...defaultProps} />);

      const backdrop = document.querySelector(".fixed.inset-0.z-40");
      expect(backdrop).toHaveClass(
        "backdrop-blur-sm",
        "transition-all",
        "duration-300"
      );
    });
  });
});
