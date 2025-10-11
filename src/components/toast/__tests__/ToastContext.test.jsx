import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ToastContext } from "../ToastContext";

describe("ToastContext", () => {
  it("provides default context value", () => {
    let contextValue;

    const TestComponent = () => {
      contextValue = React.useContext(ToastContext);
      return null;
    };

    render(<TestComponent />);

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
      </ToastContext.Provider>
    );

    expect(contextValue).toEqual(mockValue);
  });

  it("exports ToastContext correctly", () => {
    expect(ToastContext).toBeDefined();
    expect(ToastContext.Provider).toBeDefined();
    expect(ToastContext.Consumer).toBeDefined();
  });
});
