//src/Services/ProfileService.ts
import { Profile, User } from "../models";
import { IProfile } from "../types";
import { Conflict, HttpError, ResourceNotFound } from "../middleware/Error";
import { Types } from "mongoose";

export class ProfileService {
    public async createUserProfile(payload: Partial<IProfile>): Promise<{ message: string; profile: IProfile }> {
        try {
            const { user_id } = payload;
            const profileExists = await Profile.findOne({ user_id });

            if (profileExists) {
                throw new Conflict("User has already created a Profile");
            }

            const profile = new Profile(payload);
            const savedProfile = await profile.save();

            await User.findByIdAndUpdate(user_id, { profile: savedProfile._id }, { new: true });

            return {
                message: "Profile Created Successfully",
                profile: savedProfile
            };
        } catch (error) {
            return this.handleError(error);
        }
    }

    public async getUserProfile(user_id: Types.ObjectId): Promise<{ message: string; profile: IProfile }> {
        try {
            const user = await User.findOne({ _id: user_id }).populate('profile');
    
            if (!user) {
                throw new ResourceNotFound("User not found");
            }
    
            // Check if the profile exists and is of the correct type
            const profile = user.profile as IProfile | undefined; // Type assertion
    
            if (!profile) {
                throw new ResourceNotFound("User Profile not Found");
            }
    
            return {
                message: "Profile Fetch Successfully",
                profile: profile // Now correctly typed as IProfile
            };
        } catch (error) {
            return this.handleError(error);
        }
    }
    
    public async updateUserProfile(payload: Partial<IProfile>): Promise<{ message: string; profile: IProfile }> {
        try {
            const { user_id } = payload;
            const profileExists = await Profile.findOne({ user_id });

            if (!profileExists) {
                throw new ResourceNotFound("User Profile not found");
            }

            const updatedProfile = await Profile.findByIdAndUpdate(profileExists._id, payload, { new: true });

            if (!updatedProfile) {
                throw new ResourceNotFound("Failed to update profile");
            }

            await User.findByIdAndUpdate(user_id, { profile: updatedProfile._id }, { new: true });

            return {
                message: "Profile Updated Successfully",
                profile: updatedProfile
            };
        } catch (error) {
            return this.handleError(error);
        }
    }

    public async deleteUserProfile(user_id: Types.ObjectId): Promise<{ message: string }> {
        try {
            const profile = await Profile.findOneAndDelete({ user_id });

            if (!profile) {
                throw new HttpError(404, "Profile not found");
            }

            await User.findByIdAndUpdate(user_id, { profile: null }, { new: true });

            return {
                message: "Profile Deleted Successfully"
            };
        } catch (error) {
            return this.handleError(error);
        }
    }

    private handleError(error: unknown): never {
        if (error instanceof HttpError) {
            throw error;
        } else if (error instanceof Error) {
            throw new HttpError(500, error.message);
        } else {
            throw new HttpError(500, 'An unknown error occurred');
        }
    }
}
