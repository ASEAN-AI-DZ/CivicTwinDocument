# 🚨 Emergency Response & Notification Service

> Hệ thống cảnh báo & hướng dẫn khẩn cấp - Phản ứng kịp thời với sự cố

---

## Mục Đích

**Notification & Emergency Response Service** cung cấp:

1. **Cảnh báo Khẩn cấp**
   - Ngập úng: "⚠️ Flooding alert in District 1 - Evacuate within 1 hour"
   - Tai nạn: "🚗 Major accident on Le Loi St - Use alternative routes"
   - Ô nhiễm: "🌫️ Poor air quality (AQI 165) - Stay indoors"

2. **Hướng dẫn Tuyến đường**
   - Xác định tuyến đường nhanh nhất cho xe cứu thương
   - Khuyến nghị tuyến đường an toàn cho sơ tán
   - Thời gian tấp tểnh dự kiến

3. **Kênh Phân phối Đa dạng**
   - 📱 Push notification (app)
   - 📧 Email
   - 💬 SMS
   - 📻 Radio/Siren (qua các hệ thống khác)
   - 🌐 Web alerts

4. **Ưu tiên Đối tượng**
   - 👥 Người dân (evacuation alert)
   - 🚑 Emergency teams (route guidance)
   - 🏛️ Chính quyền (situation report)

---

## Công Nghệ

| Thành phần | Công nghệ |
|-----------|-----------|
| **Framework** | Node.js + Express.js |
| **Database** | MongoDB (notification history), PostgreSQL (user preferences) |
| **Message Queue** | Apache Kafka, RabbitMQ |
| **Push** | Firebase Cloud Messaging (FCM) |
| **Email** | SendGrid / AWS SES |
| **SMS** | Twilio, Viettel, Vinaphone |
| **Real-time** | Socket.io, WebSocket |
| **Logging** | ELK Stack (Elasticsearch, Logstash, Kibana) |

---

## Quy Trình Khẩn cấp

```
1. Incident Detected
   └─ Prediction Service cảnh báo, hoặc người dùng báo cáo

2. Emergency Response Service Triggered
   └─ Xác định loại sự cố (flooding, accident, pollution, v.v.)
   └─ Xác định vùng ảnh hưởng

3. Route Calculation (AI-powered)
   └─ Xác định tuyến đường nhanh nhất cho cứu hộ
   └─ Dự báo thời gian tấp tểnh (ETA)

4. Notification Generation
   └─ Tạo message phù hợp cho mỗi nhóm
   └─ Localize message (tiếng Việt, áng chữ Nôm, v.v.)

5. Multi-channel Distribution
   └─ Prioritize channels (push > SMS > email)
   └─ Theo dõi delivery status

6. Feedback Loop
   └─ Track user acknowledgment
   └─ Follow-up reminders nếu cần
```

---

## API Endpoints

### Phát hành Cảnh báo

```bash
# Phát hành cảnh báo toàn thành phố
POST /api/emergency/broadcast-alert
{
  "type": "flooding|accident|pollution|earthquake",
  "severity": "low|medium|high|critical",
  "affectedZones": ["zone_1", "zone_2"],
  "message": "Cảnh báo ngập úng - Hãy sơ tán ngay",
  "recommendedActions": ["evacuate", "use_alternative_routes"],
  "timeframe": "immediate|1hour|6hours"
}

Response:
{
  "alertId": "alert_...",
  "status": "broadcasting",
  "recipients": 150000,      // estimated
  "channels": {
    "push": 120000,
    "sms": 20000,
    "email": 10000
  }
}
```

### Hướng dẫn Tuyến đường Khẩn cấp

```bash
# Tìm tuyến đường nhanh nhất cho xe cứu thương
POST /api/emergency/fastest-route
{
  "vehicleType": "ambulance|fire_truck|police",
  "fromLocation": { "lat": 16.04, "lon": 108.21 },  // incident
  "toLocation": { "lat": 16.08, "lon": 108.20 },    // hospital
  "avoidAreas": ["zone_flooded_1", "zone_flooded_2"]
}

Response:
{
  "routes": [
    {
      "routeId": "route_best",
      "distance": 8.2,           // km
      "duration": 340,           // seconds
      "eta": "2026-03-31T11:15:00Z",
      "waypoints": [{lat, lon}, ...],
      "hazards": ["heavy_traffic_on_hospital_road"],
      "instructions": [
        "Turn right on Nguyen Trai",
        "Use HOV lane on bypass",
        "Turn left on Hospital Way"
      ]
    }
  ]
}
```

