import React, { useState } from 'react';
import PazienteCard from './PazienteCard';
import PazientiUpperBar from './PazientiUpperBar';

const Pazienti = () => {
  // Lista di pazienti finti con informazioni aggiuntive (telefono)
  const allPazienti = [
    { id: 1, nome: 'Mario', cognome: 'Rossi', nascita: '1980-05-10', telefono: '1234567890' },
    { id: 2, nome: 'Luigi', cognome: 'Verdi', nascita: '1975-08-20', telefono: '0987654321' },
    { id: 3, nome: 'Anna', cognome: 'Bianchi', nascita: '1990-03-15', telefono: '5555555555' },
    { id: 4, nome: 'Giulia', cognome: 'Neri', nascita: '1985-11-30', telefono: '4444444444' },
    { id: 5, nome: 'Marco', cognome: 'Gialli', nascita: '1992-07-25', telefono: '3333333333' },
    { id: 6, nome: 'Sara', cognome: 'Rossi', nascita: '1988-12-05', telefono: '2222222222' },
    { id: 7, nome: 'Francesca', cognome: 'Moretti', nascita: '1979-04-12', telefono: '1111111111' },
    { id: 8, nome: 'Luca', cognome: 'Ferrari', nascita: '1995-09-18', telefono: '6666666666' },
    // Aggiungi altri pazienti finti se necessario
  ];

  // Stato per il termine di ricerca
  const [searchTerm, setSearchTerm] = useState('');

  // Filtra i pazienti in base al termine di ricerca
  // Se l'input contiene uno spazio, si assume che vengano forniti sia nome che cognome,
  // pertanto si controlla in entrambi gli ordini.
  const filteredPazienti = allPazienti.filter(paziente => {
    const nomeLower = paziente.nome.toLowerCase();
    const cognomeLower = paziente.cognome.toLowerCase();
    const searchLower = searchTerm.trim().toLowerCase();

    // Se l'input contiene uno spazio, gestisci il caso nome e cognome
    if (searchLower.includes(" ")) {
      const parts = searchLower.split(" ").filter(Boolean);
      if (parts.length >= 2) {
        return (
          (nomeLower.includes(parts[0]) && cognomeLower.includes(parts[1])) ||
          (nomeLower.includes(parts[1]) && cognomeLower.includes(parts[0]))
        );
      }
      // fallback se per qualche motivo c'è solo un termine utile
      return nomeLower.includes(searchLower) || cognomeLower.includes(searchLower);
    } else {
      // Se non c'è spazio, cerca il termine in entrambi i campi
      return nomeLower.includes(searchLower) || cognomeLower.includes(searchLower);
    }
  });

  return (
    <div className='Pazienti_MainDiv MainDiv'>
      <div className='Pazienti_MainDiv_Upperbar'>
        <PazientiUpperBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </div>
      <div className='Pazienti_List_Div'>
        {filteredPazienti.map(paziente => (
          <PazienteCard key={paziente.id} paziente={paziente} />
        ))}
      </div>
    </div>
  );
};

export default Pazienti;
