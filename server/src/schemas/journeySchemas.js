import { z } from 'zod';
import { JOURNEY_STATES } from '../models/Journey.js';

export const selectTargetSchema = z.object({
  companyId:  z.string().regex(/^[a-f\d]{24}$/i, 'Invalid companyId'),
  role:       z.string().trim().min(1).max(100),
  jdText:     z.string().max(20000).optional(),
  jdUrl:      z.string().url().optional(),
});

export const advanceStateSchema = z.object({
  state: z.enum(JOURNEY_STATES),
});

export const journeyQuerySchema = z.object({
  isActive: z.coerce.boolean().optional(),
  state:    z.enum(JOURNEY_STATES).optional(),
});
