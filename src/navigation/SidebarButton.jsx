import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SidebarButton({ Icon, Title, GoTo, onClose, nonOpen, onClick, active }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }
    if (GoTo) {
      navigate(GoTo);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <div
      className={`Sidebar_Button ${nonOpen ? "non_open" : ""}  ${active ? "active" : ""}`}
      onClick={handleClick}>
      <div className="Sidebar_Button_Icon">
        {Icon}
      </div>
      {!nonOpen && <div className="Sidebar_Button_Title">
        {Title}
      </div>}
    </div>
  );
}
