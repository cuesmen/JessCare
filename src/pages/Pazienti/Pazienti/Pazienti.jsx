import React, { useEffect, useState } from 'react';
import PazienteCard from './PazienteCard';
import PazientiUpperBar from './PazientiUpperBar';
import { useNavigate } from 'react-router-dom';

const Pazienti = ({ pazienti, fetchPazienti }) => {
  useEffect(() => {
    fetchPazienti();
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8); // Default items per page
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

  // Sort patients
  const sortedPazienti = [...filteredPazienti].sort((a, b) => {
    if (!a.exit && b.exit) return -1;
    if (a.exit && !b.exit) return 1;
    return new Date(b.created_at) - new Date(a.created_at);
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedPazienti.length / itemsPerPage);
  const currentItems = sortedPazienti.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleItemsPerPageChange = (value) => {
    const newItemsPerPage = parseInt(value, 10) || 1; // Ensure at least 1 item per page
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to the first page
  };

  return (
    <>
      <div className=''>
        <div className='Pazienti_MainDiv_Upperbar'>
          <PazientiUpperBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            currentPage={currentPage}
            totalPages={totalPages}
            onNextPage={handleNextPage}
            onPreviousPage={handlePreviousPage}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={handleItemsPerPageChange}
            onSuccessAddUser={fetchPazienti}
          />
        </div>
        <div className='Pazienti_List_Div'>
          {currentItems.map(paziente => (
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
              onClick={() => navigate(`/dettagli-paziente?&status=${statusQuery}&id=${paziente.id}`)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Pazienti;
