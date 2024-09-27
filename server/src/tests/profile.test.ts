import { ProfileService } from "../services/ProfileService";
import { User, Profile } from "../models";
import mongoose, { Types } from "mongoose";
import { Conflict, ResourceNotFound } from "../middleware/Error";
import { IUser, UserRole } from "../types";

jest.mock("../models");

describe("ProfileService", () => {
  const profileService = new ProfileService();
  const userId = new Types.ObjectId();
  const profileId = new Types.ObjectId();

  afterEach(() => {
    jest.clearAllMocks();
  });

  const createProfilePayload = {
    user: userId,
    user_id: userId,
    resume: "resume.pdf",
    contactDetails: {
      phone: "123-456-7890",
      address: "123 Main St",
    },
    companyInfo: null,
    profile_resume: "profile.pdf",
  };

  describe("createUserProfile", () => {
    it("should create a new profile for a job seeker", async () => {
      (User.findById as jest.Mock).mockResolvedValueOnce({
        _id: userId,
        role: UserRole.JOB_SEEKER,
      });
      (Profile.prototype.save as jest.Mock).mockResolvedValueOnce({
        ...createProfilePayload,
        toObject: jest.fn().mockReturnValue(createProfilePayload), // Ensure toObject is mocked
      });

      const result = await profileService.createUserProfile(
        createProfilePayload
      );
      expect(result.message).toBe("Profile Created Successfully");
      expect(result.profile).toEqual(createProfilePayload);
    });

    it("should throw a Conflict error if profile already exists", async () => {
      (Profile.findOne as jest.Mock).mockResolvedValueOnce({ user: userId });

      await expect(
        profileService.createUserProfile(createProfilePayload)
      ).rejects.toThrow(Conflict);
    });

    it("should throw a ResourceNotFound error if user not found", async () => {
      (User.findById as jest.Mock).mockResolvedValueOnce(null);

      await expect(
        profileService.createUserProfile(createProfilePayload)
      ).rejects.toThrow(ResourceNotFound);
    });
  });
  const mockProfile: IUser = {
    _id: new mongoose.Types.ObjectId(),
    username: "testuser",
    email: "test@example.com",
    password: "hashed_password",
    role: UserRole.JOB_SEEKER,
    profile: new mongoose.Types.ObjectId(),
    applied_jobs: [],
    posted_jobs: [],
    notifications: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 0,
  };

  it("should fetch the user profile successfully", async () => {
    const mockUser = {
      _id: userId,
      role: UserRole.JOB_SEEKER,
      populate: jest.fn().mockResolvedValueOnce(mockProfile), // Mock populate method
    };

    (User.findOne as jest.Mock).mockResolvedValueOnce(mockUser);

    const result = await profileService.getUserProfile(userId); 

    expect(result).toHaveProperty("message", "Profile Fetch Successfully");
    expect(result.profile).toEqual(mockProfile);
  });

  describe("deleteUserProfile", () => {
    it("should delete the user profile successfully", async () => {
      const mockProfile = { user: userId };

      // Mock Profile.findOneAndDelete to return a profile
      (Profile.findOneAndDelete as jest.Mock).mockResolvedValueOnce(
        mockProfile
      );
      // Mock User.findByIdAndUpdate to ensure it gets called correctly
      (User.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce({
        profile: userId,
      });

      console.log(`Attempting to delete profile for user ID: ${userId}`);

      const result = await profileService.deleteUserProfile(userId);

      console.log(`Result after deletion: ${JSON.stringify(result)}`);

      expect(result).toEqual({ message: "Profile Deleted Successfully" });
      expect(Profile.findOneAndDelete).toHaveBeenCalledWith({ user: userId });
      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
        userId,
        { profile: null },
        { new: true }
      );
    });

    it("should throw a ResourceNotFound error if the profile does not exist", async () => {
      // Mock Profile.findOneAndDelete to return null
      (Profile.findOneAndDelete as jest.Mock).mockResolvedValueOnce(null);

      console.log(`Attempting to delete profile for user ID: ${userId}`);

      await expect(profileService.deleteUserProfile(userId)).rejects.toThrow(
        ResourceNotFound
      );

      console.log(`Profile not found for user ID: ${userId}`);
      await expect(profileService.deleteUserProfile(userId)).rejects.toThrow(
        `Profile for user with ID ${userId} not found`
      );
    });

    it("should handle unexpected errors", async () => {
      const mockError = new Error("Unexpected error");
      // Mock Profile.findOneAndDelete to throw an unexpected error
      (Profile.findOneAndDelete as jest.Mock).mockRejectedValueOnce(mockError);

      console.log(`Attempting to delete profile for user ID: ${userId}`);

      await expect(profileService.deleteUserProfile(userId)).rejects.toThrow(
        "Unexpected error"
      );

      console.log(
        `An unexpected error occurred while deleting the profile for user ID: ${userId}`
      );
    });
  });
});
