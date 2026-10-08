import mongoose from 'mongoose';
const { Schema, model } = mongoose;

export default model('Attempt', new Schema(
  {
    userId:     { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    questionId: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
    type:       { type: String, enum: ['aptitude', 'technical', 'coding', 'hr'] },
    answer:     { type: String, default: '' },
    isCorrect:  { type: Boolean, default: false },
    score:      { type: Number, default: 0 },
    timeTaken:  { type: Number, default: 0 },  // seconds
  },
  { timestamps: true }
));
