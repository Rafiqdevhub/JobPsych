# JobPsych Frontend Testing Plan - Vitest Implementation

## Overview

This document outlines a comprehensive testing strategy for the JobPsych frontend application using **Vitest** as the testing framework. The plan is organized in phases with detailed implementation workflows, focusing on React 19, Vite, and modern testing practices.

## Testing Framework Stack

- **Unit Testing**: Vitest + React Testing Library + jsdom
- **Integration Testing**: Vitest + React Testing Library + MSW (Mock Service Worker)
- **E2E Testing**: Playwright
- **Coverage**: Vitest built-in coverage with @vitest/coverage-v8
- **CI/CD**: GitHub Actions with Vitest integration

---

## **PHASE 1: Testing Infrastructure Setup**

### **1.1 Core Dependencies Installation**

#### Package Installation

```bash
npm install --save-dev vitest @vitest/ui @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @vitest/coverage-v8 msw
```

#### Updated package.json Scripts

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage",
    "test:watch": "vitest --watch",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui"
  }
}
```

### **1.2 Vitest Configuration**

#### vite.config.js Update

```javascript
/// <reference types="vitest" />
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@data": path.resolve(__dirname, "./src/data"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.js"],
    css: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "src/test/",
        "**/*.d.ts",
        "**/*.config.js",
        "dist/",
      ],
      thresholds: {
        global: {
          branches: 70,
          functions: 70,
          lines: 70,
          statements: 70,
        },
      },
    },
  },
});
```

#### Test Setup File (src/test/setup.js)

```javascript
import "@testing-library/jest-dom";
import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
```

### **1.3 Test Utilities Setup**

#### src/test/test-utils.jsx

```jsx
import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "@components/toast/ToastManager";
import ErrorBoundary from "@components/error/ErrorBoundary";

// Custom render function with providers
const AllTheProviders = ({ children }) => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ToastProvider>{children}</ToastProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

const customRender = (ui, options = {}) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
```

#### src/test/mocks/handlers.js (MSW Setup)

```javascript
import { rest } from "msw";

export const handlers = [
  rest.get("/api/health", (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: {
          status: "OK",
          timestamp: new Date().toISOString(),
          uptime: 123.456,
          environment: "test",
          version: "1.0.0",
        },
      })
    );
  }),

  rest.post("/api/ai/chat", (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: {
          response: "This is a mock AI response",
          timestamp: new Date().toISOString(),
        },
      })
    );
  }),

  // Add more API mocks as needed
];
```

#### src/test/mocks/server.js

```javascript
import { setupServer } from "msw/node";
import { handlers } from "./handlers";

export const server = setupServer(...handlers);
```

#### src/test/setup.js (Update with MSW)

```javascript
import "@testing-library/jest-dom";
import { expect, afterEach, beforeAll, afterAll } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { server } from "./mocks/server";

expect.extend(matchers);

// Establish API mocking before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests
afterEach(() => {
  server.resetHandlers();
  cleanup();
});

// Clean up after all tests are done
afterAll(() => server.close());
```

### **1.4 Directory Structure**

```text
src/
├── components/
│   └── __tests__/
│       ├── ComponentName.test.jsx
│       └── ComponentName.test.css
├── hooks/
│   └── __tests__/
│       └── useHookName.test.js
├── utils/
│   └── __tests__/
│       └── utilityFunction.test.js
├── pages/
│   └── __tests__/
│       └── PageName.test.jsx
└── test/
    ├── setup.js
    ├── test-utils.jsx
    └── mocks/
        ├── handlers.js
        └── server.js
```

---

## **PHASE 2: Unit Testing**

### **2.1 Component Testing**

#### Example: Button Component Test

```jsx
// src/components/__tests__/NavigationButton.test.jsx
import { render, screen, fireEvent } from "@test/test-utils";
import { expect, test, vi } from "vitest";
import NavigationButton from "../buttons/NavigationButton";

test("renders navigation button with correct text", () => {
  render(<NavigationButton to="/test">Test Button</NavigationButton>);

  expect(
    screen.getByRole("link", { name: /test button/i })
  ).toBeInTheDocument();
});

