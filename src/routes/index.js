const { Router } = require("express");
const usersRoutes = require("./users.routes");
const projectsRoutes = require("./projects.routes");
const tasksRoutes = require("./tasks.routes");

const router = Router();

router.get("/health", (req, res) => {
  res.status(200).json({ success: true, data: { status: "ok" } });
});

router.use("/users", usersRoutes);
router.use("/projects", projectsRoutes);
router.use("/tasks", tasksRoutes);

module.exports = router;
