import React, { useState } from "react";
import api from "../api/axios";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    api.put("/profile/password", {
      current_password: currentPassword,
      new_password: newPassword,
      new_password_confirmation: confirmPassword,
    })
      .then(() => setMessage("✅ Mot de passe modifié avec succès !"))
      .catch((err) => {
        const msg = err.response?.data?.message || "❌ Erreur lors du changement";
        setMessage(msg);
      });
  };

  return (
    <div className="container mt-4">
      <h3>🔒 Changer le mot de passe</h3>
      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Mot de passe actuel :</label>
          <input
            type="password"
            className="form-control"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Nouveau mot de passe :</label>
          <input
            type="password"
            className="form-control"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Confirmer le nouveau mot de passe :</label>
          <input
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-warning">Modifier</button>
      </form>
    </div>
  );
}
