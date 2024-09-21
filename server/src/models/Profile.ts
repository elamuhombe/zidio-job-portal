//src/models/Profile.ts
import mongoose, { Schema } from "mongoose";
import { IUser } from "./User";

interface IProfile extends Document {
    user: IUser['_id'];
    resume: string; // URL to uploaded resume
    contactDetails: {
      phone: string;
      address: string;
    };
    companyInfo?: {
      name: string;
      description: string;
    };
  }
  
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
  