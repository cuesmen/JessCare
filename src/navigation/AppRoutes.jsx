import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Appuntamenti from "../pages/Appuntamenti/Appuntamenti";
import Login from '../pages/Login';
import { AuthProvider, useAuth } from '../context/AuthContext';
import Navbar from './Navbar';
import PazientiWrapper from '../pages/Pazienti/PazientiWrapper';
import PazientePage from '../pages/Pazienti/PazientePage/PazientePage'
import PazienteAdd from '../pages/Pazienti/PazienteAdd/PazienteAdd';
import AppuntamentiAdd from '../pages/Appuntamenti/AppuntamentiAdd/AppuntamentiAdd';
import ColloquiWrapper from '../pages/Colloqui/ColloquiWrapper';
import ColloquioVisualize from '../pages/Colloqui/ColloquioVisualize/ColloquioVisualize';
import ColloquioAdd from '../pages/Colloqui/ColloquioAdd/ColloquioAdd';

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
                      <Route path="/pazienti" element={<PazientiWrapper />} />
                      <Route path="/paziente-add" element={<PazienteAdd />} />
                      <Route path="/paziente-modifica" element={<PazienteAdd modify={true}/>} />
                      <Route path="/dettagli-paziente" element={<PazientePage />} />
                      <Route path="/appuntamenti" element={<Appuntamenti />} />
                      <Route path="/appuntamento-aggiungi" element={<AppuntamentiAdd />} />
                      <Route path="/appuntamento-modifica" element={<AppuntamentiAdd modify={true} />} />
                      <Route path="/colloqui" element={<ColloquiWrapper />} />
                      <Route path="/colloquio-visualizza" element={<ColloquioVisualize />} />
                      <Route path="/colloquio-aggiungi" element={<ColloquioAdd />} />
                      <Route path="/colloquio-modifica" element={<ColloquioAdd modify={true}/>} />
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
