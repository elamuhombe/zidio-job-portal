import { useState } from "react";
import Layout from "../layout/Layout";
import SignUp from "../SignUp";
import FeaturedJobs from "./FeaturedJobs";
import PopularJobs from "./PopularJobs";
import Stats from "../Stats";
import PopularCategory from "../PopularCategory";

export default function HomePage() {
  const [location, setLocation] = useState<string>("");

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  return (
    <div>
      <Layout>
        <header className="text-center mb-8 px-4 md:px-8 lg:px-16">
          <h1 className="text-4xl font-bold mb-2">Welcome to Berozgaar</h1>
          <p className="text-lg">
            Your ultimate destination for job listings and career opportunities
          </p>
        </header>
        <section className="bg-white p-6 rounded-lg shadow-lg mb-8 px-4 md:px-8 lg:px-16">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Find Your Perfect Job
          </h2>
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
            <input
              type="text"
              placeholder="Job title, keywords, or company"
              className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={handleLocationChange}
              className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            />
            <button className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-sm hover:bg-blue-600">
              Search
            </button>
          </div>
        </section>
        <Stats />
        <PopularJobs location={location} />
        <FeaturedJobs location={location} />
        <PopularCategory />
        <SignUp />
      </Layout>
    </div>
  );
}
