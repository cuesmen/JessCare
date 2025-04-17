import React, { useEffect, useState } from 'react';
import ColloquiLista from './ColloquiLista';
import ColloquiPaziente from './ColloquiPaziente/ColloquiPaziente';
import { SiStagetimer } from 'react-icons/si';
import { FaCheckCircle } from 'react-icons/fa';
import GeneralNavigation from '../../components/GeneralNavigation/general_navigation';
import { useNavigate } from 'react-router-dom';
import { LuBookPlus } from "react-icons/lu";
import { IoArrowBackCircle } from "react-icons/io5";

const ColloquiWrapper = () => {
  const [selectedView, setSelectedView] = useState(null);
  const [breadcrumbs, setBreadcrumbs] = useState([
    { label: "Colloqui", path: "/colloqui", active: true },
  ]);

  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const statusQuery = queryParams.get("search");

  useEffect(() => {
    if (statusQuery === "lista") {
      setSelectedView("lista");
      setBreadcrumbs([
        { label: "Colloqui", path: "/colloqui", active: false, onClick: "reloadCOLL" },
        { label: "Lista Generale", path: `/colloqui?&search=lista`, active: true },
      ]);
    } else if (statusQuery === "paziente") {
      setSelectedView("paziente");
      setBreadcrumbs([
        { label: "Colloqui", path: "/colloqui", active: false, onClick: "reloadCOLL" },
        { label: "Cerca Paziente", path: `/colloqui?&search=paziente`, active: true },
      ]);
    } else {
      setBreadcrumbs([
        { label: "Colloqui", path: "/colloqui", active: true },
      ]);
    }
  }, [statusQuery]);

  return (
    <div className='MainDiv ColloquiMainDiv'>
      <GeneralNavigation
        breadcrumbs={breadcrumbs}
        icon1={<LuBookPlus />}
        icon1OnClick={() => navigate(`/colloquio-aggiungi?&search=${selectedView}`)}
        icon2={selectedView ? <IoArrowBackCircle /> : null}
        icon2OnClick={() => {
          navigate("/colloqui");
          window.location.reload();
        }}
      />
      {!selectedView ? (
        <div className=''>
          <div className="pazienti_intro_list">
            <div
              className="pazienti_intro_div"
              onClick={() => navigate("/colloqui?&search=lista")}
            >
              <a><SiStagetimer /></a>
              Lista generale
            </div>
            <div
              className="pazienti_intro_div"
              onClick={() => navigate("/colloqui?&search=paziente")}
            >
              <a><FaCheckCircle /></a>
              Cerca per paziente
            </div>
          </div>
        </div>
      ) : selectedView === "lista" ? (
        <ColloquiLista />
      ) : (
        <ColloquiPaziente />
      )}
    </div>
  );
};

export default ColloquiWrapper;
