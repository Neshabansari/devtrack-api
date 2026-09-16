// In-memory data store.
//
// Task 2 is scoped to API design, not persistence - the real database
// integration happens in Task 3. This module intentionally mimics the
// shape and access pattern of a real data layer (arrays of records +
// simple lookup helpers) so swapping it for a Mongo/Postgres-backed
// layer later is a drop-in change to routes/controllers, nothing more.
//
// Field names mirror the Task 1 dashboard's mock data so the frontend
// can eventually consume this API without a data-shape rewrite.

const { randomUUID } = require("crypto");

const users = [
  { id: "u1", name: "Neshab Ansari", role: "Java Developer", email: "neshab.ansari@devtrack.dev", initials: "NA", color: "accent" },
  { id: "u2", name: "Diego Ferreira", role: "Backend Engineer", email: "diego.ferreira@devtrack.dev", initials: "DF", color: "blue" },
  { id: "u3", name: "Priya Natarajan", role: "Product Designer", email: "priya.natarajan@devtrack.dev", initials: "PN", color: "violet" },
  { id: "u4", name: "Sam Whitfield", role: "DevOps Engineer", email: "sam.whitfield@devtrack.dev", initials: "SW", color: "amber" },
  { id: "u5", name: "Lena Kowalski", role: "QA Engineer", email: "lena.kowalski@devtrack.dev", initials: "LK", color: "blue" },
];

const projects = [
  {
    id: "p1",
    key: "GTW",
    name: "API Gateway Revamp",
    description: "Consolidate five legacy services behind a single versioned gateway with rate limiting.",
    status: "active",
    color: "accent",
    progress: 68,
    dueDate: "2026-09-19",
    memberIds: ["u1", "u2", "u4"],
  },
  {
    id: "p2",
    key: "DSY",
    name: "Design System v3",
    description: "Token-based component library covering forms, data display, and navigation primitives.",
    status: "active",
    color: "violet",
    progress: 42,
    dueDate: "2026-10-03",
    memberIds: ["u3", "u1", "u5"],
  },
  {
    id: "p3",
    key: "OBS",
    name: "Observability Stack",
    description: "Structured logging, tracing, and alerting rollout across all production services.",
    status: "planning",
    color: "blue",
    progress: 12,
    dueDate: "2026-11-14",
    memberIds: ["u4"],
  },
];

const tasks = [
  { id: "t1", title: "Define rate-limit policy per client tier", projectId: "p1", status: "in-progress", priority: "high", assigneeId: "u1", dueDate: "2026-09-04" },
  { id: "t2", title: "Migrate auth middleware to gateway layer", projectId: "p1", status: "in-progress", priority: "urgent", assigneeId: "u2", dueDate: "2026-09-03" },
  { id: "t3", title: "Write load test suite for gateway", projectId: "p1", status: "todo", priority: "medium", assigneeId: "u4", dueDate: "2026-09-11" },
  { id: "t4", title: "Ship Button, Input, and Select primitives", projectId: "p2", status: "done", priority: "high", assigneeId: "u3", dueDate: "2026-08-20" },
  { id: "t5", title: "Select tracing vendor and pilot integration", projectId: "p3", status: "todo", priority: "medium", assigneeId: "u4", dueDate: "2026-09-25" },
];

const VALID_TASK_STATUSES = ["todo", "in-progress", "done"];
const VALID_PROJECT_STATUSES = ["planning", "active", "paused", "completed"];
const VALID_PRIORITIES = ["low", "medium", "high", "urgent"];

const generateId = () => randomUUID();

module.exports = {
  users,
  projects,
  tasks,
  generateId,
  VALID_TASK_STATUSES,
  VALID_PROJECT_STATUSES,
  VALID_PRIORITIES,
};
