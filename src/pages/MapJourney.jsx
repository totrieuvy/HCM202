import React, { useState, useEffect, useRef } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Polyline,
    useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Container, Row, Col, Card, Badge, Button, ListGroup } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";

// Fix default marker icon issue in React Leaflet
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom icon cho marker Hồ Chí Minh
const hoChiMinhIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

// Dữ liệu hành trình 30 năm
const journeyData = [
    {
        id: 1,
        year: "1911",
        location: "Sài Gòn, Việt Nam",
        coords: [10.8231, 106.6297],
        title: "Rời bến cảng Nhà Rồng",
        date: "5/6/1911",
        description:
            "Nguyễn Tất Thành (Văn Ba) 21 tuổi lên tàu Amiral Latouche-Tréville, bắt đầu hành trình 30 năm tìm đường cứu nước.",
        details: [
            "Làm phụ bếp với lương 45 franc/tháng",
            "Mục đích: Tìm hiểu văn minh phương Tây để cứu nước",
            "Tàu đi qua Singapore, Colombo, Port Said, Marseille",
        ],
        icon: "🚢",
    },
    {
        id: 2,
        year: "1911-1912",
        location: "Marseille, Pháp",
        coords: [43.2965, 5.3698],
        title: "Đến Pháp lần đầu",
        date: "6/7/1911",
        description: "Tàu cập cảng Marseille, miền Nam nước Pháp. Người bắt đầu làm quen với đất nước thuộc địa.",
        details: [
            "Tìm hiểu xã hội Pháp và tình hình thuộc địa",
            "Làm nhiều nghề để kiếm sống",
            "Quan sát sự bất công của chủ nghĩa thực dân",
        ],
        icon: "🇫🇷",
    },
    {
        id: 3,
        year: "1912-1913",
        location: "Boston, Hoa Kỳ",
        coords: [42.3601, -71.0589],
        title: "Sang Hoa Kỳ",
        date: "1912",
        description: "Làm phụ bếp tại khách sạn Omni Parker House ở Boston.",
        details: [
            "Học tiếng Anh",
            "Tìm hiểu nền dân chủ Mỹ",
            "Tiếp xúc với tư tưởng tự do, bình đẳng",
        ],
        icon: "🇺🇸",
    },
    {
        id: 4,
        year: "1913-1917",
        location: "London, Anh",
        coords: [51.5074, -0.1278],
        title: "Thời kỳ ở Anh",
        date: "1913-1917",
        description: "Làm nghề cào tuyết, đốt lò, phụ bếp tại khách sạn Carlton.",
        details: [
            "Làm nhiều nghề khác nhau để sinh sống",
            "Học tiếng Anh và văn hóa phương Tây",
            "Gửi thư cho Phan Châu Trinh năm 1914",
        ],
        icon: "🇬🇧",
    },
    {
        id: 5,
        year: "1917-1923",
        location: "Paris, Pháp",
        coords: [48.8566, 2.3522],
        title: "Định cư tại Paris",
        date: "1917-1923",
        description: "Tham gia Hội người Việt yêu nước ở Pháp, viết báo, hoạt động chính trị.",
        details: [
            "Gửi Bản yêu sách 8 điểm tới Hội nghị Versailles (1919)",
            "Tham gia thành lập Đảng Cộng sản Pháp (1920)",
            "Viết báo Le Paria (Người cùng khổ) từ 1922",
        ],
        icon: "📰",
    },
    {
        id: 6,
        year: "1923-1924",
        location: "Moskva, Liên Xô",
        coords: [55.7558, 37.6173],
        title: "Sang Liên Xô học tập",
        date: "1923-1924",
        description: "Học tập lý luận cách mạng Marx-Lenin tại Moskva.",
        details: [
            "Tham gia Đại hội V Quốc tế Cộng sản",
            "Học tập lý luận và thực tiễn cách mạng",
            "Gặp gỡ các nhà cách mạng quốc tế",
        ],
        icon: "🇷🇺",
    },
    {
        id: 7,
        year: "1925-1927",
        location: "Quảng Châu, Trung Quốc",
        coords: [23.1291, 113.2644],
        title: "Hoạt động tại Trung Quốc",
        date: "1925-1927",
        description: "Thành lập Hội Việt Nam Cách mạng Thanh niên, đào tạo cán bộ cách mạng.",
        details: [
            "Thành lập Hội Việt Nam Cách mạng Thanh niên (6/1925)",
            "Xuất bản báo Thanh niên",
            "Đào tạo hàng trăm cán bộ cách mạng cho Việt Nam",
        ],
        icon: "🎓",
    },
    {
        id: 8,
        year: "1928-1929",
        location: "Bangkok, Thái Lan",
        coords: [13.7563, 100.5018],
        title: "Hoạt động Đông Nam Á",
        date: "1928-1929",
        description: "Tiếp tục hoạt động cách mạng tại Đông Nam Á.",
        details: [
            "Liên lạc với các tổ chức cộng sản trong nước",
            "Chuẩn bị cho việc thành lập Đảng",
            "Hoạt động bí mật tại Thái Lan",
        ],
        icon: "🇹🇭",
    },
    {
        id: 9,
        year: "1930",
        location: "Hồng Kông",
        coords: [22.3193, 114.1694],
        title: "Thành lập Đảng Cộng sản Việt Nam",
        date: "3/2/1930",
        description: "Hội nghị hợp nhất các tổ chức cộng sản thành Đảng Cộng sản Việt Nam.",
        details: [
            "Hội nghị thống nhất tại Hồng Kông ngày 3/2/1930",
            "Thống nhất 3 tổ chức cộng sản",
            "Thông qua Cương lĩnh chính trị đầu tiên",
        ],
        icon: "🏛️",
    },
    {
        id: 10,
        year: "1931-1933",
        location: "Hồng Kông",
        coords: [22.3193, 114.1694],
        title: "Bị bắt giam tại Hồng Kông",
        date: "1931-1933",
        description: "Bị chính quyền thực dân Anh bắt giam.",
        details: [
            "Bị bắt vào tháng 6/1931",
            "Gần như bị giao nộp cho Pháp",
            "Được thả tự do năm 1933 sau nhiều nỗ lực",
        ],
        icon: "⚖️",
    },
    {
        id: 11,
        year: "1934-1938",
        location: "Moskva, Liên Xô",
        coords: [55.7558, 37.6173],
        title: "Trở lại Liên Xô",
        date: "1934-1938",
        description: "Tiếp tục hoạt động tại Quốc tế Cộng sản.",
        details: [
            "Dự các hội nghị quốc tế",
            "Theo dõi tình hình Việt Nam và thế giới",
            "Chuẩn bị kế hoạch trở về Đông Dương",
        ],
        icon: "🌍",
    },
    {
        id: 12,
        year: "1938-1940",
        location: "Vân Nam, Trung Quốc",
        coords: [25.0406, 102.7122],
        title: "Hoạt động tại Trung Quốc",
        date: "1938-1940",
        description: "Chuẩn bị trở về Việt Nam, xây dựng căn cứ địa biên giới.",
        details: [
            "Hoạt động trong Bát lộ quân Trung Quốc",
            "Liên lạc với Ban lãnh đạo Đảng trong nước",
            "Chuẩn bị căn cứ địa vùng biên giới Việt-Trung",
        ],
        icon: "🗺️",
    },
    {
        id: 13,
        year: "1941",
        location: "Pác Bó, Cao Bằng, Việt Nam",
        coords: [22.6869, 106.2577],
        title: "Trở về Việt Nam - Thành lập Việt Minh",
        date: "28/1/1941",
        description:
            "Sau 30 năm xa quê hương, Nguyễn Ái Quốc trở về Pác Bó, Cao Bằng. Thành lập Mặt trận Việt Minh ngày 19/5/1941.",
        details: [
            "Bước qua cột mốc 108 biên giới Việt-Trung",
            "Chọn tên Hồ Chí Minh từ thời điểm này",
            "Lãnh đạo trực tiếp cách mạng Việt Nam",
            "Mở ra giai đoạn đấu tranh giành độc lập dân tộc",
        ],
        icon: "🇻🇳",
    },
];

