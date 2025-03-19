import React from 'react';
import PropTypes from 'prop-types';
import { FaExternalLinkAlt } from "react-icons/fa";

/**
 * Funzione di utilità per calcolare l'età a partire dalla data di nascita (formato ISO).
 * @param {string} dob - Data di nascita
 * @returns {number} Età calcolata
 */
function computeAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

/**
 * Componente PazienteCard:
 * Visualizza una card compatta con le informazioni principali di un paziente,
 * includendo nome, cognome, età (calcolata dalla data di nascita) e numero di telefono.
 */
const PazienteCard = ({ paziente }) => {
    return (
        <div
            key={paziente.id}
            className='paziente_card'
            style={cardStyle}
        >
            <div className='paziente_card_main' style={mainStyle}>
                {/* Cerchio decorativo per indicare, ad esempio, lo stato del paziente */}
                <div className='paziente_card_main_circle' style={circleStyle}></div>
                {/* Sezione con il nome e il cognome del paziente */}
                <div className='paziente_card_main_gen' style={genStyle}>
                    <div className='paziente_card_main_name' style={nameStyle}>{paziente.nome}</div>
                    <div className='paziente_card_main_surname' style={surnameStyle}>{paziente.cognome}</div>
                </div>
            </div>
            {/* Icona per navigare ai dettagli completi del paziente */}
            <div className='paziente_card_icon' style={iconStyle}>
                <FaExternalLinkAlt />
            </div>
            {/* Visualizzazione dell'età e del numero di telefono */}
            <p>Età: {computeAge(paziente.nascita)} anni</p>
            {paziente.telefono && <p>Telefono: {paziente.telefono}</p>}
        </div>
    );
};

// Stili inline per la card (puoi spostarli in un file CSS se preferisci)
const cardStyle = {
  position: 'relative',
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '16px',
  width: '250px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
};

const mainStyle = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '8px',
};

const circleStyle = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  backgroundColor: '#eee',
  marginRight: '8px',
};

const genStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const nameStyle = {
  fontWeight: 'bold',
  fontSize: '1.1em',
};

const surnameStyle = {
  color: '#555',
};

const iconStyle = {
  position: 'absolute',
  top: '8px',
  right: '8px',
  cursor: 'pointer',
};

PazienteCard.propTypes = {
    paziente: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        nome: PropTypes.string.isRequired,
        cognome: PropTypes.string.isRequired,
        nascita: PropTypes.string.isRequired,
        telefono: PropTypes.string, // Numero di telefono opzionale
    }).isRequired,
};

export default PazienteCard;
