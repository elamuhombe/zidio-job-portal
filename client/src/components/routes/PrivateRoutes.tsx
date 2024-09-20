//src/components/routes/PrivateRoutes.tsx

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  const { user } = useAuth(); // Assume useAuth provides user authentication status

  return user ? element : <Navigate to="/login" />;
};

export default PrivateRoute;

