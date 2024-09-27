// src/routes/JobRoute.ts
import { Router } from 'express';
import { createJob, getJobs } from '../controllers/JobController'; // Import all required controller methods
import { JobSchemaZod } from '../validators/JobValidator'; // Import the Zod schema
import { z, ZodError } from 'zod'; // Import Zod and ZodError for error handling

const jobRoute = Router();

// Middleware to validate request bodies against the Zod schema
const validateJob = (schema: any) => {
  return (req: any, res: any, next: any) => {
    try {
      schema.parse(req.body); // Validate request body
      next(); // If valid, proceed to the next middleware/controller
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ errors: error.errors }); // Return validation errors
      }
      next(error); // Pass on other errors
    }
  };
};

// Define the job routes with validation
jobRoute.post('/jobs', validateJob(JobSchemaZod), createJob); // Route to create a new job
jobRoute.get('/jobs/user/:user_id', getJobs); // Route to get jobs created by a specific user


export default jobRoute;
