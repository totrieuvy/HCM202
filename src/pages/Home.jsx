import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";
import TimelineModal from "../components/TimelineModal";
import ChatSidebar from "../components/ChatSidebar";
import FloatingChatButton from "../components/FloatingChatButton";

// Import images - using public assets
const BOSTOM = "/assets/boston-C63CgLHY.png";
const CATON = "/assets/caton-CKfsCMDu.png";
const MAIL = "/assets/mail-sIXJWKef.png";
const BACHOBG = "/assets/bachobg-B74Dg2wk.png";
const YEAR_1911_1 = "/assets/1911_1-BFVo1QDS.jpg";
const PHAP = "/assets/phap_1-8cQQJFxl.jpg";
const YEAR_1920 = "/assets/1920-Bk2DqWwW.jpg";
const YEAR_1921 = "/assets/1921-BT6eyVl3.jpg";
const YEAR_1911_2 = "/assets/1911_1-drAEUR0R.png";
const LIENXO = "/assets/lienxo_1-BtmAy91Z.jpg";
const TRUNGQUOC = "/assets/trungquoc_1-CiQqM8E3.jpg";
const DANGCONGSANVIETNAM = "/assets/dangcongsanvietnam-BJVASemK.jpg";
const YEAR_1931 = "/assets/1931-CatV4Oen.jpg";
const LIENXO2 = "/assets/lienxo_2-DtadcOoc.jpg";
const YEAR_1935 = "/assets/1935-C10ibcDH.jpg";
const YEAR_1941 = "/assets/1941-CtfBYOcV.jpg";
const VN_FLAG = "/assets/vn_flag.jpg";

