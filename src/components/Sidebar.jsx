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
          ? "bg-white text-gray-900 shadow-md font-medium"
          : "text-gray-300 hover:bg-gray-800 hover:text-white"
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


  // const renderValuationNav = () => (
  //   <div className="mb-6">
  //     <h3 className="px-4 text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
  //       Valuation
  //     </h3>
  //     <ul className="space-y-2">
  //       <li>
  //         <SidebarLink
  //           to="/valuation"
  //           icon={HomeIcon}
  //           onClick={() => setMobileSidebarOpen(false)} // close sidebar on mobile
  //         >
  //           Dashboard
  //         </SidebarLink>
  //       </li>
  //       <li>
  //         <SidebarLink
  //           to="/valuation/field-verifications"
  //           icon={BuildingLibraryIcon}
  //           onClick={() => setMobileSidebarOpen(false)}
  //         >
  //           Field Verifications
  //         </SidebarLink>
  //       </li>
  //       <li>
  //         <SidebarLink
  //           to="/valuation/property-checks"
  //           icon={ClipboardDocumentCheckIcon}
  //           onClick={() => setMobileSidebarOpen(false)}
  //         >
  //           Property Checks
  //         </SidebarLink>
  //       </li>
  //     </ul>
  //   </div>
  // );

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
      <aside className="hidden lg:block w-72 bg-gray-900 text-white min-h-screen fixed left-0 top-0 overflow-y-auto shadow-xl">
        <div className="sticky top-0 bg-gray-900 z-10 p-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold text-white">BRD Portal</h2>
          {user && (
            <p className="text-sm text-gray-400 mt-1">
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Dashboard
            </p>
          )}
        </div>

        <nav className="p-4">
          <div className="mb-6">
            <h3 className="px-4 text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Pages
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setShowAccessDeniedModal(true)}
                  className="flex items-center px-4 py-3 rounded-lg text-base group text-gray-300 hover:bg-gray-800 hover:text-white w-full text-left"
                >
                  <UserGroupIcon className="w-5 h-5 mr-3 text-gray-400" />
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
        className={`fixed inset-0 z-50 bg-gray-900 w-64 transform transition-transform duration-300 lg:hidden ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">BRD Portal</h2>
          <button
            className="text-gray-400 hover:text-white"
            onClick={() => setMobileSidebarOpen(false)}
          >
            ✕
          </button>
        </div>

        <nav className="p-4">
          <div className="mb-6">
            <h3 className="px-4 text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Pages
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    setShowAccessDeniedModal(true);
                    setMobileSidebarOpen(false);
                  }}
                  className="flex items-center px-4 py-3 rounded-lg text-base group text-gray-300 hover:bg-gray-800 hover:text-white w-full text-left"
                >
                  <UserGroupIcon className="w-5 h-5 mr-3 text-gray-400" />
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

