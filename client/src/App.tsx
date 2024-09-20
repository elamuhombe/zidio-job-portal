
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import JobList from "./components/jobs/JobList";
import JobDetails from "./components/jobs/JobDetail";
import JobSeekerDashboard from "./components/dashboard/JobSeekerDashboard";
import EmployerDashboard from "./components/dashboard/EmployerDashBoard";
import AuthProvider from "./components/context/AuthContext";
import PrivateRoute from "./components/routes/PrivateRoutes";
import HomePage from "./components/pages/HomePage"; 
import "./App.css";
import "./index.css";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Define a route for the root path */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobs" element={<JobList />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route
            path="/job-seeker/dashboard"
            element={<PrivateRoute element={<JobSeekerDashboard />} />} 
          />
          <Route
            path="/employer/dashboard"
            element={<PrivateRoute element={<EmployerDashboard />} />} 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
