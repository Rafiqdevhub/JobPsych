import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import TestimonialsSection from "../TestimonialsSection";
import { testimonials } from "@/data/testimonials";

// Mock the testimonials data
vi.mock("@/data/testimonials", () => ({
  testimonials: [
    {
      category: "Job Seekers",
      name: "Ali Ahmed",
      role: "Software Developer",
      company: "Successfully transitioned from Marketing",
      image:
        "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23818CF8'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='20' font-family='Arial'%3EAA%3C/text%3E%3C/svg%3E",
      quote:
        "Role Suggestions helped me identify the perfect career switch into tech. The AI analysis of my transferable skills was spot-on!",
      result: "Career Switch Success",
      highlight: "85% role match score",
    },
    {
      category: "HR Professionals",
      name: "Abu Bakar",
      role: "HR Director",
      company: "TechCorp Solutions",
      image:
        "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%234F46E5'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='20' font-family='Arial'%3EAB%3C/text%3E%3C/svg%3E",
      quote:
        "HireDisk cut our hiring time in half. The AI-generated interview questions are incredibly insightful and role-specific.",
      result: "50% faster hiring",
      highlight: "98% candidate satisfaction",
    },
    {
      category: "Enterprise",
      name: "Ihtesham Ullah",
      role: "Talent Acquisition Head",
      company: "Global Innovations Inc",
      image:
        "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%236D28D9'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='20' font-family='Arial'%3EIU%3C/text%3E%3C/svg%3E",
      quote:
        "The custom enterprise solution streamlined our entire recruitment process. The ROI has been remarkable.",
      result: "3x hiring efficiency",
      highlight: "90% better matches",
    },
  ],
}));

