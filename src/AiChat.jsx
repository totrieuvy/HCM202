import { useState } from "react";
import "./css/AiChat.css";

const AiChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = async () => {
    if (input.trim() === "") return;

    // Add user message to chat
    setMessages([...messages, { type: "user", content: input }]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://18.143.165.160:8080/hcm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: input }),
      });

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { type: "response", content: data.message || "Sorry, I couldn't process that." },
      ]);
    } catch (error) {
      console.error("Error calling AI API:", error);
      setMessages((prev) => [...prev, { type: "response", content: "Error connecting to the AI service." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isLoading) {
      handleSend();
    }
  };

  return (
    <div className="ai-chat-container">
      {/* Chat Button */}
      <button onClick={toggleChat} className="ai-chat-button">
        {isOpen ? "Đóng Chat" : "Chat với AI"}
      </button>

      {/* Chat Popup */}
      {isOpen && (
        <div className="ai-chat-popup">
          {/* Chat Header */}
          <div className="ai-chat-header">
            <h3>AI Chat</h3>
          </div>

          {/* Chat Messages */}
          <div className="ai-chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`ai-chat-message ${msg.type === "user" ? "user" : "response"}`}>
                <span>{msg.content}</span>
              </div>
            ))}
            {isLoading && <div className="ai-chat-loading">Đang tải...</div>}
          </div>

          {/* Chat Input */}
          <div className="ai-chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Nhập câu hỏi của bạn..."
              disabled={isLoading}
            />
            <button onClick={handleSend} disabled={isLoading}>
              Gửi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AiChat;
