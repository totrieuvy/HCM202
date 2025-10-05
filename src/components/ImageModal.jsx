import React from "react";
import { Modal } from "react-bootstrap";
import { motion } from "framer-motion";

const ImageModal = ({ show, onHide, imageSrc, alt, title }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="lg"
      className="image-modal"
    >
      <Modal.Body className="p-0 position-relative">
        <button
          type="button"
          className="btn-close position-absolute top-0 end-0 m-3 bg-white rounded-circle p-2 shadow"
          style={{ zIndex: 10 }}
          onClick={onHide}
          aria-label="Đóng"
        ></button>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <img
            src={imageSrc}
            alt={alt}
            className="img-fluid rounded"
            style={{
              maxHeight: "80vh",
              width: "auto",
              objectFit: "contain",
            }}
          />
          {title && (
            <div className="p-3 bg-dark text-white">
              <h6 className="mb-0">{title}</h6>
            </div>
          )}
        </motion.div>
      </Modal.Body>
    </Modal>
  );
};

export default ImageModal;
