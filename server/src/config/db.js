'use strict';

const mongoose = require('mongoose');
const env = require('./env');
const logger = require('../utils/logger');

let isConnected = false;

/**
 * Connect to MongoDB Atlas.
 * Retries are handled by Mongoose's built-in reconnect logic.
 */
const connectDB = async () => {
  if (isConnected) return;

  if (!env.MONGODB_URI) {
    logger.warn('MONGODB_URI not set — running without database (dev mode). Add it to server/.env');
    return;
  }

  try {
    const conn = await mongoose.connect(env.MONGODB_URI, {
      // Mongoose 8+ defaults are fine; these are explicit for clarity
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    isConnected = true;
    logger.info(`MongoDB connected: ${conn.connection.host}`);

    // Handle connection events
    mongoose.connection.on('disconnected', () => {
      isConnected = false;
      logger.warn('MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      isConnected = true;
      logger.info('MongoDB reconnected');
    });

    mongoose.connection.on('error', (err) => {
      logger.error({ err }, 'MongoDB connection error');
    });
  } catch (err) {
    logger.error({ err }, 'Failed to connect to MongoDB');
    // Don't exit in test env — tests use their own DB or mocks
    if (env.NODE_ENV !== 'test') {
      process.exit(1);
    }
  }
};

/**
 * Disconnect from MongoDB (used in tests and graceful shutdown).
 */
const disconnectDB = async () => {
  if (!isConnected) return;
  await mongoose.connection.close();
  isConnected = false;
  logger.info('MongoDB disconnected gracefully');
};

/**
 * Returns 'connected' or 'disconnected' — used by health endpoint.
 */
const getDbStatus = () => (isConnected ? 'connected' : 'disconnected');

module.exports = { connectDB, disconnectDB, getDbStatus };
