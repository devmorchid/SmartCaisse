import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { FaUsers } from "react-icons/fa";

export default function Users() {
  const token = Cookies.get("token");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data))
      .catch(() => setError("⚠️ Erreur lors du chargement des utilisateurs"));
  }, [token]);

  return (
    <div className="container py-5">
      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-body">
          <h3 className="mb-4 d-flex align-items-center">
            <FaUsers className="me-2 text-primary" /> Liste des utilisateurs
          </h3>

          {error && <div className="alert alert-danger">{error}</div>}

          <div className="table-responsive">
            <table className="table table-hover align-middle text-center">
              <thead className="table-primary">
                <tr>
                  <th>#</th>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Date de création</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((u, i) => (
                    <tr key={u.id}>
                      <td>{i + 1}</td>
                      <td className="fw-bold">{u.name}</td>
                      <td>{u.email}</td>
                      <td>{new Date(u.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-muted">
                      Chargement des utilisateurs...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
