import PropTypes from 'prop-types';

export default function PazienteModal({ paziente }) {
    return (
        <div className='paziente_modal_main_div'>
            <p><strong>ID:</strong> {paziente.id}</p>
            <p><strong>Nome:</strong> {paziente.nome}</p>
            <p><strong>Cognome:</strong> {paziente.cognome}</p>
            <p><strong>Data di nascita:</strong> {paziente.nascita}</p>
            <p><strong>Telefono:</strong> {paziente.telefono}</p>
            <p><strong>Email:</strong> {paziente.email}</p>
            <p><strong>Data entrata:</strong> {paziente.entrata}</p>
            <p><strong>Data uscita:</strong> {paziente.uscita || '—'}</p>
            <p><strong>Creato il:</strong> {paziente.created_at}</p>
        </div>
    );
};

PazienteModal.propTypes = {
    paziente: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        nome: PropTypes.string.isRequired,
        cognome: PropTypes.string.isRequired,
        nascita: PropTypes.string.isRequired,
        telefono: PropTypes.string,
        email: PropTypes.string,
        entrata: PropTypes.string,
        uscita: PropTypes.string,
        created_at: PropTypes.string,
    }).isRequired,
};
