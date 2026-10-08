import mongoose from 'mongoose';

const { Schema, model } = mongoose;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id: { type: string }
 *         email: { type: string, format: email }
 *         role: { type: string, enum: [student, mentor, admin] }
 *         firstName: { type: string }
 *         lastName: { type: string }
 *         isEmailVerified: { type: boolean }
 *         isOnboarded: { type: boolean }
 *         createdAt: { type: string, format: date-time }
 */
const userSchema = new Schema(
  {
    email:           { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    passwordHash:    { type: String, required: true, select: false },
    role:            { type: String, enum: ['student', 'mentor', 'admin'], default: 'student', index: true },
    firstName:       { type: String, required: true, trim: true },
    lastName:        { type: String, required: true, trim: true },
    avatar:          { type: String, default: null },
    isEmailVerified: { type: Boolean, default: false },
    isOnboarded:     { type: Boolean, default: false },
    lastLogin:       { type: Date, default: null },
    preferences: {
      theme:        { type: String, enum: ['light', 'dark', 'system'], default: 'system' },
      language:     { type: String, default: 'en' },
      reduceMotion: { type: Boolean, default: false },
    },
    consent: {
      termsAccepted:   { type: Boolean, default: false },
      privacyAccepted: { type: Boolean, default: false },
      aiProcessing:    { type: Boolean, default: false },
      consentDate:     { type: Date, default: null },
    },
  },
  { timestamps: true }
);

// Virtual: fullName
userSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Ensure passwordHash is never exposed in JSON responses
userSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => {
    delete ret.passwordHash;
    delete ret.__v;
    return ret;
  },
});

export default model('User', userSchema);
