import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const gapItemSchema = new Schema(
  {
    skill:     { type: String },
    required:  { type: Number, min: 0, max: 100 },
    current:   { type: Number, min: 0, max: 100 },
    severity:  { type: String, enum: ['critical', 'moderate', 'minor'] },
  },
  { _id: false }
);

const roundGapSchema = new Schema(
  {
    roundId:   { type: Schema.Types.ObjectId, ref: 'CompanyRound' },
    roundType: { type: String },
    gaps:      [gapItemSchema],
  },
  { _id: false }
);

/**
 * @swagger
 * components:
 *   schemas:
 *     GapReport:
 *       type: object
 *       properties:
 *         journeyId: { type: string }
 *         overallMatch: { type: number, minimum: 0, maximum: 100 }
 */
const gapReportSchema = new Schema(
  {
    journeyId:    { type: Schema.Types.ObjectId, ref: 'Journey', required: true, index: true },
    userId:       { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    overallMatch: { type: Number, min: 0, max: 100, default: 0 },
    sectionScores: {
      resume:    { type: Number, default: 0 },
      technical: { type: Number, default: 0 },
      aptitude:  { type: Number, default: 0 },
      hr:        { type: Number, default: 0 },
      projects:  { type: Number, default: 0 },
    },
    roundWiseGaps:   [roundGapSchema],
    strengths:       [{ type: String }],
    weaknesses:      [{ type: String }],
    recommendations: [{ type: String }],
    graphData:       { type: Schema.Types.Mixed, default: null },
  },
  { timestamps: true }
);

export default model('GapReport', gapReportSchema);
