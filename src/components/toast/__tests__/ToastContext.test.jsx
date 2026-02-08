import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { render } from "@test/test-utils";
import { describe, it, expect } from "vitest";
import { ToastContext } from "../ToastContext";

describe("ToastContext", () => {
  it("provides default context value when used with ToastProvider", () => {
    let contextValue;

    const TestComponent = () => {
      contextValue = React.useContext(ToastContext);
      return null;
    };

    render(<TestComponent />);

    // When using the custom render (which includes ToastProvider),
    // the context should have the default toast methods
    expect(contextValue).toBeDefined();
    expect(contextValue).toHaveProperty("toasts");
    expect(contextValue).toHaveProperty("addToast");
    expect(contextValue).toHaveProperty("removeToast");
  });

  it("provides undefined when used without a provider", () => {
    let contextValue;

    const TestComponent = () => {
      contextValue = React.useContext(ToastContext);
      return null;
    };

    // Use base render without custom providers
    rtlRender(<TestComponent />);

    expect(contextValue).toBeUndefined();
  });

  it("can be used with a provider", () => {
    const mockValue = { test: "value" };
    let contextValue;

    const TestComponent = () => {
      contextValue = React.useContext(ToastContext);
      return null;
    };

    render(
      <ToastContext.Provider value={mockValue}>
        <TestComponent />
      </ToastContext.Provider>,
    );

    expect(contextValue).toEqual(mockValue);
  });

  it("exports ToastContext correctly", () => {
    expect(ToastContext).toBeDefined();
    expect(ToastContext.Provider).toBeDefined();
    expect(ToastContext.Consumer).toBeDefined();
  });
});
