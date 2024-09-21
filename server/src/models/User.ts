//src/models/User.ts
import mongoose, { Schema, Document } from 'mongoose';
import { IProfile } from './Profile';

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: 'jobSeeker' | 'employer';
  profile?: IProfile;
}

const UserSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['jobSeeker', 'employer'], required: true },
  profile: { type: Schema.Types.ObjectId, ref: 'Profile' },
});

const User = mongoose.model<IUser>('User', UserSchema);
export  {IUser,User};
