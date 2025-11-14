import PanierItem from "./PanierItem";

export default function Panier({ panier, total, ouvrirPaiement, supprimerDuPanier }) {
  return (
    <div className="card shadow-lg border-0 h-100">
      <div className="card-header bg-primary text-white fw-bold">🛒 Panier</div>
      <div className="card-body overflow-auto" style={{ maxHeight: "60vh" }}>
        {panier.length === 0 ? (
          <p className="text-center text-muted mt-3">Aucun produit ajouté</p>
        ) : (
          panier.map((item) => (
            <PanierItem key={item.id} item={item} supprimerDuPanier={supprimerDuPanier} />
          ))
        )}
      </div>
      <div className="card-footer bg-white border-top">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="fw-bold">Total :</span>
          <span className="fs-5 text-success fw-bold">{total.toFixed(2)} DH</span>
        </div>
        <button
          onClick={ouvrirPaiement}
          className="btn btn-success w-100 py-2 fw-bold"
        >
          ✅ Valider la vente
        </button>
      </div>
    </div>
  );
}
