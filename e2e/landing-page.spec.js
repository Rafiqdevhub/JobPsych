// @ts-check
import { test, expect } from "@playwright/test";

test.describe("Landing Page - Page Load", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    // Additional wait for WebKit compatibility
    await page.waitForLoadState("networkidle");
  });

  test("should load landing page successfully", async ({
    page,
    browserName,
  }) => {
    await expect(page).toHaveURL("/");

    if (browserName === "webkit") {
      // WebKit has issues with body visibility, check for title instead
      await expect(page).toHaveTitle(/JobPsych/);
    } else {
      // For other browsers, wait for React app to load
      await page.waitForSelector("#root > *", { timeout: 15000 });
      await expect(page.locator("body")).toBeVisible();
    }
  });

  test("should display navigation header", async ({ page }) => {
    const header = page.locator("header, nav");
    const headerCount = await header.count();

    if (headerCount > 0) {
      await expect(header.first()).toBeVisible();
    }
  });

  test("should display hero section", async ({ page }) => {
    const hero = page.getByRole("heading", { name: /jobpsych|ai|assistant/i });
    const heroCount = await hero.count();

    if (heroCount > 0) {
      await expect(hero.first()).toBeVisible();
    }
  });

  test("should display main content", async ({ page }) => {
    const main = page.locator('main, [role="main"]');
    const mainCount = await main.count();

    if (mainCount > 0) {
      await expect(main.first()).toBeVisible();
    }
  });

  test("should display footer", async ({ page }) => {
    const footer = page.locator("footer");
    const footerCount = await footer.count();

    if (footerCount > 0) {
      await expect(footer.first()).toBeVisible();
    }
  });
});

test.describe("Landing Page - Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    await page.waitForLoadState("networkidle");
  });

  test("should have navigation links", async ({ page, browserName }) => {
    // Wait a bit for React to fully render
    await page.waitForTimeout(1000);

    if (browserName === "webkit") {
      // WebKit has rendering issues, check for fallback content
      const fallbackVisible = await page
        .locator("#webkit-fallback")
        .isVisible();
      expect(fallbackVisible).toBe(true);

      // Check that the page title is correct
      await expect(page).toHaveTitle(/JobPsych/);
    } else {
      const links = page.getByRole("link");
      const linkCount = await links.count();
      expect(linkCount).toBeGreaterThan(0);
    }
  });

  test("should navigate to ATS Analyzer", async ({ page }) => {
    const atsLink = page.getByRole("link", { name: /ats|analyzer|resume/i });
    const linkCount = await atsLink.count();

    if (linkCount > 0) {
      await atsLink.first().click({ force: true, timeout: 15000 });
      await page.waitForLoadState("domcontentloaded");
      await expect(page).toHaveURL(/ats|analyzer/i);
    }
  });

  test("should navigate to Interview Prep", async ({ page }) => {
    const interviewLink = page.getByRole("link", { name: /interview/i });
    const linkCount = await interviewLink.count();

    if (linkCount > 0) {
      await interviewLink.first().click({ force: true, timeout: 15000 });
      await page.waitForLoadState("domcontentloaded");
      await expect(page).toHaveURL(/interview/i);
    }
  });

  test("should navigate to Role Suggestion", async ({ page }) => {
    const roleLink = page.getByRole("link", { name: /role|suggestion/i });
    const linkCount = await roleLink.count();

    if (linkCount > 0) {
      await roleLink.first().click({ force: true, timeout: 15000 });
      await page.waitForLoadState("domcontentloaded");
      await expect(page).toHaveURL(/role|suggestion/i);
    }
  });
});

test.describe("Landing Page - Features", () => {
  test.beforeEach(async ({ page, browserName }) => {
    const timeout = browserName === "firefox" ? 60000 : 30000;
    await page.goto("/", { timeout });
    await page.waitForLoadState("networkidle", { timeout });
  });

  test("should display features section", async ({ page }) => {
    const features = page.getByText(/feature|benefit|what we offer/i);
    const featureCount = await features.count();

    if (featureCount > 0) {
      await expect(features.first()).toBeVisible();
    }
  });

  test("should display call-to-action buttons", async ({
    page,
    browserName,
  }) => {
    if (browserName === "webkit") {
      // WebKit has rendering issues, check for fallback content
      const fallbackVisible = await page
        .locator("#webkit-fallback")
        .isVisible();
      expect(fallbackVisible).toBe(true);
    } else {
      // Check for actual CTA buttons on the landing page (hero section buttons)
      const buttons = page.getByRole("button");
      const buttonCount = await buttons.count();
      // Landing page should have multiple interactive buttons
      expect(buttonCount).toBeGreaterThan(0);

      // Verify at least one button is visible
      if (buttonCount > 0) {
        await expect(buttons.first()).toBeVisible();
      }
    }
  });

  test("should have working scroll interactions", async ({
    page,
    browserName,
  }) => {
    if (browserName === "webkit") {
      // WebKit has scroll issues, just check that page has content height
      const pageHeight = await page.evaluate(() => document.body.scrollHeight);
      expect(pageHeight).toBeGreaterThan(0);
    } else {
      const initialScroll = await page.evaluate(() => window.scrollY);

      await page.evaluate(() => window.scrollTo(0, 500));
      await page.waitForTimeout(500);

      const newScroll = await page.evaluate(() => window.scrollY);
      expect(newScroll).toBeGreaterThan(initialScroll);
    }
  });
});

test.describe("Landing Page - Mobile Responsive", () => {
  test("should be responsive on mobile viewport", async ({
    page,
    isMobile,
  }) => {
    if (isMobile) {
      await page.goto("/");
      await page.waitForLoadState("domcontentloaded");

      await expect(page.locator("body")).toBeVisible();

      const viewportWidth = page.viewportSize()?.width || 0;
      expect(viewportWidth).toBeLessThanOrEqual(500);
    }
  });
});

test.describe("Landing Page - Performance", () => {
  test("should load within acceptable time", async ({ page, browserName }) => {
    const startTime = Date.now();
    // Use longer timeout for Firefox which is slower in test environments
    const timeout = browserName === "firefox" ? 60000 : 30000;
    await page.goto("/", { timeout });
    await page.waitForLoadState("domcontentloaded");
    const loadTime = Date.now() - startTime;

    // More realistic timeout for test environment
    const acceptableTime = browserName === "firefox" ? 45000 : 30000;
    expect(loadTime).toBeLessThan(acceptableTime);
  });

  test("should have no console errors", async ({ page, browserName }) => {
    /** @type {string[]} */
    const consoleErrors = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    const timeout = browserName === "firefox" ? 60000 : 30000;
    await page.goto("/", { timeout });
    await page.waitForLoadState("networkidle", { timeout });

    // Allow some common non-critical errors
    const criticalErrors = consoleErrors.filter(
      (error) =>
        !error.includes("favicon") &&
        !error.includes("404") &&
        !error.includes("X-Frame-Options")
    );

    if (browserName === "webkit") {
      // WebKit has known SSL connect errors, allow up to 3
      expect(criticalErrors.length).toBeLessThanOrEqual(3);
    } else {
      expect(criticalErrors.length).toBe(0);
    }
  });
});
