//src/validators/JobSeekerValidator.ts
import { z } from 'zod';

// Define the Job Seeker Profile Validation Schema
export const JobSeekerProfileSchema = z.object({
  user: z.string().nonempty("User ID is required"), // Assuming user ID is a string
  resume: z.string().nonempty("Resume is required"), // Resume must be provided
  contactDetails: z.object({
    phone: z.string().nonempty("Phone number is required").regex(/^[0-9]+$/, "Phone number must be numeric"),
    address: z.string().nonempty("Address is required"),
    email: z.string()
      .nonempty("Email is required")
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"), // Regex for email 
  }),
  user_id: z.string().nonempty("User ID is required"), // Assuming user_id is a string
});

// Type for the validated Job Seeker Profile
export type JobSeekerProfile = z.infer<typeof JobSeekerProfileSchema>;

// Validator function to validate the Job Seeker Profile data
export const validateJobSeekerProfile = (data: unknown): JobSeekerProfile => {
  return JobSeekerProfileSchema.parse(data); // Will throw if validation fails
};
