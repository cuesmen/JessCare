import React from 'react';
import moment from 'moment';
import { FaArrowLeft, FaArrowRight, FaCalendarDay, FaCalendarWeek, FaCalendarAlt, FaList } from "react-icons/fa";

const CalendarToolbar = ({ date, onNavigate, onView, views, view }) => {
  const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const formatLabel = () => {
    const mDate = moment(date).locale('it');

    switch (view) {
      case 'month':
        return capitalize(mDate.format('MMMM YYYY')); // Capitalizza la prima lettera
      case 'week': {
        const startOfWeek = mDate.clone().startOf('week');
        const endOfWeek = mDate.clone().endOf('week');
        return `${capitalize(startOfWeek.format('D MMMM'))} – ${capitalize(endOfWeek.format('D MMMM'))}`;
      }
      case 'day':
        return capitalize(mDate.format('dddd D MMMM YYYY'));
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
        <button onClick={goToBack} title="Indietro">
          <FaArrowLeft />
        </button>
        <button onClick={goToToday} title="Oggi">
          <FaCalendarDay />
        </button>
        <button onClick={goToNext} title="Avanti">
          <FaArrowRight />
        </button>
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
            title={v === 'month' ? 'Mese' :
              v === 'week' ? 'Settimana' :
                v === 'day' ? 'Giorno' :
                  v === 'agenda' ? 'Agenda' : v}
          >
            {v === 'month' && <FaCalendarAlt />}
            {v === 'week' && <FaCalendarWeek />}
            {v === 'day' && <FaCalendarDay />}
            {v === 'agenda' && <FaList />}
          </button>
        ))}
      </span>
    </div>
  );
};

export default CalendarToolbar;
