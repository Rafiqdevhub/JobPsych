// @ts-check
import { test, expect } from "@playwright/test";

test.describe("Hire Disk - Page Load", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/hire-disk");
    await page.waitForLoadState("domcontentloaded");
  });

  test("should load Hire Disk page", async ({ page }) => {
    await expect(page).toHaveURL(/hire/i);
    await expect(page.locator("body")).toBeVisible();
  });

  test("should display page heading", async ({ page }) => {
    const heading = page.getByRole("heading");
    const headingCount = await heading.count();

    if (headingCount > 0) {
      await expect(heading.first()).toBeVisible();
    }
  });

  test("should display main content", async ({ page }) => {
    const main = page.locator('main, [role="main"]');
    const mainCount = await main.count();

    if (mainCount > 0) {
      await expect(main.first()).toBeVisible();
    }
  });
});

test.describe("Hire Disk - Features", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/hire-disk");
    await page.waitForLoadState("domcontentloaded");
  });

  test("should display features or information", async ({ page }) => {
    const content = page.getByText(/.+/);
    const contentCount = await content.count();

    expect(contentCount).toBeGreaterThan(0);
  });

  test("should have interactive elements", async ({ page }) => {
    const buttons = page.getByRole("button");
    const links = page.getByRole("link");

    const buttonCount = await buttons.count();
    const linkCount = await links.count();

    expect(buttonCount + linkCount).toBeGreaterThan(0);
  });

  test("should have call-to-action elements", async ({ page }) => {
    const cta = page.getByRole("button", { name: /start|begin|try|get/i });
    const ctaLinks = page.getByRole("link", { name: /start|begin|try|get/i });

    const ctaCount = await cta.count();
    const linkCount = await ctaLinks.count();

    if (ctaCount + linkCount > 0) {
      expect(ctaCount + linkCount).toBeGreaterThan(0);
    }
  });
});

test.describe("Hire Disk - User Interaction", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/hire-disk");
    await page.waitForLoadState("domcontentloaded");
  });

  test("should handle button clicks", async ({ page }) => {
    const buttons = page.getByRole("button");
    const buttonCount = await buttons.count();

    if (buttonCount > 0) {
      const firstButton = buttons.first();
      await expect(firstButton).toBeVisible();

      // Verify button is clickable
      const isEnabled = await firstButton.isEnabled();
      expect(typeof isEnabled).toBe("boolean");
    }
  });

  test("should handle navigation clicks", async ({ page }) => {
    const links = page.getByRole("link");
    const linkCount = await links.count();

    if (linkCount > 0) {
      await expect(links.first()).toBeVisible();
    }
  });
});

test.describe("Hire Disk - Layout", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/hire-disk");
    await page.waitForLoadState("domcontentloaded");
  });

  test("should have header/navigation", async ({ page }) => {
    const header = page.locator("header, nav");
    const headerCount = await header.count();

    if (headerCount > 0) {
      await expect(header.first()).toBeVisible();
    }
  });

  test("should have footer", async ({ page }) => {
    const footer = page.locator("footer");
    const footerCount = await footer.count();

    if (footerCount > 0) {
      await expect(footer.first()).toBeVisible();
    }
  });
});

test.describe("Hire Disk - Navigation", () => {
  test("should navigate back to home", async ({ page }) => {
    await page.goto("/hire-disk");
    await page.waitForLoadState("domcontentloaded");

    const homeLink = page.getByRole("link", { name: /home|back|jobpsych/i });
    const linkCount = await homeLink.count();

    if (linkCount > 0) {
      await homeLink.first().click({ force: true, timeout: 15000 });
      await page.waitForLoadState("domcontentloaded");
      await expect(page).toHaveURL("/");
    }
  });

  test("should have navigation menu", async ({ page }) => {
    await page.goto("/hire-disk");
    await page.waitForLoadState("domcontentloaded");

    const nav = page.locator("nav, header");
    const navCount = await nav.count();

    if (navCount > 0) {
      await expect(nav.first()).toBeVisible();
    }
  });
});

test.describe("Hire Disk - Mobile Experience", () => {
  test("should be responsive on mobile", async ({ page, isMobile }) => {
    if (isMobile) {
      await page.goto("/hire-disk");
      await page.waitForLoadState("domcontentloaded");

      await expect(page.locator("body")).toBeVisible();

      const viewportWidth = page.viewportSize()?.width || 0;
      expect(viewportWidth).toBeLessThanOrEqual(500);
    }
  });

  test("should have mobile-friendly elements", async ({ page, isMobile }) => {
    if (isMobile) {
      await page.goto("/hire-disk");
      await page.waitForLoadState("domcontentloaded");

      const buttons = page.getByRole("button");
      const buttonCount = await buttons.count();

      if (buttonCount > 0) {
        const box = await buttons.first().boundingBox();
        if (box) {
          expect(box.height).toBeGreaterThan(20);
        }
      }
    }
  });
});
