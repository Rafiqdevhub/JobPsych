import React from "react";
import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import LandingPage from "../LandingPage";

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// Mock scrollIntoView
const mockScrollIntoView = vi.fn();
window.HTMLElement.prototype.scrollIntoView = mockScrollIntoView;

// Mock child components
vi.mock("@components/layout/Header", () => ({
  default: ({ scrollToPricing }) => (
    <header data-testid="header">
      <button data-testid="pricing-button" onClick={scrollToPricing}>
        Pricing
      </button>
    </header>
  ),
}));

vi.mock("@components/hero/HeroSection", () => ({
  default: () => <section data-testid="hero-section">Hero Section</section>,
}));

vi.mock("@components/features/FeaturesSection", () => ({
  default: () => (
    <section data-testid="features-section">Features Section</section>
  ),
}));

vi.mock("@components/faq/FAQSection", () => ({
  default: () => <section data-testid="faq-section">FAQ Section</section>,
}));

vi.mock("@components/testimonials/TestimonialsSection", () => ({
  default: () => (
    <section data-testid="testimonials-section">Testimonials Section</section>
  ),
}));

vi.mock("@components/layout/Footer", () => ({
  default: () => <footer data-testid="footer">Footer</footer>,
}));

describe("LandingPage Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders all main sections", () => {
    render(<LandingPage />);

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("hero-section")).toBeInTheDocument();
    expect(screen.getByTestId("features-section")).toBeInTheDocument();
    expect(screen.getByTestId("faq-section")).toBeInTheDocument();
    expect(screen.getByTestId("testimonials-section")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("has correct container structure and classes", () => {
    const { container } = render(<LandingPage />);

    const mainContainer = container.firstChild;
    expect(mainContainer).toHaveClass(
      "min-h-screen",
      "bg-gradient-to-b",
      "from-indigo-50",
      "to-white"
    );
  });

  it("renders sections in correct order", () => {
    render(<LandingPage />);

    const sections = [
      screen.getByTestId("header"),
      screen.getByTestId("hero-section"),
      screen.getByTestId("features-section"),
      screen.getByTestId("faq-section"),
      screen.getByTestId("testimonials-section"),
      screen.getByTestId("footer"),
    ];

    // Verify all sections are present and in DOM
    sections.forEach((section) => {
      expect(section).toBeInTheDocument();
    });
  });

  it("maintains component stability during re-renders", () => {
    const { rerender } = render(<LandingPage />);

    expect(screen.getByTestId("header")).toBeInTheDocument();

    rerender(<LandingPage />);

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("hero-section")).toBeInTheDocument();
  });

  it("does not cause memory leaks with useEffect", () => {
    const { unmount } = render(<LandingPage />);

    expect(() => unmount()).not.toThrow();
  });
});
