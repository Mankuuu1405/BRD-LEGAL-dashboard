import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Bars3Icon } from "@heroicons/react/24/outline";

// Helper to get initials from name
const getInitials = (name) => {
  if (!name) return "U"; // fallback if name missing
  const words = name.trim().split(" ");
  if (words.length === 1) return words[0][0].toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
};

const Header = ({ setMobileSidebarOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex justify-between items-center">
      <div className="flex items-center">
        {/* Hamburger only on mobile */}
        <button
          className="lg:hidden mr-4 text-gray-700"
          onClick={() => setMobileSidebarOpen(true)}
        >
          <Bars3Icon className="w-6 h-6" />
        </button>

        <span className="ml-3 text-xl font-semibold text-gray-800">
          BRD Portal
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* === USER SECTION (Now visible on MOBILE also) === */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/profile")}
        >
          {/* Name (hidden on mobile) */}
          <div className="flex flex-col">
            <p className="text-gray-900 font-medium text-lg">
              Welcome, {user?.name || "User"}
            </p>
          </div>

          {/* Avatar */}
          {user?.profileImage ? (
            <img
              src={user.profileImage}
              alt={user?.name || "User"}
              className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-medium text-sm border-2 border-blue-500">
              {getInitials(user?.name)}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
