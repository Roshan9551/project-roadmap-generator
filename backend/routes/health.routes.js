import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getHealthScore } from "../controllers/health.controller.js";

const router = express.Router();

router.get("/:id", protect, getHealthScore);

export default router;