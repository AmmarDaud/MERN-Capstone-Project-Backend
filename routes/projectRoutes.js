import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import taskRoutes from "./taskRoutes.js";

const router = express.Router();

//Secure the repeating task by using /projects/:projectId/tasks
router.use("/:projectId/tasks", protect, taskRoutes);

router
  .route("/")
  .get(protect, getProjects)       
  .post(protect, createProject);  
   
router
  .route("/:projectId")
  .get(protect, getProject)        
  .put(protect, updateProject)     
  .delete(protect, deleteProject); 

export default router;