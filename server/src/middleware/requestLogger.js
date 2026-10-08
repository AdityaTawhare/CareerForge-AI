'use strict';

const logger = require('../utils/logger');

/**
 * HTTP request logger middleware.
 * Logs method, path, status code, and response time.
 * Skips /api/health to avoid noise in logs.
 */
const requestLogger = (req, res, next) => {
  if (req.path === '/api/health' || req.path === '/health') {
    return next();
  }

  const startTime = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const logFn = res.statusCode >= 500 ? 'error' : res.statusCode >= 400 ? 'warn' : 'info';

    logger[logFn]({
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
    });
  });

  next();
};

module.exports = requestLogger;
