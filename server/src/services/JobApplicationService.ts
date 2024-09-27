import { IJobApplication, JobApplication } from '../models/JobApplication';
import mongoose, { Types } from 'mongoose';
import { JobApplicationStatus } from '../types';
import { Conflict } from '../middleware/Error';

class JobApplicationService {
  // Method to apply for a job
  async applyForJob(applicationPayload: {
    job_id: Types.ObjectId;
    job_seeker_id: Types.ObjectId;
    status: JobApplicationStatus;
    cover_letter: string;
    resume: string;
  }): Promise<IJobApplication> {
    console.log('Applying for job with payload:', applicationPayload);
    const existingApplication = await JobApplication.findOne({
      job_id: applicationPayload.job_id,
      job_seeker_id: applicationPayload.job_seeker_id,
    });

    if (existingApplication) {
      throw new Conflict('Application already exists for this job.');
    }

    const savedApplication = await JobApplication.create(applicationPayload);
return savedApplication; // Ensure this is returned

  }

  async getApplicationsByJobId(jobId: string): Promise<IJobApplication[]> {
      // Log the incoming jobId for debugging
  console.log(`Fetching applications for job ID: ${jobId}`);
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
        throw new Error('Invalid job ID format');
      }
    
    return await JobApplication.find({ job_id: new mongoose.Types.ObjectId(jobId) })
 
    
      .populate('job_seeker_id')
      .exec(); // Adding exec() for clarity, although it's optional
  }
  

  

  // Method to update the status of an application
  async updateApplicationStatus(applicationId: string, status: JobApplicationStatus): Promise<IJobApplication | null> {
    return await JobApplication.findByIdAndUpdate(
      new Types.ObjectId(applicationId),
      { status },
      { new: true }
    ).populate('job_seeker_id');
  }

  // Method to delete an application
  async deleteApplication(applicationId: string): Promise<IJobApplication | null> {
    return await JobApplication.findByIdAndDelete(new Types.ObjectId(applicationId));
  }
}

export { JobApplicationService };
