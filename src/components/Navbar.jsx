import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const role = currentUser?.role;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  const dashboardPath = role === "manager" ? "/dashboard" : "/my-tasks";

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link to={dashboardPath} className="text-2xl font-extrabold hover:text-gray-300 transition-colors">
        BugTracker 
      </Link>

      <div className="flex items-center space-x-6">
        {role === "manager" && (
          <>
            <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link to="/reports" className="text-gray-300 hover:text-white transition-colors">
              Reports
            </Link>
          </>
        )}

        {role === "developer" && (
          <>
            
            <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors">
              Dashboard
            </Link>
          </>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <span className="text-gray-400 text-sm">Hello, {currentUser?.name}</span>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;