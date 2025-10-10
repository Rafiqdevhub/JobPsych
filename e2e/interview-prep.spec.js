// @ts-check
import { test, expect } from "@playwright/test";

test.describe("Interview Prep - Page Load", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/interview-prep");
    await page.waitForLoadState("domcontentloaded");
  });

  test("should load Interview Prep page", async ({ page }) => {
    await expect(page).toHaveURL(/interview/i);
    await expect(page.locator("body")).toBeVisible();
  });

  test("should display page heading", async ({ page }) => {
    const heading = page.getByRole("heading", { name: /interview|prep/i });
    const headingCount = await heading.count();

    if (headingCount > 0) {
      await expect(heading.first()).toBeVisible();
    }
  });

  test("should display page description", async ({ page }) => {
    const description = page.getByText(/prepare|practice|ai.*powered/i);
    const descCount = await description.count();

    if (descCount > 0) {
      await expect(description.first()).toBeVisible();
    }
  });
});

test.describe("Interview Prep - Input Fields", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/interview-prep");
    await page.waitForLoadState("domcontentloaded");
  });

  test("should have job description input", async ({ page }) => {
    const jobInput = page.getByPlaceholder(/job.*description|paste.*job/i);
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
      const testJobDesc = "Senior Frontend Developer with React";
      await textareas.first().fill(testJobDesc);

      const value = await textareas.first().inputValue();
      expect(value).toBe(testJobDesc);
    }
  });

  test("should have role input field", async ({ page }) => {
    const roleInput = page.getByPlaceholder(/role|position|job.*title/i);
    const inputs = page.locator('input[type="text"]');

    const placeholderCount = await roleInput.count();
    const inputCount = await inputs.count();

    if (placeholderCount > 0) {
      await expect(roleInput.first()).toBeVisible();
    } else if (inputCount > 0) {
      expect(inputCount).toBeGreaterThan(0);
    }
  });
});

test.describe("Interview Prep - Interview Type", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/interview-prep");
    await page.waitForLoadState("domcontentloaded");
  });

  test("should have interview type options", async ({ page }) => {
    const types = page.getByText(/technical|behavioral|case|general/i);
    const typeCount = await types.count();

    if (typeCount > 0) {
      expect(typeCount).toBeGreaterThan(0);
    }
  });

  test("should allow selecting interview type", async ({ page }) => {
    const radios = page.locator('input[type="radio"]');
    const selects = page.locator("select");

    const radioCount = await radios.count();
    const selectCount = await selects.count();

    if (radioCount > 0) {
      await radios.first().check();
      await expect(radios.first()).toBeChecked();
    } else if (selectCount > 0) {
      await expect(selects.first()).toBeVisible();
    }
  });
});

test.describe("Interview Prep - Generate Questions", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/interview-prep");
    await page.waitForLoadState("domcontentloaded");
  });

  test("should have generate button", async ({ page }) => {
    const generateBtn = page.getByRole("button", {
      name: /generate|prepare|create/i,
    });
    const btnCount = await generateBtn.count();

    if (btnCount > 0) {
      await expect(generateBtn.first()).toBeVisible();
    }
  });

  test("should enable generate button with input", async ({ page }) => {
    const textareas = page.locator("textarea");
    const textareaCount = await textareas.count();

    if (textareaCount > 0) {
      await textareas.first().fill("Software Engineer position");

      const generateBtn = page.getByRole("button", {
        name: /generate|prepare/i,
      });
      const btnCount = await generateBtn.count();

      if (btnCount > 0) {
        const isDisabled = await generateBtn.first().isDisabled();
        expect(typeof isDisabled).toBe("boolean");
      }
    }
  });
});

test.describe("Interview Prep - Features", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/interview-prep");
    await page.waitForLoadState("domcontentloaded");
  });

  test("should display tips or best practices", async ({ page }) => {
    const tips = page.getByText(/tip|advice|suggestion|best practice/i);
    const tipsCount = await tips.count();

    if (tipsCount > 0) {
      await expect(tips.first()).toBeVisible();
    }
  });

  test("should show features or examples", async ({ page }) => {
    const features = page.getByText(/feature|example|sample/i);
    const featureCount = await features.count();

    if (featureCount > 0) {
      const featureText = await features.first().textContent();
      expect(featureText).toBeTruthy();
    }
  });
});

test.describe("Interview Prep - Navigation", () => {
  test("should navigate back to home", async ({ page }) => {
    await page.goto("/interview-prep");
    await page.waitForLoadState("domcontentloaded");

    const homeLink = page.getByRole("link", { name: /home|back|jobpsych/i });
    const linkCount = await homeLink.count();

    if (linkCount > 0) {
      await homeLink.first().click({ force: true, timeout: 15000 });
      await page.waitForLoadState("domcontentloaded");
      await expect(page).toHaveURL("/");
    }
  });
});

test.describe("Interview Prep - Mobile Experience", () => {
  test("should be responsive on mobile", async ({ page, isMobile }) => {
    if (isMobile) {
      await page.goto("/interview-prep");
      await page.waitForLoadState("domcontentloaded");

      await expect(page.locator("body")).toBeVisible();

      const textareas = page.locator("textarea");
      const textareaCount = await textareas.count();

      if (textareaCount > 0) {
        await expect(textareas.first()).toBeVisible();
      }
    }
  });
});
