import express from "express";
import {
  getInquiries,
  createInquiry,
  getInquiry,
  updateInquiry,
  deleteInquiry,
  getInquiryStats,
} from "../controllers/inquiryController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route - create inquiry
router.post("/", createInquiry);

// Protected routes
router.get("/stats", protect, getInquiryStats);
router.get("/", protect, getInquiries);
router.get("/:id", protect, getInquiry);
router.put("/:id", protect, updateInquiry);
router.delete("/:id", protect, deleteInquiry);

export default router;
