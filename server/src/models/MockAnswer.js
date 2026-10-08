import mongoose from 'mongoose';
const { Schema, model } = mongoose;

export default model('MockAnswer', new Schema(
  {
    sessionId:     { type: Schema.Types.ObjectId, ref: 'MockSession', required: true, index: true },
    questionIndex: { type: Number, required: true },
    question:      { type: String, required: true },
    answer:        { type: String, default: '' },
    transcript:    { type: String, default: '' },  // voice-to-text
    score:         { type: Number, default: null },
    rubricScores: {
      correctness:   { type: Number, default: null },
      depth:         { type: Number, default: null },
      structure:     { type: Number, default: null },
      communication: { type: Number, default: null },
      relevance:     { type: Number, default: null },
    },
    feedback:       { type: String, default: '' },
    improvementTip: { type: String, default: '' },
    modelAnswer:    { type: String, default: '' },
    evidenceQuotes: [{ type: String }],
    timeTaken:      { type: Number, default: 0 },  // seconds
  },
  { timestamps: true }
));
