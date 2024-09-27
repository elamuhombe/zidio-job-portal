import { Document, ObjectId, Types } from "mongoose";
import { UserRole } from "./types";

// Base interface for common fields


// Export User interface
export interface IUser  {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  profile?: Types.ObjectId | null;
  applied_jobs?: Types.ObjectId[];
  posted_jobs?: Types.ObjectId[];
  notifications?: Types.ObjectId[];
  __v?: number; // Optional version key for Mongoose
  createdAt?: Date; // Include createdAt
  updatedAt?: Date; // Include updatedAt
  deletedAt?: Date; // Include deletedAt for soft delete
}

// Export the IUserLogin interface
export interface IUserLogin {
  email: string;
  password: string;
}

// Export Job interface
export interface IJob extends Document {
  title: string;
  description: string;
  qualifications?: string[];
  responsibilities?: string[];
  location: string;
  salaryRange?: { min: number; max: number };
  category: Types.ObjectId;
  employer_id: Types.ObjectId;
  applications: Types.ObjectId[];
  company: string;
  createdAt?: Date;
  updatedAt?: Date;
}

//Export Job Status
export enum JobStatus {
  OPEN = "open",
  CLOSED = "closed",
}
//Export JobApplication status
export enum JobApplicationStatus {
  APPLIED = "applied",
  REVIEWED = "reviewed",
  INTERVIEW = "interview",
  HIRED = "hired",
  REJECTED = "rejected",
  NOT_SUBMITTED = "not submitted",
}

//Export JobApplication interface
export interface IJobApplication extends Document {
  _id: Types.ObjectId;
  job_id: Types.ObjectId;
  job_seeker_id: Types.ObjectId;
  status: JobApplicationStatus;
  cover_letter: string;
  resume: string;
  createdAt: Date;
  updatedAt: Date;
}

// Export Profile interface
export interface IProfile {
  _id?: Types.ObjectId;
  user: IUser["_id"];
  contactDetails: {
    phone: string;
    email: string;
    address?: String;
  };
  profile_resume?: string;
  user_id: Types.ObjectId;
}

// Export Category interface
export interface ICategory {
  _id: Types.ObjectId;
  name: string;
  image: string;
}

// Export JwtPayload interface
export interface JwtPayload {
  user_id: string;
  role?: UserRole; // Use the enum here
}
// Employer Profile interface
export interface IEmployerProfile {
  _id?: Types.ObjectId;
  user: IUser["_id"];
  companyInfo: {
    name: string;
    description: string;
  };
  contactDetails: {
    phone: string;
    address: string;
    email: string;
  };
  user_id: Types.ObjectId;
}

// Extend IProfile for Job Seekers
export interface IJobSeekerProfile extends IProfile {
  resume: string; // Now required for job seekers
}
// Mongoose Document Type
export type JobSeekerProfileDocument = IJobSeekerProfile & Document;
export {
  // Base interface for common fields
  UserRole,
};

