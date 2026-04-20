# 🌍 Digital Twin Service

> Cốt lõi của CivicTwin AI - Mô hình hóa đô thị theo thời gian thực

---

## Mục Đích

**Digital Twin Service** là tim "trái tim" của CivicTwin AI. Nó:

1. **Xây dựng Mô hình Đô thị** - Đồ thị mạng (graph network) biểu diễn:
   - 🛣️ Đường sá, giao lộ, khu vực
   - 🏢 Công trình (bệnh viện, trường, chợ, v.v.)
   - 📡 Cảm biến IoT, camera
   - 👥 Dân số, di chuyển

2. **Cập nhật Thời gian Thực** từ:
   - 📷 Camera giao thông
   - 🌡️ Cảm biến IoT (nước, nhiệt độ, ô nhiễm)
   - 🌤️ Dữ liệu thời tiết
   - 🚗 Lưu lượng giao thông
   - 📱 Báo cáo người dân

3. **Cung cấp API** để các dịch vụ khác:
   - Truy vấn trạng thái hiện tại
   - Lịch sử dữ liệu
   - Thuộc tính địa lý (PostGIS)

---

## Công Nghệ

| Thành phần | Công nghệ |
|-----------|-----------|
| **Language** | Node.js + TypeScript |
| **Framework** | Express.js + Socket.io |
| **Database** | PostgreSQL + PostGIS |
| **Cache** | Redis |
| **Message** | Apache Kafka |
| **Visualization** | GeoJSON + Leaflet |

---

## Cấu Trúc Dữ Liệu

### Zones (Khu Vực)
```typescript
{
  id: UUID,
  name: "Hải Châu District",
  geometry: Polygon,        // PostGIS geometry
  population: 150000,
  status: "normal|congested|flooded",
  state: {
    congestionLevel: 0-100,
    floodingLevel: 0-100,
    pm25: 45.2,
    temperature: 28.5
  }
}
```

### Roads & Intersections (Đường & Giao lộ)
```typescript
{
  id: UUID,
  name: "Lê Lợi Street",
  geometry: LineString,     // PostGIS geometry
  lanes: 4,
  speedLimit: 60,           // km/h
  traffic: {
    flow: 1200,             // vehicles/hour
    avgSpeed: 18,           // km/h
    occupancy: 65           // %
  }
}
```

### Infrastructure (Công trình)
```typescript
{
  id: UUID,
  name: "Hospital A",
  type: "hospital|school|market|etc",
  location: Point,          // PostGIS geometry
  capacity: 500,
  status: "operational|closed|limited"
}
```

---

## API Endpoints

### Khởi tạo

```bash
# Kiểm tra trạng thái service
GET /api/digital-twin/health
```

### Real-time State

```bash
# Trạng thái hiện tại của một khu vực
GET /api/digital-twin/zones/:zoneId

# Tất cả khu vực
GET /api/digital-twin/zones?limit=100

# Trạng thái đường sá
GET /api/digital-twin/roads/:roadId

# Tất cả công trình trong vùng
GET /api/digital-twin/infrastructure?type=hospital&zoneId=...
```

### Cập nhật Dữ liệu

```bash
# Cập nhật trạng thái khu vực (từ Kafka events)
POST /api/digital-twin/zones/:zoneId/update
{
  "congestionLevel": 85,
  "floodingLevel": 0,
  "pm25": 45.2
}

# Cập nhật lưu lượng giao thông
POST /api/digital-twin/roads/:roadId/traffic
{
  "flow": 1200,
  "avgSpeed": 18,
  "occupancy": 65
}
```

### Lịch sử & Tiêu vấn

```bash
# Lấy lịch sử (timeseries) cho một khu vực
GET /api/digital-twin/zones/:zoneId/history?from=2026-03-01&to=2026-03-31

# Tìm kiếm công trình gần vị trí
GET /api/digital-twin/spatial-query?lat=16.0544&lon=108.2022&radius=500&type=hospital
```

---

## Dự Liệu Địa Lý (PostGIS)

Tất cả dữ liệu địa lý được lưu trong PostgreSQL với extension PostGIS:

```sql
-- Ví dụ: Tìm tất cả bệnh viện gần điểm tai nạn
SELECT * FROM infrastructure 
WHERE type = 'hospital' 
  AND ST_Distance(location, ST_GeomFromText('POINT(16.0544 108.2022)', 4326)) < 500;

-- Tính diện tích ngập lụt
SELECT ST_Area(geometry) as flooded_area FROM zones 
WHERE status = 'flooded';
```

---

## Ví dụ Sử dụng

### Từ Prediction Service (để dự báo)

```typescript
// Lấy dữ liệu hiện tại + lịch sử cho mô hình dự báo
const currentState = await dtService.getZoneState(zoneId);
const history = await dtService.getHistory(zoneId, { days: 7 });

// Dùng để train LSTM model
const predictions = await aiService.predict(currentState, history);
```

### Từ Dashboard Service (để hiển thị)

```typescript
// Get all zones for map
const zones = await dtService.getAllZones();

// Render bản đồ với Leaflet
zones.forEach(zone => {
  addPolygonToMap(zone.geometry, zone.status);
});
```

---

## Deployment

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

### Env Variables

```env
DATABASE_URL=postgresql://user:pass@postgres:5432/civic_twin
POSTGIS_URL=postgresql://user:pass@postgres:5432/civic_twin
REDIS_URL=redis://redis:6379
KAFKA_BROKER=kafka:9092
PORT=3001
```

---

## Monitoring

- **Performance**: Monitor PostGIS query times (target < 100ms)
- **Memory**: Redis cache hit ratio (target > 80%)
- **Events**: Kafka lag (target < 5 seconds)

---

## Liên quan

- [Prediction Service](../AIMLService/) – Dự báo dựa trên dữ liệu DT
- [Simulation Service](../AnalyticsService/) – Mô phỏng kịch bản
- [Dashboard Service](/Services/) – Hiển thị DT trên bản đồ
