//src/models/JobApplication.ts
import { Schema, model, Document, Types } from 'mongoose';

interface IJobApplication extends Document {
  job_id: Types.ObjectId;
  job_seeker_id: Types.ObjectId;
  status: 'applied' | 'in_review' | 'interview_scheduled' | 'rejected' | 'hired';
  cover_letter: string;
  resume: string;
  createdAt: Date;
  updatedAt: Date;
}

const jobApplicationSchema = new Schema<IJobApplication>(
  {
    job_id: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
    job_seeker_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
      type: String,
      enum: ['applied', 'in_review', 'interview_scheduled', 'rejected', 'hired'],
      default: 'applied',
      required: true
    },
    cover_letter: { type: String, required: true },
    resume: { type: String, required: true }
  },
  { timestamps: true } // Adds createdAt and updatedAt
);

const JobApplication = model<IJobApplication>('JobApplication', jobApplicationSchema);

export default JobApplication;
