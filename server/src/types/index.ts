import mongoose, { Types } from "mongoose";

// Define UserRole enum
export enum UserRole {
  JOB_SEEKER = "job_seeker",    
  EMPLOYER = "employer",
  USER = "user",
  ADMIN = "admin"
}

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

// Export the IUserSignUp interface
export interface IUserSignUp {
  username: string;
  email: string;
  password: string;
  role: UserRole; // Use the enum here
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
  company: string;
  createdAt?: Date;
  updatedAt?: Date;
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
