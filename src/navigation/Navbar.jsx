import React, { useState, useEffect } from "react";
import { IoMenu } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
// Importiamo il context di autenticazione per accedere alla sessione utente
import { useAuth } from "../context/AuthContext"
import { IoSettings } from "react-icons/io5";

export default function Navbar() {
  const location = useLocation();
  const pathName = location.pathname;
  const displayText = pathName === "/" ? "Home" : pathName.substring(1);

  const { session } = useAuth();
  const email = session?.user?.email || "default@example.com";
  const firstLetter = email.charAt(0).toUpperCase();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  useEffect(() => {
    if (sidebarOpen) {
      document.body.classList.add("no-scroll");
      document.documentElement.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
      document.documentElement.classList.remove("no-scroll");
    }
  }, [sidebarOpen]);

  return (
    <>
      <div className="Navbar_MainDiv">
        <div className="Navbar_MenuBtn" onClick={toggleSidebar}>
          <IoMenu />
        </div>
        <div className="Navbar_MenuImg">
          <img alt="Menu_Img" src="images/logo/piccolo/logo_small_normal.png" />
        </div>
        <div className="Navbar_MenuText">{displayText}</div>

        <div className="Navbar_AccountDiv_Wrapper">
          <div className="Navbar_AccountDiv_Settings">
            <IoSettings />
          </div>
          <div className="Navbar_AccountDiv">
            <div className="Navbar_AccountDiv_Email">{email}</div>
            <div className="Navbar_AccountDiv_Circle">{firstLetter}</div>
          </div>
        </div>
      </div>
      {sidebarOpen && (
        <div className="overlay" onClick={toggleSidebar}></div>
      )}

      <Sidebar menuOnClick={toggleSidebar} open={sidebarOpen} onClose={closeSidebar} />
    </>
  );
}
