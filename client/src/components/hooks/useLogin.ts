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
  const [credentials, setCredentials] = useState<Credentials>({ email: "", password: "" });
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
      const response = await axios.post(`${process.env.JOB_PORTAL_API_URL}auth/signIn`, credentials);
      const { user, token } = response.data;

      login(user); // Save user in context
      localStorage.setItem("token", token); // Save token for persistence

      // Redirect based on user role
      switch (user.role) {
        case "jobseeker":
          navigate("/jobseeker-dashboard");
          break;
        case "employer":
          navigate("/employer-dashboard");
          break;
        default:
          navigate("/"); // Default route or error page
      }
    } catch (err) {
      console.error(err);
      setError("Invalid email or password.");
    }
  };

  return { credentials, setCredentials, error, handleLogin };
};

export default useLogin;
