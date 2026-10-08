import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const trackSchema = new Schema(
  {
    name:   { type: String },
    topics: [{ type: String }],
  },
  { _id: false }
);

/**
 * @swagger
 * components:
 *   schemas:
 *     Roadmap:
 *       type: object
 *       properties:
 *         journeyId: { type: string }
 *         type: { type: string, enum: [placement, improvement] }
 *         progressPercent: { type: number }
 */
const roadmapSchema = new Schema(
  {
    journeyId:       { type: Schema.Types.ObjectId, ref: 'Journey', required: true, index: true },
    userId:          { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    type:            { type: String, enum: ['placement', 'improvement'], default: 'placement' },
    version:         { type: Number, default: 1 },
    tracks:          [trackSchema],
    totalTasks:      { type: Number, default: 0 },
    completedTasks:  { type: Number, default: 0 },
    progressPercent: { type: Number, default: 0 },
    dailyHours:      { type: Number, default: 2 },
    deadline:        { type: Date, default: null },
    adaptiveWeights: { type: Schema.Types.Mixed, default: {} },
    isActive:        { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default model('Roadmap', roadmapSchema);
