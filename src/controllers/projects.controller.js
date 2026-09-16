const { projects, tasks, users, generateId } = require("../data/store");
const ApiError = require("../utils/ApiError");

function assertMembersExist(memberIds = []) {
  const unknown = memberIds.filter((id) => !users.some((u) => u.id === id));
  if (unknown.length > 0) {
    throw ApiError.badRequest(`Unknown memberIds: ${unknown.join(", ")}`);
  }
}

// GET /api/projects?status=active
function listProjects(req, res) {
  const { status } = req.query;
  const filtered = status ? projects.filter((p) => p.status === status) : projects;
  res.status(200).json({ success: true, data: filtered });
}

// GET /api/projects/:id
function getProject(req, res) {
  const project = projects.find((p) => p.id === req.params.id);
  if (!project) {
    throw ApiError.notFound(`Project ${req.params.id} not found`);
  }
  res.status(200).json({ success: true, data: project });
}

// POST /api/projects
function createProject(req, res) {
  const {
    name,
    key,
    description = "",
    status = "planning",
    color = "accent",
    progress = 0,
    dueDate,
    memberIds = [],
  } = req.body;

  const keyTaken = projects.some((p) => p.key.toLowerCase() === key.toLowerCase());
  if (keyTaken) {
    throw ApiError.badRequest(`A project with key ${key} already exists`);
  }
  assertMembersExist(memberIds);

  const newProject = {
    id: generateId(),
    key,
    name,
    description,
    status,
    color,
    progress,
    dueDate,
    memberIds,
  };

  projects.push(newProject);
  res.status(201).json({ success: true, data: newProject });
}

// PATCH /api/projects/:id
function updateProject(req, res) {
  const project = projects.find((p) => p.id === req.params.id);
  if (!project) {
    throw ApiError.notFound(`Project ${req.params.id} not found`);
  }

  const { name, description, status, color, progress, dueDate, memberIds } = req.body;

  if (memberIds !== undefined) assertMembersExist(memberIds);

  if (name !== undefined) project.name = name;
  if (description !== undefined) project.description = description;
  if (status !== undefined) project.status = status;
  if (color !== undefined) project.color = color;
  if (progress !== undefined) project.progress = progress;
  if (dueDate !== undefined) project.dueDate = dueDate;
  if (memberIds !== undefined) project.memberIds = memberIds;

  res.status(200).json({ success: true, data: project });
}

// DELETE /api/projects/:id
// Deleting a project also removes its tasks, keeping the store consistent
// the same way an ON DELETE CASCADE foreign key would in Task 3's database.
function deleteProject(req, res) {
  const index = projects.findIndex((p) => p.id === req.params.id);
  if (index === -1) {
    throw ApiError.notFound(`Project ${req.params.id} not found`);
  }

  projects.splice(index, 1);

  for (let i = tasks.length - 1; i >= 0; i -= 1) {
    if (tasks[i].projectId === req.params.id) {
      tasks.splice(i, 1);
    }
  }

  res.status(204).send();
}

module.exports = { listProjects, getProject, createProject, updateProject, deleteProject };
