import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import axios from "axios";
import Cookies from "js-cookie";

export default function Produits() {
  const [produits, setProduits] = useState([]);


  const token = Cookies.get("token");

  const columns = [
    { header: "Nom", accessor: "nom" },
    { header: "Prix", accessor: "prix" },
    { header: "Quantité", accessor: "quantite_stock" },
  ];

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/produits", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setProduits(res.data))
      .catch((err) => console.error(err));
  }, [token]);

  return (
    <div className="container mt-5">
      <h3>Liste des Produits</h3>
      <Table columns={columns} data={produits} />
    </div>
  );
}
