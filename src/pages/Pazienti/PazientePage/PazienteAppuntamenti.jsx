import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/it'; // Importa la localizzazione in italiano
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Imposta moment per usare il locale italiano
moment.locale('it');

const localizer = momentLocalizer(moment);

const events = [
  {
    title: 'Sessione con Mario Rossi',
    start: new Date(2025, 2, 31, 10, 0, 0),
    end: new Date(2025, 2, 31, 11, 0, 0),
  },
  {
    title: 'Sessione con Giulia Bianchi',
    start: new Date(2025, 2, 31, 12, 0, 0),
    end: new Date(2025, 2, 31, 13, 0, 0),
  },
];

const messages = {
  date: 'Data',
  time: 'Ora',
  event: 'Evento',
  allDay: 'Tutto il giorno',
  week: 'Settimana',
  work_week: 'Settimana lavorativa',
  day: 'Giorno',
  month: 'Mese',
  previous: 'Indietro',
  next: 'Avanti',
  yesterday: 'Ieri',
  tomorrow: 'Domani',
  today: 'Oggi',
  agenda: 'Agenda',
  noEventsInRange: 'Non ci sono eventi in questo intervallo.',
  showMore: total => `+ altri ${total}`,
};

const CustomToolbar = ({ label, onNavigate }) => {
  const goToBack = () => {
    onNavigate('PREV');
  };

  const goToNext = () => {
    onNavigate('NEXT');
  };

  const goToToday = () => {
    onNavigate('TODAY');
  };

  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button onClick={goToBack}>Indietro</button>
        <button onClick={goToToday}>Oggi</button>
        <button onClick={goToNext}>Avanti</button>
      </span>
      <span className="rbc-toolbar-label">{label}</span>
    </div>
  );
};

export default function PazienteAppuntamenti() {
  // Stato per la data corrente
  const [date, setDate] = useState(new Date(2025, 2, 31));

  // Funzione per gestire la navigazione, usando l'updater per accedere sempre al valore aggiornato
  const handleNavigate = (action) => {
    setDate((prevDate) => {
      let newDate;
      if (action === 'TODAY') {
        newDate = new Date();
      } else if (action === 'PREV') {
        newDate = new Date(prevDate);
        newDate.setDate(newDate.getDate() - 7);
      } else if (action === 'NEXT') {
        newDate = new Date(prevDate);
        newDate.setDate(newDate.getDate() + 7);
      }
      return newDate;
    });
  };

  return (
    <div className="flex centerx" style={{ paddingBottom: '50px', paddingTop: '50px' }}>
      <div style={{ height: '500px', width: '80%' }}>
        <Calendar
          localizer={localizer}
          culture="it"                   // Imposta la cultura in italiano
          events={events}
          startAccessor="start"
          endAccessor="end"
          view="week"                    // Vista iniziale
          date={date}                    // Data controllata
          onNavigate={handleNavigate}    // Gestione della navigazione
          views={['month', 'week', 'day', 'agenda']}
          messages={messages}            // Etichette in italiano
          components={{
            toolbar: CustomToolbar,
          }}
        />
      </div>
    </div>
  );
}
