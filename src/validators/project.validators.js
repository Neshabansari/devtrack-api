const { body, param } = require("express-validator");
const { VALID_PROJECT_STATUSES } = require("../data/store");

const createProjectRules = [
  body("name").trim().notEmpty().withMessage("name is required"),
  body("key").trim().notEmpty().withMessage("key is required"),
  body("description").optional().isString(),
  body("status")
    .optional()
    .isIn(VALID_PROJECT_STATUSES)
    .withMessage(`status must be one of: ${VALID_PROJECT_STATUSES.join(", ")}`),
  body("progress")
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage("progress must be an integer between 0 and 100"),
  body("dueDate").optional().isISO8601().withMessage("dueDate must be a valid date (YYYY-MM-DD)"),
  body("memberIds").optional().isArray().withMessage("memberIds must be an array of user ids"),
];

const updateProjectRules = [
  body("name").optional().trim().notEmpty().withMessage("name cannot be empty"),
  body("key").optional().trim().notEmpty().withMessage("key cannot be empty"),
  body("description").optional().isString(),
  body("status")
    .optional()
    .isIn(VALID_PROJECT_STATUSES)
    .withMessage(`status must be one of: ${VALID_PROJECT_STATUSES.join(", ")}`),
  body("progress")
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage("progress must be an integer between 0 and 100"),
  body("dueDate").optional().isISO8601().withMessage("dueDate must be a valid date (YYYY-MM-DD)"),
  body("memberIds").optional().isArray().withMessage("memberIds must be an array of user ids"),
];

const projectIdParamRule = [
  param("id").trim().notEmpty().withMessage("project id is required"),
];

module.exports = { createProjectRules, updateProjectRules, projectIdParamRule };
