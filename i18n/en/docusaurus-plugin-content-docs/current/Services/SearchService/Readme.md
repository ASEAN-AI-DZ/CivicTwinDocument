# 🔍 Search Service

**Port:** 3006  
**Database:** Meilisearch  
**Status:** 🟡 In Development

The Search Service provides fast, accurate, and flexible search capabilities for the CivicTwin system with support for full-text search, advanced filtering, and geospatial search.

---

## Key Features

### 🔎 Full-text Search

- **Multi-entity search**
  - Incidents (accidents, floods, etc.)
  - Infrastructure (hospitals, schools, roads)
  - Zones and areas
  - Citizens and agencies

- **Advanced filtering**
  - Filter by date range
  - Filter by severity
  - Filter by status
  - Multi-field filtering

- **Search ranking**
  - Relevance scoring
  - Fuzzy matching
  - Typo tolerance

### 📍 Geospatial Search

- **Nearby search**
  - Search within radius
  - Sort by distance
  - Multiple type search

- **Zone-based search**
  - Search within polygon
  - Administrative boundary filtering
  - Area coverage analysis

### ⚡ Real-time Indexing

- **Automatic indexing**
  - New records indexed immediately
  - Update indexing on changes
  - Delete from index on removal

- **Bulk operations**
  - Batch indexing
  - Index rebuilding
  - Partial updates

---

## API Endpoints

```bash
# Full-text search
GET /api/search?q=flooding&type=incident&status=open

# Nearby search
GET /api/search/nearby?lat=16.04&lon=108.21&radius=500&type=hospital

# Search incidents
GET /api/search/incidents?q=accident&severity=high&from=2026-01-01

# Search infrastructure
GET /api/search/infrastructure?q=hospital&zone=hai-chau
```

---

## Technology Stack

| Component | Technology |
|-----------|-----------|
| **Search Engine** | Meilisearch |
| **Runtime** | Node.js |
| **API** | Express.js |
| **Cache** | Redis |
| **Events** | Kafka (indexing triggers) |

---

## Deployment

### Environment Variables

```env
PORT=3006
MEILISEARCH_URL=http://meilisearch:7700
MEILISEARCH_API_KEY=your_master_key
KAFKA_BROKER=kafka:9092
```

---

## 📄 License

This project is distributed under the [GNU General Public License v3.0](https://github.com/ASEAN-AI-DZ/CivicTwin/blob/master/LICENSE).
