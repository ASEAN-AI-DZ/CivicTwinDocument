# 🎯 Simulation & What-If Service

> Công cụ mô phỏng kịch bản - Thử nghiệm các quyết định trong môi trường ảo

---

## Mục Đích

**Simulation Service** cho phép người dùng thử nghiệm hàng trăm kịch bản khác nhau trước khi triển khai thực tế:

1. **Mô phỏng Kịch bản** (What-If)
   - Xây con đường mới
   - Thay đổi tín hiệu giao thông
   - Xây khu dân cư, bệnh viện, trường học
   - Thay đổi chính sách giao thông

2. **Dự báo Tác động** (5–10 năm)
   - 📊 Kinh tế: GDP, việc làm, doanh thu
   - 🌍 Môi trường: CO₂, ô nhiễm, ngập úng
   - 👥 Xã hội: Tiếp cận y tế, giáo dục, bình đẳng
   - 🚗 Giao thông: Ùn tắc, thời gian di chuyển

3. **So sánh Kịch bản** (A/B Testing)
   - So sánh 2–10 kịch bản
   - Xem impact score tương đối
   - Chọn giải pháp tối ưu

---

## Công Nghệ

| Thành phần | Công nghệ |
|-----------|-----------|
| **Simulation Core** | Python (Mesa, AnyLogic DSL) |
| **API Framework** | FastAPI |
| **Parallel Computing** | Ray, Dask |
| **Database** | PostgreSQL (kết quả), MongoDB (metadata) |
| **Visualization** | GeoJSON, D3.js |
| **AI Integration** | Amazon Nova (impact prediction) |

---

## Quy Trình Mô Phỏng

```
1. User tạo Scenario
   └─ Drag & drop infrastructure trên bản đồ
   └─ Chỉ định tham số (ngân sách, timeline, v.v.)

2. Clone Digital Twin State
   └─ Tạo bản sao của trạng thái hiện tại

3. Apply Changes
   └─ Thêm/xóa/sửa infrastructure
   └─ Update network topology

4. Run Agent-Based Model
   └─ Simulate con người di chuyển
   └─ Simulate kinh doanh (thương mại)
   └─ Simulate tác động môi trường

5. Predict Impact (với AI)
   └─ Call Amazon Nova với scenario description
   └─ Nhận structured output (economic, social, environmental)

6. Generate Report
   └─ Impact Score (0–100)
   └─ Radar Chart (5 chỉ số)
   └─ Timeline effects
   └─ Explanation (AI generated)

7. Save & Share
   └─ Lưu scenario vào database
   └─ Chia sẻ với stakeholders
   └─ Export PDF report
```

---

## API Endpoints

### Tạo & Quản lý Scenario

```bash
# Tạo scenario mới
POST /api/scenarios
{
  "name": "Mở Đường Nguyễn Hữu Cảnh",
  "description": "Kết nối Hải Châu với Sơn Trà",
  "timeframe": 10  // years
}

# Lấy chi tiết scenario
GET /api/scenarios/{scenarioId}

# Danh sách scenario
GET /api/scenarios?limit=20&userId=...

# Cập nhật scenario
PATCH /api/scenarios/{scenarioId}
{
  "name": "...",
  "infrastructure": [...]
}

# Xóa scenario
DELETE /api/scenarios/{scenarioId}
```

### Chạy Mô phỏng

```bash
# Chạy mô phỏng
POST /api/scenarios/{scenarioId}/simulate
{
  "compute_resources": {
    "parallel_instances": 5,
    "timeout_minutes": 30
  }
}

Response:
{
  "simulationId": "sim_...",
  "status": "running|completed|failed",
  "progress": 45,  // percent
  "eta": 600      // seconds
}

# Kiểm tra tiến độ
GET /api/simulations/{simulationId}/progress

# Lấy kết quả
GET /api/simulations/{simulationId}/results

Response:
{
  "scenarioId": "...",
  "simulationId": "...",
  "status": "completed",
  "results": {
    "impact_score": 78,
    "economic": {
      "gdp_change": 2.5,         // percent
      "employment": 1200,        // jobs
      "business_revenue": 45000000  // VND
    },
    "social": {
      "accessibility": 35,       // % improvement
      "equity_score": 0.68,
      "education_access": 28
    },
    "environmental": {
      "co2_reduction": 12.5,     // tons/year
      "air_quality": 18,         // AQI improvement
      "flooding_risk": -5        // % reduction
    },
    "transportation": {
      "congestion_reduction": 22,  // %
      "avg_travel_time": -180,     // seconds
      "accident_reduction": 8       // %
    },
    "explanation": "Dự án này cải thiện tiếp cận... [AI generated text]"
  }
}
```

