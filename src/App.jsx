import React, { useState, useEffect, useRef } from "react";
import "./css/App.css";
import vietnamFlag from "./assets/vietnam-flag.gif";

import MiniGame from "./MiniGame";

const App = () => {
  const [isFixed, setIsFixed] = useState(true);

  const [hoveredSection, setHoveredSection] = useState(null);
  const [imageContainerVisible, setImageContainerVisible] = useState(false);
  const [isHoveringContainer, setIsHoveringContainer] = useState(false);
  const imageContainerRef = useRef(null);

  // DATA FOR SECTIONS
  const sectionTitles = ["Đầu tháng 12 năm 1912", "Cuối năm 1913", "Đầu năm 1914", "Năm 1917"];

  const sectionContents = [
    "Người sang Hoa Kỳ và làm phụ bếp tại khách sạn Omni Parker ở Boston.",
    "Nguyễn Tất Thành rời nước Mỹ sang nước Anh làm nghề cào tuyết cho một trường học, đốt lò rồi phụ bếp cho khách sạn Carlton.",
    "Người gửi thư cho Phan Châu Trinh, thông báo vắn tắt tình hình bản thân, đưa ra những nhận xét về chiến tranh thế giới đang diễn ra và dự đoán những chuyển biến có thể có.",
    "Đoàn kết quốc tế là một chiến lược quan trọng trong cuộc đấu tranh của Việt Nam để chống lại các thế lực đế quốc, thực dân, và các nước xâm lược. Hồ Chí Minh chủ trương không chỉ đấu tranh độc lập cho Việt Nam mà còn thúc đẩy sự đoàn kết của các quốc gia bị áp bức để giải phóng lẫn nhau khỏi ách thống trị của các đế quốc phương Tây.",
  ];

  const sectionImages = [
    "/src/assets/boston-C63CgLHY.png",
    "/src/assets/caton-CKfsCMDu.png",
    "/src/assets/mail-sIXJWKef.png",
    null,
  ];

  // FIXED HOVER LOGIC
  const handleSectionMouseEnter = (index) => {
    setImageContainerVisible(true);
    setHoveredSection(index);
    setIsHoveringContainer(false);
  };

  const handleSectionMouseLeave = () => {
    if (!isHoveringContainer) {
      setTimeout(() => {
        if (!isHoveringContainer) {
          setImageContainerVisible(false);
          setHoveredSection(null);
        }
      }, 100);
    }
  };

  const handleImageContainerMouseEnter = () => {
    setImageContainerVisible(true);
    setIsHoveringContainer(true);
    if (hoveredSection === null) {
      setHoveredSection(0);
    }
  };

  const handleImageContainerMouseLeave = () => {
    setIsHoveringContainer(false);
    setTimeout(() => {
      if (hoveredSection === null) {
        setImageContainerVisible(false);
        setHoveredSection(null);
      }
    }, 150);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsFixed(scrollTop <= 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="background">
        <img
          src={vietnamFlag}
          alt="Vietnam Flag Background"
          style={{
            width: "100vw",
            height: "100vh",
            objectFit: "cover",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: -1,
          }}
        />
      </div>
      <div className="home-page">
        <div className="home-title">
          <div className={`content ${isFixed ? "fixed" : ""}`}>
            <h1>HỒ CHÍ MINH - HÀNH TRÌNH VÌ</h1>
            <h1>HÒA BÌNH VÀ ĐỘC LẬP DÂN TỘC</h1>
          </div>
        </div>
        <div className="home-content">
          <div className="content-p1">
            <div
              className="intro"
              style={{
                backgroundImage: `url("/src/assets/bachobg-B74Dg2wk.png")`,
              }}
            >
              <h1 className="title" style={{ fontFamily: "heading-font" }}>
                Bối cảnh lịch sử
              </h1>
              <p className="content">
                Đầu thế kỷ XX, đất nước ta dưới ách thống trị của thực dân Pháp và phong kiến tay sai, đắm chìm trong
                ách nô lệ, bị xoá tên trên bản đồ thế giới. Không chịu khuất phục cảnh lầm than nô lệ, hàng trăm cuộc
                khởi nghĩa đã diễn ra, nhưng các con đường cứu nước mang màu sắc khác nhau, phong kiến hay dân chủ tư
                sản của các bậc tiền bối, sĩ phu yêu nước đương thời đều thất bại, bế tắc
              </p>
              <p className="content">
                Nhận thức sâu sắc về thực tại xã hội và rất đau xót trước nỗi thống khổ của dân tộc, người thanh niên
                yêu nước Nguyễn Tất Thành đã sớm có ý chí đánh đuổi thực dân Pháp, giải phóng đồng bào, nên quyết định
                xuất dương tìm đường cứu nước. Người đi sang nước Pháp, sang Phương Tây để tìm hiểu vì sao họ giàu mạnh
                và hiểu những gì ẩn giấu sau những từ tự do-bình đẳng-bác ái mà thực dân Pháp rêu rao ở các nước thuộc
                địa
              </p>
            </div>
          </div>
          <div className="content-course-intro">
            <div>
              <img src="/src/assets/1911_1-BFVo1QDS.jpg" alt="logo" />
            </div>
            <div>
              <p className="title" style={{ fontFamily: "heading-font", fontWeight: 800 }}>
                <span className="node">1</span> THỜI KỲ 1911 - 1919
              </p>
              <p className="content" style={{ fontFamily: "text-font" }}>
                Ngày 5-6-1911, từ Bến cảng Nhà Rồng, người thanh niên yêu nước Nguyễn Tất Thành với tên mới là Nguyễn
                Văn Ba đã lên con tàu Amiral Latouche Tréville (Pháp), với mong muốn học hỏi những tinh hoa và tiến bộ
                từ các nước phương Tây.
              </p>
            </div>
          </div>
          <div className="content-11">
            <div className="content-wrapper">
              {/* TRÁI - TEXT SECTIONS */}
              <div className="text-sections">
                {sectionTitles.map((title, index) => (
                  <div
                    key={index}
                    className={`section-content-11 ${hoveredSection === index ? "hovered" : ""}`}
                    onMouseEnter={() => handleSectionMouseEnter(index)}
                    onMouseLeave={handleSectionMouseLeave}
                  >
                    <h2
                      style={{
                        fontFamily: "heading-font",
                        color: hoveredSection === index ? "#ffcd00" : "rgb(255, 205, 0)",
                        transition: "all 0.3s ease",
                        textShadow: hoveredSection === index ? "0 0 10px rgba(255, 205, 0, 0.5)" : "none",
                      }}
                    >
                      {title}
                    </h2>
                    <p
                      style={{
                        fontFamily: "text-font",
                        fontSize: "20px",
                        opacity: hoveredSection === index ? 1 : 0.8,
                        transition: "all 0.3s ease",
                        transform: hoveredSection === index ? "translateX(5px)" : "none",
                      }}
                    >
                      {sectionContents[index]}
                    </p>
                  </div>
                ))}
              </div>

              {/* PHẢI - IMAGE CONTAINER */}
              <div
                ref={imageContainerRef}
                className={`image-container-11 ${imageContainerVisible ? "visible" : "hidden"}`}
                onMouseEnter={handleImageContainerMouseEnter}
                onMouseLeave={handleImageContainerMouseLeave}
              >
                {/* ẢNH CHO SECTION 1-3 */}
                {hoveredSection !== null && hoveredSection < 3 && imageContainerVisible && (
                  <img
                    src={sectionImages[hoveredSection]}
                    alt={`Section ${hoveredSection + 1} image`}
                    className="img-slideshow fade-in"
                    style={{
                      position: "absolute",
                      top:
                        hoveredSection === 0
                          ? "25%"
                          : hoveredSection === 1
                          ? "275px"
                          : hoveredSection === 2
                          ? "540px"
                          : "25%",
                      // Tính toán vị trí động dựa trên section đang hover
                      left: "55%",
                      transform: "translateX(-50%)",
                      maxWidth: "max-content",
                      width: "80%",
                      objectFit: "cover",
                      borderRadius: "12px",
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                      transition: "all 0.4s ease",
                      opacity: imageContainerVisible ? 1 : 0,
                      visibility: imageContainerVisible ? "visible" : "hidden",
                    }}
                  />
                )}
                {/* PLACEHOLDER SECTION 4 */}
                {hoveredSection === 3 && imageContainerVisible && (
                  <div className="no-image-placeholder fade-in">
                    <div className="placeholder-content">
                      <p
                        style={{
                          textAlign: "center",
                          color: "#666",
                          fontStyle: "italic",
                          margin: 0,
                          fontSize: "16px",
                          padding: "40px 20px",
                        }}
                      >
                        Không có hình ảnh minh họa
                      </p>
                      <div className="placeholder-icon" style={{ fontSize: "48px", marginTop: "10px" }}>
                        📜
                      </div>
                    </div>
                  </div>
                )}
                {/* DEFAULT STATE */}
                {hoveredSection === null && imageContainerVisible && (
                  <div className="default-image-placeholder fade-in">
                    <p
                      style={{
                        textAlign: "center",
                        color: "#888",
                        fontSize: "18px",
                        padding: "60px 20px",
                      }}
                    >
                      Di chuột vào các mục bên trái để xem hình ảnh
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* <div className="navbar hide">
            <div
              className="navbar-content-11"
              style={{
                transform: "translateX(0px)",
                transition: "transform 0.3s",
              }}
            >
              <span className="nav-item-11">Đầu tháng 12 năm 1912</span>
              <span className="nav-item-11">Cuối năm 1913</span>
              <span className="nav-item-11">Đầu năm 1914</span>
              <span className="nav-item-11">Năm 1917</span>
            </div>
            <div className="progress-bar" style={{ width: "0%" }}></div>
          </div> */}
          <div className="content-21">
            <div className="grid">
              <div>
                <p className="title" style={{ fontFamily: "heading-font", fontWeight: 800 }}>
                  <span className="node" style={{ fontFamily: "heading-font", fontWeight: 800 }}>
                    2
                  </span>{" "}
                  Thời kỳ ở pháp
                </p>
                <p className="content" style={{ fontFamily: "text-font", fontSize: "20px" }}>
                  Ngày 18-6-1919, với tên Nguyễn Ái Quốc, chàng thanh niên thay mặt những người Việt Nam yêu nước tại
                  Pháp gửi bản yêu sách tới Hội nghị Vécxây yêu cầu về quyền tự do, dân chủ, bình đẳng dân tộc cho nhân
                  dân An Nam. Tuy bản yêu sách không được chấp nhận nhưng đã được lan truyền rộng rãi, gây tiếng vang
                  lớn trong dư luận nước Pháp, thức tỉnh tinh thần đấu tranh của các nước thuộc địa; đồng thời cũng đem
                  lại cho Nguyễn Ái Quốc một nhận thức là các dân tộc muốn được giải phóng chỉ có thể dựa vào sức của
                  chính mình.
                </p>
              </div>
              <div>
                <img src="/src/assets/phap_1-8cQQJFxl.jpg" alt="21" />
              </div>
            </div>
            <div
              style={{
                marginTop: "50px",
                padding: "0px 10rem",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p className="content" style={{ fontFamily: "text", fontSize: "20px" }}>
                Vào tháng 7 năm 1920, Nguyễn Ái Quốc đọc Sơ thảo lần thứ nhất những Luận cương về vấn đề dân tộc và
                thuộc địa của Lenin đăng trên báo L'Humanité (tờ này là cơ quan phát ngôn của Đảng Cộng sản Pháp), từ đó
                Người đi theo chủ nghĩa cộng sản. Người tham dự Đại hội lần thứ 18 của Đảng Xã hội Pháp tại Tours với tư
                cách là đại biểu Đông Dương, trở thành một trong những sáng lập viên của Đảng Cộng sản Pháp. Sau này,
                Người thừa nhận:{" "}
                <strong>
                  {" "}
                  "Lúc đầu, chính là chủ nghĩa yêu nước chứ không phải chủ nghĩa cộng sản đã làm tôi tin theo Lênin, tin
                  theo Quốc tế III."
                </strong>
              </p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img src="/src/assets/1920-Bk2DqWwW.jpg" alt="logo" style={{ width: "850px", paddingTop: "80px" }} />
              </div>
            </div>
            <div
              style={{
                marginTop: "50px",
                padding: "0px 10rem",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p className="content" style={{ fontFamily: "text", fontSize: "20px" }}>
                Năm 1921, Người cùng một số nhà yêu nước của các thuộc địa Pháp lập ra Hội Liên hiệp Thuộc địa. Năm
                1922, Người cùng một số nhà cách mạng thuộc địa ra báo Le Paria (Người cùng khổ). Tác phẩm Bản án chế độ
                thực dân Pháp do Người viết được xuất bản năm 1925, đã tố cáo chính sách thực dân tàn bạo của Pháp và đề
                cập đến phong trào đấu tranh của các dân tộc thuộc địa.
                <strong>
                  {" "}
                  "Lúc đầu, chính là chủ nghĩa yêu nước chứ không phải chủ nghĩa cộng sản đã làm tôi tin theo Lênin, tin
                  theo Quốc tế III."
                </strong>
              </p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img src="/src/assets/1921-BT6eyVl3.jpg" alt="logo" style={{ width: "850px", paddingTop: "80px" }} />
              </div>
            </div>
          </div>
          <div className="content-p1">
            <div
              className="intro"
              style={{
                backgroundImage: `url("/src/assets/1911_1-drAEUR0R.png")`,
              }}
            >
              <h1 className="title" style={{ fontFamily: "heading-font" }}>
                THỜI KỲ Ở LIÊN XÔ LẦN THỨ I
              </h1>
              <div style={{ fontFamily: "text-font" }}>
                <p
                  style={{
                    padding: "0px 80px",
                    fontSize: "20px",
                    color: "black",
                  }}
                >
                  Vào tháng 6 năm 1923, Nguyễn Ái Quốc đến Moskva học tại Trường Đại học Lao động Cộng sản Phương Đông.
                  Tại Đại hội lần thứ 5 của Quốc tế Cộng sản, ông nhấn mạnh mối quan hệ giữa vận mệnh của giai cấp vô
                  sản và các dân tộc thuộc địa, đồng thời cảnh báo nguy cơ từ các thuộc địa. Người viết nhiều bài báo về
                  cuộc đấu tranh giai cấp công nhân ở các thuộc địa và mối liên hệ với cách mạng vô sản. Nguyễn Ái Quốc
                  cũng phân tích chiến lược quân sự của các nước lớn tại khu vực châu Á - Thái Bình Dương, dự đoán khu
                  vực này có thể trở thành "lò lửa" của một cuộc chiến tranh thế giới mới. Tất cả các hoạt động của ông
                  đều hướng đến giải phóng dân tộc khỏi ách thực dân.
                </p>
              </div>
              <div
                style={{
                  marginTop: "70px",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <img src="/src/assets/lienxo_1-BtmAy91Z.jpg" alt="logo" style={{ width: "500px" }} />
              </div>
            </div>
          </div>
          <div className="content-p1">
            <div
              className="intro"
              style={{
                backgroundImage: `url("/src/assets/1911_1-drAEUR0R.png")`,
              }}
            >
              <h1 className="title" style={{ fontFamily: "heading-font" }}>
                THỜI KỲ Ở TRUNG QUỐC (1924-1927)
              </h1>
              <div style={{ fontFamily: "text-font" }}>
                <p
                  style={{
                    padding: "0px 80px",
                    fontSize: "20px",
                    color: "black",
                  }}
                >
                  Ngày 11 tháng 11 nǎm 1924, Nguyễn Ái Quốc rời Liên Xô tới Quảng Châu, lấy tên là Lý Thụy, làm phiên
                  dịch trong phái đoàn cố vấn của chính phủ Liên Xô bên cạnh Chính phủ Trung Hoa Dân quốc. Thời gian này
                  Người cũng gặp mặt một số nhà cách mạng lão thành người Việt đang sống và hoạt động lưu vong trên đất
                  Trung Quốc, trong đó có Phan Bội Châu.
                </p>
                <p
                  style={{
                    padding: "0px 80px",
                    fontSize: "20px",
                    color: "black",
                  }}
                >
                  Vào năm 1925, Nguyễn Ái Quốc thành lập Hội Việt Nam Cách mạng Thanh niên để đào tạo thanh niên yêu
                  nước. Hội tổ chức các khóa học ngắn hạn, đào tạo hơn 75 hội viên và cử người sang Quảng Châu học tại
                  các trung tâm như Đại học Phương Đông và trường Quân chính Hoàng Phố. Chương trình học tập gồm lịch
                  sử, chủ nghĩa Mác-Lenin và các phong trào giải phóng dân tộc.
                </p>
              </div>
              <div
                style={{
                  marginTop: "70px",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <img src="/src/assets/trungquoc_1-CiQqM8E3.jpg" alt="logo" style={{ width: "500px" }} />
              </div>
            </div>
          </div>
          <div className="content-p1">
            <div
              className="intro"
              style={{
                backgroundImage: `url("/src/assets/1911_1-drAEUR0R.png")`,
              }}
            >
              <div style={{ fontFamily: "text-font" }}>
                <p
                  style={{
                    padding: "0px 80px",
                    fontSize: "20px",
                    color: "black",
                  }}
                >
                  Nguyễn Ái Quốc cũng phát hành tờ báo <strong>"Thanh Niên"</strong> và xuất bản cuốn
                  <strong>"Đường Kách Mệnh"</strong>, tập hợp các bài giảng của Người, để truyền bá tư tưởng cách mạng.
                  Người khẳng định rằng để cách mạng thành công, phải đoàn kết nhiều tầng lớp xã hội, bao gồm học trò,
                  nhà buôn, và điền chủ nhỏ. Một quan điểm quan trọng của ông trong thập niên 1920 là cách mạng giải
                  phóng dân tộc ở thuộc địa có thể thành công trước cách mạng vô sản ở các quốc gia chính quốc. Cùng năm
                  1925, ông tham gia thành lập Hội Liên hiệp các dân tộc bị áp bức ở Á Đông, do Liêu Trọng Khải, một
                  cộng sự thân tín của Tôn Dật Tiên, làm hội trưởng và ông làm bí thư. Tháng 5 năm 1927, chính quyền
                  Trung Hoa Dân Quốc đặt những người cộng sản ra ngoài vòng pháp luật, ông rời Quảng Châu đi Hồng Kông,
                  rồi sang Moskva. Tháng 11 năm 1927, ông được cử đi Pháp, rồi từ đó đi dự cuộc họp Đại hội đồng của
                  Liên đoàn chống chiến tranh đế quốc từ ngày 9 tháng 12 đến ngày 12 tháng 12 năm 1927 tại Bruxelles,
                  Bỉ. Sau đó, ông cũng qua Ý.
                </p>
              </div>
            </div>
          </div>
          <div className="content-p1">
            <div
              className="intro"
              style={{
                backgroundImage: `url("/src/assets/1911_1-drAEUR0R.png")`,
              }}
            >
              <h1 className="title">NHỮNG NĂM 1928 - 1929</h1>
              <div style={{ fontFamily: "text-font" }}>
                <p
                  style={{
                    padding: "0px 80px",
                    fontSize: "20px",
                    color: "black",
                  }}
                >
                  Mùa thu 1928, Hồ Chí Minh từ châu Âu đến Thái Lan, với bí danh "Thầu Chín" để tuyên truyền và huấn
                  luyện cho Việt kiều, đồng thời móc nối một số thanh thiếu niên Việt Nam sang Thái Lan hoạt động.
                </p>
                <p
                  style={{
                    padding: "0px 80px",
                    fontSize: "20px",
                    color: "black",
                  }}
                >
                  Người chủ trương tuyên truyền cho kiều bào và tổ chức họ vào những hội thân ái, tổ chức các buổi sinh
                  hoạt văn hóa cho họ, xin chính phủ Thái cho mở trường dành cho Việt kiều, Người đi (chủ yếu là đi bộ)
                  và vận động hầu khắp các vùng có kiều bào ở Thái Lan. Giống như tại nhiều nơi đã hoạt động, Người cho
                  in báo – tờ Thân ái.
                </p>
                <p
                  style={{
                    padding: "0px 80px",
                    fontSize: "20px",
                    color: "black",
                  }}
                >
                  Cuối năm 1929, Hồ Chí Minh rời Thái Lan, theo ngả Singapore để sang Trung Quốc.
                </p>
              </div>
            </div>
          </div>
          <div className="content-p1">
            <div
              className="intro"
              style={{
                backgroundImage: `url("/src/assets/1911_1-drAEUR0R.png")`,
              }}
            >
              <h1 className="title">THÀNH LẬP ĐẢNG CỘNG SẢN VIỆT NAM</h1>
              <div style={{ fontFamily: "text-font" }}>
                <p
                  style={{
                    padding: "0px 80px",
                    fontSize: "20px",
                    color: "black",
                  }}
                >
                  Khi điều kiện thành lập Đảng đã chín muồi, ngày 3-2-1930, dưới sự chủ trì của đồng chí Nguyễn Ái Quốc,
                  tại Hương Cảng (Trung Quốc), Hội nghị hợp nhất ba tổ chức cộng sản đã nhất trí thành lập một đảng
                  thống nhất là Đảng Cộng sản Việt Nam. Đây chính là kết quả khẳng định tầm nhìn, bản lĩnh, trí tuệ và
                  sự cống hiến của Nguyễn Ái Quốc trong việc vận dụng Chủ nghĩa Mác-Lênin vào việc thành lập một đảng
                  cách mạng chân chính để lãnh đạo cách mạng Việt Nam.
                </p>
              </div>
              <div
                style={{
                  marginTop: "70px",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <img src="/src/assets/dangcongsanvietnam-BJVASemK.jpg" alt="logo" style={{ width: "500px" }} />
              </div>
            </div>
          </div>
          <div className="content-p1">
            <div
              className="intro"
              style={{
                backgroundImage: `url("/src/assets/1911_1-drAEUR0R.png")`,
              }}
            >
              <h1 className="title">NHỮNG NĂM 1931 - 1933</h1>
              <div style={{ fontFamily: "text-font" }}>
                <p
                  style={{
                    padding: "0px 80px",
                    fontSize: "20px",
                    color: "black",
                  }}
                >
                  Năm 1931, dưới tên giả là Tống Văn Sơ, Nguyễn Ái Quốc bị nhà cầm quyền Hương Cảng (Hồng Kông) bắt
                  giam. Ông bị giam từ ngày 6 tháng 6 năm 1931 đến ngày 28 tháng 12 năm 1932. Ban đầu chính quyền Anh
                  tại Hồng Kông dự định trục xuất ông với ý định lực lượng của Pháp sẽ bắt ông và đưa về Việt Nam. Tại
                  đó Pháp sẽ thi hành ngay tức thì bản án tử hình vắng mặt cho Nguyễn Ái Quốc đã được tuyên tại Tòa án
                  Vinh từ tháng 10 năm 1929. Dù bị giam cầm thể xác trong chốn lao tù, nhưng tâm trí Người, luôn theo
                  dõi sát sao phong trào cách mạng trong nước, từng giờ, từng phút tìm cách trở về với cách mạng, vẫn
                  nuôi dưỡng khát vọng "sớm trở về Tổ quốc tôi để giải phóng đồng bào".
                </p>
                <p
                  style={{
                    padding: "0px 80px",
                    fontSize: "20px",
                    color: "black",
                  }}
                >
                  Ngày 21/7/1932, tòa án London phán quyết thả tự do cho Tống Văn Sơ. Ngày 28/12/1932, Người rời bệnh xá
                  nhà tù Bowen Road (Hồng Kông) và xuống tàu sang Singapore nhưng bị mật thám theo dõi, bắt giữ và đưa
                  trở lại Hồng Kông. Nhờ luật sư Loseby can thiệp, Thống đốc Hồng Kông William Peel ra lệnh thả Người
                  với điều kiện rời khỏi Hồng Kông trong 3 ngày.
                </p>
                <p
                  style={{
                    padding: "0px 80px",
                    fontSize: "20px",
                    color: "black",
                  }}
                >
                  Ngày 22/1/1933, cải trang thành thương nhân giàu có, Nguyễn Ái Quốc bí mật rời Hồng Kông bằng thuyền
                  nhỏ, lên tàu An Huy đến Hạ Môn ngày 25/1/1933. Sau vài tháng ở Hạ Môn, Người lên Thượng Hải và được
                  Đảng Cộng sản Trung Quốc bố trí đưa đi Liên Xô.
                </p>
              </div>
              <div
                style={{
                  marginTop: "70px",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <img src="/src/assets/1931-CatV4Oen.jpg" alt="logo" style={{ width: "400px" }} />
              </div>
            </div>
          </div>
          <div className="content-p1">
            <div
              className="intro"
              style={{
                backgroundImage: `url("/src/assets/1911_1-drAEUR0R.png")`,
              }}
            >
              <h1 className="title">THỜI KỲ Ở LIÊN XÔ LẦN THỨ II</h1>
              <div style={{ fontFamily: "text-font" }}>
                <p
                  style={{
                    padding: "0px 80px",
                    fontSize: "20px",
                    color: "black",
                  }}
                >
                  Sau khi trở lại Moskva (Liên Xô) vào tháng 6/1933, Nguyễn Ái Quốc vào học Trường Quốc tế Lênin –
                  Trường dành cho những người cộng sản nước ngoài, nhằm giúp đỡ các Đảng Cộng sản đào tạo cán bộ cách
                  mạng, nhất là cán bộ chủ chốt. Chính tại đây, Nguyễn Ái Quốc có điều kiện đi sâu vào những vấn đề của
                  cách mạng vô sản, kết hợp kinh nghiệm thực tiễn của bản thân tích luỹ qua hàng chục năm hoạt động cách
                  mạng, để suy nghĩ và tiếp tục hoàn chỉnh con đường cách mạng giải phóng và phát triển dân tộc Việt
                  Nam.
                </p>
              </div>
              <div
                style={{
                  marginTop: "70px",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <img src="/src/assets/lienxo_2-DtadcOoc.jpg" alt="logo" style={{ width: "400px" }} />
              </div>
            </div>
          </div>
          <div className="content-p1">
            <div
              className="intro"
              style={{
                backgroundImage: `url("/src/assets/1911_1-drAEUR0R.png")`,
              }}
            >
              <div style={{ fontFamily: "text-font" }}>
                <p
                  style={{
                    padding: "0px 80px",
                    fontSize: "20px",
                    color: "black",
                  }}
                >
                  Năm 1935, Hồ Chí Minh tham dự Đại hội VII Quốc tế Cộng sản, nhận thấy trong nghị quyết những quan điểm
                  mới về chiến lược giải phóng dân tộc ở thuộc địa, đặc biệt là việc xây dựng mặt trận dân tộc thống
                  nhất chống đế quốc. Mặc dù gặp nhiều khó khăn và thách thức, nhất là nguy cơ chiến tranh thế giới do
                  phát xít gây ra, Hồ Chí Minh được Quốc tế Cộng sản đồng ý cho về nước. Năm 1938, Người rời Viện Nghiên
                  cứu các vấn đề dân tộc và thuộc địa, bỏ lại luận án nghiên cứu sinh chưa hoàn thành, và lên xe lửa rời
                  Mátxcơva.
                </p>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img src="/src/assets/1935-C10ibcDH.jpg" alt="logo" style={{ width: "900px", paddingTop: "80px" }} />
              </div>
            </div>
          </div>
          <div className="content-p1">
            <div
              className="intro"
              style={{
                backgroundImage: `url("/src/assets/1911_1-drAEUR0R.png")`,
              }}
            >
              <h1 className="title">NHỮNG NĂM 1938 - 1941</h1>
              <div style={{ fontFamily: "text-font" }}>
                <p
                  style={{
                    padding: "0px 80px",
                    fontSize: "20px",
                    color: "black",
                  }}
                >
                  Năm 1938, Hồ Chí Minh trở lại Trung Quốc và hoạt động dưới bí danh thiếu tá Bát Lộ quân Hồ Quang.
                  Người làm việc tại văn phòng Bát Lộ quân ở Quế Lâm, sau đó đi qua Quý Dương, Côn Minh, và cuối cùng
                  đến Diên An, căn cứ của Đảng Cộng sản Trung Quốc và Hồng quân Trung Quốc vào mùa đông 1938. Lúc này,
                  Quốc Dân Đảng và Đảng Cộng sản Trung Quốc đang hợp tác chống Nhật. Tưởng Giới Thạch đề nghị Đảng Cộng
                  sản Trung Quốc cử một đoàn cán bộ hướng dẫn Quốc Dân Đảng về chiến thuật du kích. Hồ Chí Minh được cử
                  làm người phụ trách chính trị cho đoàn này từ tháng 6 năm 1939. Trong thời gian này, ban lãnh đạo Đảng
                  Cộng sản Đông Dương cũng mất liên lạc với Người cho đến tháng 1 năm 1940.
                </p>
              </div>
              <div
                style={{
                  marginTop: "70px",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <img src="/src/assets/lienxo_2-DtadcOoc.jpg" alt="logo" style={{ width: "400px" }} />
              </div>
            </div>
          </div>
          <div className="content-p1">
            <div
              className="intro"
              style={{
                backgroundImage: `url("/src/assets/1911_1-drAEUR0R.png")`,
              }}
            >
              <div style={{ fontFamily: "text-font" }}>
                <p
                  style={{
                    padding: "20px 80px",
                    fontSize: "20px",
                    color: "black",
                  }}
                >
                  Ngày 28-1-1941 (tức mồng 2 Tết Tân Tỵ), lãnh tụ Nguyễn Ái Quốc đã vượt qua cột mốc 108 trên biên giới
                  Việt Nam - Trung Quốc, tại làng Pác Bó, xã Trường Hà, huyện Hà Quảng, tỉnh Cao Bằng, trở về Tổ quốc
                  sau 30 năm bôn ba tìm đường cứu nước, cứu dân để trực tiếp lãnh đạo cách mạng Việt Nam. Đây là một sự
                  kiện lịch sử quan trọng, một trang sử mới mở ra trong cuộc đời cách mạng của Người và cũng là bước
                  ngoặt mở ra thời kỳ phát triển mới của cách mạng Việt Nam, từng bước đưa dân tộc Việt Nam đi tới những
                  mùa Xuân thắng lợi.
                </p>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img src="/src/assets/1941-CtfBYOcV.jpg" alt="logo" style={{ width: "900px", paddingTop: "80px" }} />
              </div>
            </div>
          </div>
          <div className="content-p1">
            <div
              className="intro"
              style={{
                backgroundImage: `url("/src/assets/1911_1-drAEUR0R.png")`,
              }}
            >
              <div style={{ fontFamily: "text-font" }}>
                <p
                  style={{
                    padding: "20px 80px",
                    fontSize: "20px",
                    color: "black",
                  }}
                >
                  Tháng 5 năm 1941, Hồ Chí Minh chủ trì Hội nghị Trung ương VIII tại Khuổi Nậm, Pác Bó, Cao Bằng, quyết
                  định chuyển hướng chiến lược của Đảng, xác định giải phóng dân tộc là nhiệm vụ hàng đầu. Hội nghị nhấn
                  mạnh cần đáp ứng sự thay đổi nhanh chóng của tình hình quốc tế và trong nước, tổ chức vận động và tập
                  hợp toàn dân, thành lập Mặt trận Việt Minh, xây dựng lực lượng vũ trang và căn cứ địa, tạo các phong
                  trào cách mạng mạnh mẽ.
                </p>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img src="/src/assets/1941_2-B4GGwMOm.jpg" alt="logo" style={{ width: "900px", paddingTop: "80px" }} />
              </div>
            </div>
          </div>
          <div className="content-22">
            <div className="content">
              <div
                className="circle"
                style={{
                  backgroundImage: `url("/src/assets/circle-CAfYdNLx.png")`,
                }}
              ></div>
              <div className="quote">
                <p className="quote-title">Hồ Chí Minh từng nói:</p>
                <p className="quote-content">
                  "Các vua Hùng đã có công dựng nước, Bác cháu ta phải cùng nhau giữ lấy nước"
                </p>
              </div>
            </div>
          </div>
          <div className="content-31">
            <p
              className="title"
              style={{
                fontFamily: "heading",
                fontWeight: 800,
                zIndex: 1000,
                width: "100%",
                textAlign: "center",
              }}
            >
              CÁCH MẠNG THÁNG TÁM
            </p>
            <div
              className="intro"
              style={{
                backgroundImage: `url("/src/assets/cmt8-BguGeW5v.png")`,
              }}
            >
              <p className="question" style={{ fontFamily: "text" }}>
                Tháng 8 năm 1945, với tư duy nhạy bén, Hồ Chí Minh nhận ra thời cơ cách mạng đã đến. Dưới sự lãnh đạo
                của Đảng, dân tộc Việt Nam đã đứng lên giành lại độc lập, phá vỡ ách thực dân và phong kiến, lập nên
                nước Việt Nam Dân chủ Cộng hòa – nhà nước dân chủ đầu tiên ở Đông Nam Á, mở ra Thời đại Hồ Chí Minh.
                <br />
                <br />
                Thắng lợi này thể hiện quyết tâm của Hồ Chí Minh: "Dù phải đốt cháy cả dãy Trường Sơn cũng phải giành
                độc lập dân tộc." Toàn dân tộc đã nhất tề giành chính quyền, mở ra kỷ nguyên độc lập, tự do và chủ nghĩa
                xã hội, khởi đầu một thời đại mới vinh quang trong lịch sử dân tộc.
              </p>
            </div>
          </div>
          <div className="content-31" style={{ position: "relative", width: "100vw", height: "100vh" }}>
            <video
              src="/src/assets/vietnam-flag2.mp4"
              autoPlay
              loop
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                left: "0px",
                top: "0px",
                objectFit: "cover",
              }}
            />
            <p
              className="title"
              style={{
                fontFamily: "heading",
                fontWeight: 800,
                zIndex: 1000,
                width: "100%",
                textAlign: "center",
              }}
            >
              TỔNG KẾT
            </p>
            <div className="intro">
              <p className="question" style={{ fontFamily: "text" }}>
                Từ Sài Gòn ra đi tìm đường cứu nước, Hồ Chí Minh đã trải qua một hành trình dài đầy gian khổ và hy sinh.
                64 năm sau, cũng tại mảnh đất này, Đại thắng Mùa Xuân 1975 với Chiến dịch Hồ Chí Minh lịch sử đã hoàn
                thành sự nghiệp giải phóng dân tộc và thống nhất đất nước, thu non sông về một mối như Người hằng mong.
                Hành trình của Hồ Chí Minh là một cuộc cách mạng sáng tạo và vĩ đại, mở đường cho sự nghiệp giải phóng
                nhân dân và đất nước. Đó không chỉ là chiến thắng vĩ đại của dân tộc, mà còn là bài học về tinh thần
                trách nhiệm, học tập, lao động sáng tạo, và tình yêu quê hương đất nước. Tinh thần đó tiếp tục được phát
                huy, góp phần xây dựng một đất nước phát triển, giàu mạnh, dân chủ, công bằng và văn minh, nơi mà mỗi
                người dân đều hướng tới một tương lai tươi sáng.
              </p>
            </div>
          </div>
          <div className="content-51">
            <MiniGame />
          </div>
        </div>
        <div className="home-footer">
          <div className="content">
            <div className="content-association">
              <p className="title">Cùng với sự tham gia của</p>
              <p>SS170622 - Nguyễn Trần Gia Hân</p>
              <p>SE171848 - Lê Nguyễn Gia Bảo</p>
              <p>DE170123 - Nguyễn Lê Thiện Đức</p>
              <p>SE170897 - Phạm Nguyễn Hoàng Huy</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
