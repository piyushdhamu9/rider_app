import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";
import Navbar from "../components/Navbar";

const Captainlogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { captain, setCaptain } = React.useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const captain = {
      email: email,
      password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/login`,
      captain
    );

    if (response.status === 200) {
      const data = response.data;

      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/captain-home");
    }

    setEmail("");
    setPassword("");
  };
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      <Navbar />
      <div className="max-w-md p-7 mt-4 bg-white rounded-lg shadow-md">
        <div>
          
          <h1 className="text-2xl font-semibold mb-5 text-center">Captain Login</h1>

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

            <button className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full placeholder:text-base">
              Login
            </button>
          </form>
          
          <p className="text-center mb-6">
            Join a fleet?{" "}
            <Link to="/captain-signup" className="text-blue-600 hover:text-blue-800">
              Register as a Captain
            </Link>
          </p>

          <Link
            to="/login"
            className="bg-[#d5622d] flex items-center justify-center text-white font-semibold rounded-lg px-4 py-2 w-full  hover:bg-[#c4572a]"
          >
            Sign in as User
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Captainlogin;
