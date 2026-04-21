# 🤖 AI Prediction Service

> AI prediction technology — Traffic flow forecasting, flood warnings, cascade effects

---

## Purpose

**AI Prediction Service** provides intelligent forecasts for CivicTwin AI:

1. **🚗 Traffic Flow Prediction**
   - Forecast 15–60 minutes ahead
   - Identify forming hotspots
   - Suggest traffic signal adjustments

2. **💧 Flood Warning**
   - Combines weather data + water level sensors
   - Early warning 2–6 hours in advance
   - Evacuation recommendations, safe routing

3. **📊 Cascade Effects**
   - Simulate how an incident propagates through the system
   - Forecast which areas will be affected

4. **💰 Socioeconomic Impact**
   - Forecast GDP, employment, social equity
   - Used for scenario simulation

---

## Technology Stack

| Component | Technology |
|-----------|-----------|
| **AI Core** | Amazon Bedrock + Amazon Nova |
| **Time Series** | TensorFlow/PyTorch (LSTM, Transformer) |
| **Framework** | Python FastAPI |
| **ML Ops** | Kubernetes, MLflow |
| **Monitoring** | Prometheus + Grafana |

---

## Prediction Models

### 1. Traffic Flow Prediction (LSTM)

**Input:**
- Traffic history (past 7 days, hourly)
- Current state (from Digital Twin)
- Events (accidents, road works, etc.)
- Calendar features (day of week, holidays)

**Output:**
- Traffic flow forecast (15, 30, 60 minutes ahead)
- Confidence score (0–100%)

**Accuracy:** RMSE < 15% (with sufficient data)

### 2. Flooding Risk (Hybrid)

**Input:**
- Weather data (from OpenWeatherMap API)
- Water level sensors (real-time from IoT)
- Rainfall history (past 3 months)
- Geographic characteristics (elevation, gradient)

**Output:**
- Risk level: NONE, LOW, MEDIUM, HIGH, CRITICAL
- Affected zones (list of zone IDs)
- Recommended actions (evacuate, close roads, ...)

**Accuracy:** Precision > 85% (detecting true flooding)

### 3. Cascade Effects (Agent-Based)

**Input:**
- Initial incident (location, type)
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
      "gdp_change": 2.5,
      "employment": 1200,
      "business_hours_saved": 45000
    },
    "social": {
      "accessibility": 35,
      "equity_score": 0.65,
      "job_creation": "medium"
    },
    "environmental": {
      "co2_reduction": 12.5,
      "air_quality": 18
    }
  }
  ```

---

## API Endpoints

### Traffic Prediction

```bash
POST /api/predictions/traffic/{roadId}
{
  "horizonMinutes": 60
}

Response:
{
  "roadId": "...",
  "predictions": [
    { "timestamp": "2026-03-31T11:00:00Z", "flow": 1200, "confidence": 92 },
    { "timestamp": "2026-03-31T11:15:00Z", "flow": 1350, "confidence": 89 }
  ],
  "alert": "System overload expected at 11:00, recommend signal optimization"
}
```

### Flooding Alert

```bash
GET /api/predictions/flooding/city

Response:
{
  "overallRisk": "MEDIUM",
  "affectedZones": [
    {
      "zoneId": "...",
      "riskLevel": "HIGH",
      "affectedArea": 1250,
      "recommendedActions": ["evacuate", "close_roads_3_4"],
      "timeToFlooding": 180
    }
  ],
  "weatherForecast": {
    "rainfall": 120,
    "intensity": "heavy",
    "duration": 240
  }
}
```

### Cascade Effects

```bash
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
POST /api/predictions/impact
{
  "scenarioId": "...",
  "timeframe": 10
}

Response:
{
  "economic": { "gdp_change": 2.5 },
  "social": { "accessibility": 35 },
  "environmental": { "co2_reduction": 12.5 },
  "explanation": "This project improves healthcare accessibility by 35% because... [AI generated]"
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

## Usage Examples

### From Dashboard Service

```typescript
// Get traffic forecast to display warnings
const predictions = await predictionService.getTrafficPrediction(roadId);
if (predictions.alert) {
  displayWarning(predictions.alert);
}
```

### From Notification Service

```typescript
// Send flood warnings to citizens
const flooding = await predictionService.getFloodingAlert();
if (flooding.overallRisk === 'CRITICAL') {
  notificationService.broadcastAlert({
    title: "Emergency Flood Warning",
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

### Environment Variables

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

## Related Services

- [Digital Twin Service](../DigitalTwinService/) – Data source
- [Simulation Service](../AnalyticsService/) – Uses forecasts for simulation
- [Notification Service](../NotificationService/) – Distributes alerts
