import mongoose from 'mongoose';

const { Schema, model } = mongoose;

export const JOURNEY_STATES = [
  'ACCOUNT_CREATED',
  'RESUME_STAGE',
  'PROFILE_READY',
  'TARGET_SELECTED',
  'JD_ANALYZED',
  'GAP_ANALYZED',
  'ROADMAP1_ACTIVE',
  'MOCK1_DONE',
  'ROADMAP2_ACTIVE',
  'MOCK2_DONE',
  'READINESS_CHECK',
  'FINAL_PREP',
  'READY_TO_APPLY',
];

const stateHistorySchema = new Schema(
  {
    state:     { type: String, enum: JOURNEY_STATES },
    enteredAt: { type: Date, default: Date.now },
    exitedAt:  { type: Date, default: null },
  },
  { _id: false }
);

/**
 * @swagger
 * components:
 *   schemas:
 *     Journey:
 *       type: object
 *       properties:
 *         userId: { type: string }
 *         state: { type: string, enum: [ACCOUNT_CREATED, RESUME_STAGE, PROFILE_READY, TARGET_SELECTED, JD_ANALYZED, GAP_ANALYZED, ROADMAP1_ACTIVE, MOCK1_DONE, ROADMAP2_ACTIVE, MOCK2_DONE, READINESS_CHECK, FINAL_PREP, READY_TO_APPLY] }
 *         readinessScore: { type: number }
 *         isActive: { type: boolean }
 */
const journeySchema = new Schema(
  {
    userId:           { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    companyId:        { type: Schema.Types.ObjectId, ref: 'Company', default: null },
    jobDescriptionId: { type: Schema.Types.ObjectId, ref: 'JobDescription', default: null },
    role:             { type: String, default: '' },
    state:            { type: String, enum: JOURNEY_STATES, default: 'ACCOUNT_CREATED', index: true },
    stateHistory:     [stateHistorySchema],
    readinessScore:   { type: Number, min: 0, max: 100, default: 0 },
    isActive:         { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

// Compound: active journey for user
journeySchema.index({ userId: 1, isActive: 1 });

export default model('Journey', journeySchema);
