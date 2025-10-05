import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Badge,
  InputGroup,
  Alert,
} from "react-bootstrap";
const vnFlag = "/assets/vn_flag.jpg";
const bgImage = "/assets/lotus.jpg";

const AiChatPage = () => {
  const [messages, setMessages] = useState([
    {
      type: "system",
      content:
        "Xin chào! Tôi là trợ lý AI chuyên về lịch sử Việt Nam. Hãy hỏi tôi bất cứ điều gì về cuộc đời và sự nghiệp của Chủ tịch Hồ Chí Minh!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    // Chỉ cuộn trong chat container, không cuộn trang
    if (chatContainerRef.current) {
      const container = chatContainerRef.current;
      setTimeout(() => {
        // Smooth scroll trong container
        container.scrollTo({
          top: container.scrollHeight,
          behavior: "smooth",
        });
      }, 100);
    }
  };

  useEffect(() => {
    // Chỉ scroll khi có tin nhắn mới (không phải lần đầu load trang)
    if (messages.length > 1) {
      scrollToBottom();
    }
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

  const clearChat = () => {
    setMessages([
      {
        type: "system",
        content:
          "Xin chào! Tôi là trợ lý AI chuyên về lịch sử Việt Nam. Hãy hỏi tôi bất cứ điều gì về cuộc đời và sự nghiệp của Chủ tịch Hồ Chí Minh!",
      },
    ]);
  };

  const suggestedQuestions = [
    "Hồ Chí Minh ra đi tìm đường cứu nước khi nào?",
    "Những nước nào Bác Hồ đã từng đến?",
    "Bác Hồ đã thành lập những tổ chức nào?",
    "Tư tưởng của Bác Hồ được hình thành như thế nào?",
    "Vai trò của Bác Hồ trong cách mạng Việt Nam?",
  ];

  return (
    <Container
      className="py-5 ai-chat-container"
      style={{ minHeight: "100vh" }}
    >
      <Row className="justify-content-center">
        <Col lg={8}>
          {/* Header */}
          <div className="text-center mb-4">
            <Badge bg="warning" text="dark" className="mb-3 fs-6">
              AI Assistant
            </Badge>
            <h1 className="display-4 fw-bold text-danger mb-3">
              Trò Chuyện Với AI
            </h1>
            <p className="lead text-muted">
              Tìm hiểu về lịch sử thông qua trí tuệ nhân tạo
            </p>
          </div>

          {/* Chat Interface */}
          <Card
            className="shadow-lg border-0 ai-chat-card"
            style={{ height: "600px" }}
          >
            <Card.Header
              className="bg-danger text-white d-flex align-items-center justify-content-between"
              style={{
                backgroundImage: `linear-gradient(135deg, #dc3545 0%, #c82333 100%)`,
              }}
            >
              <div className="d-flex align-items-center">
                <img
                  src={vnFlag}
                  alt="Vietnam Flag"
                  className="rounded-circle me-3"
                  style={{ width: "40px", height: "40px", objectFit: "cover" }}
                />
                <div>
                  <h5 className="mb-0">AI Lịch Sử Việt Nam</h5>
                  <small className="opacity-75">
                    Chuyên gia về Chủ tịch Hồ Chí Minh
                  </small>
                </div>
              </div>
              <Button
                variant="outline-light"
                size="sm"
                onClick={clearChat}
                className="border-0"
              >
                <i className="bi bi-arrow-clockwise"></i>
              </Button>
            </Card.Header>

            <Card.Body
              className="d-flex flex-column p-0"
              style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
              }}
            >
              {/* Messages Area */}
              <div
                ref={chatContainerRef}
                className="ai-chat-messages p-3"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(10px)",
                  height: "calc(600px - 200px)",
                  overflowY: "auto",
                  overflowX: "hidden",
                  flex: "1 1 auto",
                }}
              >
                {messages.map((message, index) => (
                  <div key={index} className="mb-3">
                    {message.type === "user" ? (
                      <div className="d-flex justify-content-end">
                        <div
                          className="bg-danger text-white p-3 rounded-3 shadow-sm"
                          style={{ maxWidth: "70%" }}
                        >
                          <div className="fw-bold mb-1">
                            <i className="bi bi-person-fill me-2"></i>
                            Bạn
                          </div>
                          <div>{message.content}</div>
                        </div>
                      </div>
                    ) : message.type === "ai" ? (
                      <div className="d-flex justify-content-start">
                        <div
                          className="bg-light border p-3 rounded-3 shadow-sm"
                          style={{ maxWidth: "70%" }}
                        >
                          <div className="fw-bold mb-1 text-danger">
                            <i className="bi bi-robot me-2"></i>
                            AI Assistant
                          </div>
                          <div className="text-dark">{message.content}</div>
                        </div>
                      </div>
                    ) : message.type === "system" ? (
                      <Alert variant="info" className="text-center">
                        <i className="bi bi-info-circle me-2"></i>
                        {message.content}
                      </Alert>
                    ) : (
                      <Alert variant="danger">
                        <i className="bi bi-exclamation-triangle me-2"></i>
                        {message.content}
                      </Alert>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="d-flex justify-content-start mb-3">
                    <div className="bg-light border p-3 rounded-3 shadow-sm">
                      <div className="fw-bold mb-1 text-danger">
                        <i className="bi bi-robot me-2"></i>
                        AI Assistant
                      </div>
                      <div className="text-muted">
                        <span
                          className="spinner-grow spinner-grow-sm me-2"
                          role="status"
                        ></span>
                        Đang suy nghĩ...
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Questions */}
              {messages.length === 1 && (
                <div className="p-3 bg-light border-top">
                  <small className="text-muted d-block mb-2">
                    Câu hỏi gợi ý:
                  </small>
                  <div className="d-flex flex-wrap gap-2">
                    {suggestedQuestions.map((question, index) => (
                      <Badge
                        key={index}
                        bg="outline-danger"
                        className="p-2 cursor-pointer "
                        style={{ cursor: "pointer", color: "#000000ff" }}
                        onClick={() => setInput(question)}
                      >
                        {question}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="p-3 bg-white border-top">
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                >
                  <InputGroup>
                    <Form.Control
                      as="textarea"
                      rows={1}
                      placeholder="Hãy hỏi tôi về Chủ tịch Hồ Chí Minh..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      disabled={isLoading}
                      style={{ resize: "none" }}
                    />
                    <Button
                      variant="danger"
                      onClick={handleSend}
                      disabled={isLoading || input.trim() === ""}
                      className="px-4"
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

          {/* Help Section */}
          {/* <div className="mt-4">
            <Alert variant="light" className="border">
              <Alert.Heading className="h6">
                <i className="bi bi-lightbulb me-2 text-warning"></i>
                Mẹo sử dụng AI Chat
              </Alert.Heading>
              <ul className="mb-0 small">
                <li>Hỏi về các sự kiện lịch sử cụ thể trong cuộc đời Bác Hồ</li>
                <li>
                  Tìm hiểu về tư tưởng và triết lý của Chủ tịch Hồ Chí Minh
                </li>
                <li>
                  Khám phá những người bạn và đồng chí của Bác trong hành trình
                  cách mạng
                </li>
                <li>Sử dụng câu hỏi gợi ý để bắt đầu cuộc trò chuyện</li>
              </ul>
            </Alert>
          </div> */}
        </Col>
      </Row>
    </Container>
  );
};

export default AiChatPage;
