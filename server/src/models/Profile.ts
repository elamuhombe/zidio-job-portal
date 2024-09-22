//src/models/Profile.ts
import mongoose, { Schema } from "mongoose";
import { IProfile } from "../types";


  const ProfileSchema: Schema<IProfile> = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    resume: { type: String },
    contactDetails: {
      phone: { type: String, required: true },
      address: { type: String, required: true },
    },
    companyInfo: {
      name: { type: String },
      description: { type: String },
    },
  });
  
  const Profile = mongoose.model<IProfile>('Profile', ProfileSchema);
  export {IProfile,Profile};
  