import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserProtectWrapper = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Redirect to login if no token is found
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // Optional: Show a loader or fallback UI while redirecting
  if (!token) {
    return <div>Redirecting...</div>;
  }

  return <>{children}</>;
};

export default UserProtectWrapper;
