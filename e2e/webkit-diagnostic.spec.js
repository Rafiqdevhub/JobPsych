// @ts-check
import { test, expect } from "@playwright/test";

test.describe("WebKit Diagnostic", () => {
  test("should diagnose WebKit issues", async ({ page, browserName }) => {
    // Capture console messages
    /** @type {string[]} */
    const consoleErrors = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Check basic page structure
    const title = await page.title();

    // Check body CSS properties
    const bodyCSS = await page.locator("body").evaluate((el) => {
      const style = window.getComputedStyle(el);
      return {
        display: style.display,
        visibility: style.visibility,
        opacity: style.opacity,
        position: style.position,
        zIndex: style.zIndex,
        width: style.width,
        height: style.height,
      };
    });

    // Check html CSS properties
    const htmlCSS = await page.locator("html").evaluate((el) => {
      const style = window.getComputedStyle(el);
      return {
        display: style.display,
        visibility: style.visibility,
        opacity: style.opacity,
      };
    });

    // Check if React root exists and its CSS
    const reactRoot = page.locator("#root");
    const rootExists = (await reactRoot.count()) > 0;
    let rootCSS = null;
    let rootHtml = "";

    if (rootExists) {
      rootHtml = await reactRoot.innerHTML();
      rootCSS = await reactRoot.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return {
          display: style.display,
          visibility: style.visibility,
          opacity: style.opacity,
          position: style.position,
        };
      });
    }

    // Check JavaScript execution
    const jsWorking = await page.evaluate(() => {
      return {
        readyState: document.readyState,
        scriptsLoaded: Array.from(document.scripts).length,
        hasReact: typeof window.React !== "undefined",
        hasRootElement: !!document.getElementById("root"),
        rootHasContent:
          (document.getElementById("root")?.innerHTML.length || 0) > 0,
      };
    });

    // Try to manually trigger React rendering
    await page.evaluate(() => {
      // Check if React is available on window
      const hasReact = typeof window.React !== "undefined";

      // Check if the root element exists
      const root = document.getElementById("root");
      const hasRoot = !!root;
      const rootContent = root?.innerHTML || "";

      return { hasReact, hasRoot, rootContentLength: rootContent.length };
    });

    // Wait a bit more for React to load
    await page.waitForTimeout(3000);

    let rootHtmlAfterWait = "";
    if (rootExists) {
      rootHtmlAfterWait = await reactRoot.innerHTML();
    }

    // Log summary for debugging
    console.warn(`[${browserName}] Title: ${title}`);
    console.warn(`[${browserName}] Body CSS: ${JSON.stringify(bodyCSS)}`);
    console.warn(`[${browserName}] HTML CSS: ${JSON.stringify(htmlCSS)}`);
    console.warn(
      `[${browserName}] Root: exists=${rootExists}, css=${JSON.stringify(
        rootCSS
      )}, htmlLength=${rootHtml.length}->${rootHtmlAfterWait.length}`
    );
    console.warn(`[${browserName}] JS: ${JSON.stringify(jsWorking)}`);
    console.warn(
      `[${browserName}] Console errors (${
        consoleErrors.length
      }): ${consoleErrors.slice(0, 3).join("; ")}`
    );

    // Basic assertions
    expect(title).toBeTruthy();

    // WebKit-specific expectations
    if (browserName === "webkit") {
      // In WebKit, we expect the issue but want to understand why
      expect(consoleErrors.length).toBeGreaterThan(0); // Expect errors in WebKit
    } else {
      // Other browsers should work fine
      expect(rootHtml.length).toBeGreaterThan(0);
    }
  });
});
