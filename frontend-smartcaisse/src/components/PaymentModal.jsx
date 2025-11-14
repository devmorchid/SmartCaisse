import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import ReceiptModal from "./ReceiptModal";

export default function PaymentModal({ total, panier, onClose, setPanier, setTotal }) {
  const token = Cookies.get("token");

  const [payments, setPayments] = useState([
    { methode: "espèce", montant: 0 },
    { methode: "carte", montant: 0 },
    { methode: "virement", montant: 0 },
    { methode: "chèque", montant: 0, banque: "", numero: "", date_encaissement: "" },
  ]);

  const [loading, setLoading] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [venteData, setVenteData] = useState(null);

  const totalPaye = payments.reduce((acc, p) => acc + Number(p.montant || 0), 0);
  const restant = (total - totalPaye).toFixed(2);
  const rendu = (totalPaye - total).toFixed(2);

  const handleChange = (method, field, value) => {
    setPayments((prev) =>
      prev.map((p) =>
        p.methode === method ? { ...p, [field]: field === "montant" ? parseFloat(value) || 0 : value } : p
      )
    );
  };

  const handleConfirm = async () => {
    setLoading(true);

    const data = {
      user_id: 1,
      total,
      produits: panier.map((p) => ({
        id: p.id,
        quantite: p.quantite,
        prix: p.prix_vente,
      })),
      paiements: payments
        .filter((p) => p.montant > 0)
        .map((p) => ({
          methode: p.methode,
          montant: p.montant,
          statut: "payé",
          ...(p.methode === "chèque"
            ? {
                cheque: {
                  banque: p.banque,
                  numero: p.numero,
                  date_encaissement: p.date_encaissement,
                },
              }
            : {}),
        })),
    };

    console.log("Data sent:", data);

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/ventes", data, {
        headers: { Authorization: `Bearer ${token}` },
      });


      setVenteData({
        id: res.data.vente_id,
        total,
        produits: panier,
        paiements: data.paiements,
      });

      setShowReceipt(true);


      setPanier([]);
      setTotal(0);
    } catch (err) {
      console.error("❌ Error:", err);
      alert("Erreur lors du paiement !");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    
      {!showReceipt && (
        <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-xl modal-dialog-centered">
            <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title fw-bold">💳 Payment</h5>
                <button className="btn-close btn-close-white" onClick={onClose}></button>
              </div>

              <div className="modal-body bg-light">
                <div className="row g-3">
                  {payments.map((p) => (
                    <div key={p.methode} className="col-md-6 col-lg-3">
                      <div className="card h-100 border-0 shadow-sm">
                        <div className="card-body">
                          <h6 className="fw-bold text-center text-uppercase text-primary mb-3">
                            {p.methode === "espèce"
                              ? "💵 Cash"
                              : p.methode === "carte"
                              ? "💳 Card"
                              : p.methode === "virement"
                              ? "🏦 Bank Transfer"
                              : "🧾 Cheque"}
                          </h6>

                          <input
                            type="number"
                            className="form-control text-center fs-5 mb-3"
                            placeholder="0.00 DH"
                            value={p.montant}
                            onChange={(e) => handleChange(p.methode, "montant", e.target.value)}
                          />

                          {p.methode === "chèque" && p.montant > 0 && (
                            <>
                              <input
                                type="text"
                                className="form-control mb-2"
                                placeholder="🏦 Bank Name"
                                value={p.banque}
                                onChange={(e) => handleChange("chèque", "banque", e.target.value)}
                              />
                              <input
                                type="text"
                                className="form-control mb-2"
                                placeholder="🔢 Cheque Number"
                                value={p.numero}
                                onChange={(e) => handleChange("chèque", "numero", e.target.value)}
                              />
                              <input
                                type="date"
                                className="form-control"
                                value={p.date_encaissement}
                                onChange={(e) =>
                                  handleChange("chèque", "date_encaissement", e.target.value)
                                }
                              />
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-white rounded-3 shadow-sm text-center">
                  <h5 className="fw-bold mb-0">Total: {total} DH</h5>
                  <p className="mb-1 text-secondary">Paid: {totalPaye} DH</p>

                  {restant > 0 ? (
                    <div className="alert alert-warning fs-5">Remaining: {restant} DH</div>
                  ) : (
                    <div className="alert alert-success fs-5">Change: {rendu} DH</div>
                  )}
                </div>
              </div>

              <div className="modal-footer bg-white border-top-0">
                <button className="btn btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button
                  className="btn btn-success px-4 fw-bold"
                  onClick={handleConfirm}
                  disabled={restant > 0 || loading}
                >
                  {loading ? "Processing..." : "Confirm Payment"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

   
      {showReceipt && (
        <ReceiptModal
          venteData={venteData}
          onClose={() => {
            setShowReceipt(false);
            onClose();
          }}
        />
      )}
    </>
  );
}