test("calls onClick when button is clicked", () => {
  const handleClick = vi.fn();
  render(
    <NavigationButton to="/test" onClick={handleClick}>
      Test Button
    </NavigationButton>
  );

  fireEvent.click(screen.getByRole("link", { name: /test button/i }));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

#### Component Test Categories:

- **UI Components**: NavigationButton, Header, Footer, HeroSection
- **Form Components**: ResumeUpload, Chatbot input forms
- **Display Components**: FeaturesSection, TestimonialsSection, FAQSection
- **Error Components**: ErrorBoundary, LoadingError, NetworkError, RateLimitError

### **2.2 Custom Hook Testing**

#### Example: useAIChat Hook Test

```javascript
// src/hooks/__tests__/useAIChat.test.js
import { renderHook, waitFor } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { useAIChat } from "../useAIChat";

// Mock the AI API
vi.mock("../../utils/aiApi", () => ({
  chat: vi.fn(),
}));

import { chat } from "../../utils/aiApi";

test("sends message and updates state", async () => {
  const mockResponse = {
    success: true,
    data: { response: "Hello from AI", timestamp: new Date().toISOString() },
  };

  chat.mockResolvedValue(mockResponse);

  const { result } = renderHook(() => useAIChat());

  result.current.sendMessage("Hello AI");

  await waitFor(() => {
    expect(result.current.messages).toHaveLength(2); // welcome + user message
    expect(result.current.isLoading).toBe(false);
  });

  expect(chat).toHaveBeenCalledWith({
    message: "Hello AI",
    context: null,
    sessionType: "general",
  });
});
```

### **2.3 Utility Function Testing**

#### Example: API Utility Test

```javascript
// src/utils/__tests__/aiApi.test.js
import { expect, test, vi } from "vitest";
import { chat } from "../aiApi";

// Mock fetch
global.fetch = vi.fn();

test("chat function handles successful response", async () => {
  const mockResponse = {
    success: true,
    data: { response: "AI response", timestamp: "2024-01-01T00:00:00Z" },
  };

  fetch.mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(mockResponse),
  });

  const result = await chat({ message: "test" });

  expect(result).toEqual(mockResponse);
  expect(fetch).toHaveBeenCalledWith(
    "https://evaai-seven.vercel.app/api/ai/chat",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "test" }),
    }
  );
});

test("chat function handles rate limit error", async () => {
  fetch.mockResolvedValue({
    ok: false,
    status: 429,
    json: () => Promise.resolve({ message: "Rate limit exceeded" }),
  });

  await expect(chat({ message: "test" })).rejects.toThrow(
    "Rate limit exceeded"
  );
});
```

---

## **PHASE 3: Integration Testing**

### **3.1 Page Integration Tests**

#### Example: LandingPage Integration Test

```jsx
// src/pages/__tests__/LandingPage.test.jsx
import { render, screen, waitFor } from "@test/test-utils";
import { expect, test } from "vitest";
import LandingPage from "../LandingPage";

test("renders landing page with all sections", async () => {
  render(<LandingPage />);

  // Check header
  expect(screen.getByRole("banner")).toBeInTheDocument();

  // Check hero section
  expect(screen.getByText(/jobpsych ai assistant/i)).toBeInTheDocument();

  // Check features section
  expect(screen.getByText(/features/i)).toBeInTheDocument();

  // Check testimonials
  expect(screen.getByText(/what our users say/i)).toBeInTheDocument();

  // Check footer
  expect(screen.getByText(/© 2024 jobpsych/i)).toBeInTheDocument();
});

test("navigation buttons work correctly", async () => {
  render(<LandingPage />);

  const roleSuggestionButton = screen.getByRole("link", {
    name: /role suggestions/i,
  });
  expect(roleSuggestionButton).toHaveAttribute("href", "/role-suggestions");
});
```

### **3.2 API Integration Tests**

#### Example: Chatbot API Integration Test

```jsx
// src/components/__tests__/Chatbot.integration.test.jsx
import { render, screen, waitFor, fireEvent } from "@test/test-utils";
import { expect, test } from "vitest";
import Chatbot from "../Chatbot";

test("complete chat flow with API", async () => {
  render(<Chatbot />);

  // Open chatbot
  const toggleButton = screen.getByRole("button", { name: /open chat/i });
  fireEvent.click(toggleButton);

  // Type message
  const input = screen.getByPlaceholderText(/ask jobpsych ai/i);
  fireEvent.change(input, { target: { value: "Hello AI" } });

  // Send message
  const sendButton = screen.getByRole("button", { name: /send/i });
  fireEvent.click(sendButton);

  // Check loading state
  expect(screen.getByText(/ai is thinking/i)).toBeInTheDocument();

  // Wait for response
  await waitFor(() => {
    expect(screen.getByText("Hello AI")).toBeInTheDocument();
    expect(screen.getByText("This is a mock AI response")).toBeInTheDocument();
  });

  // Check loading is gone
  expect(screen.queryByText(/ai is thinking/i)).not.toBeInTheDocument();
});
```

---

## **PHASE 4: End-to-End Testing with Playwright**

### **4.1 Playwright Setup**

#### playwright.config.js

```javascript
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
```

### **4.2 E2E Test Examples**

#### e2e/chat-flow.spec.js

```javascript
import { test, expect } from "@playwright/test";

test("complete user journey from landing to AI chat", async ({ page }) => {
  // Navigate to landing page
  await page.goto("/");

  // Check landing page loads
  await expect(page).toHaveTitle(/JobPsych/);
  await expect(page.locator("text=JobPsych AI Assistant")).toBeVisible();

  // Open chatbot
  await page.locator('[data-testid="chat-toggle"]').click();

  // Type and send message
  await page.locator('[placeholder="Ask JobPsych AI..."]').fill("Hello AI");
  await page.locator('[data-testid="send-button"]').click();

  // Wait for response
  await expect(page.locator("text=AI is thinking...")).toBeVisible();
  await expect(page.locator("text=This is a mock AI response")).toBeVisible();
});
```

#### e2e/resume-upload.spec.js

```javascript
import { test, expect } from "@playwright/test";

test("resume upload and analysis flow", async ({ page }) => {
  await page.goto("/ats-analyzer");

  // Upload file
  const fileInput = page.locator('input[type="file"]');
  await fileInput.setInputFiles("./test-data/sample-resume.pdf");

  // Wait for analysis to complete
  await expect(page.locator("text=Analysis Complete")).toBeVisible();

  // Check results are displayed
  await expect(page.locator(".analysis-results")).toBeVisible();
});
```

---

## **PHASE 5: Specialized Testing**

### **5.1 Accessibility Testing**

#### Accessibility Test Setup

```javascript
// src/test/setup.js (add to existing)
import "jest-axe/extend-expect";

// Custom matchers for accessibility
expect.extend({
  toHaveNoViolations(received) {
    // Implementation for axe-core integration
  },
});
```

#### Accessibility Test Example

```jsx
// src/components/__tests__/Header.accessibility.test.jsx
import { render } from "@test/test-utils";
import { expect, test } from "vitest";
import { axe } from "jest-axe";
import Header from "../layout/Header";

test("Header has no accessibility violations", async () => {
  const { container } = render(<Header />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### **5.2 Visual Regression Testing**

#### Visual Test Setup with Playwright

```javascript
// e2e/visual-regression.spec.js
import { test, expect } from "@playwright/test";

test("landing page visual regression", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveScreenshot("landing-page.png");
});

test("chatbot visual regression", async ({ page }) => {
  await page.goto("/");
  await page.locator('[data-testid="chat-toggle"]').click();
  await expect(page.locator(".chatbot")).toHaveScreenshot("chatbot-open.png");
});
```

### **5.3 Performance Testing**

#### Performance Test with Playwright

```javascript
// e2e/performance.spec.js
import { test, expect } from "@playwright/test";

test("page load performance", async ({ page }) => {
  const startTime = Date.now();

  await page.goto("/", { waitUntil: "networkidle" });

  const loadTime = Date.now() - startTime;
  expect(loadTime).toBeLessThan(3000); // Should load within 3 seconds

  // Check Core Web Vitals
  const metrics = await page.evaluate(() => {
    // Get performance metrics
    const perfEntries = performance.getEntriesByType("navigation")[0];
    return {
      domContentLoaded:
        perfEntries.domContentLoadedEventEnd -
        perfEntries.domContentLoadedEventStart,
      loadComplete: perfEntries.loadEventEnd - perfEntries.loadEventStart,
    };
  });

  expect(metrics.domContentLoaded).toBeLessThan(2000);
  expect(metrics.loadComplete).toBeLessThan(3000);
});
```

---

## **PHASE 6: Test Automation & CI/CD**

### **6.1 GitHub Actions Workflow**

#### .github/workflows/test.yml

```yaml
name: Test Suite

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run linting
        run: npm run lint

      - name: Run unit tests
        run: npm run test:run

      - name: Run coverage
        run: npm run test:coverage

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/coverage-final.json

      - name: Build application
        run: npm run build

  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright
        run: npx playwright install

      - name: Run E2E tests
        run: npm run test:e2e

      - name: Upload test results
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

### **6.2 Pre-commit Hooks**

#### .husky/pre-commit

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run lint
npm run test:run
```

### **6.3 Coverage Reporting**

#### Coverage Configuration in vite.config.js

```javascript
coverage: {
  provider: 'v8',
  reporter: ['text', 'json', 'html', 'lcov'],
  exclude: [
    'node_modules/',
    'src/test/',
    '**/*.d.ts',
    '**/*.config.js',
    'dist/',
    'coverage/',
  ],
  thresholds: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
    './src/components/': {
      branches: 75,
      functions: 75,
      lines: 75,
      statements: 75,
    },
  },
}
```

---

## **PHASE 7: Advanced Testing & Quality Assurance**

### **7.1 Test Data Management**

#### Test Data Strategy

**Static Test Data:**

```javascript
// src/test/fixtures/userProfiles.js
export const mockUserProfiles = {
  basicUser: {
    id: "user-1",
    email: "test@example.com",
    name: "Test User",
    subscription: "free",
  },
  premiumUser: {
    id: "user-2",
    email: "premium@example.com",
    name: "Premium User",
    subscription: "premium",
  },
};

// src/test/fixtures/resumeData.js
export const mockResumeData = {
  basic: {
    fileName: "john-doe-resume.pdf",
    fileSize: 245760, // 240KB
    content: "Mock resume content...",
  },
  large: {
    fileName: "comprehensive-resume.pdf",
    fileSize: 5242880, // 5MB
    content: "Large mock resume content...",
  },
};
```

**Dynamic Test Data Generation:**

```javascript
// src/test/factories/testDataFactory.js
export class TestDataFactory {
  static createMockResume(overrides = {}) {
    return {
      id: `resume-${Date.now()}`,
      fileName: "test-resume.pdf",
      fileSize: 102400,
      uploadDate: new Date().toISOString(),
      status: "processed",
      ...overrides,
    };
  }

  static createMockChatMessage(type = "user", overrides = {}) {
    const baseMessage = {
      id: `msg-${Date.now()}`,
      timestamp: new Date().toISOString(),
      type,
    };

    if (type === "user") {
      return {
        ...baseMessage,
        content: "Test user message",
        sender: "user",
        ...overrides,
      };
    }

    return {
      ...baseMessage,
      content: "Test AI response",
      sender: "assistant",
      confidence: 0.95,
      ...overrides,
    };
  }
}
```

### **7.2 Test Organization & Patterns**

#### Test File Structure Convention

```
src/
├── components/
│   ├── Button/
│   │   ├── Button.jsx
│   │   └── __tests__/
│   │       ├── Button.test.jsx              # Unit tests
│   │       ├── Button.integration.test.jsx  # Integration tests
│   │       ├── Button.accessibility.test.jsx # A11y tests
│   │       └── Button.visual.test.jsx       # Visual tests
│   └── __tests__/
│       └── components.test.js               # Shared component tests
├── hooks/
│   └── __tests__/
│       ├── useAuth.test.js
│       ├── useToast.test.js
│       └── hooks.integration.test.js
└── utils/
    └── __tests__/
        ├── api.test.js
        ├── validation.test.js
        └── utils.integration.test.js
