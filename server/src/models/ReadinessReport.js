import mongoose from 'mongoose';
const { Schema, model } = mongoose;

export default model('ReadinessReport', new Schema(
  {
    journeyId:  { type: Schema.Types.ObjectId, ref: 'Journey', required: true, index: true },
    userId:     { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    companyId:  { type: Schema.Types.ObjectId, ref: 'Company', default: null },
    overallScore: { type: Number, min: 0, max: 100, default: 0 },
    roundScores:  [{ roundType: String, score: Number, details: Schema.Types.Mixed }],
    formulaBreakdown: {
      resumeMatch: { type: Number, default: 0 },
      technical:   { type: Number, default: 0 },
      aptitude:    { type: Number, default: 0 },
      hr:          { type: Number, default: 0 },
      projects:    { type: Number, default: 0 },
      weights:     { type: Schema.Types.Mixed, default: {} },
    },
    decision:   { type: String, enum: ['ready', 'not_ready'], default: 'not_ready' },
    reasons:    [{ type: String }],
    nextSteps:  [{ type: String }],
    threshold:  { type: Number, default: 75 },
    overridden: { type: Boolean, default: false },
  },
  { timestamps: true }
));
