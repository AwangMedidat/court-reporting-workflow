# Court Reporting Workflow Manager

A fullstack workflow management system for handling court transcription jobs, including job assignment, status tracking, and payment calculation.

---

## Tech Stack

### Backend
- Node.js
- TypeScript
- Express.js
- Prisma ORM
- PostgreSQL
- Yarn

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Yarn

---

## Core Features

- Create transcription jobs
- Assign reporters based on location/availability
- Assign editors
- Track workflow statuses:
  - NEW
  - ASSIGNED
  - TRANSCRIBED
  - REVIEWED
  - COMPLETED
- Calculate:
  - Reporter payment (per minute)
  - Editor payment (flat fee)
  - Total payout
- Dashboard for job monitoring
- Job detail page with payment summary

---

## Installation & Development Setup

### 1. Clone Project
```bash
git clone <your-repository-url>
cd court-reporting-workflow