import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FaUser, FaUsers, FaSignOutAlt, FaCogs } from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/login"); 
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3 px-4 mb-4 rounded-bottom-4">
      <div className="container-fluid">
        {/* Logo / Title */}
        <NavLink className="navbar-brand fw-bold text-primary" to="/">
          <FaCogs className="me-2" />
          SmartCaisse
        </NavLink>

        {/* Toggle for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item mx-2">
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center gap-1 ${
                    isActive ? "text-primary fw-bold" : "text-dark"
                  }`
                }
              >
                <FaUser /> Profil
              </NavLink>
            </li>

            <li className="nav-item mx-2">
              <NavLink
                to="/users"
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center gap-1 ${
                    isActive ? "text-primary fw-bold" : "text-dark"
                  }`
                }
              >
                <FaUsers /> Utilisateurs
              </NavLink>
            </li>

            <li className="nav-item mx-2">
              <button
                className="btn btn-outline-danger d-flex align-items-center gap-2"
                onClick={handleLogout}
              >
                <FaSignOutAlt /> Déconnexion
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
