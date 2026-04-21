# 🔍 Incident Service

**Port:** 3004  
**Database:** PostgreSQL (`incident_db`)  
**Status:** 🟡 In Development

The Incident Service manages the complete lifecycle of incidents in the CivicTwin system — from creation, assignment, and processing to completion — with automation and workflow optimization.

---

## Key Features

### 🚨 Incident Management

- **Create, update, and track incidents**
  - Create from citizen reports
  - Auto-create from AI/IoT triggers
  - Update incident information
  - Track resolution status

- **Severity levels**
  - **Low**: Minor incident, not urgent
  - **Medium**: Needs to be handled within the day
  - **High**: High priority, fast resolution required
  - **Critical**: Immediate action, escalation required

- **Priority queue management**
  - Sort by severity
  - Calculate wait times
  - SLA overdue warnings

### 🎯 Automatic Assignment

- **Nearest agency algorithm**
  - Calculate geographic distance
  - Select most appropriate agency
  - Consider area of responsibility

- **Load balancing**
  - Distribute work evenly
  - Avoid agency overload
  - Monitor workload

- **Skill-based routing**
  - Assign by expertise
  - Match incident type to unit
  - Consider experience level

### 📊 Status Management Workflow

- **State transitions**
  - Clear, controlled process
  - Validation on state change
  - No unauthorized reverse transitions

- **Approval flow**
  - Approval before closure
  - Completion confirmation
  - Quality assessment

- **Escalation rules**
  - Automatic escalation when overdue
  - Supervisor notification
  - Transfer to another unit

### 📍 Geospatial Features

- **Location-based assignment**
  - Distance calculation
  - Select nearest unit
  - Consider administrative boundaries

- **Distance calculation**
  - Haversine formula
  - Actual road distance
  - Estimated travel time

- **Coverage zone mapping**
  - Define responsibility areas
  - Map coverage zones
  - Detect overlapping areas

---

## API Endpoints

```bash
# Create incident
POST /api/incidents
{
  "type": "flooding",
  "location": { "lat": 16.04, "lon": 108.21 },
  "severity": "high",
  "description": "Road flooded at Nguyen Van Linh"
}

# Get incident details
GET /api/incidents/{incidentId}

# Update incident status
PATCH /api/incidents/{incidentId}/status
{
  "status": "in_progress",
  "assignedTo": "agency_001"
}

# List incidents by zone
GET /api/incidents?zoneId=zone_1&status=open&severity=high
```

---

## Incident Lifecycle

```
REPORTED
    ↓
TRIAGED (severity assigned)
    ↓
ASSIGNED (agency assigned)
    ↓
IN_PROGRESS (being handled)
    ↓
RESOLVED (reported complete)
    ↓
CLOSED (verified & approved)
```

---

## Technology Stack

- **Runtime**: Node.js + Express
- **Database**: PostgreSQL with PostGIS
- **Queue**: Bull / BullMQ (job queues)
- **Cache**: Redis
- **Events**: Apache Kafka

---

## 📄 License

This project is distributed under the [GNU General Public License v3.0](https://github.com/ASEAN-AI-DZ/CivicTwin/blob/master/LICENSE).
