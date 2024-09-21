//src/validation/JobValidator.ts
import { z } from 'zod';

// Zod schema for job validation
const JobSchemaZod = z.object({
  title: z.string().min(1, 'Job title is required'),
  description: z.string().min(1, 'Job description is required'),
  qualifications: z.string().optional(),
  responsibilities: z.string().optional(),
  location: z.string().min(1, 'Location is required'),
  salaryRange: z.object({
    min: z.number().positive('Minimum salary must be positive'),
    max: z.number().positive('Maximum salary must be positive'),
  }),
  category: z.string().length(24, 'Invalid category ID'), // Assuming ObjectId format
  company: z.string().min(1, 'Company name is required'),
});

// Export the validation schema
export { JobSchemaZod };
