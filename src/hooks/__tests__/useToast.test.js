import { renderHook } from "@testing-library/react";
import { expect, test, describe } from "vitest";
import { useToast } from "../useToast";
import { ToastProvider } from "../../components/toast/ToastManager";

describe("useToast Hook", () => {
  test("throws error when used outside ToastProvider", () => {
    expect(() => {
      renderHook(() => useToast());
    }).toThrow("useToast must be used within a ToastProvider");
  });

  test("returns context when used within ToastProvider", () => {
    const { result } = renderHook(() => useToast(), {
      wrapper: ToastProvider,
    });

    expect(result.current).toBeDefined();
    expect(typeof result.current.addToast).toBe("function");
    expect(typeof result.current.removeToast).toBe("function");
    expect(typeof result.current.showError).toBe("function");
    expect(typeof result.current.showSuccess).toBe("function");
    expect(typeof result.current.showWarning).toBe("function");
    expect(typeof result.current.showInfo).toBe("function");
    expect(Array.isArray(result.current.toasts)).toBe(true);
  });

  test("has expected methods in context", () => {
    const { result } = renderHook(() => useToast(), {
      wrapper: ToastProvider,
    });

    const expectedMethods = [
      "toasts",
      "addToast",
      "removeToast",
      "removeAllToasts",
      "showError",
      "showSuccess",
      "showWarning",
      "showInfo",
    ];

    expectedMethods.forEach((method) => {
      expect(result.current).toHaveProperty(method);
    });
  });
});
