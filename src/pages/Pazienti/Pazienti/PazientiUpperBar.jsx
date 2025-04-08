import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IconInput from "../../../components/IconInput";
import { RiSearch2Fill } from "react-icons/ri";
import GeneralModal from "../../../components/general_modal";

const PazientiUpperBar = ({
    searchTerm,
    onSearchChange,
    currentPage,
    totalPages,
    onNextPage,
    onPreviousPage,
    itemsPerPage,
    onItemsPerPageChange,
    onSuccessAddUser
}) => {
    const [openAddUser, setOpenAddUser] = useState(false);

    return (
        <>
            {openAddUser && (
                <GeneralModal
                    title="Aggiungi utente"
                    children={<PazienteAddModal onSuccess={onSuccessAddUser} />}
                    onClose={() => setOpenAddUser(false)}
                />
            )}
            <div className='pazienti_upper_bar'>
                <IconInput
                    icon={<RiSearch2Fill />}
                    type="text"
                    placeholder="Cerca paziente per nome o cognome..."
                    value={searchTerm}
                    onChange={e => onSearchChange(e.target.value)}
                />
                <IconInput
                    title="Elementi per Pagina"
                    type="number"
                    name="itemsPerPage"
                    value={itemsPerPage}
                    onChange={(e) => onItemsPerPageChange(e.target.value)}
                    placeholder="Elementi per pagina"
                    icon={<i className="fas fa-list-ol"></i>} // Replace with a relevant icon
                />
                <div className="pazienti_upper_bar_pagination">
                    <button onClick={onPreviousPage} disabled={currentPage === 1}>
                        Indietro
                    </button>
                    <span>Pagina {currentPage} di {totalPages}</span>
                    <button onClick={onNextPage} disabled={currentPage === totalPages}>
                        Avanti
                    </button>
                </div>
            </div>
        </>
    );
};

PazientiUpperBar.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    onSearchChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onNextPage: PropTypes.func.isRequired,
    onPreviousPage: PropTypes.func.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    onItemsPerPageChange: PropTypes.func.isRequired,
};

export default PazientiUpperBar;
