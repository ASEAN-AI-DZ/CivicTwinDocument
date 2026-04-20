# 🚀 Hướng dẫn Bắt đầu CivicTwin AI

> _"Từ lý thuyết sang thực hành — Triển khai CivicTwin AI ngay hôm nay"_

---

## 📋 Yêu cầu Hệ thống

### Cài đặt Sơ bộ
- **Node.js**: v16+ 
- **npm** hoặc **yarn**: v7+
- **PostgreSQL**: v12+
- **PostGIS**: v3.0+ (extension cho PostgreSQL)
- **Docker** (tùy chọn, nhưng khuyến nghị)

### Môi trường
- **OS**: Linux, macOS, hoặc Windows (WSL2)
- **RAM**: Tối thiểu 8GB
- **Disk**: 20GB (để chứa dữ liệu, model)

---

## 🔧 Cài đặt Nhanh (5 phút)

### Bước 1: Clone Repository

```bash
git clone https://github.com/asean-ai/civic-twin.git
cd civic-twin
```

### Bước 2: Cài đặt Dependencies

```bash
npm install
# hoặc
yarn install
```

### Bước 3: Cấu hình Môi trường

Tạo file `.env` trong thư mục gốc:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/civic_twin
POSTGIS_ENABLED=true

# AI Core
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret

# API
PORT=3000
NODE_ENV=development

# Maps
MAPBOX_TOKEN=your_mapbox_token
```

### Bước 4: Khởi tạo Database

```bash
npm run migrate
npm run seed  # (nếu cần dữ liệu mẫu)
```

### Bước 5: Chạy Ứng dụng

```bash
npm start
```

Ứng dụng sẽ chạy tại `http://localhost:3000`

---

## 🐳 Cài đặt với Docker (Khuyến nghị)

### Bước 1: Xây dựng Docker Image

```bash
docker-compose build
```

### Bước 2: Chạy Container

```bash
docker-compose up -d
```

### Bước 3: Kiểm tra Trạng thái

```bash
docker-compose ps
```

Tất cả dịch vụ sẽ chạy:
- **API Backend**: http://localhost:3000
- **Frontend**: http://localhost:5173
- **PostgreSQL**: localhost:5432
- **Redis** (cache): localhost:6379

---

## 📊 Cấu trúc Dự án

```
civic-twin/
├── src/
│   ├── services/           # Các microservice
│   │   ├── DigitalTwin/   # Digital Twin engine
│   │   ├── Prediction/    # AI prediction
│   │   ├── Simulation/    # What-If scenario
│   │   └── Dashboard/     # Decision support
│   ├── pages/              # Frontend pages
│   ├── css/                # Styling
│   └── api/                # API routes
├── docs/                   # Tài liệu
├── docker-compose.yml      # Docker configuration
├── package.json
└── README.md
```

---

## ✅ Kiểm tra Cài đặt

### 1. Kiểm tra API

```bash
curl http://localhost:3000/api/health
# Kết quả: {"status": "ok", "timestamp": "2026-03-31T..."}
```

### 2. Truy cập Frontend

Mở trình duyệt: `http://localhost:5173`

### 3. Tạo Dự án Test

1. Đăng nhập với tài khoản demo
2. Chọn "Tạo Kịch bản Mới"
3. Vẽ một con đường trên bản đồ
4. Xem kết quả dự báo

---

## 🚨 Khắc phục Sự cố

### Lỗi: "Connection refused" (PostgreSQL)

```bash
# Kiểm tra PostgreSQL đang chạy
sudo service postgresql status

# Hoặc nếu dùng Docker
docker-compose ps postgres
```

### Lỗi: "Port 3000 đã được sử dụng"

```bash
# Tìm process sử dụng port 3000
lsof -i :3000

# Hoặc chỉ định port khác
PORT=3001 npm start
```

### Lỗi: "AWS credentials not found"

Kiểm tra file `.env` có chứa `AWS_ACCESS_KEY_ID` và `AWS_SECRET_ACCESS_KEY` không. Hoặc cấu hình AWS CLI:

```bash
aws configure
```

---

## 📚 Bước Tiếp theo

- [Kiến trúc Hệ thống](./Architecture.md) – Tìm hiểu thiết kế chi tiết
- [Cài đặt Không Docker](./BUILD_WITHOUT_DOCKER.md) – Nếu bạn không muốn dùng Docker
- [Các Dịch vụ](/Services/) – Tìm hiểu từng microservice
- [API Documentation](/Services/) – Danh sách API endpoints

---

## 💡 Mẹo Phát triển

### Hot Reload Frontend

```bash
npm run dev  # Tự động reload khi code thay đổi
```

### Debug Backend

```bash
DEBUG=* npm start  # Xem log chi tiết
```

### Reset Database

```bash
npm run migrate:reset
npm run seed
```

---

## 🆘 Cần Giúp Đỡ?

- 📖 Xem [Kiến trúc Hệ thống](./Architecture.md) để hiểu thêm về thiết kế
- 🐛 Báo bug: [GitHub Issues](https://github.com/asean-ai/civic-twin/issues)
- 💬 Thảo luận: [GitHub Discussions](https://github.com/asean-ai/civic-twin/discussions)


---

## 📞 Liên hệ & Hỗ trợ

- 📖 Xem [Kiến trúc Hệ thống](./Architecture.md) để hiểu thêm về thiết kế
- 🐛 Báo bug: [GitHub Issues](https://github.com/ASEAN-AI-DZ/CivicTwin/issues)
- 💬 Thảo luận: [GitHub Discussions](https://github.com/ASEAN-AI-DZ/CivicTwin/discussions)

---

## 📄 Giấy phép

Dự án này được phân phối dưới **GNU General Public License v3.0**. Xem file [LICENSE](./License.md) để biết thêm chi tiết.

---

© 2025 CivicTwin AI – Được phát triển với ❤️ bởi Nhóm ASEAN-AI-DZ
