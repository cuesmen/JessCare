import React from 'react';
import PropTypes from 'prop-types';
import IconInput from "../../components/IconInput"
import { RiSearch2Fill } from "react-icons/ri";

/**
 * Componente PazientiUpperBar:
 * Barra superiore con campo di ricerca per filtrare i pazienti per nome o cognome.
 */
const PazientiUpperBar = ({ searchTerm, onSearchChange }) => {
    return (
        <div className='pazienti_upper_bar'>
            <IconInput
                icon={<RiSearch2Fill/>}
                type="text"
                placeholder="Cerca paziente per nome o cognome..."
                value={searchTerm}
                onChange={e => onSearchChange(e.target.value)}
            />
        </div>
    );
};

PazientiUpperBar.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    onSearchChange: PropTypes.func.isRequired,
};

export default PazientiUpperBar;
