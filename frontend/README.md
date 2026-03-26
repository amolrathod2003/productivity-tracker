# DevTrack - Smart Productivity & Activity Tracking System

A full-stack MERN application for tracking productivity through timers, pomodoro sessions, and activity logging.

## Features

- User authentication (register/login) with JWT
- Stopwatch timer for tracking tasks
- Pomodoro timer (25 min work / 5 min break)
- Activity history log with categories
- Dark themed UI with glassmorphism design

## Tech Stack

- **Frontend:** React, Vite, React Router, Axios, Lucide Icons
- **Backend:** Node.js, Express
- **Database:** MongoDB (with in-memory fallback using mongodb-memory-server)
- **Auth:** JWT, bcryptjs

## Setup

### 1. Clone and install dependencies

```bash
# install root dependencies
npm install

# install backend dependencies
cd backend
npm install

# install frontend dependencies
cd ../frontend
npm install
```

### 2. Configure environment variables

Create a `.env` file in the `backend/` directory (see `.env.example`):

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/devtrack
JWT_SECRET=your_secret_key
```

### 3. Run the app

```bash
# from root directory - starts both frontend and backend
npm run dev
```

Or use the batch file:
```bash
start-devtrack.bat
```

Frontend runs on `http://localhost:5173` and backend on `http://localhost:5000`.

## Project Structure

```
├── backend/
│   ├── config/         # database connection
│   ├── controllers/    # route handlers
│   ├── middleware/      # auth middleware
│   ├── models/         # mongoose schemas
│   ├── routes/         # API routes
│   └── server.js       # entry point
├── frontend/
│   ├── src/
│   │   ├── components/ # Timer, Pomodoro
│   │   ├── context/    # Auth & Activity context
│   │   └── pages/      # Login, Register, Dashboard
│   └── index.html
└── package.json        # root scripts
```

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/auth/register | Register user | No |
| POST | /api/auth/login | Login user | No |
| GET | /api/activities | Get user activities | Yes |
| POST | /api/activities | Add new activity | Yes |
