import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import SidebarButton from './SidebarButton';

import { CgLogOut } from "react-icons/cg";
import { MdSpaceDashboard } from "react-icons/md";
import { BsPersonRaisedHand } from "react-icons/bs";
import { FaCalendarDay } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { FiBookOpen  } from 'react-icons/fi';

import { useLoader } from '../main/LoaderContext';
import { useAuth } from "../context/AuthContext"

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { showLoader, hideLoader } = useLoader();

  const { session } = useAuth();
  const email = session?.user?.email || "default@example.com";
  const firstLetter = email.charAt(0).toUpperCase();

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

  const handleSettings = () => {

  }

  return (
    <div className={`Sidebar_MainDiv ${open ? "open" : ""}`}>
      <div className={`Sidebar_Img ${!open ? "non_open" : ""}`}>
        <img alt="logo" src={open ? "images/logo/grande/logo_full_white.png" : "images/logo/piccolo/logo_small_white.png"} />
      </div>
      {email && <div className='Sidebar_AccountDiv'>
        <div className={`Sidebar_AccountDiv_Inner ${!open ? "non_open" : ""}`}>
          <div className={`Sidebar_AccountDiv_Circle ${!open ? "non_open" : ""}`}>
            {firstLetter}
          </div>
          <div className='Sidebar_AccountDiv_Text'>
            {email}
          </div>
        </div>
      </div>}
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
        <SidebarButton
          nonOpen={!open}
          Title="Colloqui"
          Icon={<FiBookOpen  />}
          GoTo="/colloqui"
          onClose={onClose}
          active={isActive("/colloqui")}
        />
      </div>
      <div className={`Sidebar_LowerMain ${!open ? "non_open" : ""}`}>
        <SidebarButton
          nonOpen={!open}
          Title="Settings"
          onClick={handleSettings}
          Icon={<IoSettings />}
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
