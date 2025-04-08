import React, { useState } from 'react';
import IconInput from '../../../components/IconInput';
import IconDate from '../../../components/IconDate';
import { FaUser, FaCalendarAlt, FaTimes } from 'react-icons/fa';

const ColloquiUpperBar = ({ onSearch, currentPage, totalPages, onNextPage, onPreviousPage, itemsPerPage, onItemsPerPageChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [date, setDate] = useState('');

  const handleSearch = () => {
    onSearch({ searchTerm, date });
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setDate('');
    onSearch({ searchTerm: '', date: '' }); // Reset the search
  };

  return (
    <div className="colloqui-upper-bar">
      <div className="colloqui-search-section">
        <IconInput
          title="Cerca per Nome o Cognome"
          name="searchTerm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Inserisci nome o cognome"
          icon={<FaUser />} // User icon from React Icons
        />
        <IconDate
          title="Cerca per Data"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          icon={<FaCalendarAlt />} // Calendar icon from React Icons
        />
        <IconInput
          title="Elementi per Pagina"
          type="number"
          name="itemsPerPage"
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(e.target.value)}
          placeholder="Elementi per pagina"
          icon={<i className="fas fa-list-ol"></i>} // Replace with a relevant icon
        />
        <div className="search-actions">
          <button onClick={handleSearch} className="search-button">
            Cerca
          </button>
          <button onClick={handleClearSearch} className="clear-button">
            <FaTimes /> {/* Clear icon */}
          </button>
        </div>
      </div>
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
