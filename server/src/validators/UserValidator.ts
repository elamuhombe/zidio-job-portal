import { z } from 'zod';
import { UserRole } from '../types'; // Import UserRole enum

const UserSchemaZod = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email format').nonempty('Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  role: z.enum([UserRole.JOB_SEEKER, UserRole.EMPLOYER, UserRole.ADMIN]), // Explicitly list enum values
  profile: z.string().optional().nullable(), // Allow optional and null values for profile
});

export default UserSchemaZod;
