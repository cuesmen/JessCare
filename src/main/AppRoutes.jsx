import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Pazienti from "../pages/Pazienti/Pazienti";
import Appuntamenti from "../pages/Appuntamenti";
import Login from '../pages/Login';
import { AuthProvider, useAuth } from '../context/AuthContext';
import Navbar from '../navigation/Navbar';

// Componente per proteggere le rotte (mostra un loader se ancora in caricamento)
const ProtectedRoute = ({ children }) => {
  const { session, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* La pagina di Login non mostra la sidebar */}
          <Route path="/login" element={<Login />} />

          {/* Tutte le altre rotte sono protette */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                  <Navbar />
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/pazienti" element={<Pazienti />} />
                      <Route path="/appuntamenti" element={<Appuntamenti />} />
                      <Route path="*" element={<Navigate to="/dashboard" replace />} />
                    </Routes>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;
