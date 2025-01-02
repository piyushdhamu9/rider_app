import React from "react";
import Start from "./pages/Start";
import Home from "./pages/Home";
import Userlogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignUp";
import CaptainLogin from "./pages/Captainlogin";
import CaptainSignup from "./pages/CaptainSignup";
import { Routes, Route } from "react-router-dom";
import UserProtectWrapper from "./pages/UserProtectWrapper";
import UserLogout from "./pages/UserLogout";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<Userlogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route
          path="/home"
          element={
            <UserProtectWrapper>
              <Home />
            </UserProtectWrapper>
          }
        />
        <Route
          path="/logout"
          element={
            <UserProtectWrapper>
              <UserLogout />
            </UserProtectWrapper>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
