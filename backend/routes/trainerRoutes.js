import express from "express";
import {
  getTrainers,
  getTrainer,
  createTrainer,
  updateTrainer,
  deleteTrainer,
  getTrainerStats,
} from "../controllers/trainerController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getTrainers);
router.get("/stats", protect, getTrainerStats);
router.get("/:id", getTrainer);

// Protected routes
router.post("/", protect, createTrainer);
router.put("/:id", protect, updateTrainer);
router.delete("/:id", protect, deleteTrainer);

export default router;