### So Sánh Scenario

```bash
# So sánh 2–10 kịch bản
POST /api/simulations/compare
{
  "scenarioIds": ["scenario_A", "scenario_B", "scenario_C"]
}

Response:
{
  "comparison": [
    {
      "scenarioId": "scenario_A",
      "name": "Mở đường Nguyễn Hữu Cảnh",
      "impact_score": 78,
      "metrics": { ... }
    },
    {
      "scenarioId": "scenario_B",
      "name": "Mở đường Lê Lợi (alternative)",
      "impact_score": 62,
      "metrics": { ... }
    }
  ],
  "recommendation": "scenario_A is better due to lower environmental impact"
}
```

---

## Data Model Mô Phỏng

### Scenario

```typescript
{
  id: UUID,
  userId: UUID,
  name: string,
  description: string,
  baselineState: DigitalTwinState,      // trạng thái hiện tại
  changes: [
    {
      type: "new_road|new_building|signal_change|policy",
      location: Point,                  // PostGIS
      parameters: { ... }
    }
  ],
  timeframe: 10,                        // years
  budget: 500000000000,                 // VND
  status: "draft|simulating|completed|failed",
  created_at: datetime,
  updated_at: datetime
}
```

### Simulation Result

```typescript
{
  id: UUID,
  scenarioId: UUID,
  status: "running|completed|failed",
  results: {
    impact_score: 78,
    economic: { gdp_change, employment, ... },
    social: { accessibility, equity_score, ... },
    environmental: { co2_reduction, air_quality, ... },
    transportation: { congestion_reduction, ... },
    explanation: string
  },
  executed_at: datetime,
  duration_seconds: 1234
}
```

---

## Lưu ý Kỹ thuật

### Agent-Based Model (ABM)

Mô phỏng hành vi của:
- 👥 Người từ nhà đi làm → chợ → nhà (morning rush, evening rush)
- 🏢 Doanh nghiệp (tác động kinh tế địa phương)
- 🚗 Vận tải (logistics, di chuyển toàn thành phố)

### Tính Bản chất:
- Stochastic (có ngẫu nhiên)
- Multi-period (5–10 năm, monthly/quarterly steps)
- Multi-objective (economic, social, environmental)

### Computational Complexity
- Single scenario: ~5–10 phút trên 1 core
- Parallel simulation (5 cores): ~2 phút
- Batch comparison (10 scenarios): ~20–30 phút

---

## Ví dụ Sử dụng

### Từ Frontend (User)

```typescript
// User tạo scenario
const scenario = await simulationService.createScenario({
  name: "New Hospital in District 4",
  infrastructure: [{
    type: "hospital",
    location: { lat: 16.10, lon: 108.18 },
    capacity: 500
  }]
});

// Run simulation
const sim = await simulationService.simulate(scenario.id);

// Poll results
const result = await simulationService.getResult(sim.simulationId);
```

### Từ Dashboard

```typescript
// Hiển thị Impact Score
dashboard.displayImpactScore(result.impact_score);

// Vẽ Radar Chart
radarChart.render({
  economic: result.economic.gdp_change,
  social: result.social.equity_score,
  environmental: result.environmental.co2_reduction,
  transportation: result.transportation.congestion_reduction,
  safety: result.safety.accident_reduction
});

// Hiển thị giải thích AI
dashboard.displayExplanation(result.explanation);
```

---

## Deployment

### Docker

```dockerfile
FROM python:3.11
WORKDIR /app
RUN pip install fastapi uvicorn ray mesa
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8003
CMD ["python", "-m", "ray.serve.deployment start", "main:app"]
```

### Scaling (Ray Cluster)

```yaml
ray_cluster:
  version: "1.0"
  cluster_name: civic-sim
  max_workers: 10
  worker_node_type: gpu_worker  # optional: for faster simulations
```

---

## Performance Targets

| Metric | Target |
|--------|--------|
| Single scenario latency | < 10 min |
| Parallel 5 scenarios | < 3 min |
| Impact predictions | < 1 sec |
| API response time | < 500 ms |

---

## Liên quan

