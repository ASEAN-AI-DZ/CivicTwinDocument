# 🏙️ CivicTwin AI — Digital Twin & AI Platform for Smart Urban Management

<div align="center">
  <a href="https://civic-twin-ai-six.vercel.app/">
    <img src="https://img.shields.io/badge/🚀_Website-CivicTwin-00C853?style=for-the-badge" alt="Demo System"/>
  </a>
  <br/>
  <a href="./License.md">
    <img src="https://img.shields.io/badge/License-GPL%203.0-blue.svg" alt="License: GPL-3.0"/>
  </a>
</div>

![CivicTwin AI Banner](/img/Banner.png)

> _"From reactive response to proactive prediction — AI is the urban planner's partner"_

**CivicTwin AI** is an advanced platform integrating **Digital Twin** and **Artificial Intelligence**, designed to transform urban management from reactive to predictive and proactive. The system models an entire city as a dynamic network graph, integrating real-time data from cameras, IoT sensors, weather data, and citizen reports to support fast, accurate, and sustainable decision-making.

---

## 📋 Urban Context

### Background

As rapid urbanization unfolds in major cities, traditional urban management systems face serious challenges.

**Current Situation:**

- Growing vehicle density leads to prolonged congestion during peak hours.
- Urban flooding frequently occurs due to extreme rainfall and climate change.
- Most current systems focus only on real-time **monitoring** (monitoring) but lack the ability to **predict** and **simulate** the impacts of incidents.
- Slow response times, difficulty in optimizing traffic coordination, and lack of timely decision-support tools for urban authorities.

---

## 🎯 Project Objectives

### Short-term Goals

1. **Build a comprehensive Digital Twin** for the city
2. **Deploy AI predictions:**
   - Traffic flow from historical and real-time data
   - Environmental risks based on weather data + IoT sensors
3. **Support simulation:** Allow authorities to test scenarios (new roads, traffic flow changes, urban zone development) before real deployment
4. **Decision Support Dashboard:** Provide an intuitive interface for authorities and citizens

### Long-term Goals

- Deeply integrate into existing urban management systems of major cities, becoming a core platform supporting intelligent real-time operations and decision-making.
- Expand applications to key sectors: energy management, environmental monitoring and protection, public transportation optimization, urban planning, and other public services.

---

## 💡 Solution – CivicTwin AI

**CivicTwin AI** is a comprehensive platform combining **Digital Twin** with **AI**, working as a _"living digital mirror"_ of the city. Every road, every intersection, every sensor is **synchronized in real-time**. By simulating the city's "heartbeat" in a digital environment, we shift from **data monitoring** to **impact prediction** and **response optimization**.

---

## 🔬 What is a Digital Twin?

### Definition

A **Digital Twin** is a **virtual replica** of a physical entity — it can be a machine, production process, building, or even an entire city.

**A Digital Twin is NOT:**

- ❌ A static image or simple 3D model
- ❌ A snapshot like a photograph

**A Digital Twin IS:**

- ✅ A **dynamic system**, continuously updated with real-time data
- ✅ Integrates data from: sensors, IoT, cameras, satellite data…
- ✅ **Accurately reflects** the state of the "original"
- ✅ **Two-way:** real data → updates digital twin; digital twin decisions → applied back to reality

### Digital Twin Capabilities

1. **Simulation:** Test scenarios without changing reality
2. **Prediction:** Forecast incidents, failures, future performance
3. **Optimization:** Find the best operation method, save costs, reduce risks
4. **Two-way Analysis:** Real Data ↔ Digital Twin → accurate decision-making

---

## 👥 Target Audience

![CivicTwin features](/img/doituong.png)

### 👨‍💼 1. Urban Planners & Government Officials

- Forecast the impact of infrastructure projects before deployment
- Simulate scenarios to optimize decisions
- Data dashboard for fast, accurate decision-making

### 👷 2. Traffic Engineers & Urban Specialists

- Detailed analysis of traffic flow and risks
- Simulate effectiveness of corresponding measures
- Optimize traffic infrastructure

