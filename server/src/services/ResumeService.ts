//src/services/ResumeService.ts
import { Profile } from "../models";
import { IProfile } from "../types";
import { HttpError, ResourceNotFound } from "../middleware/Error";
import { Types } from "mongoose";
import { uploadToMega } from "../middleware/MegaUpload";

export class ResumeService {
    public async uploadResume(user_id: Types.ObjectId, filePath: string, filename: string): Promise<{
        message: string;
        profile: IProfile;
    }> {
        try {
            const userProfile = await Profile.findOne({ user_id });

            if (!userProfile) {
                throw new ResourceNotFound("User Profile Not Found");
            }

            const resume = await uploadToMega(filePath, filename);
            const updatedProfile = await Profile.findByIdAndUpdate(userProfile._id, { profile_resume: resume }, { new: true });

            if (!updatedProfile) {
                throw new ResourceNotFound("Failed to update profile");
            }

            return {
                message: "Resume Upload Successful",
                profile: updatedProfile
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
