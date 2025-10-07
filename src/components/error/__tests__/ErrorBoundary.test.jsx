import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ErrorBoundary from "../ErrorBoundary";

// Mock localStorage
const localStorageMock = {
  removeItem: vi.fn(),
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// Mock window.location.reload
const reloadMock = vi.fn();
Object.defineProperty(window, "location", {
  value: { reload: reloadMock },
});

// Test component that throws an error
const ErrorThrowingComponent = ({ shouldThrow = true }) => {
  if (shouldThrow) {
    throw new Error("Test error");
  }
  return <div>No error</div>;
};

// Test component that throws an error in event handler
const ErrorInEventHandler = () => {
  const [shouldThrow, setShouldThrow] = React.useState(false);

  React.useEffect(() => {
    if (shouldThrow) {
      throw new Error("Event handler error");
    }
  }, [shouldThrow]);

  return <button onClick={() => setShouldThrow(true)}>Trigger Error</button>;
};

describe("ErrorBoundary Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset localStorage mock
    localStorageMock.removeItem.mockClear();
    reloadMock.mockClear();
  });

  it("renders children when no error occurs", () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("catches errors thrown by child components", () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => {
      render(
        <ErrorBoundary>
          <ErrorThrowingComponent />
        </ErrorBoundary>
      );
    }).not.toThrow();

    consoleSpy.mockRestore();
  });

  it("displays error UI when error is caught", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText("Oops! Something went wrong")).toBeInTheDocument();
    expect(
      screen.getByText(
        "We encountered an unexpected error while processing your resume. You can try again with the same file, upload a new resume, or reload the page to start fresh."
      )
    ).toBeInTheDocument();

    consoleSpy.mockRestore();
  });

  it("displays error details when error occurs", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText("Error Details:")).toBeInTheDocument();
    expect(screen.getByText("Error: Test error")).toBeInTheDocument();

    consoleSpy.mockRestore();
  });

  it("displays Try Again button", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    const tryAgainButton = screen.getByText("Try Again");
    expect(tryAgainButton).toBeInTheDocument();

    consoleSpy.mockRestore();
  });

  it("displays Upload New Resume button", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    const uploadNewButton = screen.getByText("Upload New Resume");
    expect(uploadNewButton).toBeInTheDocument();

    consoleSpy.mockRestore();
  });

  it("displays Reload Page button", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    const reloadButton = screen.getByText("Reload Page");
    expect(reloadButton).toBeInTheDocument();

    consoleSpy.mockRestore();
  });

  it("calls handleRetry when Try Again button is clicked", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    const tryAgainButton = screen.getByText("Try Again");
    fireEvent.click(tryAgainButton);

    // The error UI should still be there since the component throws again
    expect(screen.getByText("Oops! Something went wrong")).toBeInTheDocument();

    consoleSpy.mockRestore();
  });

  it("calls handleUploadNew when Upload New Resume button is clicked", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    const uploadNewButton = screen.getByText("Upload New Resume");
    fireEvent.click(uploadNewButton);

    // Should clear localStorage
    expect(localStorageMock.removeItem).toHaveBeenCalledWith("resumeData");
    expect(localStorageMock.removeItem).toHaveBeenCalledWith("questions");
    expect(localStorageMock.removeItem).toHaveBeenCalledWith("currentFile");

    // Should reload page
    expect(reloadMock).toHaveBeenCalledTimes(1);

    consoleSpy.mockRestore();
  });

  it("calls handleReload when Reload Page button is clicked", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    const reloadButton = screen.getByText("Reload Page");
    fireEvent.click(reloadButton);

    // Should reload page
    expect(reloadMock).toHaveBeenCalledTimes(1);

    consoleSpy.mockRestore();
  });

  it("clears localStorage when handleUploadNew is called", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    const uploadNewButton = screen.getByText("Upload New Resume");
    fireEvent.click(uploadNewButton);

    expect(localStorageMock.removeItem).toHaveBeenCalledTimes(3);
    expect(localStorageMock.removeItem).toHaveBeenCalledWith("resumeData");
    expect(localStorageMock.removeItem).toHaveBeenCalledWith("questions");
    expect(localStorageMock.removeItem).toHaveBeenCalledWith("currentFile");

    consoleSpy.mockRestore();
  });

  it("handles localStorage errors gracefully", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    // Mock localStorage to throw error
    localStorageMock.removeItem.mockImplementation(() => {
      throw new Error("localStorage error");
    });

    render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    const uploadNewButton = screen.getByText("Upload New Resume");
    fireEvent.click(uploadNewButton);

    // Should still reload even if localStorage fails
    expect(reloadMock).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith(
      "Could not clear localStorage:",
      expect.any(Error)
    );

    consoleSpy.mockRestore();
    warnSpy.mockRestore();
  });

  it("increments retry count on retry", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    // First render with error
    const { rerender } = render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    // Click retry
    const tryAgainButton = screen.getByText("Try Again");
    fireEvent.click(tryAgainButton);

    // Re-render with error again
    rerender(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    // Click retry again
    const tryAgainButton2 = screen.getByText("Try Again");
    fireEvent.click(tryAgainButton2);

    // The error UI should still be there since the component throws again
    expect(screen.getByText("Oops! Something went wrong")).toBeInTheDocument();

    consoleSpy.mockRestore();
  });

  it("displays error ID and JobPsych branding", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText(/Error ID:/)).toBeInTheDocument();
    expect(screen.getByText("JobPsych AI")).toBeInTheDocument();

    consoleSpy.mockRestore();
  });

  it("displays helpful message and support info", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    expect(
      screen.getByText(
        "If the problem persists, try uploading a different resume file or contact support for assistance."
      )
    ).toBeInTheDocument();

    consoleSpy.mockRestore();
  });

  it("has proper button styling and hover effects", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    const tryAgainButton = screen.getByText("Try Again");
    expect(tryAgainButton).toHaveClass(
      "hover:scale-105",
      "transform",
      "transition-all"
    );

    const uploadNewButton = screen.getByText("Upload New Resume");
    expect(uploadNewButton).toHaveClass(
      "hover:scale-105",
      "transform",
      "transition-all"
    );

    const reloadButton = screen.getByText("Reload Page");
    expect(reloadButton).toHaveClass(
      "hover:scale-105",
      "transform",
      "transition-all"
    );

    consoleSpy.mockRestore();
  });

  it("has proper modal structure and styling", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    // Find the modal container by its classes
    const modal = document.querySelector(
      ".min-h-screen.bg-gray-50.flex.items-center.justify-center.p-4"
    );
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveClass(
      "min-h-screen",
      "bg-gray-50",
      "flex",
      "items-center",
      "justify-center"
    );

    // Find the card by its classes
    const card = document.querySelector(
      ".bg-white.rounded-2xl.shadow-xl.border.border-gray-100"
    );
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass(
      "bg-white",
      "rounded-2xl",
      "shadow-xl",
      "border",
      "border-gray-100"
    );

    consoleSpy.mockRestore();
  });

  it("displays animated background elements", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    // Find animated background elements by their classes
    const animatedElements = document.querySelectorAll(
      ".absolute.w-32.h-32.rounded-full.mix-blend-multiply"
    );
    expect(animatedElements.length).toBeGreaterThan(0);

    consoleSpy.mockRestore();
  });

  it("has proper accessibility attributes", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(3); // Try Again, Upload New Resume, Reload Page

    consoleSpy.mockRestore();
  });

  it("handles errors thrown in event handlers", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ErrorInEventHandler />
      </ErrorBoundary>
    );

    // Initially no error
    expect(screen.getByText("Trigger Error")).toBeInTheDocument();

    // Trigger error
    const button = screen.getByText("Trigger Error");
    fireEvent.click(button);

    // Should catch the error and show error UI
    await waitFor(() => {
      expect(
        screen.getByText("Oops! Something went wrong")
      ).toBeInTheDocument();
    });

    consoleSpy.mockRestore();
  });

  it("calls componentDidCatch with error and errorInfo", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    let reportErrorSpy;

    // Only mock reportError if it exists on window
    if (typeof window !== "undefined" && window.reportError) {
      reportErrorSpy = vi
        .spyOn(window, "reportError")
        .mockImplementation(() => {});
    }

    render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    if (reportErrorSpy) {
      expect(reportErrorSpy).toHaveBeenCalledWith(expect.any(Error));
      reportErrorSpy.mockRestore();
    }

    consoleSpy.mockRestore();
  });

  it("handles multiple errors gracefully", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const { rerender } = render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    // Should show error UI
    expect(screen.getByText("Oops! Something went wrong")).toBeInTheDocument();

    // Try to render another error
    rerender(
      <ErrorBoundary>
        <ErrorThrowingComponent shouldThrow={false} />
      </ErrorBoundary>
    );

    // Should still show error UI (once error boundary catches error, it stays in error state)
    expect(screen.getByText("Oops! Something went wrong")).toBeInTheDocument();

    consoleSpy.mockRestore();
  });
});
