import mongoose from 'mongoose';

const { Schema, model } = mongoose;

/**
 * @swagger
 * components:
 *   schemas:
 *     Question:
 *       type: object
 *       properties:
 *         type: { type: string, enum: [aptitude, technical, coding, hr] }
 *         topic: { type: string }
 *         difficulty: { type: integer, minimum: 1, maximum: 5 }
 *         question: { type: string }
 */
const testCaseSchema = new Schema(
  { input: String, expectedOutput: String, isHidden: { type: Boolean, default: false } },
  { _id: false }
);

const questionSchema = new Schema(
  {
    type:               { type: String, enum: ['aptitude', 'technical', 'coding', 'hr'], required: true, index: true },
    topic:              { type: String, required: true, trim: true, index: true },
    subtopic:           { type: String, default: '' },
    difficulty:         { type: Number, min: 1, max: 5, required: true },
    question:           { type: String, required: true },
    options:            [{ type: String }],        // For MCQ
    correctAnswer:      { type: String, default: null, select: false },  // Hidden from students
    explanation:        { type: String, default: '' },
    codeTemplate:       { type: String, default: '' },     // For coding questions
    testCases:          [testCaseSchema],
    source:             { type: String, enum: ['seed', 'ai_generated', 'manual'], default: 'seed' },
    isVerified:         { type: Boolean, default: false },
    verificationMethod: { type: String, default: '' },
    companyTags:        [{ type: String }],
    timesAttempted:     { type: Number, default: 0 },
    successRate:        { type: Number, default: null },
  },
  { timestamps: true }
);

questionSchema.index({ type: 1, topic: 1, difficulty: 1 });

export default model('Question', questionSchema);
