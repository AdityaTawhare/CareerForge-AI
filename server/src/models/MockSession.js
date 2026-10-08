import mongoose from 'mongoose';

const { Schema, model } = mongoose;

/**
 * @swagger
 * components:
 *   schemas:
 *     MockSession:
 *       type: object
 *       properties:
 *         userId: { type: string }
 *         roundType: { type: string }
 *         status: { type: string, enum: [setup, in_progress, completed, abandoned] }
 *         overallScore: { type: number }
 */
const mockSessionSchema = new Schema(
  {
    userId:        { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    journeyId:     { type: Schema.Types.ObjectId, ref: 'Journey', index: true },
    companyId:     { type: Schema.Types.ObjectId, ref: 'Company', default: null },
    roundType:     { type: String, enum: ['aptitude', 'technical', 'hr', 'coding', 'system_design', 'group_discussion', 'other'], required: true },
    difficulty:    { type: Number, min: 1, max: 5, default: 3 },
    duration:      { type: Number, default: 60 },      // minutes
    questionCount: { type: Number, default: 5 },
    status:        { type: String, enum: ['setup', 'in_progress', 'completed', 'abandoned'], default: 'setup', index: true },
    startedAt:     { type: Date, default: null },
    completedAt:   { type: Date, default: null },
    overallScore:  { type: Number, default: null },
    overallFeedback: { type: String, default: '' },
    metrics: {
      technical:     { type: Number, default: null },
      communication: { type: Number, default: null },
      confidence:    { type: Number, default: null },
      relevance:     { type: Number, default: null },
    },
    speechMetrics: {
      wpm:              { type: Number, default: null },
      fillerCount:      { type: Number, default: null },
      pauseCount:       { type: Number, default: null },
      avgPauseDuration: { type: Number, default: null },
    },
    cameraMetrics: {
      facePresencePercent: { type: Number, default: null },
      gazeScore:           { type: Number, default: null },
      postureScore:        { type: Number, default: null },
    },
    isFirstMock: { type: Boolean, default: false },
  },
  { timestamps: true }
);

mockSessionSchema.index({ userId: 1, createdAt: -1 });

export default model('MockSession', mockSessionSchema);
