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
