'use strict';

const dotenv = require('dotenv');
const path = require('path');

// Load .env from server root
dotenv.config({ path: path.join(__dirname, '../../.env') });

/**
 * Validated environment configuration.
 * The app crashes on startup if a required variable is missing.
 */
const required = (key) => {
  const value = process.env[key];
  if (!value) {
    console.error(`[config] Missing required environment variable: ${key}`);
    process.exit(1);
  }
  return value;
};

const optional = (key, defaultValue = '') => process.env[key] || defaultValue;

const env = {
  NODE_ENV: optional('NODE_ENV', 'development'),
  PORT: parseInt(optional('PORT', '5000'), 10),
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV !== 'production',

  // MongoDB — required in production, optional in dev (server starts without it)
  MONGODB_URI: process.env.NODE_ENV === 'production'
    ? required('MONGODB_URI')
    : optional('MONGODB_URI', ''),

  // JWT — required for auth (Phase 4)
  JWT_ACCESS_SECRET: optional('JWT_ACCESS_SECRET', 'dev-access-secret-change-in-prod'),
  JWT_REFRESH_SECRET: optional('JWT_REFRESH_SECRET', 'dev-refresh-secret-change-in-prod'),
  JWT_ACCESS_EXPIRES_IN: optional('JWT_ACCESS_EXPIRES_IN', '15m'),
  JWT_REFRESH_EXPIRES_IN: optional('JWT_REFRESH_EXPIRES_IN', '7d'),

  // CORS
  CLIENT_URL: optional('CLIENT_URL', 'http://localhost:5173'),

  // AI service
  AI_SERVICE_URL: optional('AI_SERVICE_URL', 'http://localhost:8000'),

  // LLM providers (Phase 5)
  GEMINI_API_KEY: optional('GEMINI_API_KEY'),
  GROQ_API_KEY: optional('GROQ_API_KEY'),
  OPENROUTER_API_KEY: optional('OPENROUTER_API_KEY'),
  OLLAMA_BASE_URL: optional('OLLAMA_BASE_URL', 'http://localhost:11434'),

  // External APIs
  ADZUNA_APP_ID: optional('ADZUNA_APP_ID'),
  ADZUNA_APP_KEY: optional('ADZUNA_APP_KEY'),
  GITHUB_TOKEN: optional('GITHUB_TOKEN'),
  TAVILY_API_KEY: optional('TAVILY_API_KEY'),

  // Demo Mode
  DEMO_MODE: optional('DEMO_MODE', 'false') === 'true',
};

module.exports = env;
