import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../supabaseClient';
import { useLoader } from '../../../main/LoaderContext';

const ColloquioVisualize = () => {
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();
  const [colloquio, setColloquio] = useState(null);
  const [error, setError] = useState(null);

  const queryParams = new URLSearchParams(location.search);
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

  return (
    <div className="MainDiv">
      <h1>Dettagli Colloquio</h1>
      <p><strong>ID:</strong> {colloquio.id}</p>
      <p><strong>Paziente:</strong> {colloquio.Paziente.name} {colloquio.Paziente.surname}</p>
      <p><strong>Data:</strong> {new Date(colloquio.date).toLocaleDateString()}</p>
      <p><strong>Durata:</strong> {colloquio.duration} minuti</p>
      <p><strong>Note:</strong> {colloquio.notes || 'Nessuna nota disponibile.'}</p>
      <button onClick={() => navigate(-1)}>Torna indietro</button>
    </div>
  );
};

export default ColloquioVisualize;
