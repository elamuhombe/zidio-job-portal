//src/controllers/JobApplicationController.ts

import { Request, Response } from 'express';
import { JobApplicationService } from '../services/JobApplicationService';
import { JobApplicationSchemaZod } from '../validators/JobApplicationValidator';
import { handleError } from '../services/ErrorHandler';
import { Types } from 'mongoose';

export class JobApplicationController {
    private jobApplicationService: JobApplicationService;

    constructor() {
        this.jobApplicationService = new JobApplicationService();
    }

    // Apply for a job
    public async applyForJob(req: Request, res: Response) {
        const { job_id, job_seeker_id, cover_letter, resume, useExistingResume } = req.body;

        // Validate input data
        const validation = JobApplicationSchemaZod.safeParse({
            job_id,
            job_seeker_id,
            cover_letter,
            resume
        });

        if (!validation.success) {
            return res.status(400).json({ errors: validation.error.errors });
        }

        
            
            try {
                const filePath = resume?.path || null;
            const filename = resume?.filename || null;
            
                const result = await this.jobApplicationService.applyForJob({
                    job_id,
                    job_seeker_id,
                    cover_letter,
                    resume: { path: filePath, filename: filename }, // Pass the resume as an object
                    useExistingResume
                });
            } catch (error) {
                console.error("Error applying for job:", error);
                // Handle error appropriately (e.g., show a notification to the user)
            }
        }   
    

    // Get all job applications for a user
    public async getAllJobApplications(req: Request, res: Response) {
        const userId = req.params.userId; // Ensure this is extracted from the route parameters

        try {
            const applications = await this.jobApplicationService.getAllJobsAndApplications(new Types.ObjectId(userId));
            return res.status(200).json(applications);
        } catch (error) {
            handleError(error);
            return res.status(500).json({ message: "An error occurred while fetching job applications." });
        }
    }

    // Get job applications by job ID
    public async getJobApplicationsByJobId(req: Request, res: Response) {
        const userId = req.params.userId; // Ensure this is extracted from the route parameters
        const jobId = req.params.jobId; // Ensure this is extracted from the route parameters

        try {
            const applications = await this.jobApplicationService.getJobApplicationsByJobId(new Types.ObjectId(userId), new Types.ObjectId(jobId));
            return res.status(200).json(applications);
        } catch (error) {
            handleError(error);
            return res.status(500).json({ message: "An error occurred while fetching job applications for the job." });
        }
    }

    // Update job application status
    public async updateJobApplicationStatus(req: Request, res: Response) {
        const { application_id, status } = req.body;
        const userId = req.params.userId; // Ensure this is extracted from the route parameters

        try {
            const result = await this.jobApplicationService.updateJobApplicationStatus(new Types.ObjectId(userId), new Types.ObjectId(application_id), status);
            return res.status(200).json(result);
        } catch (error) {
            handleError(error);
            return res.status(500).json({ message: "An error occurred while updating the job application status." });
        }
    }

    // Get applied jobs
    public async getAppliedJobs(req: Request, res: Response) {
        const userId = req.params.userId; // Ensure this is extracted from the route parameters

        try {
            const applications = await this.jobApplicationService.getAppliedJobs(new Types.ObjectId(userId));
            return res.status(200).json(applications);
        } catch (error) {
            handleError(error);
            return res.status(500).json({ message: "An error occurred while fetching applied jobs." });
        }
    }
}
