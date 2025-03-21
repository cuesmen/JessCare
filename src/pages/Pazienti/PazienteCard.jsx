import React from 'react';
import PropTypes from 'prop-types';
import { FaExternalLinkAlt } from "react-icons/fa";

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
const PazienteCard = ({ paziente, onClick }) => {
  return (
    <div
      key={paziente.id}
      className='paziente_card'
    >
      <div className='paziente_card_main'>
        {/* Cerchio decorativo per indicare, ad esempio, lo stato del paziente */}
        <div className='paziente_card_main_circle'>
          {paziente.nome.charAt(0).toUpperCase()}
        </div>
        {/* Sezione con il nome e il cognome del paziente */}
        <div className='paziente_card_main_gen'>
          <div className='paziente_card_main_name'>{paziente.nome}</div>
          <div className='paziente_card_main_surname'>{paziente.cognome}</div>
        </div>
      </div>
      {/* Icona per navigare ai dettagli completi del paziente */}
      <div
        className='paziente_card_icon'
        onClick={() => onClick(paziente)}
      >
        <FaExternalLinkAlt />
      </div>
      <div className='paziente_card_age_phone'>
        {/* Visualizzazione dell'età e del numero di telefono */}
        <p><span>Età:</span> {computeAge(paziente.nascita)} anni</p>
        {paziente.telefono && <p><span>Telefono:</span> {paziente.telefono}</p>}
      </div>
    </div>
  );
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
