import { useEffect, useState } from "react";
import axios from "../api/axios";

function Dashboard() {
  const [stats, setStats] = useState({});
  const [recentVentes, setRecentVentes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setStats(res.data.stats);
        setRecentVentes(res.data.recentVentes);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container mt-5">
      <h2>📊 Tableau de bord</h2>
      <div className="row mt-4">
        <div className="col-md-3">
          <div className="card p-3">
            <h5>Ventes</h5>
            <p>{stats.ventes}</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card p-3">
            <h5>Revenus</h5>
            <p>{stats.revenus} MAD</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card p-3">
            <h5>Produits</h5>
            <p>{stats.produits}</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card p-3">
            <h5>Fournisseurs</h5>
            <p>{stats.fournisseurs}</p>
          </div>
        </div>
      </div>

      <h4 className="mt-5">🧾 Dernières ventes</h4>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Utilisateur</th>
            <th>Total</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {recentVentes.map((vente) => (
            <tr key={vente.id}>
              <td>{vente.id}</td>
              <td>{vente.user?.name}</td>
              <td>{vente.total} MAD</td>
              <td>{new Date(vente.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
