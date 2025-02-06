import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
import Navbar from "../components/Navbar";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  const { user, setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/register`,
      newUser
    );

    if (response.status === 201) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/home");
    }

    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
  };
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      <Navbar />
      <div className=" max-w-md p-7 mt-4 bg-white rounded-lg shadow-md">
        <div>
         
          <h1 className="text-2xl font-semibold mb-5 text-center">Create Account</h1>

          <form onSubmit={submitHandler}>
            <h3 className="text-base font-medium mb-2">What's your name</h3>
            <div className="flex gap-4 mb-6">
              <input
                required
                className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border placeholder:text-sm"
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                required
                className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border placeholder:text-sm"
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <h3 className="text-base font-medium mb-2">What's your email</h3>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#eeeeee] mb-6 rounded-lg px-4 py-2 border w-full placeholder:text-sm"
              type="email"
              placeholder="email@example.com"
            />

            <h3 className="text-base font-medium mb-2">Enter Password</h3>
            <input
              className="bg-[#eeeeee] mb-6 rounded-lg px-4 py-2 border w-full placeholder:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              placeholder="password"
            />

            <button className="bg-black text-white font-semibold mb-4 rounded-lg px-4 py-2 w-full text-lg hover:bg-gray-800">
              Create account
            </button>
          </form>

          <p className="text-center mb-6">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:text-blue-800">
              Login here
            </Link>
          </p>

          <p className="text-[10px] leading-tight text-gray-500">
            This site is protected by reCAPTCHA and the{" "}
            <span className="underline cursor-pointer">Google Privacy Policy</span> and{" "}
            <span className="underline cursor-pointer">Terms of Service apply</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
