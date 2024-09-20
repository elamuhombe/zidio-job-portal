// src/components/pages/SignUp.tsx

import { FaUser, FaBriefcase } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <section className="text-center mt-8 px-4 md:px-8 lg:px-16">
      <h2 className="text-2xl font-semibold mb-6">Get Started</h2>
      <p className="mb-6">
        Sign up or log in to start applying for jobs and managing your career.
      </p>
      <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6">
        {/* Candidate Sign Up Card */}
        <div className="border p-6 rounded-lg shadow-lg flex flex-col items-center max-w-xs mx-auto transform transition-transform hover:scale-105 hover:shadow-xl">
          <FaUser className="text-4xl mb-4 text-blue-500" />
          <h3 className="text-xl font-semibold mb-2">Sign Up for Candidate</h3>
          <p className="mb-4 text-gray-600">
            Create an account to apply for jobs, upload your resume, and track
            your applications.
          </p>
          <Link
            to="/register"
            state={{ userType: "candidate" }} // state is passed separately in React Router v6
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Register as Candidate
          </Link>
        </div>
        {/* Employer Sign Up Card */}
        <div className="border p-6 rounded-lg shadow-lg flex flex-col items-center max-w-xs mx-auto transform transition-transform hover:scale-105 hover:shadow-xl">
          <FaBriefcase className="text-4xl mb-4 text-green-500" />
          <h3 className="text-xl font-semibold mb-2">Sign Up for Employer</h3>
          <p className="mb-4 text-gray-600">
            Create an account to post job openings, view candidate profiles, and
            manage your company’s recruitment.
          </p>
          <Link
            to="/register"
            state={{ userType: "employer" }} // state is passed separately in React Router v6
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Register as Employer
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
