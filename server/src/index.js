'use strict';

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');

const env = require('./config/env');
const { connectDB, getDbStatus } = require('./config/db');
const requestLogger = require('./middleware/requestLogger');
const errorHandler = require('./middleware/errorHandler');
const ApiError = require('./utils/ApiError');

// ─── App ─────────────────────────────────────────────────────────────────────
const app = express();

// ─── Security middleware ──────────────────────────────────────────────────────

app.use(
  helmet({
    crossOriginEmbedderPolicy: false, // Allow embedding for demo
  })
);

app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true, // Allow httpOnly cookies
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Global rate limit — 100 requests per 15 minutes per IP
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
      success: false,
      message: 'Too many requests. Please try again in 15 minutes.',
      code: 'TOO_MANY_REQUESTS',
    },
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// ─── Body parsing ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Sanitize MongoDB operators from request body/query (NoSQL injection prevention)
app.use(mongoSanitize());

// ─── Logging ──────────────────────────────────────────────────────────────────
app.use(requestLogger);

// ─── Health endpoint ──────────────────────────────────────────────────────────
/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Server health check
 *     tags: [System]
 *     responses:
 *       200:
 *         description: Server is running
 */
app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    status: 'ok',
    environment: env.NODE_ENV,
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
    db: getDbStatus(),
    demoMode: env.DEMO_MODE,
  });
});

// ─── API routes (added per phase) ────────────────────────────────────────────
// Phase 3+: module routes are registered here
// Example: app.use('/api/auth', require('./modules/auth/authRoutes'));

// ─── 404 handler ─────────────────────────────────────────────────────────────
app.use((req, _res, next) => {
  next(ApiError.notFound(`Route ${req.method} ${req.originalUrl}`));
});

// ─── Central error handler (must be last) ────────────────────────────────────
app.use(errorHandler);

// ─── Start server ─────────────────────────────────────────────────────────────
const start = async () => {
  await connectDB();

  app.listen(env.PORT, () => {
    const logger = require('./utils/logger');
    logger.info('--------------------------------------------------');
    logger.info(`  CareerForge AI — Server`);
    logger.info(`  URL:    http://localhost:${env.PORT}`);
    logger.info(`  Health: http://localhost:${env.PORT}/api/health`);
    logger.info(`  Mode:   ${env.NODE_ENV}`);
    if (env.DEMO_MODE) {
      logger.warn('  DEMO MODE ON — AI calls will return cached fixtures');
    }
    logger.info('--------------------------------------------------');
  });
};

// ─── Graceful shutdown ────────────────────────────────────────────────────────
process.on('unhandledRejection', (err) => {
  const logger = require('./utils/logger');
  logger.error({ err }, 'Unhandled promise rejection — shutting down');
  process.exit(1);
});

process.on('SIGTERM', async () => {
  const logger = require('./utils/logger');
  const { disconnectDB } = require('./config/db');
  logger.info('SIGTERM received — graceful shutdown');
  await disconnectDB();
  process.exit(0);
});

start();

module.exports = app; // Export for testing
