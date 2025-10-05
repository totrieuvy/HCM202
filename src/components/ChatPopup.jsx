import React, { useState, useRef, useEffect } from "react";
import { Card, Form, Button, InputGroup, Alert } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";

const ChatPopup = ({ show, onClose }) => {
  const [messages, setMessages] = useState([
    {
      type: "system",
      content:
        "Xin chào! Tôi là trợ lý AI. Hãy hỏi tôi về Chủ tịch Hồ Chí Minh!",
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
          content: "Lỗi kết nối đến dịch vụ AI. Vui lòng thử lại sau.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading) {
        handleSend();
      }
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
            style={{ zIndex: 1050 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Chat Window */}
          <motion.div
            className="position-fixed"
            style={{
              zIndex: 1051,
              right: "20px",
              bottom: "20px",
              width: "400px",
              maxWidth: "90vw",
              height: "500px",
              maxHeight: "80vh",
            }}
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            transition={{ type: "spring", damping: 25, stiffness: 500 }}
          >
            <Card className="shadow-lg border-0 h-100">
              <Card.Header
                className="bg-danger text-white d-flex align-items-center justify-content-between"
                style={{ cursor: "grab" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src="/assets/vn_flag.jpg"
                    alt="Vietnam Flag"
                    className="rounded-circle me-2"
                    style={{
                      width: "30px",
                      height: "30px",
                      objectFit: "cover",
                    }}
                  />
                  <div>
                    <h6 className="mb-0">AI Lịch Sử</h6>
                    <small className="opacity-75">Trợ lý thông minh</small>
                  </div>
                </div>
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={onClose}
                  className="border-0"
                >
                  <i className="bi bi-x"></i>
                </Button>
              </Card.Header>

              <Card.Body
                className="d-flex flex-column p-0"
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.95), rgba(255,255,255,0.95)), url(/assets/lotus.jpg)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Messages Area */}
                <div
                  className="flex-grow-1 p-3 overflow-auto"
                  style={{ maxHeight: "350px" }}
                >
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
                            className="bg-danger text-white p-2 rounded-3 shadow-sm"
                            style={{ maxWidth: "80%" }}
                          >
                            <small className="fw-bold d-block mb-1">Bạn</small>
                            <div style={{ fontSize: "14px" }}>
                              {message.content}
                            </div>
                          </div>
                        </div>
                      ) : message.type === "ai" ? (
                        <div className="d-flex justify-content-start">
                          <div
                            className="bg-light border p-2 rounded-3 shadow-sm"
                            style={{ maxWidth: "80%" }}
                          >
                            <small className="fw-bold d-block mb-1 text-danger">
                              AI
                            </small>
                            <div
                              className="text-dark"
                              style={{ fontSize: "14px" }}
                            >
                              {message.content}
                            </div>
                          </div>
                        </div>
                      ) : message.type === "system" ? (
                        <Alert
                          variant="info"
                          className="text-center py-2"
                          style={{ fontSize: "12px" }}
                        >
                          {message.content}
                        </Alert>
                      ) : (
                        <Alert
                          variant="danger"
                          className="py-2"
                          style={{ fontSize: "12px" }}
                        >
                          {message.content}
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
                      <div className="bg-light border p-2 rounded-3 shadow-sm">
                        <small className="fw-bold d-block mb-1 text-danger">
                          AI
                        </small>
                        <div
                          className="text-muted"
                          style={{ fontSize: "14px" }}
                        >
                          <span
                            className="spinner-grow spinner-grow-sm me-2"
                            role="status"
                          ></span>
                          Đang suy nghĩ...
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-2 bg-white border-top">
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSend();
                    }}
                  >
                    <InputGroup size="sm">
                      <Form.Control
                        placeholder="Hỏi về Bác Hồ..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={isLoading}
                      />
                      <Button
                        variant="danger"
                        onClick={handleSend}
                        disabled={isLoading || input.trim() === ""}
                        size="sm"
                      >
                        {isLoading ? (
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                          ></span>
                        ) : (
                          <i className="bi bi-send-fill"></i>
                        )}
                      </Button>
                    </InputGroup>
                  </Form>
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ChatPopup;
