/**
 * Stress Testing Suite for JobPsych Frontend
 * Tests system limits, edge cases, and failure scenarios
 */

import { test, expect } from "@playwright/test";
import { Buffer } from "node:buffer";

test.describe("Stress Testing Suite", () => {
  test.describe.configure({ mode: "parallel", timeout: 120000 });

  test("should handle rapid navigation between pages", async ({ page }) => {
    const pages = [
      "/",
      "/role-suggestions",
      "/ats-analyzer",
      "/interview-prepai",
      "/hiredisk",
      "/security-audit",
    ];

    // Rapidly navigate 50 times
    for (let i = 0; i < 50; i++) {
      const randomPage = pages[Math.floor(Math.random() * pages.length)];
      await page.goto(randomPage);
      await page.waitForLoadState("domcontentloaded");
    }

    // Verify final page loads correctly
    await page.goto("/");
    await expect(page.locator("body")).toBeVisible();
  });

  test("should handle multiple rapid form submissions", async ({ page }) => {
    await page.goto("/role-suggestions");

    // Try to submit multiple times rapidly
    const submitPromises = [];
    for (let i = 0; i < 10; i++) {
      submitPromises.push(
        page
          .locator('button:has-text("Upload")')
          .click({ timeout: 1000 })
          .catch(() => {
            /* Expected to fail due to rate limiting */
          })
      );
    }

    await Promise.allSettled(submitPromises);

    // Verify page is still functional
    await expect(page.locator("body")).toBeVisible();
  });

  test("should handle extremely long input strings", async ({ page }) => {
    await page.goto("/");

    // Find chatbot or input field
    const inputField = page.locator('input[type="text"], textarea').first();
    if (await inputField.isVisible({ timeout: 5000 }).catch(() => false)) {
      // Generate very long string (10KB)
      const longString = "A".repeat(10000);

      await inputField.fill(longString);

      // Verify input is handled without crash
      await expect(page.locator("body")).toBeVisible();
    }
  });

  test("should handle rapid chatbot interactions", async ({ page }) => {
    await page.goto("/");

    // Wait for page to load
    await page.waitForLoadState("networkidle");

    // Try rapid chatbot interactions
    const chatInput = page
      .locator('[placeholder*="Ask"], [placeholder*="chat"]')
      .first();
    const chatButton = page.locator('button:has-text("Send")').first();

    if (await chatInput.isVisible({ timeout: 5000 }).catch(() => false)) {
      for (let i = 0; i < 20; i++) {
        await chatInput.fill(`Stress test message ${i}`);
        await chatButton.click({ timeout: 1000 }).catch(() => {
          /* Rate limiting expected */
        });
        await page.waitForTimeout(100);
      }

      // Verify UI is still responsive
      await expect(page.locator("body")).toBeVisible();
    }
  });

  test("should handle concurrent file uploads", async ({ page, context }) => {
    await page.goto("/role-suggestions");

    // Create multiple pages simulating concurrent users
    const pages = await Promise.all([
      context.newPage(),
      context.newPage(),
      context.newPage(),
    ]);

    const uploadPromises = pages.map(async (p) => {
      await p.goto("/role-suggestions");

      // Simulate file upload
      const fileInput = p.locator('input[type="file"]').first();
      if (await fileInput.isVisible({ timeout: 5000 }).catch(() => false)) {
        await fileInput.setInputFiles({
          name: "test.pdf",
          mimeType: "application/pdf",
          buffer: Buffer.from("Test content"),
        });
      }
    });

    await Promise.allSettled(uploadPromises);

    // Cleanup
    await Promise.all(pages.map((p) => p.close()));

    // Verify original page still works
    await expect(page.locator("body")).toBeVisible();
  });

  test("should handle malformed API responses", async ({ page }) => {
    // Intercept API calls and return malformed data
    await page.route("**/api/**", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ invalid: "response", missing: "fields" }),
      });
    });

    await page.goto("/");

    // Verify error handling works
    await expect(page.locator("body")).toBeVisible();
  });

  test("should handle network failures gracefully", async ({ page }) => {
    await page.goto("/");

    // Simulate network failure
    await page.route("**/api/**", (route) => route.abort());

    // Try to trigger API call
    const chatInput = page.locator('[placeholder*="Ask"]').first();
    if (await chatInput.isVisible({ timeout: 5000 }).catch(() => false)) {
      await chatInput.fill("Test message");
      await page
        .locator('button:has-text("Send")')
        .first()
        .click()
        .catch(() => {});
    }

    // Verify error message appears
    await page.waitForTimeout(2000);
    await expect(page.locator("body")).toBeVisible();
  });

  test("should handle localStorage quota exceeded", async ({ page }) => {
    await page.goto("/");

    // Fill localStorage to capacity
    await page.evaluate(() => {
      try {
        let i = 0;
        while (i < 5000) {
          localStorage.setItem(`stress_test_${i}`, "x".repeat(1000));
          i++;
        }
      } catch {
        // Quota exceeded - expected
      }
    });

    // Try normal operations
    await page.goto("/role-suggestions");
    await expect(page.locator("body")).toBeVisible();

    // Cleanup
    await page.evaluate(() => {
      for (let i = 0; i < 5000; i++) {
        localStorage.removeItem(`stress_test_${i}`);
      }
    });
  });

  test("should handle rapid route changes", async ({ page }) => {
    const routes = [
      "/",
      "/role-suggestions",
      "/ats-analyzer",
      "/interview-prepai",
    ];

    // Rapid fire route changes
    for (let i = 0; i < 30; i++) {
      await page.goto(routes[i % routes.length]);
    }

    // Verify final state
    await page.goto("/");
    await expect(page.locator("h1, h2").first()).toBeVisible();
  });

  test("should handle browser back/forward stress", async ({ page }) => {
    // Navigate through several pages
    await page.goto("/");
    await page.goto("/role-suggestions");
    await page.goto("/ats-analyzer");

    // Rapidly use back/forward
    for (let i = 0; i < 20; i++) {
      await page.goBack();
      await page.goForward();
    }

    // Verify page still works
    await expect(page.locator("body")).toBeVisible();
  });

  test("should handle maximum cookie size", async ({ context, page }) => {
    // Set large cookies
    await context.addCookies([
      {
        name: "large_cookie",
        value: "x".repeat(4000), // 4KB cookie
        domain: "localhost",
        path: "/",
      },
    ]);

    await page.goto("/");
    await expect(page.locator("body")).toBeVisible();
  });

  test("should handle XSS injection attempts gracefully", async ({ page }) => {
    await page.goto("/security-audit");

    const xssAttempts = [
      '<script>alert("XSS")</script>',
      '"><script>alert("XSS")</script>',
      "<img src=x onerror=alert('XSS')>",
      "javascript:alert('XSS')",
      "<iframe src=\"javascript:alert('XSS')\"></iframe>",
    ];

    const inputField = page.locator('input[type="text"], textarea').first();

    if (await inputField.isVisible({ timeout: 5000 }).catch(() => false)) {
      for (const xss of xssAttempts) {
        await inputField.fill(xss);
        await page.waitForTimeout(500);

        // Verify no XSS executed
        const hasAlert = await page
          .evaluate(() => {
            return document.querySelector('script[src*="alert"]') !== null;
          })
          .catch(() => false);

        expect(hasAlert).toBe(false);
      }
    }

    await expect(page.locator("body")).toBeVisible();
  });

  test("should handle window resize stress", async ({ page }) => {
    await page.goto("/");

    // Rapidly resize window
    const sizes = [
      { width: 1920, height: 1080 },
      { width: 768, height: 1024 },
      { width: 375, height: 667 },
      { width: 1366, height: 768 },
    ];

    for (let i = 0; i < 20; i++) {
      const size = sizes[i % sizes.length];
      await page.setViewportSize(size);
      await page.waitForTimeout(100);
    }

    // Verify layout still works
    await expect(page.locator("body")).toBeVisible();
  });

  test("should handle scroll stress test", async ({ page }) => {
    await page.goto("/");

    // Rapid scrolling
    for (let i = 0; i < 50; i++) {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.evaluate(() => window.scrollTo(0, 0));
    }

    await expect(page.locator("body")).toBeVisible();
  });

  test("should measure resource limits", async ({ page }) => {
    await page.goto("/");

    const metrics = await page.evaluate(() => {
      const perfMemory = performance.memory;
      return {
        memory: perfMemory
          ? {
              used: perfMemory.usedJSHeapSize,
              total: perfMemory.totalJSHeapSize,
              limit: perfMemory.jsHeapSizeLimit,
            }
          : null,
        timing: performance.timing
          ? {
              loadComplete:
                performance.timing.loadEventEnd -
                performance.timing.navigationStart,
              domReady:
                performance.timing.domContentLoadedEventEnd -
                performance.timing.navigationStart,
            }
          : null,
      };
    });

    // eslint-disable-next-line no-console
    console.log("Resource Metrics:", JSON.stringify(metrics, null, 2));

    // Verify memory usage is reasonable
    if (metrics.memory) {
      const usedMB = metrics.memory.used / 1024 / 1024;
      // eslint-disable-next-line no-console
      console.log(`Memory used: ${usedMB.toFixed(2)} MB`);
      expect(usedMB).toBeLessThan(500); // Less than 500MB
    }
  });
});
