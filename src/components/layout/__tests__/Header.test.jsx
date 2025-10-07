import React from "react";
import { render, screen, fireEvent } from "@test/test-utils";
import { expect, test, vi, describe, beforeEach } from "vitest";
import Header from "../Header";

// Mock the data imports
vi.mock("@data/roleSuggetionsFeatures", () => ({
  roleSuggestionsFeatures: [
    { icon: "🎯", title: "Feature 1", description: "Description 1" },
    { icon: "📊", title: "Feature 2", description: "Description 2" },
    { icon: "💼", title: "Feature 3", description: "Description 3" },
    { icon: "🚀", title: "Feature 4", description: "Description 4" },
  ],
  interviewPrepFeatures: [
    { icon: "🎤", title: "Interview 1", description: "Interview desc 1" },
    { icon: "📝", title: "Interview 2", description: "Interview desc 2" },
    { icon: "💡", title: "Interview 3", description: "Interview desc 3" },
    { icon: "🎯", title: "Interview 4", description: "Interview desc 4" },
  ],
}));

vi.mock("@data/hireSuggestions", () => ({
  hrSuggestions: [
    { icon: "👥", title: "HR 1", description: "HR desc 1" },
    { icon: "📈", title: "HR 2", description: "HR desc 2" },
    { icon: "🎯", title: "HR 3", description: "HR desc 3" },
    { icon: "💼", title: "HR 4", description: "HR desc 4" },
  ],
}));

vi.mock("@data/atsAnalyzerFeatures", () => ({
  atsAnalyzerFeatures: [
    { icon: "🔍", title: "ATS 1", description: "ATS desc 1" },
    { icon: "📊", title: "ATS 2", description: "ATS desc 2" },
    { icon: "✅", title: "ATS 3", description: "ATS desc 3" },
    { icon: "📈", title: "ATS 4", description: "ATS desc 4" },
  ],
}));

