import express from "express";
import protect from "../middleware/authMiddleware.js";
import { completeModule, completePhase } from "../controllers/progress.controller.js";

const router = express.Router()

router.put("/:id/complete/phase", protect, completePhase);
router.put("/:id/complete/module", protect, completeModule);

export default router;