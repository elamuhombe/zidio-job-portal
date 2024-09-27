//src/services/JobService.ts
import { User, Job } from './../models/index';
import { IJob } from '../types';
import { Types } from 'mongoose';
import { HttpError, Conflict, ResourceNotFound } from './../middleware/Error';
import { handleError } from './ErrorHandler'; // Import the error handling function

export class JobService {
  getJobs(validatedData: {}): { jobs: any; message: any; } | PromiseLike<{ jobs: any; message: any; }> {
    throw new Error("Method not implemented.");
  }
    static getCreatedJobs(arg0: Types.ObjectId) {
        throw new Error('Method not implemented.');
    }
    static updateJob(jobPayload: any, arg1: Types.ObjectId) {
        throw new Error('Method not implemented.');
    }
    static deleteJob(arg0: Types.ObjectId, arg1: Types.ObjectId) {
        throw new Error('Method not implemented.');
    }
  
    static async createJob(payload: Partial<IJob>): Promise<{ message: string; job: IJob }> {
      try {
        const { description, title, employer_id } = payload;
    
        if (!employer_id) {
          throw new Error("Employer ID is required to create a job");
        }
    
        const jobExists = await Job.findOne({ description, title, employer_id });
    
        if (jobExists) {
          throw new Conflict("Job with the same title and description already exists");
        }
    
        const job = new Job(payload);
        const savedJob = await job.save();
    
        // Update employer's posted jobs
        await User.findByIdAndUpdate(employer_id, { $push: { posted_jobs: savedJob._id } });
    
        return {
          message: "Job Created Successfully",
          job: savedJob,
        };
      } catch (error) {
        handleError(error); // Use the imported error handler
        throw error; // Optionally rethrow the error for upstream handling if needed
      }
    }
    

    public async getCreatedJobs(user_id: Types.ObjectId): Promise<{ message: string; jobs: Types.ObjectId[] }> {
      try {
          const user = await User.findOne({ _id: user_id }).populate('posted_jobs');
  
          // Check if user exists and has posted jobs
          if (!user || !user.posted_jobs || user.posted_jobs.length === 0) {
              throw new ResourceNotFound("No jobs have been created");
          }
  
          // Return success message and the list of job IDs
          return {
              message: "Jobs Fetched Successfully",
              jobs: user.posted_jobs.map((job: { _id: Types.ObjectId }) => job._id), // Ensure job._id is typed correctly
          };
      } catch (error) {
          handleError(error);
          throw new Error("Failed to fetch created jobs."); // Rethrow for upstream handling
      }
  }
  
  
    
    
    

  public async updateJob(payload: Partial<IJob>, job_id: Types.ObjectId): Promise<{ message: string; job: IJob } | undefined> {
    try {
      const jobExists = await Job.findOne({ _id: job_id, employer_id: payload.employer_id });

      if (!jobExists) {
        throw new ResourceNotFound("Job does not exist");
      }

      const updatedJob = await Job.findByIdAndUpdate(job_id, payload, { new: true });

      if (!updatedJob) {
        throw new ResourceNotFound("Job could not be updated");
      }

      return {
        message: "Job Updated Successfully",
        job: updatedJob,
      };
    } catch (error) {
      handleError(error);
      return undefined;
    }
  }

  public async deleteJob(job_id: Types.ObjectId, employer_id: Types.ObjectId): Promise<{ message: string } | undefined> {
    try {
      const jobExists = await Job.findOne({ _id: job_id, employer_id: employer_id });

      if (!jobExists) {
        throw new ResourceNotFound("Job does not exist");
      }

      await Job.findByIdAndDelete(job_id);
      await User.findByIdAndUpdate(employer_id, { $pull: { posted_jobs: job_id } });

      return {
        message: "Job Deleted Successfully",
      };
    } catch (error) {
      handleError(error);
      return undefined;
    }
  }
}
