import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState({ nom: "", role: "", photo: "" });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      setUser(storedUser);
    } else {
      setUser({
        nom: "Admin",
        role: "Admin",
        photo: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
      });
    }
  }, []);

  return (
    <nav className="navbar navbar-light bg-light border-bottom shadow-sm">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <span className="navbar-brand mb-0 h1">Dashboard</span>

        <div className="d-flex align-items-center">
          <span className="me-3 text-muted">
      
            👋 Bienvenue, <strong>{user.nom}</strong>

          </span>

          <img
            src={user.photo}
            alt="profil"
            width="40"
            height="40"
            className="rounded-circle border"
          />
        </div>
      </div>
    </nav>
  );
}
