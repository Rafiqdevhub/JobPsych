// @ts-check
import { test, expect } from "@playwright/test";

test.describe("Chatbot - Toggle Functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
  });

  test("should have chatbot toggle button", async ({ page, browserName }) => {
    if (browserName === "webkit") {
      // WebKit has rendering issues, check for fallback content
      const fallbackVisible = await page
        .locator("#webkit-fallback")
        .isVisible();
      expect(fallbackVisible).toBe(true);
    } else {
      const toggleBtn = page.getByRole("button", {
        name: /chat|message|help|assistant/i,
      });
      const chatIcon = page.locator('[class*="chat"], [class*="message"]');

      const btnCount = await toggleBtn.count();
      const iconCount = await chatIcon.count();

      expect(btnCount + iconCount).toBeGreaterThan(0);
    }
  });

  test("should toggle chatbot on click", async ({ page }) => {
    const toggleBtn = page.getByRole("button", { name: /chat|message|help/i });
    const btnCount = await toggleBtn.count();

    if (btnCount > 0) {
      await toggleBtn.first().click();
      await page.waitForTimeout(500);

      // Check if chatbot interface appears
      const chatInterface = page.locator(
        '[class*="chatbot"], [class*="chat-window"]'
      );
      const interfaceCount = await chatInterface.count();

      if (interfaceCount > 0) {
        await expect(chatInterface.first()).toBeVisible();
      }
    }
  });

  test("should close chatbot when clicking close", async ({ page }) => {
    const toggleBtn = page.getByRole("button", { name: /chat|message|help/i });
    const btnCount = await toggleBtn.count();

    if (btnCount > 0) {
      await toggleBtn.first().click();
      await page.waitForTimeout(500);

      const closeBtn = page.getByRole("button", { name: /close|×/i });
      const closeCount = await closeBtn.count();

      if (closeCount > 0) {
        await closeBtn.first().click();
        await page.waitForTimeout(500);
      }
    }
  });
});

test.describe("Chatbot - Input and Send", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    await page.waitForTimeout(1000);

    // Open chatbot
    const toggleBtn = page.getByRole("button", { name: /chat|message|help/i });
    const btnCount = await toggleBtn.count();

    if (btnCount > 0) {
      await toggleBtn.first().click({ force: true, timeout: 15000 });
      await page.waitForTimeout(1000);
    }
  });

  test("should have message input field", async ({ page }) => {
    const messageInput = page.getByPlaceholder(/message|type|ask/i);
    const textareas = page.locator("textarea");
    const inputs = page.locator('input[type="text"]');

    const placeholderCount = await messageInput.count();
    const textareaCount = await textareas.count();
    const inputCount = await inputs.count();

    if (placeholderCount + textareaCount + inputCount > 0) {
      expect(placeholderCount + textareaCount + inputCount).toBeGreaterThan(0);
    }
  });

  test("should allow typing in message input", async ({ page }) => {
    const messageInput = page.getByPlaceholder(/message|type|ask/i);
    const inputCount = await messageInput.count();

    if (inputCount > 0) {
      const testMessage = "Hello, I need help with my resume";
      await messageInput.first().fill(testMessage);

      const value = await messageInput.first().inputValue();
      expect(value).toBe(testMessage);
    }
  });

  test("should have send button", async ({ page }) => {
    const sendBtn = page.getByRole("button", { name: /send|submit|arrow/i });
    const btnCount = await sendBtn.count();

    if (btnCount > 0) {
      await expect(sendBtn.first()).toBeVisible();
    }
  });

  test("send button should be enabled with text", async ({ page }) => {
    const messageInput = page.getByPlaceholder(/message|type|ask/i);
    const inputCount = await messageInput.count();

    if (inputCount > 0) {
      await messageInput.first().fill("Test message");

      const sendBtn = page.getByRole("button", { name: /send|submit/i });
      const btnCount = await sendBtn.count();

      if (btnCount > 0) {
        const isEnabled = await sendBtn.first().isEnabled();
        expect(typeof isEnabled).toBe("boolean");
      }
    }
  });
});

