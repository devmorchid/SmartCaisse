import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "js-cookie";

export default function FournisseurIndex() {
  const [fournisseurs, setFournisseurs] = useState([]);
  const [loading, setLoading] = useState(true);
  

  const token = Cookies.get("token");

  useEffect(() => {
    fetchFournisseurs();
  }, []);

  const fetchFournisseurs = async () => {
    try {
      const response = await axios.get("/fournisseurs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data.data ? response.data.data : response.data;
      setFournisseurs(data);
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors du chargement des fournisseurs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce fournisseur ?")) return;

    try {
      await axios.delete(`/fournisseurs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFournisseurs((prev) => prev.filter((f) => f.id !== id));
      alert("Fournisseur supprimé avec succès");
    } catch (error) {
      console.error("Erreur de suppression:", error);
      alert("Impossible de supprimer ce fournisseur");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Chargement des fournisseurs...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Liste des Fournisseurs</h2>
        <Link to="/fournisseurs/create" className="btn btn-success">
          Ajouter un fournisseur
        </Link>
      </div>

      {fournisseurs.length === 0 ? (
        <div className="alert alert-warning text-center">
          Aucun fournisseur trouvé.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered text-center align-middle">
            <thead className="table-light">
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Adresse</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {fournisseurs.map((f) => (
                <tr key={f.id}>
                  <td>{f.nom}</td>
                  <td>{f.email}</td>
                  <td>{f.telephone}</td>
                  <td>{f.adresse}</td>
                  <td>
                    <Link
                      to={`/fournisseurs/${f.id}`}
                      className="btn btn-sm btn-info me-2"
                    >
                      Voir
                    </Link>

                    <Link
                      to={`/fournisseurs/${f.id}/edit`}
                      className="btn btn-sm btn-warning me-2"
                    >
                      Modifier
                    </Link>

                    <button
                      onClick={() => handleDelete(f.id)}
                      className="btn btn-sm btn-danger"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
