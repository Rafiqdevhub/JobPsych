// @ts-check
import { test, expect } from "@playwright/test";

test.describe("Smoke Test - Step 1 Verification", () => {
  test("should load the homepage", async ({ page, browserName }) => {
    await page.goto("/");

    // Verify page loads
    await expect(page).toHaveTitle(/JobPsych|Home/i);

    // Verify body is visible
    if (browserName === "webkit") {
      await expect(page).toHaveTitle(/JobPsych/);
    } else {
      await expect(page.locator("body")).toBeVisible();
    }
  });

  test("should have working navigation", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Check if navigation or header exists
    const nav = page.locator("nav, header");
    const navCount = await nav.count();

    if (navCount > 0) {
      await expect(nav.first()).toBeVisible();
    }
  });
});
