// src/components/hooks/useLogin.ts
import { useState } from "react";
import useAuth from "./useAuth"; // Use the custom hook
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Credentials {
  email: string;
  password: string;
}

const useLogin = () => {
  const { login } = useAuth(); // Now using the custom hook
  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!credentials.email || !credentials.password) {
      setError("Please fill in both fields.");
      return;
    }
    try {
      const response = await axios.post(
        `https://job-board-api-production.up.railway.app/api/v1/auth/signIn`,
        credentials
      );
      const { data } = response;
      const user = data.data.user; 
      const {  access_token: token } = data.data.access_token; 

    
      console.log("response:", response);
      console.log("response data:", data);
      console.log("user:", data.data.user);


      if (!user) {
        setError("User data is missing in the response.");
        return;
      }
  
      login(user); // Save user in context
      localStorage.setItem("token", token); // Save token for persistence
  
      // Redirect based on user role
      if (user.role) {
        switch (user.role) {
          case "job_seeker":
            navigate("/jobseeker-dashboard");
            break;
          case "employer":
            navigate("/employer-dashboard");
            break;
          default:
            navigate("/");
        }
      } else {
        setError("Role is not defined.");
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        console.error("API Error:", err.response.data);
        setError(err.response.data.message || "An error occurred.");
      } else {
        console.error("Unknown Error:", err);
        setError("Invalid email or password.");
      }
    }
  };

  return { credentials, setCredentials, error, handleLogin };
};

export default useLogin;
