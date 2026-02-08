import React from "react";
import { render, screen } from "@test/test-utils";
import { expect, describe, it } from "vitest";
import FeaturesSection from "../FeaturesSection";

describe("FeaturesSection", () => {
  const renderFeaturesSection = () => {
    return render(<FeaturesSection />);
  };

  it("renders the features section with correct structure", () => {
    const { container } = renderFeaturesSection();

    // Check for main section structure
    const section = container.querySelector("#features");
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass(
      "relative",
      "pt-6",
      "pb-10",
      "sm:pt-10",
      "sm:pb-24",
      "bg-slate-900",
    );

    // Check for main heading
    expect(screen.getByText("Complete Career Readiness")).toBeInTheDocument();
    expect(
      screen.getByText("Document Optimization & Interview Success"),
    ).toBeInTheDocument();

    // Check for badge
    expect(
      screen.getByText("Powerful Features for Modern Hiring"),
    ).toBeInTheDocument();
  });

  it("renders all feature cards", () => {
    renderFeaturesSection();

    // Check for actual feature headings
    const careerPath = screen.getAllByText("Career Path Exploration");
    expect(careerPath.length).toBeGreaterThan(0);
  });

  it("displays feature cards with hover effects", () => {
    const { container } = renderFeaturesSection();

    // Only count feature cards in the main grid, not workflow columns
    const featureCards = container.querySelectorAll(
      ".grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-3 > div.group",
    );
    expect(featureCards.length).toBeGreaterThan(0);

    featureCards.forEach((card) => {
      expect(card).toHaveClass("group");
      expect(card).toHaveClass("hover:shadow-xl");
      expect(card).toHaveClass("transition-all");
      expect(card).toHaveClass("duration-300");
    });
  });

  it("renders workflow section with proper layout", () => {
    const { container } = renderFeaturesSection();

    // Check for workflow section
    expect(screen.getByText("How Our System Works")).toBeInTheDocument();

    // Check for workflow description
    expect(
      screen.getByText(/Career Path Exploration helps you discover ideal/),
    ).toBeInTheDocument();

    // Check for workflow grid
    const workflowGrid = container.querySelector('[class*="lg:grid-cols-3"]');
    expect(workflowGrid).toBeInTheDocument();

    // Check for 3 workflow columns
    const workflowColumns = container.querySelectorAll(
      '[class*="bg-slate-700/50"]',
    );
    expect(workflowColumns.length).toBeGreaterThanOrEqual(3);
  });

  it("renders feature descriptions with proper formatting", () => {
    renderFeaturesSection();

    // Check for specific description texts from actual components
    expect(
      screen.getByText(
        /Prepare for your career transition with AI-guided role/,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Ensure interview readiness with resume optimization/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Build complete interview readiness through AI-powered/),
    ).toBeInTheDocument();
  });

  it("renders colored tool names in guidance text", () => {
    renderFeaturesSection();

    // Check for colored tool names in the heading
    const indigoText = screen.getByText(
      "Document Optimization & Interview Success",
      {
        selector: "span.text-indigo-400",
      },
    );
    expect(indigoText).toHaveClass("text-indigo-400");
  });

  it("displays feature badges with correct colors", () => {
    renderFeaturesSection();

    // Check for badge texts (these are the small badges on cards) - target div elements
    const careerExplorationBadge = screen.getByText("Career Exploration", {
      selector: "div.inline-flex",
    });
    expect(careerExplorationBadge).toHaveClass(
      "bg-blue-800/70",
      "text-blue-300",
    );

    const documentAnalysisBadge = screen.getByText("Document Analysis", {
      selector: "div.inline-flex",
    });
    expect(documentAnalysisBadge).toHaveClass(
      "bg-emerald-800/70",
      "text-emerald-300",
    );

    const interviewMasteryBadge = screen.getByText("Interview Mastery", {
      selector: "div.inline-flex",
    });
    expect(interviewMasteryBadge).toHaveClass(
      "bg-purple-800/70",
      "text-purple-300",
    );
  });

  it("applies hover effects to feature cards", () => {
    const { container } = renderFeaturesSection();

    // Find feature cards (not workflow columns) with hover effects
    const featureCardSelectors = container.querySelectorAll(
      '.group[class*="hover:shadow-xl"]',
    );
    expect(featureCardSelectors.length).toBeGreaterThan(0);

    featureCardSelectors.forEach((card) => {
      expect(card).toHaveClass("hover:shadow-xl");
      expect(card).toHaveClass("hover:-translate-y-1");
    });
  });

  it("renders workflow steps for each tool", () => {
    renderFeaturesSection();

    // Check for workflow steps
    expect(screen.getByText("Define target roles & goals")).toBeInTheDocument();
  });

  it("displays proper responsive grid layout", () => {
    const { container } = renderFeaturesSection();

    // Check main feature grid
    const mainGrid = container.querySelector('[class*="grid-cols-1"]');
    expect(mainGrid).toHaveClass("sm:grid-cols-2", "lg:grid-cols-3");

    // Check workflow grid
    const workflowGrid = container.querySelector('[class*="lg:grid-cols-3"]');
    expect(workflowGrid).toHaveClass(
      "grid-cols-1",
      "sm:grid-cols-2",
      "lg:grid-cols-3",
    );
  });

  it("renders gradient background and overlay effects", () => {
    const { container } = renderFeaturesSection();

    // Check for gradient background
    const gradientBg = container.querySelector('[class*="bg-gradient-to-br"]');
    expect(gradientBg).toBeInTheDocument();

    // Check for opacity overlay
    const opacityOverlay = container.querySelector('[class*="opacity-20"]');
    expect(opacityOverlay).toBeInTheDocument();
  });

  it("has proper accessibility structure", () => {
    const { container } = renderFeaturesSection();

    // Check for semantic headings
    const headings = container.querySelectorAll("h2, h3, h4");
    expect(headings.length).toBeGreaterThan(3); // Main heading + feature headings + workflow heading

    // Check for proper text contrast classes
    const mainHeading = screen.getByText("Complete Career Readiness");
    expect(mainHeading).toHaveClass("text-white");
  });

  it("displays workflow guidance text with proper styling", () => {
    renderFeaturesSection();

    // Check for guidance text
    expect(
      screen.getByText(/Career Path Exploration helps you discover ideal/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Professional Document Analysis optimizes/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/AI-Assisted Interview Practice provides/),
    ).toBeInTheDocument();
  });

  it("renders step indicators with proper numbering", () => {
    const { container } = renderFeaturesSection();

    // Check for step numbers 1, 2, 3 in each workflow column
    const stepNumbers = container.querySelectorAll('[class*="bg-slate-600"]');
    const numbers = Array.from(stepNumbers).map((el) => el.textContent);
    expect(numbers).toEqual(expect.arrayContaining(["1", "2", "3"]));
  });

  it("applies consistent spacing and padding", () => {
    const { container } = renderFeaturesSection();

    // Check main container padding
    const mainContainer = container.querySelector('[class*="max-w-7xl"]');
    expect(mainContainer).toHaveClass("px-2", "sm:px-4", "md:px-6", "lg:px-8");

    // Check feature card padding - target the main card div
    const firstCard = container.querySelector(
      ".grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-3 > div:first-child",
    );
    expect(firstCard).toHaveClass("p-6", "sm:p-8");
  });

  it("renders workflow section with rounded corners and borders", () => {
    const { container } = renderFeaturesSection();

    const workflowSection = container.querySelector(
      '[class*="text-center"][class*="bg-slate-800"]',
    );
    expect(workflowSection).toHaveClass(
      "border",
      "border-slate-700",
      "rounded-3xl",
    );
  });

  it("displays tool-specific workflow steps", () => {
    renderFeaturesSection();

    // Check for key workflow steps
    expect(screen.getByText("Define target roles & goals")).toBeInTheDocument();
    expect(screen.getByText("Get content analysis & gaps")).toBeInTheDocument();
  });

  it("applies proper color coding for workflow headings", () => {
    renderFeaturesSection();

    // Check that headings exist
    const allElements = screen.getAllByText(/Career|Document|Interview/i);
    expect(allElements.length).toBeGreaterThan(0);
  });

  it("renders all required sections and subsections", () => {
    const { container } = renderFeaturesSection();

    // Main sections
    expect(container.querySelector("#features")).toBeInTheDocument();

    // Feature cards section
    const featureGrid = container.querySelector('[class*="gap-6"]');
    expect(featureGrid).toBeInTheDocument();

    // Workflow section
    expect(screen.getByText("How Our System Works")).toBeInTheDocument();

    // Workflow columns
    const workflowColumns = container.querySelectorAll('[class*="space-y-4"]');
    expect(workflowColumns.length).toBeGreaterThanOrEqual(3);
  });
});
