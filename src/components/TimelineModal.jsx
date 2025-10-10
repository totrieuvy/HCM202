import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col, Badge, ButtonGroup, Alert } from "react-bootstrap";
import { motion } from "framer-motion";
import ImageModal from "./ImageModal";

const TimelineModal = ({ show, onHide, timelineData }) => {
  const [showImageModal, setShowImageModal] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [utterance, setUtterance] = useState(null);
  const [isSpeechSupported, setIsSpeechSupported] = useState(true);

  useEffect(() => {
    // Kiểm tra hỗ trợ Web Speech API
    if (!('speechSynthesis' in window)) {
      setIsSpeechSupported(false);
      return;
    }

    if (!timelineData) return;

    // Tạo văn bản đầy đủ để đọc
    const fullText = `
      ${timelineData.title}. 
      ${timelineData.content}. 
      Thông tin bổ sung: 
      ${timelineData.details.join('. ')}. 
      Ý nghĩa lịch sử: 
      ${timelineData.significance}
    `.trim();

    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(fullText);

    // Cấu hình giọng nói tiếng Việt
    const setVietnameseVoice = () => {
      const voices = synth.getVoices();
      // Tìm giọng tiếng Việt (vi-VN)
      const vietnameseVoice = voices.find(v =>
        v.lang.includes('vi-VN') || v.lang.includes('vi')
      );

      if (vietnameseVoice) {
        u.voice = vietnameseVoice;
      }
    };

    // Load voices (cần thiết cho một số trình duyệt)
    if (synth.getVoices().length > 0) {
      setVietnameseVoice();
    }

    synth.onvoiceschanged = setVietnameseVoice;

    u.lang = 'vi-VN';
    u.rate = 0.9; // Tốc độ đọc (0.1 - 10)
    u.pitch = 1; // Cao độ giọng (0 - 2)
    u.volume = 1; // Âm lượng (0 - 1)

    // Event handlers
    u.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    u.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    u.onpause = () => {
      setIsPaused(true);
    };

    u.onresume = () => {
      setIsPaused(false);
    };

    u.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsPlaying(false);
      setIsPaused(false);
    };

    setUtterance(u);

    // Cleanup khi đóng modal
    return () => {
      synth.cancel();
      setIsPlaying(false);
      setIsPaused(false);
    };
  }, [timelineData, show]);

  const handlePlay = () => {
    const synth = window.speechSynthesis;

    if (isPaused) {
      // Tiếp tục đọc nếu đang tạm dừng
      synth.resume();
    } else {
      // Bắt đầu đọc mới
      synth.cancel(); // Hủy bất kỳ utterance nào đang chạy
      synth.speak(utterance);
    }
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;
    if (synth.speaking && !synth.paused) {
      synth.pause();
    }
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;
    synth.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  const handleModalHide = () => {
    // Dừng speech khi đóng modal
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setIsPaused(false);
    onHide();
  };

  if (!timelineData) return null;

  return (
    <Modal show={show} onHide={handleModalHide} size="lg" centered>
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
              <h5 className="text-danger mb-3">
                <i className="bi bi-calendar-event me-2"></i>
                Chi tiết sự kiện
              </h5>
              <p className="text-muted">{timelineData.content}</p>

              {timelineData.details && (
                <>
                  <h6 className="mt-4 mb-3">
                    <i className="bi bi-info-circle me-2"></i>
                    Thông tin bổ sung
                  </h6>
                  <ul>
                    {timelineData.details.map((detail, index) => (
                      <li key={index} className="mb-2 text-muted">
                        {detail}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {timelineData.significance && (
                <>
                  <h6 className="mt-4 mb-3 text-warning">
                    <i className="bi bi-star-fill me-2"></i>
                    Ý nghĩa lịch sử
                  </h6>
                  <p className="text-success">{timelineData.significance}</p>
                </>
              )}
            </motion.div>
          </Col>
        </Row>

        {/* Text-to-Speech Controls */}
        <motion.div
          className="mt-4 p-3 bg-light rounded"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="d-flex align-items-center justify-content-between mb-2">
            <h6 className="mb-0">
              <i className="bi bi-volume-up-fill text-danger me-2"></i>
              Nghe nội dung bằng giọng nói
            </h6>
            {isPlaying && (
              <Badge bg={isPaused ? "warning" : "success"} className="pulse">
                <i className={`bi ${isPaused ? 'bi-pause-fill' : 'bi-volume-up-fill'} me-1`}></i>
                {isPaused ? 'Tạm dừng' : 'Đang phát'}
              </Badge>
            )}
          </div>

          {!isSpeechSupported ? (
            <Alert variant="warning" className="mb-0">
              <i className="bi bi-exclamation-triangle me-2"></i>
              Trình duyệt của bạn không hỗ trợ Text-to-Speech
            </Alert>
          ) : (
            <ButtonGroup size="sm" className="w-100">
              <Button
                variant={isPlaying && !isPaused ? "success" : "outline-success"}
                onClick={handlePlay}
                disabled={isPlaying && !isPaused}
                className="d-flex align-items-center justify-content-center"
              >
                <i className={`bi ${isPaused ? 'bi-play-fill' : 'bi-play-fill'} me-1`}></i>
                {isPaused ? 'Tiếp tục' : 'Phát'}
              </Button>
              <Button
                variant={isPaused ? "warning" : "outline-warning"}
                onClick={handlePause}
                disabled={!isPlaying || isPaused}
                className="d-flex align-items-center justify-content-center"
              >
                <i className="bi bi-pause-fill me-1"></i>
                Tạm dừng
              </Button>
              <Button
                variant="outline-danger"
                onClick={handleStop}
                disabled={!isPlaying}
                className="d-flex align-items-center justify-content-center"
              >
                <i className="bi bi-stop-fill me-1"></i>
                Dừng
              </Button>
            </ButtonGroup>
          )}

          <small className="text-muted d-block mt-2">
            <i className="bi bi-info-circle me-1"></i>
            Nhấn "Phát" để nghe toàn bộ nội dung sự kiện lịch sử
          </small>
        </motion.div>
      </Modal.Body>
      <Modal.Footer className="bg-light">
        <Button variant="outline-danger" onClick={handleModalHide}>
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

      {/* Custom CSS for pulse animation */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .pulse {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>
    </Modal>
  );
};

export default TimelineModal;
