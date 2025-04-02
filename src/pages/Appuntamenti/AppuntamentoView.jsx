import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { useLoader } from "../../main/LoaderContext";

export default function AppuntamentoView({ evento }) {
    const [nomePaziente, setNomePaziente] = useState("");
    const { showLoader, hideLoader } = useLoader();

    useEffect(() => {
        const fetchPaziente = async () => {
            if (!evento?.id_paziente) return;

            showLoader();

            const { data } = await supabase
                .from("Paziente")
                .select("name, surname")
                .eq("id", evento.id_paziente)
                .single();

            if (data) {
                setNomePaziente(`${data.name} ${data.surname}`);
            } else {
                setNomePaziente("Paziente non trovato");
            }

            hideLoader();
        };

        fetchPaziente();
    }, [evento]);

    if (!evento) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <p><strong>Titolo:</strong> {evento.title}</p>
                <p><strong>Paziente:</strong> {nomePaziente}</p>
                <p><strong>Inizio:</strong> {evento.start.toLocaleString()}</p>
                <p><strong>Fine:</strong> {evento.end.toLocaleString()}</p>
                <p><strong>Note:</strong> {evento.notes || "Nessuna nota"}</p>
            </div>
        </div>
    );
}
