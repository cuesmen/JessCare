import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { useLoader } from "../../main/LoaderContext";
import { FaUser, FaCalendarAlt, FaClock, FaStickyNote } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../../components/confirm_modal"; // Importa ConfirmModal
import Alert from "../../components/alert"; // Importa Alert

export default function AppuntamentoView({ evento }) {
    const [nomePaziente, setNomePaziente] = useState("");
    const [showConfirmModal, setShowConfirmModal] = useState(false); // Stato per il modal
    const [openAlert, setOpenAlert] = useState(false); // Stato per l'alert
    const [alertConfig, setAlertConfig] = useState({
        Type: "success",
        Title: "",
        Description: ""
    });
    const { showLoader, hideLoader } = useLoader();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPaziente = async () => {
            if (!evento?.id_paziente) return;

            showLoader();

            const { data, error } = await supabase
                .from("Paziente")
                .select("name, surname")
                .eq("id", evento.id_paziente)
                .single();

            hideLoader();

            if (error) {
                console.error("Errore durante il recupero del paziente:", error);
                setAlertConfig({
                    Type: "error",
                    Title: "Errore",
                    Description: "Errore durante il recupero del paziente."
                });
                setOpenAlert(true);
            } else if (data) {
                setNomePaziente(`${data.name} ${data.surname}`);
            } else {
                setAlertConfig({
                    Type: "warning",
                    Title: "Attenzione",
                    Description: "Paziente non trovato."
                });
                setOpenAlert(true);
            }
        };

        fetchPaziente();
    }, [evento]);

    if (!evento) {
        setAlertConfig({
            Type: "warning",
            Title: "Attenzione",
            Description: "Nessun evento trovato."
        });
        setOpenAlert(true);
        return null;
    }

    const handleEditClick = () => {
        navigate(`/appuntamento-modifica?id=${evento.id}`);
    };

    const handleDeleteClick = async () => {
        showLoader();

        const { error } = await supabase
            .from("Appuntamenti")
            .delete()
            .eq("id", evento.id);

        hideLoader();

        if (error) {
            console.error("Errore durante l'eliminazione dell'appuntamento:", error);
            setAlertConfig({
                Type: "error",
                Title: "Errore",
                Description: "Errore durante l'eliminazione dell'appuntamento."
            });
            setOpenAlert(true);
        } else {
            setAlertConfig({
                Type: "success",
                Title: "Eliminazione riuscita",
                Description: "L'appuntamento è stato eliminato con successo."
            });
            setOpenAlert(true);

            setTimeout(() => {
                window.location.reload(); // Ricarica la pagina
            }, 1000);
        }
    };

    return (
        <div className='AppuntamentoView_Card'>
            <h3 className='AppuntamentoView_Title'>{evento.title}</h3>
            <div className='AppuntamentoView_Details'>
                <p><FaUser className='AppuntamentoView_Icon' /> <strong>Paziente:</strong> {nomePaziente}</p>
                <p><FaCalendarAlt className='AppuntamentoView_Icon' /> <strong>Inizio:</strong> {evento.start.toLocaleString()}</p>
                <p><FaClock className='AppuntamentoView_Icon' /> <strong>Fine:</strong> {evento.end.toLocaleString()}</p>
                <p><FaStickyNote className='AppuntamentoView_Icon' /> <strong>Note:</strong> {evento.notes || "Nessuna nota"}</p>
            </div>
            <div className="AppuntamentoView_Actions">
                <button className="AppuntamentoView_EditButton" onClick={handleEditClick}>
                    Modifica Appuntamento
                </button>
                <button
                    className="AppuntamentoView_DeleteButton"
                    onClick={() => setShowConfirmModal(true)} // Mostra il modal
                >
                    Elimina Appuntamento
                </button>
            </div>
            {showConfirmModal && (
                <ConfirmModal
                    Title="Conferma Eliminazione"
                    Description="Sei sicuro di voler eliminare questo appuntamento? Questa azione è irreversibile."
                    onConfirm={handleDeleteClick} // Conferma l'eliminazione
                    onCancel={() => setShowConfirmModal(false)} // Chiudi il modal
                    TextConfirm={true}
                    TextToConfirm="elimina"
                />
            )}
            {openAlert && (
                <Alert
                    Type={alertConfig.Type}
                    Title={alertConfig.Title}
                    Description={alertConfig.Description}
                    Modal={true}
                    onClose={() => setOpenAlert(false)}
                />
            )}
        </div>
    );
}