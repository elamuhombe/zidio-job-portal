// src/models/Profile.ts
import mongoose, { Schema, Document } from "mongoose";
import { IProfile } from "../types";

// Create a Mongoose document type that extends IProfile
export type ProfileDocument = Document & IProfile;

const ProfileSchema: Schema<ProfileDocument> = new Schema<ProfileDocument>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  contactDetails: {
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: false }, // Optional
  },
  profile_resume: { type: String, required: false }, // Optional
  user_id: { type: Schema.Types.ObjectId, ref: "User", unique: true, required: true },
});

// Create the Profile model
const Profile = mongoose.model<ProfileDocument>('Profile', ProfileSchema);

// Export both the IProfile interface and the Profile model
export { IProfile, Profile };
