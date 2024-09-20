// src/components/api/api.ts

import axios from "axios";
import { Job } from "../types/JobTypes";
import { SearchCriteria } from "../types/SearchCriteriaTypes";

export const fetchJobs = async (searchCriteria: SearchCriteria): Promise<Job[]> => {
  const response = await axios.get<Job[]>("/api/jobs", {
    params: searchCriteria,
  });
  return response.data;
};

