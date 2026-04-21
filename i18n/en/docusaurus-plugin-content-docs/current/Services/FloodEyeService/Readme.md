# 🌊 FloodEye Service

**Port:** 8004  
**Status:** 🟡 In Development

FloodEye Service is an AI-powered flood detection and monitoring service, using image processing and geospatial analysis to provide early flood warnings.

---

## Key Features

### 🌊 Flood Detection

- **AI image analysis**
  - Deep learning models (CNN)
  - Transfer learning (ResNet, EfficientNet)
  - Custom trained models

- **Water level detection**
  - Water surface recognition
  - Depth estimation
  - Comparison with baseline

- **Flood level classification**
  - **Level 1 (Low)**: Minor flooding, not dangerous
  - **Level 2 (Medium)**: Moderate flooding, needs monitoring
  - **Level 3 (High)**: Severe flooding, dangerous
  - **Level 4 (Critical)**: Extreme flooding, emergency evacuation

### 📸 Image Processing

- **Image preprocessing**
  - Resize and normalize
  - Color correction
  - Noise reduction

- **Feature extraction**
  - Feature extraction
  - Edge detection
  - Texture analysis

- **Model inference**
  - Model inference
  - GPU acceleration
  - Batch processing

### 🗺️ Geospatial Analysis

- **Flood mapping**
  - Flood extent mapping
  - Inundation areas
  - Water depth visualization

- **Affected area calculation**
  - Affected area calculation
  - Population at risk
  - Infrastructure impact

- **Risk zone identification**
  - Risk zones identification
  - Evacuation routes
  - Safe zones mapping

### 🔔 Alert System

- **Automatic flood alerts**
  - Automatic alert generation
  - Multi-level warnings
  - Escalation rules

- **Risk level notifications**
  - Risk level notification
  - Affected population
  - Recommended actions

- **Integration with NotificationService**
  - Push notifications
  - SMS alerts
  - Email warnings

---

## API Endpoints

```bash
# Analyze image for flood detection
POST /api/floodeye/analyze
{
  "imageUrl": "https://...",
  "cameraId": "cam_001",
  "location": { "lat": 16.04, "lon": 108.21 }
}

Response:
{
  "floodDetected": true,
  "level": 2,
  "confidence": 0.89,
  "affectedArea": 1250,
  "waterDepth": 0.35
}

# Get flood status for a zone
GET /api/floodeye/zones/{zoneId}/status

# Get historical flood data
GET /api/floodeye/history?from=2026-01-01&to=2026-03-31
```

---

## Technology Stack

| Component | Technology |
|-----------|-----------|
| **AI Framework** | TensorFlow / PyTorch |
| **API** | Python FastAPI |
| **Image Processing** | OpenCV, PIL |
| **Database** | PostgreSQL + PostGIS |
| **Storage** | S3 / MinIO (images) |

---

## 📄 License

This project is distributed under the [GNU General Public License v3.0](https://github.com/ASEAN-AI-DZ/CivicTwin/blob/master/LICENSE).
