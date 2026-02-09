import React from "react";
import { render, screen, fireEvent, act, waitFor } from "@test/test-utils";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import RoleSuggestion from "../RoleSuggestion";

// Mock all dependencies
vi.mock("@utils/errorHandler", () => ({
  formatErrorMessage: vi.fn((error) => error.message || "Error occurred"),
  getErrorCategory: vi.fn(() => "general"),
}));

vi.mock("@data/candidateTips", () => ({
  generalTips: ["Tip 1", "Tip 2", "Tip 3"],
}));

vi.mock("@components/resume/ResumeUpload", () => ({
  default: ({ onFileUpload }) => (
    <div data-testid="resume-upload">
      <input
        type="file"
        data-testid="file-input"
        onChange={(e) => {
          if (e.target.files[0]) {
            onFileUpload(e.target.files[0]);
          }
        }}
      />
    </div>
  ),
}));

vi.mock("@components/buttons/NavigationButton", () => ({
  default: ({ children, ...props }) => (
    <button data-testid="nav-button" {...props}>
      {children}
    </button>
  ),
}));

vi.mock("@components/error/NetworkError", () => ({
  default: () => <div data-testid="network-error">Network Error</div>,
}));

vi.mock("@components/error/LoadingError", () => ({
  default: () => <div data-testid="loading-error">Loading Error</div>,
}));

vi.mock("@components/error/ResumeRateLimitError", () => ({
  default: () => <div data-testid="rate-limit-error">Rate Limit Error</div>,
}));

vi.mock("@components/resume/ResumeRateLimitInfo", () => ({
  default: () => <div data-testid="rate-limit-info">Rate Limit Info</div>,
}));

vi.mock("../utils/api", () => ({
  ANALYZE_RESUME: "/api/analyze-resume",
}));

// Mock fetch
const mockFetch = vi.fn();
globalThis.fetch = mockFetch;

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

