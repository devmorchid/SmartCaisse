import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../../api/axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "js-cookie";

export default function Show() {

  const { id } = useParams();

  
  const token = Cookies.get("token");

  const [fournisseur, setFournisseur] = useState(null);

  useEffect(() => {
    getFournisseur();
  }, []);

  const getFournisseur = async () => {
    try {
      const res = await axios.get(`/fournisseurs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFournisseur(res.data);

    } catch (error) {
      console.error("Erreur:", error);
      alert("Impossible de charger les détails du fournisseur");
    }
  };

  if (!fournisseur) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Chargement des informations...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <div className="card shadow">
        <div className="card-body">

          <h3 className="text-center mb-4">Détails du Fournisseur</h3>

          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Nom :</strong> {fournisseur.nom}
            </li>
            <li className="list-group-item">
              <strong>Email :</strong> {fournisseur.email}
            </li>
            <li className="list-group-item">
              <strong>Téléphone :</strong> {fournisseur.telephone}
            </li>
            <li className="list-group-item">
              <strong>Adresse :</strong> {fournisseur.adresse}
            </li>
          </ul>

          <div className="text-center mt-4">
            <Link to="/fournisseurs" className="btn btn-secondary">
              Retour à la liste
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
