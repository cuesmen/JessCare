import React, { useState } from 'react';
import IconInput from '../../components/IconInput';
import IconDate from '../../components/IconDate';
import '../../css/colloqui.css';

const ColloquiUpperBar = ({ onSearch, currentPage, totalPages, onNextPage, onPreviousPage }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [date, setDate] = useState('');

  const handleSearch = () => {
    onSearch({ searchTerm, date });
  };

  return (
    <div className="colloqui-upper-bar">
      <IconInput
        title="Cerca per Nome o Cognome"
        name="searchTerm"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Inserisci nome o cognome"
        icon={<i className="fas fa-user"></i>}
      />
      <IconDate
        title="Cerca per Data"
        name="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        icon={<i className="fas fa-calendar-alt"></i>}
      />
      <button onClick={handleSearch} className="search-button">
        Cerca
      </button>
      <div className="pagination">
        <button onClick={onPreviousPage} disabled={currentPage === 1}>
          Indietro
        </button>
        <span>Pagina {currentPage} di {totalPages}</span>
        <button onClick={onNextPage} disabled={currentPage === totalPages}>
          Avanti
        </button>
      </div>
    </div>
  );
};

export default ColloquiUpperBar;
