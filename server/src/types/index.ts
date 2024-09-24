import mongoose, { Types } from "mongoose";
import { UserRole } from "./types";


// Base interface for common fields
export interface Base {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

// Export User interface
export interface IUser extends Base {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  profile?: Types.ObjectId; // Use Types.ObjectId for referencing profile
  applied_jobs?: Types.ObjectId[]; // Optional
  posted_jobs?: Types.ObjectId[]; // Optional
  notifications?: Types.ObjectId[]; // Optional
}

// Export the IUserLogin interface
export interface IUserLogin {
  email: string;
  password: string;
}


// Export Job interface
export interface IJob {
  title: string;
  description: string;
  qualifications: string[];
  responsibilities: string[];
  location: string;
  salaryRange?: { min: number; max: number };
  category: ICategory["_id"];
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
}

//Export JobApplication interface
export interface IJobApplication extends Document {
  job_id: Types.ObjectId;
  job_seeker_id: Types.ObjectId;
  status:JobApplicationStatus;
  cover_letter: string;
  resume: string;
  createdAt: Date;
  updatedAt: Date;
}

// Export Profile interface
export interface IProfile {
  user: IUser["_id"];
  resume: string;
  contactDetails: {
    phone: string;
    address: string;
  };
  companyInfo?: {
    name: string;
    description: string;
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
export {
  // Base interface for common fields
  UserRole
};

