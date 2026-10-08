'use strict';

const logger = require('../utils/logger');
const ApiError = require('../utils/ApiError');
const env = require('../config/env');

/**
 * Central error handler — must be the LAST middleware registered in Express.
 *
 * Handles:
 *  - ApiError (our custom errors)
 *  - Mongoose ValidationError
 *  - Mongoose CastError (invalid ObjectId)
 *  - Mongoose duplicate key (code 11000)
 *  - Zod validation errors
 *  - JWT errors
 *  - Generic unexpected errors
 */
const errorHandler = (err, req, res, _next) => {
  let error = err;

  // ─── Normalise known error types to ApiError ─────────────────────────────

  // Mongoose: invalid ObjectId
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    error = ApiError.badRequest('Invalid ID format', [{ field: err.path, message: 'Must be a valid ObjectId' }]);
  }

  // Mongoose: duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern || {})[0] || 'field';
    error = new ApiError(409, `${field} already exists`, 'DUPLICATE_KEY');
  }

  // Mongoose: validation error
  if (err.name === 'ValidationError') {
    const details = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
    error = ApiError.badRequest('Validation failed', details);
  }

  // Zod: validation error
  if (err.name === 'ZodError') {
    const details = err.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));
    error = ApiError.badRequest('Validation failed', details);
  }

  // JWT: invalid token
  if (err.name === 'JsonWebTokenError') {
    error = ApiError.unauthorized('Invalid token');
  }

  // JWT: expired token
  if (err.name === 'TokenExpiredError') {
    error = ApiError.unauthorized('Token has expired');
  }

  // ─── Log the error ────────────────────────────────────────────────────────

  const statusCode = error.statusCode || 500;

  if (statusCode >= 500) {
    logger.error({ err, req: { method: req.method, url: req.url } }, error.message);
  } else {
    logger.warn({ req: { method: req.method, url: req.url }, code: error.code }, error.message);
  }

  // ─── Send response ────────────────────────────────────────────────────────

  const response = {
    success: false,
    message: error.message || 'An unexpected error occurred',
    code: error.code || 'INTERNAL_ERROR',
  };

  // Include validation details if present
  if (error.details) {
    response.details = error.details;
  }

  // Include stack trace in development (never in production)
  if (env.isDevelopment && statusCode >= 500) {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

module.exports = errorHandler;
