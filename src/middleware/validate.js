const { validationResult } = require("express-validator");
const ApiError = require("../utils/ApiError");

// Runs after an express-validator rule chain. Collects any failed rules
// and rejects with a single, consistent 400 response instead of each
// route handler checking validationResult() itself.
function validate(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const details = errors.array().map((e) => ({ field: e.path, message: e.msg }));
  next(ApiError.badRequest("Validation failed", details));
}

module.exports = validate;