```

#### Test Naming Convention

```javascript
// Unit Tests
test("renders component with default props");
test("calls onClick handler when button is clicked");
test("displays error message for invalid input");
test("updates state when form is submitted");

// Integration Tests
test("complete user registration flow");
test("file upload and processing workflow");
test("navigation between pages works correctly");

// E2E Tests
test("user can complete full application process");
test("payment flow works end-to-end");
test("error recovery works in production scenario");
```

### **7.3 Advanced Mocking Strategies**

#### API Response Mocking

```javascript
// src/test/mocks/apiResponses.js
export const apiResponseMocks = {
  success: {
    chat: {
      success: true,
      data: {
        response: "This is a helpful AI response",
        timestamp: new Date().toISOString(),
        sessionId: "session-123",
      },
    },
    resumeAnalysis: {
      success: true,
      data: {
        recommendations: [
          {
            role: "Software Engineer",
            matchScore: 85,
            reasoning: "Strong technical background",
          },
        ],
        skills: ["JavaScript", "React", "Node.js"],
        timestamp: new Date().toISOString(),
      },
    },
  },
  errors: {
    rateLimit: {
      success: false,
      error: "Rate limit exceeded",
      retryAfter: 3600,
      code: "RATE_LIMIT_EXCEEDED",
    },
    network: {
      success: false,
      error: "Network connection failed",
      code: "NETWORK_ERROR",
    },
    validation: {
      success: false,
      error: "Invalid file format",
      code: "VALIDATION_ERROR",
      details: {
        allowedFormats: ["pdf", "doc", "docx"],
        maxSize: "10MB",
      },
    },
  },
};
```

#### Browser API Mocking

```javascript
// src/test/mocks/browserAPIs.js
export const browserMocks = {
  localStorage: {
    getItem: vi.fn((key) => {
      const store = {
        "auth-token": "mock-jwt-token",
        "user-preferences": JSON.stringify({ theme: "light" }),
      };
      return store[key] || null;
    }),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  },

  navigator: {
    onLine: true,
    userAgent: "Mock Browser/1.0",
    language: "en-US",
  },

  location: {
    href: "http://localhost:3000",
    pathname: "/",
    search: "",
    reload: vi.fn(),
    assign: vi.fn(),
  },
};
```

### **7.4 Test Execution Strategies**

#### Parallel Test Execution

```javascript
// vite.config.js - Advanced test configuration
test: {
  globals: true,
  environment: "jsdom",
  setupFiles: ["./src/test/setup.js"],
  pool: "threads", // Use worker threads for parallel execution
  poolOptions: {
    threads: {
      singleThread: false,
      isolate: true,
    },
  },
  maxThreads: 4, // Limit concurrent threads
  minThreads: 1,
  testTimeout: 10000,
  hookTimeout: 10000,
},
```

#### Test Isolation & Cleanup

```javascript
// src/test/setup.js - Enhanced cleanup
import { afterEach, beforeEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Clean up after each test
afterEach(() => {
  cleanup();
  // Reset all mocks
  vi.clearAllMocks();
  // Clear localStorage
  localStorage.clear();
  // Reset window location
  Object.defineProperty(window, "location", {
    value: { href: "http://localhost:3000", pathname: "/" },
    writable: true,
  });
});

// Setup before each test
beforeEach(() => {
  // Reset date to consistent value for tests
  vi.setSystemTime(new Date("2024-01-01T00:00:00Z"));
});
```

---

## **PHASE 8: Continuous Testing & Monitoring**

### **8.1 Test Result Analysis**

#### Coverage Trend Analysis

```javascript
// scripts/analyze-coverage.js
import { readFileSync } from "fs";
import { join } from "path";

function analyzeCoverage() {
  const coveragePath = join(process.cwd(), "coverage", "coverage-final.json");
  const coverage = JSON.parse(readFileSync(coveragePath, "utf8"));

  const analysis = {
    total: coverage.total,
    files: Object.keys(coverage)
      .filter((key) => key !== "total")
      .map((file) => ({
        file,
        statements: coverage[file].statements.pct,
        branches: coverage[file].branches.pct,
        functions: coverage[file].functions.pct,
        lines: coverage[file].lines.pct,
      })),
  };

  // Generate coverage report
  console.log("Coverage Analysis:");
  console.log(`Total Coverage: ${analysis.total.lines.pct}%`);
  console.log("\nFiles with low coverage (< 70%):");

  analysis.files
    .filter((file) => file.lines < 70)
    .forEach((file) => {
      console.log(`${file.file}: ${file.lines}%`);
    });

  return analysis;
}

analyzeCoverage();
```

#### Test Performance Monitoring

```javascript
// scripts/analyze-test-performance.js
import { execSync } from "child_process";
import { writeFileSync } from "fs";

function analyzeTestPerformance() {
  try {
    // Run tests with timing
    const output = execSync("npm run test:run -- --reporter=json", {
      encoding: "utf8",
    });

    const results = JSON.parse(output);
    const performance = {
      totalTests: results.numTotalTests,
      passedTests: results.numPassedTests,
      failedTests: results.numFailedTests,
      duration: results.duration,
      slowTests: results.testResults
        .flatMap((result) => result.testResults)
        .filter((test) => test.duration > 1000) // Tests taking > 1 second
        .map((test) => ({
          name: test.fullName,
          duration: test.duration,
          file: test.testFilePath,
        })),
    };

    writeFileSync(
      "test-performance.json",
      JSON.stringify(performance, null, 2)
    );

    console.log("Test Performance Analysis:");
    console.log(`Total Tests: ${performance.totalTests}`);
    console.log(`Duration: ${performance.duration}ms`);
    console.log(`Slow Tests (>1s): ${performance.slowTests.length}`);

    return performance;
  } catch (error) {
    console.error("Failed to analyze test performance:", error);
  }
}

analyzeTestPerformance();
```

### **8.2 Automated Test Maintenance**

#### Test File Health Check

```javascript
// scripts/check-test-health.js
import { readdirSync, readFileSync, statSync } from "fs";
import { join, extname } from "path";

function checkTestHealth() {
  const testDir = join(process.cwd(), "src");
  const issues = [];

  function scanDirectory(dir) {
    const files = readdirSync(dir);

    files.forEach((file) => {
      const filePath = join(dir, file);
      const stat = statSync(filePath);

      if (
        stat.isDirectory() &&
        !file.startsWith(".") &&
        file !== "node_modules"
      ) {
        scanDirectory(filePath);
      } else if (file.endsWith(".test.jsx") || file.endsWith(".test.js")) {
        const content = readFileSync(filePath, "utf8");

        // Check for common issues
        if (!content.includes("describe(")) {
          issues.push(`${filePath}: Missing describe block`);
        }

        if (!content.includes("expect(")) {
          issues.push(`${filePath}: No assertions found`);
        }

        if (content.includes("console.log(")) {
          issues.push(`${filePath}: Contains console.log statements`);
        }

        // Check file age (old tests might need updating)
        const daysOld =
          (Date.now() - stat.mtime.getTime()) / (1000 * 60 * 60 * 24);
        if (daysOld > 90) {
          issues.push(
            `${filePath}: Test file is ${Math.round(daysOld)} days old`
          );
        }
      }
    });
  }

  scanDirectory(testDir);

  console.log("Test Health Check Results:");
  if (issues.length === 0) {
    console.log("✅ All tests are healthy!");
  } else {
    console.log("❌ Issues found:");
    issues.forEach((issue) => console.log(`  - ${issue}`));
  }

  return issues;
}

checkTestHealth();
```

### **8.3 Test Quality Metrics**

#### Code Quality Metrics

```javascript
// scripts/calculate-test-metrics.js
function calculateTestMetrics() {
  const fs = require("fs");
  const path = require("path");

  const testDir = path.join(process.cwd(), "src");
  const metrics = {
    totalTestFiles: 0,
    totalTestCases: 0,
    averageTestsPerFile: 0,
    testFileSize: [],
    coverage: {},
    testTypes: {
      unit: 0,
      integration: 0,
      e2e: 0,
      accessibility: 0,
      visual: 0,
    },
  };

  function analyzeTestFile(filePath) {
    const content = fs.readFileSync(filePath, "utf8");
    const fileName = path.basename(filePath);

    metrics.totalTestFiles++;

    // Count test cases
    const testCount = (content.match(/^(test|it)\(/gm) || []).length;
    metrics.totalTestCases += testCount;

    // File size
    metrics.testFileSize.push(fs.statSync(filePath).size);

    // Categorize test types
    if (fileName.includes("integration")) {
      metrics.testTypes.integration++;
    } else if (fileName.includes("accessibility")) {
      metrics.testTypes.accessibility++;
    } else if (fileName.includes("visual")) {
      metrics.testTypes.visual++;
    } else if (filePath.includes("e2e")) {
      metrics.testTypes.e2e++;
    } else {
      metrics.testTypes.unit++;
    }
  }

  function scanDirectory(dir) {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (
        stat.isDirectory() &&
        !file.startsWith(".") &&
        file !== "node_modules"
      ) {
        scanDirectory(filePath);
      } else if (file.endsWith(".test.jsx") || file.endsWith(".test.js")) {
        analyzeTestFile(filePath);
      }
    });
  }

  scanDirectory(testDir);

  // Calculate averages
  metrics.averageTestsPerFile = metrics.totalTestCases / metrics.totalTestFiles;
  metrics.averageFileSize =
    metrics.testFileSize.reduce((a, b) => a + b, 0) /
    metrics.testFileSize.length;

  console.log("Test Quality Metrics:");
  console.log(`Total Test Files: ${metrics.totalTestFiles}`);
  console.log(`Total Test Cases: ${metrics.totalTestCases}`);
  console.log(
    `Average Tests per File: ${metrics.averageTestsPerFile.toFixed(1)}`
  );
  console.log(
    `Average File Size: ${(metrics.averageFileSize / 1024).toFixed(1)} KB`
  );
  console.log("\nTest Types Distribution:");
  Object.entries(metrics.testTypes).forEach(([type, count]) => {
    console.log(`  ${type}: ${count} files`);
  });

  return metrics;
}

