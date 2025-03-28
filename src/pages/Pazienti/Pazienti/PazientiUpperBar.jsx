import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IconInput from "../../../components/IconInput"
import { RiSearch2Fill } from "react-icons/ri";
import { FaUserPlus } from "react-icons/fa";
import GeneralModal from "../../../components/general_modal";
/**
 * Componente PazientiUpperBar:
 * Barra superiore con campo di ricerca per filtrare i pazienti per nome o cognome.
 */
const PazientiUpperBar = ({ searchTerm, onSearchChange, onSuccessAddUser }) => {

    const [openAddUser, setOpenAddUser] = useState(false);

    return (
        <>{openAddUser
            &&
            <GeneralModal
                title="Aggiungi utente"
                children={<PazienteAddModal onSuccess={onSuccessAddUser} />}
                onClose={() => setOpenAddUser(false)}
            />}
            <div className='pazienti_upper_bar'>
                <IconInput
                    icon={<RiSearch2Fill />}
                    type="text"
                    placeholder="Cerca paziente per nome o cognome..."
                    value={searchTerm}
                    onChange={e => onSearchChange(e.target.value)}
                />
                <div
                    className='pazienti_upper_bar_addUser'
                    onClick={() => setOpenAddUser(true)}
                >
                    <FaUserPlus />
                </div>
            </div>
        </>
    );
};

PazientiUpperBar.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    onSearchChange: PropTypes.func.isRequired,
};

export default PazientiUpperBar;
