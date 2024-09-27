// src/services/JobSeekerService.ts

import { JobSeekerProfile } from "../models/JobSeekerProfile"; // Assuming you have a JobSeekerProfile model
import { IJobSeekerProfile } from "../types"; // Assuming you have a corresponding IJobSeekerProfile interface
import { HttpError } from "../middleware/Error"; // Error handling class

export class JobSeekerService {
    // Method to create a new job seeker profile
    public async createProfile(payload: IJobSeekerProfile): Promise<IJobSeekerProfile> {
        try {
            const existingProfile = await JobSeekerProfile.findOne({ user: payload.user });
            if (existingProfile) {
                throw new HttpError(409, "Profile already exists for this user");
            }

            const profile = new JobSeekerProfile(payload);
            const savedProfile = await profile.save();
            return savedProfile;
        } catch (error) {
            if (error instanceof HttpError) {
                throw error; // Propagate custom HttpErrors
            }
            throw new HttpError(500, "Failed to create job seeker profile");
        }
    }

    // Method to get all job seeker profiles
    public async getAllProfiles(): Promise<IJobSeekerProfile[]> {
        try {
            const profiles = await JobSeekerProfile.find();
            return profiles;
        } catch (error) {
            throw new HttpError(500, "Failed to fetch job seeker profiles");
        }
    }

    // Method to get a job seeker profile by ID
    public async getProfileById(id: string): Promise<IJobSeekerProfile> {
        try {
            const profile = await JobSeekerProfile.findById(id);
            if (!profile) {
                throw new HttpError(404, "Job seeker profile not found");
            }
            return profile;
        } catch (error) {
            throw new HttpError(500, "Failed to fetch job seeker profile");
        }
    }

    // Method to update a job seeker profile
    public async updateProfile(id: string, payload: Partial<IJobSeekerProfile>): Promise<IJobSeekerProfile> {
        try {
            const updatedProfile = await JobSeekerProfile.findByIdAndUpdate(id, payload, { new: true });
            if (!updatedProfile) {
                throw new HttpError(404, "Job seeker profile not found");
            }
            return updatedProfile;
        } catch (error) {
            throw new HttpError(500, "Failed to update job seeker profile");
        }
    }

    // Method to delete a job seeker profile
    public async deleteProfile(id: string): Promise<{ message: string }> {
        try {
            const deletedProfile = await JobSeekerProfile.findByIdAndDelete(id);
            if (!deletedProfile) {
                throw new HttpError(404, "Job seeker profile not found");
            }
            return { message: "Job seeker profile deleted successfully" };
        } catch (error) {
            throw new HttpError(500, "Failed to delete job seeker profile");
        }
    }
}
