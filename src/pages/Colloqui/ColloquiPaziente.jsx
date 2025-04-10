import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { useLoader } from "../../main/LoaderContext";
import IconSelect from '../../components/IconSelect';
import { FaUser } from 'react-icons/fa';
import { IoMdCloseCircle } from "react-icons/io";

export default function ColloquiPaziente() {
    const { showLoader, hideLoader } = useLoader();
    const [pazienti, setPazienti] = useState([]);
    const [selectedPaziente, setSelectedPaziente] = useState('');
    const [colloqui, setColloqui] = useState([]);
    const [expandedColloquio, setExpandedColloquio] = useState(null);

    useEffect(() => {
        const fetchPazienti = async () => {
            showLoader();
            try {
                const { data, error } = await supabase
                    .from('Paziente')
                    .select('id, name, surname')
                    .order('surname', { ascending: true });
                if (error) {
                    console.error('Error fetching pazienti:', error);
                } else {
                    const options = data.map(paziente => ({
                        value: paziente.id,
                        label: `${paziente.surname} ${paziente.name}`,
                    }));
                    setPazienti(options);
                }
            } finally {
                hideLoader();
            }
        };
        fetchPazienti();
    }, []);

    const handleSearchColloqui = async () => {
        if (!selectedPaziente) return;
        showLoader();
        try {
            const { data, error } = await supabase
                .from('Colloquio')
                .select(`
                    id,
                    date,
                    duration,
                    notes,
                    Paziente (name, surname)
                `)
                .eq('id_paziente', selectedPaziente)
                .order('date', { ascending: false });
            if (error) {
                console.error('Error fetching colloqui:', error);
            } else {
                setColloqui(data);
            }
        } finally {
            hideLoader();
        }
    };

    const toggleExpand = (id) => {
        setExpandedColloquio(expandedColloquio === id ? null : id);
    };

    return (
        <>
            <div className="colloqui-paziente-container">
                <IconSelect
                    title="Seleziona Paziente"
                    name="paziente"
                    value={selectedPaziente}
                    onChange={(e) => setSelectedPaziente(e.target.value)}
                    icon={<FaUser />}
                    options={pazienti}
                />
                <button onClick={handleSearchColloqui} className="search-button">
                    Cerca Colloqui
                </button>
                <div className="colloqui-paziente-results">
                    {colloqui.map((colloquio) => (
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
                                            <p><strong>Note:</strong> {colloquio.notes}</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}