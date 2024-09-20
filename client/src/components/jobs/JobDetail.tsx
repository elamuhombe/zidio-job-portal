import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Job } from "../types/JobTypes"; // Import the Job interface

const JobDetails = () => {
  const { id } = useParams<{ id: string }>(); // Correctly type the useParams to ensure id is a string
  const [job, setJob] = useState<Job | null>(null); // State typed as Job or null

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`/api/jobs/${id}`);
        setJob(response.data); // TypeScript will infer this as a Job based on the state type
      } catch (error) {
        console.error("Error fetching job details", error);
      }
    };
    if (id) {
      fetchJobDetails();
    }
  }, [id]);

  return (
    <div>
      {job ? (
        <>
          <h1>{job.title}</h1>
          <p>{job.description}</p>
          {/* Add a button to apply for this job */}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default JobDetails;
