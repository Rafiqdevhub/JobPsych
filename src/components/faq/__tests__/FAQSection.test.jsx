import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import FAQSection from "../FAQSection";

// Mock the FAQ data and FAQDropdown component
vi.mock("@/data/faqs", () => ({
  faqs: [
    {
      question:
        "What's the differences among Role Suggestions, InterviewPrep AI, and ATS Analyzer?",
      answer:
        "Role Suggestions is completely free for job seekers to get career guidance and role recommendations. InterviewPrep AI helps you practice interviews with AI feedback. ATS Analyzer optimizes your resume to beat Applicant Tracking Systems.",
      type: "general",
    },
    {
      question: "What is InterviewPrep AI?",
      answer:
        "InterviewPrep AI is our AI-powered interview practice tool that helps job seekers prepare for interviews. It provides sample questions, recording simulation, and tips to improve your interview skills.",
      type: "interview",
    },
    {
      question: "What is ATS Analyzer?",
      answer:
        "ATS Analyzer is our AI-powered tool that helps you optimize your resume to beat Applicant Tracking Systems (ATS). It analyzes your resume against multiple ATS platforms, provides keyword optimization suggestions, and gives you a compatibility score to improve your chances of getting past automated screening.",
      type: "ats",
    },
  ],
}));

vi.mock("@/components/faq/FAQDropdown", () => ({
  default: ({ question, answer, type }) => (
    <div data-testid={`faq-dropdown-${type}`}>
      <div>{question}</div>
      <div>{answer}</div>
      <div>{type}</div>
    </div>
  ),
}));

