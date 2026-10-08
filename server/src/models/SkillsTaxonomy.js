import mongoose from 'mongoose';

const { Schema, model } = mongoose;

/**
 * @swagger
 * components:
 *   schemas:
 *     SkillsTaxonomy:
 *       type: object
 *       properties:
 *         name: { type: string }
 *         category: { type: string, enum: [technical, soft, domain] }
 *         subcategory: { type: string }
 */
const skillsTaxonomySchema = new Schema(
  {
    name:          { type: String, required: true, unique: true, trim: true, index: true },
    category:      { type: String, enum: ['technical', 'soft', 'domain'], required: true, index: true },
    subcategory:   { type: String, trim: true, default: '' },
    aliases:       [{ type: String, trim: true }],
    relatedSkills: [{ type: String }],
    level:         { type: String, enum: ['beginner', 'intermediate', 'advanced', 'expert'], default: 'intermediate' },
    description:   { type: String, default: '' },
    isVerified:    { type: Boolean, default: false },
    source:        { type: String, default: 'manual' },
  },
  { timestamps: true }
);

skillsTaxonomySchema.index({ name: 'text', aliases: 'text' }); // text search

export default model('SkillsTaxonomy', skillsTaxonomySchema);
