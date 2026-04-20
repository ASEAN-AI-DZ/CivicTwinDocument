# 📦 Hướng dẫn Cài đặt CivicTwin AI

> Hướng dẫn chi tiết để cài đặt và chạy CivicTwin AI trên máy local hoặc server

---

## 🔧 Yêu cầu Hệ thống

### Yêu cầu Cơ bản
- **OS**: Linux, macOS, Windows (WSL2)
- **RAM**: Tối thiểu 8GB (khuyến nghị 16GB)
- **Disk**: 20GB trống (để dữ liệu + model AI)
- **Internet**: Kết nối ổn định

### Nếu dùng Docker (Khuyến nghị ✅)

| Công nghệ | Phiên bản | Ghi chú |
|-----------|----------|--------|
| **Docker** | 20.10+ | [Tải Docker Desktop](https://www.docker.com/products/docker-desktop) |
| **Docker Compose** | 2.0+ | Đi kèm Docker Desktop |
| **Git** | 2.30+ | [Tải Git](https://git-scm.com/downloads) |

**Lợi ích**: Không cần cài Node.js, PostgreSQL, Redis... Tất cả đã có trong containers!

### Nếu KHÔNG dùng Docker

Xem [BUILD_WITHOUT_DOCKER.md](./BUILD_WITHOUT_DOCKER.md)

| Công nghệ | Phiên bản | Mục đích |
|-----------|----------|---------|
| **Node.js** | 18.0+ | Backend API, Microservices |
| **npm/yarn** | 9.0+ | Package manager |
| **PostgreSQL** | 12.0+ | Main database |
| **PostGIS** | 3.0+ | Geospatial extension |
| **Python** | 3.9+ | AI prediction models |
| **Redis** | 6.0+ | Caching & sessions |

---

## 🚀 Cài đặt Nhanh (5 phút)

### Bước 1: Clone Repository

```bash
git clone https://github.com/asean-ai/civic-twin.git
cd civic-twin
```

### Bước 2: Tạo file .env

```bash
cp .env.example .env
```

**Chỉnh sửa `.env` (đặc biệt các dòng):**

```env
# Database
DATABASE_URL=postgresql://civic_user:civic_pass@postgres:5432/civic_twin
POSTGIS_ENABLED=true

# AWS (Bedrock) - Để dùng AI prediction
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret

# Application
NODE_ENV=development
PORT=3000

# Maps
MAPBOX_TOKEN=your_mapbox_token  # Optional, lấy từ https://mapbox.com

# Redis
REDIS_URL=redis://redis:6379

# Session
SESSION_SECRET=your_secret_key_here
```

### Bước 3: Chạy với Docker Compose

```bash
# Build & run containers
docker-compose up -d

# Chờ 1-2 phút cho tất cả services khởi động
docker-compose ps
```

### Bước 4: Khởi tạo Database

```bash
# Chạy migrations
docker-compose exec api npm run migrate

# (Optional) Seed dữ liệu mẫu
docker-compose exec api npm run seed
```

### Bước 5: Truy cập Ứng dụng

- **Frontend**: http://localhost:5173
- **API**: http://localhost:3000
- **Adminer** (Database GUI): http://localhost:8080

---

## 📋 Services Docker

Khi chạy `docker-compose up -d`, các services sau sẽ khởi động:

```bash
# Xem danh sách services
docker-compose ps

# OUTPUT:
# NAME       IMAGE                      STATUS
# api        civic-twin-api:latest      Up 2 minutes
# frontend   civic-twin-frontend:latest Up 2 minutes  
# postgres   postgres:15                Up 2 minutes
# redis      redis:7                    Up 2 minutes
# adminer    adminer:latest             Up 2 minutes
```

### Các Ports
- **Frontend**: 5173 (Vite dev server)
- **Backend API**: 3000 (Express.js)
- **PostgreSQL**: 5432 (nội bộ, không expose)
- **Redis**: 6379 (nội bộ)
- **Adminer**: 8080 (Database admin tool)

---

## 🧪 Kiểm tra Cài đặt

### 1. Kiểm tra API Health

```bash
curl http://localhost:3000/api/health
```

**Kết quả mong đợi:**
```json
{
  "status": "ok",
  "timestamp": "2026-03-31T10:30:00Z",
  "services": {
    "database": "connected",
    "redis": "connected",
    "ai": "ready"
  }
}
```

### 2. Kiểm tra Frontend

Mở trình duyệt: **http://localhost:5173**

Bạn sẽ thấy:
- 📍 Bản đồ tương tác của thành phố
- 🎮 Nút "Create Scenario"
- 📊 Dashboard (nếu đã đăng nhập)

### 3. Kiểm tra Database

Truy cập: **http://localhost:8080**
- **System**: PostgreSQL
- **Server**: postgres
- **Username**: civic_user
- **Password**: civic_pass
- **Database**: civic_twin

---

## 🛠️ Các Lệnh Hữu ích

### Development

```bash
# Watch mode (tự động reload)
docker-compose exec api npm run dev

# View logs
docker-compose logs -f api

# Bash shell vào container
docker-compose exec api bash
```

### Database

```bash
# Connect to PostgreSQL
docker-compose exec postgres psql -U civic_user -d civic_twin

# Reset database (cảnh báo: xóa tất cả dữ liệu!)
docker-compose exec api npm run migrate:reset
docker-compose exec api npm run seed
```

### Build & Deployment

```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Push lên registry (nếu có)
docker tag civic-twin-api:latest your-registry.com/civic-twin-api:latest
docker push your-registry.com/civic-twin-api:latest
```

---

## 🚨 Khắc phục Sự cố

### Lỗi: "Container exited with code 1"

```bash
# Xem log chi tiết
docker-compose logs api

# Kiểm tra .env có đúng không
cat .env | grep DATABASE_URL

# Thử rebuild
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Lỗi: "Port 5173 already in use"

```bash
# Tìm process sử dụng port
lsof -i :5173  # macOS/Linux
netstat -ano | findstr :5173  # Windows

# Hoặc chỉ định port khác
PORT=3001 FRONTEND_PORT=5174 docker-compose up -d
```

### Lỗi: "PostgreSQL connection refused"

```bash
# Kiểm tra container PostgreSQL có chạy không
docker-compose ps postgres

# Connect trực tiếp
docker-compose exec postgres psql -U civic_user -d civic_twin

# Nếu vẫn lỗi, reset database
docker-compose down -v  # -v: xóa volumes
docker-compose up -d
docker-compose exec api npm run migrate
```

### Lỗi: "AWS credentials not found"

```bash
# Kiểm tra .env
grep AWS_ .env

# Hoặc cấu hình AWS CLI
aws configure
```

---

## 📚 Cài đặt Nâng cao

### Sử dụng Custom Domain

Thêm vào `/etc/hosts` (macOS/Linux):
```
127.0.0.1 civic.local
```

Windows (`C:\Windows\System32\drivers\etc\hosts`):
```
127.0.0.1 civic.local
```

Sau đó cập nhật `.env`:
```env
FRONTEND_URL=http://civic.local:5173
API_URL=http://civic.local:3000
```

### Enable HTTPS (Local)

```bash
# Tạo self-signed certificate
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365

# Cập nhật docker-compose.yml
# ... (xem template ở nginx.conf)
```

### Scaling (Multiple Workers)

Trong `docker-compose.yml`:
```yaml
api:
  deploy:
    replicas: 3  # Chạy 3 instances của API
```

---

## ✅ Xác nhận Cài đặt Hoàn tất

Kiểm tra các dấu hiệu:

- ✅ `docker-compose ps` - Tất cả containers "Up"
- ✅ http://localhost:5173 - Frontend hiển thị
- ✅ http://localhost:3000/api/health - API responds
- ✅ Database migrations thành công
- ✅ Có thể tạo scenario và xem kết quả

---

## 📖 Bước Tiếp theo

1. [Hướng dẫn Bắt đầu](./GettingStarted.md) – Làm quen với giao diện
2. [Kiến trúc](./Architecture.md) – Hiểu chi tiết hệ thống
3. [Services](./Services/) – Tìm hiểu từng module
4. [Phát triển](./BUILD_WITHOUT_DOCKER.md) – Cài đặt để phát triển

---

## 💬 Cần Giúp?

- 📖 [README chính](../README.md)
- 🐛 [GitHub Issues](https://github.com/asean-ai/civic-twin/issues)
- 💭 [Discussions](https://github.com/asean-ai/civic-twin/discussions)
