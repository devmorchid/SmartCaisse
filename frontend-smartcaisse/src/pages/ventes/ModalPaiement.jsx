export default function ModalPaiement({
  show,
  modePaiement,
  setModePaiement,
  montantDonne,
  setMontantDonne,
  rendu,
  confirmerPaiement,
  fermerModal
}) {
  if (!show) return null;

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">💳 Mode de paiement</h5>
            <button className="btn-close" onClick={fermerModal}></button>
          </div>
          <div className="modal-body">
            <label className="form-label fw-bold">Sélectionnez un mode :</label>
            <select
              className="form-select mb-3"
              value={modePaiement}
              onChange={(e) => setModePaiement(e.target.value)}
            >
              <option value="espece">💵 Espèce</option>
              <option value="carte">💳 Carte bancaire</option>
              <option value="cheque">🧾 Chèque</option>
            </select>

            {modePaiement === "espece" && (
              <>
                <label className="form-label">Montant donné :</label>
                <input
                  type="number"
                  className="form-control mb-2"
                  value={montantDonne}
                  onChange={(e) => setMontantDonne(e.target.value)}
                />
                <div className="alert alert-info py-2">
                  Rendu : <strong>{rendu >= 0 ? rendu.toFixed(2) : 0} DH</strong>
                </div>
              </>
            )}
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={fermerModal}>Annuler</button>
            <button className="btn btn-success" onClick={confirmerPaiement}>Confirmer le paiement</button>
          </div>
        </div>
      </div>
    </div>
  );
}

