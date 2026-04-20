# 🏗️ CivicTwin AI Microservices

> Tất cả các dịch vụ mô-đun hóa tạo nên nền tảng CivicTwin AI

---

## 📊 Kiến Trúc Tổng Thể

```
┌─────────────────────────────────────────────────────────────────┐
│                        Frontend Layer                           │
│         (React/Vite, Leaflet, Interactive Map)                 │
└─────────────────────┬───────────────────────────────────────────┘
                      │
        ┌─────────────┼─────────────┐
        │             │             │
        ▼             ▼             ▼
    ┌────────┐  ┌──────────┐  ┌──────────┐
    │Digital │  │ Prediction│ │Simulation│
    │ Twin   │  │ & Alert   │  │ What-If  │
    └────────┘  └──────────┘  └──────────┘
        │             │             │
        └─────────────┼─────────────┘
                      │
        ┌─────────────┼─────────────┬──────────────┐
        │             │             │              │
        ▼             ▼             ▼              ▼
    ┌─────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
    │ IoT     │  │Emergency │  │ Dashboard│  │Incident &│
    │ Sensors │  │Response  │  │ Service  │  │Analytics │
    └─────────┘  └──────────┘  └──────────┘  └──────────┘
```

---

## 🔑 Các Dịch vụ Chính

### 1. **Digital Twin Service** ⭐

**Mục đích**: Mô hình hóa toàn bộ đô thị theo thời gian thực

- 🌍 Xây dựng đồ thị mạng (graph network) của thành phố
- 📍 Tích hợp dữ liệu địa lý (PostGIS) cho đường sá, giao lộ, công trình
- ⏱️ Cập nhật liên tục từ cảm biến, camera, IoT
- 💾 Lưu trữ trạng thái + lịch sử

**Technologies**: Node.js, PostgreSQL + PostGIS, Redis, Kafka  
**API Port**: 3001  
**Documentation**: [DigitalTwinService/Readme.md](./DigitalTwinService/Readme.md)

```bash
# Health check
curl http://localhost:3001/api/digital-twin/health

# Get zones
curl http://localhost:3001/api/digital-twin/zones
```

---

### 2. **AI Prediction Service** 🤖

**Mục đích**: Dự báo & cảnh báo sự cố

- 🚗 **Traffic Prediction**: Dự báo lưu lượng giao thông (15–60 phút trước)
- 💧 **Flooding Alert**: Cảnh báo ngập úng dựa thời tiết + cảm biến
- 📊 **Cascade Effects**: Mô phỏng tác động dây chuyền
- 💰 **Socioeconomic Impact**: Dự báo tác động kinh tế-xã hội (với Amazon Nova)

**Models**: LSTM, Transformer, Agent-Based, LLM  
**AI Framework**: Amazon Bedrock + Nova  
**Technologies**: Python, FastAPI, TensorFlow/PyTorch  
**API Port**: 8002  
**Documentation**: [AIMLService/Readme.md](./AIMLService/Readme.md)

```bash
# Get traffic prediction
curl http://localhost:8002/api/predictions/traffic/road_123?horizonMinutes=60

# Get flooding alert
curl http://localhost:8002/api/predictions/flooding/city
```

---

### 3. **Simulation & What-If Service** 🎮

**Mục đích**: Thử nghiệm kịch bản trước khi triển khai thực tế

- 🏗️ Cho phép kéo-thả infrastructure (đường, bệnh viện, trường, v.v.)
- 🔄 Chạy mô phỏng agent-based (5–10 năm)
- 📈 Dự báo tác động: kinh tế, môi trường, xã hội, giao thông
- 📊 So sánh A/B testing scenarios
- 📄 Tạo báo cáo chi tiết với Impact Score & Radar Chart

**Technologies**: Python, Mesa (ABM), FastAPI, Ray  
**API Port**: 8003  
**Documentation**: [AnalyticsService/Readme.md](./AnalyticsService/Readme.md)

```bash
# Create scenario
curl -X POST http://localhost:8003/api/scenarios \
  -H "Content-Type: application/json" \
  -d '{"name": "New Hospital in District 4"}'

# Run simulation
curl -X POST http://localhost:8003/api/scenarios/scenario_123/simulate
```

