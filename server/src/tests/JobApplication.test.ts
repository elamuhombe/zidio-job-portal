import { JobApplicationService } from '../services/JobApplicationService';
import { JobApplication } from '../models/JobApplication';
import { Conflict } from '../middleware/Error';
import { JobApplicationStatus } from '../types/index';
import mongoose, { Types } from 'mongoose';

jest.mock('../models/JobApplication');

describe('JobApplicationService - applyForJob', () => {
  const jobApplicationService = new JobApplicationService();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'log').mockImplementation(() => {}); // Mock console.log
  });

  it('should create a new job application when it does not already exist', async () => {
    const applicationPayload = {
      job_id: new mongoose.Types.ObjectId(),
      job_seeker_id: new mongoose.Types.ObjectId(),
      status: JobApplicationStatus.NOT_SUBMITTED,
      cover_letter: 'Cover letter text',
      resume: 'Resume text',
    };

    (JobApplication.findOne as jest.Mock).mockResolvedValue(null); // Simulate no existing application
    (JobApplication.create as jest.Mock).mockResolvedValue(applicationPayload); // Simulate successful creation

    const result = await jobApplicationService.applyForJob(applicationPayload);

    expect(JobApplication.findOne).toHaveBeenCalledWith({
      job_id: applicationPayload.job_id,
      job_seeker_id: applicationPayload.job_seeker_id,
    });
    expect(JobApplication.create).toHaveBeenCalledWith(applicationPayload);
    expect(result).toEqual(applicationPayload); // Expect the returned result to match the payload
  });

  it('should throw a Conflict error if the application already exists', async () => {
    const applicationPayload = {
      job_id: new mongoose.Types.ObjectId(),
      job_seeker_id: new mongoose.Types.ObjectId(),
      status: JobApplicationStatus.APPLIED,
      cover_letter: 'Cover letter text',
      resume: 'Resume text',
    };

    const existingApplication = { job_id: applicationPayload.job_id, job_seeker_id: applicationPayload.job_seeker_id };
    (JobApplication.findOne as jest.Mock).mockResolvedValue(existingApplication); // Simulate existing application

    await expect(jobApplicationService.applyForJob(applicationPayload)).rejects.toThrow(Conflict);
    expect(JobApplication.findOne).toHaveBeenCalledWith({
      job_id: applicationPayload.job_id,
      job_seeker_id: applicationPayload.job_seeker_id,
    });
    expect(JobApplication.create).not.toHaveBeenCalled(); // Ensure create was not called
  });

  it('should handle unexpected errors', async () => {
    const applicationPayload = {
      job_id: new mongoose.Types.ObjectId(),
      job_seeker_id: new mongoose.Types.ObjectId(),
      status: JobApplicationStatus.APPLIED,
      cover_letter: 'Cover letter text',
      resume: 'Resume text',
    };

    (JobApplication.findOne as jest.Mock).mockRejectedValue(new Error('Database error')); // Simulate database error

    await expect(jobApplicationService.applyForJob(applicationPayload)).rejects.toThrow('Database error');
    expect(JobApplication.findOne).toHaveBeenCalled();
    expect(JobApplication.create).not.toHaveBeenCalled(); // Ensure create was not called
  });

  describe('getApplicationsByJobId', () => {
    it('should fetch applications for a valid job ID', async () => {
        const jobId = new mongoose.Types.ObjectId();
        const mockApplications = [
            { job_id: jobId, job_seeker_id: new mongoose.Types.ObjectId(), status: JobApplicationStatus.APPLIED },
        ];

        (JobApplication.find as jest.Mock).mockReturnValueOnce({
            populate: jest.fn().mockReturnThis(),
            exec: jest.fn().mockResolvedValueOnce(mockApplications),
        });

        const applications = await jobApplicationService.getApplicationsByJobId(jobId.toString());

        expect(applications).toEqual(mockApplications);
        expect(JobApplication.find).toHaveBeenCalledWith({ job_id: jobId });
        expect(console.log).toHaveBeenCalledWith(`Fetching applications for job ID: ${jobId}`);
    });

    it('should throw an error for an invalid job ID', async () => {
        const invalidJobId = 'invalidId';

        await expect(jobApplicationService.getApplicationsByJobId(invalidJobId)).rejects.toThrow('Invalid job ID format');
    });
});

describe('updateApplicationStatus', ()=>{
    it('should update the application status successfully', async () => {
        // Define mock data
        const applicationId = new mongoose.Types.ObjectId().toString();
        const updatedApplication = {
          _id: applicationId,
          job_id: new mongoose.Types.ObjectId(),
          job_seeker_id: new mongoose.Types.ObjectId(),
          status: JobApplicationStatus.APPLIED,
          cover_letter: 'Updated Cover Letter',
          resume: 'Updated Resume',
        };
        console.log('Mock application data for updating status:', updatedApplication);
    
        // Mock the findByIdAndUpdate method
        (JobApplication.findByIdAndUpdate as jest.Mock).mockReturnValueOnce({
          populate: jest.fn().mockResolvedValueOnce(updatedApplication),
        });
    
        const result = await jobApplicationService.updateApplicationStatus(applicationId, JobApplicationStatus.APPLIED);
    
        // Include console log to track updates
        console.log(`Application ${applicationId} status updated to ${JobApplicationStatus.APPLIED}`);
    
        expect(JobApplication.findByIdAndUpdate).toHaveBeenCalledWith(
          new mongoose.Types.ObjectId(applicationId),
          { status: JobApplicationStatus.APPLIED },
          { new: true }
        );
        expect(result).toEqual(updatedApplication);
    
        // Check if the log message was called with the expected message
        expect(console.log).toHaveBeenCalledWith(`Application ${applicationId} status updated to ${JobApplicationStatus.APPLIED}`);
      });
    
      it('should return null if the application is not found', async () => {
        const applicationId = new mongoose.Types.ObjectId().toString();
    
        // Mock the findByIdAndUpdate method to return null
        (JobApplication.findByIdAndUpdate as jest.Mock).mockReturnValueOnce({
          populate: jest.fn().mockResolvedValueOnce(null),
        });
    
        const result = await jobApplicationService.updateApplicationStatus(applicationId, JobApplicationStatus.APPLIED);
    
        // Include console log to indicate not found
        console.log(`Application ${applicationId} not found during status update`);
    
        expect(JobApplication.findByIdAndUpdate).toHaveBeenCalledWith(
          new mongoose.Types.ObjectId(applicationId),
          { status: JobApplicationStatus.APPLIED },
          { new: true }
        );
        expect(result).toBeNull();
    
        // Verify the log message
        expect(console.log).toHaveBeenCalledWith(`Application ${applicationId} not found during status update`);
      });
    
      it('should handle errors gracefully', async () => {
        const applicationId = new mongoose.Types.ObjectId().toString();
    
        // Mock the findByIdAndUpdate method to throw an error
        (JobApplication.findByIdAndUpdate as jest.Mock).mockImplementationOnce(() => {
          throw new Error('Database error');
        });
    
        await expect(
          jobApplicationService.updateApplicationStatus(applicationId, JobApplicationStatus.APPLIED)
        ).rejects.toThrow('Database error');
    
        // Log the error message
        console.log(`Failed to update status for application ${applicationId}: Database error`);
    
        // Verify that the log was called with the error message
        expect(console.log).toHaveBeenCalledWith(`Failed to update status for application ${applicationId}: Database error`);
      });

})

});

