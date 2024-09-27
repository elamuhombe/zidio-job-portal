// src/validators/JobApplicationValidator.ts
import { z } from "zod";
import { JobApplicationStatus } from "../types";

// Convert enum values to a tuple
const jobApplicationStatusValues = Object.values(JobApplicationStatus) as [
  string,
  ...string[]
];

// Zod schema for job application validation
const JobApplicationSchemaZod = z.object({
  job_id: z
    .string()
    .regex(/^[a-f\d]{24}$/i, { message: "Invalid Job ID format" }),
  job_seeker_id: z
    .string()
    .regex(/^[a-f\d]{24}$/i, { message: "Invalid Job Seeker ID format" }),
  status: z.enum(jobApplicationStatusValues),
  cover_letter: z
    .string()
    .min(100, { message: "Cover letter must be at least 100 characters long" })
    .max(2000, { message: "Cover letter cannot exceed 2000 characters" }),
  resume: z
    .string()
    .regex(/\.(pdf|docx)$/i, { message: "Resume must be a PDF or DOCX file" }),
});
// Zod schema for updating job application status
const UpdateApplicationStatusSchemaZod = z.object({
  params: z.object({
    applicationId: z
      .string()
      .regex(/^[a-f\d]{24}$/i, { message: "Invalid Application ID format" }), // Validate as ObjectId
  }),
  body: z.object({
    status: z.enum(jobApplicationStatusValues, {
      message: "Invalid status value",
    }), // Validate status update
  }),
});

// Export the validation schema
export { JobApplicationSchemaZod, UpdateApplicationStatusSchemaZod };
