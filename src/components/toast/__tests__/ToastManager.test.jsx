import React from "react";
import { render, screen, fireEvent, act } from "@test/test-utils";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { ToastProvider } from "../ToastManager";
import { useToast } from "../../../hooks/useToast";

// Mock error handler utilities
vi.mock("../../../utils/errorHandler", () => ({
  formatErrorMessage: vi.fn((error) => error.message || "Mock error message"),
  getErrorType: vi.fn(() => "network"),
  getErrorCategory: vi.fn(() => "network"),
}));

describe("ToastProvider", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  const TestComponent = () => {
    const {
      showSuccess,
      showError,
      showWarning,
      showInfo,
      toasts,
      removeToast,
      removeAllToasts,
    } = useToast();

    return (
      <div>
        <button onClick={() => showSuccess("Success message")}>
          Show Success
        </button>
        <button onClick={() => showError(new Error("Test error"))}>
          Show Error
        </button>
        <button onClick={() => showWarning("Warning message")}>
          Show Warning
        </button>
        <button onClick={() => showInfo("Info message")}>Show Info</button>
        <button onClick={() => removeAllToasts()}>Clear All</button>
        <div data-testid="toast-count">{toasts.length}</div>
        {toasts.map((toast) => (
          <div key={toast.id} data-testid={`toast-${toast.id}`}>
            <span>{toast.message}</span>
            <button onClick={() => removeToast(toast.id)}>Remove</button>
          </div>
        ))}
      </div>
    );
  };

  const renderWithProvider = (component) => {
    return render(<ToastProvider>{component}</ToastProvider>);
  };

  it("provides toast context to children", () => {
    renderWithProvider(<TestComponent />);

    expect(screen.getByText("Show Success")).toBeInTheDocument();
    expect(screen.getByText("Show Error")).toBeInTheDocument();
  });

  it("shows success toast when showSuccess is called", () => {
    renderWithProvider(<TestComponent />);

    const successButton = screen.getByText("Show Success");
    fireEvent.click(successButton);

    expect(screen.getByTestId("toast-count")).toHaveTextContent("1");
    // Check that the toast appears in the container (not in our test component)
    expect(screen.getAllByText("Success message")).toHaveLength(2); // One in test component, one in toast
  });

  it("shows error toast when showError is called", () => {
    renderWithProvider(<TestComponent />);

    const errorButton = screen.getByText("Show Error");
    fireEvent.click(errorButton);

    expect(screen.getByTestId("toast-count")).toHaveTextContent("1");
    // Check that the error appears in the actual toast (not just test component)
    expect(screen.getAllByText(/Test error|Mock error message/)).toHaveLength(
      2,
    );
  });

  it("shows warning toast when showWarning is called", () => {
    renderWithProvider(<TestComponent />);

    const warningButton = screen.getByText("Show Warning");
    fireEvent.click(warningButton);

    expect(screen.getByTestId("toast-count")).toHaveTextContent("1");
    expect(screen.getAllByText("Warning message")).toHaveLength(2);
  });

  it("shows info toast when showInfo is called", () => {
    renderWithProvider(<TestComponent />);

    const infoButton = screen.getByText("Show Info");
    fireEvent.click(infoButton);

    expect(screen.getByTestId("toast-count")).toHaveTextContent("1");
    expect(screen.getAllByText("Info message")).toHaveLength(2);
  });

  it("removes toast when removeToast is called", () => {
    renderWithProvider(<TestComponent />);

    const successButton = screen.getByText("Show Success");
    fireEvent.click(successButton);

    expect(screen.getByTestId("toast-count")).toHaveTextContent("1");

    const removeButton = screen.getByText("Remove");
    fireEvent.click(removeButton);

    expect(screen.getByTestId("toast-count")).toHaveTextContent("0");
  });

  it("removes all toasts when removeAllToasts is called", () => {
    renderWithProvider(<TestComponent />);

    const successButton = screen.getByText("Show Success");
    fireEvent.click(successButton);
    fireEvent.click(successButton);

    expect(screen.getByTestId("toast-count")).toHaveTextContent("2");

    const clearButton = screen.getByText("Clear All");
    fireEvent.click(clearButton);

    expect(screen.getByTestId("toast-count")).toHaveTextContent("0");
  });

  it("auto-removes toasts after duration", async () => {
    renderWithProvider(<TestComponent />);

    const successButton = screen.getByText("Show Success");
    fireEvent.click(successButton);

    expect(screen.getByTestId("toast-count")).toHaveTextContent("1");

    // Advance timer by 4 seconds (success toast duration)
    act(() => {
      vi.advanceTimersByTime(4000);
    });

    expect(screen.getByTestId("toast-count")).toHaveTextContent("0");
  }, 10000);

  it("does not auto-remove toasts with duration 0", () => {
    const CustomDurationComponent = () => {
      const { addToast, toasts } = useToast();

      return (
        <div>
          <button
            onClick={() =>
              addToast({
                type: "success",
                message: "No auto-remove",
                duration: 0,
              })
            }
          >
            Add Persistent Toast
          </button>
          <div data-testid="toast-count">{toasts.length}</div>
        </div>
      );
    };

    renderWithProvider(<CustomDurationComponent />);

    const addButton = screen.getByText("Add Persistent Toast");
    fireEvent.click(addButton);

    expect(screen.getByTestId("toast-count")).toHaveTextContent("1");

    // Advance timer by 10 seconds
    act(() => {
      vi.advanceTimersByTime(10000);
    });

    // Should still be there
    expect(screen.getByTestId("toast-count")).toHaveTextContent("1");
  });

  it("positions toasts correctly", () => {
    const PositionTestComponent = () => {
      const { addToast } = useToast();

      return (
        <div>
          <button
            onClick={() =>
              addToast({
                type: "success",
                message: "Top Left",
                position: "top-left",
              })
            }
          >
            Add Top Left
          </button>
          <button
            onClick={() =>
              addToast({
                type: "success",
                message: "Bottom Right",
                position: "bottom-right",
              })
            }
          >
            Add Bottom Right
          </button>
        </div>
      );
    };

    renderWithProvider(<PositionTestComponent />);

    const topLeftButton = screen.getByText("Add Top Left");
    const bottomRightButton = screen.getByText("Add Bottom Right");

    fireEvent.click(topLeftButton);
    fireEvent.click(bottomRightButton);

    // Check that both toasts are rendered
    expect(screen.getByText("Top Left")).toBeInTheDocument();
    expect(screen.getByText("Bottom Right")).toBeInTheDocument();
  });

  it("handles multiple toasts with different positions", () => {
    const MultiPositionComponent = () => {
      const { addToast, toasts } = useToast();

      return (
        <div>
          <button
            onClick={() => {
              addToast({
                type: "success",
                message: "Toast 1",
                position: "top-left",
              });
              addToast({
                type: "error",
                message: "Toast 2",
                position: "top-right",
              });
              addToast({
                type: "warning",
                message: "Toast 3",
                position: "top-left",
              });
            }}
          >
            Add Multiple
          </button>
          <div data-testid="toast-count">{toasts.length}</div>
        </div>
      );
    };

    renderWithProvider(<MultiPositionComponent />);

    const addButton = screen.getByText("Add Multiple");
    fireEvent.click(addButton);

    expect(screen.getByTestId("toast-count")).toHaveTextContent("3");
    expect(screen.getByText("Toast 1")).toBeInTheDocument();
    expect(screen.getByText("Toast 2")).toBeInTheDocument();
    expect(screen.getByText("Toast 3")).toBeInTheDocument();
  });

  it("handles custom toast options", () => {
    const CustomOptionsComponent = () => {
      const { addToast } = useToast();

      return (
        <button
          onClick={() =>
            addToast({
              type: "success",
              title: "Custom Title",
              message: "Custom message",
              duration: 10000,
              showProgress: false,
              actions: [{ label: "Action", onClick: vi.fn() }],
            })
          }
        >
          Add Custom Toast
        </button>
      );
    };

    renderWithProvider(<CustomOptionsComponent />);

    const addButton = screen.getByText("Add Custom Toast");
    fireEvent.click(addButton);

    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(screen.getByText("Custom message")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
  });

  it("handles error toast with custom options", () => {
    const ErrorOptionsComponent = () => {
      const { showError } = useToast();

      return (
        <button
          onClick={() =>
            showError(new Error("Custom error"), {
              title: "Custom Error Title",
              message: "Custom error message",
              duration: 8000,
            })
          }
        >
          Show Custom Error
        </button>
      );
    };

    renderWithProvider(<ErrorOptionsComponent />);

    const errorButton = screen.getByText("Show Custom Error");
    fireEvent.click(errorButton);

    expect(screen.getByText("Custom Error Title")).toBeInTheDocument();
    expect(screen.getByText("Custom error message")).toBeInTheDocument();
  });

  it("maintains toast order and stacking", () => {
    const OrderTestComponent = () => {
      const { addToast, toasts } = useToast();

      return (
        <div>
          <button
            onClick={() => addToast({ type: "success", message: "First" })}
          >
            Add First
          </button>
          <button
            onClick={() => addToast({ type: "success", message: "Second" })}
          >
            Add Second
          </button>
          <div data-testid="toast-order">
            {toasts.map((toast, index) => (
              <span key={toast.id}>
                {toast.message}-{index}
              </span>
            ))}
          </div>
        </div>
      );
    };

    renderWithProvider(<OrderTestComponent />);

    const firstButton = screen.getByText("Add First");
    const secondButton = screen.getByText("Add Second");

    fireEvent.click(firstButton);
    fireEvent.click(secondButton);

    const orderDiv = screen.getByTestId("toast-order");
    expect(orderDiv).toHaveTextContent("First-0Second-1");
  });

  it("cleans up timers on unmount", () => {
    const { unmount } = renderWithProvider(<TestComponent />);

    const successButton = screen.getByText("Show Success");
    fireEvent.click(successButton);

    expect(screen.getByTestId("toast-count")).toHaveTextContent("1");

    unmount();

    // Advance timer - should not cause issues
    act(() => {
      vi.advanceTimersByTime(4000);
    });

    // No assertions needed - just ensuring no errors
  });

  it("handles rapid toast additions", () => {
    const RapidAddComponent = () => {
      const { addToast, toasts } = useToast();

      return (
        <div>
          <button
            onClick={() => {
              for (let i = 0; i < 10; i++) {
                addToast({ type: "success", message: `Toast ${i}` });
              }
            }}
          >
            Add 10 Toasts
          </button>
          <div data-testid="toast-count">{toasts.length}</div>
        </div>
      );
    };

    renderWithProvider(<RapidAddComponent />);

    const addButton = screen.getByText("Add 10 Toasts");
    fireEvent.click(addButton);

    expect(screen.getByTestId("toast-count")).toHaveTextContent("10");
  });

  it("renders ToastContainer with proper positioning classes", () => {
    renderWithProvider(<TestComponent />);

    const successButton = screen.getByText("Show Success");
    fireEvent.click(successButton);

    // Check that the toast container has proper positioning
    const toastContainer = document.querySelector(".fixed.z-50");
    expect(toastContainer).toBeInTheDocument();

    const positionContainer = document.querySelector(".top-4.right-4");
    expect(positionContainer).toBeInTheDocument();
  });
});
