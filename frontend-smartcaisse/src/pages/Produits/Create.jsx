import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; 

export default function CreateProduit() {
  const navigate = useNavigate();
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
  const [categories, setCategories] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);


  const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fournRes, catRes] = await Promise.all([
          axiosInstance.get("/fournisseurs"),
          axiosInstance.get("/categories"),
        ]);
        setFournisseurs(fournRes.data);
        setCategories(catRes.data);
      } catch (err) {
        console.error("❌ Erreur de chargement :", err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setSelectedFile(null);
      setPreviewImage(null);
    }
  };


  const handleAddCategory = async () => {
    const newCat = prompt("Entrez le nom de la nouvelle catégorie :");
    if (!newCat || !newCat.trim()) return;

    try {
      const res = await axiosInstance.post("/categories", { nom: newCat.trim() });
      setCategories([...categories, res.data]);
      setForm({ ...form, categorie: res.data.nom });
    } catch (err) {
      console.error("❌ Erreur lors de l’ajout de la catégorie :", err);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(form).forEach((key) => data.append(key, form[key]));
    if (selectedFile) data.append("image", selectedFile);

    try {
      await axiosInstance.post("/produits", data);
      alert("✅ Produit ajouté avec succès !");
      navigate("/produits");
    } catch (err) {
      console.error("❌ Erreur :", err.response?.data || err);
      alert("⚠️ Une erreur est survenue lors de l’ajout du produit !");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 fw-bold text-primary">➕ Ajouter un produit</h1>

      <form onSubmit={handleSubmit} className="row g-3">
       
        <div className="col-md-6">
          <input
            className="form-control"
            name="nom"
            placeholder="Nom du produit"
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
            placeholder="Prix de vente"
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
            placeholder="Quantité en stock"
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

        <div className="col-md-6 d-flex align-items-center">
          <select
            className="form-select me-2"
            name="categorie"
            value={form.categorie}
            onChange={handleChange}
            required
          >
            <option value="">Choisir une catégorie</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.nom}>
                {cat.nom}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={handleAddCategory}
          >
            +
          </button>
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

        {/* Code barre */}
        <div className="col-md-6">
          <input
            className="form-control"
            name="barcode"
            placeholder="Code barre"
            value={form.barcode}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <input
            className="form-control"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

   
        {previewImage && (
          <div className="col-md-6">
            <img
              src={previewImage}
              alt="Aperçu"
              className="img-fluid mt-2 rounded shadow-sm"
              style={{ maxHeight: "150px", objectFit: "cover" }}
            />
          </div>
        )}

 
        <div className="col-12 text-end">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Ajout en cours..." : "✅ Ajouter le produit"}
          </button>
        </div>
      </form>
    </div>
  );
}
