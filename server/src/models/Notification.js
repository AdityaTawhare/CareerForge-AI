import mongoose from "mongoose";
const { Schema, model } = mongoose;
export default model("Notification", new Schema({ userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true }, type: { type: String, default: "info" }, title: { type: String }, message: { type: String }, link: { type: String, default: "" }, isRead: { type: Boolean, default: false } }, { timestamps: true }));
