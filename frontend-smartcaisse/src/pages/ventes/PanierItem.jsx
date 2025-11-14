export default function PanierItem({ item, supprimerDuPanier }) {
  return (
    <div
      className="d-flex justify-content-between align-items-center border-bottom py-2"
    >
      <div>
        <strong>{item.nom}</strong>
        <p className="text-muted small mb-0">
          {item.prix_vente} DH × {item.quantite}
        </p>
      </div>
      <div className="d-flex align-items-center gap-2">
        <span className="fw-bold">
          {(item.prix_vente * item.quantite).toFixed(2)} DH
        </span>
        <button
          onClick={() => supprimerDuPanier(item.id)}
          className="btn btn-sm btn-outline-danger"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
