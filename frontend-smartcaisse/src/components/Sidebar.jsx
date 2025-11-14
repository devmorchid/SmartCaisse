import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();


  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); 
    navigate("/");
  };

  return (
    <div
      className="d-flex flex-column bg-light border-end vh-100 p-3"
      style={{ width: "250px" }}
    >
      <div className="mb-4">
        <h4 className="fw-bold text-primary">Smart Caisse</h4>
      </div>

      <ul className="nav nav-pills flex-column mb-auto">

        <li className="nav-item mb-1">
          <Link className="nav-link sidebar-link" to="/dashboard">
            <i className="bi bi-speedometer2 me-2"></i>
            Tableau de bord
          </Link>
        </li>

        <li className="nav-item mb-1">
          <Link className="nav-link sidebar-link" to="/fournisseurs">
            <i className="bi bi-truck me-2"></i>
            Fournisseurs
          </Link>
        </li>

        <li className="nav-item mb-1">
          <Link className="nav-link sidebar-link" to="/Produits">
            <i className="bi bi-box-seam me-2"></i>
            Produits
          </Link>
        </li>

        <li className="nav-item mb-1">
          <Link className="nav-link sidebar-link" to="/ventes/produits">
            <i className="bi bi-cash-stack me-2"></i>
            Ventes
          </Link>
        </li>

        <li className="nav-item mb-1">
          <Link className="nav-link sidebar-link" to="/Cheques">
            <i className="bi bi-credit-card me-2"></i>
            Cheques
          </Link>
        </li>

        <li className="nav-item mb-1">
          <Link className="nav-link sidebar-link" to="/profile">
            <i className="bi bi-people me-2"></i>
            Profile
          </Link>
        </li>

 
        {user?.nam === "admin" && (
          <li className="nav-item mb-1">
            <Link className="nav-link sidebar-link" to="/users">
              <i className="bi bi-gear me-2"></i>
              Liste des utilisateurs
            </Link>
          </li>
        )}

      </ul>

      <div>
        <button className="btn btn-danger w-100" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right me-2"></i>
          Logout
        </button>
      </div>
    </div>
  );
}
