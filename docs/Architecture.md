# 🏗️ Kiến Trúc Hệ Thống CivicTwin AI

> _"Thiết kế cơ bản cho Digital Twin & AI Prediction Platform"_

---

## 📊 Tổng Quan Kiến Trúc

CivicTwin AI được thiết kế theo kiến trúc **Microservices** hiện đại, đảm bảo:
- 🔄 Khả năng mở rộng (Scalability)
- 🔌 Tính linh hoạt (Flexibility)
- ⚡ Hiệu suất cao (High Performance)
- 🛡️ Độ tin cậy (Reliability)

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend Layer                           │
│  (Vite + Vanilla JS, Leaflet/Mapbox, Charts.js)            │
└────────────────┬────────────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────────────┐
│              API Gateway & Load Balancer                    │
│                  (Nginx / Node.js)                          │
└────────────────┬────────────────────────────────────────────┘
                 │
    ┌────────────┼────────────┬────────────┐
    │            │            │            │
    ▼            ▼            ▼            ▼
┌─────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│ Digital │ │   AI     │ │Simulation│ │Dashboard │
│  Twin   │ │Prediction│ │  Engine  │ │  Service │
│ Service │ │ Service  │ │          │ │          │
└─────────┘ └──────────┘ └──────────┘ └──────────┘
    │            │            │            │
    └────────────┼────────────┼────────────┘
                 │
    ┌────────────┼────────────┬────────────┐
    │            │            │            │
    ▼            ▼            ▼            ▼
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│ IoT      │ │ Message  │ │ Cache &  │ │Geospatial│
│ Adapter  │ │ Queue    │ │ Session  │ │  Database│
│          │ │ (Kafka)  │ │ (Redis)  │ │(PostgreSQL
└──────────┘ └──────────┘ └──────────┘ │+ PostGIS)
                                        └──────────┘
```

---

## 🔧 Các Thành phần Chính

| Thành phần | Công nghệ | Mục đích |
|----------|----------|---------|
| **Frontend** | Vite, Vanilla JS, Leaflet, Charts.js | Giao diện người dùng, bản đồ tương tác |
| **API Gateway** | Node.js + Express / Nginx | Routing, Load balancing, Authentication |
| **Digital Twin** | Node.js, PostGIS, Real-time engine | Mô hình hóa đô thị, cập nhật thời gian thực |
| **AI Prediction** | Amazon Bedrock + Nova | Dự báo lưu lượng, cảnh báo môi trường |
| **Simulation** | Agent-Based Model, Python FastAPI | Mô phỏng kịch bản what-if |
| **Dashboard** | Node.js + EJS/Pug | Hiển thị dữ liệu, Impact Score, Radar Chart |
| **IoT Adapter** | Node.js, MQTT | Nhận dữ liệu từ cảm biế, camera, thời tiết |
| **Message Queue** | Apache Kafka / RabbitMQ | Event streaming, xử lý bất đồng bộ |
| **Cache** | Redis | Session, caching, real-time data |
| **Database** | PostgreSQL + PostGIS | Lưu trữ dữ liệu địa lý, lịch sử |

---

## 🌐 Luồng Dữ liệu Chính

### 1. Nhận dữ liệu từ Nguồn Ngoài

```
Sensors/Cameras/APIs
        ↓
   MQTT Broker
        ↓
  IoT Adapter
        ↓
  Kafka Topic
        ↓
  [Microservices]
```

**Dữ liệu bao gồm:**
- 📷 Camera feed (giao thông, flooding)
- 🌡️ Cảm biến IoT (nhiệt độ, độ ẩm, mực nước, ô nhiễm)
- 🌤️ Dữ liệu thời tiết (API OpenWeatherMap, NOAA)
- 🚗 Dữ liệu giao thông real-time
- 📱 Báo cáo từ ứng dụng người dân

### 2. Cập nhật Digital Twin

```
Raw Data (Kafka)
        ↓
Digital Twin Service
        ↓
1. Validate & Normalize
2. Update Graph Model
3. Publish Events
        ↓
PostgreSQL + PostGIS
        ↓
Dashboard / Visualization
```

**Digital Twin bao gồm:**
- Đồ thị mạng (Graph) của đô thị
- Nút (Nodes): đường sá, giao lộ, công trình, khu vực
- Cạnh (Edges): kết nối giữa các điểm
- Trạng thái thực tế: lưu lượng, ùn tắc, mực nước, etc.

### 3. AI Dự đoán

```
Digital Twin State (Current + Historical)
        ↓
