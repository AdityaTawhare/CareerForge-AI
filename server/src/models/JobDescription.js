import mongoose from 'mongoose';

const { Schema, model } = mongoose;

/**
 * @swagger
 * components:
 *   schemas:
 *     JobDescription:
 *       type: object
 *       properties:
 *         userId: { type: string }
 *         companyId: { type: string }
 *         role: { type: string }
 */
const jobDescriptionSchema = new Schema(
  {
    userId:    { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true, index: true },
    role:      { type: String, required: true, trim: true },
    rawText:   { type: String, default: '' },
    sourceUrl: { type: String, default: '' },
    parsed: {
      mustHaveSkills:   [{ type: String }],
      niceToHaveSkills: [{ type: String }],
      tools:            [{ type: String }],
      experienceRange:  { type: String, default: '' },
      responsibilities: [{ type: String }],
      keywords:         [{ type: String }],
      educationReq:     { type: String, default: '' },
      otherReq:         [{ type: String }],
    },
  },
  { timestamps: true }
);

export default model('JobDescription', jobDescriptionSchema);
