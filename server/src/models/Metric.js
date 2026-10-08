import mongoose from "mongoose";
const { Schema, model } = mongoose;
export default model("Metric", new Schema({ sessionId: { type: Schema.Types.ObjectId, ref: "MockSession", required: true, index: true }, userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, type: { type: String, enum: ["speech","camera"], required: true }, data: { type: Schema.Types.Mixed, default: {} } }, { timestamps: true }));