---

### 4. **Emergency Response & Notification Service** 🚨

**Mục đích**: Cảnh báo khẩn cấp & hướng dẫn sơ tán

- 🚑 **Fastest Route For Emergency**: Tọa độ tuyến đường cho xe cứu thương
- 🗺️ **Evacuation Guidance**: Khuyến nghị tuyến sơ tán an toàn
- 📱 **Multi-channel Alerts**: Push, SMS, Email, Web
- 📊 **Cascade Broadcasting**: Phát hành cảnh báo toàn thành phố
- 📍 **Geolocation-based**: Chỉ cảnh báo người dân trong vùng ảnh hưởng

**Technologies**: Node.js, Express, MongoDB, Firebase FCM, Kafka  
**API Port**: 3005  
**Documentation**: [NotificationService/Readme.md](./NotificationService/Readme.md)

```bash
# Phát hành cảnh báo ngập úng
curl -X POST http://localhost:3005/api/emergency/broadcast-alert \
  -H "Content-Type: application/json" \
  -d '{
    "type": "flooding",
    "severity": "critical",
    "affectedZones": ["zone_1", "zone_2"],
    "message": "Cảnh báo ngập úng"
  }'

# Tìm tuyến đường khẩn cấp
curl -X POST http://localhost:3005/api/emergency/fastest-route \
  -H "Content-Type: application/json" \
  -d '{
    "vehicleType": "ambulance",
    "fromLocation": {"lat": 16.04, "lon": 108.21},
    "toLocation": {"lat": 16.08, "lon": 108.20}
  }'
```

---

### 5. **IoT Service** 📡

**Mục đích**: Nhận dữ liệu từ cảm biến, camera, thời tiết

- 📷 Camera giao thông (RTMP stream)
- 🌡️ Cảm biến IoT (mực nước, nhiệt độ, ô nhiễm)
- 🌤️ Dữ liệu thời tiết (OpenWeatherMap, NOAA API)
- 🚗 Lưu lượng giao thông (Grab, HERE Maps, v.v.)
- 📱 Báo cáo từ app (citizen reports)

**Technologies**: Node.js, MQTT Broker, Kafka Producer  
**Documentation**: [IoTService/Readme.md](./IoTService/Readme.md)

---

### 6. **Dashboard Service** 📊

**Mục đích**: Hiển thị dữ liệu & hỗ trợ ra quyết định

- 🗺️ **Interactive Map**: Hiển thị trạng thái thành phố thời gian thực
- 📈 **Impact Score** (0–100): Điểm tác động tổng hợp của kịch bản
- 📊 **Radar Chart**: 5 chỉ số (Economic, Environmental, Accessibility, Equity, Safety)
- 🎯 **Comparison View**: So sánh multiple scenarios
- 💡 **AI Explanation**: "Tại sao dự án này tốt/xấu?" (Natural language)

**Technologies**: React/Vue, D3.js, Chart.js, Leaflet  
**Documentation**: [DashboardService/Readme.md](./DashboardService/Readme.md)

---

### 7. **Incident Service** 🚨

**Mục đích**: Quản lý vòng đời sự cố

- 📝 Nhập dữ liệu sự cố (tai nạn, ngập lụt, hỏa hoạn)
- 🏷️ Phân loại & Ưu tiên (tự động qua AI)
- 📊 Theo dõi tiến độ xử lý
- 📈 Thống kê & Báo cáo

**Documentation**: [IncidentService/Readme.md](./IncidentService/Readme.md)

---

### 8. **Search Service** 🔍

**Mục đích**: Tìm kiếm & truy vấn nhanh dữ liệu

- 🔎 Full-text search (bệnh viện, trường, v.v.)
- 📍 Spatial search (bán kính tìm kiếm)
- 📊 Real-time indexing (OpenSearch/Elasticsearch)

**Documentation**: [SearchService/Readme.md](./SearchService/Readme.md)

---

## 🔄 Luồng Dữ Liệu

### Real-time Event Flow

