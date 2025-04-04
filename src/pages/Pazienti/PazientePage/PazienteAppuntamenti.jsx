// PazienteAppuntamenti.jsx

import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/it';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import GeneralModal from "../../../components/general_modal"

// Inizializza moment con la lingua italiana
moment.locale('it');
const localizer = momentLocalizer(moment);

// Eventi statici di esempio
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

// Traduzioni in italiano per l'interfaccia del calendario
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

/**
 * CustomToolbar: Toolbar personalizzata con pulsanti di navigazione e cambio vista
 */
const CustomToolbar = ({ label, onNavigate, onView, views, view }) => {
  const goToBack = () => onNavigate('PREV');
  const goToNext = () => onNavigate('NEXT');
  const goToToday = () => onNavigate('TODAY');

  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button onClick={goToBack}>Indietro</button>
        <button onClick={goToToday}>Oggi</button>
        <button onClick={goToNext}>Avanti</button>
      </span>
      <span className="rbc-toolbar-label">{label}</span>
      <span className="rbc-btn-group">
        {views.map(v => (
          <button
            key={v}
            onClick={() => onView(v)}
            className={v === view ? 'rbc-active' : ''}
          >
            {v === 'month' ? 'Mese' :
              v === 'week' ? 'Settimana' :
                v === 'day' ? 'Giorno' :
                  v === 'agenda' ? 'Agenda' : v}
          </button>
        ))}
      </span>
    </div>
  );
};

/**
 * PazienteAppuntamenti: Componente principale che mostra il calendario
 */
export default function PazienteAppuntamenti() {
  const [date, setDate] = useState(new Date(2025, 2, 31));
  const [currentView, setCurrentView] = useState('month');
  const [eventoSelezionato, setEventoSelezionato] = useState(null);

  // Gestisce la navigazione tra le date
  const handleNavigate = (newDate) => {
    setDate(newDate);
  };

  // Gestisce il cambio di vista (mese, settimana, giorno, agenda)
  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  // Apre la modale con i dettagli dell'appuntamento
  const handleDoubleClickEvent = (event) => {
    setEventoSelezionato(event);
  };

  return (
    <div className="pazienti_appuntamenti_div" >
      <div className='pazienti_appuntamenti_div_inner'>
        <Calendar
          localizer={localizer}
          culture="it"
          events={events}
          startAccessor="start"
          endAccessor="end"
          date={date}
          view={currentView}
          onNavigate={handleNavigate}
          onView={handleViewChange}
          onDoubleClickEvent={handleDoubleClickEvent}
          views={['month', 'week', 'day', 'agenda']}
          messages={messages}
          components={{ toolbar: CustomToolbar }}
        />
      </div>
      {eventoSelezionato && <GeneralModal
      title="Dettagli Appuntamento"
        children={<PazienteViewAppuntamento
          evento={eventoSelezionato}
          onClose={() => setEventoSelezionato(null)}
        />}
        onClose={() => setEventoSelezionato(null)}
      />}
    </div>
  );
}
