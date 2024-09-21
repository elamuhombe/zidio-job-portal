import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import routing components from react-router-dom
import Login from "./components/pages/Login"; // Import Login component
import Register from "./components/pages/Register"; // Import Register component
import JobList from "./components/jobs/JobList"; // Import JobList component
import JobDetails from "./components/jobs/JobDetail"; // Import JobDetails component
import JobSeekerDashboard from "./components/dashboard/JobSeekerDashboard"; // Import JobSeekerDashboard component
import EmployerDashboard from "./components/dashboard/EmployerDashBoard"; // Import EmployerDashboard component
import AuthProvider from "./components/context/AuthContext"; // Import AuthProvider for authentication context
import PrivateRoute from "./components/routes/PrivateRoutes"; // Import PrivateRoute for protected routes
import HomePage from "./components/pages/HomePage"; // Import HomePage component
import "./App.css"; // Import App-level CSS
import "./index.css"; // Import global styles

const App = () => {
  return (
    <AuthProvider> {/* Provide authentication context to the application */}
      <Router> {/* Set up routing for the application */}
        <Routes> {/* Define all the application routes */}
          <Route path="/" element={<HomePage />} /> {/* Define a route for the root path */}
          <Route path="/login" element={<Login />} /> {/* Route for the login page */}
          <Route path="/register" element={<Register />} /> {/* Route for the registration page */}
          <Route path="/jobs" element={<JobList />} /> {/* Route for listing jobs */}
          <Route path="/jobs/:id" element={<JobDetails />} /> {/* Route for job details, using job ID as a parameter */}
          <Route
            path="/job-seeker/dashboard"
            element={<PrivateRoute element={<JobSeekerDashboard />} />} {/* Protected route for job seeker dashboard */}
          />
          <Route
            path="/employer/dashboard"
            element={<PrivateRoute element={<EmployerDashboard />} />} {/* Protected route for employer dashboard */}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App; // Export the App component for use in other parts of the application
