import React, { useState } from "react";
import axios from "axios";
import RegisterForm from "./../forms/RegisterForm";
import Swal from "sweetalert2"; // Import SweetAlert2
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

interface UserData {
  name: string;
  email: string;
  password: string;
  username: string;
  role: "job_seeker" | "employer"; // Specify allowed roles
}

const Register: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    password: "",
    username: "",
    role: "job_seeker",
  });

  const handleInputChange = (field: string, value: string) => {
    setUserData({ ...userData, [field]: value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("User Data:", userData); // Debugging line

    try {
      // Make the API call to register the user
      await axios.post(`https://job-board-api-production.up.railway.app/api/v1/auth/signUp`, userData);
      
      // Display success message
      Swal.fire({
        title: 'Success!',
        text: 'Registration successful!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (err) {
      // Handle errors
      if (axios.isAxiosError(err) && err.response) {
        console.error("Response data:", err.response.data); // Log full response data
        console.error("Error status:", err.response.status); // Log status for reference
        
        // Display specific error messages
        const errorMessages = err.response.data.errors 
          ? err.response.data.errors.join(", ") 
          : "Registration failed. Please check your input.";
        
        Swal.fire({
          title: 'Error!',
          text: errorMessages,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      } else {
        console.error("Unexpected Error:", err);
        Swal.fire({
          title: 'Error!',
          text: 'An unexpected error occurred. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
           {/* Back to Homepage */}
      <Link to="/" className="text-blue-500 flex items-center mb-4 hover:underline">
        <FaArrowLeft className="mr-2" /> Back to Homepage
      </Link>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Register</h2>
        <RegisterForm
          userData={userData}
          handleInputChange={handleInputChange}
          handleRegister={handleRegister}
        />
      </div>
    </div>
  );
};

export default Register;
