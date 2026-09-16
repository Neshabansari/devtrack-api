const { users, generateId } = require("../data/store");
const ApiError = require("../utils/ApiError");

// GET /api/users
function listUsers(req, res) {
  res.status(200).json({ success: true, data: users });
}

// GET /api/users/:id
function getUser(req, res) {
  const user = users.find((u) => u.id === req.params.id);
  if (!user) {
    throw ApiError.notFound(`User ${req.params.id} not found`);
  }
  res.status(200).json({ success: true, data: user });
}

// POST /api/users
function createUser(req, res) {
  const { name, role, email, color } = req.body;

  const emailTaken = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
  if (emailTaken) {
    throw ApiError.badRequest(`A user with email ${email} already exists`);
  }

  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

  const newUser = {
    id: generateId(),
    name,
    role,
    email,
    initials,
    color: color || "blue",
  };

  users.push(newUser);
  res.status(201).json({ success: true, data: newUser });
}

// PATCH /api/users/:id
function updateUser(req, res) {
  const user = users.find((u) => u.id === req.params.id);
  if (!user) {
    throw ApiError.notFound(`User ${req.params.id} not found`);
  }

  const { name, role, email, color } = req.body;
  if (name !== undefined) user.name = name;
  if (role !== undefined) user.role = role;
  if (email !== undefined) user.email = email;
  if (color !== undefined) user.color = color;

  res.status(200).json({ success: true, data: user });
}

// DELETE /api/users/:id
function deleteUser(req, res) {
  const index = users.findIndex((u) => u.id === req.params.id);
  if (index === -1) {
    throw ApiError.notFound(`User ${req.params.id} not found`);
  }

  users.splice(index, 1);
  res.status(204).send();
}

module.exports = { listUsers, getUser, createUser, updateUser, deleteUser };
