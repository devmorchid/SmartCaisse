import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "js-cookie";

export default function Create() {
  const navigate = useNavigate();


  const token = Cookies.get("token");

  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    adresse: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/fournisseurs", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Fournisseur ajouté avec succès");
      navigate("/fournisseurs");

    } catch (error) {
      console.error("Erreur:", error);
      alert("Impossible d'ajouter le fournisseur");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <div className="card shadow">
        <div className="card-body">
          <h3 className="text-center mb-4">Ajouter un fournisseur</h3>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nom</label>
              <input
                type="text"
                name="nom"
                className="form-control"
                value={formData.nom}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Téléphone</label>
              <input
                type="text"
                name="telephone"
                className="form-control"
                value={formData.telephone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Adresse</label>
              <input
                type="text"
                name="adresse"
                className="form-control"
                value={formData.adresse}
                onChange={handleChange}
                required
              />
            </div>

            <div className="d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/fournisseurs")}
              >
                Retour
              </button>

              <button type="submit" className="btn btn-primary">
                Enregistrer
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
