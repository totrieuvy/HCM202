import { useState } from "react";
import vnFlag from "../public/assets/vn_flag.jpg";
import bgImage from "../public/assets/lotus.jpg";

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
      const response = await fetch("https://aziky.duckdns.org/hcm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: input }),
      });

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          type: "response",
          content: data.message || "Sorry, I couldn't process that.",
        },
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
    <div
      style={{
        position: "fixed",
        bottom: 30,
        right: 30,
        zIndex: 1000,
        fontFamily: "Segoe UI, Arial, sans-serif",
      }}
    >
      {/* Chat Button */}
      <button
        onClick={toggleChat}
        style={{
          background: `url(${vnFlag}) no-repeat left center, linear-gradient(90deg, #da251d 60%, #ffecb3 100%)`,
          color: "white",
          border: "none",
          borderRadius: 30,
          padding: "12px 32px 12px 56px",
          fontWeight: "bold",
          fontSize: 18,
          boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
          cursor: "pointer",
          backgroundSize: "32px 32px, cover",
          marginBottom: 8,
        }}
      >
        {isOpen ? "Đóng Chat" : "Chat với AI"}
      </button>

      {/* Chat Popup */}
      {isOpen && (
        <div
          style={{
            width: 350,
            height: 480,
            background: `url(${bgImage}) center/cover, linear-gradient(180deg, #fffbe6 80%, #da251d 100%)`,
            borderRadius: 24,
            boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            border: "2px solid #da251d",
          }}
        >
          {/* Chat Header */}
          <div
            style={{
              background: "rgba(218,37,29,0.95)",
              color: "#fff",
              padding: "16px 0 12px 0",
              textAlign: "center",
              fontSize: 22,
              fontWeight: "bold",
              letterSpacing: 1,
              borderBottom: "1px solid #fffbe6",
              position: "relative",
            }}
          >
            <img
              src={vnFlag}
              alt="VN Flag"
              style={{
                position: "absolute",
                left: 16,
                top: 12,
                width: 32,
                height: 20,
                borderRadius: 4,
                boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
              }}
            />
            AI Chat Việt Nam
          </div>

          {/* Chat Messages */}
          <div
            style={{
              flex: 1,
              padding: "16px 12px 8px 12px",
              overflowY: "auto",
              background: "rgba(255,255,255,0.85)",
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  marginBottom: 10,
                  display: "flex",
                  justifyContent: msg.type === "user" ? "flex-end" : "flex-start",
                }}
              >
                <span
                  style={{
                    background: msg.type === "user" ? "#da251d" : "#fffbe6",
                    color: msg.type === "user" ? "#fff" : "#da251d",
                    borderRadius: 16,
                    padding: "8px 16px",
                    maxWidth: "70%",
                    fontSize: 15,
                    boxShadow:
                      msg.type === "user" ? "0 2px 8px rgba(218,37,29,0.12)" : "0 2px 8px rgba(255,235,182,0.12)",
                  }}
                >
                  {msg.content}
                </span>
              </div>
            ))}
            {isLoading && (
              <div
                style={{
                  textAlign: "center",
                  color: "#da251d",
                  fontWeight: "bold",
                  fontSize: 16,
                  marginTop: 8,
                }}
              >
                Đang tải...
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px 16px",
              background: "rgba(255,235,182,0.95)",
              borderTop: "1px solid #da251d",
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Nhập câu hỏi của bạn..."
              disabled={isLoading}
              style={{
                flex: 1,
                border: "1px solid #da251d",
                borderRadius: 16,
                padding: "8px 12px",
                fontSize: 15,
                outline: "none",
                marginRight: 8,
                background: "#fff",
              }}
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              style={{
                background: "#da251d",
                color: "#fff",
                border: "none",
                borderRadius: 16,
                padding: "8px 20px",
                fontWeight: "bold",
                fontSize: 15,
                cursor: isLoading ? "not-allowed" : "pointer",
                boxShadow: "0 2px 8px rgba(218,37,29,0.12)",
                transition: "background 0.2s",
              }}
            >
              Gửi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AiChat;
