
/**
 * Wraps async route handlers so you never need try/catch in controllers.
 *
 * Usage:
 *   router.get('/users', asyncHandler(userController.list));
 *
 * Any thrown error (including ApiError) is forwarded to Express's
 * next(err) and caught by the central error handler.
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export { asyncHandler };
