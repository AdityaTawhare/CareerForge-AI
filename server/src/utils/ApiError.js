/**
 * Custom API Error class.
 * Extend native Error with HTTP status code and error code for
 * uniform error handling across the entire server.
 */
export class ApiError extends Error {
  /**
   * @param {number} statusCode  HTTP status code
   * @param {string} message     Human-readable error message
   * @param {string} [code]      Machine-readable error code (e.g. 'VALIDATION_ERROR')
   * @param {any[]}  [errors]    Optional array of validation sub-errors
   */
  constructor(statusCode, message, code = 'API_ERROR', errors = []) {
    super(message);
    this.name       = 'ApiError';
    this.statusCode = statusCode;
    this.code       = code;
    this.errors     = errors;
    this.isOperational = true;     // Distinguish from programmer errors

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  toJSON() {
    return {
      success:    false,
      statusCode: this.statusCode,
      code:       this.code,
      message:    this.message,
      ...(this.errors.length && { errors: this.errors }),
    };
  }

  /* ── Factory methods ──────────────────────────────────────────────── */
  static badRequest(message = 'Bad Request', errors = []) {
    return new ApiError(400, message, 'BAD_REQUEST', errors);
  }

  static unauthorized(message = 'Unauthorized') {
    return new ApiError(401, message, 'UNAUTHORIZED');
  }

  static forbidden(message = 'Forbidden') {
    return new ApiError(403, message, 'FORBIDDEN');
  }

  static notFound(message = 'Resource not found') {
    return new ApiError(404, message, 'NOT_FOUND');
  }

  static conflict(message = 'Resource already exists') {
    return new ApiError(409, message, 'CONFLICT');
  }

  static tooManyRequests(message = 'Too many requests') {
    return new ApiError(429, message, 'RATE_LIMITED');
  }

  static internal(message = 'Internal server error') {
    return new ApiError(500, message, 'INTERNAL_ERROR');
  }
}
