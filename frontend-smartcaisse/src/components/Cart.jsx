import React from "react";

export default function Cart({ panier, total, onRemove, onCheckout }) {
  return (
    <div className="card shadow-lg border-0" style={{ maxHeight: "70vh" }}>
     
      <div className="card-header bg-primary text-white fw-bold fs-5 d-flex justify-content-between align-items-center">
        🛒 Panier
        <span className="badge bg-light text-primary">{panier.length}</span>
      </div>

   
      <div
        className="card-body overflow-auto"
        style={{ maxHeight: "55vh", fontSize: "0.95rem" }}
      >
        {panier.length === 0 ? (
          <p className="text-center text-muted">Le panier est vide</p>
        ) : (
          panier.map((item) => (
            <div
              key={item.id}
              className="d-flex justify-content-between align-items-center border-bottom py-2"
            >
              <div>
                <strong>{item.nom}</strong>
                <p className="text-muted small mb-0">Prix: {item.prix_vente} DH</p>
              </div>
              <div className="d-flex align-items-center gap-2">
                <span className="badge bg-primary">{item.quantite}</span>
                <button
                  onClick={() => onRemove(item.id)}
                  className="btn btn-sm btn-outline-danger"
                  title="Supprimer"
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>

  
      <div className="card-footer bg-white border-top p-3 d-flex justify-content-between align-items-center">
        <span className="fw-bold fs-6">Total: {total.toFixed(2)} DH</span>
        <button
          onClick={onCheckout}
          className="btn btn-success btn-sm px-4"
          disabled={panier.length === 0}
        >
          Payer
        </button>
      </div>
    </div>
  );
}
