import mongoose, { Schema } from "mongoose";
import { IUser, UserRole } from "../types";

const UserSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: Object.values(UserRole), // Use UserRole enum values
    required: true,
  },
  profile: { type: Schema.Types.ObjectId, ref: "Profile" },
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt

const User = mongoose.model<IUser>("User", UserSchema);
export { IUser, User };
