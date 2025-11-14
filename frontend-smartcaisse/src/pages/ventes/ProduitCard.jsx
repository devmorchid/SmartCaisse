export default function ProduitCard({ produit, ajouterAuPanier }) {
  return (
    <div className="col-6 col-md-4 col-lg-3">
      <div
        className="card shadow-sm border-0 h-100"
        style={{ cursor: "pointer" }}
        onClick={() => ajouterAuPanier(produit)}
      >
        <img
          src={
            produit.image
              ? `http://127.0.0.1:8000/storage/${produit.image}`
              : "https://via.placeholder.com/200x150?text=Produit"
          }
          className="card-img-top"
          alt={produit.nom}
          style={{ height: "150px", objectFit: "cover" }}
        />
        <div className="card-body text-center">
          <h6 className="fw-semibold">{produit.nom}</h6>
          <p className="text-muted mb-0">{produit.prix_vente} DH</p>
        </div>
      </div>
    </div>
  );
}
