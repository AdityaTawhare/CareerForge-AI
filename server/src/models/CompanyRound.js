import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const ROUND_TYPES = ['aptitude', 'technical', 'hr', 'group_discussion', 'coding', 'system_design', 'other'];

/**
 * @swagger
 * components:
 *   schemas:
 *     CompanyRound:
 *       type: object
 *       properties:
 *         companyId: { type: string }
 *         roundNumber: { type: integer }
 *         roundType: { type: string }
 */
const companyRoundSchema = new Schema(
  {
    companyId:     { type: Schema.Types.ObjectId, ref: 'Company', required: true, index: true },
    roundNumber:   { type: Number, required: true, min: 1 },
    roundType:     { type: String, enum: ROUND_TYPES, required: true },
    name:          { type: String, trim: true, default: '' },
    format:        { type: String, default: '' },        // e.g. "MCQ, 30 questions, 30 min"
    duration:      { type: Number, default: 60 },        // minutes
    description:   { type: String, default: '' },
    topics:        [{ type: String }],
    skills:        [{ type: String }],
    difficulty:    { type: Number, min: 1, max: 5, default: 3 },
    tips:          [{ type: String }],
    commonQuestions:[{ type: String }],
    source:        { type: String, default: 'manual' },
    confidence:    { type: String, enum: ['high', 'medium', 'low'], default: 'medium' },
    lastVerified:  { type: Date, default: null },
    votes: {
      correct:   { type: Number, default: 0 },
      incorrect: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

companyRoundSchema.index({ companyId: 1, roundNumber: 1 });

export default model('CompanyRound', companyRoundSchema);
