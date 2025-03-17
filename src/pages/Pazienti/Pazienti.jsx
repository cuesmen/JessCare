import React from 'react';
import PazienteCard from './PazienteCard';

const Pazienti = () => {
  const pazienti = [
    { id: 1, nome: 'Mario', cognome: 'Rossi', nascita: '1980-05-10' },
    { id: 2, nome: 'Luigi', cognome: 'Verdi', nascita: '1975-08-20' },
    { id: 3, nome: 'Anna', cognome: 'Bianchi', nascita: '1990-03-15' }
  ];

  return (
    <div className='Pazienti_MainDiv MainDiv'>
      <div className='Pazienti_List_Div'>
        {pazienti.map(paziente => (
          <PazienteCard paziente={paziente}/>
        ))}
      </div>
    </div>
  );
};

export default Pazienti;
