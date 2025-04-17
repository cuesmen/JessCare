import React from 'react'
import { IoMdCloseCircle } from "react-icons/io";

/**
 * Card per visualizzare i dati di un colloquio specifico di un paziente.
 * @param {Object} colloquio - I dati del colloquio da mostrare.
 * @param {Function} onSelect - Funzione opzionale chiamata al click sulla card.
 */
const ColloquiPazCard = ({ colloquio, toggleExpand, expandedColloquio, navigate }) => {
    return (
        <div
            key={colloquio.id}
            className={`colloqui_paziente_card ${expandedColloquio === colloquio.id ? 'expanded' : ''
                }`}
        >
            <div
                className="colloqui_paziente_toggle"
                onClick={() => toggleExpand(colloquio.id)}
            >
                <IoMdCloseCircle />
            </div>
            <div className="colloqui_paziente_content">
                <div className='colloqui_paziente_content_first'>
                    <p><strong>Data:</strong> {new Date(colloquio.date).toLocaleDateString()}</p>
                    <p><strong>Durata:</strong> {colloquio.duration} minuti</p>
                </div>
                {expandedColloquio === colloquio.id && (
                    <>
                        <div className='colloqui_paziente_content_second'>
                            <p><strong>Note:</strong>
                                <pre style={{ whiteSpace: "pre-wrap", marginTop: 0 }}>
                                    {colloquio.notes || 'Nessuna nota disponibile.'}
                                </pre>
                            </p>
                            <button onClick={() => navigate(`/colloquio-visualizza?id=${colloquio.id}&search=paziente&paz_id_to_search=${colloquio.Paziente.id}`)}>Visualizza</button>
                        </div> 
                    </>
                )}
            </div>
        </div>
    )
}

export default ColloquiPazCard
