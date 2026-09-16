const { body, param } = require("express-validator");
const { VALID_TASK_STATUSES, VALID_PRIORITIES } = require("../data/store");

const createTaskRules = [
  body("title").trim().notEmpty().withMessage("title is required"),
  body("projectId").trim().notEmpty().withMessage("projectId is required"),
  body("status")
    .optional()
    .isIn(VALID_TASK_STATUSES)
    .withMessage(`status must be one of: ${VALID_TASK_STATUSES.join(", ")}`),
  body("priority")
    .optional()
    .isIn(VALID_PRIORITIES)
    .withMessage(`priority must be one of: ${VALID_PRIORITIES.join(", ")}`),
  body("assigneeId").optional().isString(),
  body("dueDate").optional().isISO8601().withMessage("dueDate must be a valid date (YYYY-MM-DD)"),
];

const updateTaskRules = [
  body("title").optional().trim().notEmpty().withMessage("title cannot be empty"),
  body("projectId").optional().trim().notEmpty().withMessage("projectId cannot be empty"),
  body("status")
    .optional()
    .isIn(VALID_TASK_STATUSES)
    .withMessage(`status must be one of: ${VALID_TASK_STATUSES.join(", ")}`),
  body("priority")
    .optional()
    .isIn(VALID_PRIORITIES)
    .withMessage(`priority must be one of: ${VALID_PRIORITIES.join(", ")}`),
  body("assigneeId").optional().isString(),
  body("dueDate").optional().isISO8601().withMessage("dueDate must be a valid date (YYYY-MM-DD)"),
];

const updateTaskStatusRules = [
  body("status")
    .trim()
    .notEmpty()
    .withMessage("status is required")
    .bail()
    .isIn(VALID_TASK_STATUSES)
    .withMessage(`status must be one of: ${VALID_TASK_STATUSES.join(", ")}`),
];

const taskIdParamRule = [
  param("id").trim().notEmpty().withMessage("task id is required"),
];

module.exports = {
  createTaskRules,
  updateTaskRules,
  updateTaskStatusRules,
  taskIdParamRule,
};
