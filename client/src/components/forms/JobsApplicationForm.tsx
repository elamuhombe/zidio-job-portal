// src/components/forms/JobApplicationForm.tsx
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const JobApplicationForm = () => {
  const { id } = useParams<{ id: string }>(); // Job ID from URL
  const [applicationData, setApplicationData] = useState<{
    coverLetter: string;
    resume: File | null;
  }>({
    coverLetter: "",
    resume: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setApplicationData({ ...applicationData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setApplicationData({ ...applicationData, resume: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("coverLetter", applicationData.coverLetter);
    formData.append("resume", applicationData.resume as Blob); // Cast resume to Blob

    try {
      await axios.post(`/api/jobs/${id}/apply`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Application submitted successfully!");
    } catch (err) {
      console.error("Application submission error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        name="coverLetter"
        placeholder="Cover Letter"
        value={applicationData.coverLetter}
        onChange={handleInputChange}
      />
      <input type="file" name="resume" onChange={handleFileChange} />
      <button type="submit">Submit Application</button>
    </form>
  );
};

export default JobApplicationForm;
