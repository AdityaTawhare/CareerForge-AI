'use strict';

const pino = require('pino');
const env = require('../config/env');

/**
 * Centralized pino logger.
 * - test: silent (no output, no worker threads)
 * - development: pino-pretty (colorized, human-readable)
 * - production: JSON (for log aggregators)
 */
const isTest = env.NODE_ENV === 'test';

const logger = pino({
  level: isTest ? 'silent' : env.isDevelopment ? 'debug' : 'info',
  // Only use pino-pretty transport in dev (not test) — avoids open handle in Jest
  ...(!isTest && env.isDevelopment && {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:HH:MM:ss',
        ignore: 'pid,hostname',
      },
    },
  }),
});

module.exports = logger;
