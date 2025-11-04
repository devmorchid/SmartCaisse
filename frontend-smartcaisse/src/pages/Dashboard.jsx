import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

const handleLogout = async () => {
  try {
    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:8000/api/logout",
      {},
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  } catch (error) {
    console.error("Erreur lors de la déconnexion:", error.response || error);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  }
};



  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
        <h3 className="fw-bold text-primary">
          👋 Bonjour, {user?.name || "Utilisateur"}
        </h3>
        <button
          className="btn btn-danger px-4 py-2 fw-semibold"
          onClick={handleLogout}
        >
          🚪 Déconnexion
        </button>
      </div>
    </div>
  );
}
