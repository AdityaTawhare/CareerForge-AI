/**
 * Standard success response wrapper.
 * All API endpoints should use this to ensure consistency.
 */
export class ApiResponse {
  /**
   * @param {number} statusCode  HTTP status code (2xx)
   * @param {any}    data        Response payload
   * @param {string} message     Human-readable success message
   * @param {object} [meta]      Optional pagination / extra metadata
   */
  constructor(statusCode, data, message = 'Success', meta = null) {
    this.success    = true;
    this.statusCode = statusCode;
    this.message    = message;
    this.data       = data;
    if (meta) this.meta = meta;
  }

  send(res) {
    return res.status(this.statusCode).json(this);
  }

  /* ── Factory methods ──────────────────────────────────────────────── */
  static ok(res, data, message = 'Success', meta = null) {
    return new ApiResponse(200, data, message, meta).send(res);
  }

  static created(res, data, message = 'Created successfully') {
    return new ApiResponse(201, data, message).send(res);
  }

  static noContent(res) {
    return res.status(204).send();
  }
}
