import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Form,
  Alert,
  ProgressBar,
} from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
  {
    question:
      "Hồ Chí Minh rời bến cảng Nhà Rồng để tìm đường cứu nước vào năm nào?",
    options: ["1905", "1911", "1920", "1941"],
    answer: "1911",
    explanation:
      "Ngày 5/6/1911, Nguyễn Tất Thành 21 tuổi rời Việt Nam trên tàu Amiral Latouche-Tréville để bắt đầu hành trình 30 năm tìm đường cứu nước.",
  },
  {
    question:
      "Hồ Chí Minh đã gửi Bản Yêu sách của nhân dân An Nam đến Hội nghị Versailles vào năm nào?",
    options: ["1911", "1917", "1919", "1925"],
    answer: "1919",
    explanation:
      "Năm 1919 tại Hội nghị Versailles, Nguyễn Ái Quốc đã gửi Bản yêu sách 8 điểm đòi quyền tự do dân chủ cho nhân dân Việt Nam.",
  },
  {
    question:
      "Quốc gia châu Á đầu tiên Hồ Chí Minh đặt chân đến trong hành trình tìm đường cứu nước là?",
    options: ["Nhật Bản", "Trung Quốc", "Ấn Độ", "Thái Lan"],
    answer: "Nhật Bản",
    explanation:
      "Sau khi rời Việt Nam, Hồ Chí Minh đầu tiên đặt chân đến Nhật Bản trước khi tiếp tục hành trình sang các nước khác.",
  },
  {
    question: "Hồ Chí Minh tham gia sáng lập Đảng Cộng sản Pháp vào năm nào?",
    options: ["1919", "1920", "1925", "1930"],
    answer: "1920",
    explanation:
      "Tại Đại hội Tours ngày 25-30/12/1920, Nguyễn Ái Quốc bỏ phiếu tán thành nghị quyết gia nhập Quốc tế Cộng sản và trở thành thành viên sáng lập Đảng Cộng sản Pháp.",
  },
  {
    question:
      "Tổ chức chính trị do Hồ Chí Minh thành lập năm 1941 để lãnh đạo phong trào cách mạng Việt Nam là?",
    options: [
      "Đông Dương Cộng sản Đảng",
      "Việt Nam Quốc dân Đảng",
      "Mặt trận Việt Minh",
      "Hội Việt Nam Cách mạng Thanh niên",
    ],
    answer: "Mặt trận Việt Minh",
    explanation:
      "Ngày 19/5/1941, Hồ Chí Minh thành lập Mặt trận Việt Minh (Việt Nam Độc lập Đồng minh Hội) để đoàn kết các tầng lớp nhân dân đấu tranh giành độc lập.",
  },
  {
    question:
      "Hồ Chí Minh từng bị chính quyền thực dân Anh bắt giam tại đâu vào năm 1931?",
    options: ["Pháp", "Trung Quốc", "Liên Xô", "Hong Kong"],
    answer: "Hong Kong",
    explanation:
      "Năm 1931, Hồ Chí Minh bị bắt giam tại Hong Kong bởi chính quyền thực dân Anh và gần như bị giao nộp cho chính quyền Pháp.",
  },
  {
    question:
      "Tư tưởng chính trị nào có ảnh hưởng lớn nhất đến con đường cách mạng của Hồ Chí Minh?",
    options: [
      "Chủ nghĩa dân chủ tư sản",
      "Chủ nghĩa Marx-Lenin",
      "Chủ nghĩa quân chủ",
      "Chủ nghĩa bảo thủ",
    ],
    answer: "Chủ nghĩa Marx-Lenin",
    explanation:
      "Từ năm 1920, Hồ Chí Minh chính thức theo chủ nghĩa Marx-Lenin và xác định con đường cách mạng vô sản cho Việt Nam.",
  },
  {
    question:
      "Hồ Chí Minh trở về Việt Nam lần đầu sau hơn 30 năm bôn ba vào năm nào?",
    options: ["1925", "1930", "1941", "1945"],
    answer: "1941",
    explanation:
      "Tháng 2/1941, sau 30 năm xa quê hương, Hồ Chí Minh trở về Việt Nam để trực tiếp lãnh đạo cách mạng giành độc lập dân tộc.",
  },
  {
    question:
      "Tờ báo nào do Hồ Chí Minh sáng lập để tuyên truyền cách mạng trong giai đoạn hoạt động ở Pháp?",
    options: ["Nhân Dân", "Le Paria", "Thanh Niên", "Cờ Giải Phóng"],
    answer: "Le Paria",
    explanation:
      "Từ năm 1922, Hồ Chí Minh viết báo Le Paria (Người cùng khổ) để tuyên truyền tư tưởng cách mạng và vạch trần bản chất áp bức của chủ nghĩa thực dân.",
  },
  {
    question:
      "Hồ Chí Minh đã đọc bản Tuyên ngôn Độc lập của Việt Nam vào ngày nào?",
    options: ["30/4/1945", "2/9/1945", "19/8/1945", "7/5/1954"],
    answer: "2/9/1945",
    explanation:
      "Ngày 2/9/1945 tại Quảng trường Ba Đình, Hà Nội, Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập khai sinh nước Việt Nam Dân chủ Cộng hòa.",
  },
];

