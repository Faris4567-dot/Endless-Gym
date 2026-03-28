import express from "express";
import {
  getMembershipPlans,
  getMembershipPlan,
  createMembershipPlan,
  updateMembershipPlan,
  deleteMembershipPlan,
  getMembershipStats,
} from "../controllers/membershipController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getMembershipPlans);
router.get("/stats", protect, getMembershipStats);
router.get("/:id", getMembershipPlan);

// Protected routes
router.post("/", protect, createMembershipPlan);
router.put("/:id", protect, updateMembershipPlan);
router.delete("/:id", protect, deleteMembershipPlan);

export default router;
