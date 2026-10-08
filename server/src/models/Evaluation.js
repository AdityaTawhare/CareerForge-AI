import mongoose from 'mongoose';
const { Schema, model } = mongoose;

export default model('Evaluation', new Schema(
  {
    sessionId: { type: Schema.Types.ObjectId, ref: 'MockSession', required: true, index: true },
    userId:    { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    scores: {
      technical:     { type: Number, default: 0 },
      communication: { type: Number, default: 0 },
      confidence:    { type: Number, default: 0 },
      overall:       { type: Number, default: 0 },
    },
    strengths:        [{ type: String }],
    weaknesses:       [{ type: String }],
    priorityWeakness: { type: String, default: '' },
    comparison: {
      previousSessionId: { type: Schema.Types.ObjectId, ref: 'MockSession', default: null },
      deltas:            { type: Schema.Types.Mixed, default: {} },
      verdict:           { type: String, default: '' },
    },
    recommendations: [{ type: String }],
  },
  { timestamps: true }
));
