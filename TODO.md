# FitPro Gym - Production Deployment & Admin Setup TODO

## Completed: 0/14

### 1. Preparation (0/2)

- [ ] Create backend/.env.example with required env vars
- [ ] Update backend/seed.js to create default admin (admin@example.com / admin123)

### 2. Backend Deployment on Render (0/4)

- [ ] Update backend/package.json scripts if needed
- [ ] Create README.md with full deployment instructions
- [ ] Ensure server listens on process.env.PORT (already done)
- [ ] Test seed.js creates default admin

### 3. Frontend Deployment on Netlify (0/3)

- [ ] Create netlify.toml for React Router SPA routing
- [ ] Remove/update dev proxy in vite.config.js comments
- [ ] Update API baseURL? (relative /api already good)

### 4. Production Fixes (0/2)

- [ ] Ensure no localhost anywhere
- [ ] Update README with live URLs template + admin details

### 5. Verification & Completion (0/3)

- [ ] User runs: cd backend && npm install && node seed.js
- [ ] Deploy BE/FE + test APIs/admin login/database
- [ ] Mark complete, attempt_completion with URLs/creds

**Next Step:** Create backend/.env.example
