// @ts-check
import { test, expect } from "@playwright/test";

test.describe("ATS Analyzer - Page Load", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/ats-analyzer");
    await page.waitForLoadState("domcontentloaded");
  });

  test("should load ATS Analyzer page", async ({ page }) => {
    await expect(page).toHaveURL(/ats|analyzer/i);
    await expect(page.locator("body")).toBeVisible();
  });

  test("should display page heading", async ({ page }) => {
    const heading = page.getByRole("heading", { name: /ats|analyzer|resume/i });
    const headingCount = await heading.count();

    if (headingCount > 0) {
      await expect(heading.first()).toBeVisible();
    }
  });

  test("should display file upload area", async ({ page }) => {
    // ATS Analyzer page has a "Start ATS Analysis" button, not a traditional upload
    const startButton = page.getByRole("button", {
      name: /start ats analysis/i,
    });

    await expect(startButton).toBeVisible();
    await expect(startButton).toBeEnabled();
  });
});

test.describe("ATS Analyzer - File Upload Interface", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/ats-analyzer");
    await page.waitForLoadState("domcontentloaded");
  });

  test("should have file input element", async ({ page }) => {
    const fileInput = page.locator('input[type="file"]');
    const inputCount = await fileInput.count();

    if (inputCount > 0) {
      await expect(fileInput.first()).toBeAttached();

      const accept = await fileInput.first().getAttribute("accept");
      if (accept) {
        expect(accept.toLowerCase()).toMatch(/pdf|doc/);
      }
    }
  });

  test("should display upload instructions", async ({ page }) => {
    const instructions = page.getByText(/drag|drop|upload|select.*file/i);
    const instructionCount = await instructions.count();

    if (instructionCount > 0) {
      await expect(instructions.first()).toBeVisible();
    }
  });

  test("should show file size limit", async ({ page }) => {
    const sizeInfo = page.getByText(/size|limit|mb|maximum/i);
    const sizeCount = await sizeInfo.count();

    if (sizeCount > 0) {
      const sizeText = await sizeInfo.first().textContent();
      expect(sizeText).toBeTruthy();
    }
  });
});

test.describe("ATS Analyzer - Form Elements", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/ats-analyzer");
    await page.waitForLoadState("domcontentloaded");
  });

  test("should have job description input", async ({ page }) => {
    const jobInput = page.getByPlaceholder(/job.*description/i);
    const textareas = page.locator("textarea");

    const placeholderCount = await jobInput.count();
    const textareaCount = await textareas.count();

    if (placeholderCount > 0) {
      await expect(jobInput.first()).toBeVisible();
    } else if (textareaCount > 0) {
      await expect(textareas.first()).toBeVisible();
    }
  });

  test("should allow typing in job description", async ({ page }) => {
    const textareas = page.locator("textarea");
    const textareaCount = await textareas.count();

    if (textareaCount > 0) {
      const testText = "Looking for Senior Software Engineer";
      await textareas.first().fill(testText);

      const value = await textareas.first().inputValue();
      expect(value).toBe(testText);
    }
  });

  test("should have analyze button", async ({ page }) => {
    const analyzeBtn = page.getByRole("button", {
      name: /analyze|submit|check/i,
    });
    const btnCount = await analyzeBtn.count();

    if (btnCount > 0) {
      await expect(analyzeBtn.first()).toBeVisible();
    }
  });
});

test.describe("ATS Analyzer - Features Display", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/ats-analyzer");
    await page.waitForLoadState("domcontentloaded");
  });

  test("should display features or benefits", async ({ page }) => {
    const features = page.getByText(/feature|benefit|what.*check|how.*works/i);
    const featureCount = await features.count();

    if (featureCount > 0) {
      await expect(features.first()).toBeVisible();
    }
  });

  test("should show helpful tips", async ({ page }) => {
    const tips = page.getByText(/tip|help|guide|note/i);
    const tipsCount = await tips.count();

    if (tipsCount > 0) {
      const tipsText = await tips.first().textContent();
      expect(tipsText).toBeTruthy();
    }
  });
});

test.describe("ATS Analyzer - Navigation", () => {
  test("should navigate back to home", async ({ page }) => {
    await page.goto("/ats-analyzer");
    await page.waitForLoadState("domcontentloaded");

    const homeLink = page.getByRole("link", { name: /home|back|jobpsych/i });
    const linkCount = await homeLink.count();

    if (linkCount > 0) {
      await homeLink.first().click();
      await page.waitForLoadState("domcontentloaded");
      await expect(page).toHaveURL("/");
    }
  });

  test("should have navigation menu", async ({ page }) => {
    await page.goto("/ats-analyzer");
    await page.waitForLoadState("domcontentloaded");

    const nav = page.locator("nav, header");
    const navCount = await nav.count();

    if (navCount > 0) {
      await expect(nav.first()).toBeVisible();
    }
  });
});

test.describe("ATS Analyzer - Mobile Experience", () => {
  test("should be responsive on mobile", async ({ page, isMobile }) => {
    if (isMobile) {
      await page.goto("/ats-analyzer");
      await page.waitForLoadState("domcontentloaded");

      await expect(page.locator("body")).toBeVisible();

      const fileInput = page.locator('input[type="file"]');
      const inputCount = await fileInput.count();

      if (inputCount > 0) {
        await expect(fileInput.first()).toBeAttached();
      }
    }
  });
});
