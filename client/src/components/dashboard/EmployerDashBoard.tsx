// src/components/dashboard/EmployerDashboard.tsx

import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Job } from "../types/JobTypes"; // Import the Job interface

const EmployerDashboard = () => {
  const { user } = useAuth(); // TypeScript correctly infers this as User | null
  const [jobListings, setJobListings] = useState<Job[]>([]); // Explicitly typed as Job[]

  useEffect(() => {
    if (user) {
      // Ensure user exists before making API call
      const fetchJobListings = async () => {
        try {
          const response = await axios.get(`/api/employer/${user.id}/job-listings`);
          setJobListings(response.data); // Ensure the data conforms to Job[]
        } catch (error) {
          console.error("Error fetching job listings", error);
        }
      };
      fetchJobListings();
    }
  }, [user]);

  if (!user) {
    return <div>Please log in to see your dashboard.</div>;
  }

  return (
    <div>
      <h1>Your Job Listings</h1>
      {jobListings.map((job) => (
        <div key={job.id}>
          <h2>{job.title}</h2>
          <p>{job.description}</p>
        </div>
      ))}
    </div>
  );
};

export default EmployerDashboard;
