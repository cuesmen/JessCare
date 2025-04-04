import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import AppuntamentoView from './AppuntamentoView';
import GeneralModal from "../../components/general_modal";
import { supabase } from '../../supabaseClient';
import { useLoader } from "../../main/LoaderContext"; // 👉 importa il loader
import { useNavigate } from "react-router-dom"; // 👉 importa useNavigate
import moment from 'moment';
import 'moment/dist/locale/it';

moment.locale('it');
moment.updateLocale('it', {
  week: { dow: 1 }
});

const localizer = momentLocalizer(moment);

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

const CustomToolbar = ({ date, onNavigate, onView, views, view }) => {

  const formatLabel = () => {
    const mDate = moment(date).locale('it');

    switch (view) {
      case 'month':
        return mDate.format('MMMM YYYY'); // "Aprile 2025"
      case 'week': {
        const startOfWeek = mDate.clone().startOf('week');
        const endOfWeek = mDate.clone().endOf('week');
        return `${startOfWeek.format('D MMMM')} – ${endOfWeek.format('D MMMM')}`;
      }
      case 'day':
        return mDate.format('dddd D MMMM YYYY'); // <-- qui il fix
      case 'agenda':
        return 'Agenda';
      default:
        return '';
    }
  };


  const goToBack = () => onNavigate('PREV');
  const goToNext = () => onNavigate('NEXT');
  const goToToday = () => onNavigate('TODAY');

  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group2">
        <button onClick={goToBack}>Indietro</button>
        <button onClick={goToToday}>Oggi</button>
        <button onClick={goToNext}>Avanti</button>
      </span>
      <span className="rbc-toolbar-label">
        {formatLabel()}
      </span>
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

export default function AppuntamentiCalendar() {
  const [date, setDate] = useState(new Date());
  const [currentView, setCurrentView] = useState('month');
  const [eventoSelezionato, setEventoSelezionato] = useState(null);
  const [events, setEvents] = useState([]);
  const { showLoader, hideLoader } = useLoader(); // 👉 usa il loader
  const navigate = useNavigate(); // 👉 inizializza useNavigate

  useEffect(() => {
    fetchAppuntamenti();
  }, []);

  const fetchAppuntamenti = async () => {
    showLoader(); // 👉 mostra loader

    try {
      const { data, error } = await supabase
        .from('Appuntamenti')
        .select('*');

      if (error) {
        console.error("Errore nel recupero degli appuntamenti:", error.message);
        return;
      }

      const eventiFormattati = data.map(app => {
        const [y, m, d] = app.date.split('-');
        const [startH, startM] = app.hour_start.split(':');
        const [endH, endM] = app.hour_end.split(':');

        const start = new Date(y, m - 1, d, startH, startM);
        const end = new Date(y, m - 1, d, endH, endM);

        return {
          id: app.id,
          title: app.title || "Sessione",
          start,
          end,
          notes: app.notes,
          id_paziente: app.id_paziente
        };
      });

      setEvents(eventiFormattati);
    } finally {
      hideLoader(); // 👉 nascondi loader sempre
    }
  };

  const handleNavigate = (newDate) => setDate(newDate);
  const handleViewChange = (view) => setCurrentView(view);
  const handleDoubleClickEvent = (event) => setEventoSelezionato(event);

  const handleSelectSlot = (slotInfo) => {
    // Cambia la vista a "day" e imposta la data selezionata
    setCurrentView('day');
    setDate(slotInfo.start);
  };

  const handleDoubleClickSlot = (slotInfo) => {
    // Cambia la vista a "day" e imposta la data selezionata
    setCurrentView('day');
    setDate(slotInfo.start);
  };

  return (
    <div className="pazienti_appuntamenti_div_calendar mobile-friendly">
      <div className='pazienti_appuntamenti_div_inner_calendar'>
        <Calendar
          className='appuntamenti_CALENDAR'
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
          onSelectSlot={handleSelectSlot} // Clic su uno slot vuoto
          onDoubleClickSlot={handleDoubleClickSlot} // Doppio clic su uno slot vuoto
          views={['month', 'week', 'day', 'agenda']}
          messages={messages}
          components={{
            toolbar: (props) => <CustomToolbar {...props} date={props.date} />
          }}
          formats={{
            dayFormat: (date, culture, localizer) => moment(date).format('ddd DD/MM'),
            weekdayFormat: (date, culture, localizer) => moment(date).format('dd'), // Abbreviazione dei giorni (L, M, M, G, V, S, D)
            monthHeaderFormat: (date, culture, localizer) => moment(date).format('MMMM YYYY'),
            dayHeaderFormat: (date, culture, localizer) => moment(date).format('dddd DD MMMM'),
            dayRangeHeaderFormat: ({ start, end }, culture, localizer) =>
              `${moment(start).format('DD MMM')} – ${moment(end).format('DD MMM')}`,
            agendaHeaderFormat: ({ start, end }, culture, localizer) =>
              `${moment(start).format('DD MMM')} – ${moment(end).format('DD MMM')}`,
            agendaDateFormat: (date, culture, localizer) => moment(date).format('dddd DD MMMM'),
            agendaTimeFormat: (date, culture, localizer) => moment(date).format('HH:mm'),
            agendaTimeRangeFormat: ({ start, end }, culture, localizer) =>
              `${moment(start).format('HH:mm')} – ${moment(end).format('HH:mm')}`,
          }}
        />
      </div>
      {eventoSelezionato && (
        <GeneralModal
          title="Dettagli Appuntamento"
          children={
            <AppuntamentoView
              evento={eventoSelezionato}
              onClose={() => setEventoSelezionato(null)}
            />
          }
          onClose={() => setEventoSelezionato(null)}
        />
      )}
    </div>
  );
}
