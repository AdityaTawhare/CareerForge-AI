/**
 * Skills Service Unit Tests
 * Uses mongodb-memory-server for real in-memory MongoDB.
 */
import { jest } from '@jest/globals';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import SkillsTaxonomy from '../models/SkillsTaxonomy.js';

// --- Silence pino in tests ---
process.env.NODE_ENV = 'test';

let mongod;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  await mongoose.connect(mongod.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

afterEach(async () => {
  await SkillsTaxonomy.deleteMany({});
});

describe('SkillsTaxonomy Model', () => {
  it('creates a valid skill', async () => {
    const skill = await SkillsTaxonomy.create({
      name: 'Arrays & Strings',
      category: 'technical',
      subcategory: 'DSA',
    });
    expect(skill._id).toBeDefined();
    expect(skill.name).toBe('Arrays & Strings');
    expect(skill.category).toBe('technical');
  });

  it('requires name and category', async () => {
    await expect(SkillsTaxonomy.create({ name: 'X' })).rejects.toThrow();
    await expect(SkillsTaxonomy.create({ category: 'technical' })).rejects.toThrow();
  });

  it('enforces unique name', async () => {
    await SkillsTaxonomy.create({ name: 'Python', category: 'technical' });
    await expect(
      SkillsTaxonomy.create({ name: 'Python', category: 'technical' })
    ).rejects.toThrow();
  });

  it('rejects invalid category', async () => {
    await expect(
      SkillsTaxonomy.create({ name: 'Yoga', category: 'fitness' })
    ).rejects.toThrow();
  });

  it('sets default level to intermediate', async () => {
    const skill = await SkillsTaxonomy.create({ name: 'Docker', category: 'technical' });
    expect(skill.level).toBe('intermediate');
  });
});

describe('SkillsService', () => {
  let skillsService;

  beforeAll(async () => {
    const mod = await import('../modules/skills/skills.service.js');
    skillsService = mod.default;
  });

  beforeEach(async () => {
    await SkillsTaxonomy.insertMany([
      { name: 'Python',     category: 'technical', subcategory: 'Languages' },
      { name: 'Java',       category: 'technical', subcategory: 'Languages' },
      { name: 'Leadership', category: 'soft',      subcategory: 'Management' },
    ]);
  });

  it('lists all skills with pagination', async () => {
    const result = await skillsService.listSkills({ page: 1, limit: 10 });
    expect(result.data).toHaveLength(3);
    expect(result.total).toBe(3);
  });

  it('filters by category', async () => {
    const result = await skillsService.listSkills({ category: 'soft', page: 1, limit: 10 });
    expect(result.data).toHaveLength(1);
    expect(result.data[0].name).toBe('Leadership');
  });

  it('getSkillById returns correct skill', async () => {
    const created = await SkillsTaxonomy.create({ name: 'Go', category: 'technical' });
    const found   = await skillsService.getSkillById(created._id.toString());
    expect(found.name).toBe('Go');
  });

  it('getSkillById throws 404 for unknown id', async () => {
    const fakeId = new mongoose.Types.ObjectId().toString();
    await expect(skillsService.getSkillById(fakeId)).rejects.toMatchObject({
      statusCode: 404,
      code: 'NOT_FOUND',
    });
  });

  it('createSkill throws 409 for duplicate name', async () => {
    await expect(
      skillsService.createSkill({ name: 'Python', category: 'technical' })
    ).rejects.toMatchObject({ statusCode: 409, code: 'CONFLICT' });
  });

  it('deleteSkill removes the skill', async () => {
    const skill = await SkillsTaxonomy.create({ name: 'COBOL', category: 'technical' });
    await skillsService.deleteSkill(skill._id.toString());
    const found = await SkillsTaxonomy.findById(skill._id);
    expect(found).toBeNull();
  });
});

describe('ApiError', () => {
  it('has correct factory methods', async () => {
    const { ApiError } = await import('../utils/ApiError.js');
    expect(ApiError.notFound().statusCode).toBe(404);
    expect(ApiError.badRequest().statusCode).toBe(400);
    expect(ApiError.unauthorized().statusCode).toBe(401);
    expect(ApiError.conflict().statusCode).toBe(409);
    expect(ApiError.internal().statusCode).toBe(500);
  });
});

describe('Pagination helper', () => {
  it('paginatedResponse returns correct meta', async () => {
    const { paginatedResponse } = await import('../middleware/paginate.js');
    const result = paginatedResponse([1, 2, 3], 50, { page: 2, limit: 10 });
    expect(result.meta.totalPages).toBe(5);
    expect(result.meta.hasNext).toBe(true);
    expect(result.meta.hasPrev).toBe(true);
    expect(result.meta.total).toBe(50);
  });
});
