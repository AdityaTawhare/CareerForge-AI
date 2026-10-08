import mongoose from "mongoose";
const { Schema, model } = mongoose;
export default model("QuotaUsage", new Schema({ provider: { type: String, required: true, index: true }, date: { type: String, required: true, index: true }, userId: { type: Schema.Types.ObjectId, ref: "User", default: null }, tokensUsed: { type: Number, default: 0 }, requestCount: { type: Number, default: 0 } }, { timestamps: true }));
