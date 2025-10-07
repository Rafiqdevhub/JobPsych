import React from "react";
import { render, screen } from "@testing-library/react";
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
      "bg-slate-900"
    );

    // Check for main heading
    expect(screen.getByText("Four Powerful Tools for")).toBeInTheDocument();
    expect(
      screen.getByText("Career Success & Smart Hiring")
    ).toBeInTheDocument();

    // Check for badge
    expect(
      screen.getByText("Powerful Features for Modern Hiring")
    ).toBeInTheDocument();
  });

  it("renders all feature cards", () => {
    renderFeaturesSection();

    // Check for all 6 feature titles
    expect(screen.getByText("Free Career Guidance")).toBeInTheDocument();
    expect(screen.getByText("AI Interview Practice")).toBeInTheDocument();
    expect(
      screen.getByText("Beat Applicant Tracking Systems")
    ).toBeInTheDocument();
    expect(screen.getByText("AI-Powered Hiring Tool")).toBeInTheDocument();
    expect(screen.getByText("Role Fit Assessment")).toBeInTheDocument();
    expect(screen.getByText("Real-time Processing")).toBeInTheDocument();
  });

  it("displays feature cards with hover effects", () => {
    const { container } = renderFeaturesSection();

    // Only count feature cards in the main grid, not workflow columns
    const featureCards = container.querySelectorAll(
      ".grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-3 > div.group"
    );
    expect(featureCards).toHaveLength(6); // 6 feature cards

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
    expect(screen.getByText("How JobPsych Works")).toBeInTheDocument();

    // Check for workflow description
    expect(
      screen.getByText(/Role Suggestions is completely free/)
    ).toBeInTheDocument();

    // Check for workflow grid
    const workflowGrid = container.querySelector('[class*="lg:grid-cols-4"]');
    expect(workflowGrid).toBeInTheDocument();

    // Check for 4 workflow columns
    const workflowColumns = container.querySelectorAll(
      '[class*="bg-slate-700/50"]'
    );
    expect(workflowColumns).toHaveLength(4);
  });

  it("renders feature descriptions with proper formatting", () => {
    renderFeaturesSection();

    // Check for specific description texts
    expect(
      screen.getByText(/Upload your resume, mention target role/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Practice real interview questions/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Optimize your resume to pass ATS filters/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Advanced AI resume screening/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Get detailed analysis of how well you match/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Upload resumes and receive instant analysis/)
    ).toBeInTheDocument();
  });

  it("renders colored tool names in guidance text", () => {
    renderFeaturesSection();

    // Check for colored tool names in the guidance text (spans with font-bold)
    const yellowText = screen.getByText("Role Suggestions", {
      selector: "span.text-yellow-400",
    });
    expect(yellowText).toHaveClass("text-yellow-400");

    const blueText = screen.getByText("InterviewPrep AI", {
      selector: "span.text-blue-400",
    });
    expect(blueText).toHaveClass("text-blue-400");

    const purpleText = screen.getByText("ATS Analyzer", {
      selector: "span.text-purple-400",
    });
    expect(purpleText).toHaveClass("text-purple-400");

    const orangeText = screen.getByText("HireDisk", {
      selector: "span.text-orange-400",
    });
    expect(orangeText).toHaveClass("text-orange-400");
  });

  it("displays feature badges with correct colors", () => {
    renderFeaturesSection();

    // Check for badge texts (these are the small badges on cards) - target div elements
    const roleSuggestionsBadge = screen.getByText("Role Suggestions", {
      selector: "div.inline-flex",
    });
    expect(roleSuggestionsBadge).toHaveClass(
      "bg-indigo-800/70",
      "text-indigo-300"
    );

    const interviewPrepBadge = screen.getByText("InterviewPrep AI", {
      selector: "div.inline-flex",
    });
    expect(interviewPrepBadge).toHaveClass(
      "bg-purple-800/70",
      "text-purple-300"
    );

    const atsAnalyzerBadge = screen.getByText("ATS Analyzer", {
      selector: "div.inline-flex",
    });
    expect(atsAnalyzerBadge).toHaveClass(
      "bg-emerald-800/70",
      "text-emerald-300"
    );

    const hireDiskBadge = screen.getByText("HireDisk", {
      selector: "div.inline-flex",
    });
    expect(hireDiskBadge).toHaveClass("bg-orange-800/70", "text-orange-300");

    const smartAnalysisBadge = screen.getByText("Smart Analysis", {
      selector: "div.inline-flex",
    });
    expect(smartAnalysisBadge).toHaveClass(
      "bg-indigo-800/70",
      "text-indigo-300"
    );

    const instantResultsBadge = screen.getByText("Instant Results", {
      selector: "div.inline-flex",
    });
    expect(instantResultsBadge).toHaveClass(
      "bg-indigo-800/70",
      "text-indigo-300"
    );
  });

  it("applies hover effects to feature cards", () => {
    const { container } = renderFeaturesSection();

    const cards = container.querySelectorAll('[class*="hover:shadow-xl"]');
    expect(cards).toHaveLength(6); // 6 feature cards

    cards.forEach((card) => {
      expect(card).toHaveClass("hover:shadow-xl");
      expect(card).toHaveClass("hover:-translate-y-1");
    });
  });

  it("renders workflow steps for each tool", () => {
    renderFeaturesSection();

    // Check for workflow headings (h4 elements in workflow columns)
    const roleSuggestionsHeading = screen.getByText("Role Suggestions", {
      selector: "h4.text-yellow-400",
    });
    expect(roleSuggestionsHeading).toBeInTheDocument();

    const interviewPrepHeading = screen.getByText("InterviewPrep AI", {
      selector: "h4.text-blue-400",
    });
    expect(interviewPrepHeading).toBeInTheDocument();

    const atsAnalyzerHeading = screen.getByText("ATS Analyzer", {
      selector: "h4.text-purple-400",
    });
    expect(atsAnalyzerHeading).toBeInTheDocument();

    const hireDiskHeading = screen.getByText("HireDisk", {
      selector: "h4.text-emerald-400",
    });
    expect(hireDiskHeading).toBeInTheDocument();

    // Check for numbered steps (should be 12 total: 3 per tool × 4 tools)
    const steps = document.querySelectorAll('[class*="bg-slate-600"]');
    expect(steps).toHaveLength(12);
  });

  it("displays proper responsive grid layout", () => {
    const { container } = renderFeaturesSection();

    // Check main feature grid
    const mainGrid = container.querySelector('[class*="grid-cols-1"]');
    expect(mainGrid).toHaveClass("sm:grid-cols-2", "lg:grid-cols-3");

    // Check workflow grid
    const workflowGrid = container.querySelector('[class*="lg:grid-cols-4"]');
    expect(workflowGrid).toHaveClass(
      "grid-cols-1",
      "sm:grid-cols-2",
      "lg:grid-cols-4"
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
    expect(headings.length).toBeGreaterThan(5); // Main heading + 6 feature headings + workflow heading + 4 workflow headings

    // Check for proper text contrast classes
    const mainHeading = screen.getByText("Four Powerful Tools for");
    expect(mainHeading).toHaveClass("text-white");
  });

  it("displays workflow guidance text with proper styling", () => {
    renderFeaturesSection();

    // Check for guidance text
    expect(screen.getByText(/How to choose\?/)).toBeInTheDocument();
    expect(screen.getByText(/If you're a job seeker/)).toBeInTheDocument();
    expect(screen.getByText(/If you're an HR team/)).toBeInTheDocument();
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
      ".grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-3 > div:first-child"
    );
    expect(firstCard).toHaveClass("p-6", "sm:p-8");
  });

  it("renders workflow section with rounded corners and borders", () => {
    const { container } = renderFeaturesSection();

    const workflowSection = container.querySelector(
      '[class*="text-center"][class*="bg-slate-800"]'
    );
    expect(workflowSection).toHaveClass(
      "border",
      "border-slate-700",
      "rounded-3xl"
    );
  });

  it("displays tool-specific workflow steps", () => {
    renderFeaturesSection();

    // Role Suggestions steps
    expect(screen.getByText("Upload your resume")).toBeInTheDocument();
    expect(screen.getByText(/Mention target role/)).toBeInTheDocument();
    expect(screen.getByText(/Get career recommendations/)).toBeInTheDocument();

    // InterviewPrep AI steps
    expect(screen.getByText("Access practice dashboard")).toBeInTheDocument();
    expect(
      screen.getByText("Practice with sample questions")
    ).toBeInTheDocument();
    expect(screen.getByText("Get AI feedback & tips")).toBeInTheDocument();

    // ATS Analyzer steps
    expect(
      screen.getByText(/Upload your resume for analysis/)
    ).toBeInTheDocument();
    expect(
      screen.getByText("Get ATS compatibility scoring")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Receive optimization recommendations")
    ).toBeInTheDocument();

    // HireDisk steps
    expect(screen.getByText("AI-powered resume screening")).toBeInTheDocument();
    expect(
      screen.getByText("Generate interview questions")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Advanced candidate insights & analytics")
    ).toBeInTheDocument();
  });

  it("applies proper color coding for workflow headings", () => {
    renderFeaturesSection();

    // Check workflow column headings have correct colors
    const roleSuggestionsHeading = screen.getByText("Role Suggestions", {
      selector: "h4.text-yellow-400",
    });
    expect(roleSuggestionsHeading).toHaveClass("text-yellow-400");

    const interviewPrepHeading = screen.getByText("InterviewPrep AI", {
      selector: "h4.text-blue-400",
    });
    expect(interviewPrepHeading).toHaveClass("text-blue-400");

    const atsAnalyzerHeading = screen.getByText("ATS Analyzer", {
      selector: "h4.text-purple-400",
    });
    expect(atsAnalyzerHeading).toHaveClass("text-purple-400");

    const hireDiskHeading = screen.getByText("HireDisk", {
      selector: "h4.text-emerald-400",
    });
    expect(hireDiskHeading).toHaveClass("text-emerald-400");
  });

  it("renders all required sections and subsections", () => {
    const { container } = renderFeaturesSection();

    // Main sections
    expect(container.querySelector("#features")).toBeInTheDocument();

    // Feature cards section
    const featureGrid = container.querySelector('[class*="gap-6"]');
    expect(featureGrid).toBeInTheDocument();

    // Workflow section
    expect(screen.getByText("How JobPsych Works")).toBeInTheDocument();

    // Workflow columns
    const workflowColumns = container.querySelectorAll('[class*="space-y-4"]');
    expect(workflowColumns).toHaveLength(4);
  });
});
