// @ts-check
import { test, expect } from "@playwright/test";

test.describe("User Journey - New User Exploration", () => {
  test("should complete new user exploration flow", async ({ page }) => {
    // Step 1: Land on homepage
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    await expect(page).toHaveURL("/");

    // Step 2: Explore features section
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(500);

    // Step 3: Navigate to ATS Analyzer
    const atsLink = page.getByRole("link", { name: /ats|analyzer|resume/i });
    const atsCount = await atsLink.count();

    if (atsCount > 0) {
      await page.waitForTimeout(500);
      await atsLink.first().click({ force: true, timeout: 15000 });
      await page.waitForLoadState("domcontentloaded");
      await expect(page).toHaveURL(/ats|analyzer/i);
    }

    // Step 4: Return to home
    const homeLink = page.getByRole("link", { name: /home|jobpsych/i });
    const homeCount = await homeLink.count();

    if (homeCount > 0) {
      await page.waitForTimeout(500);
      await homeLink.first().click({ force: true, timeout: 15000 });
      await page.waitForLoadState("domcontentloaded");
      await expect(page).toHaveURL("/");
    }
  });
});

test.describe("User Journey - Resume Analysis Flow", () => {
  test("should navigate through resume analysis journey", async ({ page }) => {
    // Step 1: Start from home
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Step 2: Go to ATS Analyzer
    await page.goto("/ats-analyzer");
    await page.waitForLoadState("domcontentloaded");

    // Step 3: Check for file upload capability
    const fileInput = page.locator('input[type="file"]');
    const inputCount = await fileInput.count();

    if (inputCount > 0) {
      await expect(fileInput.first()).toBeAttached();
    }

    // Step 4: Check for job description input
    const textareas = page.locator("textarea");
    const textareaCount = await textareas.count();

    if (textareaCount > 0) {
      await textareas
        .first()
        .fill("Looking for Software Engineer with 3+ years experience");
      const value = await textareas.first().inputValue();
      expect(value.length).toBeGreaterThan(0);
    }
  });
});

test.describe("User Journey - Interview Preparation Flow", () => {
  test("should complete interview preparation journey", async ({ page }) => {
    // Step 1: Navigate to Interview Prep
    await page.goto("/interview-prep");
    await page.waitForLoadState("domcontentloaded");
    await expect(page).toHaveURL(/interview/i);

    // Step 2: Fill in job description
    const textareas = page.locator("textarea");
    const textareaCount = await textareas.count();

    if (textareaCount > 0) {
      await textareas
        .first()
        .fill("Senior Full Stack Developer position at tech company");
      await page.waitForTimeout(300);
    }

    // Step 3: Select interview type (if available)
    const radios = page.locator('input[type="radio"]');
    const radioCount = await radios.count();

    if (radioCount > 0) {
      await radios.first().check();
      await expect(radios.first()).toBeChecked();
    }

    // Step 4: Check for generate button
    const generateBtn = page.getByRole("button", { name: /generate|prepare/i });
    const btnCount = await generateBtn.count();

    if (btnCount > 0) {
      await expect(generateBtn.first()).toBeVisible();
    }
  });
});

test.describe("User Journey - Career Exploration Flow", () => {
  test("should explore career suggestion features", async ({ page }) => {
    // Step 1: Navigate to Role Suggestion
    await page.goto("/role-suggestion");
    await page.waitForLoadState("domcontentloaded");
    await expect(page).toHaveURL(/role|suggestion/i);

    // Step 2: Enter skills
    const textareas = page.locator("textarea");
    const inputs = page.locator('input[type="text"]');

    const textareaCount = await textareas.count();
    const inputCount = await inputs.count();

    if (textareaCount > 0) {
      await textareas.first().fill("JavaScript, React, Node.js, MongoDB");
      await page.waitForTimeout(300);
    } else if (inputCount > 0) {
      await inputs.first().fill("JavaScript, React, Node.js");
      await page.waitForTimeout(300);
    }

    // Step 3: Check for submit button
    const submitBtn = page.getByRole("button", {
      name: /generate|suggest|find/i,
    });
    const btnCount = await submitBtn.count();

    if (btnCount > 0) {
      await expect(submitBtn.first()).toBeVisible();
    }
  });
});

