//src/models/JobApplication.ts
import mongoose, { Schema, Document } from 'mongoose';
import { IJobApplication, JobApplicationStatus } from '../types';

// Mongoose schema definition
const jobApplicationSchema: Schema<IJobApplication> = new Schema({
  job_id: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
  job_seeker_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: {
    type: String,
    enum: Object.values(JobApplicationStatus), // Use the enum values from JobApplicationStatus
    default: JobApplicationStatus.APPLIED, // Use the enum value for default
    required: true,
  },
  cover_letter: { type: String, required: true },
  resume: { type: String, required: true },

}, { timestamps: true });

// Mongoose model
const JobApplication = mongoose.model<IJobApplication>('JobApplication', jobApplicationSchema);

// Exporting the types and models
export { IJobApplication, JobApplication };