calculateTestMetrics();
```

---

## **Testing Strategy Details**

### **Test Pyramid Approach**

```
E2E Tests (10-20%)    ████████░░
Integration Tests     ██████████
Unit Tests           ████████████ (70-80%)
```

### **Test Data Strategy**

- **Mock Data**: API responses, user scenarios
- **Test Fixtures**: Sample resumes, chat conversations
- **Factory Functions**: Generate test data dynamically

### **Test Organization**

```
src/
├── components/
│   └── __tests__/
│       ├── ComponentName.test.jsx
│       ├── ComponentName.integration.test.jsx
│       └── ComponentName.accessibility.test.jsx
├── hooks/
│   └── __tests__/
│       └── useHookName.test.js
├── utils/
│   └── __tests__/
│       └── utilityFunction.test.js
├── pages/
│   └── __tests__/
│       └── PageName.test.jsx
└── test/
    ├── setup.js
    ├── test-utils.jsx
    ├── mocks/
    │   ├── handlers.js
    │   └── server.js
    └── fixtures/
        ├── sample-resume.pdf
        └── test-data.json
```

### **Key Testing Priorities**

1. **AI Chat Functionality** - Core business feature
2. **Resume Upload/Analysis** - Critical user workflow
3. **Error Handling** - User experience and reliability
4. **Responsive Design** - Cross-device compatibility
5. **API Integration** - Backend communication stability

### **Test Execution Commands**

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Run coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e

# Run specific test file
npm test -- src/components/Chatbot.test.jsx

# Run tests matching pattern
npm test -- --reporter=verbose "chat"
```

### **Quality Gates**

- **Unit Test Coverage**: >70% overall, >75% for components
- **Linting**: Must pass before commit
- **Build**: Must succeed before merge
- **E2E Tests**: Must pass in CI/CD pipeline
- **Performance**: <3s page load time, <2s DOM content loaded

---

## **Implementation Workflow**

### **Phase 1 Checklist**

- [ ] Install Vitest and testing dependencies
- [ ] Configure Vitest in vite.config.js
- [ ] Create test setup files
- [ ] Setup MSW for API mocking
- [ ] Create test utilities
- [ ] Setup directory structure
- [ ] Configure CI/CD pipeline

### **Phase 2 Checklist**

- [ ] Write unit tests for utility functions
- [ ] Write unit tests for custom hooks
- [ ] Write unit tests for simple components
- [ ] Write unit tests for complex components
- [ ] Achieve 70% coverage target

### **Phase 3 Checklist**

- [ ] Write integration tests for pages
- [ ] Write integration tests for component interactions
- [ ] Write API integration tests
- [ ] Test error scenarios
- [ ] Test loading states

### **Phase 4 Checklist**

- [ ] Setup Playwright
- [ ] Write critical user journey E2E tests
- [ ] Write form submission E2E tests
- [ ] Write navigation E2E tests
- [ ] Setup visual regression testing

### **Phase 5 Checklist**

- [ ] Implement accessibility testing
- [ ] Add performance testing
- [ ] Setup visual regression
- [ ] Add security testing basics

### **Phase 6 Checklist**

- [ ] Configure GitHub Actions
- [ ] Setup pre-commit hooks
- [ ] Configure coverage reporting
- [ ] Setup test result reporting
- [ ] Document testing procedures

### **Phase 7 Checklist**

- [ ] Implement advanced mocking strategies
- [ ] Setup test data management
- [ ] Create test factories and fixtures
- [ ] Implement parallel test execution
- [ ] Setup test performance monitoring

### **Phase 8 Checklist**

- [ ] Setup automated test maintenance
- [ ] Implement test result analysis
- [ ] Create test quality metrics
- [ ] Setup continuous monitoring
- [ ] Document maintenance procedures

---

## **Success Metrics**

### **Coverage Targets**

- **Unit Tests**: 70% overall coverage
- **Critical Components**: 80% coverage
- **Hooks**: 90% coverage
- **Utilities**: 85% coverage

### **Performance Targets**

- **Test Execution**: <5 minutes for full suite
- **E2E Tests**: <10 minutes
- **CI/CD Pipeline**: <15 minutes total

### **Quality Targets**

- **Zero failing tests** in main branch
- **Zero accessibility violations** in critical flows
- **Zero security vulnerabilities** in dependencies
- **100% CI/CD pass rate** for PRs

---

## **Maintenance & Evolution**

### **Regular Activities**

- **Weekly**: Review test coverage reports
- **Monthly**: Update test dependencies
- **Quarterly**: Review and update test strategy
- **Bi-annually**: Audit test effectiveness

### **Test Maintenance**

- Remove obsolete tests
- Update tests for API changes
- Refactor tests for better maintainability
- Add tests for new features

### **Team Training**

- Document testing best practices
- Conduct testing workshops
- Review test code in PRs
- Share testing knowledge

---

## **Detailed Workflow Explanations**

### **Phase 1: Testing Infrastructure Setup - Step-by-Step**

#### **Step 1: Environment Preparation**

1. Verify Node.js version (18+ required)
2. Check existing package.json for conflicts
3. Backup current configuration files
4. Ensure clean git status

#### **Step 2: Dependency Installation**

```bash
# Install core testing framework
npm install --save-dev vitest @vitest/ui

# Install React Testing Library ecosystem
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event

# Install additional testing utilities
npm install --save-dev jsdom @vitest/coverage-v8 msw

# Verify installation
npm list vitest @testing-library/react
```

#### **Step 3: Vite Configuration Update**

1. Add Vitest configuration to existing vite.config.js
2. Configure test environment (jsdom)
3. Setup coverage reporting
4. Configure test file patterns
5. Add path aliases for testing

#### **Step 4: Test Setup Files Creation**

1. Create src/test/setup.js with global configurations
2. Setup React Testing Library configuration
3. Configure MSW for API mocking
4. Add global test utilities

#### **Step 5: Test Utilities Development**

1. Create custom render function with providers
2. Setup test helpers and utilities
3. Create mock data generators
4. Develop reusable test components

#### **Step 6: Directory Structure Setup**

