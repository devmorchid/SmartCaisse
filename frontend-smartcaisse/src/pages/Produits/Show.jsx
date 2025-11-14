import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Cookies from "js-cookie";

function Show() {
  const { id } = useParams();
  const [produit, setProduit] = useState(null);

 
  const token = Cookies.get("token");

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/produits/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setProduit(res.data))
      .catch((err) => console.error(err));
  }, [id, token]);

  if (!produit) return <p className="text-center mt-5">Chargement...</p>;

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Détails du produit</h4>
          <Link to="/produits" className="btn btn-light btn-sm">
            Retour
          </Link>
        </div>

        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-4 fw-bold">Nom:</div>
            <div className="col-md-8">{produit.nom}</div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4 fw-bold">Prix vente:</div>
            <div className="col-md-8">{produit.prix_vente} DH</div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4 fw-bold">Coût:</div>
            <div className="col-md-8">{produit.cout} DH</div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4 fw-bold">Quantité stock:</div>
            <div className="col-md-8">{produit.quantite_stock}</div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4 fw-bold">Stock minimum:</div>
            <div className="col-md-8">{produit.stock_minimum}</div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4 fw-bold">Catégorie:</div>
            <div className="col-md-8">
              <span className="badge bg-primary">{produit.categorie}</span>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4 fw-bold">Référence:</div>
            <div className="col-md-8">{produit.reference}</div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4 fw-bold">Barcode:</div>
            <div className="col-md-8">{produit.barcode}</div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4 fw-bold">Image:</div>
            <div className="col-md-8">
              {produit.image ? (
                <img
                  src={`http://localhost:8000/storage/${produit.image}`}
                  alt={produit.nom}
                  className="img-thumbnail"
                  style={{ maxWidth: "200px" }}
                />
              ) : (
                <span className="text-muted">Pas d'image</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Show;
