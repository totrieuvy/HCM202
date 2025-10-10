import React, { useEffect } from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import { motion } from "framer-motion";
import AOS from "aos";

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  const teamMembers = [
    {
      name: "Võ Minh Trí - SE183322",
      role: "Leader & Thiết kế web",
      skills: ["React", "Bootstrap", "Project Management"],
      description: "Chịu trách nhiệm quản lý dự án, phát triển giao diện người dùng, kiểm tra nội dung.",
    },
    {
      name: "Tô Triều Vỹ - SE183178",
      role: "Thiết kế web & làm nội dung",
      skills: ["Node.js", "AI Integration", "API Development"],
      description: "Phát triển giao diện người dùng và tìm hiểu nội dung cho trang web.",
    },
    {
      name: "Phạm Cẩm Hoàng - SE183867",
      role: "Chatbox AI",
      skills: ["UI/UX Design", "Content Writing", "Historical Research"],
      description: "Chatbox AI.",
    },
    {
      name: "Đỗ Minh Quang - SE170316",
      role: "Thuyết  trình",
      skills: ["UI/UX Design", "Content Writing", "Historical Research"],
      description: "Thuyết  trình",
    },
    {
      name: "Đỗ Lê Châu Nhật Minh - SE173451",
      role: "Thuyết  trình",
      skills: ["UI/UX Design", "Content Writing", "Historical Research"],
      description: "Thuyết  trình",
    },
    {
      name: "Nguyễn Tâm Đan - SE181527",
      role: "Tìm hiểu nội dung cho trang web",
      skills: ["UI/UX Design", "Content Writing", "Historical Research"],
      description: "Tìm hiểu nội dung cho trang web",
    },
  ];

  const technologies = [
    {
      category: "Frontend Framework",
      items: [
        {
          name: "React 19.1.1",
          description: "Thư viện JavaScript hiện đại cho xây dựng giao diện người dùng",
        },
        {
          name: "Bootstrap 5",
          description: "Framework CSS responsive cho thiết kế nhanh chóng",
        },
        {
          name: "React Bootstrap",
          description: "Components Bootstrap được tối ưu cho React",
        },
      ],
    },
    {
      category: "Animation & Effects",
      items: [
        {
          name: "Framer Motion",
          description: "Thư viện animation mạnh mẽ cho React",
        },
        {
          name: "AOS (Animate On Scroll)",
          description: "Hiệu ứng animation khi cuộn trang",
        },
        {
          name: "React Spring",
          description: "Thư viện animation dựa trên physics",
        },
      ],
    },
    {
      category: "Routing & Navigation",
      items: [
        {
          name: "React Router DOM",
          description: "Thư viện routing chính thức cho React",
        },
        {
          name: "React Router Bootstrap",
          description: "Tích hợp Bootstrap với React Router",
        },
      ],
    },
    {
      category: "AI & External Services",
      items: [
        {
          name: "Custom AI API",
          description: "API AI chuyên biệt về lịch sử Việt Nam",
        },
        {
          name: "OpenAI GPT",
          description: "Mô hình ngôn ngữ lớn để trả lời câu hỏi",
        },
        {
          name: "Natural Language Processing",
          description: "Xử lý ngôn ngữ tự nhiên tiếng Việt",
        },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div>
      {/* Hero Section */}
      <section
        className="py-5 text-white position-relative"
        style={{
          background: "linear-gradient(135deg, #dc3545 0%, #c82333 50%, #ffc107 100%)",
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge bg="light" text="dark" className="mb-3 fs-6">
              Về Chúng Tôi
            </Badge>
            <h1 className="display-3 fw-bold mb-4">Dự Án Giáo Dục Lịch Sử</h1>
            <p className="lead mb-4 opacity-90">
              Ứng dụng web tương tác về hành trình 30 năm tìm đường cứu nước của Chủ tịch Hồ Chí Minh, được phát triển
              với công nghệ hiện đại và trí tuệ nhân tạo.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Project Overview */}
      <section className="py-5 bg-light">
        <Container>
          <motion.div
            className="text-center mb-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="display-4 fw-bold text-danger mb-4">Tổng Quan Dự Án</h2>
          </motion.div>

          <Row className="g-4">
            <Col md={4} data-aos="fade-up" data-aos-delay="100">
              <Card className="border-0 shadow-sm h-100 text-center">
                <Card.Body className="p-4">
                  <div
                    className="bg-danger text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                    style={{ width: "80px", height: "80px" }}
                  >
                    <i className="bi bi-book fs-2"></i>
                  </div>
                  <h5 className="fw-bold mb-3">Giáo Dục Tương Tác</h5>
                  <p className="text-muted">
                    Timeline tương tác với hiệu ứng động, giúp người dùng khám phá lịch sử một cách sinh động và hấp
                    dẫn.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4} data-aos="fade-up" data-aos-delay="200">
              <Card className="border-0 shadow-sm h-100 text-center">
                <Card.Body className="p-4">
                  <div
                    className="bg-warning text-dark rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                    style={{ width: "80px", height: "80px" }}
                  >
                    <i className="bi bi-robot fs-2"></i>
                  </div>
                  <h5 className="fw-bold mb-3">Trí Tuệ Nhân Tạo</h5>
                  <p className="text-muted">
                    Tích hợp AI chatbot chuyên biệt về lịch sử Việt Nam, trả lời câu hỏi một cách thông minh và chính
                    xác.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4} data-aos="fade-up" data-aos-delay="300">
              <Card className="border-0 shadow-sm h-100 text-center">
                <Card.Body className="p-4">
                  <div
                    className="bg-success text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                    style={{ width: "80px", height: "80px" }}
                  >
                    <i className="bi bi-controller fs-2"></i>
                  </div>
                  <h5 className="fw-bold mb-3">Mini Game</h5>
                  <p className="text-muted">
                    Trắc nghiệm kiến thức với giao diện hiện đại, giúp củng cố và đánh giá hiểu biết về lịch sử.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Team Section */}
      <section className="py-5">
        <Container>
          <div className="text-center mb-5" data-aos="fade-up">
            <Badge bg="danger" className="mb-3 fs-6">
              Đội Ngũ
            </Badge>
            <h2 className="display-4 fw-bold text-danger">Thành Viên Tham Gia</h2>
          </div>

          <Row className="g-4">
            {teamMembers.map((member, index) => (
              <Col lg={4} key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                <Card className="border-0 shadow-sm h-100">
                  <Card.Body className="text-center p-4">
                    <h5 className="fw-bold text-danger">{member.name}</h5>
                    <p className="text-muted mb-3">{member.role}</p>
                    <div className="mb-3">
                      {member.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} bg="outline-danger" className="me-2 mb-2">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <p className="small text-muted">{member.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Technologies Section */}
      <section className="py-5 bg-light">
        <Container>
          <div className="text-center mb-5" data-aos="fade-up">
            <Badge bg="success" className="mb-3 fs-6">
              Công Nghệ
            </Badge>
            <h2 className="display-4 fw-bold text-success">Công Nghệ Sử Dụng</h2>
          </div>

          <Row className="g-4">
            {technologies.map((tech, index) => (
              <Col lg={6} key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                <Card className="border-0 shadow-sm h-100">
                  <Card.Header
                    className="bg-gradient text-white"
                    style={{
                      background: "linear-gradient(135deg, #28a745, #20c997)",
                    }}
                  >
                    <h5 className="mb-0">
                      <i className="bi bi-gear-fill me-2"></i>
                      {tech.category}
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    {tech.items.map((item, itemIndex) => (
                      <motion.div
                        key={itemIndex}
                        className="mb-3 pb-3 border-bottom"
                        whileHover={{ x: 10 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <h6 className="fw-bold text-success mb-1">{item.name}</h6>
                        <p className="text-muted small mb-0">{item.description}</p>
                      </motion.div>
                    ))}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* AI Technology Highlight */}
      {/* <section
        className="py-5"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <Container>
          <Row className="align-items-center">
            <Col lg={6} data-aos="fade-right">
              <div className="text-white">
                <Badge bg="light" text="dark" className="mb-3">
                  AI Integration
                </Badge>
                <h2 className="display-5 fw-bold mb-4">
                  Trí Tuệ Nhân Tạo Chuyên Biệt
                </h2>
                <p className="lead mb-4">
                  Dự án tích hợp API AI được huấn luyện chuyên biệt về lịch sử
                  Việt Nam, đặc biệt là cuộc đời và sự nghiệp của Chủ tịch Hồ
                  Chí Minh.
                </p>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-warning me-2"></i>
                    Xử lý ngôn ngữ tự nhiên tiếng Việt
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-warning me-2"></i>
                    Cơ sở dữ liệu lịch sử phong phú
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-warning me-2"></i>
                    Trả lời thông minh và chính xác
                  </li>
                  <li className="mb-0">
                    <i className="bi bi-check-circle-fill text-warning me-2"></i>
                    Cập nhật liên tục kiến thức mới
                  </li>
                </ul>
              </div>
            </Col>
            <Col lg={6} data-aos="fade-left">
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <div
                  className="bg-white rounded-3 p-5 shadow-lg mx-auto"
                  style={{ maxWidth: "400px" }}
                >
                  <div className="mb-4">
                    <i
                      className="bi bi-cpu-fill text-primary"
                      style={{ fontSize: "4rem" }}
                    ></i>
                  </div>
                  <h4 className="fw-bold text-primary mb-3">API Endpoint</h4>
                  <code className="bg-light p-2 rounded d-block text-dark">
                    https://aziky.duckdns.org/hcm
                  </code>
                  <p className="text-muted mt-3 mb-0">
                    Dịch vụ AI được tối ưu cho câu hỏi về lịch sử Việt Nam
                  </p>
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section> */}

      {/* Call to Action */}
      <section className="py-5 bg-danger text-white">
        <Container>
          <Row className="text-center">
            <Col>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="fw-bold mb-4">Khám Phá Hành Trình Lịch Sử</h3>
                <p className="lead mb-4">Bắt đầu cuộc hành trình tìm hiểu về 30 năm tìm đường cứu nước của Bác Hồ</p>
                <motion.div className="d-flex gap-3 justify-content-center" whileHover={{ scale: 1.05 }}>
                  <a href="/" className="btn btn-warning btn-lg px-4">
                    <i className="bi bi-house me-2"></i>
                    Về Trang Chủ
                  </a>
                  <a href="/minigame" className="btn btn-outline-light btn-lg px-4">
                    <i className="bi bi-controller me-2"></i>
                    Chơi Game
                  </a>
                </motion.div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default About;
