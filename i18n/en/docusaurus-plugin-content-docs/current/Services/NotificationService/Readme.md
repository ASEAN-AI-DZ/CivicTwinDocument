# 🚨 Emergency Response & Notification Service

> Multi-channel alerts and emergency evacuation guidance for CivicTwin AI

---

## Purpose

**Emergency Response & Notification Service** provides:

1. **🚑 Emergency Route Finding** — Fastest routes for ambulances and fire trucks
2. **🗺️ Evacuation Guidance** — Safe evacuation routes for citizens
3. **📱 Multi-channel Alerts** — Push, SMS, Email, Web notifications
4. **📊 Cascade Broadcasting** — City-wide alerts triggered by AI predictions
5. **📍 Geolocation-based Targeting** — Only notify citizens in affected zones

---

## Technology Stack

| Component | Technology |
|-----------|-----------|
| **Runtime** | Node.js + Express |
| **Database** | MongoDB (notifications, logs) |
| **Push Notifications** | Firebase FCM |
| **SMS** | Twilio / Vonage |
| **Email** | SendGrid / Nodemailer |
| **Message Queue** | Apache Kafka |
| **Cache** | Redis |

---

## Key Features

### 🚑 Emergency Route Calculation

Identifies the **fastest, safest route** for emergency vehicles by:
- Avoiding flooded roads
- Avoiding congested intersections
- Prioritizing emergency lanes

```bash
POST /api/emergency/fastest-route
{
  "vehicleType": "ambulance",
  "fromLocation": { "lat": 16.04, "lon": 108.21 },
  "toLocation": { "lat": 16.08, "lon": 108.20 }
}

Response:
{
  "route": [...],
  "estimatedTime": 8,
  "distance": 2.3,
  "avoidedZones": ["zone_flooding_1"],
  "alternativeRoutes": [...]
}
```

### 🗺️ Evacuation Guidance

```bash
POST /api/emergency/evacuation-guidance
{
  "incidentLocation": { "lat": 16.04, "lon": 108.21 },
  "incidentType": "flooding",
  "affectedRadius": 500
}

Response:
{
  "evacuationRoutes": [...],
  "safeZones": [...],
  "estimatedEvacuationTime": 45,
  "citizensAtRisk": 12500
}
```

### 📱 Broadcast Alert

```bash
POST /api/emergency/broadcast-alert
{
  "type": "flooding",
  "severity": "critical",
  "affectedZones": ["zone_1", "zone_2"],
  "message": "Flood Warning: Please evacuate immediately",
  "channels": ["push", "sms", "web"]
}

Response:
{
  "alertId": "alert_xyz",
  "recipientsNotified": 8500,
  "deliveryStatus": {
    "push": "sent",
    "sms": "queued",
    "web": "published"
  }
}
```

---

## Alert Types & Severity Levels

| Alert Type | Severity | Channels | Action |
|-----------|---------|---------|--------|
| Flooding | CRITICAL | Push + SMS + Web | Evacuate immediately |
| Traffic Accident | HIGH | Push + Web | Avoid area |
| Air Pollution | MEDIUM | Push | Limit outdoor activities |
| Congestion | LOW | Web | Change route |

---

## Message Templates

### Flood Warning
```
🚨 FLOOD WARNING - [ZONE NAME]

Water level rising. Please:
✅ Move to higher ground immediately
✅ Avoid roads: [ROAD LIST]
✅ Go to safe zones: [SHELTER LIST]

CivicTwin AI Emergency System
```

### Traffic Accident
```
⚠️ TRAFFIC ACCIDENT - [LOCATION]

Serious accident at [ADDRESS].
🔀 Suggested alternate routes: [ALTERNATIVES]
🚑 Emergency vehicles en route - please yield

CivicTwin AI Traffic Management
```

---

## Delivery & Retry Logic

```
Send notification
    ↓
Try primary channel (Push)
    ├─ Success → Log & done
    └─ Fail → Retry (3 times, 30s intervals)
              └─ Still failing → Fallback to SMS
                                └─ Final fallback: Email
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
EXPOSE 3005
CMD ["npm", "start"]
```

### Environment Variables

```env
MONGODB_URI=mongodb://mongo:27017/notifications
FIREBASE_PROJECT_ID=civic-twin-firebase
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
SENDGRID_API_KEY=...
KAFKA_BROKER=kafka:9092
PORT=3005
```

---

## Performance Targets

| Metric | Target |
|--------|--------|
| Alert delivery time | < 30 seconds |
| Push notification delivery | > 95% success rate |
| SMS delivery | > 90% success rate |
| API response time | < 200ms |

---

## Related Services

- [AI Prediction Service](../AIMLService/) – Triggers alerts based on predictions
- [Digital Twin Service](../DigitalTwinService/) – Provides affected zone data
- [Incident Service](../IncidentService/) – Incident management integration

---

## 📄 License

This project is distributed under the [GNU General Public License v3.0](https://github.com/ASEAN-AI-DZ/CivicTwin/blob/master/LICENSE).
