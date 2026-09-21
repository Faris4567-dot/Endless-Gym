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
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| PUBLIC ROUTES
|--------------------------------------------------------------------------
*/
router.get("/public", getTrainers);

router.get("/stats", protect, getTrainerStats);

router.get("/", protect, getTrainers);

router.get("/:id", protect, getTrainer);

router.post("/", protect, upload.single("image"), createTrainer);

router.put("/:id", protect, upload.single("image"), updateTrainer);

router.delete("/:id", protect, deleteTrainer);

export default router;