1. Create **tests** directories in appropriate locations
2. Setup test fixtures and mock data directories
3. Create test configuration files
4. Organize test utilities

#### **Step 7: CI/CD Integration**

1. Update package.json scripts
2. Configure GitHub Actions workflow
3. Setup coverage reporting
4. Configure test result storage

#### **Step 8: Initial Test Execution**

1. Run basic test to verify setup
2. Check coverage generation
3. Verify CI/CD pipeline
4. Document setup process

### **Phase 2: Unit Testing - Implementation Strategy**

#### **Component Testing Strategy**

1. **Identify Component Categories**

   - UI Components (buttons, inputs, displays)
   - Form Components (forms, uploads, selections)
   - Layout Components (headers, footers, navigation)
   - Error Components (boundaries, messages, modals)

2. **Test Structure Pattern**

   ```jsx
   // 1. Import statements
   import { render, screen } from "@test/test-utils";
   import Component from "../Component";

   // 2. Describe block
   describe("Component Name", () => {
     // 3. Test cases
     test("renders correctly", () => {
       // Arrange
       render(<Component />);

       // Assert
       expect(screen.getByText("expected text")).toBeInTheDocument();
     });
   });
   ```

3. **Testing Priority Order**
   - Critical user paths first
   - Error states and edge cases
   - Accessibility requirements
   - Performance considerations

#### **Hook Testing Strategy**

1. **useState Testing**

   - Initial state values
   - State updates
   - State persistence

2. **useEffect Testing**

   - Effect execution timing
   - Cleanup functions
   - Dependency array behavior

3. **Custom Hook Testing**
   - Return value structure
   - Side effect handling
   - Error conditions

#### **Utility Function Testing**

1. **Pure Function Testing**

   - Input/output validation
   - Edge cases
   - Error handling

2. **API Function Testing**
   - Success responses
   - Error responses
   - Network failures
   - Rate limiting

### **Phase 3: Integration Testing - Workflow**

#### **Page Integration Testing**

1. **Full Page Rendering**

   - All components render correctly
   - Layout and styling intact
   - Responsive behavior

2. **Component Interaction**

   - Props passing between components
   - Event handling across components
   - State synchronization

3. **API Integration**
   - Real API calls with MSW
   - Loading states
   - Error handling
   - Data flow validation

#### **User Journey Testing**

1. **Happy Path Testing**

   - Complete user workflows
   - Data persistence
   - Navigation flow

2. **Error Path Testing**
   - Network failures
   - Invalid inputs
   - System errors

### **Phase 4: E2E Testing - Implementation**

#### **Playwright Setup Process**

1. **Installation and Configuration**

   ```bash
   npm install --save-dev @playwright/test
   npx playwright install
   ```

2. **Configuration File**

   - Browser selection
   - Test directory setup
   - Base URL configuration
   - Screenshot settings

3. **Test Structure**
   ```javascript
   test.describe("User Journey", () => {
     test("complete application process", async ({ page }) => {
       // Test steps
     });
   });
   ```

#### **Critical Path Identification**

1. **User Registration/Login**
2. **Resume Upload and Analysis**
3. **AI Chat Interaction**
4. **Results Viewing and Export**
5. **Error Recovery Flows**

### **Phase 5: Specialized Testing - Advanced Features**

#### **Accessibility Testing Implementation**

1. **axe-core Integration**

   ```javascript
   npm install --save-dev jest-axe
   ```

2. **Automated Accessibility Checks**
   - Color contrast validation
   - Keyboard navigation testing
   - Screen reader compatibility
   - Focus management

#### **Visual Regression Testing**

1. **Screenshot Comparison**

   - Baseline screenshots
   - Difference detection
   - Approval workflows

2. **Visual Test Categories**
   - Component appearance
   - Layout consistency
   - Responsive design
   - Theme variations

#### **Performance Testing**

1. **Load Time Measurement**

   - First Contentful Paint
   - Largest Contentful Paint
   - Time to Interactive

2. **Runtime Performance**
   - Bundle size analysis
   - Memory usage monitoring
   - CPU performance tracking

### **Phase 6: CI/CD Integration - Complete Workflow**

#### **GitHub Actions Setup**

1. **Workflow File Creation**

   ```yaml
   # .github/workflows/test.yml
   name: Test Suite
   on: [push, pull_request]
   jobs:
     test:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - name: Setup Node.js
           uses: actions/setup-node@v4
           with:
             node-version: "20"
             cache: "npm"
         - name: Install dependencies
           run: npm ci
         - name: Run tests
           run: npm run test:run
   ```

2. **Coverage Integration**
   ```yaml
   - name: Run coverage
     run: npm run test:coverage
   - name: Upload coverage
     uses: codecov/codecov-action@v3
     with:
       file: ./coverage/coverage-final.json
   ```

#### **Quality Gates Implementation**

1. **Pre-commit Hooks**

   ```bash
   # .husky/pre-commit
   npm run lint
   npm run test:run
   ```

2. **Branch Protection Rules**
   - Require passing tests
   - Require minimum coverage
   - Require code review
   - Require up-to-date branch

### **Phase 7: Advanced Testing - Implementation Details**

#### **Test Data Management**

1. **Static Fixtures**

   - User profiles
   - Resume samples
   - API responses
   - Configuration data

2. **Dynamic Data Generation**
   - Factory functions
   - Random data generators
   - Scenario builders

#### **Mocking Strategies**

1. **API Mocking with MSW**

   - Request interception
   - Response customization
   - Error simulation

2. **Browser API Mocking**
   - localStorage/sessionStorage
   - Navigator APIs
   - Location APIs
   - Timer functions

#### **Parallel Execution**

1. **Vitest Configuration**

   ```javascript
   test: {
     pool: 'threads',
     poolOptions: {
       threads: {
         singleThread: false,
         isolate: true,
       },
     },
     maxThreads: 4,
   }
   ```

2. **Test Isolation**
   - Clean state between tests
   - Independent mock instances
   - Database cleanup

### **Phase 8: Continuous Testing - Monitoring & Maintenance**

#### **Test Health Monitoring**

1. **Automated Health Checks**

   - Test file analysis
   - Coverage trend monitoring
   - Performance regression detection
   - Flaky test identification

2. **Maintenance Scripts**
   ```javascript
   // scripts/test-maintenance.js
   - Identify obsolete tests
   - Update outdated mocks
   - Clean up unused fixtures
   - Refactor duplicate code
   ```

#### **Quality Metrics Dashboard**

1. **Coverage Trends**

   - Historical coverage data
   - Coverage by component
   - Uncovered code identification

2. **Test Performance Metrics**
   - Execution time tracking
   - Slow test identification
   - Parallel execution efficiency

#### **Continuous Improvement**

1. **Regular Reviews**

   - Weekly test status meetings
   - Monthly quality assessments
   - Quarterly strategy updates

2. **Team Training**
   - Testing best practices documentation
   - Code review guidelines
   - Testing workshop sessions

---

## **Troubleshooting Guide**

### **Common Testing Issues**

#### **Test Timeout Issues**

```javascript
// Increase timeout for slow tests
test("slow operation", async () => {
  // ... test code
}, 10000); // 10 second timeout
```

#### **Async Test Issues**

```javascript
// Use waitFor for async assertions
await waitFor(() => {
  expect(screen.getByText("Loaded")).toBeInTheDocument();
});
```

#### **Mocking Issues**

```javascript
// Reset mocks between tests
beforeEach(() => {
  vi.clearAllMocks();
});
```

#### **DOM Testing Issues**

```javascript
// Use screen queries instead of container queries
expect(screen.getByRole("button")).toBeInTheDocument();
```

### **Debugging Strategies**

#### **Test Debugging**

```bash
# Run single test with debug output
npm test -- --reporter=verbose "test name"

# Run tests in browser
npm run test:ui

# Debug with breakpoints
test.only('debug test', () => {
  debugger; // Add breakpoint
  // ... test code
});
```

#### **Coverage Debugging**

```bash
# Check uncovered lines
npm run test:coverage
# Open coverage/index.html for detailed report
```

#### **E2E Debugging**

