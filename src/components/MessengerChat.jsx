import React, { useState, useRef, useEffect } from "react";
import { Card, Form, Button, InputGroup } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";

const MessengerChat = ({ show, onClose }) => {
  const [messages, setMessages] = useState([
    {
      type: "system",
      content: "Xin chào! Hỏi tôi về Bác Hồ nhé! ",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMessage = { type: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
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
          type: "ai",
          content:
            data.message || "Xin lỗi, tôi không thể trả lời câu hỏi này.",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          type: "error",
          content: "Lỗi kết nối! Thử lại sau nhé.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        type: "system",
        content: "Xin chào! Hỏi tôi về Bác Hồ nhé! ",
      },
    ]);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="position-fixed messenger-chat-popup"
          style={{
            bottom: "90px",
            right: "20px",
            zIndex: 1050,
            overflow: "hidden",
          }}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <Card className="h-100 shadow-lg border-0">
            <Card.Header
              className="bg-gradient text-white p-3 border-0"
              style={{
                background: "linear-gradient(135deg, #dc3545 0%, #e74c3c 100%)",
              }}
            >
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <div className="position-relative me-2">
                    <img
                      src="/assets/lotus.jpg"
                      alt="AI Bot"
                      className="rounded-circle"
                      style={{
                        width: "32px",
                        height: "32px",
                        objectFit: "cover",
                      }}
                    />
                    <div
                      className="position-absolute bg-success rounded-circle"
                      style={{
                        width: "10px",
                        height: "10px",
                        bottom: "0",
                        right: "0",
                        border: "2px solid white",
                      }}
                    ></div>
                  </div>
                  <div>
                    <h6 className="mb-0 fw-bold" style={{ fontSize: "14px" }}>
                      AI Bác Hồ
                    </h6>
                    <small className="opacity-75" style={{ fontSize: "11px" }}>
                      Đang hoạt động
                    </small>
                  </div>
                </div>
                <div className="d-flex gap-1">
                  <Button
                    variant="link"
                    size="sm"
                    className="text-white p-1"
                    onClick={clearChat}
                    title="Làm mới"
                  >
                    <i
                      className="bi bi-arrow-clockwise"
                      style={{ fontSize: "14px" }}
                    ></i>
                  </Button>
                  <Button
                    variant="link"
                    size="sm"
                    className="text-white p-1"
                    onClick={onClose}
                    title="Đóng"
                  >
                    <i className="bi bi-x-lg" style={{ fontSize: "14px" }}></i>
                  </Button>
                </div>
              </div>
            </Card.Header>

            <Card.Body
              className="p-2 d-flex flex-column"
              style={{
                height: "calc(100% - 120px)",
                background: "#f8f9fa",
              }}
            >
              <div
                className="flex-grow-1 mb-2 chat-scroll-container"
                style={{
                  overflowY: "auto",
                  overflowX: "hidden",
                }}
              >
                {messages.map((message, index) => (
                  <div key={index} className="mb-2">
                    {message.type === "user" ? (
                      <div className="d-flex justify-content-end">
                        <div
                          className="text-white px-3 py-2"
                          style={{
                            background:
                              "linear-gradient(135deg, #dc3545 0%, #c82333 100%)",
                            borderRadius: "18px 18px 4px 18px",
                            maxWidth: "80%",
                            fontSize: "13px",
                            wordWrap: "break-word",
                          }}
                        >
                          {message.content}
                        </div>
                      </div>
                    ) : message.type === "ai" ? (
                      <div className="d-flex justify-content-start">
                        <div
                          className="bg-white border px-3 py-2 shadow-sm"
                          style={{
                            borderRadius: "18px 18px 18px 4px",
                            maxWidth: "80%",
                            fontSize: "13px",
                            wordWrap: "break-word",
                          }}
                        >
                          {message.content}
                        </div>
                      </div>
                    ) : message.type === "system" ? (
                      <div className="text-center">
                        <small className="text-muted bg-white px-2 py-1 rounded-pill border">
                          {message.content}
                        </small>
                      </div>
                    ) : (
                      <div className="text-center">
                        <small className="text-danger bg-light px-2 py-1 rounded-pill border">
                          {message.content}
                        </small>
                      </div>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="d-flex justify-content-start mb-2">
                    <div
                      className="bg-white border px-3 py-2 shadow-sm d-flex align-items-center"
                      style={{
                        borderRadius: "18px 18px 18px 4px",
                        fontSize: "13px",
                      }}
                    >
                      <div
                        className="spinner-border spinner-border-sm me-2 text-danger"
                        style={{ width: "12px", height: "12px" }}
                      ></div>
                      <span className="text-muted">Đang trả lời...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </Card.Body>

            <div className="p-2 border-top bg-white">
              <InputGroup size="sm">
                <Form.Control
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Aa"
                  disabled={isLoading}
                  className="border-0 bg-light"
                  style={{
                    borderRadius: "20px",
                    fontSize: "14px",
                  }}
                />
                <Button
                  variant="link"
                  onClick={handleSend}
                  disabled={isLoading || input.trim() === ""}
                  className="border-0 text-danger p-2"
                  title="Gửi"
                >
                  <i className="bi bi-send-fill"></i>
                </Button>
              </InputGroup>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MessengerChat;
