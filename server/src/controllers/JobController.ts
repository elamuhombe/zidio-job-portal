// src/controllers/JobController.ts
import { Request, Response, NextFunction } from "express";
import { JobService } from "../services/JobService";
import { sendJsonResponse } from "../utils/send-response";
import { JobSchemaZod } from "../validators/JobValidator"; // Import the job validation schema
import { Types } from "mongoose";
import { ParsedQs } from "qs";
import { ResourceNotFound } from "../middleware/Error";
import { ZodError } from "zod";

const createJob = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate the create job request body
    const validatedData = JobSchemaZod.parse(req.body);

    // Convert category to ObjectId and prepare the job data
    const jobData = {
      ...validatedData,
      category: new Types.ObjectId(validatedData.category), // Convert to ObjectId
    };

    // Call the job service to create the job using the static method
    const { job, message } = await JobService.createJob(jobData); // Call static method
    
    // Send a successful response
    sendJsonResponse(res, 201, message, { job });
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: 'Validation error',
        errors: error.errors, // Include Zod validation errors
      });
    }

    // Log unexpected errors for debugging
    console.error("Error creating job:", error);

    // Forward the error to the error handling middleware
    next(error);
  }
};

const getJobs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Extract employer_id from query parameters
    const employer_id: string | string[] | ParsedQs | ParsedQs[] | undefined = req.query.employer_id;

    // Validate that employer_id is provided
    if (!employer_id) {
      return sendJsonResponse(res, 400, "Missing employer_id");
    }

    let id: string | undefined;

    // Check the type of employer_id
    if (Array.isArray(employer_id)) {
      // Take the first string from the array if employer_id is an array
      id = employer_id[0] as string; // Cast to string
    } else if (typeof employer_id === 'string') {
      // If it's a string, assign directly
      id = employer_id;
    } else {
      // Handle the case where employer_id is of an unexpected type
      return sendJsonResponse(res, 400, "Invalid employer_id type");
    }

    // Validate that id is defined and is a valid ObjectId
    if (!id || !Types.ObjectId.isValid(id)) {
      return sendJsonResponse(res, 400, "Invalid employer_id");
    }

    const validatedData = new Types.ObjectId(id);

    // Create an instance of JobService to call the instance method
    const jobServiceInstance = new JobService();

    // Await the result of the getCreatedJobs method
    const result = await jobServiceInstance.getCreatedJobs(validatedData);

    // Check if result is valid
    if (!result) {
      return sendJsonResponse(res, 404, "No jobs found.");
    }

    const { jobs, message } = result;

    return sendJsonResponse(res, 200, message, { jobs });

  } catch (error) {
    if (error instanceof ResourceNotFound) {
      return sendJsonResponse(res, 404, error.message);
    }
    next(error);
  }
};

export { createJob, getJobs };