```bash
# Run E2E tests with browser open
npm run test:e2e -- --headed

# Generate trace files
npm run test:e2e -- --trace on
```

---

## **Best Practices & Guidelines**

### **Test Writing Guidelines**

#### **Test Structure**

```javascript
test("should do something when condition", () => {
  // Arrange - Setup test data and mocks
  const mockData = createMockData();

  // Act - Perform the action being tested
  const result = doSomething(mockData);

  // Assert - Verify the expected outcome
  expect(result).toBe(expectedValue);
});
```

#### **Test Naming Conventions**

- Use descriptive names that explain what is being tested
- Follow the pattern: "should [expected behavior] when [condition]"
- Include the component/feature name in describe blocks

#### **Test Organization**

- Group related tests in describe blocks
- Use beforeEach/afterEach for common setup/cleanup
- Keep tests focused on a single behavior
- Avoid test interdependencies

### **Mocking Guidelines**

#### **When to Mock**

- External API calls
- Browser APIs (localStorage, fetch, etc.)
- Time-dependent functions
- Random number generators
- File system operations

#### **Mock Best Practices**

```javascript
// Prefer vi.fn() for function mocks
const mockFunction = vi.fn();

// Use vi.mocked() for module mocks
vi.mock("../api", () => ({
  fetchData: vi.fn(),
}));

// Reset mocks between tests
beforeEach(() => {
  vi.clearAllMocks();
});
```

### **Coverage Guidelines**

#### **Coverage Targets**

- **Statements**: 70% minimum
- **Branches**: 70% minimum
- **Functions**: 70% minimum
- **Lines**: 70% minimum

#### **Coverage Exceptions**

```javascript
coverage: {
  exclude: [
    'src/test/',           // Test files
    '**/*.config.js',      // Config files
    '**/*.d.ts',           // Type definitions
    'src/main.jsx',        // Entry point
  ],
}
```

### **Performance Guidelines**

#### **Test Execution Time**

- Unit tests: <100ms each
- Integration tests: <500ms each
- E2E tests: <10s each

#### **Optimization Techniques**

```javascript
// Use test.concurrent for parallel execution
test.concurrent("fast test", async () => {
  // ... test code
});

// Skip slow tests in CI
test.skip("slow test", () => {
  // ... test code
});
```

---

## **Migration & Legacy Code**

### **Migrating from Other Test Frameworks**

#### **From Jest to Vitest**

1. Update import statements
2. Replace jest._ with vi._
3. Update configuration
4. Adjust test scripts

#### **From Enzyme to React Testing Library**

1. Replace shallow rendering with full rendering
2. Use screen queries instead of wrapper.find()
3. Update assertion patterns
4. Adopt accessibility-first testing

### **Handling Legacy Code**

#### **Testing Untested Code**

1. Start with integration tests
2. Add unit tests incrementally
3. Focus on critical paths first
4. Use code coverage to identify gaps

#### **Refactoring for Testability**

1. Extract pure functions
2. Reduce component complexity
3. Add dependency injection
4. Create testable interfaces

---

## **Advanced Topics**

### **Property-Based Testing**

```javascript
// Using fast-check with Vitest
import fc from "fast-check";

test("array sum is commutative", () => {
  fc.assert(
    fc.property(fc.array(fc.integer()), (arr) => {
      const sum1 = sum(arr);
      const sum2 = sum([...arr].reverse());
      return sum1 === sum2;
    })
  );
});
```

### **Contract Testing**

```javascript
// API contract testing
test("API contract compliance", async () => {
  const response = await fetch("/api/users");

  // Check response structure
  expect(response.data).toHaveProperty("users");
  expect(Array.isArray(response.data.users)).toBe(true);

  // Check user object structure
  response.data.users.forEach((user) => {
    expect(user).toHaveProperty("id");
    expect(user).toHaveProperty("name");
    expect(user).toHaveProperty("email");
  });
});
```

### **Chaos Engineering**

```javascript
// Simulate network failures
test("handles network failure gracefully", async () => {
  // Mock network failure
  server.use(
    rest.get("/api/data", (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  render(<DataComponent />);

  await waitFor(() => {
    expect(screen.getByText("Network error")).toBeInTheDocument();
  });
});
```

---

## **Conclusion**

This comprehensive testing plan provides a structured approach to implementing robust testing practices for the JobPsych frontend application. The phased approach ensures gradual adoption of testing best practices while maintaining code quality and reliability.

### **Key Success Factors**

1. **Start Small**: Begin with basic unit tests and expand gradually
2. **Automate Everything**: Use CI/CD for consistent test execution
3. **Maintain Quality**: Regular code reviews and test maintenance
4. **Monitor Progress**: Track coverage and performance metrics
5. **Team Buy-in**: Educate and involve the entire development team

### **Continuous Improvement**

- Regularly review and update testing strategies
- Stay current with testing framework updates
- Incorporate feedback from the development team
- Adapt to changing project requirements

### **Final Recommendations**

1. **Implement Phase 1-2 first** for basic testing infrastructure
2. **Focus on critical user paths** in early testing phases
3. **Automate as much as possible** to reduce manual effort
4. **Maintain test code quality** equal to production code
5. **Celebrate testing milestones** to maintain team motivation

By following this comprehensive testing plan, the JobPsych frontend will achieve high code quality, reliability, and maintainability, ensuring a robust user experience and smooth development workflow.

---

## **PHASE 1: Testing Infrastructure Setup**

### **1.1 Core Dependencies Installation**

#### Package Installation

```bash
npm install --save-dev vitest @vitest/ui @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @vitest/coverage-v8 msw
```

#### Updated package.json Scripts

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage",
    "test:watch": "vitest --watch",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui"
  }
}
```

### **1.2 Vitest Configuration**

#### vite.config.js Update

```javascript
/// <reference types="vitest" />
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@data": path.resolve(__dirname, "./src/data"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.js"],
    css: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "src/test/",
        "**/*.d.ts",
        "**/*.config.js",
        "dist/",
      ],
      thresholds: {
        global: {
          branches: 70,
          functions: 70,
          lines: 70,
          statements: 70,
        },
      },
    },
  },
});
```

#### Test Setup File (src/test/setup.js)

```javascript
import "@testing-library/jest-dom";
import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
```

### **1.3 Test Utilities Setup**

#### src/test/test-utils.jsx

```jsx
import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "@components/toast/ToastManager";
import ErrorBoundary from "@components/error/ErrorBoundary";

// Custom render function with providers
const AllTheProviders = ({ children }) => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ToastProvider>{children}</ToastProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

const customRender = (ui, options = {}) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
```

#### src/test/mocks/handlers.js (MSW Setup)

```javascript
import { rest } from "msw";

export const handlers = [
  rest.get("/api/health", (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: {
          status: "OK",
          timestamp: new Date().toISOString(),
          uptime: 123.456,
          environment: "test",
          version: "1.0.0",
        },
      })
    );
  }),

  rest.post("/api/ai/chat", (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: {
          response: "This is a mock AI response",
          timestamp: new Date().toISOString(),
        },
      })
    );
  }),

  // Add more API mocks as needed
];
```

#### src/test/mocks/server.js

```javascript
import { setupServer } from "msw/node";
import { handlers } from "./handlers";

export const server = setupServer(...handlers);
```

#### src/test/setup.js (Update with MSW)

```javascript
import "@testing-library/jest-dom";
import { expect, afterEach, beforeAll, afterAll } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { server } from "./mocks/server";

expect.extend(matchers);

// Establish API mocking before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests
afterEach(() => {
  server.resetHandlers();
  cleanup();
});

// Clean up after all tests are done
afterAll(() => server.close());
```

### **1.4 Directory Structure**

```text
src/
├── components/
│   └── __tests__/
│       ├── ComponentName.test.jsx
│       └── ComponentName.test.css
├── hooks/
│   └── __tests__/
│       └── useHookName.test.js
├── utils/
│   └── __tests__/
│       └── utilityFunction.test.js
├── pages/
│   └── __tests__/
│       └── PageName.test.jsx
└── test/
    ├── setup.js
    ├── test-utils.jsx
    └── mocks/
        ├── handlers.js
        └── server.js
