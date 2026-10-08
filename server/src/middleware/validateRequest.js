import { ApiError } from '../utils/ApiError.js';

/**
 * Zod request validation middleware factory.
 * Usage: router.post('/path', validateRequest({ body: mySchema }), controller)
 *
 * @param {{ body?: ZodSchema, query?: ZodSchema, params?: ZodSchema }} schemas
 */
export const validateRequest = (schemas) => (req, res, next) => {
  try {
    if (schemas.body) {
      req.body = schemas.body.parse(req.body);
    }
    if (schemas.query) {
      req.query = schemas.query.parse(req.query);
    }
    if (schemas.params) {
      req.params = schemas.params.parse(req.params);
    }
    next();
  } catch (err) {
    // Zod errors have a .errors array
    if (err.name === 'ZodError') {
      const message = err.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join('; ');
      return next(ApiError.badRequest(message));
    }
    next(err);
  }
};
