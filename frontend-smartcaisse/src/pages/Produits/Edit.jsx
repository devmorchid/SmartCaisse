import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Récupération du token
  const token = Cookies.get("token");

  const [form, setForm] = useState({
    nom: "",
    prix_vente: "",
    cout: "",
    quantite_stock: "",
    stock_minimum: "",
    categorie: "",
    fournisseur_id: "",
    reference: "",
    barcode: "",
  });

  const [fournisseurs, setFournisseurs] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {

    axios
      .get(`http://localhost:8000/api/produits/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const produit = res.data;

        setForm({
          nom: produit.nom,
          prix_vente: produit.prix_vente,
          cout: produit.cout,
          quantite_stock: produit.quantite_stock,
          stock_minimum: produit.stock_minimum,
          categorie: produit.categorie,
          fournisseur_id: produit.fournisseur_id,
          reference: produit.reference,
          barcode: produit.barcode,
        });

        if (produit.image) {
          setPreviewImage(`http://localhost:8000/storage/${produit.image}`);
        }
      })
      .catch((err) => console.error(err));

    axios
      .get("http://localhost:8000/api/fournisseurs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setFournisseurs(res.data))
      .catch((err) => console.error(err));

  }, [id, token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(form).forEach((key) => data.append(key, form[key]));
    if (selectedFile) data.append("image", selectedFile);

    axios
      .post(`http://localhost:8000/api/produits/${id}?_method=PUT`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => navigate("/produits"))
      .catch((err) => console.error(err));
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Modifier le produit</h1>

      <form onSubmit={handleSubmit} className="row g-3">

        <div className="col-md-6">
          <input
            className="form-control"
            name="nom"
            placeholder="Nom"
            value={form.nom}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <input
            className="form-control"
            type="number"
            name="prix_vente"
            placeholder="Prix vente"
            value={form.prix_vente}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <input
            className="form-control"
            type="number"
            name="cout"
            placeholder="Coût"
            value={form.cout}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <input
            className="form-control"
            type="number"
            name="quantite_stock"
            placeholder="Quantité stock"
            value={form.quantite_stock}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <input
            className="form-control"
            type="number"
            name="stock_minimum"
            placeholder="Stock minimum"
            value={form.stock_minimum}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <input
            className="form-control"
            name="categorie"
            placeholder="Catégorie"
            value={form.categorie}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <select
            className="form-select"
            name="fournisseur_id"
            value={form.fournisseur_id}
            onChange={handleChange}
            required
          >
            <option value="">Choisir un fournisseur</option>
            {fournisseurs.map((f) => (
              <option key={f.id} value={f.id}>
                {f.nom}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <input
            className="form-control"
            name="reference"
            placeholder="Référence"
            value={form.reference}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <input
            className="form-control"
            name="barcode"
            placeholder="Barcode"
            value={form.barcode}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <input
            className="form-control"
            type="file"
            onChange={handleFileChange}
          />
        </div>

        {previewImage && (
          <div className="col-md-6">
            <img
              src={previewImage}
              alt="Preview"
              className="img-fluid mt-2"
              style={{ maxHeight: "150px" }}
            />
          </div>
        )}

        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Modifier
          </button>
        </div>

      </form>
    </div>
  );
}

export default Edit;
