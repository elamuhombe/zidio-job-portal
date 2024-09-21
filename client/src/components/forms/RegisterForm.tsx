import React, { useState } from "react";
import { RegisterFormProps } from "../types/RegisterFormTypes";

const RegisterForm: React.FC<RegisterFormProps> = ({ userData, handleInputChange, handleRegister }) => {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await handleRegister(e);
    setLoading(false);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-2">
          {userData.role === "employer" ? "Company Name" : "Name"}
        </label>
        <input
          id="name"
          type="text"
          value={userData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          placeholder={userData.role === "employer" ? "Company XYZ" : "John Doe"}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
      <label htmlFor="username" className="block text-sm font-medium text-gray-600 mb-2">Username</label>
      <input
          id="username"
          type="text"
          value={userData.username}
          onChange={(e) => handleInputChange("username", e.target.value)}
          placeholder="jdoe"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
   
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">Email</label>
        <input
          id="email"
          type="email"
          value={userData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          placeholder="johndoe@example.com"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-2">Password</label>
        <input
          id="password"
          type="password"
          value={userData.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
          placeholder="********"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-600 mb-2">Role</label>
        <select
          id="role"
          value={userData.role}
          onChange={(e) => handleInputChange("role", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="jobseeker">Job Seeker</option>
          <option value="employer">Employer</option>
        </select>
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 px-4 ${loading ? 'bg-gray-400' : 'bg-blue-500'} text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
      >
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
};

export default RegisterForm;
