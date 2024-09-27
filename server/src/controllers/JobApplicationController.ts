// src/controllers/JobApplicationController.ts
import { Request, Response, NextFunction } from "express";
import { JobApplicationService } from "../services/JobApplicationService";
import { sendJsonResponse } from "../utils/send-response";
import { JobApplicationSchemaZod, UpdateApplicationStatusSchemaZod } from "../validators/JobApplicationValidator"; // Import validation schemas
import { Types } from "mongoose";
import { ResourceNotFound, Conflict } from "../middleware/Error"; // Import new Conflict error
import { ZodError } from "zod";
import { JobApplicationStatus } from "../types";

// Create an instance of the JobApplicationService
const jobApplicationService = new JobApplicationService();

// Controller method to apply for a job
const applyForJob = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate the create job application request body
    const validatedData = JobApplicationSchemaZod.parse(req.body);

    // Convert job_id and job_seeker_id to ObjectId and prepare the application data
    const applicationData = {
      ...validatedData,
      job_id: new Types.ObjectId(validatedData.job_id), // Convert to ObjectId
      job_seeker_id: new Types.ObjectId(validatedData.job_seeker_id), // Convert to ObjectId
      status: validatedData.status as JobApplicationStatus, // Cast to JobApplicationStatus
      cover_letter: validatedData.cover_letter,
      resume: validatedData.resume,
    };

    // Call the job application service to create the application
    const savedApplication = await jobApplicationService.applyForJob(applicationData);

    // Send a successful response
    sendJsonResponse(res, 201, "Application submitted successfully", { application: savedApplication });
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

    // Handle conflict error
    if (error instanceof Conflict) {
      return sendJsonResponse(res, 409, error.message);
    }

    // Log unexpected errors for debugging
    console.error("Error creating job application:", error);

    // Forward the error to the error handling middleware
    next(error);
  }
};

// Controller method to get applications by job ID
const getApplicationsByJobId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { jobId } = req.params;

    // Validate that jobId is provided and is a valid ObjectId
    if (!jobId || !Types.ObjectId.isValid(jobId)) {
      return sendJsonResponse(res, 400, "Invalid job ID");
    }

    const validatedJobId = new Types.ObjectId(jobId);

    // Await the result of the getApplicationsByJobId method
    const result = await jobApplicationService.getApplicationsByJobId(validatedJobId);

    // Check if result is valid
    if (!result || result.length === 0) {
      return sendJsonResponse(res, 404, "No applications found for the specified job ID.");
    }

    return sendJsonResponse(res, 200, "Applications fetched successfully", { applications: result });
  } catch (error) {
    if (error instanceof ResourceNotFound) {
      return sendJsonResponse(res, 404, error.message);
    }
    next(error);
  }
};

// Controller method to update application status
const updateApplicationStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate the request parameters and body
    const validatedParams = UpdateApplicationStatusSchemaZod.parse({
      params: req.params,
      body: req.body,
    });

    // Extract application ID and new status from the validated data
    const { applicationId } = validatedParams.params;
    const { status } = validatedParams.body;

    // Validate that applicationId is a valid ObjectId
    if (!Types.ObjectId.isValid(applicationId)) {
      return sendJsonResponse(res, 400, "Invalid application ID");
    }

    // Call the service to update the application status
    const updatedApplication = await jobApplicationService.updateApplicationStatus(applicationId, JobApplicationStatus.APPLIED);

    // Check if the application was found and updated
    if (!updatedApplication) {
      return sendJsonResponse(res, 404, "Application not found.");
    }

    // Send a successful response
    return sendJsonResponse(res, 200, "Application status updated successfully", { updatedApplication });
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

    next(error);
  }
};

// Controller method to delete an application
const deleteApplication = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { applicationId } = req.params;

    // Validate that applicationId is provided and is a valid ObjectId
    if (!applicationId || !Types.ObjectId.isValid(applicationId)) {
      return sendJsonResponse(res, 400, "Invalid application ID");
    }

    // Call the job application service to delete the application
    const deletedApplication = await jobApplicationService.deleteApplication(applicationId);

    if (!deletedApplication) {
      return sendJsonResponse(res, 404, "Application not found or already deleted.");
    }

    // Send a successful response
    return sendJsonResponse(res, 200, "Application deleted successfully", { deletedApplication });
  } catch (error) {
    next(error);
  }
};

export { applyForJob, getApplicationsByJobId, updateApplicationStatus, deleteApplication };
