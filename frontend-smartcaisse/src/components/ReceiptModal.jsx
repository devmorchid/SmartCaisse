import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function ReceiptModal({ venteData, onClose }) {
  const receiptRef = useRef();

 
  const handlePrint = useReactToPrint({
    contentRef: receiptRef, 
    documentTitle: "Reçu de paiement",
    onAfterPrint: () => alert(" Impression terminée avec succès !"),
    removeAfterPrint: false,
  });

  if (!venteData) return null;

  return (
    <div
      className="modal fade show d-block"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-sm modal-dialog-centered">
        <div className="modal-content rounded-3 shadow">
          <div className="modal-header bg-dark text-white py-2">
            <h6 className="modal-title">🧾 Reçu de paiement</h6>
            <button className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          <div className="modal-body p-0">
        
            <div ref={receiptRef} className="p-3" style={{ fontFamily: "monospace" }}>
              <h6 className="text-center fw-bold mb-1">🛍️ Smart Caisse</h6>
              <p className="text-center small mb-2">----------------------------------</p>

              <table className="table table-sm mb-2">
                <thead>
                  <tr>
                    <th>Article</th>
                    <th>Qté</th>
                    <th className="text-end">Prix</th>
                  </tr>
                </thead>
                <tbody>
                  {venteData.produits.map((prod, i) => {
                    const prix = Number(prod.prix_vente) || 0;
                    const qte = Number(prod.quantite) || 0;
                    return (
                      <tr key={i}>
                        <td>{prod.nom || "Produit"}</td>
                        <td>{qte}</td>
                        <td className="text-end">{(prix * qte).toFixed(2)} DH</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <p className="text-center small mb-2">----------------------------------</p>

              <div className="text-end">
                <p className="mb-1">
                  Total: <b>{venteData.total.toFixed(2)} DH</b>
                </p>
              </div>

              <div className="mt-2">
                <h6 className="fw-bold mb-1">Méthodes de paiement :</h6>
                {venteData.paiements.map((p, i) => (
                  <div key={i}>
                    <p className="mb-0">
                      - {p.methode}: {Number(p.montant).toFixed(2)} DH
                    </p>
                    {p.methode === "chèque" && p.cheque && (
                      <small>
                        🏦 Banque: {p.cheque.banque} | N°: {p.cheque.numero} | 📅{" "}
                        {p.cheque.date_encaissement}
                      </small>
                    )}
                  </div>
                ))}
              </div>

              <p className="text-center small mt-3 mb-0">----------------------------------</p>
              <p className="text-center small mb-0">Merci pour votre achat !</p>
    
            </div>
          </div>

          <div className="modal-footer d-flex justify-content-between">
            <button className="btn btn-secondary btn-sm" onClick={onClose}>
              Fermer
            </button>

            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                if (receiptRef.current) handlePrint();
                else alert("⚠️ Aucun contenu à imprimer !");
              }}
            >
              🖨️ Imprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
