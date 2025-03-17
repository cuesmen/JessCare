import React from 'react';
import { FaExternalLinkAlt } from "react-icons/fa";

const PazienteCard = ({ paziente }) => {

    return (
        <div
            key={paziente.id}
            className='paziente_card'
        >
            <div className='paziente_card_main'>
                <div className='paziente_card_main_circle'></div>
                <div className='paziente_card_main_gen'>
                    <div className='paziente_card_main_name'>{paziente.nome}</div>
                    <div className='paziente_card_main_surname'>{paziente.cognome}</div>
                </div>
            </div>
            <div className='paziente_card_icon' style={{ position: 'absolute', top: '8px', right: '8px', cursor: 'pointer' }}>
                <FaExternalLinkAlt />
            </div>
            <p>Data di Nascita: {paziente.nascita}</p>
        </div>

    );
};

export default PazienteCard;
