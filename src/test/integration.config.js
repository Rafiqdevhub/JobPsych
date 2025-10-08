/// <reference types="vitest" />
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
      "@components": path.resolve(__dirname, "../src/components"),
      "@pages": path.resolve(__dirname, "../src/pages"),
      "@utils": path.resolve(__dirname, "../src/utils"),
      "@data": path.resolve(__dirname, "../src/data"),
      "@hooks": path.resolve(__dirname, "../src/hooks"),
      "@test": path.resolve(__dirname, "../src/test"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/integration/setup.js"],
    include: [
      "**/*.integration.test.{js,jsx,ts,tsx}",
      "**/integration/**/*.test.{js,jsx,ts,tsx}",
    ],
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/*.unit.test.{js,jsx,ts,tsx}",
      "**/*.accessibility.test.{js,jsx,ts,tsx}",
      "**/*.visual.test.{js,jsx,ts,tsx}",
    ],
    css: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/**/*.{js,jsx,ts,tsx}"],
      exclude: [
        "src/test/**",
        "**/*.d.ts",
        "**/*.config.js",
        "**/*.test.{js,jsx,ts,tsx}",
        "**/*.spec.{js,jsx,ts,tsx}",
      ],
      thresholds: {
        global: {
          branches: 70,
          functions: 70,
          lines: 70,
          statements: 70,
        },
      },
      reportsDirectory: "./coverage/integration",
    },
    testTimeout: 15000, // Longer timeout for integration tests
    hookTimeout: 10000,
  },
});
