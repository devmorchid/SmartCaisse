import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";

import FournisseurIndex from "./pages/Fournisseur/Index";
import FournisseurCreate from "./pages/Fournisseur/Create";
import FournisseurShow from "./pages/Fournisseur/Show";
import FournisseurEdit from "./pages/Fournisseur/Edit";

import ProduitsIndex from "./pages/Produits/Index";
import ProduitsCreate from "./pages/Produits/Create";
import ProduitsShow from "./pages/Produits/Show";
import ProduitsEdit from "./pages/Produits/Edit";

import Cheques from "./pages/Cheques/Index";

import Caisse from "./pages/ventes/Caisse";

import Profil from './pages/users/Profil'
import Users from './pages/users/Users'

import NotFound from "./pages/NotFound";



function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
      
     <Route
  path="/"
  element={token ? <Navigate to="/dashboard" replace /> : <Login />}
/>
<Route
  path="/register"
  element={token ? <Navigate to="/dashboard" replace /> : <Register />}
/>


 <Route path="/dashboard" element={<ProtectedRoute> <DashboardLayout> <Dashboard /></DashboardLayout> </ProtectedRoute>  }/> 

  <Route path="/fournisseurs" element={<ProtectedRoute> <DashboardLayout> <FournisseurIndex /></DashboardLayout> </ProtectedRoute>  }/>
  <Route path="/fournisseurs/create" element={<ProtectedRoute> <DashboardLayout> <FournisseurCreate /></DashboardLayout> </ProtectedRoute>  }/>
  <Route path="/fournisseurs/:id" element={<ProtectedRoute> <DashboardLayout> <FournisseurShow /></DashboardLayout> </ProtectedRoute>  }/>
  <Route path="/fournisseurs/:id/edit" element={<ProtectedRoute> <DashboardLayout> <FournisseurEdit /></DashboardLayout> </ProtectedRoute>  }/>

  
  <Route path="/produits" element={<ProtectedRoute> <DashboardLayout> <ProduitsIndex /></DashboardLayout> </ProtectedRoute>  }/>
  <Route path="/produits/create" element={<ProtectedRoute> <DashboardLayout> <ProduitsCreate /></DashboardLayout> </ProtectedRoute>  }/>
  <Route path="/produits/:id" element={<ProtectedRoute> <DashboardLayout> <ProduitsShow /></DashboardLayout> </ProtectedRoute>  }/>
  <Route path="/produits/edit/:id" element={<ProtectedRoute> <DashboardLayout> <ProduitsEdit /></DashboardLayout> </ProtectedRoute>  }/>
         
  <Route path="/ventes/produits" element={ <ProtectedRoute> <DashboardLayout> <Caisse /> </DashboardLayout> </ProtectedRoute>}/>

  <Route path="/Cheques" element={ <ProtectedRoute> <DashboardLayout> <Cheques /> </DashboardLayout> </ProtectedRoute>}/>
  <Route path="/profile" element={<ProtectedRoute> <DashboardLayout> <Profil /></DashboardLayout></ProtectedRoute>}/>
  <Route path="/Users" element={<ProtectedRoute> <DashboardLayout> <Users /></DashboardLayout></ProtectedRoute>}/>
<Route path="*" element={<NotFound />} />
  

      </Routes>
    </Router>
  );
}

export default App;
