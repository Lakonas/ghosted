# Ghosted

Track your job applications. Embrace the silence.

**[ghosted-psi.vercel.app](https://ghosted-psi.vercel.app)**

## What it does

Kanban board for job seekers. Drag applications across stages, track where things stand, watch your response rate in real time.

**Stages:** Saved → Applied → Phone Screen → Interview → Offer → Rejected → Ghosted

## Stack

- **Frontend:** React, Vite, @hello-pangea/dnd
- **Backend:** Node.js, Express
- **Database:** PostgreSQL (raw SQL)
- **Auth:** JWT
- **Deployed:** Vercel (frontend), Railway (backend + DB)

## Features

- Kanban board with drag-and-drop persistence
- JWT authentication
- Live stats: total applications, response rate, rejection rate, active count
- Add and delete applications
- Status-coded columns and cards

## Local setup

```bash
# Backend
cd backend
npm install
# create .env with DB_* and JWT_SECRET
nodemon index.js

# Frontend
cd frontend
npm install
# create .env with VITE_API_URL
npm run dev
```