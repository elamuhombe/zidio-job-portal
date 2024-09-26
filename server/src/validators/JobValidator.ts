//src/validators/JobValidator.ts
import { z } from "zod";

// Zod schema for job validation
const JobSchemaZod = z.object({
  title: z.string().min(1, "Job title is required"),
  description: z.string().min(1, "Job description is required"),
  qualifications: z.array(z.string()).optional(),
  responsibilities: z.array(z.string()).optional(),
  location: z.string().min(1, "Location is required"),
  salaryRange: z.object({
    min: z.number().positive("Minimum salary must be positive"),
    max: z.number().positive("Maximum salary must be positive"),
  }),
  // Update category to validate as a string that represents an ObjectId
  category: z.string().refine((val) => {
    return /^[0-9a-fA-F]{24}$/.test(val); // Regex for ObjectId format
  }, { message: "Invalid category ID" }),
  company: z.string().min(1, "Company name is required"),
});

// Export the validation schema
export { JobSchemaZod };

