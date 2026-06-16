import express from "express"
import protect from "../middleware/authMiddleware.js";
import { getStreakHistory, logStreak } from "../controllers/streak.controller.js";

const router = express.Router();

router.post("/log", protect, logStreak);
router.get("/:userId", protect, getStreakHistory);

export default router;