```

---

## **PHASE 2: Unit Testing**

### **2.1 Component Testing**

#### Example: Button Component Test

```jsx
// src/components/__tests__/NavigationButton.test.jsx
import { render, screen, fireEvent } from "@test/test-utils";
import { expect, test, vi } from "vitest";
import NavigationButton from "../buttons/NavigationButton";

test("renders navigation button with correct text", () => {
  render(<NavigationButton to="/test">Test Button</NavigationButton>);

  expect(
    screen.getByRole("link", { name: /test button/i })
  ).toBeInTheDocument();
});

test("calls onClick when button is clicked", () => {
  const handleClick = vi.fn();
  render(
    <NavigationButton to="/test" onClick={handleClick}>
      Test Button
    </NavigationButton>
  );

  fireEvent.click(screen.getByRole("link", { name: /test button/i }));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

#### Component Test Categories:

- **UI Components**: NavigationButton, Header, Footer, HeroSection
- **Form Components**: ResumeUpload, Chatbot input forms
- **Display Components**: FeaturesSection, TestimonialsSection, FAQSection
- **Error Components**: ErrorBoundary, LoadingError, NetworkError, RateLimitError

```
src/
├── components/
│   └── __tests__/
│       ├── ComponentName.test.jsx
│       └── ComponentName.test.css
├── hooks/
│   └── __tests__/
│       └── useHookName.test.js
├── utils/
│   └── __tests__/
│       └── utilityFunction.test.js
├── pages/
│   └── __tests__/
│       └── PageName.test.jsx
└── test/
    ├── setup.js
    ├── test-utils.jsx
    └── mocks/
        ├── handlers.js
        └── server.js
```

---

## **PHASE 2: Unit Testing**

### **2.1 Component Testing**

#### Example: Button Component Test

```jsx
// src/components/__tests__/NavigationButton.test.jsx
import { render, screen, fireEvent } from "@test/test-utils";
import { expect, test, vi } from "vitest";
import NavigationButton from "../buttons/NavigationButton";

test("renders navigation button with correct text", () => {
  render(<NavigationButton to="/test">Test Button</NavigationButton>);

  expect(
    screen.getByRole("link", { name: /test button/i })
  ).toBeInTheDocument();
});

test("calls onClick when button is clicked", () => {
  const handleClick = vi.fn();
  render(
    <NavigationButton to="/test" onClick={handleClick}>
      Test Button
    </NavigationButton>
  );

  fireEvent.click(screen.getByRole("link", { name: /test button/i }));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

#### Component Test Categories:

- **UI Components**: NavigationButton, Header, Footer, HeroSection
- **Form Components**: ResumeUpload, Chatbot input
- **Display Components**: FeaturesSection, TestimonialsSection, FAQSection
- **Error Components**: ErrorBoundary, LoadingError, NetworkError, RateLimitError

### **2.2 Custom Hook Testing**

#### Example: useAIChat Hook Test

```javascript
// src/hooks/__tests__/useAIChat.test.js
import { renderHook, waitFor } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { useAIChat } from "../useAIChat";

// Mock the AI API
vi.mock("../../utils/aiApi", () => ({
  chat: vi.fn(),
}));

import { chat } from "../../utils/aiApi";

test("sends message and updates state", async () => {
  const mockResponse = {
    success: true,
    data: { response: "Hello from AI", timestamp: new Date().toISOString() },
  };

  chat.mockResolvedValue(mockResponse);

  const { result } = renderHook(() => useAIChat());

  result.current.sendMessage("Hello AI");

  await waitFor(() => {
    expect(result.current.messages).toHaveLength(2); // welcome + user message
    expect(result.current.isLoading).toBe(false);
  });

  expect(chat).toHaveBeenCalledWith({
    message: "Hello AI",
    context: null,
    sessionType: "general",
  });
});
```

### **2.3 Utility Function Testing**

#### Example: API Utility Test

```javascript
// src/utils/__tests__/aiApi.test.js
import { expect, test, vi } from "vitest";
import { chat } from "../aiApi";

// Mock fetch
global.fetch = vi.fn();

test("chat function handles successful response", async () => {
  const mockResponse = {
    success: true,
    data: { response: "AI response", timestamp: "2024-01-01T00:00:00Z" },
  };

  fetch.mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(mockResponse),
  });

  const result = await chat({ message: "test" });

  expect(result).toEqual(mockResponse);
  expect(fetch).toHaveBeenCalledWith(
    "https://evaai-seven.vercel.app/api/ai/chat",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "test" }),
    }
  );
});

test("chat function handles rate limit error", async () => {
  fetch.mockResolvedValue({
    ok: false,
    status: 429,
    json: () => Promise.resolve({ message: "Rate limit exceeded" }),
  });

  await expect(chat({ message: "test" })).rejects.toThrow(
    "Rate limit exceeded"
  );
});
```

---

## **PHASE 3: Integration Testing**

### **3.1 Page Integration Tests**

#### Example: LandingPage Integration Test

```jsx
// src/pages/__tests__/LandingPage.test.jsx
import { render, screen, waitFor } from "@test/test-utils";
import { expect, test } from "vitest";
import LandingPage from "../LandingPage";

test("renders landing page with all sections", async () => {
  render(<LandingPage />);

  // Check header
  expect(screen.getByRole("banner")).toBeInTheDocument();

  // Check hero section
  expect(screen.getByText(/jobpsych ai assistant/i)).toBeInTheDocument();

  // Check features section
  expect(screen.getByText(/features/i)).toBeInTheDocument();

  // Check testimonials
  expect(screen.getByText(/what our users say/i)).toBeInTheDocument();

  // Check footer
  expect(screen.getByText(/© 2024 jobpsych/i)).toBeInTheDocument();
});

test("navigation buttons work correctly", async () => {
  render(<LandingPage />);

  const roleSuggestionButton = screen.getByRole("link", {
    name: /role suggestions/i,
  });
  expect(roleSuggestionButton).toHaveAttribute("href", "/role-suggestions");
});
```

### **3.2 API Integration Tests**

#### Example: Chatbot API Integration Test

```jsx
// src/components/__tests__/Chatbot.integration.test.jsx
import { render, screen, waitFor, fireEvent } from "@test/test-utils";
import { expect, test } from "vitest";
import Chatbot from "../Chatbot";

test("complete chat flow with API", async () => {
  render(<Chatbot />);

  // Open chatbot
  const toggleButton = screen.getByRole("button", { name: /open chat/i });
  fireEvent.click(toggleButton);

  // Type message
  const input = screen.getByPlaceholderText(/ask jobpsych ai/i);
  fireEvent.change(input, { target: { value: "Hello AI" } });

  // Send message
  const sendButton = screen.getByRole("button", { name: /send/i });
  fireEvent.click(sendButton);

  // Check loading state
  expect(screen.getByText(/ai is thinking/i)).toBeInTheDocument();

  // Wait for response
  await waitFor(() => {
    expect(screen.getByText("Hello AI")).toBeInTheDocument();
    expect(screen.getByText("This is a mock AI response")).toBeInTheDocument();
  });

  // Check loading is gone
  expect(screen.queryByText(/ai is thinking/i)).not.toBeInTheDocument();
});
```

---

## **PHASE 4: End-to-End Testing with Playwright**

### **4.1 Playwright Setup**

#### playwright.config.js

```javascript
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
```

### **4.2 E2E Test Examples**

#### e2e/chat-flow.spec.js

```javascript
import { test, expect } from "@playwright/test";

test("complete user journey from landing to AI chat", async ({ page }) => {
  // Navigate to landing page
  await page.goto("/");

  // Check landing page loads
  await expect(page).toHaveTitle(/JobPsych/);
  await expect(page.locator("text=JobPsych AI Assistant")).toBeVisible();

  // Open chatbot
  await page.locator('[data-testid="chat-toggle"]').click();

  // Type and send message
  await page.locator('[placeholder="Ask JobPsych AI..."]').fill("Hello AI");
  await page.locator('[data-testid="send-button"]').click();

  // Wait for response
  await expect(page.locator("text=AI is thinking...")).toBeVisible();
  await expect(page.locator("text=This is a mock AI response")).toBeVisible();
});
```

#### e2e/resume-upload.spec.js

```javascript
import { test, expect } from "@playwright/test";

