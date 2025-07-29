import Project from "../models/Project.js";

// Create project
export const createProject = async (req, res) => {
  try {
    const project = await Project.create({ ...req.body, owner: req.user });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all projects for logged-in user
export const getProjects = async (req, res) => {
  const projects = await Project.find({ owner: req.user });
  res.json(projects);
};

// Get single project (check ownership)
export const getProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project || project.owner.toString() !== req.user) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json(project);
};

// Update project
export const updateProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project || project.owner.toString() !== req.user) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  Object.assign(project, req.body);
  await project.save();
  res.json(project);
};

// Delete project
export const deleteProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project || project.owner.toString() !== req.user) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  await project.deleteOne();
  res.json({ message: "Project deleted" });
};