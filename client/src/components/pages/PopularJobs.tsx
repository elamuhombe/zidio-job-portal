import { Link } from "react-router-dom";
import {
  FaLaptopCode,
  FaPencilAlt,
  FaDatabase,
  FaMobileAlt,
} from "react-icons/fa";

interface PopularJobsProps {
  location: string;
}

const PopularJobs = ({ location }: PopularJobsProps) => {
  const jobCategories = [
    {
      title: "Front-End Developer",
      company: "Company A",
      location: "Remote",
      icon: <FaLaptopCode className="text-3xl text-blue-500" />,
      link: "/jobs/4",
    },
    {
      title: "Content Writer",
      company: "Company B",
      location: "New York, NY",
      icon: <FaPencilAlt className="text-3xl text-green-500" />,
      link: "/jobs/5",
    },
    {
      title: "Database Administrator",
      company: "Company C",
      location: "San Francisco, CA",
      icon: <FaDatabase className="text-3xl text-red-500" />,
      link: "/jobs/6",
    },
    {
      title: "Mobile Developer",
      company: "Company D",
      location: "Remote",
      icon: <FaMobileAlt className="text-3xl text-purple-500" />,
      link: "/jobs/7",
    },
    // Add more categories as needed
  ];

  // Filter jobs based on the location prop
  const filteredJobs = jobCategories.filter((job) =>
    location ? job.location.toLowerCase().includes(location.toLowerCase()) : true
  );

  return (
    <section className="mb-8 px-4 md:px-8 lg:px-16">
      <h2 className="text-2xl font-semibold mb-4 text-center">Popular Jobs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {filteredJobs.map((job, index) => (
          <div
            key={index}
            className="border p-4 rounded-lg shadow-lg flex items-start space-x-4 bg-white"
          >
            <div className="flex-shrink-0">{job.icon}</div>
            <div>
              <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
              <p className="text-gray-700 mb-1">{job.company}</p>
              <p className="text-gray-500 mb-2">Location: {job.location}</p>
              <Link to={job.link} className="text-blue-500 hover:underline">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularJobs;
