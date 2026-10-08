/**
 * Pagination, filtering, and sorting helper middleware.
 *
 * Attaches `req.pagination` to the request:
 *   { page, limit, skip, sort }
 *
 * Usage: router.get('/items', paginate(), controller)
 *
 * @param {{ defaultLimit?: number, maxLimit?: number }} opts
 */
export const paginate = (opts = {}) => (req, _res, next) => {
  const { defaultLimit = 20, maxLimit = 100 } = opts;

  const page  = Math.max(1, parseInt(req.query.page)  || 1);
  const limit = Math.min(maxLimit, Math.max(1, parseInt(req.query.limit) || defaultLimit));
  const skip  = (page - 1) * limit;

  // Sort: ?sort=createdAt&order=asc   (default: createdAt desc)
  const sortField = req.query.sort  || 'createdAt';
  const sortOrder = req.query.order === 'asc' ? 1 : -1;

  req.pagination = { page, limit, skip, sort: { [sortField]: sortOrder } };
  next();
};

/**
 * Build a standard paginated response object.
 *
 * @param {any[]} data
 * @param {number} total   Total documents in collection (for the query)
 * @param {{ page, limit }} pagination
 */
export const paginatedResponse = (data, total, { page, limit }) => ({
  data,
  meta: {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    hasNext: page * limit < total,
    hasPrev: page > 1,
  },
});
