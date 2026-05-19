# ⚡ ATOMIQ — AI-Powered Goal Governance & Workforce Intelligence Platform

<div align="center">

![ATOMIQ Banner](https://via.placeholder.com/1200x300/1e2030/3b6ef5?text=ATOMIQ+%E2%80%94+Goal+Governance+Platform)

**Enterprise-grade Goal Management, Performance Tracking & AI-Powered Workforce Intelligence**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?logo=typescript)](https://typescriptlang.org)
[![Prisma](https://img.shields.io/badge/Prisma-5.16-brightgreen?logo=prisma)](https://prisma.io)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue?logo=postgresql)](https://postgresql.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)

[Demo](#demo) · [Features](#features) · [Architecture](#architecture) · [Installation](#installation) · [Deployment](#deployment)

</div>

---

## 🎯 Overview

ATOMIQ is a production-ready, enterprise SaaS platform for **AI-powered goal governance and workforce performance intelligence**. Built for organizations that take performance management seriously, ATOMIQ combines modern goal-setting frameworks with cutting-edge AI analytics to drive measurable outcomes.

### Why ATOMIQ?
- **SMART Goal Engine** — AI-driven goal quality analysis with SMART criteria scoring
- **Role-based Governance** — Employee → Manager → Admin approval workflow
- **Real-time Analytics** — Department heatmaps, predictive risk detection, quarterly trends
- **Audit-complete** — Every action tracked with who, what, when, and old/new values
- **Glassmorphism UI** — Enterprise-grade design with dark/light mode, Framer Motion animations

---

## ✨ Features

### 🔐 Authentication & RBAC
- Secure JWT-based authentication via NextAuth v5
- Three roles: **Employee**, **Manager**, **Admin**
- Middleware-enforced route protection
- Role-specific dashboards and navigation

### 🎯 Goal Management
- Create up to **8 goals** per cycle with weightage validation (must total 100%)
- 4 Unit of Measure types: **Numeric**, **Percentage**, **Timeline**, **Zero-Based**
- **Thrust Area** categorization with color coding
- AI goal quality analyzer (SMART criteria scoring 0–100)
- Goal locking after approval (admin can unlock)

### ✅ Approval Workflow
- Employee → Submit → Manager Review → Approve/Reject/Return
- Inline target editing by manager
- Rich comment system for feedback
- Real-time notifications via notification system

### 📊 Quarterly Check-ins
- Time-gated check-in windows (Goal Setting, Q1, Q2, Q3, Q4)
- Automated progress score calculation per UoM type
- Manager review & comment system
- Status tracking: Not Started / On Track / At Risk / Completed

### 🤖 AI Features
- **Goal Quality Analyzer** — SMART criteria analysis with improvement suggestions
- **Goal Recommendation Engine** — Role/department-aware goal suggestions
- **Executive Insights** — AI-generated strategic summaries
- **Risk Prediction** — Detect delayed/at-risk goals early

### 📈 Analytics & Reports
- Department performance heatmaps
- Quarterly progress trend charts
- Thrust area distribution analytics
- UoM breakdown visualizations
- CSV export for all report types
- Radar charts for cross-department comparison

### 🛡️ Admin Features
- Full user management (CRUD) with role assignment
- Cycle window management (activate/close quarters)
- Complete audit log with change tracking
- Goal unlock capability
- Shared goal push to multiple employees

---

## 🏗️ Architecture

```
atomiq/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # Backend API routes
│   │   │   ├── auth/          # NextAuth handlers
│   │   │   ├── goals/         # Goal CRUD + actions
│   │   │   ├── checkins/      # Check-in management
│   │   │   ├── analytics/     # Analytics aggregation
│   │   │   ├── ai/            # AI analysis endpoints
│   │   │   ├── admin/         # Admin-only routes
│   │   │   ├── notifications/ # Notification system
│   │   │   └── reports/       # Export endpoints
│   │   ├── auth/              # Login/error pages
│   │   ├── employee/          # Employee portal
│   │   ├── manager/           # Manager portal
│   │   └── admin/             # Admin portal
│   ├── components/
│   │   ├── layout/            # Sidebar, Header, Dashboard Layout
│   │   ├── shared/            # KPI Card, Goal Card, etc.
│   │   ├── ui/                # Toaster, base components
│   │   └── providers/         # Session, Theme providers
│   └── lib/
│       ├── auth.ts            # NextAuth configuration
│       ├── prisma.ts          # Database client singleton
│       ├── ai.ts              # Anthropic AI service
│       ├── audit.ts           # Audit logging utility
│       └── utils.ts           # Shared utilities + score engine
├── prisma/
│   ├── schema.prisma          # Complete DB schema
│   └── seed.ts                # Demo data seeder
└── docs/                      # Documentation
```

---

## 🗄️ Database Schema

```mermaid
erDiagram
    User ||--o{ Goal : "creates"
    User ||--o{ CheckIn : "submits"
    User ||--o{ Notification : "receives"
    User }o--|| Department : "belongs to"
    User }o--o| User : "reports to"
    Goal ||--o{ CheckIn : "has"
    Goal }o--|| ThrustArea : "categorized by"
    Goal }o--|| CycleWindow : "belongs to"
    Goal ||--o{ AuditLog : "tracked by"
    SharedGoal ||--o{ SharedGoalAssignment : "assigned via"
    SharedGoalAssignment }o--|| User : "assigned to"
    SharedGoalAssignment }o--o| Goal : "creates"
```

---

## 🚀 Installation

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Quick Start

```bash
# 1. Clone and install
git clone https://github.com/your-org/atomiq.git
cd atomiq
npm install

# 2. Configure environment
cp .env.example .env.local
# Edit .env.local with your values

# 3. Database setup
npx prisma generate
npx prisma db push
npm run db:seed

# 4. Start development
npm run dev
```

### Environment Variables

```bash
DATABASE_URL="postgresql://user:pass@localhost:5432/atomiq_db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"          # openssl rand -base64 32
ANTHROPIC_API_KEY="sk-ant-api..."           # For AI features
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## 🎭 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| 🛡️ Admin | admin@atomiq.com | Admin@123 |
| 👔 Manager | sarah.chen@atomiq.com | Admin@123 |
| 👔 Manager | raj.patel@atomiq.com | Admin@123 |
| 👤 Employee | priya.sharma@atomiq.com | Admin@123 |
| 👤 Employee | james.wilson@atomiq.com | Admin@123 |
| 👤 Employee | aisha.johnson@atomiq.com | Admin@123 |

---

## 🌐 Deployment

### Vercel + Railway (Recommended)

```bash
# 1. Push to GitHub
git remote add origin https://github.com/your-org/atomiq.git
git push -u origin main

# 2. Deploy to Vercel
# - Connect GitHub repo at vercel.com
# - Set environment variables
# - Deploy!

# 3. Railway PostgreSQL
# - Create Railway project
# - Provision PostgreSQL
# - Copy DATABASE_URL to Vercel
```

### Docker

```bash
docker build -t atomiq .
docker run -p 3000:3000 --env-file .env.local atomiq
```

---

## 🔢 Progress Score Formulas

| UoM Type | Formula |
|----------|---------|
| **Numeric** | `(Achievement / Target) × 100` |
| **Percentage** | `(Achievement / Target) × 100` |
| **Timeline** | `(Completion % / 100) × 100` |
| **Zero-Based** | `((Baseline - Achievement) / Baseline) × 100` |

All scores capped at 100. Weighted average = `Σ (Score × Weightage / 100)`.

---

## 🛣️ Roadmap

- [ ] Email notification integration (SMTP)
- [ ] Mobile app (React Native)
- [ ] Microsoft Teams / Slack integration
- [ ] Advanced OKR cascading
- [ ] 360-degree peer review module
- [ ] Custom dashboard builder
- [ ] Multi-tenancy support
- [ ] Webhooks for external system integration
- [ ] AI-powered coaching chatbot

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">
  <strong>Built with ❤️ for the Hackathon</strong><br>
  <sub>ATOMIQ — Making Performance Management Intelligent</sub>
</div>
