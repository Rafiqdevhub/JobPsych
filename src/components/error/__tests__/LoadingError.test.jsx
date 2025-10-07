import React from "react";
import { render, screen, fireEvent } from "@test/test-utils";
import { expect, test, vi, describe } from "vitest";
import LoadingError from "../LoadingError";

describe("LoadingError Component", () => {
  test("renders with default props", () => {
    render(<LoadingError />);

    expect(screen.getByText("Upload Failed")).toBeInTheDocument();
    expect(
      screen.getByText("We couldn't upload your resume. Please try again.")
    ).toBeInTheDocument();
  });

  test("renders with custom title and message", () => {
    render(
      <LoadingError
        title="Custom Error"
        message="Custom error message"
        type="custom"
      />
    );

    expect(screen.getByText("Custom Error")).toBeInTheDocument();
    expect(screen.getByText("Custom error message")).toBeInTheDocument();
  });

  test("renders analysis type with correct content", () => {
    render(<LoadingError type="analysis" />);

    expect(screen.getByText("Analysis Failed")).toBeInTheDocument();
    expect(
      screen.getByText(
        "We encountered an issue while analyzing your resume. Please try again."
      )
    ).toBeInTheDocument();

    // Check suggestions
    expect(screen.getByText("Try these solutions:")).toBeInTheDocument();
    expect(
      screen.getByText("Make sure your resume is in PDF or DOCX format")
    ).toBeInTheDocument();
  });

  test("renders upload type with correct content", () => {
    render(<LoadingError type="upload" />);

    expect(screen.getByText("Upload Failed")).toBeInTheDocument();
    expect(
      screen.getByText("We couldn't upload your resume. Please try again.")
    ).toBeInTheDocument();

    // Check suggestions
    expect(
      screen.getByText("Check your internet connection")
    ).toBeInTheDocument();
  });

  test("shows retry button when onRetry provided and showRetry is true", () => {
    const handleRetry = vi.fn();
    render(<LoadingError onRetry={handleRetry} showRetry={true} />);

    const retryButton = screen.getByRole("button", { name: /try again/i });
    expect(retryButton).toBeInTheDocument();

    fireEvent.click(retryButton);
    expect(handleRetry).toHaveBeenCalledTimes(1);
  });

  test("hides retry button when showRetry is false", () => {
    const handleRetry = vi.fn();
    render(<LoadingError onRetry={handleRetry} showRetry={false} />);

    const retryButton = screen.queryByRole("button", { name: /try again/i });
    expect(retryButton).not.toBeInTheDocument();
  });

  test("shows reset button when onReset provided and showReset is true", () => {
    const handleReset = vi.fn();
    render(<LoadingError onReset={handleReset} showReset={true} />);

    const resetButton = screen.getByRole("button", {
      name: /upload new file/i,
    });
    expect(resetButton).toBeInTheDocument();

    fireEvent.click(resetButton);
    expect(handleReset).toHaveBeenCalledTimes(1);
  });

  test("hides reset button when showReset is false", () => {
    const handleReset = vi.fn();
    render(<LoadingError onReset={handleReset} showReset={false} />);

    const resetButton = screen.queryByRole("button", {
      name: /upload new file/i,
    });
    expect(resetButton).not.toBeInTheDocument();
  });

  test("shows close button when onClose provided", () => {
    const handleClose = vi.fn();
    render(<LoadingError onClose={handleClose} />);

    const closeButton = screen.getByRole("button", { name: /cancel/i });
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test("hides close button when onClose not provided", () => {
    render(<LoadingError />);

    const closeButton = screen.queryByRole("button", { name: /cancel/i });
    expect(closeButton).not.toBeInTheDocument();
  });

  test("calls onClose when backdrop is clicked", () => {
    const handleClose = vi.fn();
    render(<LoadingError onClose={handleClose} />);

    const backdrop = document.querySelector(".fixed.inset-0.z-40");
    fireEvent.click(backdrop);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test("renders error ID with current timestamp", () => {
    const beforeRender = Date.now();
    render(<LoadingError />);
    const afterRender = Date.now();

    const errorIdElement = screen.getByText(/Error ID:/);
    expect(errorIdElement).toBeInTheDocument();

    const errorId = errorIdElement.textContent.match(/Error ID: (\d+)/)[1];
    const errorIdNum = parseInt(errorId);

    expect(errorIdNum).toBeGreaterThanOrEqual(beforeRender);
    expect(errorIdNum).toBeLessThanOrEqual(afterRender);
  });

  test("renders suggestions for analysis type", () => {
    render(<LoadingError type="analysis" />);

    expect(
      screen.getByText("Make sure your resume is in PDF or DOCX format")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Check that the file is not corrupted")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Ensure the file size is under 5MB")
    ).toBeInTheDocument();
  });

  test("renders suggestions for upload type", () => {
    render(<LoadingError type="upload" />);

    expect(
      screen.getByText("Check your internet connection")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Make sure the file format is supported")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Try uploading a smaller file")
    ).toBeInTheDocument();
  });

  test("does not render suggestions for unknown type", () => {
    render(<LoadingError type="unknown" />);

    expect(screen.queryByText("Try these solutions:")).not.toBeInTheDocument();
  });
});
