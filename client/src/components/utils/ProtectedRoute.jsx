import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // Redirect to login page if user is not authenticated
    return <Navigate to="/slogin" />;
  }

  return children;
};

export default ProtectedRoute;
