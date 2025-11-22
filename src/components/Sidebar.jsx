import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AccessDeniedModal from "./AccessDeniedModal";
import {
  HomeIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ClipboardDocumentCheckIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";

const SidebarLink = ({ to, children, icon: Icon, onClick }) => (
  <NavLink
    to={to}
    end
    onClick={onClick} // <-- Close sidebar on mobile
    className={({ isActive }) =>
      `flex items-center px-4 py-3 rounded-lg transition-all duration-200 text-base group
      ${
        isActive
          ? "bg-blue-50 text-blue-500 shadow-md font-medium"
          : "text-gray-400 hover:bg-blue-50 hover:text-blue-500"
      }`
    }
  >
    {Icon && (
      <Icon className="w-5 h-5 mr-3 transition-transform duration-200 group-hover:scale-110" />
    )}
    {children}
  </NavLink>
);

const Sidebar = ({ mobileSidebarOpen, setMobileSidebarOpen }) => {
  const { user } = useAuth();
  const [showAccessDeniedModal, setShowAccessDeniedModal] =
    React.useState(false);

  
const renderLegalNav = () => (
  <div className="mb-6">
    <h3 className="px-4 text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
      Legal Team
    </h3>
    <ul className="space-y-2">
      <li>
        <SidebarLink
          to="/legal"
          icon={HomeIcon}
          onClick={() => setMobileSidebarOpen(false)}
        >
          Dashboard
        </SidebarLink>
      </li>

      <li>
        <SidebarLink
          to="/legal/documents"
          icon={DocumentTextIcon}
          onClick={() => setMobileSidebarOpen(false)}
        >
          Document Validation
        </SidebarLink>
      </li>

      <li>
        <SidebarLink
          to="/legal/agreements"
          icon={ClipboardDocumentCheckIcon}
          onClick={() => setMobileSidebarOpen(false)}
        >
          Agreement Approvals
        </SidebarLink>
      </li>
    </ul>
  </div>
);

const renderNavigation = () => {
    switch (user?.role) {
      case "legal":
        return renderLegalNav();
      default:
        return null;
    }
  };

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-72 bg-white text-gray-400 min-h-screen fixed left-0 top-0 overflow-y-auto border-r border-gray-200">
        <div className="sticky top-0 bg-white z-10 p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-black">BRD Portal</h2>
          {user && (
            <p className="text-sm text-gray-400 mt-1">
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Dashboard
            </p>
          )}
        </div>

        <nav className="p-4">
          <div className="mb-6">
            <h3 className="px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Pages
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setShowAccessDeniedModal(true)}
                  className="flex items-center px-4 py-3 rounded-lg text-base group text-gray-400 hover:bg-blue-50 hover:text-blue-500 w-full text-left"
                >
                  <UserGroupIcon className="w-5 h-5 mr-3" />
                  All Users
                </button>
              </li>
            </ul>
          </div>
          {renderNavigation()}
        </nav>
      </aside>

      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 z-50 bg-white w-64 transform transition-transform duration-300 lg:hidden ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-black">BRD Portal</h2>
          <button
            className="text-gray-500 hover:text-white"
            onClick={() => setMobileSidebarOpen(false)}
          >
            ✕
          </button>
        </div>

        <nav className="p-4">
          <div className="mb-6">
            <h3 className="px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Pages
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    setShowAccessDeniedModal(true);
                    setMobileSidebarOpen(false);
                  }}
                  className="flex items-center px-4 py-3 rounded-lg text-base group text-gray-500 hover:bg-blue-50 hover:text-blue-500 w-full text-left"
                >
                  <UserGroupIcon className="w-5 h-5 mr-3" />
                  All Users
                </button>
              </li>
            </ul>
          </div>
          {renderNavigation()}
        </nav>
      </div>

      <AccessDeniedModal
        isOpen={showAccessDeniedModal}
        onClose={() => setShowAccessDeniedModal(false)}
        message="You are not allowed in this domain"
      />
    </>
  );
};

export default Sidebar;

