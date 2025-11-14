import React from "react";
import "./productGrid.css";

export default function ProductGrid({ produits, onAdd }) {
  return (
    <div className="product-grid-container">
      <div className="product-grid">
        {produits.map((item) => (
          <div
            key={item.id}
            className="product-card"
            onClick={() => onAdd(item)}
          >
            <img
              className="product-img"
              src={
                item.image
                  ? "http://127.0.0.1:8000/storage/" + item.image
                  : "https://via.placeholder.com/80"
              }
              alt={item.nom}
            />

            <div className="product-name">{item.nom}</div>

            <div className="product-price">{item.prix_vente} DH</div>
          </div>
        ))}
      </div>
    </div>
  );
}