describe("FAQSection", () => {
  it("renders the FAQ section with correct structure", () => {
    render(<FAQSection />);

    // Check main heading
    expect(screen.getByText("Frequently Asked Questions")).toBeInTheDocument();
    expect(
      screen.getByText("Everything you need to know about JobPsych")
    ).toBeInTheDocument();

    // Check description
    expect(
      screen.getByText(
        /Get answers to common questions about our three powerful tools/
      )
    ).toBeInTheDocument();
  });

  it("renders the animated FAQ badge", () => {
    const { container } = render(<FAQSection />);

    const badge = container.querySelector('[class*="bg-gradient-to-r"]');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass(
      "from-indigo-600",
      "via-purple-600",
      "to-blue-600"
    );
    expect(badge).toHaveClass("hover:scale-110");
  });

  it("displays animated elements in the FAQ badge", () => {
    const { container } = render(<FAQSection />);

    const bouncingDots = container.querySelectorAll(
      '[class*="animate-bounce"]'
    );
    expect(bouncingDots).toHaveLength(2);

    const pulsingBg = container.querySelector('[class*="animate-pulse"]');
    expect(pulsingBg).toBeInTheDocument();
  });

  it("renders FAQ dropdowns for each FAQ item", () => {
    render(<FAQSection />);

    // Check that FAQDropdown components are rendered
    expect(screen.getByTestId("faq-dropdown-general")).toBeInTheDocument();
    expect(screen.getByTestId("faq-dropdown-interview")).toBeInTheDocument();
    expect(screen.getByTestId("faq-dropdown-ats")).toBeInTheDocument();
  });

  it("passes correct props to FAQDropdown components", () => {
    render(<FAQSection />);

    // Check that the mocked components receive the correct content
    expect(
      screen.getByText(
        "What's the differences among Role Suggestions, InterviewPrep AI, and ATS Analyzer?"
      )
    ).toBeInTheDocument();
    expect(screen.getByText("What is InterviewPrep AI?")).toBeInTheDocument();
    expect(screen.getByText("What is ATS Analyzer?")).toBeInTheDocument();
  });

  it("applies correct CSS classes for section styling", () => {
    const { container } = render(<FAQSection />);

    // Check section background
    expect(container.firstChild).toHaveClass(
      "relative",
      "pt-6",
      "pb-10",
      "sm:pt-10",
      "sm:pb-24",
      "bg-slate-900"
    );

    // Check main container
    const mainContainer = container.querySelector(
      '[class*="mx-auto max-w-7xl"]'
    );
    expect(mainContainer).toHaveClass(
      "relative",
      "z-10",
      "mx-auto",
      "max-w-7xl",
      "px-2",
      "sm:px-4",
      "md:px-6",
      "lg:px-8"
    );
  });

  it("has proper spacing between FAQ items", () => {
    const { container } = render(<FAQSection />);

    const faqContainer = container.querySelector('[class*="space-y-3"]');
    expect(faqContainer).toHaveClass("space-y-3", "sm:space-y-4");
  });

  it("applies correct background gradient", () => {
    const { container } = render(<FAQSection />);

    const gradientDiv = container.querySelector('[class*="bg-gradient-to-br"]');
    expect(gradientDiv).toHaveClass(
      "bg-gradient-to-br",
      "from-indigo-500/10",
      "to-blue-500/10"
    );
  });

  it("renders the FAQ section title with correct styling", () => {
    render(<FAQSection />);

    const title = screen.getByText(
      "Everything you need to know about JobPsych"
    );
    expect(title).toHaveClass(
      "text-3xl",
      "font-bold",
      "tracking-tight",
      "text-white",
      "sm:text-4xl"
    );
  });

  it("renders the FAQ section description with correct styling", () => {
    render(<FAQSection />);

    const description = screen.getByText(
      /Get answers to common questions about our four powerful tools/
    );
    expect(description).toHaveClass(
      "mt-6",
      "text-lg",
      "leading-8",
      "text-gray-300"
    );
  });

  it("has responsive padding and margins", () => {
    const { container } = render(<FAQSection />);

    const textCenter = container.querySelector(
      '[class*="mx-auto max-w-3xl text-center"]'
    );
    expect(textCenter).toHaveClass(
      "mx-auto",
      "max-w-3xl",
      "text-center",
      "mb-10",
      "sm:mb-16"
    );
  });

  it("renders FAQ container with proper max width", () => {
    const { container } = render(<FAQSection />);

    const faqContainer = container.querySelector(
      '[class*="mx-auto max-w-4xl"]'
    );
    expect(faqContainer).toHaveClass("mx-auto", "max-w-4xl");
  });

  it("applies backdrop blur effect to background", () => {
    const { container } = render(<FAQSection />);

    const backdrop = container.querySelector('[class*="opacity-20"]');
    expect(backdrop).toBeInTheDocument();
  });

  it("has proper z-index layering", () => {
    const { container } = render(<FAQSection />);

    const relativeZ10 = container.querySelector('[class*="relative z-10"]');
    expect(relativeZ10).toBeInTheDocument();
  });

  it("renders gradient text in the FAQ badge", () => {
    const { container } = render(<FAQSection />);

    const gradientText = container.querySelector(
      '[class*="bg-gradient-to-r"][class*="bg-clip-text"]'
    );
    expect(gradientText).toBeInTheDocument();
    expect(gradientText).toHaveClass(
      "from-white",
      "via-cyan-200",
      "to-indigo-200",
      "bg-clip-text",
      "text-transparent"
    );
  });

  it("applies hover effects to the FAQ badge", () => {
    const { container } = render(<FAQSection />);

    const badge = container.querySelector('[class*="hover:scale-110"]');
    expect(badge).toHaveClass("hover:scale-110", "hover:border-indigo-300");
  });

  it("has proper shadow effects", () => {
    const { container } = render(<FAQSection />);

    const shadowElement = container.querySelector('[class*="shadow-2xl"]');
    expect(shadowElement).toHaveClass(
      "shadow-2xl",
      "hover:shadow-indigo-500/25"
    );
  });

  it("renders with correct section structure", () => {
    const { container } = render(<FAQSection />);

    // Check that it's a section element
    expect(container.firstChild.tagName).toBe("SECTION");

    // Check background structure
    const absoluteInset = container.querySelector(
      '[class*="absolute inset-0"]'
    );
    expect(absoluteInset).toBeInTheDocument();
  });

  it("applies transition effects", () => {
    const { container } = render(<FAQSection />);

    const transitionElement = container.querySelector(
      '[class*="transition-all duration-500"]'
    );
    expect(transitionElement).toHaveClass("transition-all", "duration-500");
  });
});
