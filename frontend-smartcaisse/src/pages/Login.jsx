import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "js-cookie";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://127.0.0.1:8000";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.get("/sanctum/csrf-cookie");

      const res = await axios.post("/api/login", { email, password });

      // TOKEN
      localStorage.setItem("token", res.data.token);
      Cookies.set("token", res.data.token);

    
      localStorage.setItem(
        "user",
        JSON.stringify({
          nom: res.data.user.nom,
          email: res.data.user.email,
          role: res.data.user.role,      
          photo:
            res.data.user.photo ??
            "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        })
      );

      navigate("/dashboard");
    } catch (err) {
      setError("Email ou mot de passe incorrect");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "350px" }}>
        <h3 className="text-center mb-3">Connexion</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label>Email :</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username" 
            />
          </div>

          <div className="mb-3">
            <label>Mot de passe :</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
               autoComplete="current-password" 
            />
          </div>

          <button className="btn btn-primary w-100" type="submit">
            Se connecter
          </button>
        </form>

        <p className="text-center mt-3">
          Pas encore de compte ? <Link to="/register">Créer un compte</Link>
        </p>
      </div>
    </div>
  );
}
