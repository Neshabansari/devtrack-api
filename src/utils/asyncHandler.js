// Wraps an async route handler so any rejected promise (thrown error)
// is forwarded to Express's error-handling middleware via next(err),
// instead of crashing the process or being silently swallowed.
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
