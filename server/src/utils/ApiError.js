'use strict';

/**
 * Custom API error class.
 * Use this instead of throwing plain Error objects so the central
 * error handler can extract status code and error code.
 *
 * Usage:
 *   throw new ApiError(404, 'Resume not found', 'RESUME_NOT_FOUND');
 */
class ApiError extends Error {
  /**
   * @param {number} statusCode - HTTP status code (400, 401, 403, 404, 500, …)
   * @param {string} message    - Human-readable error message
   * @param {string} [code]     - Machine-readable error code (e.g. 'RESUME_NOT_FOUND')
   * @param {*}      [details]  - Optional extra data (validation errors, etc.)
   */
  constructor(statusCode, message, code = 'INTERNAL_ERROR', details = null) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }

  // ─── Common factory methods ───────────────────────────────────────────────

  static badRequest(message, details = null) {
    return new ApiError(400, message, 'BAD_REQUEST', details);
  }

  static unauthorized(message = 'Authentication required') {
    return new ApiError(401, message, 'UNAUTHORIZED');
  }

  static forbidden(message = 'You do not have permission to do this') {
    return new ApiError(403, message, 'FORBIDDEN');
  }

  static notFound(resource = 'Resource') {
    return new ApiError(404, `${resource} not found`, 'NOT_FOUND');
  }

  static conflict(message) {
    return new ApiError(409, message, 'CONFLICT');
  }

  static tooManyRequests(message = 'Too many requests. Please try again later.') {
    return new ApiError(429, message, 'TOO_MANY_REQUESTS');
  }

  static internal(message = 'An unexpected error occurred') {
    return new ApiError(500, message, 'INTERNAL_ERROR');
  }
}

module.exports = ApiError;
