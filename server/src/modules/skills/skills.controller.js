import skillsService from './skills.service.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { paginatedResponse } from '../../middleware/paginate.js';

/**
 * @swagger
 * tags:
 *   name: Skills
 *   description: Skills taxonomy management
 */

/**
 * @swagger
 * /api/skills:
 *   get:
 *     summary: List skills (paginated, filterable)
 *     tags: [Skills]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema: { type: string, enum: [technical, soft, domain] }
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20 }
 *     responses:
 *       200:
 *         description: Paginated list of skills
 */
export const listSkills = asyncHandler(async (req, res) => {
  const { category, search, page, limit } = req.query;
  const result = await skillsService.listSkills({ category, search, page, limit });
  const paginated = paginatedResponse(result.data, result.total, { page: result.page, limit: result.limit });
  return ApiResponse.ok(res, paginated.data, 'Skills fetched', paginated.meta);
});

/**
 * @swagger
 * /api/skills/{id}:
 *   get:
 *     summary: Get skill by ID
 *     tags: [Skills]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Skill found }
 *       404: { description: Not found }
 */
export const getSkill = asyncHandler(async (req, res) => {
  const skill = await skillsService.getSkillById(req.params.id);
  return ApiResponse.ok(res, skill);
});

/**
 * @swagger
 * /api/skills:
 *   post:
 *     summary: Create a new skill (admin only)
 *     tags: [Skills]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/SkillsTaxonomy' }
 *     responses:
 *       201: { description: Skill created }
 *       409: { description: Skill already exists }
 */
export const createSkill = asyncHandler(async (req, res) => {
  const skill = await skillsService.createSkill(req.body);
  return ApiResponse.created(res, skill, 'Skill created');
});

/**
 * @swagger
 * /api/skills/{id}:
 *   put:
 *     summary: Update skill (admin only)
 *     tags: [Skills]
 */
export const updateSkill = asyncHandler(async (req, res) => {
  const skill = await skillsService.updateSkill(req.params.id, req.body);
  return ApiResponse.ok(res, skill, 'Skill updated');
});

/**
 * @swagger
 * /api/skills/{id}:
 *   delete:
 *     summary: Delete skill (admin only)
 *     tags: [Skills]
 */
export const deleteSkill = asyncHandler(async (req, res) => {
  await skillsService.deleteSkill(req.params.id);
  return ApiResponse.noContent(res);
});
