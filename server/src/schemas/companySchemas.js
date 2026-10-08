import { z } from 'zod';

export const createCompanySchema = z.object({
  name:        z.string().trim().min(1).max(100),
  industry:    z.string().trim().default('Tech'),
  website:     z.string().url().optional().or(z.literal('')),
  description: z.string().max(2000).default(''),
  typicalRoles:z.array(z.string()).default([]),
  eligibility: z.object({
    minCgpa:          z.number().min(0).max(10).default(0),
    branches:         z.array(z.string()).default([]),
    noActiveBacklogs: z.boolean().default(true),
  }).default({}),
  packageRange: z.object({
    min:      z.number().min(0).optional(),
    max:      z.number().min(0).optional(),
    currency: z.string().default('INR'),
  }).default({}),
});

export const companyQuerySchema = z.object({
  industry:   z.string().optional(),
  confidence: z.enum(['high', 'medium', 'low']).optional(),
  search:     z.string().optional(),
  page:       z.coerce.number().int().min(1).default(1),
  limit:      z.coerce.number().int().min(1).max(100).default(20),
});

export const feedbackVoteSchema = z.object({
  vote:    z.enum(['correct', 'incorrect', 'helpful', 'not_helpful']),
  comment: z.string().max(500).default(''),
});
