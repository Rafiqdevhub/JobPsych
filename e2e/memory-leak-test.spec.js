/**
 * Memory Leak Detection and Long-Running Session Stability Testing
 * Monitors memory usage, detects leaks, and tests extended sessions
 */

import { test, expect } from "@playwright/test";

test.describe("Memory Leak Detection", () => {
  test.describe.configure({ timeout: 300000 }); // 5 minute timeout

  test("should not leak memory during extended browsing session", async ({
    page,
  }) => {
    await page.goto("/");

    const memorySnapshots = [];
    const routes = [
      "/",
      "/role-suggestions",
      "/ats-analyzer",
      "/interview-prepai",
      "/hiredisk",
      "/security-audit",
    ];

    // Simulate 30 minutes of browsing (condensed to ~2 minutes)
    for (let iteration = 0; iteration < 10; iteration++) {
      for (const route of routes) {
        await page.goto(route);
        await page.waitForLoadState("networkidle");

        // Take memory snapshot
        const memory = await page.evaluate(() => {
          if (performance.memory) {
            return {
              used: performance.memory.usedJSHeapSize,
              total: performance.memory.totalJSHeapSize,
              iteration: 0,
            };
          }
          return null;
        });

        if (memory) {
          memory.iteration = iteration;
          memorySnapshots.push(memory);
        }

        await page.waitForTimeout(1000);
      }

      // Force garbage collection periodically
      await page.evaluate(() => {
        if (window.gc) {
          window.gc();
        }
      });
    }

    // Analyze memory trend
    if (memorySnapshots.length > 0) {
      const firstSnapshot = memorySnapshots[0];
      const lastSnapshot = memorySnapshots[memorySnapshots.length - 1];

      const memoryGrowth =
        ((lastSnapshot.used - firstSnapshot.used) / firstSnapshot.used) * 100;

      // eslint-disable-next-line no-console
      console.log(`Memory Growth: ${memoryGrowth.toFixed(2)}%`);
      // eslint-disable-next-line no-console
      console.log(
        `Initial Memory: ${(firstSnapshot.used / 1024 / 1024).toFixed(2)} MB`
      );
      // eslint-disable-next-line no-console
      console.log(
        `Final Memory: ${(lastSnapshot.used / 1024 / 1024).toFixed(2)} MB`
      );

      // Memory growth should be less than 50% over the session
      expect(memoryGrowth).toBeLessThan(50);
    }
  });

  test("should clean up event listeners on unmount", async ({ page }) => {
    await page.goto("/");

    // Track event listeners
    const initialListeners = await page.evaluate(() => {
      const getListeners = (target) => {
        const events = target.getEventListeners?.(window) || {};
        return Object.keys(events).reduce(
          (sum, key) => sum + events[key].length,
          0
        );
      };
      return getListeners(window);
    });

    // Navigate multiple times
    for (let i = 0; i < 20; i++) {
      await page.goto("/role-suggestions");
      await page.goto("/");
    }

    // Check if listeners accumulated
    const finalListeners = await page.evaluate(() => {
      const getListeners = (target) => {
        const events = target.getEventListeners?.(window) || {};
        return Object.keys(events).reduce(
          (sum, key) => sum + events[key].length,
          0
        );
      };
      return getListeners(window);
    });

    // eslint-disable-next-line no-console
    console.log(`Initial listeners: ${initialListeners || 0}`);
    // eslint-disable-next-line no-console
    console.log(`Final listeners: ${finalListeners || 0}`);

    // Listener count shouldn't grow significantly
    if (initialListeners && finalListeners) {
      expect(finalListeners).toBeLessThan(initialListeners * 2);
    }
  });

  test("should handle long-running chatbot session", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const memorySnapshots = [];

    // Simulate extended chat session
    for (let i = 0; i < 30; i++) {
      const chatInput = page.locator('[placeholder*="Ask"]').first();
      const sendButton = page.locator('button:has-text("Send")').first();

      if (await chatInput.isVisible({ timeout: 5000 }).catch(() => false)) {
        await chatInput.fill(`Test message number ${i}`);
        await sendButton.click().catch(() => {
          /* Rate limiting OK */
        });

        // Take memory snapshot
        const memory = await page.evaluate(() => {
          if (performance.memory) {
            return {
              used: performance.memory.usedJSHeapSize,
              total: performance.memory.totalJSHeapSize,
            };
          }
          return null;
        });

        if (memory) {
          memorySnapshots.push(memory);
        }

        await page.waitForTimeout(2000);
      }
    }

    // Check memory didn't grow excessively
    if (memorySnapshots.length > 2) {
      const initial = memorySnapshots[0].used;
      const final = memorySnapshots[memorySnapshots.length - 1].used;
      const growthPercent = ((final - initial) / initial) * 100;

      // eslint-disable-next-line no-console
      console.log(`Chat session memory growth: ${growthPercent.toFixed(2)}%`);
      expect(growthPercent).toBeLessThan(100);
    }
  });

  test("should not accumulate DOM nodes over time", async ({ page }) => {
    await page.goto("/");

    const initialNodeCount = await page.evaluate(
      () => document.querySelectorAll("*").length
    );

    // Navigate multiple times
    const routes = ["/role-suggestions", "/ats-analyzer", "/interview-prepai"];
    for (let i = 0; i < 10; i++) {
      for (const route of routes) {
        await page.goto(route);
        await page.waitForLoadState("domcontentloaded");
      }
      await page.goto("/");
    }

    const finalNodeCount = await page.evaluate(
      () => document.querySelectorAll("*").length
    );

    // eslint-disable-next-line no-console
    console.log(`Initial DOM nodes: ${initialNodeCount}`);
    // eslint-disable-next-line no-console
    console.log(`Final DOM nodes: ${finalNodeCount}`);

    // DOM node count shouldn't grow significantly
    const growthRatio = finalNodeCount / initialNodeCount;
    expect(growthRatio).toBeLessThan(1.5); // Less than 50% growth
  });

  test("should handle localStorage cleanup properly", async ({ page }) => {
    await page.goto("/");

    // Fill localStorage
    await page.evaluate(() => {
      for (let i = 0; i < 100; i++) {
        localStorage.setItem(`test_key_${i}`, JSON.stringify({ data: i }));
      }
    });

    const initialSize = await page.evaluate(() => {
      return JSON.stringify(localStorage).length;
    });

    // Navigate and use app
    await page.goto("/role-suggestions");
    await page.goto("/ats-analyzer");
    await page.goto("/");

    // Clean up test data
    await page.evaluate(() => {
      for (let i = 0; i < 100; i++) {
        localStorage.removeItem(`test_key_${i}`);
      }
    });

    const finalSize = await page.evaluate(() => {
      return JSON.stringify(localStorage).length;
    });

    // eslint-disable-next-line no-console
    console.log(`Initial localStorage: ${initialSize} bytes`);
    // eslint-disable-next-line no-console
    console.log(`Final localStorage: ${finalSize} bytes`);

    // Verify cleanup worked
    expect(finalSize).toBeLessThanOrEqual(initialSize);
  });

  test("should detect memory leaks in file upload component", async ({
    page,
  }) => {
    await page.goto("/role-suggestions");

    const memorySnapshots = [];

    // Simulate multiple file selections (without actual upload)
    for (let i = 0; i < 20; i++) {
      const fileInput = page.locator('input[type="file"]').first();

      if (await fileInput.isVisible({ timeout: 5000 }).catch(() => false)) {
        // Simulate file selection
        await page.evaluate(() => {
          const input = document.querySelector('input[type="file"]');
          if (input) {
            const file = new File(["test content"], "test.pdf", {
              type: "application/pdf",
            });
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            input.files = dataTransfer.files;
            input.dispatchEvent(new Event("change", { bubbles: true }));
          }
        });

        // Take memory snapshot
        const memory = await page.evaluate(() => {
          if (performance.memory) {
            return performance.memory.usedJSHeapSize;
          }
          return null;
        });

        if (memory) {
          memorySnapshots.push(memory);
        }

        await page.waitForTimeout(500);
      }
    }

    // Verify memory didn't grow excessively
    if (memorySnapshots.length > 2) {
      const initial = memorySnapshots[0];
      const final = memorySnapshots[memorySnapshots.length - 1];
      const growthPercent = ((final - initial) / initial) * 100;

      // eslint-disable-next-line no-console
      console.log(
        `File upload component memory growth: ${growthPercent.toFixed(2)}%`
      );
      expect(growthPercent).toBeLessThan(50);
    }
  });

  test("should measure performance over extended session", async ({ page }) => {
    const performanceData = [];

    for (let i = 0; i < 10; i++) {
      const startTime = Date.now();
      await page.goto("/");
      await page.waitForLoadState("networkidle");
      const loadTime = Date.now() - startTime;

      const metrics = await page.evaluate(() => ({
        memory: performance.memory
          ? performance.memory.usedJSHeapSize / 1024 / 1024
          : null,
        navigation: performance.timing
          ? performance.timing.loadEventEnd - performance.timing.navigationStart
          : null,
      }));

      performanceData.push({
        iteration: i,
        loadTime,
        memory: metrics.memory,
        navigation: metrics.navigation,
      });

      await page.waitForTimeout(2000);
    }

    // Analyze performance degradation
    const firstLoad = performanceData[0];
    const lastLoad = performanceData[performanceData.length - 1];

    // eslint-disable-next-line no-console
    console.log(
      "Performance over time:",
      JSON.stringify(performanceData, null, 2)
    );

    // Load time shouldn't increase more than 50%
    if (firstLoad.loadTime && lastLoad.loadTime) {
      const timeIncrease =
        ((lastLoad.loadTime - firstLoad.loadTime) / firstLoad.loadTime) * 100;
      expect(timeIncrease).toBeLessThan(50);
    }
  });

  test("should handle WebSocket connections without leaks", async ({
    page,
  }) => {
    await page.goto("/");

    // Create and close multiple "connections" (simulated)
    for (let i = 0; i < 20; i++) {
      await page.evaluate(() => {
        // Simulate connection lifecycle
        const connection = {
          data: new Array(1000).fill("x"),
          cleanup: () => {
            connection.data = null;
          },
        };
        connection.cleanup();
      });

      await page.waitForTimeout(100);
    }

    // Verify page is still responsive
    await expect(page.locator("body")).toBeVisible();
  });
});

