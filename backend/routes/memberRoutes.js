import express from "express";
import {
  getMembers,
  getMember,
  createMember,
  updateMember,
  deleteMember,
  getMemberStats,
} from "../controllers/memberController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected routes
router.get("/stats", protect, getMemberStats);
router.get("/", protect, getMembers);
router.get("/:id", protect, getMember);
router.post("/", protect, createMember);
router.put("/:id", protect, updateMember);
router.delete("/:id", protect, deleteMember);

export default router;
