import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../supabaseClient';
import { useLoader } from '../../../main/LoaderContext';
import GeneralNavigation from '../../../components/GeneralNavigation/general_navigation';
import { IoArrowBackCircle } from "react-icons/io5";

const ColloquioVisualize = () => {
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();
  const [colloquio, setColloquio] = useState(null);
  const [error, setError] = useState(null);

  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get('search');
  const id = queryParams.get('id');

  useEffect(() => {
    const fetchColloquio = async () => {
      if (!id) {
        setError('ID non fornito.');
        return;
      }

      showLoader();
      try {
        const { data, error } = await supabase
          .from('Colloquio')
          .select(`
            id,
            date,
            duration,
            notes,
            Paziente (name, surname)
          `)
          .eq('id', id)
          .single();

        if (error) {
          setError('Errore nel recupero del colloquio.');
          console.error(error);
        } else {
          setColloquio(data);
        }
      } finally {
        hideLoader();
      }
    };

    fetchColloquio();
  }, [id]);

  if (error) {
    return (
      <div className="colloquio-visualize-error">
        <p>{error}</p>
        <button onClick={() => navigate(-1)}>Torna indietro</button>
      </div>
    );
  }

  if (!colloquio) {
    return null; // Loader will be shown by `useLoader`
  }

  const getSecondBreadcrumb = () => {
    if (search === 'paziente') {
      return { label: "Cerca Paziente", path: `/colloqui?search=pazienti`, active: false };
    } else {
      return { label: "Lista Generale", path: `/colloqui?search=lista`, active: false };
    }
  };

  const breadcrumbs = [
    { label: "Colloqui", path: "/colloqui", active: false },
    getSecondBreadcrumb(),
    { label: "Dettagli Colloquio", path: `/colloquio-visualizza?id=${colloquio.id}`, active: true },
  ];


  return (
    <div className="MainDiv ColloquiMainDiv">
      <GeneralNavigation
        breadcrumbs={breadcrumbs}
        icon1={<IoArrowBackCircle />}
        icon1OnClick={() => navigate(-1)}
      />
      <h1>Dettagli Colloquio</h1>
      <p><strong>Paziente:</strong> {colloquio.Paziente.name} {colloquio.Paziente.surname}</p>
      <p><strong>Data:</strong> {new Date(colloquio.date).toLocaleDateString()}</p>
      <p><strong>Durata:</strong> {colloquio.duration} minuti</p>
      <p><strong>Note:</strong></p>
      <pre style={{ whiteSpace: "pre-wrap", marginTop: 0 }}>
        {colloquio.notes || 'Nessuna nota disponibile.'}
      </pre>

      <button onClick={() => navigate(-1)}>Torna indietro</button>
      <button onClick={() => navigate(`/colloquio-modifica?&id=${colloquio.id}`)}>Modifica</button>
    </div>
  );
};

export default ColloquioVisualize;
