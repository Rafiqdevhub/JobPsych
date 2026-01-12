import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
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
    expect(
      screen.getByText("AI-Powered Career Intelligence Platform")
    ).toBeInTheDocument();
    expect(screen.getByText("Transform Your")).toBeInTheDocument();
    expect(screen.getByTestId("typewriter-text")).toBeInTheDocument();
    expect(screen.getByText("Four Powerful AI Tools:")).toBeInTheDocument();
  });

  it("displays all four feature cards", () => {
    render(<HeroSection />);

    // Check that feature names appear in h3 elements (cards)
    expect(
      screen.getByRole("heading", { name: "Role Suggestions" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "InterviewPrep AI" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "ATS Analyzer" })
    ).toBeInTheDocument();
  });

  it("displays feature card descriptions", () => {
    render(<HeroSection />);

    expect(screen.getByText("AI-powered career matching")).toBeInTheDocument();
    expect(
      screen.getByText("Master interviews with AI coaching")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Resume optimization for ATS systems")
    ).toBeInTheDocument();
  });

  it("renders all three navigation buttons", () => {
    render(<HeroSection />);

    // Check that buttons exist with the correct names
    expect(
      screen.getByRole("button", { name: /Role Suggestions/ })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /InterviewPrep AI/ })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /ATS Analyzer/ })
    ).toBeInTheDocument();
  });

  it("navigates to correct routes when buttons are clicked", () => {
    render(<HeroSection />);

    // Get buttons by their text within button elements
    const roleButton = screen.getByRole("button", { name: /Role Suggestions/ });
    const interviewButton = screen.getByRole("button", {
      name: /InterviewPrep AI/,
    });
    const atsButton = screen.getByRole("button", { name: /ATS Analyzer/ });

    fireEvent.click(roleButton);
    expect(window.location.href).toBe("/role-suggestions");

    fireEvent.click(interviewButton);
    expect(window.location.href).toBe("/interview-prepai");

    fireEvent.click(atsButton);
    expect(window.location.href).toBe("/ats-analyzer");
  });

  it("rotates active card every 3 seconds", () => {
    render(<HeroSection />);

    // Initially first card should be active
    const firstCardTitle = screen.getByRole("heading", {
      name: "Role Suggestions",
    });
    const firstCard = firstCardTitle.closest("div.group");
    expect(firstCard).toHaveClass("scale-105");

    // Advance timer by 3 seconds - should move to second card
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    // Force a re-render by triggering state update
    const secondCardTitle = screen.getByRole("heading", {
      name: "InterviewPrep AI",
    });
    const secondCard = secondCardTitle.closest("div.group");
    expect(secondCard).toHaveClass("scale-105");

    // Advance timer by another 3 seconds - should move to third card
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    const thirdCardTitle = screen.getByRole("heading", {
      name: "ATS Analyzer",
    });
    const thirdCard = thirdCardTitle.closest("div.group");
    expect(thirdCard).toHaveClass("scale-105");
  });

  it("displays scroll down indicator on desktop", () => {
    render(<HeroSection />);

    expect(
      screen.getByText("Discover More Features Below")
    ).toBeInTheDocument();
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

    expect(
      screen.getByText("Your Personalized Role Matches")
    ).toBeInTheDocument();
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
    expect(screen.getByText("85%")).toBeInTheDocument();
    expect(screen.getByText("78%")).toBeInTheDocument();
  });

  it("does not render role recommendations when no resumeData", () => {
    render(<HeroSection />);

    expect(
      screen.queryByText("Your Personalized Role Matches")
    ).not.toBeInTheDocument();
  });

  it("does not render role recommendations when roleRecommendations is empty", () => {
    const mockResumeData = {
      roleRecommendations: [],
    };

    render(<HeroSection resumeData={mockResumeData} />);

    expect(
      screen.queryByText("Your Personalized Role Matches")
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

    // Check that percentage badges have correct background colors
    const highMatchBadge = screen.getByText("85%");
    const mediumMatchBadge = screen.getByText("65%");
    const lowMatchBadge = screen.getByText("45%");

    expect(highMatchBadge).toBeInTheDocument();
    expect(mediumMatchBadge).toBeInTheDocument();
    expect(lowMatchBadge).toBeInTheDocument();
  });

  it("maintains component stability during re-renders", () => {
    const { rerender } = render(<HeroSection />);

    // Check initial render
    expect(screen.getByText("Transform Your")).toBeInTheDocument();

    // Re-render
    rerender(<HeroSection />);

    // Should still be there
    expect(screen.getByText("Transform Your")).toBeInTheDocument();
    expect(
      screen.getByText("AI-Powered Career Intelligence Platform")
    ).toBeInTheDocument();
  });
});
