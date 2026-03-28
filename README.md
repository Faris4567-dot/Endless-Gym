# FitPro Gym Management System

A production-ready full-stack gym management website with a modern frontend and powerful admin dashboard.

## Features

### Frontend Website

- 🏠 **Home Page** - Hero section, animated stats, programs, trainers preview, testimonials, membership plans, inquiry form
- 📖 **About Page** - Gym story, mission & vision, facilities, trainer profiles
- 💪 **Programs Page** - Weight Training, CrossFit, Yoga, Cardio, Personal Training
- 👥 **Trainers Page** - Expert trainers with certifications and specialties
- 💳 **Membership Page** - Monthly/Quarterly/Yearly plans with comparison
- 🖼️ **Gallery Page** - Gym photos and equipment
- 📞 **Contact Page** - Inquiry form, contact info, location

### Admin Dashboard

- 📊 **Dashboard** - Overview cards, charts (member growth, membership status)
- 👤 **Members Management** - Add, edit, delete, view members
- 🏋️ **Trainers Management** - Add, edit, delete trainers
- 📋 **Programs Management** - Add, edit, delete fitness programs
- 💰 **Membership Plans** - Add, edit, delete membership plans
- 📬 **Inquiry Management** - View, update status, delete inquiries

## Tech Stack

### Frontend

- React (Vite)
- Tailwind CSS
- Framer Motion
- React Router DOM
- Axios
- Recharts

### Backend

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

## Project Structure

```
fitpro-gym/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── adminController.js
│   │   ├── inquiryController.js
│   │   ├── memberController.js
│   │   ├── trainerController.js
│   │   ├── programController.js
│   │   └── membershipController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Admin.js
│   │   ├── Trainer.js
│   │   ├── Program.js
│   │   ├── MembershipPlan.js
│   │   ├── Member.js
│   │   └── Inquiry.js
│   ├── routes/
│   ├── server.js
│   ├── seed.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── common/
    │   │   ├── layout/
    │   │   └── ui/
    │   ├── pages/
    │   │   ├── public/
    │   │   └── admin/
    │   ├── services/
    │   ├── context/
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── package.json
    └── vite.config.js
```

## Installation & Setup

### Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in backend folder:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fitpro-gym
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
```

Start MongoDB and run the seed script:

```bash
node seed.js
```

Start the backend server:

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file in frontend folder:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

## Default Admin Credentials

After running the seed script:

- **Email**: admin@fitpro.gym
- **Password**: admin123

## API Endpoints

### Authentication

- POST `/api/admin/login` - Admin login

### Inquiries

- GET `/api/inquiries` - Get all inquiries
- POST `/api/inquiries` - Create inquiry (public)
- PUT `/api/inquiries/:id` - Update inquiry status
- DELETE `/api/inquiries/:id` - Delete inquiry
- GET `/api/inquiries/stats` - Get inquiry statistics

### Members

- GET `/api/members` - Get all members
- POST `/api/members` - Create member
- PUT `/api/members/:id` - Update member
- DELETE `/api/members/:id` - Delete member
- GET `/api/members/stats` - Get member statistics

### Trainers

- GET `/api/trainers` - Get all trainers
- POST `/api/trainers` - Create trainer
- PUT `/api/trainers/:id` - Update trainer
- DELETE `/api/trainers/:id` - Delete trainer

### Programs

- GET `/api/programs` - Get all programs
- POST `/api/programs` - Create program
- PUT `/api/programs/:id` - Update program
- DELETE `/api/programs/:id` - Delete program

### Membership Plans

- GET `/api/memberships` - Get all plans
- POST `/api/memberships` - Create plan
- PUT `/api/memberships/:id` - Update plan
- DELETE `/api/memberships/:id` - Delete plan

## Screenshots

The website features:

- Premium dark theme with energetic fitness colors
- Smooth Framer Motion animations
- Fully responsive design
- Professional admin dashboard
- Interactive charts

## License

MIT License
