// src/components/dashboard/JobSeekerDashboard.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Job } from "../types/JobTypes"; // Import the Job interface

const JobSeekerDashboard = () => {
  const { user } = useAuth(); // TypeScript correctly infers this as User | null
  const [appliedJobs, setAppliedJobs] = useState<Job[]>([]); // Explicitly typed as Job[]

  useEffect(() => {
    if (user) {
      // Ensure user exists before making API call
      const fetchAppliedJobs = async () => {
        try {
          const response = await axios.get(
            `/api/job-seeker/${user.id}/applied-jobs`
          );
          setAppliedJobs(response.data); // Ensure the data conforms to Job[]
        } catch (error) {
          console.error("Error fetching applied jobs", error);
        }
      };
      fetchAppliedJobs();
    }
  }, [user]);

  if (!user) {
    return <div>Please log in to see your dashboard.</div>;
  }

  return (
    <div>
      <h1>Your Applied Jobs</h1>
      {appliedJobs.map((job) => (
        <div key={job.id}>
          <h2>{job.title}</h2>
          <p>{job.status}</p>
        </div>
      ))}
    </div>
  );
};

export default JobSeekerDashboard;
