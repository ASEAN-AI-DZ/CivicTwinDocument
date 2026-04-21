# 🌍 Digital Twin Service

> The heart of CivicTwin AI — Real-time city modeling

---

## Purpose

**Digital Twin Service** is the "heart" of CivicTwin AI. It:

1. **Builds the City Model** — A network graph representing:
   - 🛣️ Roads, intersections, zones
   - 🏢 Infrastructure (hospitals, schools, markets, etc.)
   - 📡 IoT sensors, cameras
   - 👥 Population, movement

2. **Real-time Updates** from:
   - 📷 Traffic cameras
   - 🌡️ IoT sensors (water, temperature, pollution)
   - 🌤️ Weather data
   - 🚗 Traffic flow
   - 📱 Citizen reports

3. **Provides APIs** for other services to:
   - Query current state
   - Access historical data
   - Use geospatial attributes (PostGIS)

---

## Technology Stack

| Component | Technology |
|-----------|-----------|
| **Language** | Node.js + TypeScript |
| **Framework** | Express.js + Socket.io |
| **Database** | PostgreSQL + PostGIS |
| **Cache** | Redis |
| **Message** | Apache Kafka |
| **Visualization** | GeoJSON + Leaflet |

---

## Data Structures

### Zones
```typescript
{
  id: UUID,
  name: "Hai Chau District",
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

### Roads & Intersections
```typescript
{
  id: UUID,
  name: "Le Loi Street",
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

### Infrastructure
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

### Initialization

```bash
# Check service status
GET /api/digital-twin/health
```

### Real-time State

```bash
# Current state of a zone
GET /api/digital-twin/zones/:zoneId

# All zones
GET /api/digital-twin/zones?limit=100

# Road state
GET /api/digital-twin/roads/:roadId

# All infrastructure in an area
GET /api/digital-twin/infrastructure?type=hospital&zoneId=...
```

### Data Updates

```bash
# Update zone state (from Kafka events)
POST /api/digital-twin/zones/:zoneId/update
{
  "congestionLevel": 85,
  "floodingLevel": 0,
  "pm25": 45.2
}

# Update traffic flow
POST /api/digital-twin/roads/:roadId/traffic
{
  "flow": 1200,
  "avgSpeed": 18,
  "occupancy": 65
}
```

### History & Queries

```bash
# Get timeseries history for a zone
GET /api/digital-twin/zones/:zoneId/history?from=2026-03-01&to=2026-03-31

# Find infrastructure near a location
GET /api/digital-twin/spatial-query?lat=16.0544&lon=108.2022&radius=500&type=hospital
```

---

## Geospatial Data (PostGIS)

All geospatial data is stored in PostgreSQL with the PostGIS extension:

```sql
-- Example: Find all hospitals near an accident point
SELECT * FROM infrastructure
WHERE type = 'hospital'
  AND ST_Distance(location, ST_GeomFromText('POINT(16.0544 108.2022)', 4326)) < 500;

-- Calculate flooded area
SELECT ST_Area(geometry) as flooded_area FROM zones
WHERE status = 'flooded';
```

---

## Usage Examples

### From Prediction Service (for forecasting)

```typescript
// Get current + historical data for prediction model
const currentState = await dtService.getZoneState(zoneId);
const history = await dtService.getHistory(zoneId, { days: 7 });

// Use to train LSTM model
const predictions = await aiService.predict(currentState, history);
```

### From Dashboard Service (for display)

```typescript
// Get all zones for map
const zones = await dtService.getAllZones();

// Render map with Leaflet
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

### Environment Variables

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

## Related Services

- [Prediction Service](../AIMLService/) – Forecasting based on DT data
- [Simulation Service](../AnalyticsService/) – Scenario simulation
- [Dashboard Service](/Services/) – Display DT on the map