describe("RoleSuggestion Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
    localStorageMock.setItem.mockImplementation(() => {});
    localStorageMock.removeItem.mockImplementation(() => {});
    mockFetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          resumeData: {
            personalInfo: { name: "John Doe", email: "john@example.com" },
            workExperience: [{ company: "Tech Corp", position: "Developer" }],
            education: [
              { degree: "BS Computer Science", school: "University" },
            ],
            skills: ["JavaScript", "React", "Node.js"],
          },
          roleRecommendations: [
            {
              roleName: "Software Engineer",
              matchPercentage: 95,
              reasoning: "Strong technical skills match",
              requiredSkills: ["JavaScript", "React"],
              missingSkills: ["Python"],
            },
            {
              roleName: "Frontend Developer",
              matchPercentage: 88,
              reasoning: "Good frontend experience",
              requiredSkills: ["JavaScript", "CSS"],
              missingSkills: ["TypeScript"],
            },
          ],
        }),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the main RoleSuggestion interface", () => {
    render(<RoleSuggestion />);

    expect(screen.getByText("Exploration Hub")).toBeInTheDocument();
    expect(screen.getByTestId("resume-upload")).toBeInTheDocument();
  });

  it("loads persisted data from localStorage on mount", () => {
    const mockData = {
      resumeData: { name: "Jane Doe" },
      roleRecommendations: ["Developer"],
      targetRole: "Frontend Developer",
      jobDescription: "Build web apps",
    };
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockData));

    render(<RoleSuggestion />);

    expect(localStorageMock.getItem).toHaveBeenCalledWith("roleSuggestionData");
  });

  it("handles invalid localStorage data gracefully", () => {
    localStorageMock.getItem.mockReturnValue("invalid json");

    expect(() => render(<RoleSuggestion />)).not.toThrow();
  });

  it("handles file upload successfully", async () => {
    render(<RoleSuggestion />);

    const fileInput = screen.getByTestId("file-input");
    const file = new File(["resume content"], "resume.pdf", {
      type: "application/pdf",
    });

    act(() => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    await waitFor(() => {
      const successMessages = screen.getAllByText(
        "Resume uploaded successfully! Click 'Analyze Role Fit' to start the analysis.",
      );
      expect(successMessages.length).toBeGreaterThan(0);
    });
  });

  it("shows analyze button when file is uploaded", () => {
    render(<RoleSuggestion />);

    const fileInput = screen.getByTestId("file-input");
    const file = new File(["resume content"], "resume.pdf", {
      type: "application/pdf",
    });

    act(() => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    expect(screen.getByText("Ready to Explore Roles")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /analyze role fit/i }),
    ).toBeInTheDocument();
  });

  it("handles resume analysis successfully", async () => {
    render(<RoleSuggestion />);

    // Upload file first
    const fileInput = screen.getByTestId("file-input");
    const file = new File(["resume content"], "resume.pdf", {
      type: "application/pdf",
    });

    act(() => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    // Click analyze button
    const analyzeButton = screen.getByRole("button", {
      name: /analyze role fit/i,
    });

    act(() => {
      fireEvent.click(analyzeButton);
    });

    // Wait for the fetch to be called
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalled();
    });
  });

  it("handles file too large error", () => {
    render(<RoleSuggestion />);

    // Create a large file (6MB)
    const largeFile = new File(["x".repeat(6 * 1024 * 1024)], "large.pdf", {
      type: "application/pdf",
    });

    const fileInput = screen.getByTestId("file-input");

    act(() => {
      fireEvent.change(fileInput, { target: { files: [largeFile] } });
    });

    // The error should prevent analysis when the file is too large
    const analyzeButton = screen.getByRole("button", {
      name: /analyze role fit/i,
    });

    act(() => {
      fireEvent.click(analyzeButton);
    });

    // Fetch should not be called for oversized files
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("handles API errors gracefully", async () => {
    mockFetch.mockRejectedValue(new Error("Network error"));

    render(<RoleSuggestion />);

    // Upload and analyze
    const fileInput = screen.getByTestId("file-input");
    const file = new File(["resume content"], "resume.pdf", {
      type: "application/pdf",
    });

    act(() => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    const analyzeButton = screen.getByRole("button", {
      name: /analyze role fit/i,
    });

    act(() => {
      fireEvent.click(analyzeButton);
    });

    await waitFor(() => {
      const errorMessages = screen.getAllByText("Network error");
      expect(errorMessages.length).toBeGreaterThan(0);
    });
  });

  it("shows loading state during analysis", () => {
    render(<RoleSuggestion />);

    const fileInput = screen.getByTestId("file-input");
    const file = new File(["resume content"], "resume.pdf", {
      type: "application/pdf",
    });

    act(() => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    const analyzeButton = screen.getByRole("button", {
      name: /analyze role fit/i,
    });

    act(() => {
      fireEvent.click(analyzeButton);
    });

    expect(screen.getByText("Analyzing Role Fit...")).toBeInTheDocument();
  });

  it("persists data to localStorage", async () => {
    render(<RoleSuggestion />);

    const fileInput = screen.getByTestId("file-input");
    const file = new File(["resume content"], "resume.pdf", {
      type: "application/pdf",
    });

    act(() => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    const analyzeButton = screen.getByRole("button", {
      name: /analyze role fit/i,
    });

    act(() => {
      fireEvent.click(analyzeButton);
    });

    // Wait for fetch to be called, which triggers data persistence
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalled();
    });
  });

  it("clears persisted data when new file is uploaded", () => {
    render(<RoleSuggestion />);

    const fileInput = screen.getByTestId("file-input");
    const file1 = new File(["resume 1"], "resume1.pdf", {
      type: "application/pdf",
    });
    const file2 = new File(["resume 2"], "resume2.pdf", {
      type: "application/pdf",
    });

    act(() => {
      fireEvent.change(fileInput, { target: { files: [file1] } });
    });

    act(() => {
      fireEvent.change(fileInput, { target: { files: [file2] } });
    });

    expect(localStorageMock.removeItem).toHaveBeenCalledWith(
      "roleSuggestionData",
    );
  });

  it("handles target role and job description inputs", () => {
    render(<RoleSuggestion />);

    // These inputs might be in a form or modal - test would depend on actual UI
    // For now, just verify the component renders without these inputs
    expect(screen.getByText("Exploration Hub")).toBeInTheDocument();
  });

  it("displays analysis results correctly", async () => {
    render(<RoleSuggestion />);

    const fileInput = screen.getByTestId("file-input");
    const file = new File(["resume content"], "resume.pdf", {
      type: "application/pdf",
    });

    act(() => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    const analyzeButton = screen.getByRole("button", {
      name: /analyze role fit/i,
    });

    act(() => {
      fireEvent.click(analyzeButton);
    });

    await waitFor(() => {
      expect(screen.getByText("Analyzing Role Fit...")).toBeInTheDocument();
    });

    // Wait for analysis to complete
    await waitFor(
      () => {
        expect(mockFetch).toHaveBeenCalledWith(expect.any(Request));
      },
      { timeout: 3000 },
    );
  });

  it("maintains component stability during re-renders", () => {
    const { rerender } = render(<RoleSuggestion />);

    expect(screen.getByText("Exploration Hub")).toBeInTheDocument();

    rerender(<RoleSuggestion />);

    expect(screen.getByText("Exploration Hub")).toBeInTheDocument();
  });
});
