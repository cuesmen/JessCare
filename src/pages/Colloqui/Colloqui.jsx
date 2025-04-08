import React, { useEffect, useState } from 'react';
import GeneralNavigation from '../../components/GeneralNavigation/general_navigation';
import { useNavigate } from 'react-router-dom';
import { LuBookPlus } from "react-icons/lu";
import { supabase } from '../../supabaseClient';
import ColloquiUpperBar from './ColloquiUpperBar';
import '../../css/colloqui.css';

const Colloqui = () => {
  const navigate = useNavigate();
  const [colloqui, setColloqui] = useState([]);
  const [filteredColloqui, setFilteredColloqui] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchColloqui = async () => {
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

  let breadcrumbs = [
    { label: "Colloqui", path: "/Colloqui", active: true },
  ];

  return (
    <div className='MainDiv'>
      <GeneralNavigation
        breadcrumbs={breadcrumbs}
        icon1={<LuBookPlus />}
        icon1OnClick={() => navigate("/colloquio")}
      />
      <ColloquiUpperBar
        onSearch={handleSearch}
        currentPage={currentPage}
        totalPages={totalPages}
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
      />
      <div className="colloqui-container">
        {currentItems.map((colloquio) => (
          <div key={colloquio.id} className="colloquio-card">
            <h3>Colloquio #{colloquio.id}</h3>
            <p><strong>Paziente:</strong> {colloquio.Paziente.name} {colloquio.Paziente.surname}</p>
            <p><strong>Data:</strong> {new Date(colloquio.date).toLocaleDateString()}</p>
            <p><strong>Durata:</strong> {colloquio.duration} minuti</p>
            <p><strong>Note:</strong> {colloquio.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Colloqui;
