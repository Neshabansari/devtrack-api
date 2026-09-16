const { body, param } = require("express-validator");

const createUserRules = [
  body("name").trim().notEmpty().withMessage("name is required"),
  body("role").trim().notEmpty().withMessage("role is required"),
  body("email").trim().isEmail().withMessage("a valid email is required"),
  body("color").optional().isString(),
];

const updateUserRules = [
  body("name").optional().trim().notEmpty().withMessage("name cannot be empty"),
  body("role").optional().trim().notEmpty().withMessage("role cannot be empty"),
  body("email").optional().trim().isEmail().withMessage("email must be valid"),
  body("color").optional().isString(),
];

const userIdParamRule = [
  param("id").trim().notEmpty().withMessage("user id is required"),
];

module.exports = { createUserRules, updateUserRules, userIdParamRule };