describe("Header Component", () => {
  beforeEach(() => {
    // Reset scroll position
    Object.defineProperty(window, "scrollY", { value: 0, writable: true });
  });

  test("renders header with logo and navigation", () => {
    render(<Header />);

    expect(screen.getByAltText("JobPsych Logo")).toBeInTheDocument();
    expect(screen.getAllByText("JobPsych")).toHaveLength(2); // Desktop and mobile versions
  });

  test("renders features button on desktop", () => {
    render(<Header />);

    const featuresButton = screen.getByRole("button", { name: /features/i });
    expect(featuresButton).toBeInTheDocument();
  });

  test("renders mobile hamburger menu on small screens", () => {
    // Mock window.innerWidth to simulate mobile
    Object.defineProperty(window, "innerWidth", {
      value: 500,
      writable: true,
    });

    render(<Header />);

    const hamburgerButton = screen.getByRole("button", {
      name: /open mobile menu/i,
    });
    expect(hamburgerButton).toBeInTheDocument();
  });

  test("shows scroll to top button when scrolled", () => {
    render(<Header />);

    // Initially not visible
    expect(
      screen.queryByRole("button", { name: /scroll to top/i })
    ).not.toBeInTheDocument();

    // Simulate scroll
    Object.defineProperty(window, "scrollY", { value: 50, writable: true });
    fireEvent.scroll(window);

    expect(
      screen.getByRole("button", { name: /scroll to top/i })
    ).toBeInTheDocument();
  });

  test("scroll to top button calls window.scrollTo", () => {
    const scrollToSpy = vi.fn();
    window.scrollTo = scrollToSpy;

    render(<Header />);

    // Simulate scroll to show button
    Object.defineProperty(window, "scrollY", { value: 50, writable: true });
    fireEvent.scroll(window);

    const scrollButton = screen.getByRole("button", { name: /scroll to top/i });
    fireEvent.click(scrollButton);

    expect(scrollToSpy).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });

  test("opens features modal when features button is clicked", () => {
    render(<Header />);

    const featuresButton = screen.getByRole("button", { name: /features/i });
    fireEvent.click(featuresButton);

    expect(screen.getByText("JobPsych Tools & Features")).toBeInTheDocument();
    expect(screen.getByText("Role Suggestions")).toBeInTheDocument();
    expect(screen.getByText("InterviewPrep AI")).toBeInTheDocument();
    expect(screen.getByText("ATS Analyzer")).toBeInTheDocument();
    expect(screen.getByText("HireDisk")).toBeInTheDocument();
  });

  test("closes features modal when close button is clicked", () => {
    render(<Header />);

    // Open modal
    const featuresButton = screen.getByRole("button", { name: /features/i });
    fireEvent.click(featuresButton);

    expect(screen.getByText("JobPsych Tools & Features")).toBeInTheDocument();

    // Close modal
    const closeButton = screen.getByRole("button", {
      name: /close features modal/i,
    });
    fireEvent.click(closeButton);

    expect(
      screen.queryByText("JobPsych Tools & Features")
    ).not.toBeInTheDocument();
  });

  test("opens mobile dropdown when hamburger is clicked", () => {
    render(<Header />);

    const hamburgerButton = screen.getByRole("button", {
      name: /open mobile menu/i,
    });
    fireEvent.click(hamburgerButton);

    expect(screen.getByText("Mobile Menu")).toBeInTheDocument();
    // Check for the mobile features button specifically in the dropdown
    const mobileFeaturesButton = screen
      .getAllByText("Features")
      .find(
        (el) => el.closest("nav") && el.closest('[id="mobile-nav-dropdown"]')
      )
      .closest("button");
    expect(mobileFeaturesButton).toBeInTheDocument();
  });

  test("closes mobile dropdown when clicking outside", () => {
    render(<Header />);

    // Open dropdown
    const hamburgerButton = screen.getByRole("button", {
      name: /open mobile menu/i,
    });
    fireEvent.click(hamburgerButton);

    expect(screen.getByText("Mobile Menu")).toBeInTheDocument();

    // Click outside
    fireEvent.mouseDown(document.body);

    expect(screen.queryByText("Mobile Menu")).not.toBeInTheDocument();
  });

  test("mobile features button opens features modal and closes dropdown", () => {
    render(<Header />);

    // Open mobile dropdown
    const hamburgerButton = screen.getByRole("button", {
      name: /open mobile menu/i,
    });
    fireEvent.click(hamburgerButton);

    expect(screen.getByText("Mobile Menu")).toBeInTheDocument();

    // Click mobile features button
    const mobileFeaturesButton = screen.getAllByRole("button", {
      name: /features/i,
    })[1];
    fireEvent.click(mobileFeaturesButton);

    // Dropdown should close, modal should open
    expect(screen.queryByText("Mobile Menu")).not.toBeInTheDocument();
    expect(screen.getByText("JobPsych Tools & Features")).toBeInTheDocument();
  });

  test("displays correct number of features in each category", () => {
    render(<Header />);

    // Open features modal
    const featuresButton = screen.getByRole("button", { name: /features/i });
    fireEvent.click(featuresButton);

    // Check that we have 4 features per category (limited by slice(0, 4))
    const roleFeatures = screen.getAllByText(/Feature \d/);
    const interviewFeatures = screen.getAllByText(/Interview \d/);
    const atsFeatures = screen.getAllByText(/ATS \d/);
    const hrFeatures = screen.getAllByText(/HR \d/);

    expect(roleFeatures).toHaveLength(4);
    expect(interviewFeatures).toHaveLength(4);
    expect(atsFeatures).toHaveLength(4);
    expect(hrFeatures).toHaveLength(4);
  });

  test("header changes styling when scrolled", () => {
    render(<Header />);

    // Initially not scrolled
    const header = screen.getByRole("banner");
    expect(header).toHaveClass("bg-transparent");

    // Simulate scroll
    Object.defineProperty(window, "scrollY", { value: 50, writable: true });
    fireEvent.scroll(window);

    // Should have backdrop-blur-xl class
    expect(header).toHaveClass("backdrop-blur-xl");
  });

  test("logo navigation button has correct attributes", () => {
    render(<Header />);

    const logoLink = screen.getByRole("link", { name: /navigate to \//i });
    expect(logoLink).toBeInTheDocument();
  });

  test("features modal has close button with proper accessibility", () => {
    render(<Header />);

    // Open modal
    const featuresButton = screen.getByRole("button", { name: /features/i });
    fireEvent.click(featuresButton);

    const closeButton = screen.getByRole("button", {
      name: /close features modal/i,
    });
    expect(closeButton).toBeInTheDocument();
  });

  test("mobile dropdown has proper styling", () => {
    render(<Header />);

    const hamburgerButton = screen.getByRole("button", {
      name: /open mobile menu/i,
    });
    fireEvent.click(hamburgerButton);

    const dropdown = screen
      .getByText("Mobile Menu")
      .closest("div[id='mobile-nav-dropdown']");
    expect(dropdown).toHaveClass("bg-slate-900");
    expect(dropdown).toHaveClass("border-2");
    expect(dropdown).toHaveClass("border-red-500");
  });

  test("renders background decorative elements", () => {
    render(<Header />);

    // Check for animated background dots
    const animatedElements = document.querySelectorAll(
      ".animate-pulse, .animate-bounce, .animate-ping"
    );
    expect(animatedElements.length).toBeGreaterThan(0);
  });

  test("header has proper responsive classes", () => {
    render(<Header />);

    const header = screen.getByRole("banner");
    expect(header).toHaveClass("fixed");
    expect(header).toHaveClass("w-full");
    expect(header).toHaveClass("top-0");
    expect(header).toHaveClass("z-50");
  });
});
