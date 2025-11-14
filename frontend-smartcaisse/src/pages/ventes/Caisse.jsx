import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import CategoryFilter from "../../components/CategoryFilter";
import ProductGrid from "../../components/ProductGrid";
import Cart from "../../components/Cart";
import PaymentModal from "../../components/PaymentModal";
import { calculateTotal } from "../../utils/receiptUtils";
import Cookies from "js-cookie";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Caisse() {
  const [produits, setProduits] = useState([]);
  const [categorieFilter, setCategorieFilter] = useState("all");
  const [searchNom, setSearchNom] = useState("");
  const [searchReference, setSearchReference] = useState("");
  const [panier, setPanier] = useState([]);
  const [total, setTotal] = useState(0);
  const [showPaiement, setShowPaiement] = useState(false);
  const [barcodeBuffer, setBarcodeBuffer] = useState("");

  const scannerRef = useRef(null);

  // === Token ===
  const token = Cookies.get("token");

  // ===== Fetch produits =====
  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/ventes/produits", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProduits(res.data.data || []);
      } catch (err) {
        console.error(err);
        setProduits([]);
      }
    };

    fetchProduits();
  }, [token]);

  // ===== Categories =====
  const categories = ["all", ...new Set(produits.map((p) => p.categorie))];

  let produitsFiltres = produits.filter((p) =>
    categorieFilter === "all" ? true : p.categorie === categorieFilter
  );

  // ===== Search filters =====
  produitsFiltres = produitsFiltres.filter(
    (p) =>
      p.nom.toLowerCase().includes(searchNom.toLowerCase()) &&
      p.reference.toLowerCase().includes(searchReference.toLowerCase())
  );

  // ===== Cart =====
  const ajouterAuPanier = (produit) => {
    setPanier((prev) => {
      const exist = prev.find((item) => item.id === produit.id);

      if (exist) {
        return prev.map((item) =>
          item.id === produit.id ? { ...item, quantite: item.quantite + 1 } : item
        );
      }

      return [...prev, { ...produit, quantite: 1 }];
    });
  };

  const supprimerDuPanier = (id) => {
    setPanier((prev) => prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    setTotal(calculateTotal(panier));
  }, [panier]);

  // ===== Payment modal =====
  const ouvrirPaiement = () => {
    if (panier.length === 0) return alert("📭 Panier vide !");
    setShowPaiement(true);
  };

  const fermerPaiement = () => setShowPaiement(false);

  // ===== Barcode scanner =====
  useEffect(() => {
    let timeout;

    const handleKeyDown = (e) => {
      e.preventDefault();

      if (e.key === "Enter") {
        const code = barcodeBuffer.trim();

        if (code !== "") {
          const prod = produits.find((p) => p.barcode === code);
          if (prod) ajouterAuPanier(prod);
          else alert("Produit non trouvé pour ce barcode !");
        }

        setBarcodeBuffer("");
        clearTimeout(timeout);
      } else {
        setBarcodeBuffer((prev) => prev + e.key);
        clearTimeout(timeout);
        timeout = setTimeout(() => setBarcodeBuffer(""), 100);
      }
    };

    const scannerDiv = scannerRef.current;
    scannerDiv.focus();
    scannerDiv.addEventListener("keydown", handleKeyDown);

    return () => scannerDiv.removeEventListener("keydown", handleKeyDown);
  }, [barcodeBuffer, produits]);

  return (
    <div className="container-fluid py-3" style={{ minHeight: "100vh", background: "#f5f6fa" }}>
      <div ref={scannerRef} tabIndex={0} style={{ position: "absolute", top: -1000, left: -1000 }} />

      <CategoryFilter
        categories={categories}
        active={categorieFilter}
        onChange={setCategorieFilter}
        searchNom={searchNom}
        searchReference={searchReference}
        onSearchNom={setSearchNom}
        onSearchReference={setSearchReference}
      />

      <div className="row">
        <div className="col-lg-8 col-md-7 mb-4">
          <ProductGrid produits={produitsFiltres} onAdd={ajouterAuPanier} />
        </div>

        <div className="col-lg-4 col-md-5">
          <Cart panier={panier} total={total} onRemove={supprimerDuPanier} onCheckout={ouvrirPaiement} />
        </div>
      </div>

      {showPaiement && (
        <PaymentModal panier={panier} total={total} onClose={fermerPaiement} setPanier={setPanier} setTotal={setTotal} />
      )}
    </div>
  );
}
