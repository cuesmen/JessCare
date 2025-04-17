import React, { useEffect, useState, useCallback } from 'react';
import { supabase } from '../../../supabaseClient';
import { useLoader } from "../../../main/LoaderContext";
import IconSelect from '../../../components/IconSelect';
import { FaUser } from 'react-icons/fa';
import ColloquiPazCard from './ColloquiPazCard';
import { useNavigate } from 'react-router-dom';

export default function ColloquiPaziente() {
    const { showLoader, hideLoader } = useLoader();
    const [pazienti, setPazienti] = useState([]);
    const [selectedPaziente, setSelectedPaziente] = useState('');
    const [colloqui, setColloqui] = useState([]);
    const [expandedColloquio, setExpandedColloquio] = useState(null);
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const paz_id_to_search = queryParams.get('paz_id_to_search');

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

    const handleSearchColloqui = useCallback(async () => {
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
                    Paziente (id, name, surname)
                `)
                .eq('id_paziente', selectedPaziente)
                .order('date', { ascending: false });

            if (error) {
                console.error('Error fetching colloqui:', error);
            } else {
                setColloqui(data);
                if (data && data.length > 0) {
                    const idToSearch = data[0].Paziente.id;
                    const currentParams = new URLSearchParams(window.location.search);
                    currentParams.set('paz_id_to_search', idToSearch);
                    const newUrl = `${window.location.pathname}?${currentParams.toString()}`;
                    window.history.replaceState(null, '', newUrl);
                }
            }
        } finally {
            hideLoader();
        }
    }, [selectedPaziente, showLoader, hideLoader]);


    const toggleExpand = (id) => {
        setExpandedColloquio(expandedColloquio === id ? null : id);
    };

    useEffect(() => {
        if (paz_id_to_search) {
            setSelectedPaziente(paz_id_to_search);
            handleSearchColloqui();
        }
    }, [paz_id_to_search, handleSearchColloqui]);


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
                    {colloqui.length > 0 ? (
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                            {colloqui.map((colloquio) => (
                                <ColloquiPazCard
                                    colloquio={colloquio}
                                    toggleExpand={toggleExpand}
                                    expandedColloquio={expandedColloquio}
                                    navigate={navigate}
                                />
                            ))}
                        </div>
                    ) : (
                        <p>Nessun colloquio disponibile.</p>
                    )}
                </div>
            </div>
        </>
    );
}