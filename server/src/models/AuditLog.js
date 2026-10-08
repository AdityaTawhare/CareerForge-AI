import mongoose from "mongoose";
const { Schema, model } = mongoose;
export default model("AuditLog", new Schema({ userId: { type: Schema.Types.ObjectId, ref: "User", index: true }, action: { type: String, required: true }, targetType: { type: String }, targetId: { type: Schema.Types.ObjectId }, details: { type: Schema.Types.Mixed, default: {} }, ip: { type: String }, userAgent: { type: String } }, { timestamps: true }));
