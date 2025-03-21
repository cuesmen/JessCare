import React, { useState, useEffect } from 'react';
import PazienteCard from './PazienteCard';
import PazientiUpperBar from './PazientiUpperBar';
import GeneralModal from '../../components/general_modal';
import PazienteModal from './Modals/PazienteModal';
import { supabase } from '../../supabaseClient';
import { useLoader } from "../../main/LoaderContext";

const Pazienti = () => {
  const [pazienti, setPazienti] = useState([]);
  const [selectedPaziente, setSelectedPaziente] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const { showLoader, hideLoader } = useLoader();

  const fetchPazienti = async () => {
    showLoader();

    const { data, error } = await supabase
      .from('Paziente')
      .select('*');

    if (error) {
      console.error('Errore nel recupero dei pazienti:', error);
    } else {
      setPazienti(data);
      console.log(data);
    }

    hideLoader();
  };

  useEffect(() => {
    fetchPazienti();
  }, []);


  const filteredPazienti = pazienti.filter(paziente => {
    const nomeLower = paziente.name?.toLowerCase() || '';
    const cognomeLower = paziente.surname?.toLowerCase() || '';
    const searchLower = searchTerm.trim().toLowerCase();

    if (searchLower.includes(" ")) {
      const parts = searchLower.split(" ").filter(Boolean);
      if (parts.length >= 2) {
        return (
          (nomeLower.includes(parts[0]) && cognomeLower.includes(parts[1])) ||
          (nomeLower.includes(parts[1]) && cognomeLower.includes(parts[0]))
        );
      }
      return nomeLower.includes(searchLower) || cognomeLower.includes(searchLower);
    } else {
      return nomeLower.includes(searchLower) || cognomeLower.includes(searchLower);
    }
  });

  const onClickPazienteCard = (paz) => {
    setSelectedPaziente(paz);
    console.log(paz);
  };

  return (
    <>
      {selectedPaziente && (
        <GeneralModal
          opened={selectedPaziente != null}
          title="Dettagli Paziente"
          onClose={() => setSelectedPaziente(null)}
        >
          <PazienteModal paziente={selectedPaziente} />
        </GeneralModal>
      )}

      <div className='Pazienti_MainDiv MainDiv'>
        <div className='Pazienti_MainDiv_Upperbar'>
          <PazientiUpperBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onSuccessAddUser={fetchPazienti} />
        </div>
        <div className='Pazienti_List_Div'>
          {filteredPazienti.map(paziente => (
            <PazienteCard
              key={paziente.id}
              paziente={{
                ...paziente,
                nome: paziente.name,
                cognome: paziente.surname,
                nascita: paziente.birth,
                telefono: paziente.cellphone
              }}
              onClick={(paz) => onClickPazienteCard(paz)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Pazienti;
