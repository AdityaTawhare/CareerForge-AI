import mongoose from "mongoose";
const { Schema, model } = mongoose;
export default model("Application", new Schema({
  userId:           { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  companyId:        { type: Schema.Types.ObjectId, ref: "Company", required: true },
  role:             { type: String, required: true },
  status:           { type: String, enum: ["wishlist","applied","screening","interview","offer","rejected","accepted"], default: "wishlist", index: true },
  jdId:             { type: Schema.Types.ObjectId, ref: "JobDescription", default: null },
  tailoredResumeId: { type: Schema.Types.ObjectId, ref: "Resume", default: null },
  coverLetter:      { type: String, default: "" },
  notes:            { type: String, default: "" },
  appliedDate:      { type: Date, default: null },
  nextActionDate:   { type: Date, default: null },
  source:           { type: String, default: "" },
}, { timestamps: true }));
