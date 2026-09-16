const env = require("../config/env");

// Single place where every error in the app - thrown, passed to next(),
// or rejected in an async handler - gets turned into a JSON response.
// Keeping this centralized means route handlers never need their own
// try/catch + res.status(...).json(...) boilerplate.
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode && err.statusCode >= 400 ? err.statusCode : 500;

  const payload = {
    success: false,
    error: {
      message: statusCode === 500 && env.nodeEnv === "production"
        ? "Internal server error"
        : err.message || "Internal server error",
    },
  };

  if (err.details) {
    payload.error.details = err.details;
  }

  if (env.nodeEnv !== "production" && statusCode === 500) {
    payload.error.stack = err.stack;
  }

  if (statusCode === 500) {
    console.error(err);
  }

  res.status(statusCode).json(payload);
}

module.exports = errorHandler;
