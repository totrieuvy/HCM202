# Hồ Chí Minh - 30 Năm Tìm Đường Cứu Nước

Ứng dụng web giáo dục về hành trình 30 năm tìm đường cứu nước của Chủ tịch Hồ Chí Minh (1911-1941).

## 🌟 Tính năng

- **Trang chủ**: Timeline tương tác với hiệu ứng AOS animations
- **Mini Game**: Trắc nghiệm kiến thức lịch sử với 10 câu hỏi
- **AI Chat**: Trò chuyện với AI về cuộc đời và sự nghiệp của Bác Hồ
- **Responsive Design**: Tương thích với mọi thiết bị
- **Bootstrap UI**: Giao diện hiện đại với màu sắc Việt Nam

## 🛠️ Công nghệ sử dụng

- **React 19.1.1** - Framework chính
- **React Router DOM** - Điều hướng trang
- **Bootstrap 5** & **React Bootstrap** - UI Framework
- **AOS (Animate On Scroll)** - Hiệu ứng cuộn trang
- **Vite** - Build tool và dev server

## 🚀 Cài đặt và chạy

```bash
# Clone repository
git clone [repository-url]
cd HCM202

# Cài đặt dependencies
npm install

# Chạy ứng dụng phát triển
npm run dev

# Build production
npm run build

# Preview production build
npm run preview
```

## 📁 Cấu trúc dự án

```
src/
├── components/          # Component tái sử dụng
│   └── Layout.jsx      # Header, Footer và layout chính
├── pages/              # Các trang chính
│   ├── Home.jsx        # Trang chủ với timeline
│   ├── MiniGamePage.jsx # Trang trắc nghiệm
│   └── AiChatPage.jsx  # Trang chat AI
├── styles/             # CSS tùy chỉnh
│   └── custom.css      # Styles cho theme Việt Nam
├── main.jsx           # Entry point với routing
└── index.css          # Base styles
```

## 🎨 Thiết kế

### Màu sắc chủ đề Việt Nam

- **Đỏ Việt Nam**: `#dc143c` - Màu chính cho header, buttons
- **Vàng sao**: `#ffdc00` - Màu nhấn và highlight
- **Xanh đậm**: `#2c3e50` - Màu text và backgrounds

### Typography

- Font chính: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- Bootstrap Icons cho các icon

## 📱 Responsive Design

- **Desktop**: Layout đầy đủ với timeline
- **Tablet**: Responsive grid và navigation
- **Mobile**: Simplified layout, ẩn timeline decoration

## 🤖 AI Integration

Ứng dụng tích hợp với AI API để trả lời câu hỏi về:

- Cuộc đời và sự nghiệp của Hồ Chí Minh
- Các sự kiện lịch sử quan trọng
- Tư tưởng và triết lý của Bác

API Endpoint: `https://aziky.duckdns.org/hcm`

## 🎮 Mini Game

Trắc nghiệm 10 câu hỏi về:

- Hành trình ra đi tìm đường cứu nước
- Các nước Bác đã từng đến
- Tổ chức và hoạt động cách mạng
- Tư tưởng chính trị

Tính năng:

- Đếm thời gian làm bài
- Theo dõi tiến độ
- Đánh giá kết quả chi tiết
- Có thể chơi lại nhiều lần

## 🔧 Scripts

```bash
npm run dev      # Chạy development server
npm run build    # Build cho production
npm run lint     # Kiểm tra lỗi ESLint
npm run preview  # Preview production build
```

## 📝 License

Dự án này được tạo cho mục đích giáo dục về lịch sử Việt Nam.

## 👥 Contributing

Mọi đóng góp để cải thiện dự án đều được chào đón!+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
