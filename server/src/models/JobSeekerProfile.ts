// src/models/JobSeekerProfile.ts
import mongoose, { Schema, Document } from 'mongoose';
import { IJobSeekerProfile } from '../types';

// Create a Mongoose document type that extends IJobSeekerProfile
export type JobSeekerProfileDocument = Document & IJobSeekerProfile;

// Define the JobSeekerProfile Schema
const JobSeekerProfileSchema: Schema<JobSeekerProfileDocument> = new Schema<JobSeekerProfileDocument>(
  {
    // User reference
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    
    // Contact details
    contactDetails: {
      phone: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String }, // Optional field
    },
    
    // Profile resume (optional)
    profile_resume: { type: String }, // Optional field from Profile
    
    // User ID (unique)
    user_id: { type: Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
    
    // Resume field with validation for PDF format
    resume: {
      type: String,
      required: true,
      validate: {
        validator: (v: string) => {
          // Check if the resume link ends with .pdf
          return v.endsWith('.pdf');
        },
        message: (props) => `${props.value} is not a valid PDF file!`, // Custom error message
      },
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Create the JobSeekerProfile model
const JobSeekerProfile = mongoose.model<JobSeekerProfileDocument>('JobSeekerProfile', JobSeekerProfileSchema);

// Export the model and the interface
export { IJobSeekerProfile, JobSeekerProfile };
