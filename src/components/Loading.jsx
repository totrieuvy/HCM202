import React from "react";
import { Spinner, Container } from "react-bootstrap";

const Loading = ({ message = "Đang tải..." }) => {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "50vh" }}
    >
      <div className="text-center">
        <Spinner animation="border" variant="danger" className="mb-3" />
        <p className="text-muted">{message}</p>
      </div>
    </Container>
  );
};

export default Loading;
