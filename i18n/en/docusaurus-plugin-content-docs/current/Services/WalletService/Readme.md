# 💰 Wallet Service

**Port:** 3007  
**Database:** PostgreSQL (shared database)  
**Status:** 🟡 In Development

The Wallet Service manages the CityPoint reward system, allowing users to earn points for contributing useful reports and redeem points for rewards in the CivicTwin system.

---

## Key Features

### 💰 CityPoint Wallet Management

- **Create user wallet**
  - Auto-create on registration
  - Default wallet per user
  - Initial balance: 0 points

- **Check balance**
  - View current points
  - Transaction history
  - Expiring points

- **Transfer points**
  - Transfer between users
  - Gift points
  - Bulk transfers (admin)

### 🏆 Points Earning System

- **Earn from activities**
  - Submit valid report: +10 points
  - Report confirmed: +20 points
  - Report resolved: +30 points
  - Daily check-in: +2 points

- **Special bonus points**
  - Active users: +100 points/month
  - Milestone rewards
  - Event bonuses

### 🎁 Reward Redemption

- **Vouchers & discounts**
  - Shopping vouchers
  - Service discounts
  - Gift cards

- **Urban services**
  - Reduced public service fees
  - Priority incident processing
  - Premium feature access

- **Donations**
  - Community donations
  - Aid for disadvantaged citizens
  - Environmental projects

### 📊 Transaction History

- **Track transactions**
  - Full history
  - Filter by type
  - Search transactions

- **Transaction types**
  - Earn (points earned)
  - Redeem (points spent)
  - Bonus (rewards)
  - Transfer (transferred)
  - Expire (expired)

---

## API Endpoints

```bash
# Get wallet info
GET /api/wallet/{userId}

# Earn points
POST /api/wallet/{userId}/earn
{
  "amount": 30,
  "reason": "report_resolved",
  "referenceId": "incident_001"
}

# Redeem points
POST /api/wallet/{userId}/redeem
{
  "amount": 100,
  "rewardId": "voucher_001"
}

# Get transaction history
GET /api/wallet/{userId}/transactions?type=earn&limit=20

# Get leaderboard
GET /api/wallet/leaderboard?period=monthly&limit=10
```

---

## Technology Stack

- **Runtime**: Node.js + Express
- **Database**: PostgreSQL
- **Cache**: Redis (balance caching)
- **Events**: Kafka (transaction events)

---

## 📄 License

This project is distributed under the [GNU General Public License v3.0](https://github.com/ASEAN-AI-DZ/CivicTwin/blob/master/LICENSE).