### Sơ Tán Hướng dẫn

```bash
# Kiến nghị tuyến đường sơ tán an toàn
POST /api/emergency/evacuation-guidance
{
  "affectedZones": ["zone_flooded"],
  "populationDensity": "high"
}

Response:
{
  "evacuationRoutes": [
    {
      "routeId": "evac_route_1",
      "capacity": 5000,          // people/hour
      "safetyLevel": "safe",
      "destination": "Higher ground in District 2",
      "distance": 3.5,
      "instructions": "..."
    }
  ],
  "shelters": [
    {
      "name": "School A",
      "location": { "lat": 16.10, "lon": 108.22 },
      "capacity": 2000,
      "current_occupancy": 500,
      "supplies": ["water", "food", "medical"]
    }
  ]
}
```

### Tùy chỉnh Thông báo

```bash
# Người dùng tùy chỉnh cảnh báo
PATCH /api/users/{userId}/notification-preferences
{
  "alertTypes": {
    "flooding": true,
    "accident": true,
    "pollution": true
  },
  "channels": {
    "push": true,
    "sms": false,
    "email": true
  },
  "quietHours": {
    "start": "22:00",
    "end": "07:00",
    "allowCriticalOnly": true
  }
}
```

---

## Message Templates

### Flooding Alert (Template)

```
Tiêu đề:
⚠️ Cảnh báo Ngập úng - {{zone_name}}

Nội dung:
Tình trạng ngập úng được dự báo sẽ xảy ra trong {{timeframe}} giờ.
Khu vực {{zone_name}} sẽ bị ảnh hưởng.

Hành động được khuyến nghị:
- {{recommended_actions}}

Tuyến đường an toàn:
{{safe_routes}}

Chi tiết: {{app_link}}
```

### Accident/Emergency (Template)

```
Tiêu đề:
🚨 Tai nạn Giao thông - {{location}}

Nội dung:
Có tai nạn giao thông tại {{location}}.
Lưu lượng giao thông tăng vọt. Vui lòng tránh khu vực này.

Tuyến đường khác:
{{alternative_routes}}

Thời gian sơ tán dự kiến: {{eta}} phút

Chi tiết: {{app_link}}
```

---

## Delivery Strategies

### Multi-channel Prioritization

```
Scenario 1: Flooding (Slow, Large area)
├─ All users in zone: PUSH (High priority)
├─ After 10 min: SMS (if no ack)
└─ After 30 min: Email

Scenario 2: Accident (Fast, Small area)
├─ Nearby drivers: PUSH + SMS (Immediate)
├─ Farther users: PUSH only
└─ Follow-up: Suggested routes every 5 min
```

### Retry Logic

```
1st attempt: Immediately
2nd attempt: +5 minutes (if no ACK)
3rd attempt: +15 minutes
4th attempt: +1 hour (last attempt)
```

---

## Performance Metrics

| Metric | Target |
|--------|--------|
| Push notification latency | < 3 seconds |
| SMS delivery time | < 30 seconds |
| Broadcast to 100k users | < 30 seconds |
| Message acknowledgment rate | > 60% |
| False alert rate | < 2% |

---

## Ví dụ Sử dụng

### Từ Prediction Service (Flooding Alert)

```typescript
const floodingAlert = await predictionService.getFloodingAlert();
if (floodingAlert.overallRisk === 'CRITICAL') {
  await notificationService.broadcastAlert({
    type: 'flooding',
    severity: 'critical',
    affectedZones: floodingAlert.affectedZones.map(z => z.zoneId),
    message: `Cảnh báo ngập úng khẩn cấp tại ${affectedZones.join(', ')}`,
    timeframe: 'immediate'
  });
}
```

### Từ Incident Service (Emergency Response)

```typescript
const incident = await incidentService.getIncidentDetails(incidentId);
const routes = await notificationService.getEmergencyRoutes({
  vehicleType: 'ambulance',
  fromLocation: incident.location,
  toLocation: nearestHospital.location
});

await notificationService.sendDirectAlert({
  recipientType: 'emergency_teams',
  message: `Tai nạn tại ${incident.location}`,
  routes: routes,
  priority: 'critical'
});
```

---

