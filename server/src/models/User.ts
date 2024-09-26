//src/models/User.ts
import mongoose, { Schema, Document } from 'mongoose';
import { IUser, UserRole } from '../types';

const UserSchema: Schema<IUser & Document> = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: Object.values(UserRole),
    required: true,
  },
  profile: { type: Schema.Types.ObjectId, ref: 'Profile' },
  applied_jobs: [{ type: Schema.Types.ObjectId, ref: 'Job' }],
  posted_jobs: [{ type: Schema.Types.ObjectId, ref: 'Job' }],
  notifications: [{ type: Schema.Types.ObjectId, ref: 'Notification' }],
}, { timestamps: true });

const User = mongoose.model<IUser>('User', UserSchema);

export { IUser, User };
