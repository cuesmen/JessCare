import React, { useEffect, useState } from 'react';
import PazienteCard from './PazienteCard';
import PazientiUpperBar from './PazientiUpperBar';
import { useNavigate } from 'react-router-dom';

const Pazienti = ({ pazienti, fetchPazienti }) => {

  useEffect(() => {fetchPazienti()},[])

  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const statusQuery = queryParams.get("status");

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

  // Ordinamento: prima i pazienti con exit assente, ordinati per created_at decrescente,
  // poi quelli con exit presente
  const sortedPazienti = [...filteredPazienti].sort((a, b) => {
    // Se a non ha exit e b sì, a viene prima
    if (!a.exit && b.exit) return -1;
    // Se a ha exit e b no, b viene prima
    if (a.exit && !b.exit) return 1;
    // Se entrambi hanno exit (o nessuno), ordina per created_at decrescente
    return new Date(b.created_at) - new Date(a.created_at);
  });

  return (
    <>

      <div className=''>
        <div className='Pazienti_MainDiv_Upperbar'>
          <PazientiUpperBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onSuccessAddUser={fetchPazienti} />
        </div>
        <div className='Pazienti_List_Div'>
          {sortedPazienti.map(paziente => (
            <PazienteCard
              key={paziente.id}
              paziente={{
                ...paziente,
                nome: paziente.name,
                cognome: paziente.surname,
                nascita: paziente.birth,
                telefono: paziente.cellphone,
                sex: paziente.sex,
                diagnosis_incoming: paziente.diagnosis_incoming
              }}
              onClick={() =>  navigate(`/dettagli-paziente?&status=${statusQuery}&id=${paziente.id}`)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Pazienti;
