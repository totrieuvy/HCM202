import React from "react";
import { Button } from "react-bootstrap";
import { motion } from "framer-motion";

const FloatingChatButton = ({ onClick, isActive = false }) => {
  // Ẩn button khi chat đang active
  if (isActive) return null;

  return (
    <motion.div
      className="position-fixed"
      style={{
        bottom: "20px",
        right: "20px",
        zIndex: 1042,
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        damping: 25,
        stiffness: 500,
        delay: 1,
      }}
    >
      <Button
        onClick={onClick}
        className="rounded-circle shadow-lg border-0"
        style={{
          width: "70px",
          height: "70px",
          background: "linear-gradient(135deg, #dc3545 0%, #c82333 100%)",
          boxShadow: "0 4px 20px rgba(220, 53, 69, 0.4)",
          transition: "all 0.3s ease",
          padding: "0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        title="Mở chat AI"
      >
        <img
          src="/assets/lotus.jpg"
          alt="Chat AI"
          style={{
            width: "45px",
            height: "45px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid white",
          }}
        />
      </Button>
    </motion.div>
  );
};

export default FloatingChatButton;