### 🏛️ 3. Community Organizations & NGOs

- All citizens can use the tool to propose projects
- Transparency of economic, social, and environmental impacts

### 📚 4. Researchers & Students

- Access open data for research
- Model complex urban problems

---

## 🚀 Core Features

![CivicTwin functionality](/img/chucnang.png)

### 1. Real-time Digital Twin

- Model the entire city as a network graph
- Continuous updates from traffic cameras, IoT sensors, weather data
- Display the actual state of each area on an interactive map

### 2. AI Predictions

- **Traffic flow forecast** for the near future
- **Flood warnings** based on weather data + water level sensors

### 3. Decision Support Dashboard

- **Impact Score:** Composite impact score (0–100)
- **Radar Chart:** Visualize 5 indicators (Economic, Environmental, Accessibility, Equity, Safety)

### 4. Emergency Priority Support

- When an accident/flood occurs, AI identifies the **fastest route** for ambulances/fire trucks
- **Cascade warnings:** Forecast which areas traffic congestion will spread to
- **Evacuation guidance:** Recommend safe routes for citizens

---

## 📚 Technology Stack

| Component | Technology | Role in System |
| --- | --- | --- |
| **Frontend Interface** | `Leaflet.js` | Display interactive maps, draw data overlay layers such as flood zones, traffic flows, and Digital Twin entities. |
| **Backend Logic** | `Node.js (Express)` | Acts as the central hub for API coordination, session management, and database connections. |
| **Artificial Intelligence** | `Amazon Bedrock` | Provides infrastructure to run large language models and prediction models, supporting scenario analysis and urban resource optimization. |
| **Database** | `PostgreSQL + PostGIS` | Store and process complex spatial data, perform geometric operations such as intersection checks, buffer creation, and distance calculations. |
| **Real-time Connectivity** | `WebSockets` | Maintain continuous bidirectional connections, ensuring IoT sensor data is updated on the map in real-time. |

---

## 🌟 CivicTwin AI vs. Current Systems

| Criteria | ❌ Current Systems | ✅ CivicTwin AI |
| --- | --- | --- |
| Approach | Monitoring only – past & present data | Monitoring + Prediction – from past & present data → future |
| Response | Reactive – only acts after incidents | Proactive – forecasts and prevents before occurrence |
| Prediction Capability | No forecasting – unknown future | Forecasting available – supports early decision-making |
| Scenario Analysis | None or very limited | What-if simulation – test first, visualize results |
| Risk & Cost | High risk – wasted budget, unintended impacts | Reduced risk – optimized cost and efficiency |
| Transparency | Low, difficult to verify | Transparent + Validated – AI explains, open data, community participation |

---

## 📖 Key Documentation

- [System Architecture](./Architecture.md) – Understand the overall design
- [Getting Started](./GettingStarted.md) – Install and run CivicTwin AI
- [Detailed Installation](./Installation.md) – Step-by-step installation guide
- [Services](/Services/) – Learn about each microservice

---

## 🎯 Conclusion

CivicTwin AI is a comprehensive **Digital Twin + AI** solution for smart urban traffic management. The system not only monitors in real-time but also has the ability to predict cascade impacts of incidents, propose optimal solutions, and support infrastructure planning simulation.

The project not only solves today's traffic problems but also contributes to building the foundation for **sustainable smart cities** in Da Nang and other Vietnamese cities in the future.

**CivicTwin AI – Smart prediction, safer cities.**

---

## 📞 Contact & Contribution

- **GitHub Repository:** https://github.com/ASEAN-AI-DZ/CivicTwin
- **Contribution:** Fork repository → create feature branch → open Pull Request
- **Bug Report:** Create GitHub Issue with detailed description and steps to reproduce

---

## 📄 License

This project is distributed under the **GNU General Public License v3.0**. See the [LICENSE](./License.md) file for more details.

---

_**Developed with ❤️ towards smart, sustainable cities**_

_"Technology serving people, minimizing climate risks, and improving quality of life."_
