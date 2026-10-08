import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const educationSchema = new Schema(
  { institution: String, degree: String, field: String, year: Number, cgpa: Number },
  { _id: false }
);

const experienceSchema = new Schema(
  {
    title: String, company: String, location: String,
    startDate: String, endDate: String, isCurrent: Boolean,
    description: String, tech: [String],
  },
  { _id: false }
);

const projectSchema = new Schema(
  {
    name: String, description: String, tech: [String],
    url: String, github: String, highlights: [String],
  },
  { _id: false }
);

const certSchema = new Schema(
  { name: String, issuer: String, date: String, url: String },
  { _id: false }
);

/**
 * @swagger
 * components:
 *   schemas:
 *     Resume:
 *       type: object
 *       properties:
 *         userId: { type: string }
 *         version: { type: integer }
 *         label: { type: string }
 *         isActive: { type: boolean }
 */
const resumeSchema = new Schema(
  {
    userId:   { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    version:  { type: Number, default: 1 },
    label:    { type: String, trim: true, default: 'My Resume' },
    parsedData: {
      contact: {
        name: String, email: String, phone: String,
        location: String, linkedin: String, github: String, portfolio: String,
      },
      summary:        { type: String, default: '' },
      education:      [educationSchema],
      skills:         [{ name: String, category: String, level: String }],
      experience:     [experienceSchema],
      projects:       [projectSchema],
      certifications: [certSchema],
      achievements:   [{ type: String }],
      links:          [{ label: String, url: String }],
    },
    rawText:   { type: String, default: '' },
    fileUrl:   { type: String, default: null },
    fileType:  { type: String, enum: ['pdf', 'docx', 'txt', 'paste'], default: 'paste' },
    parseConfidence: {
      overall:  { type: Number, default: 0 },
      perField: { type: Schema.Types.Mixed, default: {} },
    },
    atsScore:  { type: Number, default: null },
    isActive:  { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

// Compound index: user's resumes sorted by version
resumeSchema.index({ userId: 1, version: -1 });

export default model('Resume', resumeSchema);
