# 📦 CivicTwin AI Installation Guide

> Detailed guide to install and run CivicTwin AI on your local machine or server

---

## 🔧 System Requirements

### Basic Requirements
- **OS**: Linux, macOS, Windows (WSL2)
- **RAM**: Minimum 8GB (16GB recommended)
- **Disk**: 20GB free (for data + AI models)
- **Internet**: Stable connection

### Using Docker (Recommended ✅)

| Technology | Version | Notes |
|-----------|---------|-------|
| **Docker** | 20.10+ | [Download Docker Desktop](https://www.docker.com/products/docker-desktop) |
| **Docker Compose** | 2.0+ | Bundled with Docker Desktop |
| **Git** | 2.30+ | [Download Git](https://git-scm.com/downloads) |

**Benefit**: No need to install Node.js, PostgreSQL, Redis... Everything is in containers!

### Without Docker

See [BUILD_WITHOUT_DOCKER.md](./BUILD_WITHOUT_DOCKER.md)

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | 18.0+ | Backend API, Microservices |
| **npm/yarn** | 9.0+ | Package manager |
| **PostgreSQL** | 12.0+ | Main database |
| **PostGIS** | 3.0+ | Geospatial extension |
| **Python** | 3.9+ | AI prediction models |
| **Redis** | 6.0+ | Caching & sessions |

---

## 🚀 Quick Installation (5 minutes)

### Step 1: Clone Repository

```bash
git clone https://github.com/asean-ai/civic-twin.git
cd civic-twin
```

### Step 2: Create .env file

```bash
cp .env.example .env
```

**Edit `.env` (especially these lines):**

```env
# Database
DATABASE_URL=postgresql://civic_user:civic_pass@postgres:5432/civic_twin
POSTGIS_ENABLED=true

# AWS (Bedrock) - For AI predictions
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret

# Application
NODE_ENV=development
PORT=3000

# Maps
MAPBOX_TOKEN=your_mapbox_token  # Optional, get from https://mapbox.com

# Redis
REDIS_URL=redis://redis:6379

# Session
SESSION_SECRET=your_secret_key_here
```

### Step 3: Run with Docker Compose

```bash
# Build & run containers
docker-compose up -d

# Wait 1-2 minutes for all services to start
docker-compose ps
```

### Step 4: Initialize Database

```bash
# Run migrations
docker-compose exec api npm run migrate

# (Optional) Seed sample data
docker-compose exec api npm run seed
```

### Step 5: Access the Application

- **Frontend**: http://localhost:5173
- **API**: http://localhost:3000
- **Adminer** (Database GUI): http://localhost:8080

---

## 📋 Docker Services

When running `docker-compose up -d`, the following services will start:

```bash
# View service list
docker-compose ps

# OUTPUT:
# NAME       IMAGE                      STATUS
# api        civic-twin-api:latest      Up 2 minutes
# frontend   civic-twin-frontend:latest Up 2 minutes
# postgres   postgres:15                Up 2 minutes
# redis      redis:7                    Up 2 minutes
# adminer    adminer:latest             Up 2 minutes
```

### Ports
- **Frontend**: 5173 (Vite dev server)
- **Backend API**: 3000 (Express.js)
- **PostgreSQL**: 5432 (internal, not exposed)
- **Redis**: 6379 (internal)
- **Adminer**: 8080 (Database admin tool)

---

## 🧪 Verify Installation

### 1. Check API Health

```bash
curl http://localhost:3000/api/health
```

**Expected result:**
```json
{
  "status": "ok",
  "timestamp": "2026-03-31T10:30:00Z",
  "services": {
    "database": "connected",
    "redis": "connected",
    "ai": "ready"
  }
}
```

### 2. Check Frontend

Open browser: **http://localhost:5173**

You will see:
- 📍 Interactive city map
- 🎮 "Create Scenario" button
- 📊 Dashboard (if logged in)

### 3. Check Database

Visit: **http://localhost:8080**
- **System**: PostgreSQL
- **Server**: postgres
- **Username**: civic_user
- **Password**: civic_pass
- **Database**: civic_twin

---

## 🛠️ Useful Commands

### Development

```bash
# Watch mode (auto reload)
docker-compose exec api npm run dev

# View logs
docker-compose logs -f api

# Bash shell into container
docker-compose exec api bash
```

### Database

```bash
# Connect to PostgreSQL
docker-compose exec postgres psql -U civic_user -d civic_twin

# Reset database (warning: deletes all data!)
docker-compose exec api npm run migrate:reset
docker-compose exec api npm run seed
```

### Build & Deployment

```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Push to registry (if available)
docker tag civic-twin-api:latest your-registry.com/civic-twin-api:latest
docker push your-registry.com/civic-twin-api:latest
```

---

## 🚨 Troubleshooting

### Error: "Container exited with code 1"

```bash
# View detailed logs
docker-compose logs api

# Check if .env is correct
cat .env | grep DATABASE_URL

# Try rebuilding
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Error: "Port 5173 already in use"

```bash
# Find process using the port
lsof -i :5173  # macOS/Linux
netstat -ano | findstr :5173  # Windows

# Or specify a different port
PORT=3001 FRONTEND_PORT=5174 docker-compose up -d
```

### Error: "PostgreSQL connection refused"

```bash
# Check if PostgreSQL container is running
docker-compose ps postgres

# Connect directly
docker-compose exec postgres psql -U civic_user -d civic_twin

# If still failing, reset database
docker-compose down -v  # -v: delete volumes
docker-compose up -d
docker-compose exec api npm run migrate
```

### Error: "AWS credentials not found"

```bash
# Check .env
grep AWS_ .env

# Or configure AWS CLI
aws configure
```

---

## 📚 Advanced Setup

### Using Custom Domain

Add to `/etc/hosts` (macOS/Linux):
```
127.0.0.1 civic.local
```

Windows (`C:\Windows\System32\drivers\etc\hosts`):
```
127.0.0.1 civic.local
```

Then update `.env`:
```env
FRONTEND_URL=http://civic.local:5173
API_URL=http://civic.local:3000
```

### Enable HTTPS (Local)

```bash
# Create self-signed certificate
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365

# Update docker-compose.yml
# ... (see nginx.conf template)
```

### Scaling (Multiple Workers)

In `docker-compose.yml`:
```yaml
api:
  deploy:
    replicas: 3  # Run 3 API instances
```

---

## ✅ Installation Complete Checklist

Check for these signs:

- ✅ `docker-compose ps` - All containers are "Up"
- ✅ http://localhost:5173 - Frontend displays
- ✅ http://localhost:3000/api/health - API responds
- ✅ Database migrations successful
- ✅ Can create scenarios and view results

---

## 📖 Next Steps

1. [Getting Started](./GettingStarted.md) – Familiarize with the interface
2. [Architecture](./Architecture.md) – Understand the system in detail
3. [Services](/Services/) – Learn about each module
4. [Development](./BUILD_WITHOUT_DOCKER.md) – Setup for development

---

## 💬 Need Help?

- 📖 [Introduction Documentation](./intro.md)
- 🐛 [GitHub Issues](https://github.com/ASEAN-AI-DZ/CivicTwin/issues)
- 💭 [Discussions](https://github.com/ASEAN-AI-DZ/CivicTwin/discussions)
