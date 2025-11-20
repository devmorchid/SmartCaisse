import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { FaUserCircle, FaKey } from "react-icons/fa";
import Navbar from "./Navbar";

export default function Profil() {
  const token = Cookies.get("token");
  const [user, setUser] = useState({});
  const [form, setForm] = useState({ name: "", email: "" });
  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data);
        setForm({ name: res.data.name, email: res.data.email });
      })
      .catch(() => setMessage("⚠️ Erreur lors du chargement du profil"));
  }, [token]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8000/api/profile", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("✅ Profil mis à jour avec succès !");
    } catch {
      setMessage("❌ Erreur lors de la mise à jour du profil");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        "http://localhost:8000/api/profile/password",
        passwordData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("🔑 Mot de passe changé avec succès !");
      setPasswordData({
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
      });
    } catch {
      setMessage("❌ Mot de passe actuel incorrect !");
    }
  };

  return (
    <div className="container py-5">
   
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <FaUserCircle size={80} color="#0d6efd" />
                <h4 className="mt-2">{user.name}</h4>
                <p className="text-muted">{user.email}</p>
              </div>

              {message && (
                <div
                  className={`alert ${
                    message.includes("✅") || message.includes("🔑")
                      ? "alert-success"
                      : "alert-danger"
                  }`}
                >
                  {message}
                </div>
              )}

              {/* Formulaire Profile */}
              <form onSubmit={handleProfileUpdate}>
                <h5 className="fw-bold mb-3">📝 Modifier mes informations</h5>
                <input
                  className="form-control mb-2"
                  placeholder="Nom"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                  className="form-control mb-3"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <button type="submit" className="btn btn-primary w-100 mb-4">
                  💾 Enregistrer les modifications
                </button>
              </form>

              {/* Formulaire Password */}
              <form onSubmit={handlePasswordChange}>
  {/* Hidden username/email for accessibility */}
  <input
    type="text"
    name="username"
    value={user.email || ""}
    autoComplete="username"
    style={{ display: "none" }}
    readOnly
  />

  <input
    className="form-control mb-2"
    type="password"
    placeholder="Mot de passe actuel"
    value={passwordData.current_password}
    autoComplete="current-password"
    onChange={(e) =>
      setPasswordData({ ...passwordData, current_password: e.target.value })
    }
  />
  <input
    className="form-control mb-2"
    type="password"
    placeholder="Nouveau mot de passe"
    value={passwordData.new_password}
    autoComplete="new-password"
    onChange={(e) =>
      setPasswordData({ ...passwordData, new_password: e.target.value })
    }
  />
  <input
    className="form-control mb-3"
    type="password"
    placeholder="Confirmer le mot de passe"
    value={passwordData.new_password_confirmation}
    autoComplete="new-password"
    onChange={(e) =>
      setPasswordData({
        ...passwordData,
        new_password_confirmation: e.target.value,
      })
    }
  />
  <button type="submit" className="btn btn-warning w-100">
    🔄 Modifier le mot de passe
  </button>
</form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