test("resume upload and analysis flow", async ({ page }) => {
  await page.goto("/ats-analyzer");

  // Upload file
  const fileInput = page.locator('input[type="file"]');
  await fileInput.setInputFiles("./test-data/sample-resume.pdf");

  // Wait for analysis to complete
  await expect(page.locator("text=Analysis Complete")).toBeVisible();

  // Check results are displayed
  await expect(page.locator(".analysis-results")).toBeVisible();
});
```

---

## **PHASE 5: Specialized Testing**

### **5.1 Accessibility Testing**

#### Accessibility Test Setup

```javascript
// src/test/setup.js (add to existing)
import "jest-axe/extend-expect";

// Custom matchers for accessibility
expect.extend({
  toHaveNoViolations(received) {
    // Implementation for axe-core integration
  },
});
```

#### Accessibility Test Example

```jsx
// src/components/__tests__/Header.accessibility.test.jsx
import { render } from "@test/test-utils";
import { expect, test } from "vitest";
import { axe } from "jest-axe";
import Header from "../layout/Header";

test("Header has no accessibility violations", async () => {
  const { container } = render(<Header />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### **5.2 Visual Regression Testing**

#### Visual Test Setup with Playwright

```javascript
// e2e/visual-regression.spec.js
import { test, expect } from "@playwright/test";

test("landing page visual regression", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveScreenshot("landing-page.png");
});

test("chatbot visual regression", async ({ page }) => {
  await page.goto("/");
  await page.locator('[data-testid="chat-toggle"]').click();
  await expect(page.locator(".chatbot")).toHaveScreenshot("chatbot-open.png");
});
```

### **5.3 Performance Testing**

#### Performance Test with Playwright

```javascript
// e2e/performance.spec.js
import { test, expect } from "@playwright/test";

test("page load performance", async ({ page }) => {
  const startTime = Date.now();

  await page.goto("/", { waitUntil: "networkidle" });

  const loadTime = Date.now() - startTime;
  expect(loadTime).toBeLessThan(3000); // Should load within 3 seconds

  // Check Core Web Vitals
  const metrics = await page.evaluate(() => {
    // Get performance metrics
    const perfEntries = performance.getEntriesByType("navigation")[0];
    return {
      domContentLoaded:
        perfEntries.domContentLoadedEventEnd -
        perfEntries.domContentLoadedEventStart,
      loadComplete: perfEntries.loadEventEnd - perfEntries.loadEventStart,
    };
  });

  expect(metrics.domContentLoaded).toBeLessThan(2000);
  expect(metrics.loadComplete).toBeLessThan(3000);
});
```

---

## **PHASE 6: Test Automation & CI/CD**

### **6.1 GitHub Actions Workflow**

#### .github/workflows/test.yml

```yaml
name: Test Suite

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run linting
        run: npm run lint

      - name: Run unit tests
        run: npm run test:run

      - name: Run coverage
        run: npm run test:coverage

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/coverage-final.json

      - name: Build application
        run: npm run build

  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright
        run: npx playwright install

      - name: Run E2E tests
        run: npm run test:e2e

      - name: Upload test results
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

### **6.2 Pre-commit Hooks**

#### .husky/pre-commit

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run lint
npm run test:run
```

### **6.3 Coverage Reporting**

#### Coverage Configuration in vite.config.js

```javascript
coverage: {
  provider: 'v8',
  reporter: ['text', 'json', 'html', 'lcov'],
  exclude: [
    'node_modules/',
    'src/test/',
    '**/*.d.ts',
    '**/*.config.js',
    'dist/',
    'coverage/',
  ],
  thresholds: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
    './src/components/': {
      branches: 75,
      functions: 75,
      lines: 75,
      statements: 75,
    },
  },
}
```

---

## **Testing Strategy Details**

### **Test Pyramid Approach**

```
E2E Tests (10-20%)    ████████░░
Integration Tests     ██████████
Unit Tests           ████████████ (70-80%)
```

### **Test Data Strategy**

- **Mock Data**: API responses, user scenarios
- **Test Fixtures**: Sample resumes, chat conversations
- **Factory Functions**: Generate test data dynamically

### **Test Organization**

```
src/
├── components/
│   └── __tests__/
│       ├── ComponentName.test.jsx
│       ├── ComponentName.integration.test.jsx
│       └── ComponentName.accessibility.test.jsx
├── hooks/
│   └── __tests__/
│       └── useHookName.test.js
├── utils/
│   └── __tests__/
│       └── utilityFunction.test.js
├── pages/
│   └── __tests__/
│       └── PageName.test.jsx
└── test/
    ├── setup.js
    ├── test-utils.jsx
    ├── mocks/
    │   ├── handlers.js
    │   └── server.js
    └── fixtures/
        ├── sample-resume.pdf
        └── test-data.json
```

### **Key Testing Priorities**

1. **AI Chat Functionality** - Core business feature
2. **Resume Upload/Analysis** - Critical user workflow
3. **Error Handling** - User experience and reliability
4. **Responsive Design** - Cross-device compatibility
5. **API Integration** - Backend communication stability

### **Test Execution Commands**

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Run coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e

# Run specific test file
npm test -- src/components/Chatbot.test.jsx

# Run tests matching pattern
npm test -- --reporter=verbose "chat"
```

### **Quality Gates**

- **Unit Test Coverage**: >70% overall, >75% for components
- **Linting**: Must pass before commit
- **Build**: Must succeed before merge
- **E2E Tests**: Must pass in CI/CD pipeline
- **Performance**: <3s page load time, <2s DOM content loaded

---

## **Implementation Workflow**

### **Phase 1 Checklist**

- [ ] Install Vitest and testing dependencies
- [ ] Configure Vitest in vite.config.js
- [ ] Create test setup files
- [ ] Setup MSW for API mocking
- [ ] Create test utilities
- [ ] Setup directory structure
- [ ] Configure CI/CD pipeline

### **Phase 2 Checklist**

- [ ] Write unit tests for utility functions
- [ ] Write unit tests for custom hooks
- [ ] Write unit tests for simple components
- [ ] Write unit tests for complex components
- [ ] Achieve 70% coverage target

### **Phase 3 Checklist**

- [ ] Write integration tests for pages
- [ ] Write integration tests for component interactions
- [ ] Write API integration tests
- [ ] Test error scenarios
- [ ] Test loading states

### **Phase 4 Checklist**

- [ ] Setup Playwright
- [ ] Write critical user journey E2E tests
- [ ] Write form submission E2E tests
- [ ] Write navigation E2E tests
- [ ] Setup visual regression testing

### **Phase 5 Checklist**

- [ ] Implement accessibility testing
- [ ] Add performance testing
- [ ] Setup visual regression
- [ ] Add security testing basics

### **Phase 6 Checklist**

- [ ] Configure GitHub Actions
- [ ] Setup pre-commit hooks
- [ ] Configure coverage reporting
- [ ] Setup test result reporting
- [ ] Document testing procedures

---

## **Success Metrics**

### **Coverage Targets**

- **Unit Tests**: 70% overall coverage
- **Critical Components**: 80% coverage
- **Hooks**: 90% coverage
- **Utilities**: 85% coverage

### **Performance Targets**

- **Test Execution**: <5 minutes for full suite
- **E2E Tests**: <10 minutes
- **CI/CD Pipeline**: <15 minutes total

### **Quality Targets**

- **Zero failing tests** in main branch
- **Zero accessibility violations** in critical flows
- **Zero security vulnerabilities** in dependencies
- **100% CI/CD pass rate** for PRs

---

## **Maintenance & Evolution**

### **Regular Activities**

- **Weekly**: Review test coverage reports
- **Monthly**: Update test dependencies
- **Quarterly**: Review and update test strategy
- **Bi-annually**: Audit test effectiveness

### **Test Maintenance**

- Remove obsolete tests
- Update tests for API changes
- Refactor tests for better maintainability
- Add tests for new features

### **Team Training**

- Document testing best practices
- Conduct testing workshops
- Review test code in PRs
- Share testing knowledge

---
