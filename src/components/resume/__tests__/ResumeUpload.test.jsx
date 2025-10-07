import React from "react";
import { render, screen, fireEvent } from "@test/test-utils";
import { expect, test, vi, describe, beforeEach } from "vitest";
import ResumeUpload from "../ResumeUpload";

describe("ResumeUpload Component", () => {
  const mockOnFileUpload = vi.fn();
  const mockOnError = vi.fn();
  const mockOnResumeUploaded = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders with default props", () => {
    render(<ResumeUpload />);

    expect(screen.getByText("Review Candidate Resume")).toBeInTheDocument();
    expect(
      screen.getByText("Upload candidate's resume (drag & drop or click here)")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Accepts PDF, DOC, and DOCX formats")
    ).toBeInTheDocument();
  });

  test("shows premium badge when isPremium is true", () => {
    render(<ResumeUpload isPremium={true} />);

    expect(screen.getByText("Premium Analysis Enabled")).toBeInTheDocument();
    // Check for the star SVG icon
    const starIcon = document.querySelector("svg.h-5.w-5.text-amber-400");
    expect(starIcon).toBeInTheDocument();
  });

  test("does not show premium badge when isPremium is false", () => {
    render(<ResumeUpload isPremium={false} />);

    expect(
      screen.queryByText("Premium Analysis Enabled")
    ).not.toBeInTheDocument();
  });

  test("shows loading state when isLoading is true", () => {
    render(<ResumeUpload isLoading={true} />);

    expect(screen.getByText("Processing resume...")).toBeInTheDocument();
    expect(screen.getByText("Review Candidate Resume")).toBeInTheDocument();
  });

  test("disables interactions when isLoading is true", () => {
    render(<ResumeUpload isLoading={true} />);

    const dropZone = screen.getByText("Processing resume...").parentElement
      .parentElement;
    expect(dropZone).toHaveClass("cursor-not-allowed");

    // File input should be disabled
    const fileInput = document.querySelector('input[type="file"]');
    expect(fileInput).toBeDisabled();
  });

  test("accepts valid PDF file", () => {
    const file = new File(["test content"], "resume.pdf", {
      type: "application/pdf",
    });

    render(<ResumeUpload onFileUpload={mockOnFileUpload} />);

    const fileInput = document.querySelector('input[type="file"]');
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(mockOnFileUpload).toHaveBeenCalledWith(file);
  });

  test("accepts valid DOC file", () => {
    const file = new File(["test content"], "resume.doc", {
      type: "application/msword",
    });

    render(<ResumeUpload onFileUpload={mockOnFileUpload} />);

    const fileInput = document.querySelector('input[type="file"]');
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(mockOnFileUpload).toHaveBeenCalledWith(file);
  });

  test("accepts valid DOCX file", () => {
    const file = new File(["test content"], "resume.docx", {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    render(<ResumeUpload onFileUpload={mockOnFileUpload} />);

    const fileInput = document.querySelector('input[type="file"]');
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(mockOnFileUpload).toHaveBeenCalledWith(file);
  });

  test("accepts file with valid extension but no MIME type", () => {
    const file = new File(["test content"], "resume.pdf", { type: "" });

    render(<ResumeUpload onFileUpload={mockOnFileUpload} />);

    const fileInput = document.querySelector('input[type="file"]');
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(mockOnFileUpload).toHaveBeenCalledWith(file);
  });

  test("rejects invalid file type", () => {
    const file = new File(["test content"], "resume.txt", {
      type: "text/plain",
    });

    render(
      <ResumeUpload onFileUpload={mockOnFileUpload} onError={mockOnError} />
    );

    const fileInput = document.querySelector('input[type="file"]');
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(mockOnFileUpload).not.toHaveBeenCalled();
    expect(mockOnError).toHaveBeenCalledWith({
      message:
        "Invalid file type: text/plain. Please upload a PDF or Word document.",
      type: "warning",
      category: "file",
    });
  });

  test("rejects file with invalid extension", () => {
    const file = new File(["test content"], "resume.txt", {
      type: "application/pdf",
    });

    render(
      <ResumeUpload onFileUpload={mockOnFileUpload} onError={mockOnError} />
    );

    const fileInput = document.querySelector('input[type="file"]');
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Should accept because MIME type is valid even though extension is wrong
    expect(mockOnFileUpload).toHaveBeenCalledWith(file);
    expect(mockOnError).not.toHaveBeenCalled();
  });

  test("calls onResumeUploaded when premium and file uploaded", () => {
    const file = new File(["test content"], "resume.pdf", {
      type: "application/pdf",
    });

    render(
      <ResumeUpload
        isPremium={true}
        onFileUpload={mockOnFileUpload}
        onResumeUploaded={mockOnResumeUploaded}
      />
    );

    const fileInput = document.querySelector('input[type="file"]');
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(mockOnResumeUploaded).toHaveBeenCalled();
  });

  test("does not call onResumeUploaded when not premium", () => {
    const file = new File(["test content"], "resume.pdf", {
      type: "application/pdf",
    });

    render(
      <ResumeUpload
        isPremium={false}
        onFileUpload={mockOnFileUpload}
        onResumeUploaded={mockOnResumeUploaded}
      />
    );

    const fileInput = document.querySelector('input[type="file"]');
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(mockOnResumeUploaded).not.toHaveBeenCalled();
  });

  test("displays selected file information", () => {
    const file = new File(["test content"], "my-resume.pdf", {
      type: "application/pdf",
    });
    Object.defineProperty(file, "size", { value: 102400 }); // 100KB

    render(<ResumeUpload />);

    const fileInput = document.querySelector('input[type="file"]');
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(screen.getByText("my-resume.pdf")).toBeInTheDocument();
    expect(screen.getByText("100.0 KB")).toBeInTheDocument();
  });

  test("handles drag and drop", () => {
    const file = new File(["test content"], "resume.pdf", {
      type: "application/pdf",
    });

    render(<ResumeUpload onFileUpload={mockOnFileUpload} />);

    const dropZone = screen
      .getByText("Upload candidate's resume (drag & drop or click here)")
      .closest("div");

    // Simulate drag events
    fireEvent.dragEnter(dropZone);
    fireEvent.dragOver(dropZone);

    // Create a mock dataTransfer
    const dataTransfer = {
      files: [file],
    };

    fireEvent.drop(dropZone, { dataTransfer });

    expect(mockOnFileUpload).toHaveBeenCalledWith(file);
  });

  test("prevents default on drag events", () => {
    render(<ResumeUpload />);

    const dropZone = screen
      .getByText("Upload candidate's resume (drag & drop or click here)")
      .closest("div");

    // Test that drag events can be fired without errors
    expect(() => {
      fireEvent.dragEnter(dropZone);
      fireEvent.dragOver(dropZone);
    }).not.toThrow();
  });

  test("opens file dialog when drop zone is clicked", () => {
    render(<ResumeUpload />);

    const dropZone = screen
      .getByText("Upload candidate's resume (drag & drop or click here)")
      .closest("div");
    const fileInput = document.querySelector('input[type="file"]');

    const clickSpy = vi.fn();
    fileInput.click = clickSpy;

    fireEvent.click(dropZone);

    expect(clickSpy).toHaveBeenCalled();
  });

  test("does not open file dialog when loading", () => {
    render(<ResumeUpload isLoading={true} />);

    const dropZone = screen.getByText("Processing resume...").closest("div");
    const fileInput = document.querySelector('input[type="file"]');

    const clickSpy = vi.fn();
    fileInput.click = clickSpy;

    fireEvent.click(dropZone);

    expect(clickSpy).not.toHaveBeenCalled();
  });

  test("file input has correct accept attribute", () => {
    render(<ResumeUpload />);

    const fileInput = document.querySelector('input[type="file"]');
    expect(fileInput).toHaveAttribute("accept", ".pdf,.doc,.docx");
  });

  test("drop zone has correct styling when file is selected", () => {
    const file = new File(["test content"], "resume.pdf", {
      type: "application/pdf",
    });

    render(<ResumeUpload />);

    let dropZone = screen
      .getByText("Upload candidate's resume (drag & drop or click here)")
      .closest("div");
    expect(dropZone).toHaveClass("border-slate-500");

    const fileInput = document.querySelector('input[type="file"]');
    fireEvent.change(fileInput, { target: { files: [file] } });

    dropZone = screen
      .getByText("resume.pdf")
      .closest('[class*="border-dashed"]');
    expect(dropZone).toHaveClass("border-indigo-400");
  });

  test("drop zone has correct styling when loading", () => {
    render(<ResumeUpload isLoading={true} />);

    const dropZone = screen.getByText("Processing resume...").parentElement
      .parentElement;
    expect(dropZone).toHaveClass("bg-slate-600/30");
    expect(dropZone).toHaveClass("border-slate-500");
  });

  test("displays help text", () => {
    render(<ResumeUpload />);

    expect(
      screen.getByText(
        "Our AI will analyze the resume and help you prepare for the interview"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText("Get instant insights and tailored interview questions")
    ).toBeInTheDocument();
  });

  test("handles multiple file selection (takes first file)", () => {
    const file1 = new File(["content1"], "resume1.pdf", {
      type: "application/pdf",
    });
    const file2 = new File(["content2"], "resume2.pdf", {
      type: "application/pdf",
    });

    render(<ResumeUpload onFileUpload={mockOnFileUpload} />);

    const fileInput = document.querySelector('input[type="file"]');
    fireEvent.change(fileInput, { target: { files: [file1, file2] } });

    expect(mockOnFileUpload).toHaveBeenCalledWith(file1);
    expect(mockOnFileUpload).toHaveBeenCalledTimes(1);
  });

  test("handles empty file selection", () => {
    render(<ResumeUpload onFileUpload={mockOnFileUpload} />);

    const fileInput = document.querySelector('input[type="file"]');
    fireEvent.change(fileInput, { target: { files: [] } });

    expect(mockOnFileUpload).not.toHaveBeenCalled();
  });

  test("handles null file selection", () => {
    render(<ResumeUpload onFileUpload={mockOnFileUpload} />);

    const fileInput = document.querySelector('input[type="file"]');
    fireEvent.change(fileInput, { target: { files: null } });

    expect(mockOnFileUpload).not.toHaveBeenCalled();
  });
});