```
Sensors/IoT
    ↓
MQTT Broker
    ↓
IoT Service (Adapter)
    ↓
Kafka Topic
    ├─→ Digital Twin Service (Update state)
    ├─→ Prediction Service (Analyze)
    └─→ Analytics Service (Store metrics)
    
    ↓
    
Predictions Generated
    ├─→ Dashboard (Display)
    ├─→ Notification Service (Alert if needed)
    └─→ Incident Service (Track)
```

### Scenario Simulation Flow

```
User Creates Scenario (Frontend)
    ↓
Simulation Service
    ├─ Clone current state (from Digital Twin)
    ├─ Apply changes
    ├─ Run ABM (Agent-Based Model)
    ├─ Call Amazon Nova for impact prediction
    ├─ Generate Impact Score & Radar Chart
    └─ Save results
    
    ↓
Dashboard displays results
    ├─ Impact Score
    ├─ Radar Chart
    ├─ Timeline of effects
    └─ AI explanation
```

---

## 📋 Service Dependencies

| Service | Depends On | Used By |
|---------|-----------|---------|
| **Digital Twin** | IoT Service, Kafka | Prediction, Simulation, Dashboard |
| **Prediction** | Digital Twin, Weather API | Dashboard, Notification, Simulation |
| **Simulation** | Digital Twin, Amazon Nova | Dashboard, Incident |
| **Notification** | Prediction, Incident, Digital Twin | End Users, Admin Portal |
| **Dashboard** | Digital Twin, Simulation, Prediction | Web UI, Mobile UI |
| **IoT** | Sensors, External APIs | Digital Twin |
| **Incident** | Prediction, Notification | Dashboard, Analytics |

---

## 🚀 Deployment

### Docker Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all
docker-compose down
```

### Individual Service Startup

```bash
# Digital Twin
docker-compose up -d digital-twin

# Prediction Service
docker-compose up -d prediction

# Simulation Service  
docker-compose up -d simulation

# Emergency Response
docker-compose up -d emergency

# Dashboard
docker-compose up -d dashboard

# IoT
docker-compose up -d iot
```

---

## 🔗 API Gateway

Tất cả services được expose qua unified API Gateway trên **http://localhost:3000**:

```
GET  /api/digital-twin/*
GET  /api/predictions/*
POST /api/scenarios/*
POST /api/emergency/*
GET  /api/dashboard/*
GET  /api/incidents/*
GET  /api/search/*
```

---

## 📚 Tài liệu Chi tiết

- [Digital Twin Service](./DigitalTwinService/Readme.md)
- [AI Prediction Service](./AIMLService/Readme.md)
- [Simulation Service](./AnalyticsService/Readme.md)
- [Emergency Response & Notification](./NotificationService/Readme.md)
- [IoT Service](./IoTService/Readme.md)
- [Incident Service](./IncidentService/Readme.md)
- [Search Service](./SearchService/Readme.md)

---

## 🆘 Troubleshooting

### Service không khởi động

```bash
# Check logs
docker-compose logs <service_name>

# Rebuild service
docker-compose build --no-cache <service_name>

# Restart
docker-compose restart <service_name>
```

### API không response

```bash
# Test connection
curl http://localhost:<PORT>/health

# Check if service is running
docker-compose ps
```

### Database connection errors

```bash
# Connect to database
docker-compose exec postgres psql -U civic_user -d civic_twin

# Check tables
\dt
```

---

## 💡 Best Practices

1. **Service Communication**: Sử dụng Kafka để async, HTTP/REST cho sync
2. **Monitoring**: Dùng Prometheus + Grafana để monitor performance
3. **Logging**: Centralize logs với ELK Stack
4. **Scaling**: Nếu cần scale, thêm replicas qua Docker Swarm hoặc Kubernetes
5. **Security**: Sử dụng API Gateway, JWT tokens, RBAC

---

## 🔄 Updates & Maintenance

- **Weekly**: Monitor logs, check for errors
- **Monthly**: Update dependencies, security patches
- **Quarterly**: Performance optimization, new features
- **As needed**: Hotfixes for critical issues

---

## 📞 Contact

- 📧 Development: [development@asean-ai.com]
- 🐛 Bug Reports: [GitHub Issues](https://github.com/asean-ai/civic-twin/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/asean-ai/civic-twin/discussions)

