//src/validators/ProfileValidator.ts
import { z } from 'zod';

// Zod schema for profile validation
const ProfileSchemaZod = z.object({
  user: z.string().length(24, 'Invalid user ID'), // Assuming ObjectId format
  resume: z.string().url('Invalid resume URL').optional(), // Optional URL for resume
  contactDetails: z.object({
    phone: z.string().min(1, 'Phone number is required'),
    address: z.string().min(1, 'Address is required'),
  }),
  companyInfo: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
  }).optional(), // Optional company information
});

// Export the validation schema
export { ProfileSchemaZod };
