import React from "react";
import { render, screen, fireEvent, act } from "@test/test-utils";
import { expect, test, vi, describe, beforeEach, afterEach } from "vitest";
import Chatbot from "../Chatbot";

// Mock the useAIChat hook
vi.mock("../../hooks/useAIChat.js", () => ({
  useAIChat: vi.fn(),
}));

import { useAIChat } from "../../hooks/useAIChat.js";

describe("Chatbot Component", () => {
  const mockSendMessage = vi.fn().mockResolvedValue(undefined);
  const mockChangeSessionType = vi.fn();

  const defaultMockReturn = {
    messages: [],
    isLoading: false,
    error: null,
    sessionType: "general",
    sendMessage: mockSendMessage,
    changeSessionType: mockChangeSessionType,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    useAIChat.mockReturnValue(defaultMockReturn);
    vi.useFakeTimers();

    // Mock scrollIntoView to prevent errors
    Element.prototype.scrollIntoView = vi.fn();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  test("renders chatbot button with initial state", () => {
    render(<Chatbot />);

    const chatbotButton = screen.getByRole("button", {
      name: /open ai assistant/i,
    });
    expect(chatbotButton).toBeInTheDocument();

    // Chat window should be rendered but not visible initially
    const chatWindow = screen
      .getByText("JobPsych AI")
      .closest(".fixed.bottom-24");
    expect(chatWindow).toHaveClass("opacity-0", "pointer-events-none");
  });

  test("opens chat window when button is clicked", () => {
    render(<Chatbot />);

    const chatbotButton = screen.getByRole("button", {
      name: /open ai assistant/i,
    });
    act(() => {
      act(() => {
        fireEvent.click(chatbotButton);
      });
    });

    const chatWindow = screen
      .getByText("JobPsych AI")
      .closest(".fixed.bottom-24");
    expect(chatWindow).toHaveClass("opacity-100", "scale-100");
  });

  test("closes chat window when button is clicked again", () => {
    render(<Chatbot />);

    // Open chat
    const chatbotButton = screen.getByRole("button", {
      name: /open ai assistant/i,
    });
    act(() => {
      act(() => {
        fireEvent.click(chatbotButton);
      });
    });

    expect(screen.getByText("JobPsych AI")).toBeInTheDocument();

    // Click button again to close
    act(() => {
      act(() => {
        fireEvent.click(chatbotButton);
      });
    });

    // Chat window should still be rendered but not visible
    const chatWindow = screen
      .getByText("JobPsych AI")
      .closest(".fixed.bottom-24");
    expect(chatWindow).toHaveClass("opacity-0", "pointer-events-none");
  });

  test("closes chat window when clicking backdrop", () => {
    render(<Chatbot />);

    // Open chat
    const chatbotButton = screen.getByRole("button", {
      name: /open ai assistant/i,
    });
    act(() => {
      act(() => {
        fireEvent.click(chatbotButton);
      });
    });

    expect(screen.getByText("JobPsych AI")).toBeInTheDocument();

    // Click backdrop to close
    const backdrop = document.querySelector(".fixed.inset-0.z-30");
    act(() => {
      act(() => {
        fireEvent.click(backdrop);
      });
    });

    // Chat window should still be rendered but not visible
    const chatWindow = screen
      .getByText("JobPsych AI")
      .closest(".fixed.bottom-24");
    expect(chatWindow).toHaveClass("opacity-0", "pointer-events-none");
  });

  test("displays messages correctly", () => {
    const messages = [
      {
        id: "1",
        sender: "user",
        text: "Hello",
        timestamp: new Date(),
      },
      {
        id: "2",
        sender: "assistant",
        text: "Hi there!",
        timestamp: new Date(),
      },
    ];

    useAIChat.mockReturnValue({
      ...defaultMockReturn,
      messages,
    });

    render(<Chatbot />);

    const chatbotButton = screen.getByRole("button", {
      name: /open ai assistant/i,
    });
    act(() => {
      act(() => {
        fireEvent.click(chatbotButton);
      });
    });

    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(screen.getByText("Hi there!")).toBeInTheDocument();
  });

  test("displays user messages on the right side", () => {
    const messages = [
      {
        id: "1",
        sender: "user",
        text: "User message",
        timestamp: new Date(),
      },
    ];

    useAIChat.mockReturnValue({
      ...defaultMockReturn,
      messages,
    });

    render(<Chatbot />);

    const chatbotButton = screen.getByRole("button", {
      name: /open ai assistant/i,
    });
    act(() => {
      act(() => {
        fireEvent.click(chatbotButton);
      });
    });

    const messageContainer =
      screen.getByText("User message").parentElement.parentElement;
    expect(messageContainer).toHaveClass("justify-end");
  });

  test("displays assistant messages on the left side", () => {
    const messages = [
      {
        id: "1",
        sender: "assistant",
        text: "Assistant message",
        timestamp: new Date(),
      },
    ];

    useAIChat.mockReturnValue({
      ...defaultMockReturn,
      messages,
    });

    render(<Chatbot />);

    const chatbotButton = screen.getByRole("button", {
      name: /open ai assistant/i,
    });
    act(() => {
      fireEvent.click(chatbotButton);
    });

    const messageContainer =
      screen.getByText("Assistant message").parentElement.parentElement;
    expect(messageContainer).toHaveClass("justify-start");
  });

  test("shows typing indicator when loading", () => {
    useAIChat.mockReturnValue({
      ...defaultMockReturn,
      isLoading: true,
    });

    render(<Chatbot />);

    const chatbotButton = screen.getByRole("button", {
      name: /open ai assistant/i,
    });
    act(() => {
      fireEvent.click(chatbotButton);
    });

    expect(screen.getByText("AI is thinking...")).toBeInTheDocument();
  });

  test("shows error message when there is an error", () => {
    const errorMessage = "Something went wrong";
    useAIChat.mockReturnValue({
      ...defaultMockReturn,
      error: errorMessage,
    });

    render(<Chatbot />);

    const chatbotButton = screen.getByRole("button", {
      name: /open ai assistant/i,
    });
    act(() => {
      fireEvent.click(chatbotButton);
    });

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByText("Try again")).toBeInTheDocument();
  });

  test("sends message when send button is clicked", () => {
    render(<Chatbot />);

    const chatbotButton = screen.getByRole("button", {
      name: /open ai assistant/i,
    });
    act(() => {
      fireEvent.click(chatbotButton);
    });

    const input = screen.getByPlaceholderText(
      "Ask me anything about your career..."
    );
    const sendButton = screen
      .getAllByRole("button")
      .find((btn) =>
        btn.querySelector('svg path[d*="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"]')
      );

    act(() => {
      fireEvent.change(input, { target: { value: "Test message" } });
    });
    act(() => {
      fireEvent.click(sendButton);
    });

    expect(mockSendMessage).toHaveBeenCalledWith("Test message");
  });

  test("sends message when Enter is pressed", () => {
    render(<Chatbot />);

    const chatbotButton = screen.getByRole("button", {
      name: /open ai assistant/i,
    });
    act(() => {
      fireEvent.click(chatbotButton);
    });

    const input = screen.getByPlaceholderText(
      "Ask me anything about your career..."
    );

    act(() => {
      fireEvent.change(input, { target: { value: "Test message" } });
    });
    act(() => {
      fireEvent.keyDown(input, { key: "Enter", code: "Enter", charCode: 13 });
    });

    expect(mockSendMessage).toHaveBeenCalledWith("Test message");
  });

  test("does not send message when Shift+Enter is pressed", () => {
    render(<Chatbot />);

    const chatbotButton = screen.getByRole("button", {
      name: /open ai assistant/i,
    });
    act(() => {
      fireEvent.click(chatbotButton);
    });

    const input = screen.getByPlaceholderText(
      "Ask me anything about your career..."
    );

    act(() => {
      fireEvent.change(input, { target: { value: "Test message" } });
    });
    act(() => {
      fireEvent.keyDown(input, {
        key: "Enter",
        code: "Enter",
        charCode: 13,
        shiftKey: true,
      });
    });

    expect(mockSendMessage).not.toHaveBeenCalled();
  });

  test("clears input after sending message", () => {
    render(<Chatbot />);

    const chatbotButton = screen.getByRole("button", {
      name: /open ai assistant/i,
    });
    act(() => {
      fireEvent.click(chatbotButton);
    });

    const input = screen.getByPlaceholderText(
      "Ask me anything about your career..."
    );

    act(() => {
      fireEvent.change(input, { target: { value: "Test message" } });
    });
    act(() => {
      fireEvent.keyDown(input, { key: "Enter", code: "Enter", charCode: 13 });
    });

    expect(input.value).toBe("");
  });

  test("disables send button when input is empty", () => {
    render(<Chatbot />);

    const chatbotButton = screen.getByRole("button", {
      name: /open ai assistant/i,
    });
    act(() => {
      fireEvent.click(chatbotButton);
    });

    const sendButton = screen
      .getAllByRole("button")
      .find((btn) =>
        btn.querySelector('svg path[d*="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"]')
      );
    expect(sendButton).toBeDisabled();
  });

  test("disables send button when loading", () => {
    useAIChat.mockReturnValue({
      ...defaultMockReturn,
      isLoading: true,
    });

    render(<Chatbot />);

    const chatbotButton = screen.getByRole("button", {
      name: /open ai assistant/i,
    });
    act(() => {
      fireEvent.click(chatbotButton);
    });

    const sendButton = screen
      .getAllByRole("button")
      .find(
        (btn) =>
          btn.querySelector(
            'svg path[d*="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"]'
          ) || btn.querySelector(".animate-spin")
      );
    expect(sendButton).toBeDisabled();
  });

  test("disables input when loading", () => {
    useAIChat.mockReturnValue({
      ...defaultMockReturn,
      isLoading: true,
    });

    render(<Chatbot />);

    const chatbotButton = screen.getByRole("button", {
      name: /open ai assistant/i,
    });
    act(() => {
      fireEvent.click(chatbotButton);
    });

    const input = screen.getByPlaceholderText(
      "Ask me anything about your career..."
    );
    expect(input).toBeDisabled();
  });

  test("changes session type when select is changed", () => {
    render(<Chatbot />);

    const chatbotButton = screen.getByRole("button", {
      name: /open ai assistant/i,
    });
    act(() => {
      fireEvent.click(chatbotButton);
    });

    const select = screen.getByDisplayValue("General");
    act(() => {
      fireEvent.change(select, { target: { value: "coaching" } });
    });

    expect(mockChangeSessionType).toHaveBeenCalledWith("coaching");
  });

  test("shows clear button when input has value", () => {
    render(<Chatbot />);

    const chatbotButton = screen.getByRole("button", {
      name: /open ai assistant/i,
    });
    act(() => {
      fireEvent.click(chatbotButton);
    });

    const input = screen.getByPlaceholderText(
      "Ask me anything about your career..."
    );

    // Clear button should not be visible when input is empty
    const clearButtons = screen
      .queryAllByRole("button")
      .filter(
        (btn) =>
          btn.className.includes("absolute") &&
          btn.className.includes("right-3")
      );
    expect(clearButtons).toHaveLength(0);

    act(() => {
      fireEvent.change(input, { target: { value: "Test" } });
    });

    // Clear button should appear when input has value
    const clearButtonAfter = screen
      .getAllByRole("button")
      .find(
        (btn) =>
          btn.className.includes("absolute") &&
          btn.className.includes("right-3")
      );
    expect(clearButtonAfter).toBeInTheDocument();
  });

  test("clears input when clear button is clicked", () => {
    render(<Chatbot />);

    const chatbotButton = screen.getByRole("button", {
      name: /open ai assistant/i,
    });
    act(() => {
      fireEvent.click(chatbotButton);
    });

    const input = screen.getByPlaceholderText(
      "Ask me anything about your career..."
    );
    act(() => {
      fireEvent.change(input, { target: { value: "Test message" } });
    });

    const clearButton = screen
      .getAllByRole("button")
      .find(
        (btn) =>
          btn.className.includes("absolute") &&
          btn.className.includes("right-3")
      );
    act(() => {
      fireEvent.click(clearButton);
    });

    expect(input.value).toBe("");
  });

  test("focuses input when chat is opened", () => {
    render(<Chatbot />);

    const chatbotButton = screen.getByRole("button", {
      name: /open ai assistant/i,
    });
    act(() => {
      fireEvent.click(chatbotButton);
    });

    const input = screen.getByPlaceholderText(
      "Ask me anything about your career..."
    );
    expect(document.activeElement).toBe(input);
  });

  test("displays timestamps correctly", () => {
    const testTime = new Date("2024-01-01T14:30:00");
    const messages = [
      {
        id: "1",
        sender: "user",
        text: "Hello",
        timestamp: testTime,
      },
    ];

    useAIChat.mockReturnValue({
      ...defaultMockReturn,
      messages,
    });

    render(<Chatbot />);

    const chatbotButton = screen.getByRole("button", {
      name: /open ai assistant/i,
    });
    act(() => {
      fireEvent.click(chatbotButton);
    });

    expect(screen.getByText("02:30 PM")).toBeInTheDocument();
  });

  test("shows online status indicator", () => {
    render(<Chatbot />);

    const chatbotButton = screen.getByRole("button", {
      name: /open ai assistant/i,
    });
    act(() => {
      fireEvent.click(chatbotButton);
    });

    expect(screen.getByText("Online")).toBeInTheDocument();
  });

  test("has proper accessibility attributes", () => {
    render(<Chatbot />);

    const chatbotButton = screen.getByRole("button", {
      name: /open ai assistant/i,
    });
    expect(chatbotButton).toHaveAttribute("aria-label", "Open AI Assistant");
  });

  test("renders entrance animation classes", () => {
    render(<Chatbot />);

    const container = screen.getByRole("button", {
      name: /open ai assistant/i,
    }).parentElement;
    expect(container).toHaveClass("transition-all");
    expect(container).toHaveClass("duration-700");
  });

  test("chat window has proper z-index when open", () => {
    render(<Chatbot />);

    const chatbotButton = screen.getByRole("button", {
      name: /open ai assistant/i,
    });
    act(() => {
      fireEvent.click(chatbotButton);
    });

    const chatWindow = screen
      .getByText("JobPsych AI")
      .closest(".fixed.bottom-24");
    expect(chatWindow).toHaveClass("z-40");
  });

  test("backdrop appears when chat is open", () => {
    render(<Chatbot />);

    expect(screen.queryByTestId("chat-backdrop")).not.toBeInTheDocument();

    const chatbotButton = screen.getByRole("button", {
      name: /open ai assistant/i,
    });
    act(() => {
      fireEvent.click(chatbotButton);
    });

    const backdrop = document.querySelector(".fixed.inset-0.z-30");
    expect(backdrop).toBeInTheDocument();
  });

  test("send button shows loading spinner when loading", () => {
    useAIChat.mockReturnValue({
      ...defaultMockReturn,
      isLoading: true,
    });

    render(<Chatbot />);

    const chatbotButton = screen.getByRole("button", {
      name: /open ai assistant/i,
    });
    act(() => {
      fireEvent.click(chatbotButton);
    });

    // Should show spinner instead of send icon
    const sendButton = screen
      .getAllByRole("button")
      .find((btn) => btn.querySelector(".animate-spin"));
    expect(sendButton).toBeInTheDocument();
    const spinner = sendButton.querySelector(".animate-spin");
    expect(spinner).toBeInTheDocument();
  });
});
