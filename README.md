# Tripp Assignment

A full-stack travel itinerary management application built using the MERN stack. Users can generate, save, view, delete, and share travel itineraries.

---

# Live Links

## Frontend
https://tripp-assignment-ymwn.vercel.app/

## Backend
https://tripp-assignment-1.onrender.com/

## GitHub Repository
https://github.com/kashishkushwaha09/tripp-assignment/

---

# Tech Stack

## Frontend
- React.js
- React Router DOM
- Axios
- Bootstrap
- Context API

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

---

# Features

## Authentication
- User Signup
- User Login
- JWT-based Authentication
- Protected Routes

## Itinerary Features
- Create travel itineraries
- View itinerary details
- Delete itineraries
- Save itinerary history
- Share itinerary using public share links

## UI Features
- Responsive Design
- Dynamic Routing
- Loading States
- Error Handling
- Protected Dashboard

---

# Frontend Routes

| Route | Description |
|------|-------------|
| `/` | Home Page |
| `/login` | User Login |
| `/signup` | User Registration |
| `/dashboard` | User Dashboard |
| `/itinerary/:id` | Protected Itinerary Details |
| `/share/:shareId` | Public Shared Itinerary |

---

# Backend API Routes

## Authentication Routes

### Register User
```http
POST /api/auth/register
```

### Login User
```http
POST /api/auth/login
```

---

## Itinerary Routes

### Get User Itineraries
```http
GET /api/itinerary
```
Protected Route

### Get Single Itinerary
```http
GET /api/itinerary/:id
```
Protected Route

### Delete Itinerary
```http
DELETE /api/itinerary/:id
```
Protected Route

### Get Shared Itinerary
```http
GET /api/itinerary/share/:shareId
```
Public Route

---

# Project Structure

```bash
tripp-assignment/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── models/
│   ├── config/
│   ├── app.js
│   ├── server.js
│   └── package.json
```

---

# Installation & Setup

## Clone Repository

```bash
git clone https://github.com/kashishkushwaha09/tripp-assignment.git
```

---

# Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# Backend Setup

```bash
cd backend
npm install
npm start
```

---

# Environment Variables

## Backend `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GEMINI_API_KEY=key
```



---

# Deployment

## Frontend Deployment
- Platform: Vercel

## Backend Deployment
- Platform: Render

---

# Author

Khushboo Kachhi
