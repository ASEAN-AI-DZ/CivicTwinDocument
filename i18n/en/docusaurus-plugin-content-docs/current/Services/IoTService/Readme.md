# 📡 IoT Service

**Port:** 8001  
**Database:** TimescaleDB (`iot_db`)  
**Status:** 🟡 In Development

The IoT Service manages connections, data collection, and monitoring of IoT devices in the CivicTwin system, including environmental sensors, surveillance cameras, and other smart devices.

---

## Key Features

### 🔌 Device Management

- **Register IoT devices**
  - Auto-register via MQTT
  - Manual registration via API
  - Device type categorization

- **Connection monitoring**
  - Real-time connection status
  - Automatic reconnection
  - Connection failure alerts

- **Device configuration**
  - Update settings remotely
  - Manage firmware versions
  - Device groups

### 📊 Data Collection

- **Multi-protocol support**
  - MQTT (primary protocol for IoT)
  - HTTP REST (for web sensors)
  - WebSocket (real-time streaming)

- **Sensor data types**
  - Water level sensors
  - Temperature / Humidity sensors
  - PM2.5 / Air quality sensors
  - Traffic cameras
  - Weather stations

- **Data validation**
  - Range checking
  - Outlier detection
  - Data completeness checks

### 🌊 Flood Monitoring

- **Water level tracking**
  - Real-time readings
  - Alert thresholds
  - Historical trends

- **Flood zone detection**
  - Sensor network coverage
  - Flood level classification
  - Integration with FloodEye AI

### 🚦 Traffic Monitoring

- **Camera feeds**
  - RTSP stream processing
  - Vehicle counting
  - Speed estimation

- **Traffic flow analysis**
  - Vehicles per hour
  - Average speed
  - Congestion level

---

## API Endpoints

### Device Management

```bash
# Register new device
POST /api/iot/devices
{
  "deviceId": "sensor_001",
  "type": "water_level",
  "location": { "lat": 16.04, "lon": 108.21 },
  "zoneId": "zone_1"
}

# Get device status
GET /api/iot/devices/{deviceId}

# List all devices
GET /api/iot/devices?type=water_level&status=online
```

### Sensor Data

```bash
# Get latest readings
GET /api/iot/sensors/{sensorId}/latest

# Get historical data
GET /api/iot/sensors/{sensorId}/history?from=2026-03-01&to=2026-03-31

# Get data for a zone
GET /api/iot/zones/{zoneId}/sensors
```

---

## Technology Stack

| Component | Technology |
|-----------|-----------|
| **Runtime** | Node.js |
| **MQTT Broker** | Mosquitto / EMQX |
| **Database** | TimescaleDB (time-series) |
| **Message Queue** | Apache Kafka |
| **Cache** | Redis |

---

## Deployment

### Environment Variables

```env
PORT=8001
MQTT_BROKER=mqtt://localhost:1883
MONGODB_URI=mongodb://localhost:27017/civictwin_iot
KAFKA_BROKER=kafka:9092
TIMESCALEDB_URL=postgresql://user:pass@timescale:5432/iot_db
```

---

## 📄 License

This project is distributed under the [GNU General Public License v3.0](https://github.com/ASEAN-AI-DZ/CivicTwin/blob/master/LICENSE).
