import "@testing-library/jest-dom";
import { expect, afterEach, beforeAll, afterAll } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { server } from "./mocks/server";

// Comprehensive JSDOM polyfills for Vitest
import { URL, URLSearchParams } from "url";

// Polyfill URL and URLSearchParams
globalThis.URL = URL;
globalThis.URLSearchParams = URLSearchParams;

// Polyfill other web APIs that JSDOM and webidl-conversions need
globalThis.Request =
  globalThis.Request ||
  class Request {
    constructor(input, init) {
      this.url = input;
      this.method = init?.method || "GET";
      this.headers = new Headers(init?.headers);
      this.body = init?.body;
    }
  };

globalThis.Response =
  globalThis.Response ||
  class Response {
    constructor(body, init) {
      this.body = body;
      this.status = init?.status || 200;
      this.statusText = init?.statusText || "";
      this.headers = new Headers(init?.headers);
      this.ok = this.status >= 200 && this.status < 300;
    }

    json() {
      return Promise.resolve(JSON.parse(this.body));
    }

    text() {
      return Promise.resolve(this.body);
    }
  };

globalThis.Headers =
  globalThis.Headers ||
  class Headers {
    constructor(init) {
      this._headers = new Map();
      if (init) {
        if (Array.isArray(init)) {
          init.forEach(([key, value]) =>
            this._headers.set(key.toLowerCase(), value)
          );
        } else if (typeof init === "object") {
          Object.entries(init).forEach(([key, value]) =>
            this._headers.set(key.toLowerCase(), value)
          );
        }
      }
    }

    get(name) {
      return this._headers.get(name.toLowerCase()) || null;
    }

    set(name, value) {
      this._headers.set(name.toLowerCase(), value);
    }

    has(name) {
      return this._headers.has(name.toLowerCase());
    }

    delete(name) {
      return this._headers.delete(name.toLowerCase());
    }

    *entries() {
      for (const [key, value] of this._headers) {
        yield [key, value];
      }
    }

    forEach(callback) {
      for (const [key, value] of this._headers) {
        callback(value, key, this);
      }
    }
  };

// Polyfill AbortController if not available
globalThis.AbortController =
  globalThis.AbortController ||
  class AbortController {
    constructor() {
      this.signal = { aborted: false };
    }

    abort() {
      this.signal.aborted = true;
    }
  };

// Polyfill fetch if not available
if (!globalThis.fetch) {
  globalThis.fetch = async (url, _options = {}) => {
    // This is a basic polyfill - in real scenarios, you'd use node-fetch or similar
    // For testing, MSW will intercept these calls
    throw new Error("fetch not implemented - use MSW for testing");
  };
}

// Polyfill structuredClone if not available
if (!globalThis.structuredClone) {
  globalThis.structuredClone = (value) => JSON.parse(JSON.stringify(value));
}

expect.extend(matchers);

// Establish API mocking before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "warn" }));

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests
afterEach(() => {
  server.resetHandlers();
  cleanup();
  // Reset rate limiting counter
  globalThis.requestCount = 0;
});

// Clean up after all tests are done
afterAll(() => server.close());
