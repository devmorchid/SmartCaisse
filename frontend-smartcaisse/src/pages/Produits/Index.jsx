import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

export default function Index() {
  const [produits, setProduits] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchProduits(1);
  }, []);



  const fetchProduits = async (page = 1) => {
    try {
      const token = Cookies.get("token");

    

      if (!token) {
        navigate("/");
        return;
      }

      const res = await axios.get(
        `http://localhost:8000/api/produits?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      

      

      setProduits(res.data.data || res.data);

    

      setPagination({
        current_page: res.data.meta?.current_page || 1,
        last_page: res.data.meta?.last_page || 1,
      });

    } catch (error) {
      console.log("Erreur :", error);




      if (error.response && error.response.status === 401) {
        Cookies.remove("token");
        navigate("/");
      }
    }
  };

 



  const handleDelete = async (id) => {
    const ok = window.confirm("Supprimer ce produit ?");
    if (!ok) return;

    try {
      const token = Cookies.get("token");

      await axios.delete(`http://localhost:8000/api/produits/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchProduits(pagination.current_page);
    } catch (error) {
      
    }
  };

  return (
    <div className="container mt-5">

      <h2 className="mb-4">Produits</h2>

      <Link to="/produits/create" className="btn btn-success mb-3">
        Ajouter un produit
      </Link>

 



      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Nom</th>
              <th>Référence</th>
              <th>Prix</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {produits.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>

               <td>
  {p.image && p.image !== "" ? (
    <img
      src={`http://localhost:8000/storage/${p.image}`}
      alt={p.nom}
      width="60"
      className="rounded"
    />
  ) : (
    "Aucune image"
  )}
</td>


                <td>{p.nom}</td>
                <td>{p.reference}</td>
                <td>{p.prix_vente} DH</td>

                <td>
                  <Link
                    to={`/produits/${p.id}`}
                    className="btn btn-info btn-sm me-1"
                  >
                    Voir
                  </Link>

                  <Link
                    to={`/produits/edit/${p.id}`}
                    className="btn btn-warning btn-sm me-1"
                  >
                    Modifier
                  </Link>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(p.id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    


      <div className="d-flex justify-content-between mt-3">
        <button
          className="btn btn-outline-primary"
          disabled={pagination.current_page === 1}
          onClick={() => fetchProduits(pagination.current_page - 1)}
        >
          ⬅️ Précédente
        </button>

        <span>
          Page {pagination.current_page} / {pagination.last_page}
        </span>

        <button
          className="btn btn-outline-primary"
          disabled={pagination.current_page === pagination.last_page}
          onClick={() => fetchProduits(pagination.current_page + 1)}
        >
          Suivante ➡️
        </button>
      </div>

    </div>
  );
}
