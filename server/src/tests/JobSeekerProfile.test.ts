// src/tests/jobSeeker.test.ts
import { JobSeekerService } from "../services/JobSeekerService";
import { JobSeekerProfile } from "../models/JobSeekerProfile"; // Assuming you have a JobSeekerProfile model
import { IJobSeekerProfile } from "../types"; // Assuming you have a corresponding IJobSeekerProfile interface
import { HttpError } from "../middleware/Error"; // Error handling class
import { Types } from "mongoose";

jest.mock("../models/JobSeekerProfile");

describe("JobSeekerService", () => {
  let jobSeekerService: JobSeekerService;

  const sampleJobSeekerProfileId = new Types.ObjectId();
  const sampleJobSeekerProfile: IJobSeekerProfile = {
    _id: new Types.ObjectId(),
    user: new Types.ObjectId(),
    contactDetails: {
      phone: "123-456-7890",
      email: "example@email.com",
      address: "123 Main St",
    },
    profile_resume: "link-to-profile-resume",
    resume: "link-to-resume.pdf",
    user_id: new Types.ObjectId(),
  };

  beforeEach(() => {
    jobSeekerService = new JobSeekerService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createProfile", () => {
    it("should create a new job seeker profile successfully", async () => {
      (JobSeekerProfile.findOne as jest.Mock).mockResolvedValue(null);
      (JobSeekerProfile.prototype.save as jest.Mock).mockResolvedValue(sampleJobSeekerProfile);

      console.log("Attempting to create a job seeker profile...");

      const result = await jobSeekerService.createProfile(sampleJobSeekerProfile);
      expect(result).toEqual(sampleJobSeekerProfile);
      expect(JobSeekerProfile.prototype.save).toHaveBeenCalledTimes(1);

      console.log("Profile created successfully:", result);
    });

    it("should throw an error when a profile already exists for the user", async () => {
      (JobSeekerProfile.findOne as jest.Mock).mockResolvedValue(sampleJobSeekerProfile);

      console.log("Checking if a profile already exists for the user...");

      await expect(jobSeekerService.createProfile(sampleJobSeekerProfile)).rejects.toThrow(HttpError);

      console.log("Error thrown as expected: Profile already exists.");
    });

    it("should throw an error when failing to create a profile", async () => {
      (JobSeekerProfile.findOne as jest.Mock).mockResolvedValue(null);
      (JobSeekerProfile.prototype.save as jest.Mock).mockRejectedValue(new Error("Error"));

      console.log("Attempting to create a job seeker profile...");

      await expect(jobSeekerService.createProfile(sampleJobSeekerProfile)).rejects.toThrow(HttpError);

      console.log("Error thrown as expected when failing to create a profile.");
    });
  });

  describe("getAllProfiles", () => {
    it("should fetch all job seeker profiles successfully", async () => {
      (JobSeekerProfile.find as jest.Mock).mockResolvedValue([sampleJobSeekerProfile]);

      console.log("Fetching all job seeker profiles...");

      const result = await jobSeekerService.getAllProfiles();
      expect(result).toEqual([sampleJobSeekerProfile]);
      expect(JobSeekerProfile.find).toHaveBeenCalledTimes(1);

      console.log("Profiles fetched successfully:", result);
    });

    it("should throw an error when failing to fetch profiles", async () => {
      (JobSeekerProfile.find as jest.Mock).mockRejectedValue(new Error("Error"));

      console.log("Attempting to fetch all job seeker profiles...");

      await expect(jobSeekerService.getAllProfiles()).rejects.toThrow(HttpError);

      console.log("Error thrown as expected when failing to fetch profiles.");
    });
  });

  describe("getProfileById", () => {
    it("should fetch a job seeker profile by ID successfully", async () => {
      (JobSeekerProfile.findById as jest.Mock).mockResolvedValue(sampleJobSeekerProfile);

      console.log("Fetching job seeker profile by ID:", sampleJobSeekerProfileId.toString());

      const result = await jobSeekerService.getProfileById(sampleJobSeekerProfileId.toString());
      expect(result).toEqual(sampleJobSeekerProfile);
      expect(JobSeekerProfile.findById).toHaveBeenCalledWith(sampleJobSeekerProfileId.toString());

      console.log("Profile fetched successfully:", result);
    });

    it("should throw an error when profile is not found", async () => {
      (JobSeekerProfile.findById as jest.Mock).mockResolvedValue(null);

      console.log("Attempting to fetch a job seeker profile by ID, but profile does not exist.");

      await expect(jobSeekerService.getProfileById(sampleJobSeekerProfileId.toString())).rejects.toThrow(HttpError);

      console.log("Error thrown as expected: Profile not found.");
    });

    it("should throw an error when failing to fetch a profile", async () => {
      (JobSeekerProfile.findById as jest.Mock).mockRejectedValue(new Error("Error"));

      console.log("Attempting to fetch a job seeker profile by ID...");

      await expect(jobSeekerService.getProfileById(sampleJobSeekerProfileId.toString())).rejects.toThrow(HttpError);

      console.log("Error thrown as expected when failing to fetch the profile.");
    });
  });

  describe("updateProfile", () => {
    const updatedData = {
      resume: "updated-resume-url",
    };

    it("should update a job seeker profile successfully", async () => {
      (JobSeekerProfile.findByIdAndUpdate as jest.Mock).mockResolvedValue({
        ...sampleJobSeekerProfile,
        ...updatedData,
      });

      console.log("Updating job seeker profile with ID:", sampleJobSeekerProfileId.toString());

      const result = await jobSeekerService.updateProfile(sampleJobSeekerProfileId.toString(), updatedData);
      expect(result).toEqual({ ...sampleJobSeekerProfile, ...updatedData });
      expect(JobSeekerProfile.findByIdAndUpdate).toHaveBeenCalledWith(
        sampleJobSeekerProfileId.toString(),
        updatedData,
        { new: true }
      );

      console.log("Profile updated successfully:", result);
    });

    it("should throw an error when profile is not found", async () => {
      (JobSeekerProfile.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

      console.log("Attempting to update a job seeker profile, but profile does not exist.");

      await expect(jobSeekerService.updateProfile(sampleJobSeekerProfileId.toString(), updatedData)).rejects.toThrow(HttpError);

      console.log("Error thrown as expected: Profile not found.");
    });

    it("should throw an error when failing to update a profile", async () => {
      (JobSeekerProfile.findByIdAndUpdate as jest.Mock).mockRejectedValue(new Error("Error"));

      console.log("Attempting to update a job seeker profile...");

      await expect(jobSeekerService.updateProfile(sampleJobSeekerProfileId.toString(), updatedData)).rejects.toThrow(HttpError);

      console.log("Error thrown as expected when failing to update the profile.");
    });
  });

  describe("deleteProfile", () => {
    it("should delete a job seeker profile successfully", async () => {
      (JobSeekerProfile.findByIdAndDelete as jest.Mock).mockResolvedValue(sampleJobSeekerProfile);

      console.log("Deleting job seeker profile with ID:", sampleJobSeekerProfileId.toString());

      const result = await jobSeekerService.deleteProfile(sampleJobSeekerProfileId.toString());
      expect(result).toEqual({
        message: "Job seeker profile deleted successfully",
      });
      expect(JobSeekerProfile.findByIdAndDelete).toHaveBeenCalledWith(sampleJobSeekerProfileId.toString());

      console.log("Profile deleted successfully:", result);
    });

    it("should throw an error when profile is not found", async () => {
      (JobSeekerProfile.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

      console.log("Attempting to delete a job seeker profile, but profile does not exist.");

      await expect(jobSeekerService.deleteProfile(sampleJobSeekerProfileId.toString())).rejects.toThrow(HttpError);

      console.log("Error thrown as expected: Profile not found.");
    });

    it("should throw an error when failing to delete a profile", async () => {
      (JobSeekerProfile.findByIdAndDelete as jest.Mock).mockRejectedValue(new Error("Error"));

      console.log("Attempting to delete a job seeker profile...");

      await expect(jobSeekerService.deleteProfile(sampleJobSeekerProfileId.toString())).rejects.toThrow(HttpError);

      console.log("Error thrown as expected when failing to delete the profile.");
    });
  });
});
