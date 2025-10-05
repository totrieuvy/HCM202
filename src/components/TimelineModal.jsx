import React, { useState } from "react";
import { Modal, Button, Row, Col, Badge } from "react-bootstrap";
import { motion } from "framer-motion";
import ImageModal from "./ImageModal";

const TimelineModal = ({ show, onHide, timelineData }) => {
  const [showImageModal, setShowImageModal] = useState(false);

  if (!timelineData) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton className="bg-danger text-white">
        <Modal.Title>
          <Badge bg="warning" text="dark" className="me-2">
            {timelineData.year}
          </Badge>
          {timelineData.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6}>
            {timelineData.image && (
              <motion.div
                className="position-relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={timelineData.image}
                  alt={timelineData.title}
                  className="img-fluid rounded shadow cursor-pointer"
                  style={{ cursor: "pointer", transition: "all 0.3s ease" }}
                  onClick={() => setShowImageModal(true)}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "scale(1.02)";
                    e.target.style.boxShadow = "0 8px 25px rgba(0,0,0,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1)";
                    e.target.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
                  }}
                />
                <div
                  className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-25 opacity-0 rounded"
                  style={{
                    transition: "opacity 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => (e.target.style.opacity = "1")}
                  onMouseLeave={(e) => (e.target.style.opacity = "0")}
                  onClick={() => setShowImageModal(true)}
                >
                  <i className="bi bi-zoom-in text-white fs-1"></i>
                </div>
              </motion.div>
            )}
          </Col>
          <Col md={6}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h5 className="text-danger mb-3">Chi tiết sự kiện</h5>
              <p className="text-muted">{timelineData.content}</p>

              {timelineData.details && (
                <>
                  <h6 className="mt-4 mb-3">Thông tin bổ sung</h6>
                  <ul>
                    {timelineData.details.map((detail, index) => (
                      <li key={index} className="mb-2">
                        {detail}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {timelineData.significance && (
                <>
                  <h6 className="mt-4 mb-3 text-warning">Ý nghĩa lịch sử</h6>
                  <p className="text-success">{timelineData.significance}</p>
                </>
              )}
            </motion.div>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          <i className="bi bi-x-circle me-2"></i>
          Đóng
        </Button>
      </Modal.Footer>

      {/* Image Modal */}
      <ImageModal
        show={showImageModal}
        onHide={() => setShowImageModal(false)}
        imageSrc={timelineData?.image}
        alt={timelineData?.title}
        title={`${timelineData?.year} - ${timelineData?.title}`}
      />
    </Modal>
  );
};

export default TimelineModal;
