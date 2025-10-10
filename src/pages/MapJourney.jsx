import React, { useState, useEffect } from "react";
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
import {
    Container,
    Row,
    Col,
    Card,
    Badge,
    Button,
    ListGroup,
    OverlayTrigger,
    Tooltip,
} from "react-bootstrap";
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

// Custom icons
const startIcon = new L.Icon({
    iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const endIcon = new L.Icon({
    iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const importantIcon = new L.Icon({
    iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

// Dữ liệu hành trình 30 năm - ĐẦY ĐỦ CÁC ĐIỂM DI CHUYỂN
const journeyData = [
    {
        id: 1,
        year: "1911",
        location: "Sài Gòn, Việt Nam",
        coords: [10.7627, 106.6984],
        title: "Rời bến cảng Nhà Rồng",
        date: "5/6/1911",
        description:
            "Nguyễn Tất Thành (tên Văn Ba) 21 tuổi lên tàu Amiral Latouche-Tréville, bắt đầu hành trình 30 năm tìm đường cứu nước.",
        details: [
            "Làm phụ bếp trên tàu với lương 45 franc/tháng",
            "Mục đích: Tìm hiểu văn minh phương Tây để tìm đường cứu nước",
            "Tàu đi qua Singapore, Colombo, Aden, Port Said, Marseille",
        ],
        icon: "🚢",
        importance: "start",
    },
    {
        id: 2,
        year: "1911",
        location: "Singapore",
        coords: [1.3521, 103.8198],
        title: "Điểm dừng đầu tiên",
        date: "8/6/1911",
        description: "Tàu cập cảng Singapore - điểm dừng đầu tiên sau khi rời Việt Nam.",
        details: [
            "Điểm dừng đầu tiên của tàu Amiral Latouche-Tréville",
            "Quan sát cuộc sống tại thuộc địa Anh",
            "Tiếp tục hành trình sang phương Tây",
        ],
        icon: "🇸🇬",
    },
    {
        id: 3,
        year: "1911",
        location: "Colombo, Sri Lanka",
        coords: [6.9271, 79.8612],
        title: "Qua Ấn Độ Dương",
        date: "14/6/1911",
        description: "Tàu dừng tại Colombo, cảng quan trọng trên tuyến Á - Âu.",
        details: [
            "Trạm dừng thứ 2 trên đường đến Pháp",
            "Tìm hiểu về phong trào độc lập Ấn Độ",
            "Quan sát chế độ thực dân Anh",
        ],
        icon: "🇱🇰",
    },
    {
        id: 4,
        year: "1911",
        location: "Aden, Yemen",
        coords: [12.7855, 45.0187],
        title: "Qua Biển Đỏ",
        date: "Tháng 6/1911",
        description: "Cảng trung chuyển quan trọng tại Yemen trước khi vào kênh Suez.",
        details: [
            "Cảng chiến lược trên Biển Đỏ",
            "Điểm giao thương giữa Á-Âu-Phi",
            "Tiếp tục hành trình vào Địa Trung Hải",
        ],
        icon: "🇾🇪",
    },
    {
        id: 5,
        year: "1911",
        location: "Port Said, Ai Cập",
        coords: [31.2653, 32.3019],
        title: "Qua kênh đào Suez",
        date: "30/6/1911",
        description: "Cảng cửa ngõ kênh đào Suez, nơi giao thoa giữa Á-Phi-Âu.",
        details: [
            "Cảng trước khi vào Địa Trung Hải",
            "Đi qua kênh đào Suez nối Biển Đỏ và Địa Trung Hải",
            "Quan sát văn minh Ai Cập cổ đại",
        ],
        icon: "🇪🇬",
    },
    {
        id: 6,
        year: "1911",
        location: "Tunis, Tunisia",
        coords: [36.8065, 10.1815],
        title: "Qua Bắc Phi",
        date: "Tháng 7/1911",
        description: "Đi qua các cảng thuộc địa Pháp ở Bắc Phi.",
        details: [
            "Tìm hiểu về thuộc địa Pháp tại Bắc Phi",
            "Quan sát chế độ thực dân ở châu Phi",
            "Tiếp tục hành trình vào Địa Trung Hải",
        ],
        icon: "🇹🇳",
    },
    {
        id: 7,
        year: "1911",
        location: "Marseille, Pháp",
        coords: [43.2965, 5.3698],
        title: "Đến Pháp lần đầu",
        date: "Tháng 7/1911",
        description: "Tàu cập cảng Marseille, miền Nam nước Pháp.",
        details: [
            "Cảng lớn nhất Pháp bên Địa Trung Hải",
            "Tìm hiểu xã hội Pháp và chế độ thực dân",
            "Làm nhiều nghề thủ công để kiếm sống",
        ],
        icon: "🇫🇷",
    },
    {
        id: 8,
        year: "1911-1912",
        location: "Dakar, Senegal",
        coords: [14.7167, -17.4677],
        title: "Sang Tây Phi",
        date: "1912",
        description: "Điểm dừng tại Tây Phi trên đường sang Châu Mỹ.",
        details: [
            "Cảng quan trọng ở Tây Phi",
            "Tìm hiểu về thuộc địa Pháp ở Senegal",
            "Điểm trung chuyển sang châu Mỹ",
        ],
        icon: "🇸🇳",
    },
    {
        id: 9,
        year: "1912-1913",
        location: "New York, Hoa Kỳ",
        coords: [40.7128, -74.006],
        title: "Đến Mỹ - New York",
        date: "1912-1913",
        description: "Làm việc tại Brooklyn, New York trước khi chuyển sang Boston.",
        details: [
            "Làm việc tại khu Brooklyn",
            "Tìm hiểu xã hội công nghiệp Mỹ",
            "Tiếp xúc với phong trào công nhân",
        ],
        icon: "🗽",
    },
    {
        id: 10,
        year: "1912-1913",
        location: "Boston, Hoa Kỳ",
        coords: [42.3601, -71.0589],
        title: "Làm việc tại Boston",
        date: "1912-1913",
        description: "Làm phụ bếp tại khách sạn Parker House ở Boston.",
        details: [
            "Làm phụ bếp tại khách sạn Parker House",
            "Học tiếng Anh và tìm hiểu văn hóa Mỹ",
            "Tìm hiểu nền dân chủ tư sản Mỹ",
        ],
        icon: "🇺🇸",
    },
    {
        id: 11,
        year: "1913-1917",
        location: "London, Anh",
        coords: [51.5074, -0.1278],
        title: "Thời kỳ ở Anh",
        date: "1913-1917",
        description:
            "Làm nghề cào tuyết, đốt lò, phụ bếp tại khách sạn Carlton.",
        details: [
            "Làm nhiều nghề: phụ bếp, đốt lò, cào tuyết",
            "Học tiếng Anh và văn hóa phương Tây",
            "Gửi thư cho Phan Châu Trinh năm 1914",
        ],
        icon: "🇬🇧",
    },
    {
        id: 12,
        year: "1917-1923",
        location: "Paris, Pháp",
        coords: [48.8566, 2.3522],
        title: "Định cư tại Paris",
        date: "1917-1923",
        description:
            "Giai đoạn quan trọng hình thành tư tưởng cách mạng.",
        details: [
            "Gửi Bản yêu sách 8 điểm tới Hội nghị Versailles (6/1919)",
            "Thành lập Đảng Cộng sản Pháp (25-30/12/1920)",
            "Sáng lập báo Le Paria (Người cùng khổ) từ 1922",
        ],
        icon: "📰",
        importance: "major",
    },
    {
        id: 13,
        year: "1923-1924",
        location: "Moskva, Liên Xô",
        coords: [55.7558, 37.6173],
        title: "Sang Liên Xô học tập lần 1",
        date: "6/1923 - 11/1924",
        description:
            "Học tập lý luận cách mạng Marx-Lenin tại Moskva.",
        details: [
            "Đến Moskva tháng 6/1923 với tên Linov/Lý Thụy",
            "Tham gia Đại hội V Quốc tế Cộng sản (6-7/1924)",
            "Học tập tại Trường Đại học Phương Đông",
        ],
        icon: "🇷🇺",
        importance: "major",
    },
    {
        id: 14,
        year: "1924-1927",
        location: "Quảng Châu, Trung Quốc",
        coords: [23.1291, 113.2644],
        title: "Thành lập Hội Thanh niên",
        date: "11/1924 - 4/1927",
        description:
            "Thành lập Hội Việt Nam Cách mạng Thanh niên - tiền thân của Đảng.",
        details: [
            "Thành lập Hội Việt Nam Cách mạng Thanh niên (6/1925)",
            "Xuất bản báo Thanh niên (6/1925)",
            "Đào tạo khoảng 200 cán bộ cách mạng",
        ],
        icon: "🎓",
        importance: "major",
    },
    {
        id: 15,
        year: "1927-1928",
        location: "Brussels, Bỉ",
        coords: [50.8503, 4.3517],
        title: "Hoạt động tại Châu Âu",
        date: "1927-1928",
        description: "Hoạt động cách mạng tại Bỉ, Đức, Thụy Sĩ, Ý.",
        details: [
            "Hoạt động theo sự phân công của Quốc tế Cộng sản",
            "Viết báo và tuyên truyền cách mạng",
            "Liên lạc với phong trào cộng sản quốc tế",
        ],
        icon: "🇧🇪",
    },
    {
        id: 16,
        year: "1927-1928",
        location: "Berlin, Đức",
        coords: [52.52, 13.405],
        title: "Tại Đức",
        date: "1927-1928",
        description: "Hoạt động cách mạng tại Berlin.",
        details: [
            "Tìm hiểu phong trào công nhân Đức",
            "Liên lạc với Đảng Cộng sản Đức",
            "Viết báo tuyên truyền cách mạng",
        ],
        icon: "🇩🇪",
    },
    {
        id: 17,
        year: "1927-1928",
        location: "Geneva, Thụy Sĩ",
        coords: [46.2044, 6.1432],
        title: "Tại Thụy Sĩ",
        date: "1927-1928",
        description: "Hoạt động tại Geneva - trung tâm ngoại giao quốc tế.",
        details: [
            "Hoạt động tại trụ sở Quốc tế Cộng sản",
            "Tham gia các hội nghị quốc tế",
            "Liên lạc với các tổ chức cách mạng",
        ],
        icon: "🇨🇭",
    },
    {
        id: 18,
        year: "1928-1929",
        location: "Bangkok, Thái Lan",
        coords: [13.7563, 100.5018],
        title: "Hoạt động tại Thái Lan",
        date: "6/1928 - 1929",
        description: "Hoạt động với người Việt kiều tại Thái Lan.",
        details: [
            "Hoạt động tại Bangkok và Đông Bắc Thái Lan",
            "Liên lạc với các tổ chức cộng sản trong nước",
            "Chuẩn bị cho việc thành lập Đảng",
        ],
        icon: "🇹🇭",
    },
    {
        id: 19,
        year: "1928-1929",
        location: "Nakhon Phanom, Thái Lan",
        coords: [17.4139, 102.7874],
        title: "Ở Đông Bắc Thái Lan",
        date: "1928-1929",
        description: "Giả làm nhà sư với tên Thầu Chín (Ông Chín).",
        details: [
            "Giả làm nhà sư tại chùa Nakhon Phanom",
            "Họp với cán bộ cách mạng Việt Nam",
            "Chuẩn bị kế hoạch thành lập Đảng",
        ],
        icon: "🙏",
    },
    {
        id: 20,
        year: "1930",
        location: "Hồng Kông",
        coords: [22.3193, 114.1694],
        title: "Thành lập Đảng Cộng sản Việt Nam",
        date: "3/2/1930",
        description:
            "Hội nghị hợp nhất thành Đảng Cộng sản Việt Nam tại 17A đường Yansumdi.",
        details: [
            "Hội nghị hợp nhất ngày 3/2/1930",
            "Thống nhất 3 tổ chức cộng sản",
            "Thông qua Cương lĩnh chính trị và Điều lệ",
        ],
        icon: "🏛️",
        importance: "major",
    },
    {
        id: 21,
        year: "1931-1933",
        location: "Hồng Kông (Tù Victoria)",
        coords: [22.2793, 114.1628],
        title: "Bị bắt giam",
        date: "6/1931 - 1/1933",
        description:
            "Bị bắt giam với tên Tống Văn Sơ tại nhà tù Victoria.",
        details: [
            "Bị bắt ngày 6/6/1931 với tên Tống Văn Sơ",
            "Giam tại nhà tù Victoria, Hong Kong",
            "Được thả tháng 1/1933, chạy sang Thượng Hải",
        ],
        icon: "⚖️",
    },
    {
        id: 22,
        year: "1933",
        location: "Thượng Hải, Trung Quốc",
        coords: [31.2304, 121.4737],
        title: "Trốn sang Thượng Hải",
        date: "Tháng 1/1933",
        description: "Sau khi ra tù, bí mật sang Thượng Hải để trở về Liên Xô.",
        details: [
            "Trốn thoát khỏi Hong Kong",
            "Ẩn náu tại Thượng Hải",
            "Chuẩn bị đường về Liên Xô",
        ],
        icon: "🏃",
    },
    {
        id: 23,
        year: "1934",
        location: "Vladivostok, Liên Xô",
        coords: [43.1332, 131.9113],
        title: "Qua Vladivostok",
        date: "Xuân 1934",
        description: "Cửa ngõ đi vào Liên Xô từ Thượng Hải.",
        details: [
            "Cảng biển Viễn Đông Liên Xô",
            "Điểm trung chuyển về Moskva",
            "Đi tàu hỏa xuyên Siberia",
        ],
        icon: "🚂",
    },
    {
        id: 24,
        year: "1934-1938",
        location: "Moskva, Liên Xô",
        coords: [55.7558, 37.6173],
        title: "Trở lại Liên Xô lần 2",
        date: "1934 - 1938",
        description:
            "Tiếp tục học tập và hoạt động tại Quốc tế Cộng sản.",
        details: [
            "Học tập lý luận chính trị",
            "Dự các hội nghị Quốc tế Cộng sản",
            "Làm việc với Lê Hồng Phong, Hà Huy Tập",
        ],
        icon: "🌍",
    },
    {
        id: 25,
        year: "1938-1940",
        location: "Vân Nam, Trung Quốc",
        coords: [25.0406, 102.7122],
        title: "Hoạt động tại Vân Nam",
        date: "1938-1940",
        description:
            "Làm cố vấn chính trị cho lực lượng kháng Nhật với tên Hồ Quang.",
        details: [
            "Làm cố vấn với tên Hồ Quang (胡光)",
            "Hoạt động trong lực lượng kháng Nhật",
            "Liên lạc với Ban lãnh đạo Đảng trong nước",
        ],
        icon: "🗺️",
    },
    {
        id: 26,
        year: "1938-1940",
        location: "Quế Lâm (Guilin), Trung Quốc",
        coords: [25.2736, 110.29],
        title: "Tại Quế Lâm",
        date: "1938-1940",
        description: "Hoạt động tại Quế Lâm, tỉnh Quảng Tây.",
        details: [
            "Thành phố quan trọng của Quảng Tây",
            "Gần biên giới Việt Nam",
            "Chuẩn bị kế hoạch trở về",
        ],
        icon: "🏔️",
    },
    {
        id: 27,
        year: "1939-1940",
        location: "Liễu Châu (Liuzhou), Trung Quốc",
        coords: [24.3264, 109.4281],
        title: "Tại Liễu Châu",
        date: "1939-1940",
        description: "Hoạt động tại thành phố công nghiệp Liễu Châu.",
        details: [
            "Thành phố công nghiệp Quảng Tây",
            "Trung tâm kháng chiến chống Nhật",
            "Liên lạc với cách mạng Việt Nam",
        ],
        icon: "🏭",
    },
    {
        id: 28,
        year: "1940-1941",
        location: "Tĩnh Tây (Jingxi), Trung Quốc",
        coords: [23.1343, 106.4177],
        title: "Điểm cuối trước khi về nước",
        date: "Cuối 1940 - đầu 1941",
        description: "Điểm cuối cùng sát biên giới Cao Bằng trước khi về Việt Nam.",
        details: [
            "Huyện biên giới sát Cao Bằng",
            "Chuẩn bị đầy đủ cho việc về nước",
            "Liên lạc với cán bộ trong nước",
        ],
        icon: "🏞️",
    },
    {
        id: 29,
        year: "1941",
        location: "Pác Bó, Cao Bằng, Việt Nam",
        coords: [22.6869, 106.2577],
        title: "Trở về Việt Nam - Thành lập Việt Minh",
        date: "28/1/1941",
        description:
            "Sau 30 năm xa quê hương, trở về Pác Bó. Thành lập Mặt trận Việt Minh ngày 19/5/1941.",
        details: [
            "Bước qua cột mốc 108 biên giới ngày 28/1/1941",
            "Chủ trì Hội nghị lần thứ 8 BCH TW Đảng (5/1941)",
            "Thành lập Mặt trận Việt Minh (19/5/1941)",
            "Lấy tên Hồ Chí Minh từ tháng 8/1942",
        ],
        icon: "🇻🇳",
        importance: "end",
    },
];

// Component để animate đường đi
const AnimatedRoute = ({ positions, color = "red" }) => {
    return (
        <Polyline
            positions={positions}
            pathOptions={{
                color: color,
                weight: 4,
                opacity: 0.8,
                dashArray: "10, 10",
                className: "animated-route",
            }}
        />
    );
};

// Component để center map
const ChangeView = ({ center, zoom }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(center, zoom, { animate: true, duration: 1.5 });
    }, [center, zoom, map]);
    return null;
};

const MapJourney = () => {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [showTimeline, setShowTimeline] = useState(true);
    const [mapCenter, setMapCenter] = useState([30, 50]);
    const [mapZoom, setMapZoom] = useState(2.5);

    const routeCoordinates = journeyData.map((point) => point.coords);

    const handleLocationClick = (location) => {
        setSelectedLocation(location);
        setMapCenter(location.coords);
        setMapZoom(6);
    };

    const resetView = () => {
        setMapCenter([30, 50]);
        setMapZoom(2.5);
        setSelectedLocation(null);
    };

    const getMarkerIcon = (location) => {
        if (location.importance === "start") return startIcon;
        if (location.importance === "end") return endIcon;
        if (location.importance === "major") return importantIcon;
        return DefaultIcon;
    };

    return (
        <div className="bg-light min-vh-100">
            {/* Header */}
            <div className="bg-danger text-white py-4 shadow-sm">
                <Container>
                    <Row className="align-items-center">
                        <Col>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                            >
                                <Badge bg="warning" text="dark" className="mb-2 px-3 py-2">
                                    <i className="bi bi-compass-fill me-2"></i>
                                    Bản đồ hành trình
                                </Badge>
                                <h1 className="display-5 fw-bold mb-2">
                                    30 Năm Tìm Đường Cứu Nước
                                </h1>
                                <p className="mb-0 lead">
                                    <i className="bi bi-calendar-range me-2"></i>
                                    1911-1941 · Khắp 5 châu 4 biển
                                </p>
                            </motion.div>
                        </Col>
                        <Col xs="auto" className="d-none d-md-block">
                            <Button
                                variant="outline-light"
                                onClick={() => setShowTimeline(!showTimeline)}
                                size="lg"
                                className="px-4"
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
                                initial={{ x: -350, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -350, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                                className="d-none d-lg-block"
                                style={{
                                    height: "calc(100vh - 140px)",
                                    overflowY: "auto",
                                    backgroundColor: "#f8f9fa",
                                    borderRight: "2px solid #dc3545",
                                }}
                            >
                                <div className="p-4">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <h4 className="text-danger mb-0 fw-bold">
                                            <i className="bi bi-clock-history me-2"></i>
                                            Dòng thời gian
                                        </h4>
                                    </div>

                                    {/* Statistics */}
                                    {/* <Card className="mb-3 border-0 shadow-sm bg-danger text-white">
                                        <Card.Body className="p-3">
                                            <Row className="text-center g-3">
                                                <Col xs={4}>
                                                    <div>
                                                        <h3 className="mb-0 fw-bold">30</h3>
                                                        <small>Năm</small>
                                                    </div>
                                                </Col>
                                                <Col xs={4}>
                                                    <div>
                                                        <h3 className="mb-0 fw-bold">30</h3>
                                                        <small>Quốc gia</small>
                                                    </div>
                                                </Col>
                                                <Col xs={4}>
                                                    <div>
                                                        <h3 className="mb-0 fw-bold">4</h3>
                                                        <small>Châu lục</small>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card> */}

                                    {/* Reset Button */}
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={resetView}
                                        className="w-100 mb-4"
                                    >
                                        <i className="bi bi-arrow-counterclockwise me-2"></i>
                                        Xem toàn bộ hành trình
                                    </Button>

                                    {/* Legend */}
                                    <Card className="mb-3 border-0 bg-white shadow-sm">
                                        <Card.Body className="p-3">
                                            <h6 className="fw-bold mb-2 text-danger">
                                                <i className="bi bi-info-circle me-2"></i>
                                                Chú thích
                                            </h6>
                                            <div className="small">
                                                <div className="mb-2">
                                                    <span className="badge bg-success me-2">●</span>
                                                    Điểm xuất phát (1911)
                                                </div>
                                                <div className="mb-2">
                                                    <span className="badge bg-warning text-dark me-2">
                                                        ●
                                                    </span>
                                                    Sự kiện quan trọng
                                                </div>
                                                <div className="mb-2">
                                                    <span className="badge bg-danger me-2">●</span>
                                                    Điểm kết thúc (1941)
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>

                                    {/* Timeline List */}
                                    <ListGroup>
                                        {journeyData.map((location, index) => (
                                            <motion.div
                                                key={location.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.02 }}
                                            >
                                                <OverlayTrigger
                                                    placement="right"
                                                    overlay={
                                                        <Tooltip>Click để xem chi tiết</Tooltip>
                                                    }
                                                >
                                                    <ListGroup.Item
                                                        action
                                                        active={selectedLocation?.id === location.id}
                                                        onClick={() => handleLocationClick(location)}
                                                        className={`mb-2 border-0 shadow-sm rounded ${selectedLocation?.id === location.id
                                                            ? "border-start border-danger border-4"
                                                            : ""
                                                            } ${location.importance
                                                                ? "border-start border-warning border-3"
                                                                : ""
                                                            }`}
                                                        style={{
                                                            cursor: "pointer",
                                                            transition: "all 0.3s ease",
                                                        }}
                                                    >
                                                        <div className="d-flex align-items-start">
                                                            <div
                                                                className="me-2 flex-shrink-0"
                                                                style={{ fontSize: "1.5rem", lineHeight: 1 }}
                                                            >
                                                                {location.icon}
                                                            </div>
                                                            <div className="flex-grow-1">
                                                                <div className="d-flex justify-content-between align-items-start mb-1">
                                                                    <Badge
                                                                        bg={
                                                                            location.importance === "start"
                                                                                ? "success"
                                                                                : location.importance === "end"
                                                                                    ? "danger"
                                                                                    : location.importance === "major"
                                                                                        ? "warning"
                                                                                        : "secondary"
                                                                        }
                                                                        text={
                                                                            location.importance === "major"
                                                                                ? "dark"
                                                                                : "white"
                                                                        }
                                                                        className="px-2"
                                                                        style={{ fontSize: "0.7rem" }}
                                                                    >
                                                                        {location.year}
                                                                    </Badge>
                                                                </div>
                                                                <h6 className="mb-1 fw-bold small">
                                                                    {location.title}
                                                                </h6>
                                                                <small className="text-muted d-block" style={{ fontSize: "0.7rem" }}>
                                                                    <i className="bi bi-geo-alt-fill text-danger me-1"></i>
                                                                    {location.location}
                                                                </small>
                                                            </div>
                                                        </div>
                                                    </ListGroup.Item>
                                                </OverlayTrigger>
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
                        {/* Mobile Toggle */}
                        <div
                            className="d-lg-none position-absolute top-0 start-0 m-3"
                            style={{ zIndex: 1000 }}
                        >
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={() => setShowTimeline(!showTimeline)}
                                className="shadow-sm"
                            >
                                <i className={`bi bi-${showTimeline ? "x" : "list"}`}></i>
                            </Button>
                        </div>

                        <MapContainer
                            center={mapCenter}
                            zoom={mapZoom}
                            style={{
                                height: "calc(100vh - 140px)",
                                width: "100%",
                            }}
                            scrollWheelZoom={true}
                            zoomControl={true}
                        >
                            <ChangeView center={mapCenter} zoom={mapZoom} />

                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            {/* Animated Route */}
                            <AnimatedRoute positions={routeCoordinates} color="#dc3545" />

                            {/* Markers */}
                            {journeyData.map((location) => (
                                <Marker
                                    key={location.id}
                                    position={location.coords}
                                    icon={getMarkerIcon(location)}
                                    eventHandlers={{
                                        click: () => handleLocationClick(location),
                                    }}
                                >
                                    <Popup maxWidth={400} className="custom-popup">
                                        <div className="p-2">
                                            <div className="d-flex align-items-center mb-3">
                                                <span
                                                    style={{
                                                        fontSize: "2.5rem",
                                                        marginRight: "15px",
                                                    }}
                                                >
                                                    {location.icon}
                                                </span>
                                                <div>
                                                    <Badge
                                                        bg={
                                                            location.importance === "start"
                                                                ? "success"
                                                                : location.importance === "end"
                                                                    ? "danger"
                                                                    : location.importance === "major"
                                                                        ? "warning"
                                                                        : "secondary"
                                                        }
                                                        text={
                                                            location.importance === "major" ? "dark" : "white"
                                                        }
                                                        className="mb-2"
                                                    >
                                                        {location.year}
                                                    </Badge>
                                                    <h5 className="mb-0 fw-bold">{location.title}</h5>
                                                </div>
                                            </div>
                                            <p className="mb-2">
                                                <i className="bi bi-geo-alt-fill text-danger me-2"></i>
                                                <strong>{location.location}</strong>
                                            </p>
                                            <p className="mb-2">
                                                <i className="bi bi-calendar-event text-primary me-2"></i>
                                                <strong>{location.date}</strong>
                                            </p>
                                            <p className="mb-3">{location.description}</p>
                                            <div className="bg-light p-3 rounded">
                                                <h6 className="text-danger mb-2 fw-bold">
                                                    <i className="bi bi-info-circle-fill me-2"></i>
                                                    Chi tiết:
                                                </h6>
                                                <ul className="mb-0 small ps-3">
                                                    {location.details.map((detail, idx) => (
                                                        <li key={idx} className="mb-1">
                                                            {detail}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>

                        {/* Selected Location Card */}
                        <AnimatePresence>
                            {selectedLocation && (
                                <motion.div
                                    initial={{ opacity: 0, y: 100 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 100 }}
                                    transition={{ type: "spring", stiffness: 200 }}
                                    style={{
                                        position: "absolute",
                                        bottom: "20px",
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                        zIndex: 1000,
                                        width: "95%",
                                        maxWidth: "550px",
                                    }}
                                >
                                    <Card className="shadow-lg border-0 rounded">
                                        <Card.Body className="p-4">
                                            <Button
                                                variant="link"
                                                size="sm"
                                                className="position-absolute top-0 end-0 m-2 text-danger"
                                                onClick={() => setSelectedLocation(null)}
                                                style={{ textDecoration: "none" }}
                                            >
                                                <i className="bi bi-x-circle-fill fs-4"></i>
                                            </Button>
                                            <div className="d-flex align-items-center mb-3">
                                                <span
                                                    style={{ fontSize: "3.5rem", marginRight: "20px" }}
                                                >
                                                    {selectedLocation.icon}
                                                </span>
                                                <div className="flex-grow-1">
                                                    <Badge
                                                        bg={
                                                            selectedLocation.importance === "start"
                                                                ? "success"
                                                                : selectedLocation.importance === "end"
                                                                    ? "danger"
                                                                    : selectedLocation.importance === "major"
                                                                        ? "warning"
                                                                        : "secondary"
                                                        }
                                                        text={
                                                            selectedLocation.importance === "major"
                                                                ? "dark"
                                                                : "white"
                                                        }
                                                        className="mb-2 px-3 py-2"
                                                    >
                                                        {selectedLocation.year}
                                                    </Badge>
                                                    <h4 className="mb-1 fw-bold">
                                                        {selectedLocation.title}
                                                    </h4>
                                                    <small className="text-muted">
                                                        <i className="bi bi-geo-alt-fill text-danger me-1"></i>
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
                                                <h6 className="text-danger mb-3 fw-bold">
                                                    <i className="bi bi-info-circle-fill me-2"></i>
                                                    Thông tin chi tiết
                                                </h6>
                                                <ul className="mb-0">
                                                    {selectedLocation.details.map((detail, idx) => (
                                                        <li key={idx} className="mb-2">
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
          animation: dash 30s linear infinite;
        }
        @keyframes dash {
          to {
            stroke-dashoffset: -1000;
          }
        }
        .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }
        .leaflet-popup-content {
          margin: 0;
          font-family: inherit;
        }
        .list-group-item.active {
          background-color: #dc3545;
          border-color: #dc3545;
        }
      `}</style>
        </div>
    );
};

export default MapJourney;
