# 🤖 AI Prediction Service

> Công nghệ AI dự báo - Dự báo lưu lượng giao thông, cảnh báo ngập úng, tác động dây chuyền

---

## Mục Đích

**AI Prediction Service** cung cấp các dự báo thông minh cho CivicTwin AI:

1. **🚗 Dự báo Lưu lượng Giao thông**
   - Dự báo 15–60 phút trước
   - Xác định các điểm nóng sắp hình thành
   - Gợi ý thay đổi tín hiệu giao thông

2. **💧 Cảnh báo Ngập úng**
   - Kết hợp dữ liệu thời tiết + cảm biến mực nước
   - Cảnh báo sớm 2–6 giờ trước
   - Khuyến nghị sơ tán, tuyến đường an toàn

3. **📊 Tác động Dây chuyền (Cascade Effects)**
   - Mô phỏng cách một sự cố lan truyền qua hệ thống
   - Dự báo khu vực sẽ ảnh hưởng

4. **💰 Tác động Kinh tế-Xã hội**
   - Dự báo GDP, việc làm, bình đẳng xã hội
   - Phục vụ cho scenario simulation

---

## Công Nghệ

| Thành phần | Công nghệ |
|-----------|-----------|
| **AI Core** | Amazon Bedrock + Amazon Nova |
| **Time Series** | TensorFlow/PyTorch (LSTM, Transformer) |
| **Framework** | Python FastAPI |
| **ML Ops** | Kubernetes, MLflow |
| **Monitoring** | Prometheus + Grafana |

---

## Các Mô hình Dự báo

### 1. Traffic Flow Prediction (LSTM)

**Input:**
- Lịch sử lưu lượng (7 ngày qua, hourly)
- Current state (từ Digital Twin)
- Events (sự kiện: tai nạn, sửa đường, v.v.)
- Calendar features (ngày hôm nay, thứ, lễ tế)

**Output:**
- Dự báo lưu lượng (15, 30, 60 phút tới)
- Confidence score (0-100%)

**Độ chính xác:** RMSE < 15% (với dữ liệu đủ)

### 2. Flooding Risk (Hybrid)

**Input:**
- Dữ liệu thời tiết (from OpenWeatherMap API)
- Cảm biến mực nước (real-time từ IoT)
- Lịch sử mưa (3 tháng qua)
- Đặc điểm địa lý (độ cao, gradient)

**Output:**
- Risk level: NONE, LOW, MEDIUM, HIGH, CRITICAL
- Affected zones (list of zone IDs)
- Recommended actions (evacuate, close roads,...)

**Độ chính xác:** Precision > 85% (phát hiện true flooding)

### 3. Cascade Effects (Agent-Based)

**Input:**
- Initial incident (vị trí, loại)
- Current city state
- Network topology (graph)

**Output:**
- Predicted impact zones
- Timeline of effects
- Severity estimation

### 4. Socioeconomic Impact (Nova LLM)

**Input:**
- Scenario description (text)
- Context (city data, demographics)

**Output:**
- Impact assessment (structured JSON):
  ```json
  {
    "economic": {
      "gdp_change": 2.5,        // percent
      "employment": 1200,       // jobs
      "business_hours_saved": 45000
    },
    "social": {
      "accessibility": 35,      // % improvement
      "equity_score": 0.65,
      "job_creation": "medium"
    },
    "environmental": {
      "co2_reduction": 12.5,    // tons/year
      "air_quality": 18         // AQI improvement
    }
  }
  ```

---

## API Endpoints

### Traffic Prediction

```bash
# Dự báo lưu lượng cho một đường sá
POST /api/predictions/traffic/{roadId}
{
  "horizonMinutes": 60
}

Response:
{
  "roadId": "...",
  "predictions": [
    { "timestamp": "2026-03-31T11:00:00Z", "flow": 1200, "confidence": 92 },
    { "timestamp": "2026-03-31T11:15:00Z", "flow": 1350, "confidence": 89 },
    ...
  ],
  "alert": "System overload expected at 11:00, recommend signal optimization"
}
```

