const { Router } = require("express");
const controller = require("../controllers/tasks.controller");
const validate = require("../middleware/validate");
const {
  createTaskRules,
  updateTaskRules,
  updateTaskStatusRules,
  taskIdParamRule,
} = require("../validators/task.validators");

const router = Router();

router.get("/", controller.listTasks);
router.get("/:id", taskIdParamRule, validate, controller.getTask);
router.post("/", createTaskRules, validate, controller.createTask);
router.patch("/:id", [...taskIdParamRule, ...updateTaskRules], validate, controller.updateTask);
router.patch(
  "/:id/status",
  [...taskIdParamRule, ...updateTaskStatusRules],
  validate,
  controller.updateTaskStatus
);
router.delete("/:id", taskIdParamRule, validate, controller.deleteTask);

module.exports = router;