- [Digital Twin Service](../DigitalTwinService/) – Baseline state
- [Prediction Service](../AIMLService/) – Impact predictions
- [Dashboard Service](/Services/) – Visualization
- [Notification Service](../NotificationService/) – Alerts



  - Daily summary
  - Weekly digest
  - Monthly report
  - Quarterly review
  - Annual report

- **Phạm vi ngày tùy chỉnh**

  - Custom date range
  - Comparison periods
  - Year-over-year
  - Month-over-month
  - Week-over-week

- **Xuất ra PDF/Excel**

  - PDF reports với charts
  - Excel spreadsheets
  - CSV exports
  - JSON data dumps
  - Scheduled exports

- **Lập lịch tự động**
  - Scheduled reports
  - Email delivery
  - Auto-generation
  - Recurring schedules
  - Cron-based triggers

### 🔍 Tổng hợp dữ liệu

- **Phân tích đa chiều**

  - Multi-dimensional analysis
  - Drill-down capabilities
  - Slice and dice
  - Pivot tables
  - OLAP cubes

- **Tổng hợp chuỗi thời gian**

  - Time-series aggregation
  - Rolling windows
  - Moving averages
  - Cumulative sums
  - Rate of change

- **Phân tích nhóm**

  - Group by category
  - Group by location
  - Group by agency
  - Group by status
  - Custom grouping

- **Phân tích phễu**
  - Conversion funnel
  - Drop-off analysis
  - Stage-by-stage metrics
  - Bottleneck identification
  - Optimization insights

### 🎯 Trí tuệ kinh doanh

- **Phân tích dự đoán**

  - Predictive models
  - Machine learning integration
  - Trend forecasting
  - Risk prediction
  - Resource planning

- **Phát hiện bất thường**

  - Anomaly detection
  - Outlier identification
  - Unusual patterns
  - Alert triggers
  - Root cause analysis

- **Nhận dạng mẫu**

  - Pattern recognition
  - Clustering analysis
  - Association rules
  - Sequence mining
  - Behavioral patterns

- **Dự báo**
  - Time-series forecasting
  - Demand prediction
  - Capacity planning
  - Budget forecasting
  - Scenario analysis

---

## 📊 Loại báo cáo

### Báo cáo vận hành

- Tổng quan hoạt động hệ thống
- Số lượng phản ánh theo loại
- Thời gian xử lý trung bình
- Tỷ lệ hoàn thành đúng hạn
- Top issues và hotspots

### Báo cáo hiệu suất cơ quan

- Số lượng sự cố được gán
- Thời gian phản hồi
- Thời gian giải quyết
- Tỷ lệ hoàn thành
- Đánh giá từ người dân

### Báo cáo người dùng

- Số lượng người dùng mới
- Người dùng hoạt động
- Engagement metrics
- CityPoint earned/redeemed
- User satisfaction

### Báo cáo địa lý

- Phản ánh theo khu vực
- Bản đồ nhiệt
- Hotspot analysis
- Coverage analysis
- Regional comparison

---

## 🔗 Tích hợp

Dịch vụ này tích hợp với:

- **ClickHouse**: Lưu trữ dữ liệu phân tích
- **AnalyticsConsumer**: Nhận sự kiện từ RabbitMQ
- **CoreAPI**: Cung cấp dữ liệu cho dashboard
- **IncidentService**: Phân tích dữ liệu sự cố
- **IoTService**: Phân tích dữ liệu cảm biến
- **NotificationService**: Gửi báo cáo định kỳ

---

## 📊 Cấu trúc dữ liệu ClickHouse

### Bảng Events

```sql
CREATE TABLE events (
    event_id UUID,
    event_type String,
    timestamp DateTime,
    user_id UInt64,
    entity_id UInt64,
    entity_type String,
    metadata String,
    created_at DateTime DEFAULT now()
) ENGINE = MergeTree()
ORDER BY (timestamp, event_type);
```

### Tổng hợp báo cáo

```sql
CREATE MATERIALIZED VIEW reports_daily AS
SELECT
    toDate(created_at) as date,
    category,
    status,
    count() as total_reports,
    avg(resolution_time) as avg_resolution_time
FROM reports
GROUP BY date, category, status;
```

---

## 📄 Giấy phép

Dự án này được phân phối dưới [GNU General Public License v3.0](https://github.com/MNM-DTU-DZ/CityResQ360-DTUDZ/blob/master/LICENSE).
