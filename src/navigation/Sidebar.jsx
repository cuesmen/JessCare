import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import SidebarButton from './SidebarButton';

import { CgLogOut } from "react-icons/cg";
import { MdSpaceDashboard } from "react-icons/md";
import { BsPersonRaisedHand } from "react-icons/bs";
import { FaCalendarDay } from "react-icons/fa";

import { useLoader } from '../main/LoaderContext';

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { showLoader, hideLoader } = useLoader();

  // Funzione helper per verificare se il path corrisponde
  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    showLoader(); // Mostra il loader
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Errore durante il logout:', error.message);
      hideLoader(); // Nascondi il loader in caso di errore
    } else {
      hideLoader(); // Nascondi il loader e poi naviga verso /login
      navigate('/login');
    }
  };

  return (
    <div className={`Sidebar_MainDiv ${open ? "open" : ""}`}>
      <div className={`Sidebar_Img ${open ? "open" : ""}`}>
        <img alt="logo" src="images/logo/grande/logo_full_white.png" />
      </div>
      <div className={`Sidebar_BtnMain ${!open ? "non_open" : ""}`}>
        <SidebarButton
          nonOpen={!open}
          Title="Dashboard"
          Icon={<MdSpaceDashboard />}
          GoTo="/dashboard"
          onClose={onClose}
          active={isActive("/dashboard")}
        />
        <SidebarButton
          nonOpen={!open}
          Title="Pazienti"
          Icon={<BsPersonRaisedHand />}
          GoTo="/pazienti"
          onClose={onClose}
          active={isActive("/pazienti")}
        />
        <SidebarButton
          nonOpen={!open}
          Title="Appuntamenti"
          Icon={<FaCalendarDay />}
          GoTo="/appuntamenti"
          onClose={onClose}
          active={isActive("/appuntamenti")}
        />
      </div>
      <div className={`Sidebar_LowerMain ${!open ? "non_open" : ""}`}>
        <SidebarButton
          nonOpen={!open}
          Title="Logout"
          onClick={handleLogout}
          Icon={<CgLogOut />}
        />
        <SidebarButton
          nonOpen={!open}
          Title="Logout"
          onClick={handleLogout}
          Icon={<CgLogOut />}
        />
      </div>
    </div>
  );
}
