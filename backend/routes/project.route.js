import express from "express";
import { createProject, deleteProject, getProjectById, getProjects } from "../controllers/project.controller.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/createProject", protect, createProject);
router.get("/getAllProjects", protect, getProjects);
router.get("/getProjectById/:id", getProjectById);
router.delete("/deleteProject/:id", deleteProject);

export default router