import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@test/test-utils";
import FAQDropdown from "../FAQDropdown";

describe("FAQDropdown", () => {
  const defaultProps = {
    question: "What is JobPsych?",
    answer:
      "JobPsych is an AI-powered career platform that helps with resume optimization, interview preparation, and career guidance.",
    type: "general",
  };

  it("renders the FAQ dropdown with question", () => {
    render(<FAQDropdown {...defaultProps} />);

    expect(screen.getByText("What is JobPsych?")).toBeInTheDocument();
  });

  it("does not show answer initially", () => {
    render(<FAQDropdown {...defaultProps} />);

    expect(
      screen.queryByText(/JobPsych is an AI-powered career platform/),
    ).not.toBeInTheDocument();
  });

  it("toggles answer visibility when clicked", () => {
    render(<FAQDropdown {...defaultProps} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(
      screen.getByText(/JobPsych is an AI-powered career platform/),
    ).toBeInTheDocument();

    fireEvent.click(button);
    expect(
      screen.queryByText(/JobPsych is an AI-powered career platform/),
    ).not.toBeInTheDocument();
  });

  it("applies correct styling for general type", () => {
    const { container } = render(<FAQDropdown {...defaultProps} />);

    const dropdown = container.firstChild;
    expect(dropdown).toHaveClass("bg-slate-800", "border-indigo-500/30");
  });

  it("applies correct styling for interview type", () => {
    const { container } = render(
      <FAQDropdown {...defaultProps} type="interview" />,
    );

    const dropdown = container.firstChild;
    expect(dropdown).toHaveClass("bg-slate-800", "border-purple-500/30");
  });

  it("applies correct styling for career type", () => {
    const { container } = render(
      <FAQDropdown {...defaultProps} type="career" />,
    );

    const dropdown = container.firstChild;
    expect(dropdown).toHaveClass("bg-slate-800", "border-blue-500/30");
  });

  it("applies correct styling for hiring type", () => {
    const { container } = render(
      <FAQDropdown {...defaultProps} type="document" />,
    );

    const dropdown = container.firstChild;
    expect(dropdown).toHaveClass("bg-slate-800", "border-emerald-500/30");
  });

  it("applies correct styling for ats type", () => {
    const { container } = render(
      <FAQDropdown {...defaultProps} type="interview" />,
    );

    const dropdown = container.firstChild;
    expect(dropdown).toHaveClass("bg-slate-800", "border-purple-500/30");
  });

  it("displays type badge for general", () => {
    render(<FAQDropdown {...defaultProps} />);

    expect(screen.getByText("General")).toBeInTheDocument();
  });

  it("displays type badge for interview", () => {
    render(<FAQDropdown {...defaultProps} type="interview" />);

    expect(screen.getByText("Interview Practice")).toBeInTheDocument();
  });

  it("displays type badge for career", () => {
    render(<FAQDropdown {...defaultProps} type="career" />);

    expect(screen.getByText("Career Path Exploration")).toBeInTheDocument();
  });

  it("displays type badge for hiring", () => {
    render(<FAQDropdown {...defaultProps} type="document" />);

    expect(
      screen.getByText("Professional Document Analysis"),
    ).toBeInTheDocument();
  });

  it("displays type badge for ats", () => {
    render(<FAQDropdown {...defaultProps} type="interview" />);

    expect(screen.getByText("Interview Practice")).toBeInTheDocument();
  });

  it("rotates chevron icon when expanded", () => {
    const { container } = render(<FAQDropdown {...defaultProps} />);

    const chevron = container.querySelector("svg");
    expect(chevron).not.toHaveClass("rotate-180");

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(chevron).toHaveClass("rotate-180");
  });

  it("has correct accessibility attributes", () => {
    render(<FAQDropdown {...defaultProps} />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
  });

  it("applies hover effects to button", () => {
    render(<FAQDropdown {...defaultProps} />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass(
      "transition-all",
      "duration-300",
      "cursor-pointer",
    );
  });

  it("changes background color when expanded", () => {
    render(<FAQDropdown {...defaultProps} />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-slate-700/50");

    fireEvent.click(button);
    expect(button).toHaveClass("bg-indigo-900/30");
  });

  it("displays pro tip for ats type", () => {
    render(<FAQDropdown {...defaultProps} type="interview" />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(screen.getByText("Pro Tip:")).toBeInTheDocument();
    expect(
      screen.getByText(/Use the AI-Assisted Interview Practice Module/),
    ).toBeInTheDocument();
  });

  it("displays pro tip for interview type", () => {
    render(<FAQDropdown {...defaultProps} type="interview" />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(screen.getByText("Pro Tip:")).toBeInTheDocument();
    expect(
      screen.getByText(/Use the AI-Assisted Interview Practice Module/),
    ).toBeInTheDocument();
  });

  it("displays pro tip for career type", () => {
    render(<FAQDropdown {...defaultProps} type="career" />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(screen.getByText("Pro Tip:")).toBeInTheDocument();
    expect(
      screen.getByText(/Use Career Path Exploration Module/),
    ).toBeInTheDocument();
  });

  it("displays pro tip for general type", () => {
    render(<FAQDropdown {...defaultProps} type="general" />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(screen.getByText("Pro Tip:")).toBeInTheDocument();
    expect(
      screen.getByText(/Our comprehensive AI-Based Career Readiness/),
    ).toBeInTheDocument();
  });

  it("applies correct pro tip styling for ats", () => {
    render(<FAQDropdown {...defaultProps} type="interview" />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    const proTipBox = screen
      .getByText("Pro Tip:")
      .closest('[class*="bg-purple-900/30"]');
    expect(proTipBox).toHaveClass("bg-purple-900/30", "border-purple-500/30");
  });

  it("applies correct pro tip styling for interview", () => {
    render(<FAQDropdown {...defaultProps} type="interview" />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    const proTipBox = screen
      .getByText("Pro Tip:")
      .closest('[class*="bg-purple-900/30"]');
    expect(proTipBox).toHaveClass("bg-purple-900/30", "border-purple-500/30");
  });

  it("applies correct pro tip styling for career", () => {
    render(<FAQDropdown {...defaultProps} type="career" />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    const proTipBox = screen
      .getByText("Pro Tip:")
      .closest('[class*="bg-blue-900/30"]');
    expect(proTipBox).toHaveClass("bg-blue-900/30", "border-blue-500/30");
  });

  it("applies correct pro tip styling for hiring", () => {
    render(<FAQDropdown {...defaultProps} type="document" />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    const proTipBox = screen
      .getByText("Pro Tip:")
      .closest('[class*="bg-emerald-900/30"]');
    expect(proTipBox).toHaveClass("bg-emerald-900/30", "border-emerald-500/30");
  });

  it("applies correct pro tip styling for general", () => {
    render(<FAQDropdown {...defaultProps} type="general" />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    const proTipBox = screen
      .getByText("Pro Tip:")
      .closest('[class*="bg-indigo-900/30"]');
    expect(proTipBox).toHaveClass("bg-indigo-900/30", "border-indigo-500/30");
  });

  it("has smooth expand/collapse animation", () => {
    const { container } = render(<FAQDropdown {...defaultProps} />);

    const content = container.querySelector('[class*="overflow-hidden"]');
    expect(content).toHaveClass(
      "transition-all",
      "duration-500",
      "overflow-hidden",
    );
    expect(content).toHaveAttribute(
      "style",
      "transition-property: max-height, opacity;",
    );
  });

  it("displays animated indicator for interview type", () => {
    const { container } = render(
      <FAQDropdown {...defaultProps} type="interview" />,
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    const animatedDot = container.querySelector('[class*="animate-pulse"]');
    expect(animatedDot).toBeInTheDocument();
    expect(screen.getByText("Interview Practice Feature")).toBeInTheDocument();
  });

  it("renders answer with proper formatting", () => {
    render(<FAQDropdown {...defaultProps} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    const answerDiv = screen.getByText(
      /JobPsych is an AI-powered career platform/,
    );
    expect(answerDiv).toHaveClass("prose", "prose-sm", "max-w-none");
  });

  it("maintains state correctly through multiple toggles", () => {
    render(<FAQDropdown {...defaultProps} />);

    const button = screen.getByRole("button");

    // Click to open
    fireEvent.click(button);
    expect(
      screen.getByText(/JobPsych is an AI-powered career platform/),
    ).toBeInTheDocument();

    // Click to close
    fireEvent.click(button);
    expect(
      screen.queryByText(/JobPsych is an AI-powered career platform/),
    ).not.toBeInTheDocument();

    // Click to open again
    fireEvent.click(button);
    expect(
      screen.getByText(/JobPsych is an AI-powered career platform/),
    ).toBeInTheDocument();
  });

  it("applies focus styles correctly", () => {
    render(<FAQDropdown {...defaultProps} />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("focus:outline-none");
  });
});
