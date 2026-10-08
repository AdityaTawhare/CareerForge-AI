import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const skillEntrySchema = new Schema(
  {
    skillId:    { type: Schema.Types.ObjectId, ref: 'SkillsTaxonomy', required: true },
    skillName:  { type: String, required: true },
    level:      { type: Number, min: 0, max: 100, default: 0 },  // 0–100 self-rated
  },
  { _id: false }
);

/**
 * @swagger
 * components:
 *   schemas:
 *     Profile:
 *       type: object
 *       properties:
 *         userId: { type: string }
 *         college: { type: string }
 *         branch: { type: string }
 *         cgpa: { type: number }
 */
const profileSchema = new Schema(
  {
    userId:             { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
    college:            { type: String, trim: true, default: '' },
    branch:             { type: String, trim: true, default: '' },
    year:               { type: Number, min: 1, max: 6, default: null },
    cgpa:               { type: Number, min: 0, max: 10, default: null },
    goals:              [{ type: String, trim: true }],
    preferredRoles:     [{ type: String, trim: true }],
    selfRatedSkills:    [skillEntrySchema],
    languages:          [{ type: String }],
    location:           { type: String, default: '' },
    linkedIn:           { type: String, default: '' },
    github:             { type: String, default: '' },
    portfolio:          { type: String, default: '' },
    onboardingCompleted:{ type: Boolean, default: false },
  },
  { timestamps: true }
);

export default model('Profile', profileSchema);
