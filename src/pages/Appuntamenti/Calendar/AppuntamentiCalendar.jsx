import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import AppuntamentoView from '../AppuntamentoView'; // Importa AppuntamentoView
import GeneralModal from "../../../components/general_modal";
import { supabase } from '../../../supabaseClient';
import { useLoader } from "../../../main/LoaderContext";
import CalendarToolbar from "./CalendarToolbar";
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

export default function AppuntamentiCalendar({ paziente }) {
  const [date, setDate] = useState(new Date());
  const [currentView, setCurrentView] = useState('month');
  const [events, setEvents] = useState([]);
  const [eventoSelezionato, setEventoSelezionato] = useState(null); // Stato per l'evento selezionato
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    fetchAppuntamenti();
  }, [paziente]);

  const fetchAppuntamenti = async () => {
    showLoader();

    try {
      const query = supabase
        .from('Appuntamenti')
        .select('*');

      if (paziente?.id) {
        query.eq('id_paziente', paziente.id);
      }

      const { data, error } = await query;

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
      hideLoader();
    }
  };

  const handleNavigate = (newDate) => setDate(newDate);
  const handleViewChange = (view) => setCurrentView(view);

  const handleDoubleClickEvent = (event) => {
    setEventoSelezionato(event); // Imposta l'evento selezionato
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
          onDoubleClickEvent={handleDoubleClickEvent} // Doppio clic su un evento
          views={['month', 'week', 'day', 'agenda']}
          messages={messages}
          components={{
            toolbar: (props) => <CalendarToolbar {...props} date={props.date} />
          }}
          formats={{
            dayFormat: (date, culture, localizer) => moment(date).format('ddd DD/MM'),
            weekdayFormat: (date, culture, localizer) => moment(date).format('dd'),
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
              onClose={() => setEventoSelezionato(null)} // Chiudi la modale
            />
          }
          onClose={() => setEventoSelezionato(null)} // Chiudi la modale
        />
      )}
    </div>
  );
}
