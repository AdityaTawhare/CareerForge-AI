'use strict';

const request = require('supertest');

// Set env vars before requiring the app
process.env.NODE_ENV = 'test';
process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/careerforge_test';
process.env.JWT_ACCESS_SECRET = 'test-access-secret';
process.env.JWT_REFRESH_SECRET = 'test-refresh-secret';

// Mock the DB connection so tests don't need a real MongoDB
jest.mock('../config/db', () => ({
  connectDB: jest.fn().mockResolvedValue(undefined),
  disconnectDB: jest.fn().mockResolvedValue(undefined),
  getDbStatus: jest.fn().mockReturnValue('connected'),
}));

const app = require('../index');

describe('Health Endpoint', () => {
  it('GET /api/health returns 200 with expected fields', async () => {
    const res = await request(app).get('/api/health');

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.status).toBe('ok');
    expect(res.body).toHaveProperty('timestamp');
    expect(res.body).toHaveProperty('uptime');
    expect(res.body).toHaveProperty('db');
  });

  it('GET /api/health includes db status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.body.db).toBe('connected');
  });

  it('GET /unknown-route returns 404', async () => {
    const res = await request(app).get('/api/unknown-route-xyz');

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body).toHaveProperty('code', 'NOT_FOUND');
  });

  it('Error response always has success:false, message, code', async () => {
    const res = await request(app).get('/api/nonexistent');
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('code');
  });
});
