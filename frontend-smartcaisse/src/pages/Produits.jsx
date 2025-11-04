import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Produits() {
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/produits")
      .then((res) => setProduits(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">📦 Liste des Produits</h2>
      <table className="table table-striped table-bordered">
        <thead className="table-primary">
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Prix</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {produits.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nom}</td>
              <td>{p.prix}</td>
              <td>{p.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
