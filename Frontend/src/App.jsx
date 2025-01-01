import React from "react";
import Home from "./pages/Home";
import Userlogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignUp";
import CaptainLogin from "./pages/Captainlogin";
import CaptainSignup from "./pages/CaptainSignup";
import { Routes,Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/login" element={<Userlogin/>}/>
        <Route path="/signup" element={<UserSignup/>}/>
        <Route path="/captain-login" element={<CaptainLogin/>}/>
        <Route path="/captain-signup" element={<CaptainSignup/>}/>
      </Routes>
    </div>
  );
};

export default App;
