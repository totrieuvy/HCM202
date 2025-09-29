import { useState, useEffect, useRef } from "react";
import "./css/App.css";
import BOSTOM from "./assets/boston-C63CgLHY.png";
import CATON from "./assets/caton-CKfsCMDu.png";
import MAIL from "./assets/mail-sIXJWKef.png";
import BACHOBG from "./assets/bachobg-B74Dg2wk.png";
import YEAR_1911_1 from "./assets/1911_1-BFVo1QDS.jpg";
import PHAP from "./assets/phap_1-8cQQJFxl.jpg";
import YEAR_1920 from "./assets/1920-Bk2DqWwW.jpg";
import YEAR_1921 from "./assets/1921-BT6eyVl3.jpg";
import YEAR_1911_2 from "./assets/1911_1-drAEUR0R.png";
import LIENXO from "./assets/lienxo_1-BtmAy91Z.jpg";
import TRUNGQUOC from "./assets/trungquoc_1-CiQqM8E3.jpg";
import DANGCONGSANVIETNAM from "./assets/dangcongsanvietnam-BJVASemK.jpg";
import YEAR_1931 from "./assets/1931-CatV4Oen.jpg";
import LIENXO2 from "./assets/lienxo_2-DtadcOoc.jpg";
import YEAR_1935 from "./assets/1935-C10ibcDH.jpg";
import YEAR_1941 from "./assets/1941-CtfBYOcV.jpg";
import YEAR_1941_2 from "./assets/1941_2-B4GGwMOm.jpg";
import CIRCLE from "./assets/circle-CAfYdNLx.png";
import VN_FLAG from "./assets/vn_flag.jpg";

import MiniGame from "./MiniGame";
import AiChat from "./AiChat";

