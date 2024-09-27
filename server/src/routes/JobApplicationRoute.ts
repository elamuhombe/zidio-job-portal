// src/routes/JobApplicationRoute.ts
import { Router } from 'express';
import { JobApplicationController } from '../controllers/JobApplicationController';
import { JobApplicationSchemaZod } from '../validators/JobApplicationValidator';
import { z, ZodError } from 'zod';

// Initialize the router and the controller
const jobApplicationRoute = Router();
const jobApplicationController = new JobApplicationController();

// Middleware to validate request bodies against the Zod schema
const validateJobApplication = (schema: any) => {
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

// Define the job application routes
jobApplicationRoute.post('/applications', validateJobApplication(JobApplicationSchemaZod), jobApplicationController.applyForJob.bind(jobApplicationController)); // Route to apply for a job
jobApplicationRoute.get('/applications/user/:userId', jobApplicationController.getAllJobApplications.bind(jobApplicationController)); // Get all job applications for a user
jobApplicationRoute.get('/applications/user/:userId/job/:jobId', jobApplicationController.getJobApplicationsByJobId.bind(jobApplicationController)); // Get applications by job ID
jobApplicationRoute.put('/applications/user/:userId/status', jobApplicationController.updateJobApplicationStatus.bind(jobApplicationController)); // Update job application status
jobApplicationRoute.get('/applications/user/:userId/applied-jobs', jobApplicationController.getAppliedJobs.bind(jobApplicationController)); // Get applied jobs

export default jobApplicationRoute;
