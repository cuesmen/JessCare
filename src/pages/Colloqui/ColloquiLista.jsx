import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import ColloquiUpperBar from './ColloquioList/ColloquiUpperBar';
import ColloquioCard from './ColloquioList/ColloquioCard';
import { useLoader } from "../../main/LoaderContext";

const ColloquiLista = () => {
  const { showLoader, hideLoader } = useLoader();
  const [colloqui, setColloqui] = useState([]);
  const [filteredColloqui, setFilteredColloqui] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8); // Default items per page

  useEffect(() => {
    const fetchColloqui = async () => {
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
          .order('date', { ascending: false });
        if (error) {
          console.error('Error fetching colloqui:', error);
        } else {
          setColloqui(data);
          setFilteredColloqui(data);
        }
      } finally {
        hideLoader();
      }
    };
    fetchColloqui();
  }, []);

  const totalPages = Math.ceil(filteredColloqui.length / itemsPerPage);
  const currentItems = filteredColloqui.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleSearch = ({ searchTerm, date }) => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    const filtered = colloqui.filter((colloquio) => {
      const fullName = `${colloquio.Paziente.name} ${colloquio.Paziente.surname}`.toLowerCase();
      const reversedFullName = `${colloquio.Paziente.surname} ${colloquio.Paziente.name}`.toLowerCase();
      const matchesName = searchTerm
        ? fullName.includes(lowerSearchTerm) || reversedFullName.includes(lowerSearchTerm)
        : true;
      const matchesDate = date
        ? new Date(colloquio.date).toISOString().split('T')[0] === date
        : true;
      return matchesName && matchesDate;
    });
    setFilteredColloqui(filtered);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (value) => {
    const newItemsPerPage = parseInt(value, 10) || 1; // Ensure at least 1 item per page
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to the first page
  };


  return (
    <>
      <ColloquiUpperBar
        onSearch={handleSearch}
        currentPage={currentPage}
        totalPages={totalPages}
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
      <div className="colloqui-container">
        {currentItems.map((colloquio) => (
          <ColloquioCard key={colloquio.id} colloquio={colloquio} />
        ))}
      </div>
    </>
  );
};

export default ColloquiLista;