const App = () => {
  const [isFixed, setIsFixed] = useState(true);
  const [activeSection, setActiveSection] = useState(null);
  const sectionRefs = useRef([]);

  // DATA FOR SECTIONS
  const sectionTitles = [
    "Đầu tháng 12 năm 1912",
    "Cuối năm 1913",
    "Đầu năm 1914",
    "Năm 1917",
  ];

  const sectionContents = [
    "Người sang Hoa Kỳ và làm phụ bếp tại khách sạn Omni Parker ở Boston.",
    "Nguyễn Tất Thành rời nước Mỹ sang nước Anh làm nghề cào tuyết cho một trường học, đốt lò rồi phụ bếp cho khách sạn Carlton.",
    "Người gửi thư cho Phan Châu Trinh, thông báo vắn tắt tình hình bản thân, đưa ra những nhận xét về chiến tranh thế giới đang diễn ra và dự đoán những chuyển biến có thể có.",
    "Đoàn kết quốc tế là một chiến lược quan trọng trong cuộc đấu tranh của Việt Nam để chống lại các thế lực đế quốc, thực dân, và các nước xâm lược. Hồ Chí Minh chủ trương không chỉ đấu tranh độc lập cho Việt Nam mà còn thúc đẩy sự đoàn kết của các quốc gia bị áp bức để giải phóng lẫn nhau khỏi ách thống trị của các đế quốc phương Tây.",
  ];

  const sectionImages = [BOSTOM, CATON, MAIL, null];

  // SCROLL LOGIC TO DETECT VISIBLE SECTION
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsFixed(scrollTop <= 10);

      // Find the section currently in view
      let currentSection = null;
      sectionRefs.current.forEach((ref, index) => {
        if (ref) {
          const { top, bottom } = ref.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          // Consider a section active if it's in the viewport
          if (top < windowHeight * 0.7 && bottom > windowHeight * 0.3) {
            currentSection = index;
          }
        }
      });
      console.log("Scroll - Active section:", currentSection);
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Set default active section on component mount
  useEffect(() => {
    // Trigger initial scroll check after component mounts
    const timer = setTimeout(() => {
      const handleInitialScroll = () => {
        let currentSection = null;
        sectionRefs.current.forEach((ref, index) => {
          if (ref) {
            const { top, bottom } = ref.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (top < windowHeight * 0.7 && bottom > windowHeight * 0.3) {
              currentSection = index;
            }
          }
        });
        if (currentSection === null && sectionRefs.current.length > 0) {
          // If no section is detected, default to first section
          console.log("Setting default active section to 0");
          setActiveSection(0);
        } else {
          console.log("Setting active section to:", currentSection);
          setActiveSection(currentSection);
        }
      };
      handleInitialScroll();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const [showGame, setShowGame] = useState(false);

  return (
    <div style={{ padding: "0px 12px" }}>
      <div className="background">
        <img
          src={YEAR_1911_2}
          alt="Background 1911_1-drAEUR0R"
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      <div className="home-page">
        <div className="home-title">
          <div
            className={`content ${isFixed ? "fixed" : ""}`}
            style={{
              fontSize: "100px",
              fontWeight: "bold",
              background: `url(${VN_FLAG}) no-repeat center center`,
              backgroundSize: "cover",

              WebkitBackgroundClip: "text" /* Chrome, Safari */,
              WebkitTextFillColor: "transparent",

              backgroundClip: "text" /* Firefox (mới) */,
              color: "transparent",
              animation: "waveBackground 5s ease-in-out infinite",
            }}
          >
            <h1>HỒ CHÍ MINH - HÀNH TRÌNH VÌ</h1>
            <h1>HÒA BÌNH VÀ ĐỘC LẬP DÂN TỘC</h1>
          </div>
        </div>
        <div className="home-content">
          <div className="content-p1">
            <div
              className="intro"
              style={{
                backgroundImage: `url(${BACHOBG})`,
              }}
            >
              <h1 className="title">Bối cảnh lịch sử</h1>
              <p className="content">
                Đầu thế kỷ XX, đất nước ta dưới ách thống trị của thực dân Pháp
                và phong kiến tay sai, đắm chìm trong ách nô lệ, bị xoá tên trên
                bản đồ thế giới. Không chịu khuất phục cảnh lầm than nô lệ, hàng
                trăm cuộc khởi nghĩa đã diễn ra, nhưng các con đường cứu nước
                mang màu sắc khác nhau, phong kiến hay dân chủ tư sản của các
                bậc tiền bối, sĩ phu yêu nước đương thời đều thất bại, bế tắc
              </p>
              <p className="content">
                Nhận thức sâu sắc về thực tại xã hội và rất đau xót trước nỗi
                thống khổ của dân tộc, người thanh niên yêu nước Nguyễn Tất
                Thành đã sớm có ý chí đánh đuổi thực dân Pháp, giải phóng đồng
                bào, nên quyết định xuất dương tìm đường cứu nước. Người đi sang
                nước Pháp, sang Phương Tây để tìm hiểu vì sao họ giàu mạnh và
                hiểu những gì ẩn giấu sau những từ từ tự do-bình đẳng-bác ái mà
                thực dân Pháp rêu rao ở các nước thuộc địa
              </p>
            </div>
          </div>
          <div className="content-course-intro">
            <div>
              <img src={YEAR_1911_1} alt="logo" />
            </div>
            <div>
              <p className="title">
                <span className="node">1</span> THỜI KỲ 1911 - 1919
              </p>
              <p className="content">
                Ngày 5-6-1911, từ Bến cảng Nhà Rồng, người thanh niên yêu nước
                Nguyễn Tất Thành với tên mới là Nguyễn Văn Ba đã lên con tàu
                Amiral Latouche Tréville (Pháp), với mong muốn học hỏi những
                tinh hoa và tiến bộ từ các nước phương Tây.
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
                    ref={(el) => (sectionRefs.current[index] = el)}
                    className={`section-content-11 ${
                      activeSection === index ? "active" : ""
                    }`}
                  >
                    <h2
                      className={`section-title ${
                        activeSection === index ? "active" : ""
                      }`}
                    >
                      {title}
                    </h2>
                    <p
                      className={`section-content ${
                        activeSection === index ? "active" : ""
                      }`}
                      style={{ color: "black" }}
                    >
                      {sectionContents[index]}
                    </p>
                  </div>
                ))}
              </div>

              {/* PHẢI - IMAGE CONTAINER */}
              <div
                className={`image-container-11 `}
                data-active-section={activeSection}
              >
                {/* ẢNH CHO SECTION 1-3 */}
                {activeSection !== null && activeSection < 3 && (
                  <img
                    src={sectionImages[activeSection]}
                    alt={`Section ${activeSection + 1} image`}
                    className={`img-slideshow fade-in section-${activeSection}`}
                  />
                )}
                {/* PLACEHOLDER SECTION 4 */}
                {activeSection === 3 && (
                  <div
                    className="img-slideshow fade-in"
                    style={{
                      margin: "0px auto",
                      alignItems: "center",
                      justifyContent: "center",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <p className="placeholder-text">
                      Không có hình ảnh minh họa
                    </p>
                    <div className="placeholder-icon">📜</div>
                  </div>
                )}
                {/* DEFAULT STATE */}
                {activeSection === null && (
                  <div className="default-image-placeholder fade-in">
                    <p className="default-placeholder-text">
                      Cuộn để xem hình ảnh
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="content-21">
            <div className="content-grid">
              <div>
                <p className="title">
                  <span className="node">2</span> Thời kỳ ở Pháp
                </p>
                <p className="content">
                  Ngày 18-6-1919, với tên Nguyễn Ái Quốc, chàng thanh niên thay
                  mặt những người Việt Nam yêu nước tại Pháp gửi bản yêu sách
                  tới Hội nghị Vécxây yêu cầu về quyền tự do, dân chủ, bình đẳng
                  dân tộc cho nhân dân An Nam. Tuy bản yêu sách không được chấp
                  nhận nhưng đã được lan truyền rộng rãi, gây tiếng vang lớn
                  trong dư luận nước Pháp, thức tỉnh tinh thần đấu tranh của các
                  nước thuộc địa; đồng thời cũng đem lại cho Nguyễn Ái Quốc một
                  nhận thức là các dân tộc muốn được giải phóng chỉ có thể dựa
                  vào sức của chính mình.
                </p>
              </div>
              <div>
                <img src={PHAP} alt="21" />
              </div>
            </div>
            <div className="content-section">
              <p className="content">
                Vào tháng 7 năm 1920, Nguyễn Ái Quốc đọc Sơ thảo lần thứ nhất
                những Luận cương về vấn đề dân tộc và thuộc địa của Lenin đăng
                trên báo L'Humanité (tờ này là cơ quan phát ngôn của Đảng Cộng
                sản Pháp), từ đó Người đi theo chủ nghĩa cộng sản. Người tham dự
                Đại hội lần thứ 18 của Đảng Xã hội Pháp tại Tours với tư cách là
                đại biểu Đông Dương, trở thành một trong những sáng lập viên của
                Đảng Cộng sản Pháp. Sau này, Người thừa nhận:{" "}
                <strong className="quote-text">
                  "Lúc đầu, chính là chủ nghĩa yêu nước chứ không phải chủ nghĩa
                  cộng sản đã làm tôi tin theo Lênin, tin theo Quốc tế III."
                </strong>
              </p>
              <div className="image-container">
                <img src={YEAR_1920} alt="Năm 1920" className="content-image" />
              </div>
            </div>
            <div className="content-section">
              <p className="content">
                Năm 1921, Người cùng một số nhà yêu nước của các thuộc địa Pháp
                lập ra Hội Liên hiệp Thuộc địa. Năm 1922, Người cùng một số nhà
                cách mạng thuộc địa ra báo Le Paria (Người cùng khổ). Tác phẩm
                Bản án chế độ thực dân Pháp do Người viết được xuất bản năm
                1925, đã tố cáo chính sách thực dân tàn bạo của Pháp và đề cập
                đến phong trào đấu tranh của các dân tộc thuộc địa.
                <strong className="quote-text">
                  "Lúc đầu, chính là chủ nghĩa yêu nước chứ không phải chủ nghĩa
                  cộng sản đã làm tôi tin theo Lênin, tin theo Quốc tế III."
                </strong>
              </p>
              <div className="image-container">
                <img src={YEAR_1921} alt="Năm 1921" className="content-image" />
              </div>
            </div>
          </div>
          <div className="content-p1">
            <div className="intro">
              <h1 className="title">THỜI KỲ Ở LIÊN XÔ LẦN THỨ I</h1>
              <div className="text-content">
                <p className="content">
                  Vào tháng 6 năm 1923, Nguyễn Ái Quốc đến Moskva học tại Trường
                  Đại học Lao động Cộng sản Phương Đông. Tại Đại hội lần thứ 5
                  của Quốc tế Cộng sản, ông nhấn mạnh mối quan hệ giữa vận mệnh
                  của giai cấp vô sản và các dân tộc thuộc địa, đồng thời cảnh
                  báo nguy cơ từ các thuộc địa. Người viết nhiều bài báo về cuộc
                  đấu tranh giai cấp công nhân ở các thuộc địa và mối liên hệ
                  với cách mạng vô sản. Nguyễn Ái Quốc cũng phân tích chiến lược
                  quân sự của các nước lớn tại khu vực châu Á - Thái Bình Dương,
                  dự đoán khu vực này có thể trở thành "lò lửa" của một cuộc
                  chiến tranh thế giới mới. Tất cả các hoạt động của ông đều
                  hướng đến giải phóng dân tộc khỏi ách thực dân.
                </p>
              </div>
              <div className="image-container">
                <img src={LIENXO} alt="Liên Xô" className="content-image" />
              </div>
            </div>
          </div>
          <div className="content-p1">
            <div className="intro">
              <h1 className="title">THỜI KỲ Ở TRUNG QUỐC (1924-1927)</h1>
              <div className="text-content">
                <p className="content">
                  Ngày 11 tháng 11 năm 1924, Nguyễn Ái Quốc rời Liên Xô tới
                  Quảng Châu, lấy tên là Lý Thụy, làm phiên dịch trong phái đoàn
                  cố vấn của chính phủ Liên Xô bên cạnh Chính phủ Trung Hoa Dân
                  quốc. Thời gian này Người cũng gặp mặt một số nhà cách mạng
                  lão thành người Việt đang sống và hoạt động lưu vong trên đất
                  Trung Quốc, trong đó có Phan Bội Châu.
                </p>
                <p className="content">
                  Vào năm 1925, Nguyễn Ái Quốc thành lập Hội Việt Nam Cách mạng
                  Thanh niên để đào tạo thanh niên yêu nước. Hội tổ chức các
                  khóa học ngắn hạn, đào tạo hơn 75 hội viên và cử người sang
                  Quảng Châu học tại các trung tâm như Đại học Phương Đông và
                  trường Quân chính Hoàng Phố. Chương trình học tập gồm lịch sử,
                  chủ nghĩa Mác-Lenin và các phong trào giải phóng dân tộc.
                </p>
              </div>
              <div className="image-container">
                <img
                  src={TRUNGQUOC}
                  alt="Trung Quốc"
                  className="content-image"
                />
              </div>
            </div>
          </div>
          <div className="content-p1">
            <div className="intro">
              <div className="text-content">
                <p className="content">
                  Nguyễn Ái Quốc cũng phát hành tờ báo{" "}
                  <strong>"Thanh Niên"</strong> và xuất bản cuốn
                  <strong>"Đường Kách Mệnh"</strong>, tập hợp các bài giảng của
                  Người, để truyền bá tư tưởng cách mạng. Người khẳng định rằng
                  để cách mạng thành công, phải đoàn kết nhiều tầng lớp xã hội,
                  bao gồm học trò, nhà buôn, và điền chủ nhỏ. Một quan điểm quan
                  trọng của ông trong thập niên 1920 là cách mạng giải phóng dân
                  tộc ở thuộc địa có thể thành công trước cách mạng vô sản ở các
                  quốc gia chính quốc. Cùng năm 1925, ông tham gia thành lập Hội
                  Liên hiệp các dân tộc bị áp bức ở Á Đông, do Liêu Trọng Khải,
                  một cộng sự thân tín của Tôn Dật Tiên, làm hội trưởng và ông
                  làm bí thư. Tháng 5 năm 1927, chính quyền Trung Hoa Dân Quốc
                  đặt những người cộng sản ra ngoài vòng pháp luật, ông rời
                  Quảng Châu đi Hồng Kông, rồi sang Moskva. Tháng 11 năm 1927,
                  ông được cử đi Pháp, rồi từ đó đi dự cuộc họp Đại hội đồng của
                  Liên đoàn chống chiến tranh đế quốc từ ngày 9 tháng 12 đến
                  ngày 12 tháng 12 năm 1927 tại Bruxelles, Bỉ. Sau đó, ông cũng
                  qua Ý.
                </p>
              </div>
            </div>
          </div>
          <div className="content-p1">
            <div className="intro">
              <h1 className="title">NHỮNG NĂM 1928 - 1929</h1>
              <div className="text-content">
                <p className="content">
                  Mùa thu 1928, Hồ Chí Minh từ châu Âu đến Thái Lan, với bí danh
                  "Thầu Chín" để tuyên truyền và huấn luyện cho Việt kiều, đồng
                  thời móc nối một số thanh thiếu niên Việt Nam sang Thái Lan
                  hoạt động.
                </p>
                <p className="content">
                  Người chủ trương tuyên truyền cho kiều bào và tổ chức họ vào
                  những hội thân ái, tổ chức các buổi sinh hoạt văn hóa cho họ,
                  xin chính phủ Thái cho mở trường dành cho Việt kiều, Người đi
                  (chủ yếu là đi bộ) và vận động hầu khắp các vùng có kiều bào ở
                  Thái Lan. Giống như tại nhiều nơi đã hoạt động, Người cho in
                  báo – tờ Thân ái.
                </p>
                <p className="content">
                  Cuối năm 1929, Hồ Chí Minh rời Thái Lan, theo ngả Singapore để
                  sang Trung Quốc.
                </p>
              </div>
            </div>
          </div>
          <div className="content-p1">
            <div className="intro">
              <h1 className="title">THÀNH LẬP ĐẢNG CỘNG SẢN VIỆT NAM</h1>
              <div className="text-content">
                <p className="content">
                  Khi điều kiện thành lập Đảng đã chín muồi, ngày 3-2-1930, dưới
                  sự chủ trì của đồng chí Nguyễn Ái Quốc, tại Hương Cảng (Trung
                  Quốc), Hội nghị hợp nhất ba tổ chức cộng sản đã nhất trí thành
                  lập một đảng thống nhất là Đảng Cộng sản Việt Nam. Đây chính
                  là kết quả khẳng định tầm nhìn, bản lĩnh, trí tuệ và sự cống
                  hiến của Nguyễn Ái Quốc trong việc vận dụng Chủ nghĩa
                  Mác-Lênin vào việc thành lập một đảng cách mạng chân chính để
                  lãnh đạo cách mạng Việt Nam.
                </p>
              </div>
              <div className="image-container">
                <img
                  src={DANGCONGSANVIETNAM}
                  alt="Đảng Cộng sản Việt Nam"
                  className="content-image"
                />
              </div>
            </div>
          </div>
          <div className="content-p1">
            <div className="intro">
              <h1 className="title">NHỮNG NĂM 1931 - 1933</h1>
              <div style={{ fontFamily: "text-font" }}>
                <p
                  style={{
                    padding: "0px 80px",
                    fontSize: "20px",
                    color: "black",
                  }}
                >
                  Năm 1931, dưới tên giả là Tống Văn Sơ, Nguyễn Ái Quốc bị nhà
                  cầm quyền Hương Cảng (Hồng Kông) bắt giam. Ông bị giam từ ngày
                  6 tháng 6 năm 1931 đến ngày 28 tháng 12 năm 1932. Ban đầu
                  chính quyền Anh tại Hồng Kông dự định trục xuất ông với ý định
                  lực lượng của Pháp sẽ bắt ông và đưa về Việt Nam. Tại đó Pháp
                  sẽ thi hành ngay tức thì bản án tử hình vắng mặt cho Nguyễn Ái
                  Quốc đã được tuyên tại Tòa án Vinh từ tháng 10 năm 1929. Dù bị
                  giam cầm thể xác trong chốn lao tù, nhưng tâm trí Người, luôn
                  theo dõi sát sao phong trào cách mạng trong nước, từng giờ,
                  từng phút tìm cách trở về với cách mạng, vẫn nuôi dưỡng khát
                  vọng "sớm trở về Tổ quốc tôi để giải phóng đồng bào".
                </p>
                <p
                  style={{
                    padding: "0px 80px",
                    fontSize: "20px",
                    color: "black",
                  }}
                >
                  Ngày 21/7/1932, tòa án London phán quyết thả tự do cho Tống
                  Văn Sơ. Ngày 28/12/1932, Người rời bệnh xá nhà tù Bowen Road
                  (Hồng Kông) và xuống tàu sang Singapore nhưng bị mật thám theo
                  dõi, bắt giữ và đưa trở lại Hồng Kông. Nhờ luật sư Loseby can
                  thiệp, Thống đốc Hồng Kông William Peel ra lệnh thả Người với
                  điều kiện rời khỏi Hồng Kông trong 3 ngày.
                </p>
                <p
                  style={{
                    padding: "0px 80px",
                    fontSize: "20px",
                    color: "black",
                  }}
                >
                  Ngày 22/1/1933, cải trang thành thương nhân giàu có, Nguyễn Ái
                  Quốc bí mật rời Hồng Kông bằng thuyền nhỏ, lên tàu An Huy đến
                  Hạ Môn ngày 25/1/1933. Sau vài tháng ở Hạ Môn, Người lên
                  Thượng Hải và được Đảng Cộng sản Trung Quốc bố trí đưa đi Liên
                  Xô.
                </p>
              </div>
              <div
                style={{
                  marginTop: "70px",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <img
                  src={YEAR_1931}
                  alt="Năm 1931"
                  className="content-image-small"
                />
              </div>
            </div>
          </div>
          <div className="content-p1">
            <div className="intro">
              <h1 className="title">THỜI KỲ Ở LIÊN XÔ LẦN THỨ II</h1>
              <div style={{ fontFamily: "text-font" }}>
                <p
                  style={{
                    padding: "0px 80px",
                    fontSize: "20px",
                    color: "black",
                  }}
                >
                  Sau khi trở lại Moskva (Liên Xô) vào tháng 6/1933, Nguyễn Ái
                  Quốc vào học Trường Quốc tế Lênin – Trường dành cho những
                  người cộng sản nước ngoài, nhằm giúp đỡ các Đảng Cộng sản đào
                  tạo cán bộ cách mạng, nhất là cán bộ chủ chốt. Chính tại đây,
                  Nguyễn Ái Quốc có điều kiện đi sâu vào những vấn đề của cách
                  mạng vô sản, kết hợp kinh nghiệm thực tiễn của bản thân tích
                  luỹ qua hàng chục năm hoạt động cách mạng, để suy nghĩ và tiếp
                  tục hoàn chỉnh con đường cách mạng giải phóng và phát triển
                  dân tộc Việt Nam.
                </p>
              </div>
              <div className="image-container">
                <img
                  src={LIENXO2}
                  alt="Liên Xô lần 2"
                  className="content-image-small"
                />
              </div>
            </div>
          </div>
          <div className="content-p1">
            <div className="intro">
              <div style={{ fontFamily: "text-font" }}>
                <p
                  style={{
                    padding: "0px 80px",
                    fontSize: "20px",
                    color: "black",
                  }}
                >
                  Năm 1935, Hồ Chí Minh tham dự Đại hội VII Quốc tế Cộng sản,
                  nhận thấy trong nghị quyết những quan điểm mới về chiến lược
                  giải phóng dân tộc ở thuộc địa, đặc biệt là việc xây dựng mặt
                  trận dân tộc thống nhất chống đế quốc. Mặc dù gặp nhiều khó
                  khăn và thách thức, nhất là nguy cơ chiến tranh thế giới do
                  phát xít gây ra, Hồ Chí Minh được Quốc tế Cộng sản đồng ý cho
                  về nước. Năm 1938, Người rời Viện Nghiên cứu các vấn đề dân
                  tộc và thuộc địa, bỏ lại luận án nghiên cứu sinh chưa hoàn
                  thành, và lên xe lửa rời Mátxcơva.
                </p>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={YEAR_1935}
                  alt="logo"
                  style={{ width: "900px", paddingTop: "80px" }}
                />
              </div>
            </div>
          </div>
          <div className="content-p1">
            <div className="intro">
              <h1 className="title">NHỮNG NĂM 1938 - 1941</h1>
              <div style={{ fontFamily: "text-font" }}>
                <p
                  style={{
                    padding: "0px 80px",
                    fontSize: "20px",
                    color: "black",
                  }}
                >
                  Năm 1938, Hồ Chí Minh trở lại Trung Quốc và hoạt động dưới bí
                  danh thiếu tá Bát Lộ quân Hồ Quang. Người làm việc tại văn
                  phòng Bát Lộ quân ở Quế Lâm, sau đó đi qua Quý Dương, Côn
                  Minh, và cuối cùng đến Diên An, căn cứ của Đảng Cộng sản Trung
                  Quốc và Hồng quân Trung Quốc vào mùa đông 1938. Lúc này, Quốc
                  Dân Đảng và Đảng Cộng sản Trung Quốc đang hợp tác chống Nhật.
                  Tưởng Giới Thạch đề nghị Đảng Cộng sản Trung Quốc cử một đoàn
                  cán bộ hướng dẫn Quốc Dân Đảng về chiến thuật du kích. Hồ Chí
                  Minh được cử làm người phụ trách chính trị cho đoàn này từ
                  tháng 6 năm 1939. Trong thời gian này, ban lãnh đạo Đảng Cộng
                  sản Đông Dương cũng mất liên lạc với Người cho đến tháng 1 năm
                  1940.
                </p>
              </div>
              <div
                style={{
                  marginTop: "70px",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <img src={LIENXO2} alt="logo" style={{ width: "400px" }} />
              </div>
            </div>
          </div>
          <div className="content-p1">
            <div className="intro">
              <div style={{ fontFamily: "text-font" }}>
                <p
                  style={{
                    padding: "20px 80px",
                    fontSize: "20px",
                    color: "black",
                  }}
                >
                  Ngày 28-1-1941 (tức mồng 2 Tết Tân Tỵ), lãnh tụ Nguyễn Ái Quốc
                  đã vượt qua cột mốc 108 trên biên giới Việt Nam - Trung Quốc,
                  tại làng Pác Bó, xã Trường Hà, huyện Hà Quảng, tỉnh Cao Bằng,
                  trở về Tổ quốc sau 30 năm bôn ba tìm đường cứu nước, cứu dân
                  để trực tiếp lãnh đạo cách mạng Việt Nam. Đây là một sự kiện
                  lịch sử quan trọng, một trang sử mới mở ra trong cuộc đời cách
                  mạng của Người và cũng là bước ngoặt mở ra thời kỳ phát triển
                  mới của cách mạng Việt Nam, từng bước đưa dân tộc Việt Nam đi
                  tới những mùa Xuân thắng lợi.
                </p>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={YEAR_1941}
                  alt="logo"
                  style={{ width: "900px", paddingTop: "80px" }}
                />
              </div>
            </div>
          </div>
          <div className="content-p1">
            <div className="intro">
              <div style={{ fontFamily: "text-font" }}>
                <p
                  style={{
                    padding: "20px 80px",
                    fontSize: "20px",
                    color: "black",
                  }}
                >
                  Tháng 5 năm 1941, Hồ Chí Minh chủ trì Hội nghị Trung ương VIII
                  tại Khuổi Nậm, Pác Bó, Cao Bằng, quyết định chuyển hướng chiến
                  lược của Đảng, xác định giải phóng dân tộc là nhiệm vụ hàng
                  đầu. Hội nghị nhấn mạnh cần đáp ứng sự thay đổi nhanh chóng
                  của tình hình quốc tế và trong nước, tổ chức vận động và tập
                  hợp toàn dân, thành lập Mặt trận Việt Minh, xây dựng lực lượng
                  vũ trang và căn cứ địa, tạo các phong trào cách mạng mạnh mẽ.
                </p>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src="../src/assets/Tintuc_cgs_vn_201351715h50m24s.jpg"
                  alt="logo"
                  style={{ width: "700px", paddingTop: "40px" }}
                />
              </div>
            </div>
          </div>

          <div className="content-p1">
            <div className="intro">
              <h1 className="title">CÁCH MẠNG THÁNG TÁM</h1>
              <div style={{ fontFamily: "text-font" }}>
                <p className="content summary-text">
                  Tháng 8 năm 1945, với tư duy nhạy bén, Hồ Chí Minh nhận ra
                  thời cơ cách mạng đã đến. Dưới sự lãnh đạo của Đảng, dân tộc
                  Việt Nam đã đứng lên giành lại độc lập, phá vỡ ách thực dân và
                  phong kiến, lập nên nước Việt Nam Dân chủ Cộng hòa – nhà nước
                  dân chủ đầu tiên ở Đông Nam Á, mở ra Thời đại Hồ Chí Minh.
                  <br />
                  <br />
                  Thắng lợi này thể hiện quyết tâm của Hồ Chí Minh: "Dù phải đốt
                  cháy cả dãy Trường Sơn cũng phải giành độc lập dân tộc." Toàn
                  dân tộc đã nhất tề giành chính quyền, mở ra kỷ nguyên độc lập,
                  tự do và chủ nghĩa xã hội, khởi đầu một thời đại mới vinh
                  quang trong lịch sử dân tộc.
                </p>
              </div>
            </div>
          </div>

          <div className="quote-section">
            <div className="quote-container">
              <div
                className="circle"
                style={{
                  backgroundImage: `url(${CIRCLE})`,
                }}
              ></div>
              <div className="quote">
                <p className="quote-title">Hồ Chí Minh từng nói:</p>
                <p className="quote-content">
                  "Các vua Hùng đã có công dựng nước, Bác cháu ta phải cùng nhau
                  giữ lấy nước"
                </p>
              </div>
            </div>
          </div>

          {/* <div className="content-p1">
            <div className="intro">
              <h1 className="title">Tổng kết</h1>
              <div style={{ fontFamily: "text-font" }}>
                <p className="content summary-text">
                  Từ Sài Gòn ra đi tìm đường cứu nước, Hồ Chí Minh đã trải qua
                  một hành trình dài đầy gian khổ và hy sinh. 64 năm sau, cũng
                  tại mảnh đất này, Đại thắng Mùa Xuân 1975 với Chiến dịch Hồ
                  Chí Minh lịch sử đã hoàn thành sự nghiệp giải phóng dân tộc và
                  thống nhất đất nước, thu non sông về một mối như Người hằng
                  mong. Hành trình của Hồ Chí Minh là một cuộc cách mạng sáng
                  tạo và vĩ đại, mở đường cho sự nghiệp giải phóng nhân dân và
                  đất nước. Đó không chỉ là chiến thắng vĩ đại của dân tộc, mà
                  còn là bài học về tinh thần trách nhiệm, học tập, lao động
                  sáng tạo, và tình yêu quê hương đất nước. Tinh thần đó tiếp
                  tục được phát huy, góp phần xây dựng một đất nước phát triển,
                  giàu mạnh, dân chủ, công bằng và văn minh, nơi mà mỗi người
                  dân đều hướng tới một tương lai tươi sáng.
                </p>
              </div>
            </div>
          </div> */}

          <div
            style={{
              background: "linear-gradient(135deg, #fdfbfb, #ebedee)",
              padding: "3rem 2rem",
              borderRadius: "1rem",
              boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
              margin: "2rem auto",
              maxWidth: "900px",
              textAlign: "center",
            }}
          >
            <div className="intro">
              <h1
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "700",
                  color: "#1a1a1a",
                  marginBottom: "1.5rem",
                  position: "relative",
                  display: "inline-block",
                  animation: "bounce 1.8s infinite",
                }}
              >
                Tổng kết
                <span
                  style={{
                    display: "block",
                    width: "60px",
                    height: "4px",
                    background: "#0077ff",
                    margin: "0.5rem auto 0",
                    borderRadius: "2px",
                  }}
                ></span>
              </h1>
              <div style={{ fontFamily: "text-font" }}>
                <p
                  style={{
                    fontSize: "1.1rem",
                    lineHeight: "1.8",
                    color: "#333",
                    textAlign: "justify",
                    padding: "0 1rem",
                  }}
                >
                  Từ Sài Gòn ra đi tìm đường cứu nước, Hồ Chí Minh đã trải qua
                  một hành trình dài đầy gian khổ và hy sinh. 64 năm sau, cũng
                  tại mảnh đất này, Đại thắng Mùa Xuân 1975 với Chiến dịch Hồ
                  Chí Minh lịch sử đã hoàn thành sự nghiệp giải phóng dân tộc và
                  thống nhất đất nước, thu non sông về một mối như Người hằng
                  mong. Hành trình của Hồ Chí Minh là một cuộc cách mạng sáng
                  tạo và vĩ đại, mở đường cho sự nghiệp giải phóng nhân dân và
                  đất nước. Đó không chỉ là chiến thắng vĩ đại của dân tộc, mà
                  còn là bài học về tinh thần trách nhiệm, học tập, lao động
                  sáng tạo, và tình yêu quê hương đất nước. Tinh thần đó tiếp
                  tục được phát huy, góp phần xây dựng một đất nước phát triển,
                  giàu mạnh, dân chủ, công bằng và văn minh, nơi mà mỗi người
                  dân đều hướng tới một tương lai tươi sáng.
                </p>
              </div>
            </div>
          </div>

          <div className="content-51">
            <MiniGame />
          </div>
        </div>
        <AiChat />
        {/* <div className="home-footer">
          <div className="content">
            <div className="content-association">
              <p className="title">Cùng với sự tham gia của</p>
              <p>SE183178 - Tô Triều Vỹ</p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default App;
