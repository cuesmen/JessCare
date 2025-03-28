import React, { useEffect, useState } from 'react';
import Pazienti from './Pazienti/Pazienti';
import { useLoader } from "../../main/LoaderContext";
import { supabase } from '../../supabaseClient';
import GeneralNavigation from '../../components/GeneralNavigation/general_navigation';
import PazientiIntro from "./PazientiIntro"
import { useNavigate } from 'react-router-dom';
import { FaUserPlus } from "react-icons/fa";
import { IoArrowBackCircle } from "react-icons/io5";

const PazientiWrapper = () => {
  const [pazienti, setPazienti] = useState([]);
  const [status, setStatus] = useState("");
  const { showLoader, hideLoader } = useLoader();
  const navigate = useNavigate();


  const queryParams = new URLSearchParams(location.search);
  const statusQuery = queryParams.get("status");

  useEffect(() => {
    if (statusQuery === "concluso")
      setStatus("Concluso")
    else if (statusQuery === "in-corso")
      setStatus("In Corso")
    if (statusQuery === "none") {
      setStatus("");
    }
  }, [status])

  const fetchPazienti = async () => {
    showLoader();

    // Inizia con la query base
    let query = supabase.from('Paziente').select('*');

    if (status === "In Corso") {
      query = query.is('exit', null);
    } else if (status === "Concluso") {
      query = query.not('exit', 'is', null);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Errore nel recupero dei pazienti:', error);
    } else {
      setPazienti(data);
      console.log(data);
    }

    hideLoader();
  };

  let breadcrumbs = [
    { label: "Pazienti", path: "/pazienti?&status=none", active: true, onClick: 'reloadPAZ' },
  ];

  if (status === "In Corso") {
    breadcrumbs[0].active = false;
    breadcrumbs.push({ label: "In Corso", path: `/pazienti?&status=${"in-corso"}`, active: true });
  } else if (status === "Concluso") {
    breadcrumbs[0].active = false;
    breadcrumbs.push({ label: "Conclusi", path: "/pazienti?&status=concluso", active: true });
  }

  const handleStatus = (status) => {
    if (status === "In Corso")
      navigate(`/pazienti?&status=${"in-corso"}`)
    if (status === "Concluso")
      navigate(`/pazienti?&status=${"concluso"}`)
    window.location.reload();
  }

  const handleOnClickGoBack = () => {
    navigate("/pazienti")
    window.location.reload();
  }

  const handleOnAddUser = () => {
    navigate(`/paziente-add`)
  }


  return (
    <>
      <div className='MainDiv'>
        <GeneralNavigation
          breadcrumbs={breadcrumbs}
          icon1={<IoArrowBackCircle/>}
          icon1OnClick={handleOnClickGoBack}
          icon2={<FaUserPlus/>}
          icon2OnClick={handleOnAddUser}
        />
        {!status && <PazientiIntro onClick={(status) => handleStatus(status)} />}
        {status &&
          <>
            <Pazienti pazienti={pazienti} fetchPazienti={fetchPazienti} />
          </>
        }
      </div>
    </>
  );
};

export default PazientiWrapper;
