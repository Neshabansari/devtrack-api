const { tasks, projects, users, generateId } = require("../data/store");
const ApiError = require("../utils/ApiError");

function assertProjectExists(projectId) {
  if (!projects.some((p) => p.id === projectId)) {
    throw ApiError.badRequest(`Unknown projectId: ${projectId}`);
  }
}

function assertAssigneeExists(assigneeId) {
  if (assigneeId && !users.some((u) => u.id === assigneeId)) {
    throw ApiError.badRequest(`Unknown assigneeId: ${assigneeId}`);
  }
}

// GET /api/tasks?status=todo&projectId=p1&assigneeId=u1&priority=high&search=gateway
function listTasks(req, res) {
  const { status, projectId, assigneeId, priority, search } = req.query;

  let result = tasks;
  if (status) result = result.filter((t) => t.status === status);
  if (projectId) result = result.filter((t) => t.projectId === projectId);
  if (assigneeId) result = result.filter((t) => t.assigneeId === assigneeId);
  if (priority) result = result.filter((t) => t.priority === priority);
  if (search) {
    const q = search.toLowerCase();
    result = result.filter((t) => t.title.toLowerCase().includes(q));
  }

  res.status(200).json({ success: true, data: result });
}

// GET /api/tasks/:id
function getTask(req, res) {
  const task = tasks.find((t) => t.id === req.params.id);
  if (!task) {
    throw ApiError.notFound(`Task ${req.params.id} not found`);
  }
  res.status(200).json({ success: true, data: task });
}

// POST /api/tasks
function createTask(req, res) {
  const {
    title,
    projectId,
    status = "todo",
    priority = "medium",
    assigneeId,
    dueDate,
  } = req.body;

  assertProjectExists(projectId);
  assertAssigneeExists(assigneeId);

  const newTask = {
    id: generateId(),
    title,
    projectId,
    status,
    priority,
    assigneeId: assigneeId || null,
    dueDate,
  };

  tasks.push(newTask);
  res.status(201).json({ success: true, data: newTask });
}

// PATCH /api/tasks/:id
function updateTask(req, res) {
  const task = tasks.find((t) => t.id === req.params.id);
  if (!task) {
    throw ApiError.notFound(`Task ${req.params.id} not found`);
  }

  const { title, projectId, status, priority, assigneeId, dueDate } = req.body;

  if (projectId !== undefined) assertProjectExists(projectId);
  if (assigneeId !== undefined) assertAssigneeExists(assigneeId);

  if (title !== undefined) task.title = title;
  if (projectId !== undefined) task.projectId = projectId;
  if (status !== undefined) task.status = status;
  if (priority !== undefined) task.priority = priority;
  if (assigneeId !== undefined) task.assigneeId = assigneeId;
  if (dueDate !== undefined) task.dueDate = dueDate;

  res.status(200).json({ success: true, data: task });
}

// PATCH /api/tasks/:id/status
// Narrow, dedicated endpoint for the one update the dashboard UI makes
// constantly (dragging a task between columns) - a full PATCH works too,
// but this keeps that hot path a single, explicit-intent call.
function updateTaskStatus(req, res) {
  const task = tasks.find((t) => t.id === req.params.id);
  if (!task) {
    throw ApiError.notFound(`Task ${req.params.id} not found`);
  }

  task.status = req.body.status;
  res.status(200).json({ success: true, data: task });
}

// DELETE /api/tasks/:id
function deleteTask(req, res) {
  const index = tasks.findIndex((t) => t.id === req.params.id);
  if (index === -1) {
    throw ApiError.notFound(`Task ${req.params.id} not found`);
  }

  tasks.splice(index, 1);
  res.status(204).send();
}

module.exports = {
  listTasks,
  getTask,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
};
