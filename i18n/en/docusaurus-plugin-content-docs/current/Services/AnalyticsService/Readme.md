# 🎮 Simulation & What-If Service

> Scenario analysis and urban planning simulation engine for CivicTwin AI

---

## Purpose

**Simulation & What-If Service** allows urban planners and authorities to test infrastructure scenarios in a digital environment before real-world deployment.

**Core capabilities:**
- 🏗️ Drag-and-drop new infrastructure (roads, hospitals, schools, parks)
- 🔄 Run Agent-Based Model (ABM) simulations over 5–10 year timescales
- 📈 Forecast multi-dimensional impacts: economic, environmental, social, traffic, safety
- 📊 A/B scenario comparison
- 📄 Generate detailed reports with **Impact Score** & **Radar Chart**

---

## Technology Stack

| Component | Technology |
|-----------|-----------|
| **Simulation Core** | Python (Mesa, AnyLogic DSL) |
| **API Framework** | FastAPI |
| **Parallel Computing** | Ray, Dask |
| **Database** | PostgreSQL (results), MongoDB (metadata) |
| **Visualization** | GeoJSON, D3.js |
| **AI Integration** | Amazon Nova (impact prediction) |

---

## 6-Step Simulation Process

```
Step 1: User creates scenario
        (add road / hospital / change traffic signal)
          ↓
Step 2: Clone current state from Digital Twin
          ↓
Step 3: Apply scenario changes (delta)
          ↓
Step 4: Run Agent-Based Model
        - Simulates population movement (home → work → market)
        - Simulates traffic flows
        - Simulates economic activities
          ↓
Step 5: Call Amazon Nova for socioeconomic analysis
          ↓
Step 6: Generate Impact Score + Radar Chart + Explanation
```

---

## Impact Score Formula

```
Impact Score (0-100) = weighted average of:

Economic     × 30%  → GDP, employment, business hours saved
Environmental× 20%  → CO2, AQI, green area
Accessibility× 20%  → Coverage %, travel time
Equity       × 15%  → Gini coefficient, vulnerable groups
Safety       × 15%  → Accident rate, emergency response time
```

---

## API Endpoints

### Scenario Management

```bash
# Create new scenario
POST /api/scenarios
{
  "name": "New Overpass in District 1",
  "description": "Add overpass to reduce intersection congestion",
  "infrastructure": [
    {
      "type": "overpass",
      "location": { "lat": 16.04, "lon": 108.21 },
      "capacity": 2000
    }
  ]
}

Response:
{
  "scenarioId": "scen_abc123",
  "status": "created",
  "estimatedRuntime": 180
}
```

### Run Simulation

```bash
# Start simulation (async)
POST /api/scenarios/{scenarioId}/simulate
{
  "timeframe": 10,
  "iterations": 1000
}

Response:
{
  "jobId": "job_xyz",
  "status": "running",
  "progress": 0
}

# Check progress
GET /api/scenarios/{scenarioId}/status
{
  "status": "running",
  "progress": 45,
  "estimatedTimeLeft": 98
}
```

### Get Results

```bash
GET /api/scenarios/{scenarioId}/results

Response:
{
  "impactScore": 73.5,
  "radarChart": {
    "economic": 80,
    "environmental": 65,
    "accessibility": 75,
    "equity": 70,
    "safety": 78
  },
  "details": {
    "economic": {
      "gdp_change": 2.5,
      "employment_created": 1200,
      "business_hours_saved": 45000
    },
    "environmental": {
      "co2_reduction": 12.5,
      "aqi_improvement": 18
    }
  },
  "explanation": "This overpass improves traffic flow by 35%...",
  "recommendation": "HIGH PRIORITY - Expected ROI in 8 years"
}
```

### Scenario Comparison

```bash
# Compare multiple scenarios
POST /api/scenarios/compare
{
  "scenarioIds": ["scen_abc", "scen_def", "scen_ghi"]
}

Response:
{
  "winner": "scen_def",
  "comparison": [...]
}
```

---

## Usage Example

```typescript
// User creates scenario
const scenario = await simulationService.createScenario({
  name: "New Hospital in District 4",
  infrastructure: [
    {
      type: "hospital",
      location: { lat: 16.1, lon: 108.18 },
      capacity: 500,
    },
  ],
});

// Run simulation
await simulationService.simulate(scenario.id, { timeframe: 10 });

// Get and display results
const results = await simulationService.getResults(scenario.id);
displayImpactScore({
  economic: results.economic.gdp_change,
  social: results.social.equity_score,
  environmental: results.environmental.co2_reduction,
  transportation: results.transportation.congestion_reduction,
  safety: results.safety.accident_reduction,
});

// Show AI explanation
displayExplanation(results.explanation);
```

---

## Agent-Based Model (ABM)

Simulates the behavior of:

- 👥 People commuting (home → work → market → home) — morning rush, evening rush
- 🏢 Businesses (local economic impact)
- 🚗 Transportation (logistics, city-wide movement)

### Key Characteristics:
- Stochastic (with randomness)
- Multi-period (5–10 years, monthly/quarterly steps)
- Multi-objective (economic, social, environmental)

### Computational Complexity
- Single scenario: ~5–10 minutes on 1 core
- Parallel simulation (5 cores): ~2 minutes
- Batch comparison (10 scenarios): ~20–30 minutes

---

## Deployment

### Docker

```dockerfile
FROM python:3.11
WORKDIR /app
RUN pip install fastapi uvicorn mesa ray
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8003
CMD ["uvicorn", "main:app", "--host", "0.0.0.0"]
```

### Ray Cluster (for scaling)

```yaml
ray:
  version: "1.0"
  cluster_name: civic-sim
  max_workers: 10
  worker_node_type: gpu_worker # optional: for faster simulations
```

---

## Performance Targets

| Metric                  | Target   |
| ----------------------- | -------- |
| Single scenario latency | < 10 min |
| Parallel 5 scenarios    | < 3 min  |
| Impact predictions      | < 1 sec  |
| API response time       | < 500 ms |

---

## Related Services

- [Prediction Service](../AIMLService/) – Impact predictions
- [Dashboard Service](/Services/) – Visualization
- [Notification Service](../NotificationService/) – Alerts