AI Prediction Service
        ↓
1. Feature Engineering
2. Call Amazon Nova
3. Parse Structured Output
        ↓
Predictions:
- Traffic Flow (15-60 min ahead)
- Flooding Risk (next 2-6 hours)
- Cascade Effects
        ↓
Dashboard + Alerts
```

**Các mô hình dự báo:**
- 🚗 **Traffic Flow**: LSTM/Transformer trên dữ liệu lịch sử
- 💧 **Flooding Risk**: Kết hợp weather API + sensor data + rainfall prediction
- 📊 **Impact Cascade**: Agent-based simulation

### 4. Mô phỏng What-If

```
User Input:
- Drag & drop new infrastructure
- Change traffic signal timing
- Add construction area
        ↓
Simulation Engine
        ↓
1. Clone current state
2. Apply changes
3. Run Agent-Based Model
4. Predict outcomes (5-10 years)
        ↓
Results:
- Economic Impact
- Environmental Impact
- Accessibility Changes
- Equity Score
- Safety Assessment
        ↓
Impact Score + Radar Chart
```

---

## 🔄 Luồng Khẩn cấp (Emergency Response)

Khi có sự cố (accident, flooding):

```
Incident Detected
        ↓
Incident Service
        ↓
1. Create Incident Record
2. Trigger AI Analysis
        ↓
3a. Identify Fastest Route (for ambulance/fire truck)
3b. Predict Cascade Effects (traffic congestion spread)
3c. Recommend Evacuation Routes
        ↓
Notification Service
        ↓
Send Alerts to:
- Emergency Response Teams
- Citizens (via app)
- Traffic Management Centers
```

---

## 📡 API Endpoints Chính

```
POST   /api/scenarios              # Tạo kịch bản mô phỏng
GET    /api/scenarios/:id          # Lấy chi tiết kịch bản
POST   /api/scenarios/:id/simulate # Chạy mô phỏng
GET    /api/digital-twin/state     # Trạng thái Digital Twin hiện tại
GET    /api/predictions/traffic    # Dự báo lưu lượng
GET    /api/predictions/flooding   # Cảnh báo ngập úng
GET    /api/map/zones              # Dữ liệu vùng để vẽ bản đồ
POST   /api/incidents              # Báo cáo sự cố
GET    /api/incidents/:id          # Chi tiết sự cố
POST   /api/emergency/routes       # Tìm tuyến đường khẩn cấp
```

---

## 💾 Cấu trúc Database

### PostgreSQL + PostGIS

```sql
-- Digital Twin (Đồ thị mạng)
TABLE zones              -- Các khu vực/vùng
TABLE intersections     -- Giao lộ
TABLE roads            -- Đường sá
TABLE infrastructure   -- Công trình (bệnh viện, trường, v.v.)

-- Real-time State
TABLE zone_state       -- Trạng thái khu vực (tập trung, ùn tắc, ngập)
TABLE traffic_flow     -- Lưu lượng giao thông theo thời gian
TABLE water_level      -- Mực nước từ cảm biến

-- Predictions
TABLE predictions      -- Kết quả dự báo
TABLE forecast_log     -- Lịch sử dự báo

-- Scenarios & Simulations
TABLE scenarios        -- Kịch bản người dùng tạo
TABLE simulation_results -- Kết quả mô phỏng

-- Incidents
TABLE incidents        -- Sự cố (tai nạn, ngập, v.v.)
TABLE incident_events  -- Các sự kiện liên quan
```

---

## 🚀 Triển khai

### Development
```bash
npm install
npm run dev
```

### Production (Docker)
```bash
docker-compose --file docker-compose.prod.yml up -d
```

### Scaling
- **Horizontal**: Chạy nhiều instance của từng service
- **Vertical**: Tăng tài nguyên (CPU, RAM)
- **Caching**: Sử dụng Redis để cache các query nặng

---

## 🔐 Bảo mật

- **Authentication**: JWT tokens
- **Authorization**: Role-based access control (RBAC)
- **Encryption**: HTTPS/TLS, database encryption at rest
- **Rate Limiting**: Ngăn chặn abuse
- **Audit Logs**: Ghi lại các thay đổi quan trọng

---

## 📚 Tài liệu Liên quan

- [Services Documentation](/Services/)
- [API Reference](/Services/)
- [Installation Guide](./Installation.md)

