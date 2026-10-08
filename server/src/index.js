import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import swaggerUi from 'swagger-ui-express';

import { env } from './config/env.js';
import { connectDB, getDbStatus } from './config/db.js';
import { swaggerSpec } from './config/swagger.js';
import requestLogger from './middleware/requestLogger.js';
import errorHandler from './middleware/errorHandler.js';
import { ApiError } from './utils/ApiError.js';

// ─── Route modules ────────────────────────────────────────────────────────────
import skillsRouter from './modules/skills/skills.routes.js';

// ─── App ──────────────────────────────────────────────────────────────────────
const app = express();

// ─── Security middleware ───────────────────────────────────────────────────────
app.use(helmet({ crossOriginEmbedderPolicy: false }));
app.use(cors({
  origin: env.CLIENT_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));
app.use(mongoSanitize());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, please try again later.' },
}));

// ─── Request logging ──────────────────────────────────────────────────────────
app.use(requestLogger);

// ─── Swagger UI ───────────────────────────────────────────────────────────────
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customSiteTitle: 'CareerForge AI — API Docs',
  swaggerOptions: { persistAuthorization: true },
}));

// ─── Health ───────────────────────────────────────────────────────────────────
/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Health check
 *     tags: [System]
 *     security: []
 *     responses:
 *       200:
 *         description: Server and DB status
 */
app.get('/api/health', (_req, res) => {
  const db = getDbStatus();
  res.json({
    success:  true,
    status:   'ok',
    db:       db.status,
    dbName:   db.name,
    env:      env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// ─── Seed endpoint (dev only) ─────────────────────────────────────────────────
if (env.NODE_ENV === 'development') {
  app.post('/api/seed', async (_req, res, next) => {
    try {
      const { main: seedSkills }    = await import('./scripts/seedSkills.js');
      const { main: seedCompanies } = await import('./scripts/seedCompanies.js');
      const { main: seedQuestions } = await import('./scripts/seedQuestions.js');
      const { main: seedResources } = await import('./scripts/seedResources.js');
      await seedSkills();
      await seedCompanies();
      await seedQuestions();
      await seedResources();
      res.json({ success: true, message: 'Seed complete' });
    } catch (err) {
      next(err);
    }
  });
}

// ─── API routes ───────────────────────────────────────────────────────────────
app.use('/api/skills',    skillsRouter);

// ─── 404 handler ──────────────────────────────────────────────────────────────
app.use((_req, _res, next) => {
  next(ApiError.notFound('Route not found'));
});

// ─── Central error handler ────────────────────────────────────────────────────
app.use(errorHandler);

// ─── Server startup ───────────────────────────────────────────────────────────
const PORT = env.PORT || 5000;

const start = async () => {
  await connectDB();
  const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📖 API docs at http://localhost:${PORT}/api/docs`);
  });

  // Graceful shutdown
  const shutdown = async (signal) => {
    console.log(`\n${signal} received — shutting down gracefully…`);
    server.close(async () => {
      const mongoose = (await import('mongoose')).default;
      await mongoose.disconnect();
      console.log('MongoDB disconnected. Bye!');
      process.exit(0);
    });
    setTimeout(() => process.exit(1), 10_000);
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT',  () => shutdown('SIGINT'));
};

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
