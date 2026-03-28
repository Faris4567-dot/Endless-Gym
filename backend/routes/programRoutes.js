import express from "express";
import {
  getPrograms,
  getProgram,
  createProgram,
  updateProgram,
  deleteProgram,
  getProgramStats,
} from "../controllers/programController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getPrograms);
router.get("/stats", protect, getProgramStats);
router.get("/:id", getProgram);

// Protected routes
router.post("/", protect, createProgram);
router.put("/:id", protect, updateProgram);
router.delete("/:id", protect, deleteProgram);

export default router;
