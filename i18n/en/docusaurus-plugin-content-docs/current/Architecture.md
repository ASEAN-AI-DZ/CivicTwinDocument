# 🏗️ CivicTwin AI System Architecture

> _"The foundational design for the Digital Twin & AI Prediction Platform"_

---

## 📊 Architecture Overview

CivicTwin AI is designed with a modern **Microservices** architecture, ensuring:
- 🔄 Scalability
- 🔌 Flexibility
- ⚡ High Performance
- 🛡️ Reliability

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

## 🔧 Core Components

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Frontend** | Vite, Vanilla JS, Leaflet, Charts.js | User interface, interactive maps |
| **API Gateway** | Node.js + Express / Nginx | Routing, Load balancing, Authentication |
| **Digital Twin** | Node.js, PostGIS, Real-time engine | City modeling, real-time updates |
| **AI Prediction** | Amazon Bedrock + Nova | Traffic forecasting, environmental alerts |
| **Simulation** | Agent-Based Model, Python FastAPI | What-if scenario simulation |
| **Dashboard** | Node.js + EJS/Pug | Data visualization, Impact Score, Radar Chart |
| **IoT Adapter** | Node.js, MQTT | Receive data from sensors, cameras, weather |
| **Message Queue** | Apache Kafka / RabbitMQ | Event streaming, async processing |
| **Cache** | Redis | Session, caching, real-time data |
| **Database** | PostgreSQL + PostGIS | Geospatial and historical data storage |

---

## 🌐 Main Data Flows

### 1. Receiving External Data

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

**Data includes:**
- 📷 Camera feeds (traffic, flooding)
- 🌡️ IoT sensors (temperature, humidity, water level, pollution)
- 🌤️ Weather data (OpenWeatherMap API, NOAA)
- 🚗 Real-time traffic data
- 📱 Citizen app reports

### 2. Updating Digital Twin

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

**Digital Twin includes:**
- City network graph
- Nodes: roads, intersections, infrastructure, zones
- Edges: connections between points
- Real-time state: flow, congestion, water level, etc.

### 3. AI Predictions

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

**Prediction models:**
- 🚗 **Traffic Flow**: LSTM/Transformer on historical data
- 💧 **Flooding Risk**: Combines weather API + sensor data + rainfall prediction
- 📊 **Impact Cascade**: Agent-based simulation

### 4. What-If Simulation

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

## 🔄 Emergency Response Flow

When an incident occurs (accident, flooding):

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

## 📡 Main API Endpoints

```
POST   /api/scenarios              # Create simulation scenario
GET    /api/scenarios/:id          # Get scenario details
POST   /api/scenarios/:id/simulate # Run simulation
GET    /api/digital-twin/state     # Current Digital Twin state
GET    /api/predictions/traffic    # Traffic forecast
GET    /api/predictions/flooding   # Flood warnings
GET    /api/map/zones              # Zone data for map rendering
POST   /api/incidents              # Report incident
GET    /api/incidents/:id          # Incident details
POST   /api/emergency/routes       # Find emergency route
```

---

## 💾 Database Structure

### PostgreSQL + PostGIS

```sql
-- Digital Twin (Network Graph)
TABLE zones              -- Areas/regions
TABLE intersections     -- Intersections
TABLE roads            -- Roads
TABLE infrastructure   -- Infrastructure (hospitals, schools, etc.)

-- Real-time State
TABLE zone_state       -- Zone state (density, congestion, flooding)
TABLE traffic_flow     -- Traffic flow over time
TABLE water_level      -- Water levels from sensors

-- Predictions
TABLE predictions      -- Prediction results
TABLE forecast_log     -- Prediction history

-- Scenarios & Simulations
TABLE scenarios        -- User-created scenarios
TABLE simulation_results -- Simulation results

-- Incidents
TABLE incidents        -- Incidents (accidents, flooding, etc.)
TABLE incident_events  -- Related events
```

---

## 🚀 Deployment

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
- **Horizontal**: Run multiple instances of each service
- **Vertical**: Increase resources (CPU, RAM)
- **Caching**: Use Redis to cache heavy queries

---

## 🔐 Security

- **Authentication**: JWT tokens
- **Authorization**: Role-based access control (RBAC)
- **Encryption**: HTTPS/TLS, database encryption at rest
- **Rate Limiting**: Prevent abuse
- **Audit Logs**: Record important changes

---

## 📚 Related Documentation

- [Services Documentation](/Services/)
- [API Reference](/Services/)
- [Installation Guide](./Installation.md)
