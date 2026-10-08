'use strict';

/**
 * Standardised API response wrapper.
 * All successful responses use this shape:
 *   { success: true, message, data, meta }
 *
 * Usage in a controller:
 *   res.json(ApiResponse.success({ user }, 'Login successful'));
 *   res.json(ApiResponse.paginated(items, total, page, limit));
 */
class ApiResponse {
  /**
   * @param {boolean} success
   * @param {string}  message
   * @param {*}       [data]
   * @param {object}  [meta]   - pagination, timestamps, etc.
   */
  constructor(success, message, data = null, meta = null) {
    this.success = success;
    this.message = message;
    if (data !== null) this.data = data;
    if (meta !== null) this.meta = meta;
  }

  static success(data = null, message = 'Success') {
    return new ApiResponse(true, message, data);
  }

  static paginated(data, total, page, limit, message = 'Success') {
    const totalPages = Math.ceil(total / limit);
    return new ApiResponse(true, message, data, {
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    });
  }
}

module.exports = ApiResponse;
