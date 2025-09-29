import { useState, useCallback } from "react";
import { chat as aiChat } from "../utils/aiApi.js";

/**
 * Custom hook for JobPsych AI Chat functionality
 * @param {Array} initialMessages - Initial messages to display
 * @returns {Object} Chat hook interface
 */
export function useAIChat(initialMessages = []) {
  const defaultWelcomeMessage = {
    id: "welcome",
    text: "Hi! I'm JobPsych AI Assistant. How can I help you with your career today?",
    sender: "bot",
    timestamp: new Date(),
  };

  const [messages, setMessages] = useState([
    ...initialMessages,
    ...(initialMessages.length === 0 ? [defaultWelcomeMessage] : []),
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sessionType, setSessionType] = useState("general");

  /**
   * Send a message to the AI assistant
   * @param {string} message - User's message
   * @param {string} context - Optional additional context
   * @param {string} customSessionType - Optional session type override
   */
  const sendMessage = useCallback(
    async (message, context = null, customSessionType = null) => {
      if (!message || !message.trim()) {
        return;
      }

      setIsLoading(true);
      setError(null);

      // Add user message to chat
      const userMessage = {
        id: Date.now().toString(),
        text: message.trim(),
        sender: "user",
        timestamp: new Date(),
        sessionType: customSessionType || sessionType,
      };

      setMessages((prev) => [...prev, userMessage]);

      try {
        const response = await aiChat(
          message.trim(),
          context,
          customSessionType || sessionType
        );

        // Handle different possible response structures
        let responseText =
          "I received your message but couldn't process it properly.";

        if (typeof response === "string") {
          responseText = response;
        } else if (response && typeof response === "object") {
          // Check for different possible response structures
          const possibleText =
            response.data?.response?.response || // Actual backend structure
            response.data?.response || // Documented structure
            response.response ||
            response.success?.data?.response ||
            response.message ||
            response.text;

          if (typeof possibleText === "string") {
            responseText = possibleText;
          }
        }

        // Ensure we always have a string
        if (typeof responseText !== "string") {
          responseText =
            "I received your message but couldn't process it properly.";
        }

        // Add AI response to chat
        const aiMessage = {
          id: (Date.now() + 1).toString(),
          text: responseText,
          sender: "bot",
          timestamp: new Date(),
          sessionType: customSessionType || sessionType,
        };

        setMessages((prev) => [...prev, aiMessage]);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to send message";

        setError(errorMessage);

        // Add error message to chat
        const errorChatMessage = {
          id: (Date.now() + 1).toString(),
          text: `Sorry, I encountered an error: ${errorMessage}`,
          sender: "bot",
          timestamp: new Date(),
          isError: true,
        };

        setMessages((prev) => [...prev, errorChatMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [sessionType]
  );

  /**
   * Clear all messages
   */
  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  /**
   * Change session type
   * @param {string} newSessionType - New session type
   */
  const changeSessionType = useCallback((newSessionType) => {
    setSessionType(newSessionType);
  }, []);

  /**
   * Retry the last failed message
   */
  const retryLastMessage = useCallback(async () => {
    const lastUserMessage = [...messages]
      .reverse()
      .find((msg) => msg.sender === "user");
    if (lastUserMessage) {
      await sendMessage(
        lastUserMessage.text,
        null,
        lastUserMessage.sessionType
      );
    }
  }, [messages, sendMessage]);

  return {
    messages,
    isLoading,
    error,
    sessionType,
    sendMessage,
    clearMessages,
    changeSessionType,
    retryLastMessage,
  };
}

export default useAIChat;
