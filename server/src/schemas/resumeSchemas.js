import { z } from 'zod';
import { objectId } from './userSchemas.js';

export const createResumeSchema = z.object({
  label:    z.string().trim().max(100).default('My Resume'),
  rawText:  z.string().min(50, 'Resume text too short').max(50000),
  fileType: z.enum(['pdf', 'docx', 'txt', 'paste']).default('paste'),
  fileUrl:  z.string().url().optional(),
});

export const updateResumeSchema = z.object({
  label:    z.string().trim().max(100).optional(),
  isActive: z.boolean().optional(),
  parsedData: z.object({
    contact:       z.any().optional(),
    summary:       z.string().optional(),
    skills:        z.array(z.any()).optional(),
    experience:    z.array(z.any()).optional(),
    projects:      z.array(z.any()).optional(),
    education:     z.array(z.any()).optional(),
    achievements:  z.array(z.string()).optional(),
  }).optional(),
});

export const resumeIdSchema = z.object({ id: objectId });
