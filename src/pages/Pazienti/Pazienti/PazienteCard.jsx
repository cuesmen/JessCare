import React from 'react';
import PropTypes from 'prop-types';
import { FaExternalLinkAlt } from "react-icons/fa";
import { computeAge, computeSex } from '../PazienteAdd/utils';
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
        <div
          className={`paziente_card_main_active ${paziente.exit? "red" : "green"}`}
        ></div>
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
        <p><span>Telefono:</span> {paziente.telefono}</p>
        <p><span>Sesso:</span> {computeSex(paziente.sex)}</p>
        <p><span>Diagnosi in entrata: <br></br></span> {paziente.diagnosis_incoming}</p>
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