### Flooding Alert

```bash
# Cảnh báo ngập úng cho thành phố
GET /api/predictions/flooding/city

Response:
{
  "overallRisk": "MEDIUM",
  "affectedZones": [
    {
      "zoneId": "...",
      "riskLevel": "HIGH",
      "affectedArea": 1250,    // m²
      "recommendedActions": ["evacuate", "close_roads_3_4"],
      "timeToFlooding": 180    // minutes
    }
  ],
  "weatherForecast": {
    "rainfall": 120,           // mm expected
    "intensity": "heavy",
    "duration": 240            // minutes
  }
}
```

### Cascade Effects

```bash
# Dự báo tác động dây chuyền của một tai nạn
POST /api/predictions/cascade
{
  "incidentType": "traffic_accident",
  "location": { "lat": 16.0544, "lon": 108.2022 },
  "severity": "severe"
}

Response:
{
  "primaryImpactZones": [...],
  "secondaryImpactZones": [...],
  "timeline": {
    "5mins": "Traffic congestion at direct roads",
    "15mins": "Spread to neighboring intersections",
    "30mins": "Alternative routes overwhelmed"
  }
}
```

### Socioeconomic Impact

```bash
# Đánh giá tác động của một scenario
POST /api/predictions/impact
{
  "scenarioId": "...",
  "timeframe": 10  // years
}

Response:
{
  "economic": { "gdp_change": 2.5, ... },
  "social": { "accessibility": 35, ... },
  "environmental": { "co2_reduction": 12.5, ... },
  "explanation": "Dự án này cải thiện tiếp cận y tế 35% vì... [AI generated]"
}
```

---

## Training & Optimization

### Data Pipeline

```
Raw Data (IoT, APIs)
    ↓
Data Validation & Cleaning
    ↓
Feature Engineering
    ↓
Train/Test Split (80/20)
    ↓
Model Training (LSTM, etc.)
    ↓
Model Validation & Evaluation
    ↓
Hyperparameter Tuning
    ↓
Production Deployment
```

### Retraining Schedule

- **Traffic Model**: Daily (12 AM UTC)
- **Flooding Model**: When rainfall > threshold
- **Cascade Model**: Weekly (Sundays 2 AM)

---

## Ví dụ Sử dụng

### Từ Dashboard Service

```typescript
// Lấy dự báo giao thông để hiển thị cảnh báo
const predictions = await predictionService.getTrafficPrediction(roadId);
if (predictions.alert) {
  displayWarning(predictions.alert);  // "System overload expected at 11:00"
}
```

### Từ Notification Service

```typescript
// Gửi cảnh báo ngập úng cho công dân
const flooding = await predictionService.getFloodingAlert();
if (flooding.overallRisk === 'CRITICAL') {
  notificationService.broadcastAlert({
    title: "Cảnh báo Ngập úng Khẩn cấp",
    zones: flooding.affectedZones,
    actions: ["Evacuate", "Avoid these roads"]
  });
}
```

---

## Deployment

### Docker

```dockerfile
FROM python:3.11-slim
WORKDIR /app
RUN pip install fastapi uvicorn tensorflow torch
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8002
CMD ["uvicorn", "main:app", "--host", "0.0.0.0"]
```

### Env Variables

```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
DIGITAL_TWIN_API=http://digital-twin:3001
KAFKA_BROKER=kafka:9092
MODEL_PATH=/models
```

---

## Performance Targets

| Metric | Target |
|--------|--------|
| Traffic prediction RMSE | < 15% |
| Flooding alert precision | > 85% |
| Cascade prediction latency | < 30 seconds |
| API response time | < 500ms |
| Model inference time | < 1 second |

---

## Liên quan

- [Digital Twin Service](../DigitalTwinService/) – Nguồn dữ liệu
- [Simulation Service](../AnalyticsService/) – Sử dụng dự báo để mô phỏng
- [Notification Service](../NotificationService/) – Phân phối cảnh báo


