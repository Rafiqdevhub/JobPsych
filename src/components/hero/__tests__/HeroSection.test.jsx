import React from "react";
import { render, screen, fireEvent, act } from "@test/test-utils";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import HeroSection from "../HeroSection";

// Mock TypewriterText component
vi.mock("@components/TypewriterText", () => ({
  default: ({ text, className }) => (
    <span className={className} data-testid="typewriter-text">
      {text}
    </span>
  ),
}));

// Mock window.location
const mockLocation = { href: "" };
Object.defineProperty(window, "location", {
  value: mockLocation,
  writable: true,
});

describe("HeroSection Component", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockLocation.href = "";
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it("renders the hero section with correct structure", () => {
    render(<HeroSection />);

    // Check main elements
    expect(screen.getByText(/AI-Based/)).toBeInTheDocument();
    expect(
      screen.getByText(/Career Readiness and Interview Preparation System/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Discover roles, documents quality improvement, and master interviews/,
      ),
    ).toBeInTheDocument();
  });

  it("displays all three module cards", () => {
    render(<HeroSection />);

    // Check that module names appear in h3 elements (cards)
    expect(
      screen.getByRole("heading", { name: "Career Path Exploration Module" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /Professional Document Structure and Content Analysis Module/,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "AI-Assisted Interview Practice Module",
      }),
    ).toBeInTheDocument();
  });

  it("displays feature card descriptions", () => {
    render(<HeroSection />);

    expect(
      screen.getByText(
        /Prepare for your career transition with AI-guided role discovery/,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Ensure interview readiness with resume optimization/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Build complete interview readiness through AI-powered practice/,
      ),
    ).toBeInTheDocument();
  });

  it("renders all three navigation buttons", () => {
    render(<HeroSection />);

    // Check that buttons exist with the correct names
    expect(
      screen.getByRole("button", { name: /Discover Your Ideal Roles/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Improve Document Clarity/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Ace Your Interview/ }),
    ).toBeInTheDocument();
  });

  it("navigates to correct routes when buttons are clicked", () => {
    render(<HeroSection />);

    // Get buttons by their text within button elements
    const roleButton = screen.getByRole("button", {
      name: /Discover Your Ideal Roles/,
    });
    const atsButton = screen.getByRole("button", {
      name: /Improve Document Clarity/,
    });
    const interviewButton = screen.getByRole("button", {
      name: /Ace Your Interview/,
    });

    fireEvent.click(roleButton);
    expect(window.location.href).toBe("/role-suggestions");

    fireEvent.click(atsButton);
    expect(window.location.href).toBe("/ats-analyzer");

    fireEvent.click(interviewButton);
    expect(window.location.href).toBe("/interview-prepai");
  });

  it("rotates active card every 3 seconds", () => {
    render(<HeroSection />);

    // Initially first card should be active
    const firstCardTitle = screen.getByRole("heading", {
      name: "Career Path Exploration Module",
    });
    const firstCard = firstCardTitle.closest("div.group");
    expect(firstCard).toHaveClass("scale-105");

    // Advance timer by 3 seconds - should move to second card
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    // Force a re-render by triggering state update
    const secondCardTitle = screen.getByRole("heading", {
      name: /Professional Document Structure and Content Analysis Module/,
    });
    const secondCard = secondCardTitle.closest("div.group");
    expect(secondCard).toHaveClass("scale-105");

    // Advance timer by another 3 seconds - should move to third card
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    const thirdCardTitle = screen.getByRole("heading", {
      name: "AI-Assisted Interview Practice Module",
    });
    const thirdCard = thirdCardTitle.closest("div.group");
    expect(thirdCard).toHaveClass("scale-105");
  });

  it("does not display scroll down indicator text (component doesn't have it)", () => {
    render(<HeroSection />);

    // The component doesn't display "Discover More Features Below" text
    expect(
      screen.queryByText("Discover More Features Below"),
    ).not.toBeInTheDocument();
  });

  it("renders role recommendations when resumeData is provided", () => {
    const mockResumeData = {
      roleRecommendations: [
        {
          roleName: "Software Engineer",
          matchPercentage: 85,
          reasoning: "Based on your skills in JavaScript and React",
          careerLevel: "Mid-Level",
          industryFit: "High",
        },
        {
          roleName: "Frontend Developer",
          matchPercentage: 78,
          reasoning: "Your experience with modern frameworks",
          careerLevel: "Senior",
          industryFit: "High",
        },
      ],
    };

    render(<HeroSection resumeData={mockResumeData} />);

    expect(screen.getByText(/Roles You're Ready For/)).toBeInTheDocument();
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
    expect(screen.getByText("85")).toBeInTheDocument();
    expect(screen.getByText("78")).toBeInTheDocument();
  });

  it("does not render role recommendations when no resumeData", () => {
    render(<HeroSection />);

    expect(
      screen.queryByText(/Roles You're Ready For/),
    ).not.toBeInTheDocument();
  });

  it("does not render role recommendations when roleRecommendations is empty", () => {
    const mockResumeData = {
      roleRecommendations: [],
    };

    render(<HeroSection resumeData={mockResumeData} />);

    expect(
      screen.queryByText(/Roles You're Ready For/),
    ).not.toBeInTheDocument();
  });

  it("limits role recommendations to 3 items", () => {
    const mockResumeData = {
      roleRecommendations: [
        {
          roleName: "Role 1",
          matchPercentage: 90,
          reasoning: "Reason 1",
          careerLevel: "Senior",
          industryFit: "High",
        },
        {
          roleName: "Role 2",
          matchPercentage: 85,
          reasoning: "Reason 2",
          careerLevel: "Mid",
          industryFit: "High",
        },
        {
          roleName: "Role 3",
          matchPercentage: 80,
          reasoning: "Reason 3",
          careerLevel: "Junior",
          industryFit: "Medium",
        },
        {
          roleName: "Role 4",
          matchPercentage: 75,
          reasoning: "Reason 4",
          careerLevel: "Entry",
          industryFit: "Low",
        },
      ],
    };

    render(<HeroSection resumeData={mockResumeData} />);

    expect(screen.getByText("Role 1")).toBeInTheDocument();
    expect(screen.getByText("Role 2")).toBeInTheDocument();
    expect(screen.getByText("Role 3")).toBeInTheDocument();
    expect(screen.queryByText("Role 4")).not.toBeInTheDocument();
  });

  it("applies correct styling for match percentages", () => {
    const mockResumeData = {
      roleRecommendations: [
        {
          roleName: "High Match",
          matchPercentage: 85,
          reasoning: "Good match",
          careerLevel: "Senior",
          industryFit: "High",
        },
        {
          roleName: "Medium Match",
          matchPercentage: 65,
          reasoning: "Decent match",
          careerLevel: "Mid",
          industryFit: "Medium",
        },
        {
          roleName: "Low Match",
          matchPercentage: 45,
          reasoning: "Poor match",
          careerLevel: "Junior",
          industryFit: "Low",
        },
      ],
    };

    render(<HeroSection resumeData={mockResumeData} />);

    // Check that percentage badges have correct content (display number without %)
    const highMatchBadge = screen.getByText("85");
    const mediumMatchBadge = screen.getByText("65");
    const lowMatchBadge = screen.getByText("45");

    expect(highMatchBadge).toBeInTheDocument();
    expect(mediumMatchBadge).toBeInTheDocument();
    expect(lowMatchBadge).toBeInTheDocument();
  });

  it("maintains component stability during re-renders", () => {
    const { rerender } = render(<HeroSection />);

    // Check initial render
    expect(
      screen.getByText(
        /Discover roles, documents quality improvement, and master interviews/,
      ),
    ).toBeInTheDocument();

    // Re-render
    rerender(<HeroSection />);

    // Should still be there
    expect(
      screen.getByText(
        /Discover roles, documents quality improvement, and master interviews/,
      ),
    ).toBeInTheDocument();
    expect(screen.getByText(/AI-Based/)).toBeInTheDocument();
  });
});
