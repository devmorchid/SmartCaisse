import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function Dashboard() {
  const token = Cookies.get("token");
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(res.data);
    } catch (err) {
      console.error(err);
      alert("Erreur de chargement du tableau de bord !");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-5">Chargement...</p>;
  if (!stats) return null;

  return (
    <div className="container mt-4">
      <h3 className="fw-bold mb-4 text-primary">📊 Tableau de bord</h3>

      {/* --- Cartes principales --- */}
      <div className="row g-3 mb-4">
        {[
          { title: "Total Ventes", value: stats.totalVentes, color: "primary" },
          { title: "Revenu Total", value: stats.revenuTotal + " DH", color: "success" },
          { title: "Produits", value: stats.produitsCount, color: "info" },
          { title: "Fournisseurs", value: stats.fournisseursCount, color: "warning" },
          { title: "Colis Reçus", value: stats.colisCount, color: "secondary" },
          { title: "Stock Faible", value: stats.stockFaible, color: "danger" },
        ].map((card, i) => (
          <div key={i} className="col-md-4 col-lg-3">
            <div className={`card border-0 shadow-sm text-center text-${card.color}`}>
              <div className="card-body">
                <h6 className="fw-bold text-secondary">{card.title}</h6>
                <h3 className={`fw-bold text-${card.color}`}>{card.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- Paiements --- */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <h5 className="fw-bold mb-3">💰 Répartition des paiements</h5>
          <ul className="list-group">
            {Object.entries(stats.paiements).map(([method, total]) => (
              <li key={method} className="list-group-item d-flex justify-content-between">
                <span className="text-capitalize">{method}</span>
                <span className="fw-bold">{total} DH</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* --- Cheques --- */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <h5 className="fw-bold mb-3">🧾 Statistiques des chèques</h5>
          <div className="d-flex justify-content-around">
            <div className="text-success fw-bold">Encaissés : {stats.cheques.encaissés}</div>
            <div className="text-warning fw-bold">En attente : {stats.cheques.en_attente}</div>
          </div>
        </div>
      </div>

      {/* --- Dernières ventes --- */}
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <h5 className="fw-bold mb-3">🧾 Dernières ventes</h5>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Total</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {stats.lastVentes.map((v) => (
                <tr key={v.id}>
                  <td>{v.id}</td>
                  <td>{v.total} DH</td>
                  <td>{new Date(v.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
