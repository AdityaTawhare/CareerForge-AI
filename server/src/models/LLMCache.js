import mongoose from "mongoose";
const { Schema, model } = mongoose;
const s = new Schema({ promptHash: { type: String, required: true, unique: true, index: true }, provider: { type: String }, model: { type: String }, promptVersion: { type: String, default: "1" }, input: { type: Schema.Types.Mixed }, output: { type: Schema.Types.Mixed }, tokensUsed: { type: Number, default: 0 }, latencyMs: { type: Number, default: 0 }, expiresAt: { type: Date } }, { timestamps: true });
s.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
export default model("LLMCache", s);
