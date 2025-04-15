import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegCalendarAlt } from "react-icons/fa";
import { it } from "date-fns/locale";

/**
 * Componente con calendario visuale e formattazione umana della data
 */
export default function IconDate({ title, name, value, onChange, icon, required, showTime }) {
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        if (value) {
            setSelectedDate(new Date(value));
        }
    }, [value]);

    const handleChange = (date) => {
        setSelectedDate(date);
        const offset = date.getTimezoneOffset(); // es: -120 (minuti)
        const localDate = new Date(date.getTime() - offset * 60000)
            .toISOString()
            .slice(0, 16); // rimuove secondi e Z
    
        const fakeEvent = { target: { name, value: localDate } };
        onChange(fakeEvent);
    };
    

    return (
        <>
            {title && <label>{title}</label>}
            <div className="input_main date_input">
                <div className="input_icon">
                    {icon || <FaRegCalendarAlt />}
                </div>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleChange}
                    showTimeSelect={showTime}
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat={showTime ? "dd MMMM yyyy 'alle' HH:mm" : "dd MMMM yyyy"}
                    placeholderText="Seleziona una data"
                    required={required}
                    locale={it}
                    className="custom_date_input"
                />
            </div>
        </>
    );
}
