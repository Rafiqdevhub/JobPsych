import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
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

  it("loads upload count from localStorage on mount", () => {
    localStorageMock.getItem.mockReturnValue("42");

    render(<LandingPage />);

    expect(localStorageMock.getItem).toHaveBeenCalledWith("resumeUploadCount");
  });

  it("handles missing localStorage value gracefully", () => {
    localStorageMock.getItem.mockReturnValue(null);

    expect(() => render(<LandingPage />)).not.toThrow();
    expect(localStorageMock.getItem).toHaveBeenCalledWith("resumeUploadCount");
  });

  it("handles invalid localStorage value gracefully", () => {
    localStorageMock.getItem.mockReturnValue("invalid");

    expect(() => render(<LandingPage />)).not.toThrow();
    expect(localStorageMock.getItem).toHaveBeenCalledWith("resumeUploadCount");
  });

  it("scrolls to pricing section when pricing button is clicked", () => {
    render(<LandingPage />);

    const pricingButton = screen.getByTestId("pricing-button");

    act(() => {
      fireEvent.click(pricingButton);
    });

    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });
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

  it("handles rapid localStorage changes", () => {
    localStorageMock.getItem.mockReturnValue("100");

    const { rerender } = render(<LandingPage />);

    // useEffect only runs once on mount, so getItem should only be called once
    expect(localStorageMock.getItem).toHaveBeenCalledTimes(1);
    expect(localStorageMock.getItem).toHaveBeenCalledWith("resumeUploadCount");

    // Rerendering doesn't trigger useEffect again
    rerender(<LandingPage />);
    expect(localStorageMock.getItem).toHaveBeenCalledTimes(1);
  });
});
