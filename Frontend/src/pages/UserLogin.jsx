import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userData, setUserData] = useState({});

  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const userData = {
        email: email,
        password: password,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        userData
      );

      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        navigate("/home");
      }
    } catch (err) {
      if (err.response?.status === 404) {
        setError("No user found. Please signup first!");
      } else {
        setError("Login failed. Please try again.");
      }
      // Clear error after 5 seconds
      setTimeout(() => setError(""), 5000);
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center  bg-gray-50">
      <Navbar/>
      <div className=" max-w-md p-7 mt-4 bg-white rounded-lg shadow-md">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <div>
          <h1 className="text-2xl font-semibold mb-5 text-center">User Login</h1>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <h3 className="text-lg font-medium mb-2">What's your email</h3>
            <input
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
              type="email"
              placeholder="email@example.com"
            />

            <h3 className="text-lg font-medium mb-2">Enter Password</h3>

            <input
              className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              type="password"
              placeholder="password"
            />

            <button className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full  placeholder:text-base">
              Login
            </button>
          </form>
          <p className="text-center">
            New here?{" "}
            <Link to="/signup" className="text-blue-600">
              Create new Account
            </Link>
          </p>
        </div>
        <div>
          <Link
            to="/captain-login"
            className="bg-[#44b410] flex items-center justify-center text-white font-semibold my-4 rounded-lg px-4 py-2 w-full  placeholder:text-base"
          >
            Sign in as Captain
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