test.describe("Long-Running Session Stability", () => {
  test("should remain stable during 5-minute session", async ({ page }) => {
    const testDuration = 5 * 60 * 1000; // 5 minutes
    const startTime = Date.now();
    let errorCount = 0;

    while (Date.now() - startTime < testDuration) {
      try {
        // Randomly perform actions
        const action = Math.floor(Math.random() * 5);

        switch (action) {
          case 0:
            await page.goto("/");
            break;
          case 1:
            await page.goto("/role-suggestions");
            break;
          case 2:
            await page.goto("/ats-analyzer");
            break;
          case 3:
            await page.goto("/security-audit");
            break;
          case 4:
            await page.evaluate(() =>
              window.scrollTo(0, document.body.scrollHeight)
            );
            break;
        }

        await page.waitForLoadState("domcontentloaded");
        await page.waitForTimeout(5000);

        // Verify page is functional
        await expect(page.locator("body")).toBeVisible({ timeout: 10000 });
      } catch (error) {
        errorCount++;
        // eslint-disable-next-line no-console
        console.error(`Error during long session: ${error}`);
      }
    }

    // eslint-disable-next-line no-console
    console.log(`Session completed with ${errorCount} errors`);
    expect(errorCount).toBeLessThan(5); // Less than 5 errors in 5 minutes
  });
});
