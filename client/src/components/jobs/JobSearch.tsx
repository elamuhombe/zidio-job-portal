// src/components/jobs/JobSearch.tsx

import { useState } from "react";
import { fetchJobs } from "./../api/api";
import { SearchCriteria } from "./../types/SearchCriteriaTypes";
import {Job} from "./../types/JobTypes";

const JobSearch: React.FC = () => {
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
    keyword: "",
    location: "",
    jobType: "full-time", // full-time, part-time, etc.
  });
  const [results, setResults] = useState<Job[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSearchCriteria({ ...searchCriteria, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const jobs = await fetchJobs(searchCriteria);
      setResults(jobs);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="keyword"
          value={searchCriteria.keyword}
          onChange={handleInputChange}
          placeholder="Keyword"
        />
        <input
          type="text"
          name="location"
          value={searchCriteria.location}
          onChange={handleInputChange}
          placeholder="Location"
        />
        <select
          name="jobType"
          value={searchCriteria.jobType}
          onChange={handleInputChange}
        >
          <option value="full-time">Full-Time</option>
          <option value="part-time">Part-Time</option>
          <option value="internship">Internship</option>
        </select>
        <button type="submit">Search</button>
      </form>

      <div>
        {results.map((job) => (
          <div key={job.id}>
            <h2>{job.title}</h2>
            <p>{job.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobSearch;