const Home = () => {
  const [selectedTimeline, setSelectedTimeline] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  const timelineData = [
    {
      year: "1911",
      title: "Ra đi tìm đường cứu nước",
      content:
        "Nguyễn Tất Thành rời bến cảng Nhà Rồng, bắt đầu hành trình 30 năm tìm đường cứu nước.",
      image: YEAR_1911_1,
      position: "left",
      details: [
        "Ngày 5/6/1911, Nguyễn Tất Thành 21 tuổi rời Việt Nam trên tàu Amiral Latouche-Tréville",
        "Mục đích: Tìm hiểu văn minh phương Tây để cứu nước",
        "Đây là bước ngoặt quan trọng trong cuộc đời Người",
        "Bắt đầu hành trình dài 30 năm xa quê hương",
      ],
      significance:
        "Quyết định ra đi tìm đường cứu nước thể hiện ý chí kiên cường và tình yêu nước sâu sắc của thanh niên Nguyễn Tất Thành.",
    },
    {
      year: "1912-1913",
      title: "Thời gian ở Hoa Kỳ và Anh",
      content:
        "Người sang Hoa Kỳ làm phụ bếp tại khách sạn Omni Parker ở Boston, sau đó sang Anh làm các nghề khác nhau.",
      image: BOSTOM,
      position: "right",
      details: [
        "Tại Mỹ: Làm phụ bếp tại khách sạn Omni Parker House ở Boston",
        "Tại Anh: Làm nghề cào tuyết, đốt lò, phụ bếp tại khách sạn Carlton",
        "Học tiếng Anh và tìm hiểu văn hóa phương Tây",
        "Tiếp xúc với các tư tưởng dân chủ tự do",
      ],
      significance:
        "Thời gian này giúp Người hiểu rõ hơn về xã hội phương Tây và nhận thức về sự cần thiết phải đấu tranh cho độc lập dân tộc.",
    },
    {
      year: "1914",
      title: "Thư gửi Phan Châu Trinh",
      content:
        "Người gửi thư cho Phan Châu Trinh, thông báo tình hình bản thân và nhận xét về chiến tranh thế giới.",
      image: MAIL,
      position: "left",
      details: [
        "Thư được gửi từ London năm 1914",
        "Thông báo về tình hình học tập và sinh hoạt của mình",
        "Bày tỏ quan điểm về Chiến tranh thế giới thứ nhất",
        "Thể hiện sự quan tâm đến tình hình trong nước",
      ],
      significance:
        "Lá thư cho thấy Người luôn duy trì mối quan hệ với các chí sĩ yêu nước trong nước và không ngừng theo dõi tình hình quê nhà.",
    },
    {
      year: "1917-1920",
      title: "Thời kỳ ở Pháp",
      content:
        "Tham gia các hoạt động chính trị, viết báo, và hình thành tư tưởng cách mạng sâu sắc.",
      image: PHAP,
      position: "right",
      details: [
        "Định cư tại Paris từ năm 1917",
        "Tham gia Hội người Việt yêu nước ở Pháp",
        "Viết báo Le Paria (Người cùng khổ) từ năm 1922",
        "Gửi Bản yêu sách 8 điểm tới Hội nghị Versailles năm 1919",
      ],
      significance:
        "Đây là thời kỳ Người bắt đầu hoạt động chính trị có tổ chức và tiếng tăm của Nguyễn Ái Quốc được biết đến rộng rãi.",
    },
    {
      year: "1920",
      title: "Tham gia thành lập Đảng Cộng sản Pháp",
      content:
        "Chính thức theo chủ nghĩa Mác-Lênin và tham gia thành lập Đảng Cộng sản Pháp.",
      image: YEAR_1920,
      position: "left",
      details: [
        "Tham dự Đại hội Tours ngày 25-30/12/1920",
        "Bỏ phiếu tán thành nghị quyết gia nhập Quốc tế Cộng sản",
        "Trở thành thành viên sáng lập Đảng Cộng sản Pháp",
        "Chính thức theo chủ nghĩa Mác-Lênin",
      ],
      significance:
        "Bước ngoặt quan trọng trong tư tưởng chính trị của Người, từ đây xác định con đường cách mạng vô sản cho Việt Nam.",
    },
    {
      year: "1921-1930",
      title: "Hoạt động quốc tế",
      content:
        "Hoạt động tại Liên Xô, Trung Quốc và các nước khác để học tập và chuẩn bị cho cách mạng Việt Nam.",
      image: LIENXO,
      position: "right",
      details: [
        "Sang Liên Xô học tập lý luận cách mạng (1923-1924)",
        "Hoạt động tại Trung Quốc từ 1925-1927",
        "Thành lập Hội Việt Nam Cách mạng Thanh niên (1925)",
        "Đào tạo cán bộ cách mạng cho Việt Nam",
      ],
      significance:
        "Thời kỳ tích lũy kinh nghiệm cách mạng quốc tế và chuẩn bị lực lượng cho cách mạng Việt Nam.",
    },
    {
      year: "1930",
      title: "Thành lập Đảng Cộng sản Việt Nam",
      content:
        "Thống nhất các tổ chức cộng sản trong nước thành Đảng Cộng sản Việt Nam.",
      image: DANGCONGSANVIETNAM,
      position: "left",
      details: [
        "Hội nghị thống nhất tại Hồng Kông ngày 3/2/1930",
        "Thống nhất 3 tổ chức cộng sản thành Đảng Cộng sản Việt Nam",
        "Thông qua Cương lĩnh chính trị đầu tiên của Đảng",
        "Đặt nền móng tổ chức lãnh đạo cách mạng Việt Nam",
      ],
      significance:
        "Sự kiện có ý nghĩa lịch sử to lớn, đánh dấu sự ra đời của đảng cách mạng của giai cấp công nhân Việt Nam.",
    },
    {
      year: "1941",
      title: "Trở về Việt Nam - Thành lập Việt Minh",
      content:
        "Sau 30 năm xa quê hương, Người trở về và thành lập Mặt trận Việt Minh.",
      image: YEAR_1941,
      position: "right",
      details: [
        "Trở về nước tháng 2/1941 sau 30 năm xa quê",
        "Thành lập Mặt trận Việt Minh ngày 19/5/1941",
        "Chọn tên Hồ Chí Minh từ thời điểm này",
        "Lãnh đạo trực tiếp cách mạng Việt Nam",
      ],
      significance:
        "Kết thúc hành trình tìm đường cứu nước, bắt đầu giai đoạn lãnh đạo trực tiếp nhân dân Việt Nam đấu tranh giành độc lập.",
    },
  ];

  const handleTimelineClick = (item) => {
    setSelectedTimeline(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTimeline(null);
  };

  const handleChatToggle = () => {
    setShowChat(!showChat);
  };

  return (
    <div>
      {/* Hero Section */}
      <section
        className="hero-section d-flex align-items-center text-white position-relative"
        style={{
          minHeight: "100vh",
          background: `linear-gradient(rgba(218, 37, 29, 0.8), rgba(255, 205, 0, 0.8)), url(${VN_FLAG}) center/cover`,
        }}
      >
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <div data-aos="fade-right">
                <Badge bg="warning" text="dark" className="mb-3 fs-6">
                  1911 - 1941
                </Badge>
                <h1 className="display-3 fw-bold mb-4">
                  30 Năm Tìm Đường
                  <span className="text-warning d-block">Cứu Nước</span>
                </h1>
                <p className="lead mb-4">
                  Hành trình vĩ đại của Chủ tịch Hồ Chí Minh từ khi rời bến cảng
                  Nhà Rồng đến khi trở về lãnh đạo dân tộc giành độc lập.
                </p>
                <div className="d-flex gap-3">
                  <a href="#timeline" className="btn btn-warning btn-lg px-4">
                    Khám Phá Hành Trình
                  </a>
                  <a
                    href="/minigame"
                    className="btn btn-outline-light btn-lg px-4"
                  >
                    Chơi Mini Game
                  </a>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div data-aos="fade-left" data-aos-delay="200">
                <img
                  src={BACHOBG}
                  alt="Hồ Chí Minh"
                  className="img-fluid rounded-3 shadow-lg"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-5 bg-light">
        <Container>
          <div className="text-center mb-5" data-aos="fade-up">
            <Badge bg="danger" className="mb-3 fs-6">
              Dòng Thời Gian
            </Badge>
            <h2 className="display-4 fw-bold text-danger">
              Hành Trình Lịch Sử
            </h2>
            <p className="lead text-muted">
              Theo dấu chân Bác Hồ qua 30 năm tìm đường cứu nước
            </p>
          </div>

          <div className="timeline-container position-relative">
            <div
              className="timeline-line position-absolute bg-danger"
              style={{
                left: "50%",
                transform: "translateX(-50%)",
                width: "4px",
                height: "100%",
                zIndex: 1,
              }}
            ></div>

            {timelineData.map((item, index) => (
              <div key={index} className="row mb-5 align-items-center">
                <Col
                  md={6}
                  className={item.position === "right" ? "order-md-2" : ""}
                >
                  <Card
                    className="border-0 shadow-sm h-100 timeline-card"
                    data-aos={
                      item.position === "left" ? "fade-right" : "fade-left"
                    }
                    data-aos-delay={index * 100}
                    style={{ cursor: "pointer", transition: "all 0.3s ease" }}
                    onClick={() => handleTimelineClick(item)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-5px)";
                      e.currentTarget.style.boxShadow =
                        "0 10px 25px rgba(0,0,0,0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 1px 3px rgba(0,0,0,0.12)";
                    }}
                  >
                    {item.image && (
                      <Card.Img
                        variant="top"
                        src={item.image}
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                    )}
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <Badge bg="danger">{item.year}</Badge>
                        <i className="bi bi-arrow-right-circle text-danger"></i>
                      </div>
                      <Card.Title className="text-danger fw-bold">
                        {item.title}
                      </Card.Title>
                      <Card.Text className="text-muted">
                        {item.content}
                      </Card.Text>
                      <small className="text-primary">
                        <i className="bi bi-info-circle me-1"></i>
                        Nhấp để xem chi tiết
                      </small>
                    </Card.Body>
                  </Card>
                </Col>
                <Col
                  md={6}
                  className={item.position === "right" ? "order-md-1" : ""}
                >
                  <div className="d-flex justify-content-center">
                    <div
                      className="timeline-point bg-danger rounded-circle d-flex align-items-center justify-content-center shadow"
                      style={{
                        width: "60px",
                        height: "60px",
                        zIndex: 2,
                        position: "relative",
                      }}
                    >
                      <i className="bi bi-star-fill text-warning fs-4"></i>
                    </div>
                  </div>
                </Col>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Statistics Section */}
      {/* <section className="py-5 bg-danger text-white">
        <Container>
          <Row className="text-center">
            <Col md={3} data-aos="zoom-in" data-aos-delay="100">
              <div className="mb-3">
                <i className="bi bi-calendar-event display-4"></i>
              </div>
              <h3 className="fw-bold">30</h3>
              <p className="mb-0">Năm tìm đường cứu nước</p>
            </Col>
            <Col md={3} data-aos="zoom-in" data-aos-delay="200">
              <div className="mb-3">
                <i className="bi bi-globe display-4"></i>
              </div>
              <h3 className="fw-bold">20+</h3>
              <p className="mb-0">Quốc gia đã đến</p>
            </Col>
            <Col md={3} data-aos="zoom-in" data-aos-delay="300">
              <div className="mb-3">
                <i className="bi bi-people display-4"></i>
              </div>
              <h3 className="fw-bold">100+</h3>
              <p className="mb-0">Tên tuổi đã sử dụng</p>
            </Col>
            <Col md={3} data-aos="zoom-in" data-aos-delay="400">
              <div className="mb-3">
                <i className="bi bi-book display-4"></i>
              </div>
              <h3 className="fw-bold">50+</h3>
              <p className="mb-0">Ngôn ngữ đã học</p>
            </Col>
          </Row>
        </Container>
      </section> */}

      {/* Call to Action */}
      <section className="py-5 bg-warning text-dark">
        <Container>
          <Row className="align-items-center">
            <Col lg={8} data-aos="fade-right">
              <h3 className="fw-bold mb-3">
                Khám phá thêm về hành trình lịch sử
              </h3>
              <p className="mb-0 lead">
                Tham gia mini game và trò chuyện với AI để tìm hiểu sâu hơn về
                cuộc đời và sự nghiệp của Bác Hồ.
              </p>
            </Col>
            <Col lg={4} className="text-lg-end" data-aos="fade-left">
              <a href="/minigame" className="btn btn-danger btn-lg me-3">
                Mini Game
              </a>
              <a href="/aichat" className="btn btn-outline-danger btn-lg">
                AI Chat
              </a>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Timeline Modal */}
      <TimelineModal
        show={showModal}
        onHide={handleCloseModal}
        timelineData={selectedTimeline}
      />

      {/* Floating Chat Button */}
      <FloatingChatButton onClick={handleChatToggle} isActive={showChat} />

      {/* Chat Sidebar */}
      <ChatSidebar show={showChat} onClose={handleChatToggle} />
    </div>
  );
};

export default Home;
