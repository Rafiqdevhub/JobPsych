import { renderHook, waitFor, act } from "@testing-library/react";
import { expect, test, vi, describe, beforeEach } from "vitest";
import { useAIChat } from "../useAIChat";

// Mock the AI API
vi.mock("../../utils/aiApi", () => ({
  chat: vi.fn(),
}));

import { chat } from "../../utils/aiApi";

describe("useAIChat Hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Initialization", () => {
    test("initializes with default welcome message when no initial messages", () => {
      const { result } = renderHook(() => useAIChat());

      expect(result.current.messages).toHaveLength(1);
      expect(result.current.messages[0]).toEqual(
        expect.objectContaining({
          id: "welcome",
          text: "Hi! I'm JobPsych AI Assistant. How can I help you with your career today?",
          sender: "bot",
        })
      );
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe(null);
      expect(result.current.sessionType).toBe("general");
    });

    test("initializes with provided initial messages without welcome message", () => {
      const initialMessages = [
        {
          id: "1",
          text: "Hello",
          sender: "user",
          timestamp: new Date(),
        },
      ];

      const { result } = renderHook(() => useAIChat(initialMessages));

      expect(result.current.messages).toHaveLength(1);
      expect(result.current.messages[0]).toEqual(initialMessages[0]);
    });

    test("initializes with provided initial messages plus welcome message when empty array", () => {
      const { result } = renderHook(() => useAIChat([]));

      expect(result.current.messages).toHaveLength(1);
      expect(result.current.messages[0].id).toBe("welcome");
    });
  });

  describe("sendMessage", () => {
    test("does nothing for empty message", async () => {
      const { result } = renderHook(() => useAIChat());

      await act(async () => {
        await result.current.sendMessage("");
      });

      expect(result.current.messages).toHaveLength(1); // Only welcome message
      expect(chat).not.toHaveBeenCalled();
    });

    test("does nothing for whitespace-only message", async () => {
      const { result } = renderHook(() => useAIChat());

      await act(async () => {
        await result.current.sendMessage("   ");
      });

      expect(result.current.messages).toHaveLength(1);
      expect(chat).not.toHaveBeenCalled();
    });

    test("sends message and handles successful response", async () => {
      const mockResponse = {
        data: {
          response: "Hello from AI!",
        },
      };

      chat.mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useAIChat());

      await act(async () => {
        await result.current.sendMessage("Hello AI");
      });

      await waitFor(() => {
        expect(result.current.messages).toHaveLength(3); // welcome + user + ai
      });

      // Check user message
      expect(result.current.messages[1]).toEqual(
        expect.objectContaining({
          text: "Hello AI",
          sender: "user",
          sessionType: "general",
        })
      );

      // Check AI message
      expect(result.current.messages[2]).toEqual(
        expect.objectContaining({
          text: "Hello from AI!",
          sender: "bot",
          sessionType: "general",
        })
      );

      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe(null);

      expect(chat).toHaveBeenCalledWith("Hello AI", null, "general");
    });

    test("handles string response directly", async () => {
      chat.mockResolvedValue("Direct string response");

      const { result } = renderHook(() => useAIChat());

      await act(async () => {
        await result.current.sendMessage("Test");
      });

      await waitFor(() => {
        expect(result.current.messages).toHaveLength(3);
      });

      expect(result.current.messages[2].text).toBe("Direct string response");
    });

    test("handles various response structures", async () => {
      const testCases = [
        {
          response: { data: { response: { response: "Nested response" } } },
          expected: "Nested response",
        },
        {
          response: { data: { response: "Simple response" } },
          expected: "Simple response",
        },
        {
          response: { response: "Direct response" },
          expected: "Direct response",
        },
        {
          response: { success: { data: { response: "Success response" } } },
          expected: "Success response",
        },
        {
          response: { message: "Message response" },
          expected: "Message response",
        },
        {
          response: { text: "Text response" },
          expected: "Text response",
        },
      ];

      for (const { response, expected } of testCases) {
        chat.mockResolvedValue(response);

        const { result } = renderHook(() => useAIChat());

        await act(async () => {
          await result.current.sendMessage("Test");
        });

        await waitFor(() => {
          expect(result.current.messages[2].text).toBe(expected);
        });
      }
    });

    test("handles non-string response gracefully", async () => {
      chat.mockResolvedValue({ data: { response: 123 } });

      const { result } = renderHook(() => useAIChat());

      await act(async () => {
        await result.current.sendMessage("Test");
      });

      await waitFor(() => {
        expect(result.current.messages[2].text).toBe(
          "I received your message but couldn't process it properly."
        );
      });
    });

    test("includes context and custom session type", async () => {
      const mockResponse = { data: { response: "Response" } };
      chat.mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useAIChat());

      await act(async () => {
        await result.current.sendMessage(
          "Test",
          "Additional context",
          "coaching"
        );
      });

      expect(chat).toHaveBeenCalledWith(
        "Test",
        "Additional context",
        "coaching"
      );

      await waitFor(() => {
        expect(result.current.messages[1].sessionType).toBe("coaching");
        expect(result.current.messages[2].sessionType).toBe("coaching");
      });
    });

    test("handles API errors", async () => {
      const errorMessage = "API Error";
      chat.mockRejectedValue(new Error(errorMessage));

      const { result } = renderHook(() => useAIChat());

      await act(async () => {
        await result.current.sendMessage("Test");
      });

      await waitFor(() => {
        expect(result.current.messages).toHaveLength(3);
      });

      expect(result.current.messages[2]).toEqual(
        expect.objectContaining({
          text: `Sorry, I encountered an error: ${errorMessage}`,
          sender: "bot",
          isError: true,
        })
      );

      expect(result.current.error).toBe(errorMessage);
      expect(result.current.isLoading).toBe(false);
    });

    test("handles non-Error API errors", async () => {
      chat.mockRejectedValue("String error");

      const { result } = renderHook(() => useAIChat());

      await act(async () => {
        await result.current.sendMessage("Test");
      });

      await waitFor(() => {
        expect(result.current.messages[2].text).toContain(
          "Sorry, I encountered an error: Failed to send message"
        );
      });

      expect(result.current.error).toBe("Failed to send message");
    });

    test("sets loading state correctly", async () => {
      const mockResponse = { data: { response: "Response" } };
      chat.mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useAIChat());

      expect(result.current.isLoading).toBe(false);

      act(() => {
        result.current.sendMessage("Test");
      });

      expect(result.current.isLoading).toBe(true);

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
    });

    test("trims message text", async () => {
      const mockResponse = { data: { response: "Response" } };
      chat.mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useAIChat());

      await act(async () => {
        await result.current.sendMessage("  Test message  ");
      });

      expect(result.current.messages[1].text).toBe("Test message");
      expect(chat).toHaveBeenCalledWith("Test message", null, "general");
    });
  });

  describe("clearMessages", () => {
    test("clears all messages and error", async () => {
      const mockResponse = { data: { response: "Response" } };
      chat.mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useAIChat());

      // Add a message and error
      await act(async () => {
        await result.current.sendMessage("Test");
      });

      await waitFor(() => {
        expect(result.current.messages).toHaveLength(3);
      });

      // Simulate error state
      act(() => {
        result.current.sendMessage("Bad message");
      });

      chat.mockRejectedValueOnce(new Error("Test error"));

      await act(async () => {
        // Wait for the error to be set
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      act(() => {
        result.current.clearMessages();
      });

      expect(result.current.messages).toEqual([]);
      expect(result.current.error).toBe(null);
    });
  });

  describe("changeSessionType", () => {
    test("updates session type", () => {
      const { result } = renderHook(() => useAIChat());

      act(() => {
        result.current.changeSessionType("coaching");
      });

      expect(result.current.sessionType).toBe("coaching");
    });
  });

  describe("retryLastMessage", () => {
    test("retries the last user message", async () => {
      const mockResponse = { data: { response: "Retry response" } };
      chat.mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useAIChat());

      // Send initial message
      await act(async () => {
        await result.current.sendMessage("Initial message");
      });

      await waitFor(() => {
        expect(result.current.messages).toHaveLength(3);
      });

      // Mock for retry
      chat.mockResolvedValue({ data: { response: "Retry successful" } });

      // Retry last message
      await act(async () => {
        await result.current.retryLastMessage();
      });

      await waitFor(() => {
        expect(result.current.messages).toHaveLength(5); // welcome + initial user + initial ai + retry user + retry ai
      });

      expect(result.current.messages[3].text).toBe("Initial message");
      expect(result.current.messages[4].text).toBe("Retry successful");

      expect(chat).toHaveBeenLastCalledWith("Initial message", null, "general");
    });

    test("does nothing if no user messages exist", async () => {
      const { result } = renderHook(() => useAIChat());

      await act(async () => {
        await result.current.retryLastMessage();
      });

      expect(chat).not.toHaveBeenCalled();
    });
  });
});
