import Task from "../models/Task.js";
import Project from "../models/Project.js";

// Create task under project
export const createTask = async (req, res) => {
  const project = await Project.findById(req.params.projectId);
  if (!project || project.owner.toString() !== req.user) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  const task = await Task.create({ ...req.body, project: req.params.projectId });
  res.status(201).json(task);
};

// Get all tasks for project
export const getTasks = async (req, res) => {
  const project = await Project.findById(req.params.projectId);
  if (!project || project.owner.toString() !== req.user) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  const tasks = await Task.find({ project: req.params.projectId });
  res.json(tasks);
};

// Update task
export const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.taskId).populate("project");
  if (!task || task.project.owner.toString() !== req.user) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  Object.assign(task, req.body);
  await task.save();
  res.json(task);
};

// Delete task
export const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.taskId).populate("project");
  if (!task || task.project.owner.toString() !== req.user) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  await task.deleteOne();
  res.json({ message: "Task deleted" });
};
