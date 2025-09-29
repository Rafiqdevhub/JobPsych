import React, { useState, useRef, useEffect } from "react";
import { useAIChat } from "../hooks/useAIChat.js";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const {
    messages: chatMessages,
    isLoading,
    error,
    sessionType,
    sendMessage,
    changeSessionType,
  } = useAIChat();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    // Trigger entrance animation after component mounts
    const timer = setTimeout(() => {
      setHasEntered(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const messageToSend = inputValue;
    setInputValue("");

    try {
      await sendMessage(messageToSend);
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <div
        className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 transition-all duration-500 ${
          hasEntered ? "animate-chatbot-entrance" : "opacity-0 scale-0"
        }`}
      >
        <div
          className={`absolute bottom-full right-0 mb-2 md:mb-3 px-2 md:px-3 py-1 md:py-2 bg-gray-900 text-white text-xs md:text-sm rounded-lg shadow-lg transition-all duration-300 transform ${
            showTooltip
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2 pointer-events-none"
          }`}
        >
          💬 Chat with Jobpsych Assistant
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>

        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-ping opacity-20"></div>
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-300 to-purple-300 animate-pulse opacity-10"></div>

        <div className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
          <span className="text-white text-xs font-bold leading-none">!</span>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="group relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white p-3 md:p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer border-2 border-white/20 backdrop-blur-sm min-w-[48px] min-h-[48px] md:min-w-[56px] md:min-h-[56px] flex items-center justify-center"
          aria-label="Open chat assistant"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-300"></div>

          {isOpen ? (
            <svg
              className="w-6 h-6 relative z-10 transform transition-transform duration-300 group-hover:rotate-90"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 relative z-10 transform transition-transform duration-300 group-hover:scale-110"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          )}
        </button>
      </div>

      <div
        className={`fixed bottom-20 right-4 left-4 md:left-auto md:bottom-24 md:right-6 w-auto md:w-96 max-w-[calc(100vw-2rem)] md:max-w-[calc(100vw-3rem)] z-40 transition-all duration-500 ease-in-out transform ${
          isOpen
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-4 opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 md:p-4 rounded-t-2xl shadow-lg">
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4 md:w-6 md:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base md:text-lg truncate">
                JobPsych AI
              </h3>
              <p className="text-xs md:text-sm opacity-90 truncate">
                Your career assistant
              </p>
            </div>
            <div className="flex items-center space-x-1 md:space-x-2 flex-shrink-0">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs hidden sm:inline">Online</span>
            </div>
          </div>
        </div>

        <div className="bg-white h-80 md:h-96 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4 shadow-lg">
          {/* Session Type Selector */}
          <div className="flex items-center justify-center mb-2">
            <select
              value={sessionType}
              onChange={(e) => changeSessionType(e.target.value)}
              className="text-xs bg-gray-100 border border-gray-300 rounded-full px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="general">General</option>
              <option value="coaching">Coaching</option>
              <option value="analysis">Analysis</option>
            </select>
          </div>

          {chatMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] md:max-w-[80%] p-2 md:p-3 rounded-2xl shadow-sm ${
                  message.sender === "user"
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                    : message.isError
                    ? "bg-red-100 text-red-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.sender === "user"
                      ? "text-blue-100"
                      : message.isError
                      ? "text-red-600"
                      : "text-gray-500"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-2 md:p-3 rounded-2xl shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="flex justify-center">
              <div className="bg-red-100 text-red-800 p-2 md:p-3 rounded-2xl shadow-sm text-sm">
                <p>{error}</p>
                <button
                  onClick={() => {
                    // Retry functionality could be added here
                    setInputValue(""); // Clear error by allowing retry
                  }}
                  className="mt-1 text-xs underline hover:no-underline"
                >
                  Try again
                </button>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="bg-white p-3 md:p-4 rounded-b-2xl shadow-lg border-t">
          <div className="flex space-x-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask JobPsych AI..."
              className="flex-1 px-3 md:px-4 py-2 md:py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-sm min-h-[40px] md:min-h-[44px]"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-gray-300 disabled:to-gray-400 text-white p-2 md:p-2 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:cursor-not-allowed disabled:transform-none min-w-[40px] min-h-[40px] md:min-w-[44px] md:min-h-[44px] flex items-center justify-center"
            >
              <svg
                className="w-4 h-4 md:w-5 md:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-30 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Chatbot;