// Component để animate đường đi
const AnimatedRoute = ({ positions, color = "red" }) => {
    return (
        <Polyline
            positions={positions}
            pathOptions={{
                color: color,
                weight: 3,
                opacity: 0.7,
                dashArray: "10, 10",
                className: "animated-route",
            }}
        />
    );
};

// Component để center map khi chọn location
const ChangeView = ({ center, zoom }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(center, zoom, { animate: true, duration: 1 });
    }, [center, zoom, map]);
    return null;
};

const MapJourney = () => {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [showTimeline, setShowTimeline] = useState(true);
    const [mapCenter, setMapCenter] = useState([20, 50]);
    const [mapZoom, setMapZoom] = useState(3);

    // Tạo array coordinates cho polyline
    const routeCoordinates = journeyData.map((point) => point.coords);

    const handleLocationClick = (location) => {
        setSelectedLocation(location);
        setMapCenter(location.coords);
        setMapZoom(6);
    };

    const resetView = () => {
        setMapCenter([20, 50]);
        setMapZoom(3);
        setSelectedLocation(null);
    };

    return (
        <div className="bg-light min-vh-100">
            {/* Header */}
            <div className="bg-danger text-white py-4 shadow">
                <Container>
                    <Row className="align-items-center">
                        <Col>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                            >
                                <Badge bg="warning" text="dark" className="mb-2 fs-6">
                                    <i className="bi bi-geo-alt-fill me-2"></i>
                                    Bản đồ hành trình
                                </Badge>
                                <h1 className="display-5 fw-bold mb-2">
                                    30 Năm Tìm Đường Cứu Nước
                                </h1>
                                <p className="mb-0 lead">
                                    Chủ tịch Hồ Chí Minh (1911-1941) - Khắp năm châu bốn biển
                                </p>
                            </motion.div>
                        </Col>
                        <Col xs="auto">
                            <Button
                                variant="outline-light"
                                onClick={() => setShowTimeline(!showTimeline)}
                                size="lg"
                            >
                                <i
                                    className={`bi ${showTimeline ? "bi-chevron-left" : "bi-chevron-right"
                                        } me-2`}
                                ></i>
                                {showTimeline ? "Ẩn" : "Hiện"} Timeline
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Main Content */}
            <Container fluid className="p-0">
                <Row className="g-0">
                    {/* Timeline Sidebar */}
                    <AnimatePresence>
                        {showTimeline && (
                            <Col
                                lg={4}
                                xl={3}
                                as={motion.div}
                                initial={{ x: -300, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -300, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 100 }}
                                style={{
                                    height: "calc(100vh - 140px)",
                                    overflowY: "auto",
                                    backgroundColor: "#f8f9fa",
                                }}
                            >
                                <div className="p-4">
                                    <h4 className="text-danger mb-3">
                                        <i className="bi bi-clock-history me-2"></i>
                                        Dòng thời gian
                                    </h4>

                                    {/* Reset Button */}
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={resetView}
                                        className="w-100 mb-3"
                                    >
                                        <i className="bi bi-arrow-counterclockwise me-2"></i>
                                        Xem toàn bộ hành trình
                                    </Button>

                                    <ListGroup>
                                        {journeyData.map((location, index) => (
                                            <motion.div
                                                key={location.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                            >
                                                <ListGroup.Item
                                                    action
                                                    active={selectedLocation?.id === location.id}
                                                    onClick={() => handleLocationClick(location)}
                                                    className={`mb-2 border-0 shadow-sm ${selectedLocation?.id === location.id
                                                            ? "border-start border-danger border-4"
                                                            : ""
                                                        }`}
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    <div className="d-flex align-items-start">
                                                        <div
                                                            className="me-3"
                                                            style={{ fontSize: "2rem", lineHeight: 1 }}
                                                        >
                                                            {location.icon}
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <div className="d-flex justify-content-between align-items-start mb-1">
                                                                <Badge bg="danger">{location.year}</Badge>
                                                                <small className="text-muted">
                                                                    {location.date}
                                                                </small>
                                                            </div>
                                                            <h6 className="mb-1 fw-bold">{location.title}</h6>
                                                            <small className="text-muted">
                                                                <i className="bi bi-geo-alt me-1"></i>
                                                                {location.location}
                                                            </small>
                                                        </div>
                                                    </div>
                                                </ListGroup.Item>
                                            </motion.div>
                                        ))}
                                    </ListGroup>
                                </div>
                            </Col>
                        )}
                    </AnimatePresence>

                    {/* Map */}
                    <Col
                        lg={showTimeline ? 8 : 12}
                        xl={showTimeline ? 9 : 12}
                        className="position-relative"
                    >
                        <MapContainer
                            center={mapCenter}
                            zoom={mapZoom}
                            style={{
                                height: "calc(100vh - 140px)",
                                width: "100%",
                            }}
                            scrollWheelZoom={true}
                        >
                            <ChangeView center={mapCenter} zoom={mapZoom} />

                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            {/* Animated Route */}
                            <AnimatedRoute positions={routeCoordinates} color="#dc3545" />

                            {/* Markers */}
                            {journeyData.map((location, index) => (
                                <Marker
                                    key={location.id}
                                    position={location.coords}
                                    icon={
                                        index === 0 || index === journeyData.length - 1
                                            ? hoChiMinhIcon
                                            : DefaultIcon
                                    }
                                    eventHandlers={{
                                        click: () => handleLocationClick(location),
                                    }}
                                >
                                    <Popup maxWidth={350}>
                                        <div className="p-2">
                                            <div className="d-flex align-items-center mb-2">
                                                <span style={{ fontSize: "2rem", marginRight: "10px" }}>
                                                    {location.icon}
                                                </span>
                                                <div>
                                                    <Badge bg="danger" className="mb-1">
                                                        {location.year}
                                                    </Badge>
                                                    <h6 className="mb-0 fw-bold">{location.title}</h6>
                                                </div>
                                            </div>
                                            <p className="mb-2 small">
                                                <i className="bi bi-geo-alt-fill text-danger me-1"></i>
                                                <strong>{location.location}</strong>
                                            </p>
                                            <p className="mb-2 small">
                                                <i className="bi bi-calendar-event text-primary me-1"></i>
                                                {location.date}
                                            </p>
                                            <p className="mb-2">{location.description}</p>
                                            <div className="bg-light p-2 rounded">
                                                <strong className="small d-block mb-1">
                                                    Chi tiết:
                                                </strong>
                                                <ul className="mb-0 small ps-3">
                                                    {location.details.map((detail, idx) => (
                                                        <li key={idx}>{detail}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>

                        {/* Selected Location Card Overlay */}
                        <AnimatePresence>
                            {selectedLocation && (
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 50 }}
                                    style={{
                                        position: "absolute",
                                        bottom: "20px",
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                        zIndex: 1000,
                                        width: "90%",
                                        maxWidth: "500px",
                                    }}
                                >
                                    <Card className="shadow-lg border-0">
                                        <Card.Body>
                                            <Button
                                                variant="link"
                                                size="sm"
                                                className="position-absolute top-0 end-0 m-2 text-danger"
                                                onClick={() => setSelectedLocation(null)}
                                            >
                                                <i className="bi bi-x-lg fs-5"></i>
                                            </Button>
                                            <div className="d-flex align-items-center mb-3">
                                                <span
                                                    style={{ fontSize: "3rem", marginRight: "15px" }}
                                                >
                                                    {selectedLocation.icon}
                                                </span>
                                                <div>
                                                    <Badge bg="danger" className="mb-1">
                                                        {selectedLocation.year}
                                                    </Badge>
                                                    <h5 className="mb-0 fw-bold">
                                                        {selectedLocation.title}
                                                    </h5>
                                                    <small className="text-muted">
                                                        <i className="bi bi-geo-alt me-1"></i>
                                                        {selectedLocation.location}
                                                    </small>
                                                </div>
                                            </div>
                                            <p className="mb-2">
                                                <i className="bi bi-calendar-event text-primary me-2"></i>
                                                <strong>{selectedLocation.date}</strong>
                                            </p>
                                            <p className="mb-3">{selectedLocation.description}</p>
                                            <div className="bg-light p-3 rounded">
                                                <h6 className="text-danger mb-2">
                                                    <i className="bi bi-info-circle-fill me-2"></i>
                                                    Thông tin chi tiết
                                                </h6>
                                                <ul className="mb-0">
                                                    {selectedLocation.details.map((detail, idx) => (
                                                        <li key={idx} className="mb-1">
                                                            {detail}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Col>
                </Row>
            </Container>

            {/* Custom CSS */}
            <style jsx>{`
        .animated-route {
          animation: dash 20s linear infinite;
        }
        @keyframes dash {
          to {
            stroke-dashoffset: -1000;
          }
        }
        .leaflet-popup-content-wrapper {
          border-radius: 8px;
        }
        .leaflet-popup-content {
          margin: 0;
        }
      `}</style>
        </div>
    );
};

export default MapJourney;
