import React, { useState, useRef, useEffect } from "react";
import { Card, Form, Button, InputGroup, Alert, Badge } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";

const ChatSidebar = ({ show, onClose }) => {
  const [messages, setMessages] = useState([
    {
      type: "system",
      content:
        "Xin chào! Tôi là trợ lý AI chuyên về lịch sử Việt Nam. Hãy hỏi tôi về Chủ tịch Hồ Chí Minh!",
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
          content: data.message || "Xin lỗi, tôi không thể xử lý câu hỏi này.",
        },
      ]);
    } catch (error) {
      console.error("Error calling AI API:", error);
      setMessages((prev) => [
        ...prev,
        {
          type: "error",
          content: "Lỗi kết nối! Vui lòng thử lại sau.",
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
        content:
          "Xin chào! Tôi là trợ lý AI chuyên về lịch sử Việt Nam. Hãy hỏi tôi về Chủ tịch Hồ Chí Minh!",
      },
    ]);
  };

  const handleSuggestedQuestion = (question) => {
    setInput(question);
  };

  const suggestedQuestions = [
    "Hồ Chí Minh ra đi tìm đường cứu nước khi nào?",
    "Những nước nào Bác Hồ đã từng đến?",
    "Bác Hồ đã thành lập những tổ chức nào?",
    "Tư tưởng của Bác Hồ được hình thành như thế nào?",
    "Bác Hồ có những đóng góp gì cho cách mạng Việt Nam?",
  ];

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop for mobile */}
          <motion.div
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-25 d-lg-none"
            style={{ zIndex: 1040 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Chat Sidebar */}
          <motion.div
            className="position-fixed top-0 end-0 h-100 bg-white shadow-lg border-start"
            style={{
              width: "400px",
              maxWidth: "100vw",
              zIndex: 1041,
            }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            <div className="d-flex flex-column h-100">
              {/* Header */}
              <div className="bg-danger text-white p-3 d-flex align-items-center justify-content-between flex-shrink-0">
                <div className="d-flex align-items-center">
                  <img
                    src="/assets/vn_flag.jpg"
                    alt="Vietnam Flag"
                    className="rounded-circle me-2"
                    style={{
                      width: "35px",
                      height: "35px",
                      objectFit: "cover",
                    }}
                  />
                  <div>
                    <h6 className="mb-0 fw-bold">AI Lịch Sử Việt Nam</h6>
                    <small className="opacity-75">Chuyên gia về Bác Hồ</small>
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <Button
                    variant="outline-light"
                    size="sm"
                    onClick={clearChat}
                    className="border-0 p-1"
                    title="Xóa cuộc trò chuyện"
                  >
                    <i className="bi bi-arrow-clockwise"></i>
                  </Button>
                  <Button
                    variant="outline-light"
                    size="sm"
                    onClick={onClose}
                    className="border-0 p-1"
                    title="Đóng chat"
                  >
                    <i className="bi bi-x-lg"></i>
                  </Button>
                </div>
              </div>

              {/* Messages Area với scroll riêng */}
              <div
                className="flex-grow-1 p-3 position-relative chat-messages-container"
                style={{
                  overflowY: "auto",
                  overflowX: "hidden",
                  height: "calc(100vh - 160px)",
                  backgroundImage: `linear-gradient(rgba(248,249,250,0.95), rgba(248,249,250,0.95)), url(/assets/lotus.jpg)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  scrollbarWidth: "thin",
                  scrollbarColor: "#dc3545 #f8f9fa",
                }}
              >
                {/* Gợi ý câu hỏi khi chưa có tin nhắn */}
                {messages.length === 1 && (
                  <div className="mb-3">
                    <p className="text-muted small mb-2">
                      <i className="bi bi-lightbulb me-2"></i>
                      Câu hỏi gợi ý:
                    </p>
                    {suggestedQuestions.map((question, index) => (
                      <Badge
                        key={index}
                        bg="light"
                        text="dark"
                        className="me-2 mb-2 p-2 border cursor-pointer"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleSuggestedQuestion(question)}
                      >
                        {question}
                      </Badge>
                    ))}
                  </div>
                )}

                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    className="mb-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {message.type === "user" ? (
                      <div className="d-flex justify-content-end">
                        <div
                          className="bg-danger text-white p-3 rounded-3 shadow-sm position-relative"
                          style={{ maxWidth: "85%" }}
                        >
                          <div
                            className="fw-bold mb-1"
                            style={{ fontSize: "12px" }}
                          >
                            <i className="bi bi-person-fill me-2"></i>
                            Bạn
                          </div>
                          <div style={{ fontSize: "14px", lineHeight: "1.4" }}>
                            {message.content}
                          </div>
                        </div>
                      </div>
                    ) : message.type === "ai" ? (
                      <div className="d-flex justify-content-start">
                        <div
                          className="bg-white border p-3 rounded-3 shadow-sm position-relative"
                          style={{ maxWidth: "85%" }}
                        >
                          <div
                            className="fw-bold mb-1 text-danger"
                            style={{ fontSize: "12px" }}
                          >
                            <i className="bi bi-robot me-2"></i>
                            AI Assistant
                          </div>
                          <div
                            className="text-dark"
                            style={{
                              fontSize: "14px",
                              lineHeight: "1.4",
                              whiteSpace: "pre-wrap",
                            }}
                          >
                            {message.content}
                          </div>
                        </div>
                      </div>
                    ) : message.type === "system" ? (
                      <Alert variant="info" className="text-center py-2 mb-2">
                        <i className="bi bi-info-circle me-2"></i>
                        <small>{message.content}</small>
                      </Alert>
                    ) : (
                      <Alert variant="danger" className="py-2 mb-2">
                        <i className="bi bi-exclamation-triangle me-2"></i>
                        <small>{message.content}</small>
                      </Alert>
                    )}
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    className="d-flex justify-content-start mb-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="bg-white border p-3 rounded-3 shadow-sm">
                      <div
                        className="fw-bold mb-1 text-danger"
                        style={{ fontSize: "12px" }}
                      >
                        <i className="bi bi-robot me-2"></i>
                        AI Assistant
                      </div>
                      <div className="d-flex align-items-center">
                        <div
                          className="spinner-border spinner-border-sm me-2 text-danger"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <span className="text-muted small">
                          Đang suy nghĩ...
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-3 border-top bg-light flex-shrink-0">
                <InputGroup>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Hỏi về Bác Hồ..."
                    disabled={isLoading}
                    className="border-end-0"
                    style={{ resize: "none" }}
                  />
                  <Button
                    variant="danger"
                    onClick={handleSend}
                    disabled={isLoading || input.trim() === ""}
                    className="px-3"
                  >
                    <i className="bi bi-send-fill"></i>
                  </Button>
                </InputGroup>
                <div className="text-center mt-2">
                  <small className="text-muted">
                    <i className="bi bi-shield-check me-1"></i>
                    Powered by AI - Thông tin chỉ mang tính tham khảo
                  </small>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ChatSidebar;
