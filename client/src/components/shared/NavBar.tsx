// src/components/shared/NavBar.tsx

import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import the custom hook

const Navbar = () => {
  const { user, logout } = useAuth(); // Use the custom hook

  const isAuthenticated = !!user; // Check if user is authenticated

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Berozgaar
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/jobs" className="hover:underline">
            Jobs
          </Link>
          <Link to="/about" className="hover:underline">
            About
          </Link>
          <Link to="/contact" className="hover:underline">
            Contact
          </Link>
          {isAuthenticated ? (
            <>
              <button
                onClick={logout}
                className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
              <Link to="/profile" className="hover:underline">
                Profile
              </Link>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
