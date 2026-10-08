import mongoose from 'mongoose';

const { Schema, model } = mongoose;

/**
 * @swagger
 * components:
 *   schemas:
 *     RoadmapTask:
 *       type: object
 *       properties:
 *         roadmapId: { type: string }
 *         title: { type: string }
 *         status: { type: string, enum: [pending, in_progress, completed, skipped] }
 */
const roadmapTaskSchema = new Schema(
  {
    roadmapId:         { type: Schema.Types.ObjectId, ref: 'Roadmap', required: true, index: true },
    track:             { type: String, default: '' },
    topic:             { type: String, default: '' },
    title:             { type: String, required: true },
    description:       { type: String, default: '' },
    taskType:          { type: String, enum: ['learn', 'practice', 'quiz', 'project', 'review'], default: 'learn' },
    resourceIds:       [{ type: Schema.Types.ObjectId, ref: 'Resource' }],
    difficulty:        { type: Number, min: 1, max: 5, default: 3 },
    estimatedMinutes:  { type: Number, default: 30 },
    scheduledDate:     { type: Date, default: null },
    status:            { type: String, enum: ['pending', 'in_progress', 'completed', 'skipped'], default: 'pending', index: true },
    feedback:          { type: String, enum: ['too_easy', 'just_right', 'too_hard', null], default: null },
    completedAt:       { type: Date, default: null },
    order:             { type: Number, default: 0 },
    dependencies:      [{ type: Schema.Types.ObjectId, ref: 'RoadmapTask' }],
  },
  { timestamps: true }
);

roadmapTaskSchema.index({ roadmapId: 1, scheduledDate: 1 });
roadmapTaskSchema.index({ roadmapId: 1, status: 1 });

export default model('RoadmapTask', roadmapTaskSchema);
