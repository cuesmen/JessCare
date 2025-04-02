import React from 'react';
import AppuntamentiCalendar from './AppuntamentiCalendar';
import GeneralNavigation from '../../components/GeneralNavigation/general_navigation';
import { FaCalendarPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Appuntamenti = () => {

  const navigate = useNavigate();

  let breadcrumbs = [
    { label: "Appuntamenti", path: "/appuntamenti", active: true },
  ];

  return (
    <div className='MainDiv AppuntamentiMain'>
      <GeneralNavigation
        breadcrumbs={breadcrumbs}
        icon1={<FaCalendarPlus/>}
        icon1OnClick={() => navigate("/appuntamento-aggiungi")}
      />
      <AppuntamentiCalendar />
    </div>
  );
};

export default Appuntamenti;
