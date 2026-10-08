import mongoose from "mongoose";
const { Schema, model } = mongoose;
export default model("FeedbackVote", new Schema({ userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, targetType: { type: String, enum: ["company","round","question","resource"] }, targetId: { type: Schema.Types.ObjectId }, vote: { type: String, enum: ["correct","incorrect","helpful","not_helpful"] }, comment: { type: String, default: "" } }, { timestamps: true }));
