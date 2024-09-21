//src/validators/UserValidation.ts
import { z } from 'zod';

const UserSchemaZod = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email format').nonempty('Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  role: z.enum(['jobSeeker', 'employer', 'admin']),
  profile: z.string().optional(),
});

export default UserSchemaZod;
