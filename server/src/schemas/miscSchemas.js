import { z } from 'zod';

export const skillQuerySchema = z.object({
  category:   z.enum(['technical', 'soft', 'domain']).optional(),
  search:     z.string().optional(),
  page:       z.coerce.number().int().min(1).default(1),
  limit:      z.coerce.number().int().min(1).max(100).default(20),
});

export const createSkillSchema = z.object({
  name:        z.string().trim().min(1).max(100),
  category:    z.enum(['technical', 'soft', 'domain']),
  subcategory: z.string().trim().default(''),
  aliases:     z.array(z.string()).default([]),
  description: z.string().max(500).default(''),
  level:       z.enum(['beginner', 'intermediate', 'advanced', 'expert']).default('intermediate'),
});

export const mockSessionSchema = z.object({
  companyId:     z.string().regex(/^[a-f\d]{24}$/i).optional(),
  roundType:     z.enum(['aptitude', 'technical', 'hr', 'coding', 'system_design', 'group_discussion', 'other']),
  difficulty:    z.coerce.number().int().min(1).max(5).default(3),
  duration:      z.coerce.number().int().min(5).max(180).default(60),
  questionCount: z.coerce.number().int().min(1).max(20).default(5),
});
