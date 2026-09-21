# FitPro Gym - Production-Ready Full-Stack Gym Management System

[![Netlify](https://img.shields.io/badge/Frontend-Netlify-brightgreen)](https://app.netlify.com/)
[![Render](https://img.shields.io/badge/Backend-Render-blue)](https://dashboard.render.com/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB%20Atlas-green)](https://cloud.mongodb.com/)

Production-ready gym website with admin panel. No localhost anywhere. Deploy in **5 minutes**.

## 🚀 Quick Start (Production)

### 1. Database (MongoDB Atlas - Free Tier)

1. Create free cluster at [MongoDB Atlas](https://cloud.mongodb.com)
2. Create database `fitpro_gym`
3. Get **MONGO_URI** (Network Access: 0.0.0.0/0)
4. Generate **JWT_SECRET**:
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

### 2. Backend (Render - Free Tier)

1. Fork/Upload `backend/` to GitHub
2. New Web Service → Connect GitHub repo (`backend` root dir)
3. **Settings**:
   - Build: `npm install`
   - Start: `npm start`
   - **Environment Vars**:
     ```
     MONGO_URI=your_mongodb_atlas_uri
     JWT_SECRET=your_jwt_secret
     JWT_EXPIRE=30d
     NODE_ENV=production
     ```
4. Deploy → **BACKEND_URL**: `https://your-app.onrender.com`

**Run Seed** (one-time, after first deploy):

```bash
curl -X POST https://your-app.onrender.com/seed  # Add seed route if needed, or local: cd backend && node seed.js
```

### 3. Frontend (Netlify - Free Tier)

1. Drag `frontend/` folder to [Netlify Drop](https://app.netlify.com/drop)
   - Or connect GitHub repo (`frontend` root)
2. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Deploy → **FRONTEND_URL**: `https://your-site.netlify.app`

### 4. Test Live

- Frontend: `{FRONTEND_URL}`
- Backend API: `{BACKEND_URL}/api/health`
- **Admin Panel**: `{FRONTEND_URL}/admin/login`
  - **Email**: `admin@example.com`
  - **Password**: `admin123`

✅ **Database connected, admin ready, APIs working!**

## 📁 Admin Panel (Already Built)

- **Route**: `/admin` → `/admin/login` → `/admin/dashboard`
- **Features**: Dashboard, Members/Trainers/Programs CRUD, Inquiries
- **JWT Auth**: Secure, production-ready

## 🛠 Local Development (Optional)

```bash
# Backend
cd backend
npm install
cp .env.example .env  # Add your MONGO_URI, JWT_SECRET
node seed.js
npm run dev  # http://localhost:5000

# Frontend
cd frontend
npm install
npm run dev  # http://localhost:3000 (proxies /api to backend)
```

## 🔧 Deployment Details

### Backend (Render)

| Field          | Value         |
| -------------- | ------------- |
| Root Directory | `backend`     |
| Build Command  | `npm install` |
| Start Command  | `npm start`   |
| Instance Type  | Free          |

**Env Vars Required**:

```
MONGO_URI=mongodb+srv://...
JWT_SECRET=...
JWT_EXPIRE=30d
PORT=10000  # Render assigns
NODE_ENV=production
```

**Health Check**: `{BACKEND_URL}/api/health`

### Frontend (Netlify)

| Field            | Value                   |
| ---------------- | ----------------------- |
| Build Command    | `npm run build`         |
| Publish Dir      | `dist`                  |
| **netlify.toml** | ✅ SPA routing included |

**API Calls**: Uses relative `/api` → works with Netlify proxy or CORS.

## 📊 Live URLs Template

```
Frontend: https://awesome-fitpro.netlify.app
Backend: https://fitpro-api-abc123.onrender.com
Admin: https://awesome-fitpro.netlify.app/admin/login
Admin Creds: admin@example.com / admin123
```

## ✅ Production Checklist

- [x] **No localhost** (relative `/api`, env vars)
- [x] **Env vars** (MONGO_URI, JWT_SECRET)
- [x] **Admin seeded** (safe seed.js)
- [x] **Deploy configs** (Netlify/Render ready)
- [x] **SPA routing** (netlify.toml)
- [x] **PORT=process.env.PORT** (server.js)

## Tech Stack

**FE**: React/Vite/Tailwind/Framer-Motion/Recharts  
**BE**: Node/Express/MongoDB/JWT  
**Deploy**: Netlify + Render + Atlas

## Run Seed.js (Backend Local/SSH)

```bash
cd backend
npm install
node seed.js
```

Creates: admin@example.com/admin123 + sample trainers/programs/plans.

## Troubleshooting

- **CORS**: Backend `cors()` enabled
- **API 404**: Check backend routes `/api/*`
- **Admin not found**: Run seed.js
- **Build fails**: Node 18+

## License

MIT License © 2026 Mohd Faris

See the [LICENSE](LICENSE) file for the full license text.