import express from "express";
import {
  getMembers,
  getMember,
  createMember,
  updateMember,
  deleteMember,
  getMemberStats,
  renewMember,
} from "../controllers/memberController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected routes
router.get("/stats", protect, getMemberStats);

router.get("/", protect, getMembers);

router.post("/", protect, createMember);

router.post("/:id/renew", protect, renewMember);

router.get("/:id", protect, getMember);

router.put("/:id", protect, updateMember);

router.delete("/:id", protect, deleteMember);

export default router;
