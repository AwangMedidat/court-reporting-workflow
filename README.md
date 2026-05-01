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
git clone https://github.com/AwangMedidat/court-reporting-workflow.git
cd court-reporting-workflow
```

### 2. Backend Setup
```bash
cd backend
yarn install
```

### Create .env
```bash
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/court_workflow"
PORT=8000
```

### Run Migration
```bash
yarn prisma migrate dev --name init
```

### Run Seeder
```bash
yarn prisma db seed
```

### Start Backend
```bash
yarn dev
```

### 3. Frontend Setup
```bash
cd backend
yarn install
```

---

## Sample Output

### Request Job
```bash
{
  "caseName": "State vs John Doe",
  "duration": 120,
  "location": "physical",
  "city": "Jakarta"
}
```

### Response Job
```bash
{
    "id": "3f145e8c-204d-4d90-9c97-d31b99c9abfe",
    "caseName": "State vs John Doe",
    "duration": 120,
    "location": "physical",
    "city": "Jakarta",
    "status": "NEW",
    "reporterId": null,
    "editorId": null,
    "createdAt": "2026-05-01T11:31:15.684Z"
}
```