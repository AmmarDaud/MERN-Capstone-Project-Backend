import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createTask, getTasks, updateTask, deleteTask } from "../controllers/taskController.js";

const router = express.Router({ mergeParams: true });

router.route("/")
  .get(protect, getTasks)
  .post(protect, createTask);

router.route("/:taskId")
  .put(protect, updateTask)
  .delete(protect, deleteTask);

export default router;