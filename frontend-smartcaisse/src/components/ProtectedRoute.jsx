
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
   //Il n'a pas de jeton => Retour à la page de connexion
    return <Navigate to="/" replace />;
  }

  return children;
}
