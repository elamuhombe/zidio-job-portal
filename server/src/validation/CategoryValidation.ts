//src/validation/CategoryValidation.ts
import { z } from 'zod';

// Zod schema for category validation
const CategorySchemaZod = z.object({
  name: z.string().min(1, 'Category name is required'),
  image: z.string().url('Invalid image URL').optional(), // Optional image URL
});

// Export the validation schema
export { CategorySchemaZod };
