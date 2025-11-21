import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Bars3Icon } from "@heroicons/react/24/outline";

const Header = ({ setMobileSidebarOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <div className="flex items-center">
        {/* Hamburger only on mobile */}
        <button
          className="lg:hidden mr-4 text-gray-800"
          onClick={() => setMobileSidebarOpen(true)}
        >
          <Bars3Icon className="w-6 h-6" />
        </button>

        <img
          src="/logo.png"
          alt="BRD Logo"
          className="h-10 w-auto"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/40x40?text=BRD";
          }}
        />
        <span className="ml-3 text-xl font-semibold text-gray-800">
          BRD Portal
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* User info: hidden on mobile, visible from md */}
        <div className="hidden md:text-right md:mr-4 md:flex md:flex-col">
          <p className="text-sm font-medium text-gray-900">
            {user?.name || "User"}
          </p>
          <p className="text-xs text-gray-500">
            {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
          </p>
        </div>

        <button
          onClick={() => navigate("/profile")}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:shadow-lg"
        >
          Profile
        </button>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:shadow-lg"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
