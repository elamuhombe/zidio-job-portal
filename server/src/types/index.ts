//src/types/index.ts

import mongoose from "mongoose";

//Export User interface
export interface IUser {
  _id: mongoose.Types.ObjectId; // Explicitly declare _id field
  username: string;
  email: string;
  password: string;
  role: "jobSeeker" | "employer" | "admin";
  profile?: IProfile;
}
// Export the IUserLogin
export interface IUserLogin {
  email: string;
  password: string;
}

// Export UserRole type based on IUser
export type UserRole = IUser["role"];

//Export the IUserSignup
export interface IUserSignUp {
  username: string;
  email: string;
  password: string;
  role: UserRole;
}
// Export the Job interface
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

//Export Category interface
export interface ICategory {
  _id: mongoose.Types.ObjectId;
  name: string;
  image: string;
}
