import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "js-cookie";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();


  const token = Cookies.get("token");

  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    adresse: "",
  });

  const [loading, setLoading] = useState(true);

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

      setFormData(res.data);

    } catch (error) {
      console.error("Erreur:", error);
      alert("Impossible de charger le fournisseur");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`/fournisseurs/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Fournisseur modifié avec succès");
      navigate("/fournisseurs");

    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la modification");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <div className="card shadow">
        <div className="card-body">

          <h3 className="text-center mb-4">Modifier le Fournisseur</h3>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">Nom</label>
              <input
                type="text"
                className="form-control"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Téléphone</label>
              <input
                type="text"
                className="form-control"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Adresse</label>
              <input
                type="text"
                className="form-control"
                name="adresse"
                value={formData.adresse}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Enregistrer les modifications
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}
