const ApiError = require("../utils/ApiError");

// Catches any request that didn't match a route and turns it into a
// consistent 404 error, handled by the centralized error handler below.
function notFound(req, res, next) {
  next(ApiError.notFound(`Route not found: ${req.method} ${req.originalUrl}`));
}

module.exports = notFound;
