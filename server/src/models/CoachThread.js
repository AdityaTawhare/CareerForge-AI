import mongoose from "mongoose";
const { Schema, model } = mongoose;
const msgSchema = new Schema({ role: { type: String, enum: ["user","assistant"] }, content: String, sources: [{ title: String, url: String }], timestamp: { type: Date, default: Date.now } }, { _id: false });
export default model("CoachThread", new Schema({ userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true }, messages: [msgSchema], topic: { type: String, default: "" } }, { timestamps: true }));
