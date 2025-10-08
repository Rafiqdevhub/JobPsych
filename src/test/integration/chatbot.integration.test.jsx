import React from "react";
import { render, screen, waitFor } from "../integration/test-utils";
import { IntegrationUtils } from "../integration/test-utils";
import { expect, test, describe, beforeEach, afterEach } from "vitest";
import userEvent from "@testing-library/user-event";

// Test-specific Chatbot component
const TestChatbot = () => {
  const [messages, setMessages] = React.useState([
    {
      id: 1,
      role: "assistant",
      content:
        "Hello! I'm JobPsych, your AI career assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        role: "assistant",
        content:
          "That's a great question! Based on your experience, I recommend focusing on building skills in that area.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="chatbot">
      <div className="messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.role}`}>
            <p>{message.content}</p>
            <span className="timestamp">
              {message.timestamp.toLocaleTimeString()}
            </span>
          </div>
        ))}
        {isLoading && <div className="loading">AI is thinking...</div>}
      </div>

      <div className="input-area">
        <input
          type="text"
          placeholder="Ask me anything about your career..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          onClick={handleSendMessage}
          disabled={isLoading || !inputValue.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
};

describe("Chatbot Integration Tests", () => {
  beforeEach(() => {
    // Setup MSW server before each test
    IntegrationUtils.setupMSW();
  });

  afterEach(() => {
    // Clean up after each test
    IntegrationUtils.cleanupMSW();
    IntegrationUtils.clearMockUser();
  });

  test("chatbot initializes and displays welcome message", async () => {
    render(<TestChatbot />);

    // Check welcome message
    expect(screen.getByText(/Hello! I'm JobPsych/i)).toBeInTheDocument();

    // Check input field is present
    const inputField = screen.getByPlaceholderText(
      /Ask me anything about your career/i
    );
    expect(inputField).toBeInTheDocument();

    // Check send button is present
    const sendButton = screen.getByRole("button", { name: /send/i });
    expect(sendButton).toBeInTheDocument();
  });

  test("user can send message and receive AI response", async () => {
    const user = userEvent.setup();
    render(<TestChatbot />);

    // Type a message
    const inputField = screen.getByPlaceholderText(
      /Ask me anything about your career/i
    );
    await user.type(inputField, "How can I improve my resume?");

    // Click send
    const sendButton = screen.getByRole("button", { name: /send/i });
    await user.click(sendButton);

    // Check user message appears
    expect(
      screen.getByText("How can I improve my resume?")
    ).toBeInTheDocument();

    // Wait for AI response
    await waitFor(
      () => {
        expect(
          screen.getByText(/Based on your experience/i)
        ).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    // Check loading indicator disappears
    expect(screen.queryByText("AI is thinking...")).not.toBeInTheDocument();
  });

  test("chatbot handles empty messages", async () => {
    const user = userEvent.setup();
    render(<TestChatbot />);

    const sendButton = screen.getByRole("button", { name: /send/i });

    // Try to send empty message
    await user.click(sendButton);

    // Should not add any new messages
    const messages = screen.getAllByText(/Hello! I'm JobPsych/i);
    expect(messages).toHaveLength(1); // Only the initial message
  });

  test("chatbot shows loading state while processing", async () => {
    const user = userEvent.setup();
    render(<TestChatbot />);

    const inputField = screen.getByPlaceholderText(
      /Ask me anything about your career/i
    );
    await user.type(inputField, "Test message");

    const sendButton = screen.getByRole("button", { name: /send/i });
    await user.click(sendButton);

    // Check loading appears
    expect(screen.getByText("AI is thinking...")).toBeInTheDocument();

    // Wait for response and check loading disappears
    await waitFor(
      () => {
        expect(screen.queryByText("AI is thinking...")).not.toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  test("chat history persists across re-renders", async () => {
    const user = userEvent.setup();
    const { rerender } = render(<TestChatbot />);

    // Send a message
    const inputField = screen.getByPlaceholderText(
      /Ask me anything about your career/i
    );
    await user.type(inputField, "Remember this message");

    const sendButton = screen.getByRole("button", { name: /send/i });
    await user.click(sendButton);

    // Wait for response
    await waitFor(() => {
      expect(screen.getByText("Remember this message")).toBeInTheDocument();
    });

    // Re-render component (in real app, this would use state management)
    rerender(<TestChatbot />);

    // Messages should still be there (in this simple test component)
    expect(screen.getByText("Remember this message")).toBeInTheDocument();
  });
});