## Deployment

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
RUN npm install -g pm2
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3005
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
```

### Env Variables

```env
MONGODB_URL=mongodb://mongo:27017/notifications
KAFKA_BROKERS=kafka:9092
FCM_API_KEY=...
SENDGRID_API_KEY=...
TWILIO_AUTH_TOKEN=...
```

---

## Liên quan

- [Prediction Service](../AIMLService/) – Phát hiện sự cố
- [Digital Twin Service](../DigitalTwinService/) – Dữ liệu vùng ảnh hưởng
- [Incident Service](../IncidentService/) – Quản lý chi tiết sự cố
- [Dashboard Service](../DashboardService/) – Hiển thị status


  - Preview template

- **Cấu hình SMTP**

  - Cấu hình linh hoạt
  - Hỗ trợ nhiều SMTP server
  - TLS/SSL encryption
  - Authentication

- **Quản lý hàng đợi email**
  - Queue với Redis
  - Batch sending
  - Rate limiting
  - Theo dõi trạng thái gửi

### 📨 Thông báo SMS

- **Tích hợp nhà cung cấp**

  - Twilio integration
  - VNPT SMS gateway
  - Hỗ trợ nhiều provider
  - Fallback provider

- **Template SMS**

  - Template có biến động
  - Giới hạn ký tự
  - Unicode support
  - Shortlink tự động

- **Theo dõi gửi tin**
  - Trạng thái gửi (sent, delivered, failed)
  - Delivery report
  - Cost tracking
  - Analytics

### 🔔 Thông báo trong ứng dụng

- **Thông báo thời gian thực**

  - WebSocket connection
  - Real-time updates
  - Instant delivery
  - Offline queueing

- **Trạng thái đã đọc/chưa đọc**

  - Đánh dấu đã đọc
  - Đọc tất cả
  - Xóa thông báo
  - Lưu trữ lịch sử

- **Lịch sử thông báo**

  - Xem lại thông báo cũ
  - Tìm kiếm thông báo
  - Lọc theo loại
  - Phân trang

- **Đếm số badge**
  - Số thông báo chưa đọc
  - Cập nhật real-time
  - Reset khi đọc
  - Hiển thị trên icon app

### ⚙️ Tùy chọn người dùng

- **Bật/tắt các kênh**

  - Tắt push notification
  - Tắt email
  - Tắt SMS
  - Chỉ nhận thông báo quan trọng

- **Danh mục thông báo**

  - Phản ánh mới
  - Cập nhật trạng thái
  - Bình luận mới
  - Điểm thưởng
  - Cảnh báo khẩn cấp

- **Giờ yên tĩnh**

  - Không gửi thông báo trong khoảng thời gian
  - Cấu hình theo múi giờ
  - Ngoại trừ thông báo khẩn cấp
  - Lên lịch tự động

- **Tùy chọn ngôn ngữ**
  - Tiếng Việt
  - English
  - Template đa ngôn ngữ
  - Auto-detect

---

## 📬 Loại thông báo

| Loại               | Kênh             | Ưu tiên    | Mô tả                                  |
| ------------------ | ---------------- | ---------- | -------------------------------------- |
| 🚨 **Khẩn cấp**    | Push, SMS, Email | Cao        | Cảnh báo nguy hiểm, sự cố nghiêm trọng |
| 📢 **Cảnh báo**    | Push, Email      | Trung bình | Cập nhật quan trọng                    |
| ℹ️ **Thông tin**   | Push, In-app     | Thấp       | Thông tin chung                        |
| 💬 **Tương tác**   | Push, In-app     | Trung bình | Bình luận, phản hồi                    |
| 🏆 **Điểm thưởng** | Push, In-app     | Thấp       | CityPoint earned/redeemed              |
| 📊 **Báo cáo**     | Email            | Thấp       | Báo cáo định kỳ                        |

---




## 🔗 Tích hợp

Dịch vụ này tích hợp với:

- **CoreAPI**: Gửi thông báo qua API chính
- **RabbitMQ**: Lắng nghe sự kiện từ các dịch vụ khác
- **IncidentService**: Thông báo về sự cố
- **FloodEyeService**: Cảnh báo ngập lụt
- **IoTService**: Cảnh báo từ cảm biến
- **MediaService**: Đính kèm media trong thông báo

---

## 📄 Giấy phép

Dự án này được phân phối dưới [GNU General Public License v3.0](https://github.com/MNM-DTU-DZ/CityResQ360-DTUDZ/blob/master/LICENSE).