describe("TestimonialsSection", () => {
  it("renders the testimonials section with correct structure", () => {
    render(<TestimonialsSection />);

    // Check main heading
    expect(screen.getByText("Success Stories")).toBeInTheDocument();
    expect(
      screen.getByText("See How JobPsych Transforms Careers & Hiring")
    ).toBeInTheDocument();

    // Check description
    expect(
      screen.getByText(/Real stories from job seekers and HR professionals/)
    ).toBeInTheDocument();

    // Check feature badges
    expect(screen.getByText("Role Suggestions")).toBeInTheDocument();
    expect(screen.getByText("InterviewPrep AI")).toBeInTheDocument();
    expect(screen.getByText("ATS Analyzer")).toBeInTheDocument();
    expect(screen.getByText("HireDisk")).toBeInTheDocument();
  });

  it("renders all testimonials correctly", () => {
    render(<TestimonialsSection />);

    // Check all testimonial names
    expect(screen.getByText("Ali Ahmed")).toBeInTheDocument();
    expect(screen.getByText("Abu Bakar")).toBeInTheDocument();
    expect(screen.getByText("Ihtesham Ullah")).toBeInTheDocument();

    // Check all roles
    expect(screen.getByText("Software Developer")).toBeInTheDocument();
    expect(screen.getByText("HR Director")).toBeInTheDocument();
    expect(screen.getByText("Talent Acquisition Head")).toBeInTheDocument();

    // Check all companies
    expect(
      screen.getByText("Successfully transitioned from Marketing")
    ).toBeInTheDocument();
    expect(screen.getByText("TechCorp Solutions")).toBeInTheDocument();
    expect(screen.getByText("Global Innovations Inc")).toBeInTheDocument();
  });

  it("displays testimonial quotes correctly", () => {
    render(<TestimonialsSection />);

    expect(
      screen.getByText(
        /Role Suggestions helped me identify the perfect career switch/
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(/HireDisk cut our hiring time in half/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /The custom enterprise solution streamlined our entire recruitment process/
      )
    ).toBeInTheDocument();
  });

  it("displays testimonial categories as badges", () => {
    render(<TestimonialsSection />);

    expect(screen.getByText("Job Seekers")).toBeInTheDocument();
    expect(screen.getByText("HR Professionals")).toBeInTheDocument();
    expect(screen.getByText("Enterprise")).toBeInTheDocument();
  });

  it("displays result and highlight badges for each testimonial", () => {
    render(<TestimonialsSection />);

    expect(screen.getByText("Career Switch Success")).toBeInTheDocument();
    expect(screen.getByText("85% role match score")).toBeInTheDocument();
    expect(screen.getByText("50% faster hiring")).toBeInTheDocument();
    expect(screen.getByText("98% candidate satisfaction")).toBeInTheDocument();
    expect(screen.getByText("3x hiring efficiency")).toBeInTheDocument();
    expect(screen.getByText("90% better matches")).toBeInTheDocument();
  });

  it("renders testimonial images with correct alt text", () => {
    render(<TestimonialsSection />);

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(3);

    expect(images[0]).toHaveAttribute("alt", "Ali Ahmed");
    expect(images[1]).toHaveAttribute("alt", "Abu Bakar");
    expect(images[2]).toHaveAttribute("alt", "Ihtesham Ullah");
  });

  it("applies correct CSS classes for styling", () => {
    const { container } = render(<TestimonialsSection />);

    // Check section background
    expect(container.firstChild).toHaveClass(
      "relative",
      "pt-6",
      "pb-10",
      "sm:pt-10",
      "sm:pb-24",
      "bg-slate-900"
    );

    // Check testimonial cards
    const testimonialCards = container.querySelectorAll(
      '[class*="bg-slate-800"]'
    );
    expect(testimonialCards).toHaveLength(3);

    testimonialCards.forEach((card) => {
      expect(card).toHaveClass(
        "relative",
        "bg-slate-800",
        "rounded-2xl",
        "p-8",
        "shadow-xl"
      );
    });
  });

  it("has responsive grid layout", () => {
    const { container } = render(<TestimonialsSection />);

    const gridContainer = container.querySelector('[class*="grid"]');
    expect(gridContainer).toHaveClass(
      "grid",
      "grid-cols-1",
      "sm:grid-cols-2",
      "md:grid-cols-3",
      "gap-6",
      "sm:gap-8"
    );
  });

  it("displays feature badges with hover effects", () => {
    const { container } = render(<TestimonialsSection />);

    const badges = container.querySelectorAll('[class*="inline-flex"]');
    expect(badges).toHaveLength(4);

    // Check each badge has its own hover effect
    expect(badges[0]).toHaveClass("hover:bg-emerald-700");
    expect(badges[1]).toHaveClass("hover:bg-blue-700");
    expect(badges[2]).toHaveClass("hover:bg-orange-700");
    expect(badges[3]).toHaveClass("hover:bg-purple-700");
  });

  it("has proper accessibility attributes", () => {
    render(<TestimonialsSection />);

    const images = screen.getAllByRole("img");
    images.forEach((img) => {
      expect(img).toHaveAttribute("alt");
    });
  });

  it("renders testimonial cards with hover effects", () => {
    const { container } = render(<TestimonialsSection />);

    const testimonialCards = container.querySelectorAll(
      '[class*="hover:shadow-2xl"]'
    );
    expect(testimonialCards).toHaveLength(3);

    testimonialCards.forEach((card) => {
      expect(card).toHaveClass(
        "hover:shadow-2xl",
        "transition-all",
        "duration-300"
      );
      expect(card).toHaveClass("hover:border-indigo-500/50");
    });
  });

  it("displays testimonial metadata correctly", () => {
    render(<TestimonialsSection />);

    // Check that all testimonial data is displayed
    testimonials.forEach((testimonial) => {
      expect(screen.getByText(testimonial.name)).toBeInTheDocument();
      expect(screen.getByText(testimonial.role)).toBeInTheDocument();
      expect(screen.getByText(testimonial.company)).toBeInTheDocument();
      expect(screen.getByText(testimonial.result)).toBeInTheDocument();
      expect(screen.getByText(testimonial.highlight)).toBeInTheDocument();
    });
  });

  it("applies correct background gradient", () => {
    const { container } = render(<TestimonialsSection />);

    const gradientDiv = container.querySelector('[class*="bg-gradient-to-br"]');
    expect(gradientDiv).toHaveClass(
      "bg-gradient-to-br",
      "from-indigo-500/10",
      "to-blue-500/10"
    );
  });

  it("has proper section spacing and padding", () => {
    const { container } = render(<TestimonialsSection />);

    const mainContainer = container.querySelector(
      '[class*="mx-auto max-w-7xl"]'
    );
    expect(mainContainer).toHaveClass(
      "relative",
      "z-10",
      "mx-auto",
      "max-w-7xl",
      "px-2",
      "sm:px-6",
      "lg:px-8"
    );
  });

  it("renders testimonial quotes with proper formatting", () => {
    const { container } = render(<TestimonialsSection />);

    const quotes = container.querySelectorAll("blockquote");
    expect(quotes).toHaveLength(3);

    quotes.forEach((quote) => {
      expect(quote).toHaveClass("text-gray-300", "mb-6");
      expect(quote.textContent).toMatch(/^".*"$/);
    });
  });

  it("displays result badges with correct styling", () => {
    const { container } = render(<TestimonialsSection />);

    const resultBadges = container.querySelectorAll(
      '[class*="bg-emerald-500/20"]'
    );
    expect(resultBadges).toHaveLength(3);

    resultBadges.forEach((badge) => {
      expect(badge).toHaveClass(
        "bg-emerald-500/20",
        "px-3",
        "py-1",
        "rounded-full",
        "border",
        "border-emerald-500/30"
      );
    });
  });

  it("displays highlight badges with correct styling", () => {
    const { container } = render(<TestimonialsSection />);

    const highlightBadges = container.querySelectorAll(
      '[class*="bg-indigo-500/20"]'
    );
    expect(highlightBadges).toHaveLength(3);

    highlightBadges.forEach((badge) => {
      expect(badge).toHaveClass(
        "bg-indigo-500/20",
        "px-3",
        "py-1",
        "rounded-full",
        "border",
        "border-indigo-500/30"
      );
    });
  });
});
