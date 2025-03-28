import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const events = [
  {
    title: 'Sessione con Mario Rossi',
    start: new Date(2025, 3, 26, 10, 0, 0),
    end: new Date(2025, 3, 26, 11, 0, 0),
  },
  {
    title: 'Sessione con Giulia Bianchi',
    start: new Date(2025, 3, 26, 12, 0, 0),
    end: new Date(2025, 3, 26, 13, 0, 0),
  },
];

const CustomToolbar = (toolbar) => {
  const goToBack = () => {
    toolbar.onNavigate('PREV');
  };

  const goToNext = () => {
    toolbar.onNavigate('NEXT');
  };

  const goToToday = () => {
    toolbar.onNavigate('TODAY');
  };

  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button onClick={goToBack}>Indietro</button>
        <button onClick={goToToday}>Oggi</button>
        <button onClick={goToNext}>Avanti</button>
      </span>
      <span className="rbc-toolbar-label">{toolbar.label}</span>
    </div>
  );
};

export default function PazienteAppuntamenti() {
  return (
    <div className="flex centerx" style={{ paddingBottom: '50px' }}>
      <div style={{ height: '500px', width: '80%' }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView="week"
          defaultDate={new Date(2025, 3, 26)}
          views={['month', 'week', 'day', 'agenda']}  // Abilita più viste
          components={{
            toolbar: CustomToolbar,
          }}
        />
      </div>
    </div>
  );
}
