import { IJobApplication, JobApplication } from "../models/JobApplication";
import mongoose, { Types } from "mongoose";
import { JobApplicationStatus } from "../types";
import { Conflict } from "../middleware/Error";

class JobApplicationService {
  static createApplication(applicationData: {
    job_id: Types.ObjectId;
    job_seeker_id: Types.ObjectId;
    status: string;
    cover_letter: string;
    resume: string;
  }):
    | { application: any; message: any }
    | PromiseLike<{ application: any; message: any }> {
    throw new Error("Method not implemented.");
  }
  static updateApplicationStatus(applicationId: any, status: any) {
    throw new Error("Method not implemented.");
  }
  static deleteApplication(applicationId: string) {
    throw new Error("Method not implemented.");
  }
  // Method to apply for a job
  async applyForJob(applicationPayload: {
    job_id: Types.ObjectId;
    job_seeker_id: Types.ObjectId;
    status: JobApplicationStatus;
    cover_letter: string;
    resume: string;
  }): Promise<IJobApplication> {
    console.log("Applying for job with payload:", applicationPayload);
    const existingApplication = await JobApplication.findOne({
      job_id: applicationPayload.job_id,
      job_seeker_id: applicationPayload.job_seeker_id,
    });

    if (existingApplication) {
      throw new Conflict("Application already exists for this job.");
    }

    const savedApplication = await JobApplication.create(applicationPayload);
    return savedApplication; // Ensure this is returned
  }


  // Method to get applications by Job ID
async getApplicationsByJobId(jobId: string): Promise<IJobApplication[]> {
  console.log("Fetching applications for job ID:", jobId);
  
  // Validate the job ID format and convert it to ObjectId
  let objectId: Types.ObjectId;
  try {
    objectId = new Types.ObjectId(jobId);
  } catch (error) {
    console.error("Invalid job ID format:", jobId);
    throw new Error("Invalid job ID format. Please provide a valid 24-character hex string.");
  }

  // Fetch applications associated with the job ID
  const applications = await JobApplication.find({ job_id: objectId });

  if (!applications || applications.length === 0) {
    console.warn("No applications found for job ID:", jobId);
    return []; // Return an empty array if no applications are found
  }

  console.log("Applications found:", applications);
  return applications;
}

  
  // Method to update the status of an application
  async updateApplicationStatus(
    applicationId: string,
    status: JobApplicationStatus
  ): Promise<IJobApplication | null> {
    return await JobApplication.findByIdAndUpdate(
      new Types.ObjectId(applicationId),
      { status },
      { new: true }
    ).populate("job_seeker_id");
  }

  // Method to delete an application
  async deleteApplication(
    applicationId: string
  ): Promise<IJobApplication | null> {
    return await JobApplication.findByIdAndDelete(
      new Types.ObjectId(applicationId)
    );
  }
}

export { JobApplicationService };
