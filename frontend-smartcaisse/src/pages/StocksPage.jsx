// src/pages/StocksPage.js
import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import Table from "../components/Table";

export default function StocksPage() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const res = await axios.get("/stocks");
      setStocks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Produit ID", accessor: "produit_id" },
    { header: "Quantité", accessor: "quantite" },
    { header: "Emplacement", accessor: "emplacement" },
    { header: "Date d'entrée", accessor: "date_entree" },
  ];

  return (
    <div className="container mt-4">
      <h3>📊 Liste du Stock</h3>
      <Table columns={columns} data={stocks} />
    </div>
  );
}
