//src/components/jobs/JobList.tsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Job } from "./../types/JobTypes"; // Import the Job type

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]); // Use the Job type

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get<Job[]>("/api/jobs"); // Specify the response type
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div>
      {jobs.map((job) => (
        <div key={job.id}>
          <h2>{job.title}</h2>
          <p>{job.description}</p>
          <Link to={`/job-listing/${job.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default JobList;

