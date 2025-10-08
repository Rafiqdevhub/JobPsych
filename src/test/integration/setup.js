import "@testing-library/jest-dom";
import { expect, afterEach, beforeAll, afterAll, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { integrationServer } from "./server.js";

// Extend expect with jest-dom matchers
expect.extend(matchers);

// Establish API mocking before all tests
beforeAll(() => {
  integrationServer.listen({
    onUnhandledRequest: "warn", // Warn about unhandled requests instead of error for integration tests
  });
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests
afterEach(() => {
  integrationServer.resetHandlers();
  cleanup();

  // Clear localStorage
  localStorage.clear();

  // Clear sessionStorage
  sessionStorage.clear();

  // Reset window location
  Object.defineProperty(window, "location", {
    value: { href: "http://localhost:3000", pathname: "/" },
    writable: true,
  });

  // Reset date to consistent value for tests
  vi.setSystemTime(new Date("2024-01-01T00:00:00Z"));
});

// Clean up after all tests are done
afterAll(() => {
  integrationServer.close();
  vi.useRealTimers(); // Reset to real timers
});
