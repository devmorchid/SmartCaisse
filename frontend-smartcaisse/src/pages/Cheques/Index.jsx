import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function Cheques() {
  const token = Cookies.get("token");
  const [cheques, setCheques] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCheques();
  }, []);

  const fetchCheques = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/cheques", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCheques(res.data);
    } catch (err) {
      console.error(err);
      alert("Erreur lors du chargement des chèques !");
    } finally {
      setLoading(false);
    }
  };

  const encaisserCheque = async (id) => {
    if (!window.confirm("Confirmer l'encaissement de ce chèque ?")) return;
    try {
      await axios.put(`http://127.0.0.1:8000/api/cheques/${id}/encaisser`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Chèque encaissé !");
      fetchCheques();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'encaissement !");
    }
  };

  if (loading) return <p className="text-center mt-5">Chargement...</p>;

  return (
    <div className="container mt-4">
      <h3 className="fw-bold mb-4 text-primary">🧾 Liste des chèques</h3>
      <div className="row g-3">
        {cheques.map((c) => (
          <div key={c.id} className="col-md-4">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <h5 className="fw-bold text-dark mb-2">🏦 {c.banque}</h5>
                <p className="mb-1"><strong>Numéro :</strong> {c.numero}</p>
                <p className="mb-1"><strong>Date encaissement :</strong> {c.date_encaissement}</p>
                <p className="mb-1"><strong>Montant :</strong> {c.montant} DH</p>
                <span
                  className={`badge ${
                    c.statut === "encaissé" ? "bg-success" : "bg-warning text-dark"
                  }`}
                >
                  {c.statut}
                </span>
              </div>
              {c.statut !== "encaissé" && (
                <div className="card-footer bg-white border-0 text-center">
                  <button
                    onClick={() => encaisserCheque(c.id)}
                    className="btn btn-success btn-sm fw-bold"
                  >
                    💰 Encaisser
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