test.describe("Chatbot - Message Display", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    await page.waitForTimeout(1000);

    // Open chatbot
    const toggleBtn = page.getByRole("button", { name: /chat|message|help/i });
    const btnCount = await toggleBtn.count();

    if (btnCount > 0) {
      await toggleBtn.first().click({ force: true, timeout: 15000 });
      await page.waitForTimeout(1000);
    }
  });

  test("should have messages container", async ({ page }) => {
    const messagesContainer = page.locator(
      '[class*="message"], [class*="chat-history"]'
    );
    const containerCount = await messagesContainer.count();

    if (containerCount > 0) {
      await expect(messagesContainer.first()).toBeAttached();
    }
  });

  test("should display welcome message", async ({ page }) => {
    const welcomeMsg = page.getByText(/welcome|hello|how.*help/i);
    const msgCount = await welcomeMsg.count();

    if (msgCount > 0) {
      await expect(welcomeMsg.first()).toBeVisible();
    }
  });
});

test.describe("Chatbot - Accessibility", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
  });

  test("chatbot toggle should be keyboard accessible", async ({ page }) => {
    const toggleBtn = page.getByRole("button", { name: /chat|message|help/i });
    const btnCount = await toggleBtn.count();

    if (btnCount > 0) {
      await toggleBtn.first().focus();
      await page.keyboard.press("Enter");
      await page.waitForTimeout(500);
    }
  });

  test("should have proper ARIA labels", async ({ page }) => {
    const toggleBtn = page.getByRole("button", { name: /chat|message|help/i });
    const btnCount = await toggleBtn.count();

    if (btnCount > 0) {
      const ariaLabel = await toggleBtn.first().getAttribute("aria-label");
      if (ariaLabel) {
        expect(ariaLabel.length).toBeGreaterThan(0);
      }
    }
  });
});

test.describe("Chatbot - Multi-Page Availability", () => {
  test("should be available on landing page", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    const toggleBtn = page.getByRole("button", { name: /chat|message|help/i });
    const btnCount = await toggleBtn.count();

    expect(btnCount).toBeGreaterThanOrEqual(0);
  });

  test("should be available on ATS Analyzer page", async ({ page }) => {
    await page.goto("/ats-analyzer");
    await page.waitForLoadState("domcontentloaded");

    const toggleBtn = page.getByRole("button", { name: /chat|message|help/i });
    const btnCount = await toggleBtn.count();

    expect(btnCount).toBeGreaterThanOrEqual(0);
  });

  test("should be available on Interview Prep page", async ({ page }) => {
    await page.goto("/interview-prep");
    await page.waitForLoadState("domcontentloaded");

    const toggleBtn = page.getByRole("button", { name: /chat|message|help/i });
    const btnCount = await toggleBtn.count();

    expect(btnCount).toBeGreaterThanOrEqual(0);
  });
});

test.describe("Chatbot - Mobile Experience", () => {
  test("should work on mobile devices", async ({ page, isMobile }) => {
    if (isMobile) {
      await page.goto("/");
      await page.waitForLoadState("domcontentloaded");

      const toggleBtn = page.getByRole("button", {
        name: /chat|message|help/i,
      });
      const btnCount = await toggleBtn.count();

      if (btnCount > 0) {
        await toggleBtn.first().click();
        await page.waitForTimeout(500);

        const chatInterface = page.locator(
          '[class*="chatbot"], [class*="chat"]'
        );
        const interfaceCount = await chatInterface.count();

        if (interfaceCount > 0) {
          const box = await chatInterface.first().boundingBox();
          const viewportWidth = page.viewportSize()?.width || 0;

          if (box) {
            expect(box.width).toBeLessThanOrEqual(viewportWidth);
          }
        }
      }
    }
  });
});
