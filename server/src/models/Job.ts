//src/models/Job.ts
import mongoose, { Schema, Document } from "mongoose";
import { IJob } from "../types";

// Mongoose schema definition
const JobSchema: Schema<IJob> = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    qualifications: [{ type: String }],
    responsibilities: [{ type: String }],
    location: { type: String, required: true },
    salaryRange: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
    },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true }, // Reference to Category
    company: { type: String, required: true },
    employer_id: { type: Schema.Types.ObjectId, ref: "User", required: true }
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Mongoose model
const Job = mongoose.model<IJob>("Job", JobSchema);

// Exporting the types and models
export { IJob, Job };
