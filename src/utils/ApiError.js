// Custom error type carrying an HTTP status code alongside the message,
// so route handlers can `throw new ApiError(404, "Project not found")`
// and let the centralized error handler translate it into a response.
class ApiError extends Error {
  constructor(statusCode, message, details = undefined) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.details = details;
  }

  static badRequest(message, details) {
    return new ApiError(400, message, details);
  }

  static notFound(message) {
    return new ApiError(404, message);
  }
}

module.exports = ApiError;
