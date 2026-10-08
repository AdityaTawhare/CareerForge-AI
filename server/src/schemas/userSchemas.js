import { z } from 'zod';

/* ── Re-usable field schemas ──────────────────────────────────────────── */
export const objectId = z.string().regex(/^[a-f\d]{24}$/i, 'Invalid ObjectId');
export const paginationSchema = z.object({
  page:  z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  sort:  z.string().optional(),
  order: z.enum(['asc', 'desc']).default('desc'),
});

/* ── User schemas ─────────────────────────────────────────────────────── */
export const registerSchema = z.object({
  firstName: z.string().trim().min(1).max(50),
  lastName:  z.string().trim().min(1).max(50),
  email:     z.string().email().toLowerCase(),
  password:  z.string().min(8).max(128),
  role:      z.enum(['student', 'mentor']).default('student'),
  consent: z.object({
    termsAccepted:   z.literal(true),
    privacyAccepted: z.literal(true),
    aiProcessing:    z.boolean(),
  }),
});

export const loginSchema = z.object({
  email:    z.string().email().toLowerCase(),
  password: z.string().min(1),
});

export const updatePreferencesSchema = z.object({
  theme:        z.enum(['light', 'dark', 'system']).optional(),
  language:     z.string().optional(),
  reduceMotion: z.boolean().optional(),
});