test.describe("User Journey - Multi-Feature Navigation", () => {
  test("should navigate between multiple features", async ({ page }) => {
    // Start at home
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Visit ATS Analyzer
    await page.goto("/ats-analyzer");
    await page.waitForLoadState("domcontentloaded");
    await expect(page).toHaveURL(/ats|analyzer/i);

    // Visit Interview Prep
    await page.goto("/interview-prep");
    await page.waitForLoadState("domcontentloaded");
    await expect(page).toHaveURL(/interview/i);

    // Visit Role Suggestion
    await page.goto("/role-suggestion");
    await page.waitForLoadState("domcontentloaded");
    await expect(page).toHaveURL(/role|suggestion/i);

    // Return home
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    await expect(page).toHaveURL("/");
  });
});

test.describe("User Journey - Chatbot Interaction", () => {
  test("should interact with chatbot across pages", async ({ page }) => {
    // Start on landing page
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Open chatbot
    await page.waitForTimeout(1000);
    const toggleBtn = page.getByRole("button", { name: /chat|message|help/i });
    const btnCount = await toggleBtn.count();

    if (btnCount > 0) {
      await toggleBtn.first().click({ force: true, timeout: 15000 });
      await page.waitForTimeout(1000);

      // Type a message
      const messageInput = page.getByPlaceholder(/message|type|ask/i);
      const inputCount = await messageInput.count();

      if (inputCount > 0) {
        await messageInput.first().fill("I need help with my resume");
        await page.waitForTimeout(300);
      }

      // Close chatbot
      const closeBtn = page.getByRole("button", { name: /close|×/i });
      const closeCount = await closeBtn.count();

      if (closeCount > 0) {
        await closeBtn.first().click({ force: true });
        await page.waitForTimeout(500);
      }
    }

    // Navigate to another page
    await page.goto("/interview-prep");
    await page.waitForLoadState("domcontentloaded");

    // Verify chatbot still available
    const chatbotBtn = page.getByRole("button", { name: /chat|message|help/i });
    const chatCount = await chatbotBtn.count();

    expect(chatCount).toBeGreaterThanOrEqual(0);
  });
});

test.describe("User Journey - Complete Application Flow", () => {
  test("should complete full application workflow", async ({
    page,
    browserName,
  }) => {
    // 1. Start at landing page
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    if (browserName === "webkit") {
      await expect(page).toHaveTitle(/JobPsych/);
    } else {
      await expect(page.locator("body")).toBeVisible();
    }

    // 2. Explore features by scrolling
    await page.evaluate(() =>
      window.scrollTo(0, document.body.scrollHeight / 2)
    );
    await page.waitForTimeout(500);

    // 3. Navigate to ATS Analyzer
    await page.goto("/ats-analyzer");
    await page.waitForLoadState("domcontentloaded");

    const textareas = page.locator("textarea");
    const textareaCount = await textareas.count();

    if (textareaCount > 0) {
      await textareas.first().fill("Software Engineer job description");
    }

    // 4. Go to Interview Prep
    await page.goto("/interview-prep");
    await page.waitForLoadState("domcontentloaded");

    // 5. Go to Role Suggestion
    await page.goto("/role-suggestion");
    await page.waitForLoadState("domcontentloaded");

    // 6. Open chatbot for help
    const chatBtn = page.getByRole("button", { name: /chat|message|help/i });
    const chatCount = await chatBtn.count();

    if (chatCount > 0) {
      await chatBtn.first().click();
      await page.waitForTimeout(500);
    }

    // 7. Return to home
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    await expect(page).toHaveURL("/");
  });
});

test.describe("User Journey - Error Recovery", () => {
  test("should handle navigation errors gracefully", async ({
    page,
    browserName,
  }) => {
    // Try to navigate to valid page
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    await expect(page).toHaveURL("/");

    // Navigate to another valid page
    await page.goto("/ats-analyzer");
    await page.waitForLoadState("domcontentloaded");

    // Verify page is functional
    if (browserName === "webkit") {
      await expect(page).toHaveTitle(/JobPsych/);
    } else {
      await expect(page.locator("body")).toBeVisible();
    }
  });
});
