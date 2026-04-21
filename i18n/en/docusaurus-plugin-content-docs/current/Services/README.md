# 🏗️ CivicTwin AI Microservices

> All modular services that make up the CivicTwin AI platform

---

## 📊 Overall Architecture

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
    │Digital │  │Prediction│  │Simulation│
    │ Twin   │  │ & Alert  │  │ What-If  │
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

## 🔑 Core Services

### 1. **Digital Twin Service** ⭐

**Purpose**: Real-time city modeling

- 🌍 Build a city network graph
- 📍 Integrate geospatial data (PostGIS) for roads, intersections, and infrastructure
- ⏱️ Continuous updates from sensors, cameras, IoT
- 💾 Store state + history

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

**Purpose**: Forecast & alert on incidents

- 🚗 **Traffic Prediction**: Traffic flow forecasting (15–60 minutes ahead)
- 💧 **Flooding Alert**: Flood warnings based on weather + sensors
- 📊 **Cascade Effects**: Simulate cascade impacts
- 💰 **Socioeconomic Impact**: Predict economic-social impacts (with Amazon Nova)

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

**Purpose**: Test scenarios before real-world deployment

- 🏗️ Drag-and-drop infrastructure (roads, hospitals, schools, etc.)
- 🔄 Run agent-based simulation (5–10 years)
- 📈 Predict impacts: economic, environmental, social, traffic
- 📊 A/B testing scenario comparison
- 📄 Generate detailed reports with Impact Score & Radar Chart

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

**Purpose**: Emergency alerts & evacuation guidance

- 🚑 **Fastest Route For Emergency**: Coordinate routes for ambulances
- 🗺️ **Evacuation Guidance**: Recommend safe evacuation routes
- 📱 **Multi-channel Alerts**: Push, SMS, Email, Web
- 📊 **Cascade Broadcasting**: City-wide alert broadcasting
- 📍 **Geolocation-based**: Only alert citizens in affected zones

**Technologies**: Node.js, Express, MongoDB, Firebase FCM, Kafka  
**API Port**: 3005  
**Documentation**: [NotificationService/Readme.md](./NotificationService/Readme.md)

```bash
# Broadcast flooding alert
curl -X POST http://localhost:3005/api/emergency/broadcast-alert \
  -H "Content-Type: application/json" \
  -d '{
    "type": "flooding",
    "severity": "critical",
    "affectedZones": ["zone_1", "zone_2"],
    "message": "Flood Warning"
  }'

# Find emergency route
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

**Purpose**: Receive data from sensors, cameras, and weather APIs

- 📷 Traffic cameras (RTMP stream)
- 🌡️ IoT sensors (water level, temperature, pollution)
- 🌤️ Weather data (OpenWeatherMap, NOAA API)
- 🚗 Traffic flow (Grab, HERE Maps, etc.)
- 📱 Reports from app (citizen reports)

**Technologies**: Node.js, MQTT Broker, Kafka Producer  
**Documentation**: [IoTService/Readme.md](./IoTService/Readme.md)

---

### 6. **Dashboard Service** 📊

**Purpose**: Data visualization & decision support

- 🗺️ **Interactive Map**: Real-time city state display
- 📈 **Impact Score** (0–100): Composite impact score of scenarios
- 📊 **Radar Chart**: 5 indicators (Economic, Environmental, Accessibility, Equity, Safety)
- 🎯 **Comparison View**: Compare multiple scenarios
- 💡 **AI Explanation**: "Why is this project good/bad?" (Natural language)

**Technologies**: React/Vue, D3.js, Chart.js, Leaflet  
**Documentation**: [AnalyticsService/Readme.md](./AnalyticsService/Readme.md)

---

### 7. **Incident Service** 🚨

**Purpose**: Incident lifecycle management

- 📝 Record incidents (accidents, flooding, fires)
- 🏷️ Classification & Prioritization (automatically via AI)
- 📊 Track resolution progress
- 📈 Statistics & Reporting

**Documentation**: [IncidentService/Readme.md](./IncidentService/Readme.md)

---

### 8. **Search Service** 🔍

**Purpose**: Fast data search & query

- 🔎 Full-text search (hospitals, schools, etc.)
- 📍 Spatial search (radius-based)
- 📊 Real-time indexing (OpenSearch/Elasticsearch)

**Documentation**: [SearchService/Readme.md](./SearchService/Readme.md)

---

## 🔄 Data Flows

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

All services are exposed through a unified API Gateway at **http://localhost:3000**:

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

## 📚 Detailed Documentation

- [Digital Twin Service](./DigitalTwinService/Readme.md)
- [AI Prediction Service](./AIMLService/Readme.md)
- [Simulation Service](./AnalyticsService/Readme.md)
- [Emergency Response & Notification](./NotificationService/Readme.md)
- [IoT Service](./IoTService/Readme.md)
- [Incident Service](./IncidentService/Readme.md)
- [Search Service](./SearchService/Readme.md)

---

## 🆘 Troubleshooting

### Service won't start

```bash
# Check logs
docker-compose logs <service_name>

# Rebuild service
docker-compose build --no-cache <service_name>

# Restart
docker-compose restart <service_name>
```

### API not responding

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

1. **Service Communication**: Use Kafka for async, HTTP/REST for sync
2. **Monitoring**: Use Prometheus + Grafana to monitor performance
3. **Logging**: Centralize logs with ELK Stack
4. **Scaling**: If scaling is needed, add replicas via Docker Swarm or Kubernetes
5. **Security**: Use API Gateway, JWT tokens, RBAC

---

## 🔄 Updates & Maintenance

- **Weekly**: Monitor logs, check for errors
- **Monthly**: Update dependencies, security patches
- **Quarterly**: Performance optimization, new features
- **As needed**: Hotfixes for critical issues

---

## 📞 Contact

- 📧 Development: [development@asean-ai.com]
- 🐛 Bug Reports: [GitHub Issues](https://github.com/ASEAN-AI-DZ/CivicTwin/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/ASEAN-AI-DZ/CivicTwin/discussions)
