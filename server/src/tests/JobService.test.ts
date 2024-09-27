import { JobService } from '../services/JobService'; // Ensure the path is correct
import { Job } from '../models/Job'; // Adjust import paths as needed
import { User } from '../models/User'; // Adjust import paths as needed
import { Conflict } from '../middleware/Error';
import { Types } from 'mongoose';

jest.mock('../models/Job'); // Mock the Job model
jest.mock('../models/User'); // Mock the User model

describe('JobService', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  it('should create a job successfully', async () => {
    const jobPayload = {
      title: "Job Title",
      description: "Job Description",
      qualifications: ["Degree in Computer Science"],
      responsibilities: ["Develop applications", "Test applications"],
      location: "Remote",
      salaryRange: { min: 50000, max: 70000 },
      category: new Types.ObjectId(), // Use ObjectId here
      employer_id: new Types.ObjectId(), // Use ObjectId here
      applications: [], // Initialize as an empty array
      company: "Example Company",
    };

    const savedJob = {
      _id: new Types.ObjectId(), // Ensure _id is an ObjectId
      ...jobPayload,
    };

    (Job.findOne as jest.Mock).mockResolvedValue(null); // No job exists
    (Job.prototype.save as jest.Mock).mockResolvedValue(savedJob); // Mock save
    (User.findByIdAndUpdate as jest.Mock).mockResolvedValue(null); // Mock user update

    console.log('Attempting to create a job with payload:', jobPayload); // Log job payload
    const result = await JobService.createJob(jobPayload);

    console.log('Job created successfully:', result); // Log the result of the job creation
    expect(result).toEqual({
      message: "Job Created Successfully",
      job: savedJob,
    });
  });

  it('should throw Conflict error if job already exists', async () => {
    const jobPayload = {
      title: 'Test Job',
      description: 'Job Description',
      qualifications: ["Degree in Computer Science"], // Include qualifications for consistency
      responsibilities: ["Develop applications", "Test applications"], // Include responsibilities for consistency
      location: "Remote",
      salaryRange: { min: 50000, max: 70000 },
      category: new Types.ObjectId(), // Use ObjectId here
      employer_id: new Types.ObjectId(), // Use ObjectId here
      applications: [], // Initialize as an empty array
      company: "Example Company",
    };

    const existingJob = {
      _id: new Types.ObjectId(), // Ensure _id is an ObjectId
      title: 'Test Job',
      description: 'Job Description',
    };

    (Job.findOne as jest.Mock).mockResolvedValue(existingJob); // Job exists

    console.log('Checking for existing job with payload:', jobPayload); // Log job payload before check

    await expect(JobService.createJob(jobPayload)).rejects.toThrow(Conflict);
    console.log('Conflict error thrown as expected for existing job.'); // Log if conflict error is thrown
  });
});
