import mongoose from 'mongoose';

const { Schema, model } = mongoose;

/**
 * @swagger
 * components:
 *   schemas:
 *     Company:
 *       type: object
 *       properties:
 *         name: { type: string }
 *         industry: { type: string }
 *         confidence: { type: string, enum: [high, medium, low] }
 */
const companySchema = new Schema(
  {
    name:          { type: String, required: true, trim: true, index: true },
    slug:          { type: String, unique: true, lowercase: true, trim: true },
    industry:      { type: String, default: 'Tech' },
    website:       { type: String, default: '' },
    description:   { type: String, default: '' },
    logoUrl:       { type: String, default: null },
    typicalRoles:  [{ type: String }],
    eligibility: {
      minCgpa:          { type: Number, default: 0 },
      branches:         [{ type: String }],
      noActiveBacklogs: { type: Boolean, default: true },
    },
    packageRange: {
      min:      { type: Number, default: null },
      max:      { type: Number, default: null },
      currency: { type: String, default: 'INR' },
    },
    isVerified:   { type: Boolean, default: false },
    source:       { type: String, default: 'manual' },
    confidence:   { type: String, enum: ['high', 'medium', 'low'], default: 'medium' },
    lastVerified: { type: Date, default: null },
    votes: {
      correct:   { type: Number, default: 0 },
      incorrect: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

// Pre-save: generate slug from name
companySchema.pre('save', function (next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
  next();
});

export default model('Company', companySchema);
