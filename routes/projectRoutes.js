import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createProject, getProjects, getProject, updateProject, deleteProject } from "../controllers/projectController.js";
import taskRoutes from "./taskRoutes.js";

const router = express.Router();

router.use("/:projectId/tasks", taskRoutes);

router.route("/")
  .get(protect, getProjects)
  .post(protect, createProject);

router.route("/:id")
  .get(protect, getProject)
  .put(protect, updateProject)
  .delete(protect, deleteProject);

export default router;