//src/components/pages/ HowOurWebsiteWorks.tsx

import { FaUserPlus, FaUpload, FaSearch, FaCheck } from "react-icons/fa";

const HowOurWebsiteWorks = () => {
  return (
    <section className="mb-8 px-4 md:px-8 lg:px-16">
      <h2 className="text-2xl font-semibold mb-8 text-center">
        How Our Website Works
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        <div className="p-6 border rounded-lg shadow-lg text-center bg-white">
          <FaUserPlus className="text-4xl mb-4 mx-auto text-blue-500" />
          <h3 className="text-lg font-semibold mb-2">Create Account</h3>
          <p className="text-gray-700">
            Sign up to start using our platform and explore job opportunities.
          </p>
        </div>
        <div className="p-6 border rounded-lg shadow-lg text-center bg-white">
          <FaUpload className="text-4xl mb-4 mx-auto text-green-500" />
          <h3 className="text-lg font-semibold mb-2">Upload Resume</h3>
          <p className="text-gray-700">
            Upload your resume to be discovered by potential employers.
          </p>
        </div>
        <div className="p-6 border rounded-lg shadow-lg text-center bg-white">
          <FaSearch className="text-4xl mb-4 mx-auto text-purple-500" />
          <h3 className="text-lg font-semibold mb-2">Find Suitable Jobs</h3>
          <p className="text-gray-700">
            Browse and search for jobs that match your skills and preferences.
          </p>
        </div>
        <div className="p-6 border rounded-lg shadow-lg text-center bg-white">
          <FaCheck className="text-4xl mb-4 mx-auto text-orange-500" />
          <h3 className="text-lg font-semibold mb-2">Apply for Jobs</h3>
          <p className="text-gray-700">
            Apply for jobs directly through our platform.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowOurWebsiteWorks;
