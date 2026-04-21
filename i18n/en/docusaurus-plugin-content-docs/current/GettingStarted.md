# 🚀 CivicTwin AI Getting Started Guide

> _"From theory to practice — Deploy CivicTwin AI today"_

---

## 📋 System Requirements

### Prerequisites
- **Node.js**: v16+
- **npm** or **yarn**: v7+
- **PostgreSQL**: v12+
- **PostGIS**: v3.0+ (PostgreSQL extension)
- **Docker** (optional, but recommended)

### Environment
- **OS**: Linux, macOS, or Windows (WSL2)
- **RAM**: Minimum 8GB
- **Disk**: 20GB (for data and models)

---

## 🔧 Quick Setup (5 minutes)

### Step 1: Clone Repository

```bash
git clone https://github.com/asean-ai/civic-twin.git
cd civic-twin
```

### Step 2: Install Dependencies

```bash
npm install
# or
yarn install
```

### Step 3: Configure Environment

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/civic_twin
POSTGIS_ENABLED=true

# AI Core
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret

# API
PORT=3000
NODE_ENV=development

# Maps
MAPBOX_TOKEN=your_mapbox_token
```

### Step 4: Initialize Database

```bash
npm run migrate
npm run seed  # (if sample data is needed)
```

### Step 5: Run the Application

```bash
npm start
```

The application will run at `http://localhost:3000`

---

## 🐳 Setup with Docker (Recommended)

### Step 1: Build Docker Image

```bash
docker-compose build
```

### Step 2: Start Containers

```bash
docker-compose up -d
```

### Step 3: Check Status

```bash
docker-compose ps
```

All services will be running:
- **API Backend**: http://localhost:3000
- **Frontend**: http://localhost:5173
- **PostgreSQL**: localhost:5432
- **Redis** (cache): localhost:6379

---

## 📊 Project Structure

```
civic-twin/
├── src/
│   ├── services/           # Microservices
│   │   ├── DigitalTwin/   # Digital Twin engine
│   │   ├── Prediction/    # AI prediction
│   │   ├── Simulation/    # What-If scenario
│   │   └── Dashboard/     # Decision support
│   ├── pages/              # Frontend pages
│   ├── css/                # Styling
│   └── api/                # API routes
├── docs/                   # Documentation
├── docker-compose.yml      # Docker configuration
├── package.json
└── README.md
```

---

## ✅ Verify Installation

### 1. Check API

```bash
curl http://localhost:3000/api/health
# Result: {"status": "ok", "timestamp": "2026-03-31T..."}
```

### 2. Access Frontend

Open browser: `http://localhost:5173`

### 3. Create a Test Project

1. Log in with demo account
2. Select "Create New Scenario"
3. Draw a road on the map
4. View prediction results

---

## 🚨 Troubleshooting

### Error: "Connection refused" (PostgreSQL)

```bash
# Check if PostgreSQL is running
sudo service postgresql status

# Or if using Docker
docker-compose ps postgres
```

### Error: "Port 3000 already in use"

```bash
# Find process using port 3000
lsof -i :3000

# Or specify a different port
PORT=3001 npm start
```

### Error: "AWS credentials not found"

Check that the `.env` file contains `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`. Or configure AWS CLI:

```bash
aws configure
```

---

## 📚 Next Steps

- [System Architecture](./Architecture.md) – Understand the detailed design
- [Build Without Docker](./BUILD_WITHOUT_DOCKER.md) – If you prefer not to use Docker
- [Services](/Services/) – Learn about each microservice
- [API Documentation](/Services/) – List of API endpoints

---

## 💡 Development Tips

### Hot Reload Frontend

```bash
npm run dev  # Automatically reloads when code changes
```

### Debug Backend

```bash
DEBUG=* npm start  # View detailed logs
```

### Reset Database

```bash
npm run migrate:reset
npm run seed
```

---

## 🆘 Need Help?

- 📖 See [System Architecture](./Architecture.md) for more design details
- 🐛 Report bugs: [GitHub Issues](https://github.com/ASEAN-AI-DZ/CivicTwin/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/ASEAN-AI-DZ/CivicTwin/discussions)

---

## 📄 License

This project is distributed under the **GNU General Public License v3.0**. See the [LICENSE](./License.md) file for details.

---

© 2025 CivicTwin AI – Developed with ❤️ by the ASEAN-AI-DZ Team
