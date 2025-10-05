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

const questions = [
  {
    question:
      "Hồ Chí Minh rời bến cảng Nhà Rồng để tìm đường cứu nước vào năm nào?",
    options: ["1905", "1911", "1920", "1941"],
    answer: "1911",
  },
  {
    question:
      "Hồ Chí Minh đã gửi Bản Yêu sách của nhân dân An Nam đến Hội nghị Versailles vào năm nào?",
    options: ["1911", "1917", "1919", "1925"],
    answer: "1919",
  },
  {
    question:
      "Quốc gia châu Á đầu tiên Hồ Chí Minh đặt chân đến trong hành trình tìm đường cứu nước là?",
    options: ["Nhật Bản", "Trung Quốc", "Ấn Độ", "Thái Lan"],
    answer: "Nhật Bản",
  },
  {
    question: "Hồ Chí Minh tham gia sáng lập Đảng Cộng sản Pháp vào năm nào?",
    options: ["1919", "1920", "1925", "1930"],
    answer: "1920",
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
  },
  {
    question:
      "Hồ Chí Minh từng bị chính quyền thực dân Anh bắt giam tại đâu vào năm 1931?",
    options: ["Pháp", "Trung Quốc", "Liên Xô", "Hong Kong"],
    answer: "Hong Kong",
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
  },
  {
    question:
      "Hồ Chí Minh trở về Việt Nam lần đầu sau hơn 30 năm bôn ba vào năm nào?",
    options: ["1925", "1930", "1941", "1945"],
    answer: "1941",
  },
  {
    question:
      "Tờ báo nào do Hồ Chí Minh sáng lập để tuyên truyền cách mạng trong giai đoạn hoạt động ở Pháp?",
    options: ["Nhân Dân", "Le Paria", "Thanh Niên", "Cờ Giải Phóng"],
    answer: "Le Paria",
  },
  {
    question:
      "Hồ Chí Minh đã đọc bản Tuyên ngôn Độc lập của Việt Nam vào ngày nào?",
    options: ["30/4/1945", "2/9/1945", "19/8/1945", "7/5/1954"],
    answer: "2/9/1945",
  },
];

const MiniGame = () => {
  const [time, setTime] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!submitted) {
      const timer = setInterval(() => setTime((prev) => prev + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [submitted]);

  const handleAnswer = (qIndex, option) => {
    setAnswers({ ...answers, [qIndex]: option });
  };

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.answer) correct++;
    });
    setScore(correct);
    setSubmitted(true);
  };

  const handleReset = () => {
    setAnswers({});
    setScore(0);
    setTime(0);
    setSubmitted(false);
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

  return (
    <Container className="py-5">
      {/* Header */}
      <div className="text-center mb-5">
        <Badge bg="danger" className="mb-3 fs-6">
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
          <Col md={6}>
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <Row className="text-center">
                  <Col>
                    <div className="mb-2">
                      <i className="bi bi-clock text-primary fs-3"></i>
                    </div>
                    <h5 className="mb-1">{formatTime(time)}</h5>
                    <small className="text-muted">Thời gian</small>
                  </Col>
                  <Col>
                    <div className="mb-2">
                      <i className="bi bi-question-circle text-warning fs-3"></i>
                    </div>
                    <h5 className="mb-1">
                      {Object.keys(answers).length}/{questions.length}
                    </h5>
                    <small className="text-muted">Đã trả lời</small>
                  </Col>
                  {submitted && (
                    <Col>
                      <div className="mb-2">
                        <i
                          className={`bi bi-trophy text-${getScoreColor()} fs-3`}
                        ></i>
                      </div>
                      <h5 className="mb-1">
                        {score}/{questions.length}
                      </h5>
                      <small className="text-muted">Điểm số</small>
                    </Col>
                  )}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Progress Bar */}
      {!submitted && (
        <div className="mb-4">
          <ProgressBar
            now={(Object.keys(answers).length / questions.length) * 100}
            variant="danger"
            className="mb-2"
            style={{ height: "8px" }}
          />
          <p className="text-center text-muted mb-4">
            Tiến độ: {Object.keys(answers).length}/{questions.length} câu hỏi
          </p>
        </div>
      )}

      {/* Questions */}
      {!submitted ? (
        <>
          <Row>
            {questions.map((q, index) => (
              <Col lg={6} key={index} className="mb-4">
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body>
                    <div className="d-flex align-items-start mb-3">
                      <Badge bg="danger" className="me-2 mt-1">
                        {index + 1}
                      </Badge>
                      <Card.Title className="mb-0 flex-grow-1">
                        {q.question}
                      </Card.Title>
                    </div>

                    <Form>
                      {q.options.map((option, optIndex) => (
                        <Form.Check
                          key={optIndex}
                          type="radio"
                          id={`q${index}-opt${optIndex}`}
                          name={`question-${index}`}
                          label={option}
                          value={option}
                          checked={answers[index] === option}
                          onChange={() => handleAnswer(index, option)}
                          className="mb-2"
                        />
                      ))}
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <div className="text-center mt-4">
            <Button
              variant="danger"
              size="lg"
              onClick={handleSubmit}
              disabled={Object.keys(answers).length < questions.length}
              className="px-5"
            >
              <i className="bi bi-check-circle me-2"></i>
              Nộp Bài
            </Button>
          </div>
        </>
      ) : (
        /* Results */
        <div className="text-center">
          <Alert variant={getScoreColor()} className="mb-4">
            <Alert.Heading>
              <i className={`bi bi-trophy me-2`}></i>
              Kết Quả Trắc Nghiệm
            </Alert.Heading>
            <hr />
            <Row className="justify-content-center">
              <Col md={8}>
                <h4>
                  Bạn đã trả lời đúng {score}/{questions.length} câu hỏi
                </h4>
                <p className="mb-0">Thời gian hoàn thành: {formatTime(time)}</p>
                <p className="mb-3">
                  Tỷ lệ chính xác:{" "}
                  {((score / questions.length) * 100).toFixed(1)}%
                </p>

                {score >= 8 && (
                  <p className="text-success fw-bold">
                    <i className="bi bi-star-fill me-2"></i>
                    Xuất sắc! Bạn có hiểu biết sâu sắc về lịch sử.
                  </p>
                )}
                {score >= 6 && score < 8 && (
                  <p className="text-warning fw-bold">
                    <i className="bi bi-hand-thumbs-up me-2"></i>
                    Khá tốt! Hãy tìm hiểu thêm để nâng cao kiến thức.
                  </p>
                )}
                {score < 6 && (
                  <p className="text-danger fw-bold">
                    <i className="bi bi-book me-2"></i>
                    Hãy nghiên cứu thêm về lịch sử để cải thiện kết quả.
                  </p>
                )}
              </Col>
            </Row>
          </Alert>

          <div className="d-flex gap-3 justify-content-center">
            <Button variant="outline-danger" size="lg" onClick={handleReset}>
              <i className="bi bi-arrow-clockwise me-2"></i>
              Chơi Lại
            </Button>
            <Button variant="danger" size="lg" href="/">
              <i className="bi bi-house me-2"></i>
              Về Trang Chủ
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default MiniGame;
