import React, { useState } from "react";
import { Navbar, Nav, Container, Row, Col, Badge } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import MessengerChat from "./MessengerChat";
import ScrollToTop from "./ScrollToTop";
// import FloatingChatButton from "./FloatingChatButton";

const Layout = () => {
  const [showChat, setShowChat] = useState(false);
  const location = useLocation();

  const handleChatToggle = () => {
    const newShowChat = !showChat;
    setShowChat(newShowChat);
    
    // Add/remove chat-active class to body for mobile
    if (newShowChat) {
      document.body.classList.add('chat-active');
    } else {
      document.body.classList.remove('chat-active');
    }
  };

  // Don't show floating button on home page since it has its own
  const showFloatingButton = location.pathname !== "/";

  return (
    <>
      {/* Auto scroll to top when route changes */}
      <ScrollToTop />

      {/* Header */}
      <Navbar
        bg="danger"
        variant="dark"
        expand="lg"
        sticky="top"
        className="shadow-lg"
        style={{ padding: "1rem 0" }}
      >
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">
            {/* <img
              src="/assets/lotus.jpg"
              width="45"
              height="45"
              className="d-inline-block align-top me-3 rounded-circle shadow-sm"
              alt="Logo"
            /> */}
            <span style={{ fontSize: "1.3rem" }}>
              Hồ Chí Minh - Tìm Đường Cứu Nước
            </span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto fs-5">
              <Nav.Link as={Link} to="/" className="mx-2 px-3">
                <i className="bi bi-house me-2"></i>
                Trang Chủ
              </Nav.Link>
              <Nav.Link as={Link} to="/about" className="mx-2 px-3">
                <i className="bi bi-info-circle me-2"></i>
                Giới Thiệu
              </Nav.Link>
              <Nav.Link as={Link} to="/minigame" className="mx-2 px-3">
                <i className="bi bi-controller me-2"></i>
                Mini Game
              </Nav.Link>
              <Nav.Link as={Link} to="/aichat" className="mx-2 px-3">
                <i className="bi bi-robot me-2"></i>
                AI Chat
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-dark text-light py-5 mt-5">
        <Container>
          <Row className="g-4">
            <Col md={6} lg={4}>
              <h5 className="text-warning mb-3">
                <i className="bi bi-star-fill me-2"></i>
                Về Dự Án
              </h5>
              <p className="mb-3">
                Dự án giáo dục về hành trình 30 năm tìm đường cứu nước của Chủ
                tịch Hồ Chí Minh.
              </p>
              <p className="mb-0 text-muted">
                Tìm hiểu về quá trình hình thành tư tưởng và con đường cách mạng
                của vị lãnh tụ vĩ đại.
              </p>
            </Col>
            <Col md={6} lg={4}>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <h5 className="text-warning mb-3">
                  <i className="bi bi-link-45deg me-2"></i>
                  Liên Kết Nhanh
                </h5>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <Link
                      to="/"
                      className="text-light text-decoration-none d-flex align-items-center"
                    >
                      <i className="bi bi-house me-2"></i>
                      Trang Chủ
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/about"
                      className="text-light text-decoration-none d-flex align-items-center"
                    >
                      <i className="bi bi-info-circle me-2"></i>
                      Giới Thiệu
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/minigame"
                      className="text-light text-decoration-none d-flex align-items-center"
                    >
                      <i className="bi bi-controller me-2"></i>
                      Mini Game
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/aichat"
                      className="text-light text-decoration-none d-flex align-items-center"
                    >
                      <i className="bi bi-robot me-2"></i>
                      AI Chat
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>
            {/* <Col md={12} lg={4}>
              <h5 className="text-warning mb-3">
                <i className="bi bi-cpu me-2"></i>
                Công Nghệ
              </h5>
              <p className="mb-3 text-muted">Dự án được xây dựng với:</p>
              <div className="d-flex flex-wrap gap-2">
                <Badge bg="danger" className="px-3 py-2">
                  <i className="bi bi-bootstrap me-1"></i>
                  React
                </Badge>
                <Badge bg="warning" text="dark" className="px-3 py-2">
                  <i className="bi bi-palette me-1"></i>
                  Bootstrap
                </Badge>
                <Badge bg="success" className="px-3 py-2">
                  <i className="bi bi-robot me-1"></i>
                  AI Chat
                </Badge>
                <Badge bg="info" className="px-3 py-2">
                  <i className="bi bi-magic me-1"></i>
                  Framer Motion
                </Badge>
              </div>
            </Col> */}
          </Row>
          <hr className="my-3" />
          <div className="row">
            <div className="col-12 text-center">
              <p className="mb-0">
                &copy; 2025 Hồ Chí Minh - Tìm Đường Cứu Nước. Tất cả quyền được
                bảo lưu.
              </p>
            </div>
          </div>
        </Container>
      </footer>

      {/* Global Floating Chat Button - except on home page */}
      {/* {showFloatingButton && (
        <FloatingChatButton onClick={handleChatToggle} isActive={showChat} />
      )} */}

      {/* Global Messenger Chat */}
      <MessengerChat show={showChat} onClose={handleChatToggle} />
    </>
  );
};

export default Layout;
