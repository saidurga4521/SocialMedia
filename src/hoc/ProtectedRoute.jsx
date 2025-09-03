import React from "react";
import { getAuthToken } from "../helpers/Localstorage";
import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const ProtectedRoute = ({ children, isPublic = false }) => {
  const token = getAuthToken();
  console.log(token);
  if (!token && !isPublic) {
    return <Navigate to="/login" replace />;
  }
  if (token && isPublic) {
    return <Navigate to="/" replace />;
  }
  return !isPublic ? (
    <div>
      <div>
        <Navbar />
      </div>
      <div>{children}</div>
    </div>
  ) : (
    children
  );
};

export default ProtectedRoute;
