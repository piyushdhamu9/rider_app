import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="w-full bg-black text-white p-2 flex justify-between items-center">
      <div className="text-3xl mx-11">
        <Link to="/home">Rider</Link>
      </div>
      <div className="text-base space-x-4 mx-6 flex items-center">
        <button className="p-1">EN</button>
        <button className="p-1">Help</button>
        <div className="relative">
          <img
            className="invert cursor-pointer"
            width="24"
            height="24"
            src="https://img.icons8.com/ios-filled/50/user-male-circle.png"
            alt="user-male-circle"
            onClick={() => setShowDropdown(!showDropdown)}
          />
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
