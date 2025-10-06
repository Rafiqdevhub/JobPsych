import React from "react";
import { render, screen, fireEvent } from "@test/test-utils";
import { expect, test, vi } from "vitest";
import NavigationButton from "../buttons/NavigationButton";

test("renders navigation button with correct text", () => {
  render(<NavigationButton to="/test">Test Button</NavigationButton>);

  expect(
    screen.getByRole("link", { name: /navigate to \/test/i })
  ).toBeInTheDocument();
});

test("calls onClick when button is clicked", () => {
  const handleClick = vi.fn();
  render(
    <NavigationButton to="/test" onClick={handleClick}>
      Test Button
    </NavigationButton>
  );

  fireEvent.click(screen.getByRole("link", { name: /navigate to \/test/i }));
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test("navigates to correct route when clicked", () => {
  render(<NavigationButton to="/test-route">Navigate</NavigationButton>);

  const button = screen.getByRole("link", {
    name: /navigate to \/test-route/i,
  });
  expect(button).toBeInTheDocument();

  // The button should have the correct aria-label
  expect(button).toHaveAttribute("aria-label", "Navigate to /test-route");
});
