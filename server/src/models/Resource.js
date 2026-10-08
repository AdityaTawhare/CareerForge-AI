import mongoose from 'mongoose';

const { Schema, model } = mongoose;

/**
 * @swagger
 * components:
 *   schemas:
 *     Resource:
 *       type: object
 *       properties:
 *         title: { type: string }
 *         url: { type: string, format: uri }
 *         type: { type: string, enum: [video, article, course, docs, tool, problem] }
 *         isFree: { type: boolean }
 */
const resourceSchema = new Schema(
  {
    title:      { type: String, required: true, trim: true },
    url:        { type: String, required: true, unique: true, index: true },
    type:       { type: String, enum: ['video', 'article', 'course', 'docs', 'tool', 'problem'], required: true },
    topic:      { type: String, default: '', index: true },
    subtopic:   { type: String, default: '' },
    platform:   { type: String, default: '' },  // YouTube, LeetCode, GeeksforGeeks…
    difficulty: { type: String, enum: ['easy', 'medium', 'hard', 'all'], default: 'all' },
    isFree:     { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },
    isUrlAlive: { type: Boolean, default: true },
    lastChecked:{ type: Date, default: null },
    description:{ type: String, default: '' },
    tags:       [{ type: String }],
    votes: {
      helpful:     { type: Number, default: 0 },
      not_helpful: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

resourceSchema.index({ topic: 1, difficulty: 1 });
resourceSchema.index({ title: 'text', tags: 'text' });

export default model('Resource', resourceSchema);
