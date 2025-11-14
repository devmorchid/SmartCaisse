import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./DashboardLayout.css"; 

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-container">

      <Sidebar />


      <div className="main-section">
        <Navbar />
        <div className="page-content">
          {children}
        </div>
      </div>
    </div>
  );
}
