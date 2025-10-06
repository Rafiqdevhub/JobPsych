import { expect, test, vi } from "vitest";
import { isDevelopment, shouldApplyRateLimits } from "../env";

test("isDevelopment returns true for localhost", () => {
  // Mock window.location.hostname
  Object.defineProperty(window, "location", {
    value: { hostname: "localhost" },
    writable: true,
  });

  expect(isDevelopment()).toBe(true);
});

test("isDevelopment returns true for 127.0.0.1", () => {
  Object.defineProperty(window, "location", {
    value: { hostname: "127.0.0.1" },
    writable: true,
  });

  expect(isDevelopment()).toBe(true);
});

test("shouldApplyRateLimits returns false in development", () => {
  Object.defineProperty(window, "location", {
    value: { hostname: "localhost" },
    writable: true,
  });

  expect(shouldApplyRateLimits()).toBe(false);
});

test("shouldApplyRateLimits returns true in production", () => {
  Object.defineProperty(window, "location", {
    value: { hostname: "jobpsych.com" },
    writable: true,
  });

  // Mock import.meta.env.DEV to be false for production
  vi.stubEnv("DEV", false);

  expect(shouldApplyRateLimits()).toBe(true);

  // Restore the env
  vi.unstubAllEnvs();
});
