import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container className="py-5 text-center">
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="mb-5">
            <h1 className="display-1 fw-bold text-danger">404</h1>
            <h2 className="mb-4">Trang Không Tồn Tại</h2>
            <p className="lead text-muted mb-4">
              Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã được di
              chuyển.
            </p>
            <div className="d-flex gap-3 justify-content-center">
              <Button as={Link} to="/" variant="danger" size="lg">
                <i className="bi bi-house me-2"></i>
                Về Trang Chủ
              </Button>
              <Button
                as={Link}
                to="/minigame"
                variant="outline-danger"
                size="lg"
              >
                <i className="bi bi-controller me-2"></i>
                Chơi Game
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
