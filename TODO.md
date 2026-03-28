# Gym Management Website - Project Plan

## Project Overview

- **Project Name**: FitPro Gym Management System
- **Type**: Full-stack Web Application
- **Core Functionality**: A complete gym management platform with public frontend and admin dashboard
- **Target Users**: Gym customers (frontend) and gym administrators (backend)

## Tech Stack

### Frontend

- React (Vite)
- Tailwind CSS
- Framer Motion (animations)
- React Router DOM
- Axios
- Chart.js / Recharts

### Backend

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

---

## Implementation Phases

### Phase 1: Project Setup

- [ ] Initialize backend with Node.js/Express
- [ ] Initialize frontend with React/Vite
- [ ] Configure Tailwind CSS
- [ ] Setup folder structures

### Phase 2: Backend Development

- [ ] MongoDB connection setup
- [ ] Create Mongoose models (User, Admin, Trainer, Programs, Membership Plans, Members, Inquiries)
- [ ] Create JWT authentication middleware
- [ ] Create API controllers and routes
- [ ] Implement CRUD operations for all entities

### Phase 3: Frontend - Public Website

- [ ] Home Page (Hero, Stats, Programs, Testimonials, Membership, Inquiry)
- [ ] About Page (Story, Mission, Facilities, Trainers)
- [ ] Programs Page
- [ ] Trainers Page
- [ ] Membership Page
- [ ] Gallery Page
- [ ] Contact Page

### Phase 4: Frontend - Admin Dashboard

- [ ] Login/Authentication
- [ ] Dashboard Overview with Charts
- [ ] Members Management
- [ ] Trainers Management
- [ ] Programs Management
- [ ] Membership Plans Management
- [ ] Inquiry Management

### Phase 5: Integration & Features

- [ ] Connect frontend to backend APIs
- [ ] Inquiry form submission
- [ ] Protected admin routes
- [ ] Form validation
- [ ] Toast notifications
- [ ] Loading states

---

## File Structure

### Backend Structure

```
backend/
├── config/
│   └── db.js
├── controllers/
│   ├── adminController.js
│   ├── inquiryController.js
│   ├── memberController.js
│   ├── trainerController.js
│   ├── programController.js
│   └── membershipController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── User.js
│   ├── Admin.js
│   ├── Trainer.js
│   ├── Program.js
│   ├── MembershipPlan.js
│   ├── Member.js
│   └── Inquiry.js
├── routes/
│   ├── adminRoutes.js
│   ├── inquiryRoutes.js
│   ├── memberRoutes.js
│   ├── trainerRoutes.js
│   ├── programRoutes.js
│   └── membershipRoutes.js
├── .env
├── server.js
└── package.json
```

### Frontend Structure

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   └── ui/
│   ├── pages/
│   │   ├── public/
│   │   └── admin/
│   ├── services/
│   ├── hooks/
│   ├── context/
│   ├── assets/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## API Endpoints

### Authentication

- POST /api/admin/login
- POST /api/admin/register (optional)

### Inquiries

- GET /api/inquiries
- POST /api/inquiries
- PUT /api/inquiries/:id (mark as contacted)
- DELETE /api/inquiries/:id

### Members

- GET /api/members
- POST /api/members
- PUT /api/members/:id
- DELETE /api/members/:id

### Trainers

- GET /api/trainers
- POST /api/trainers
- PUT /api/trainers/:id
- DELETE /api/trainers/:id

### Programs

- GET /api/programs
- POST /api/programs
- PUT /api/programs/:id
- DELETE /api/programs/:id

### Membership Plans

- GET /api/memberships
- POST /api/memberships
- PUT /api/memberships/:id
- DELETE /api/memberships/:id

---

## Success Criteria

- [ ] Frontend is fully responsive and visually premium
- [ ] All backend APIs are functional
- [ ] Inquiry form submits and stores data in MongoDB
- [ ] Admin dashboard shows analytics
- [ ] All CRUD operations work correctly
- [ ] JWT authentication protects admin routes
