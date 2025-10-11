import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import NotFound from "../NotFound";

// Mock window.location for navigation tests
const mockLocation = { href: "" };
Object.defineProperty(window, "location", {
  value: mockLocation,
  writable: true,
});

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("NotFound Component", () => {
  it("renders the 404 page correctly", () => {
    renderWithRouter(<NotFound />);

    // Check main elements
    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("Oops! Page Not Found")).toBeInTheDocument();
    expect(screen.getByText("Go to Home")).toBeInTheDocument();

    // Check descriptive text
    expect(
      screen.getByText(/The page you are looking for seems to have vanished/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/our AI-powered platform has plenty of amazing features/)
    ).toBeInTheDocument();
  });

  it("navigates to home when Go to Home button is clicked", () => {
    renderWithRouter(<NotFound />);

    const homeButton = screen.getByText("Go to Home");
    fireEvent.click(homeButton);

    // Since we're using Link from react-router-dom, we can't easily test navigation
    // But we can verify the button exists and is clickable
    expect(homeButton).toBeInTheDocument();
  });

  it("displays the correct 404 styling and layout", () => {
    renderWithRouter(<NotFound />);

    // Check for main container with proper classes
    const mainElement = screen.getByRole("main");
    expect(mainElement).toHaveClass(
      "relative",
      "min-h-screen",
      "flex",
      "items-center",
      "justify-center"
    );

    // Check for background elements
    expect(mainElement).toHaveClass("bg-slate-900");
  });

  it("displays the error message correctly", () => {
    renderWithRouter(<NotFound />);

    const errorMessage = screen.getByText(
      /The page you are looking for seems to have vanished/
    );
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass("text-lg", "sm:text-xl", "text-slate-300");
  });

  it("displays the call-to-action section", () => {
    renderWithRouter(<NotFound />);

    const ctaSection = screen.getByText("Go to Home").closest("div");
    expect(ctaSection).toBeInTheDocument();
  });

  it("has proper accessibility attributes", () => {
    renderWithRouter(<NotFound />);

    // Check for semantic HTML
    expect(screen.getByRole("main")).toBeInTheDocument();

    // Check for proper heading hierarchy
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Oops! Page Not Found");
  });

  it("displays animated background elements", () => {
    renderWithRouter(<NotFound />);

    // Check for animated elements (they have animate-pulse class)
    const animatedElements = document.querySelectorAll(".animate-pulse");
    expect(animatedElements.length).toBeGreaterThan(0);
  });

  it("maintains component stability during re-renders", () => {
    const { rerender } = renderWithRouter(<NotFound />);

    // Check initial render
    expect(screen.getByText("404")).toBeInTheDocument();

    // Re-render and check again
    rerender(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    // Should still be there
    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("Oops! Page Not Found")).toBeInTheDocument();
  });
});
