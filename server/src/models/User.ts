//src/models/User.ts
import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "../types";

const UserSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["jobSeeker", "employer", "admin"],
    required: true,
  },
  profile: { type: Schema.Types.ObjectId, ref: "Profile" },
});

const User = mongoose.model<IUser>("User", UserSchema);
export { IUser, User };
