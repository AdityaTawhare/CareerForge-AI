import { Router } from 'express';
import { validateRequest } from '../../middleware/validateRequest.js';
import { paginate } from '../../middleware/paginate.js';
import { skillQuerySchema, createSkillSchema } from '../../schemas/miscSchemas.js';
import {
  listSkills, getSkill, createSkill, updateSkill, deleteSkill,
} from './skills.controller.js';

const router = Router();

router.get(
  '/',
  paginate(),
  validateRequest({ query: skillQuerySchema }),
  listSkills,
);

router.get('/:id', getSkill);

// Admin-only in Phase 5 (auth middleware added later)
router.post(
  '/',
  validateRequest({ body: createSkillSchema }),
  createSkill,
);

router.put('/:id', updateSkill);
router.delete('/:id', deleteSkill);

export default router;
