import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CaptainLogout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const logoutCaptain = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/captains/logout`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          localStorage.removeItem("token");
          navigate("/captain-login");
        }
      } catch (error) {
        console.error("Logout failed:", error);
        // Optionally navigate to a safe page or show an error message
      }
    };

    logoutCaptain();
  }, [token, navigate]);

  return <div>Logging you out...</div>;
};

export default CaptainLogout;