const MiniGame = () => {
  const [time, setTime] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState({});

  useEffect(() => {
    if (!submitted) {
      const timer = setInterval(() => setTime((prev) => prev + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [submitted]);

  const handleAnswer = (qIndex, option) => {
    if (!submitted) {
      setAnswers({ ...answers, [qIndex]: option });
    }
  };

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.answer) correct++;
    });
    setScore(correct);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setAnswers({});
    setScore(0);
    setTime(0);
    setSubmitted(false);
    setShowExplanation({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleExplanation = (index) => {
    setShowExplanation({
      ...showExplanation,
      [index]: !showExplanation[index],
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const getScoreColor = () => {
    if (score >= 8) return "success";
    if (score >= 6) return "warning";
    return "danger";
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return "Hoàn hảo! Bạn là bậc thầy lịch sử!";
    if (percentage >= 80)
      return "Xuất sắc! Bạn có hiểu biết sâu sắc về lịch sử.";
    if (percentage >= 60)
      return "Khá tốt! Hãy tìm hiểu thêm để nâng cao kiến thức.";
    return "Hãy nghiên cứu thêm về lịch sử để cải thiện kết quả.";
  };

  const getScoreIcon = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return "bi-trophy-fill";
    if (percentage >= 80) return "bi-star-fill";
    if (percentage >= 60) return "bi-hand-thumbs-up-fill";
    return "bi-book-fill";
  };

  return (
    <div className="bg-light min-vh-100 py-5">
      <Container>
        {/* Header */}
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge bg="danger" className="mb-3 fs-6 px-4 py-2">
            <i className="bi bi-controller me-2"></i>
            Mini Game
          </Badge>
          <h1 className="display-4 fw-bold text-danger mb-3">
            Trắc Nghiệm Lịch Sử
          </h1>
          <p className="lead text-muted">
            30 năm tìm đường cứu nước của Chủ tịch Hồ Chí Minh
          </p>

          {/* Game Stats */}
          <Row className="justify-content-center mt-4">
            <Col md={10} lg={8}>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="border-0 shadow-lg">
                  <Card.Body className="p-4">
                    <Row className="text-center g-4">
                      <Col xs={submitted ? 4 : 6}>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <div className="mb-2">
                            <i className="bi bi-clock-fill text-primary fs-2"></i>
                          </div>
                          <h4 className="mb-1 fw-bold text-primary">
                            {formatTime(time)}
                          </h4>
                          <small className="text-muted">Thời gian</small>
                        </motion.div>
                      </Col>
                      <Col xs={submitted ? 4 : 6}>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <div className="mb-2">
                            <i className="bi bi-question-circle-fill text-warning fs-2"></i>
                          </div>
                          <h4 className="mb-1 fw-bold text-warning">
                            {Object.keys(answers).length}/{questions.length}
                          </h4>
                          <small className="text-muted">Đã trả lời</small>
                        </motion.div>
                      </Col>
                      {submitted && (
                        <Col xs={4}>
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            whileHover={{ scale: 1.05 }}
                          >
                            <div className="mb-2">
                              <i
                                className={`bi bi-trophy-fill text-${getScoreColor()} fs-2`}
                              ></i>
                            </div>
                            <h4
                              className={`mb-1 fw-bold text-${getScoreColor()}`}
                            >
                              {score}/{questions.length}
                            </h4>
                            <small className="text-muted">Điểm số</small>
                          </motion.div>
                        </Col>
                      )}
                    </Row>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          </Row>
        </motion.div>

        {/* Progress Bar */}
        {!submitted && (
          <motion.div
            className="mb-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Row className="justify-content-center">
              <Col md={10} lg={8}>
                <div className="mb-2">
                  <ProgressBar
                    now={(Object.keys(answers).length / questions.length) * 100}
                    variant="danger"
                    style={{ height: "14px" }}
                    animated
                  />
                </div>
                <p className="text-center text-muted mb-0">
                  <i className="bi bi-graph-up me-2"></i>
                  Tiến độ: {Object.keys(answers).length}/{questions.length} câu
                  hỏi
                </p>
              </Col>
            </Row>
          </motion.div>
        )}

        {/* Questions */}
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="questions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Row className="justify-content-center">
                <Col lg={10} xl={9}>
                  <Row>
                    {questions.map((q, index) => (
                      <Col lg={12} key={index} className="mb-4">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ y: -3 }}
                        >
                          <Card
                            className={`border-0 shadow-sm ${answers[index]
                                ? "border-start border-danger border-4"
                                : ""
                              }`}
                            style={{ transition: "all 0.3s ease" }}
                          >
                            <Card.Body className="p-4">
                              <div className="d-flex align-items-start mb-4">
                                <Badge
                                  bg={answers[index] ? "danger" : "secondary"}
                                  className="me-3 px-3 py-2 flex-shrink-0"
                                  style={{ fontSize: "1.1rem" }}
                                >
                                  {index + 1}
                                </Badge>
                                <Card.Title className="mb-0 flex-grow-1 fs-5">
                                  {q.question}
                                </Card.Title>
                              </div>

                              <div className="ms-0">
                                {q.options.map((option, optIndex) => (
                                  <motion.div
                                    key={optIndex}
                                    whileHover={{ x: 3 }}
                                    transition={{
                                      type: "spring",
                                      stiffness: 400,
                                    }}
                                    className="mb-3"
                                  >
                                    <label
                                      htmlFor={`q${index}-opt${optIndex}`}
                                      className={`d-block p-3 rounded position-relative ${answers[index] === option
                                          ? "bg-danger bg-opacity-10 border border-2 border-danger"
                                          : "bg-light border border-2 border-light"
                                        }`}
                                      style={{
                                        cursor: "pointer",
                                        transition: "all 0.2s ease",
                                        userSelect: "none",
                                      }}
                                      onMouseEnter={(e) => {
                                        if (answers[index] !== option) {
                                          e.currentTarget.style.borderColor =
                                            "#ddd";
                                          e.currentTarget.style.backgroundColor =
                                            "#f8f9fa";
                                        }
                                      }}
                                      onMouseLeave={(e) => {
                                        if (answers[index] !== option) {
                                          e.currentTarget.style.borderColor =
                                            "#f8f9fa";
                                          e.currentTarget.style.backgroundColor =
                                            "#f8f9fa";
                                        }
                                      }}
                                    >
                                      <div className="d-flex align-items-center">
                                        <Form.Check
                                          type="radio"
                                          id={`q${index}-opt${optIndex}`}
                                          name={`question-${index}`}
                                          value={option}
                                          checked={answers[index] === option}
                                          onChange={() =>
                                            handleAnswer(index, option)
                                          }
                                          className="me-3"
                                          style={{
                                            cursor: "pointer",
                                            minWidth: "20px",
                                          }}
                                        />
                                        <span
                                          className={`flex-grow-1 ${answers[index] === option
                                              ? "fw-semibold text-danger"
                                              : ""
                                            }`}
                                        >
                                          {option}
                                        </span>
                                        {answers[index] === option && (
                                          <motion.i
                                            initial={{ scale: 0, rotate: -180 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            className="bi bi-check-circle-fill text-danger fs-5 ms-2"
                                          ></motion.i>
                                        )}
                                      </div>
                                    </label>
                                  </motion.div>
                                ))}
                              </div>

                              {answers[index] && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="text-end mt-3"
                                >
                                  <Badge bg="success" className="px-3 py-2">
                                    <i className="bi bi-check-circle-fill me-2"></i>
                                    Đã chọn đáp án
                                  </Badge>
                                </motion.div>
                              )}
                            </Card.Body>
                          </Card>
                        </motion.div>
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>

              <motion.div
                className="text-center mt-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  variant="danger"
                  size="lg"
                  onClick={handleSubmit}
                  disabled={Object.keys(answers).length < questions.length}
                  className="px-5 py-3 shadow-lg"
                  style={{
                    fontSize: "1.2rem",
                    transition: "all 0.3s ease",
                  }}
                >
                  <i className="bi bi-check-circle-fill me-2"></i>
                  Nộp Bài
                  {Object.keys(answers).length < questions.length && (
                    <Badge bg="light" text="dark" className="ms-3">
                      Còn {questions.length - Object.keys(answers).length} câu
                    </Badge>
                  )}
                </Button>
              </motion.div>
            </motion.div>
          ) : (
            /* Results */
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Summary Alert */}
              <Row className="justify-content-center mb-5">
                <Col lg={10} xl={8}>
                  <Alert
                    variant={getScoreColor()}
                    className="shadow-lg border-0"
                  >
                    <div className="text-center py-4">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          delay: 0.2,
                        }}
                      >
                        <i className={`bi ${getScoreIcon()} display-3 mb-3`}></i>
                      </motion.div>
                      <Alert.Heading className="display-6 fw-bold mb-3">
                        Kết Quả Trắc Nghiệm
                      </Alert.Heading>
                      <hr />
                      <h3 className="mb-4">
                        Bạn đã trả lời đúng{" "}
                        <Badge
                          bg="light"
                          text={getScoreColor()}
                          className="fs-4 px-3"
                        >
                          {score}/{questions.length}
                        </Badge>{" "}
                        câu hỏi
                      </h3>
                      <Row className="g-3 mb-4 justify-content-center">
                        <Col xs={6} md={4}>
                          <Card className="border-0 bg-white bg-opacity-50">
                            <Card.Body className="text-center py-3">
                              <i className="bi bi-clock-fill fs-3 mb-2 d-block"></i>
                              <strong className="fs-5">
                                {formatTime(time)}
                              </strong>
                              <div className="small text-muted mt-1">
                                Thời gian hoàn thành
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                        <Col xs={6} md={4}>
                          <Card className="border-0 bg-white bg-opacity-50">
                            <Card.Body className="text-center py-3">
                              <i className="bi bi-percent fs-3 mb-2 d-block"></i>
                              <strong className="fs-5">
                                {((score / questions.length) * 100).toFixed(1)}%
                              </strong>
                              <div className="small text-muted mt-1">
                                Tỷ lệ chính xác
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                      <p className="lead fw-bold mb-0">
                        <i className={`bi ${getScoreIcon()} me-2`}></i>
                        {getScoreMessage()}
                      </p>
                    </div>
                  </Alert>
                </Col>
              </Row>

              {/* Detailed Results */}
              <Row className="justify-content-center">
                <Col lg={10} xl={9}>
                  <h3 className="text-center mb-4 text-danger">
                    <i className="bi bi-clipboard-check me-2"></i>
                    Xem Đáp Án Chi Tiết
                  </h3>
                  <Row>
                    {questions.map((q, index) => {
                      const isCorrect = answers[index] === q.answer;
                      return (
                        <Col lg={12} key={index} className="mb-4">
                          <motion.div
                            initial={{
                              opacity: 0,
                              x: index % 2 === 0 ? -20 : 20,
                            }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <Card
                              className={`border-0 shadow-sm ${isCorrect
                                  ? "border-start border-success border-5"
                                  : "border-start border-danger border-5"
                                }`}
                            >
                              <Card.Body className="p-4">
                                <div className="d-flex align-items-start mb-3">
                                  <Badge
                                    bg={isCorrect ? "success" : "danger"}
                                    className="me-3 px-3 py-2 flex-shrink-0"
                                    style={{ fontSize: "1.1rem" }}
                                  >
                                    {index + 1}
                                  </Badge>
                                  <div className="flex-grow-1">
                                    <Card.Title className="mb-2 fs-5">
                                      {q.question}
                                    </Card.Title>
                                    <Badge
                                      bg={isCorrect ? "success" : "danger"}
                                      className="px-3 py-2"
                                    >
                                      <i
                                        className={`bi ${isCorrect
                                            ? "bi-check-circle-fill"
                                            : "bi-x-circle-fill"
                                          } me-2`}
                                      ></i>
                                      {isCorrect ? "Đúng" : "Sai"}
                                    </Badge>
                                  </div>
                                </div>

                                <div className="mb-3">
                                  {q.options.map((option, optIndex) => {
                                    const isAnswer = option === q.answer;
                                    const isUserAnswer =
                                      option === answers[index];
                                    return (
                                      <div
                                        key={optIndex}
                                        className={`p-3 mb-2 rounded border border-2 ${isAnswer
                                            ? "bg-success bg-opacity-10 border-success"
                                            : isUserAnswer && !isCorrect
                                              ? "bg-danger bg-opacity-10 border-danger"
                                              : "bg-light border-light"
                                          }`}
                                      >
                                        <div className="d-flex align-items-center justify-content-between">
                                          <span
                                            className={
                                              isAnswer || isUserAnswer
                                                ? "fw-semibold"
                                                : ""
                                            }
                                          >
                                            {option}
                                          </span>
                                          {isAnswer && (
                                            <Badge bg="success" className="px-3">
                                              <i className="bi bi-check-lg me-1"></i>
                                              Đáp án đúng
                                            </Badge>
                                          )}
                                          {isUserAnswer && !isCorrect && (
                                            <Badge bg="danger" className="px-3">
                                              <i className="bi bi-x-lg me-1"></i>
                                              Bạn đã chọn
                                            </Badge>
                                          )}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>

                                {/* Explanation Toggle */}
                                <Button
                                  variant="outline-secondary"
                                  size="sm"
                                  onClick={() => toggleExplanation(index)}
                                  className="w-100"
                                >
                                  <i
                                    className={`bi ${showExplanation[index]
                                        ? "bi-chevron-up"
                                        : "bi-chevron-down"
                                      } me-2`}
                                  ></i>
                                  {showExplanation[index]
                                    ? "Ẩn giải thích"
                                    : "Xem giải thích"}
                                </Button>

                                <AnimatePresence>
                                  {showExplanation[index] && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.3 }}
                                      className="mt-3"
                                    >
                                      <Alert variant="info" className="mb-0">
                                        <div className="d-flex">
                                          <i className="bi bi-lightbulb-fill me-3 fs-5 flex-shrink-0"></i>
                                          <div>
                                            <strong className="d-block mb-2">
                                              Giải thích:
                                            </strong>
                                            <p className="mb-0">
                                              {q.explanation}
                                            </p>
                                          </div>
                                        </div>
                                      </Alert>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </Card.Body>
                            </Card>
                          </motion.div>
                        </Col>
                      );
                    })}
                  </Row>
                </Col>
              </Row>

              {/* Action Buttons */}
              <motion.div
                className="d-flex flex-wrap gap-3 justify-content-center mt-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Button
                  variant="danger"
                  size="lg"
                  onClick={handleReset}
                  className="px-5 py-3 shadow"
                >
                  <i className="bi bi-arrow-clockwise me-2"></i>
                  Chơi Lại
                </Button>
                <Button
                  variant="outline-danger"
                  size="lg"
                  href="/"
                  className="px-5 py-3"
                >
                  <i className="bi bi-house-fill me-2"></i>
                  Về Trang Chủ
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>

      {/* Custom Styles */}
      <style jsx>{`
        .form-check-input:checked {
          background-color: #dc3545;
          border-color: #dc3545;
        }
        .form-check-input {
          cursor: pointer;
        }
        .form-check-label {
          cursor: pointer;
          user-select: none;
        }
      `}</style>
    </div>
  );
};

export default MiniGame;
