import React from 'react';
/**
 * Mostra i dettagli di un appuntamento selezionato
 */
export default function AppuntamentoView({ evento }) {
    if (!evento) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <p><strong>Titolo:</strong> {evento.title}</p>
                <p><strong>Inizio:</strong> {evento.start.toLocaleString()}</p>
                <p><strong>Fine:</strong> {evento.end.toLocaleString()}</p>
            </div>
        </div>
    );
}
