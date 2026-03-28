import express from "express";
import {
  login,
  register,
  getProfile,
  updateProfile,
} from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/login", login);
router.post("/register", register);

// Protected routes
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

export default router;
