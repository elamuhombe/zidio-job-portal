//src/validators/JobApplicationValidator.ts
import { z } from 'zod';

// Zod schema for job application validation
const JobApplicationSchemaZod = z.object({
  job_id: z.string().regex(/^[a-f\d]{24}$/i, 'Invalid Job ID'), // MongoDB ObjectId regex
  job_seeker_id: z.string().regex(/^[a-f\d]{24}$/i, 'Invalid Job Seeker ID'),
  status: z.enum(['applied', 'in_review', 'interview_scheduled', 'rejected', 'hired']),
  cover_letter: z
    .string()
    .min(100, 'Cover letter must be at least 100 characters long')
    .max(2000, 'Cover letter cannot exceed 2000 characters'),
  resume: z.string().regex(/\.(pdf|docx)$/i, 'Resume must be a PDF or DOCX file'),
});

// Export the validation schema
export { JobApplicationSchemaZod };
