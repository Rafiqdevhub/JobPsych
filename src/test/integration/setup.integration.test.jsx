import React from "react";
import { render, screen } from "../integration/test-utils";
import { IntegrationUtils } from "../integration/test-utils";
import { expect, test, describe } from "vitest";

describe("Integration Test Setup", () => {
  test("integration test environment is properly configured", async () => {
    // Test basic rendering
    render(<div data-testid="test-element">Integration Test</div>);

    expect(screen.getByTestId("test-element")).toBeInTheDocument();
    expect(screen.getByText("Integration Test")).toBeInTheDocument();
  });

  test("integration utilities are available", () => {
    expect(IntegrationUtils).toBeDefined();
    expect(IntegrationUtils.createMockUser).toBeDefined();
    expect(IntegrationUtils.clearMockUser).toBeDefined();
  });

  test("mock data fixtures are available", () => {
    // This will be imported in actual tests
    expect(true).toBe(true); // Placeholder test
  });

  test("MSW integration server is configured", async () => {
    // Test that we can make a request that should be intercepted
    const response = await fetch("/api/health");
    const data = await response.json();

    expect(data.success).toBe(true);
    expect(data.data.status).toBe("OK");
    expect(data.data.environment).toBe("integration-test");
  });
});
