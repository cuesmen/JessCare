import Alert from "../../../components/alert"
import ConfirmModal from "../../../components/confirm_modal"
import { useState } from "react";
import { supabase } from "../../../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function PazienteImpActions({ paziente, status }) {

    const navigate = useNavigate();

    const [openConfirm, setOpenConfirm] = useState(false);
    const [confirmConfig, setConfirmConfig] = useState({
        Title: "",
        Description: "",
        TextConfirm: false,
        TextToConfirm: "",
        onConfirm: null,
        onCancel: null
    });
    const showConfirm = (title, description, textConfirm, textToConfirm, onConfirm, onCancel) => {
        setConfirmConfig({ Title: title, Description: description, TextConfirm: textConfirm, TextToConfirm: textToConfirm, onConfirm: onConfirm, onCancel: onCancel });
        setOpenConfirm(true);
    };
    const resetConfirm = () => {
        setOpenConfirm(false)
        setConfirmConfig({
            Title: "",
            Description: "",
            TextConfirm: false,
            TextToConfirm: "",
            onConfirm: null,
            onCancel: null
        })
    }



    const [openAlert, setOpenAlert] = useState(false);
    const [alertConfig, setAlertConfig] = useState({
        Type: "success",
        Title: "",
        Description: ""
    });
    const showAlert = (type, title, description) => {
        setAlertConfig({ Type: type, Title: title, Description: description });
        setOpenAlert(true);
    };
    const resetAlert = () => {
        setOpenAlert(false)
        setAlertConfig({
            Type: "success",
            Title: "",
            Description: ""
        })
    }




    const handleDeletePaziente = async () => {
        resetConfirm();

        const { error } = await supabase
            .from("Paziente")
            .delete()
            .eq("id", paziente.id);

        if (error) {
            console.error(error);
            showAlert("error", "Errore", "Errore durante l'eliminazione del paziente.");
        } else {
            showAlert("success", "Successo", "Paziente eliminato correttamente.");
            setTimeout(() => {
                navigate(`/pazienti?&status=${status}`);
            }, 2000);
        }
    };

    const handleUscitaORientro = async () => {
        resetConfirm();

        const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
        let updateData = {};

        if (!paziente.exit) {
            updateData = { exit: today };
        } else {
            updateData = {
                exit: null,
                entry: today
            };
        }

        const { error } = await supabase
            .from("Paziente")
            .update(updateData)
            .eq("id", paziente.id);

        if (error) {
            console.error(error);
            showAlert("error", "Errore", "Errore durante l'aggiornamento del paziente.");
        } else {
            const newStatus = paziente.exit ? "in-corso" : "concluso";
            showAlert("success", "Successo", `Paziente ${paziente.exit ? "rientrato" : "uscito"} con successo.`);
            setTimeout(() => {
                window.location.href = `/dettagli-paziente?&status=${newStatus}&id=${paziente.id}`;
            }, 1000);
        }
    };




    return (
        <>
            {openAlert &&
                <Alert
                    Type={alertConfig.Type}
                    Title={alertConfig.Title}
                    Description={alertConfig.Description}
                    Modal={true}
                    onClose={() => setOpenAlert(false)}
                />
            }
            {openConfirm &&
                <ConfirmModal
                    Title={confirmConfig.Title}
                    Description={confirmConfig.Description}
                    TextConfirm={confirmConfig.TextConfirm}
                    TextToConfirm={confirmConfig.TextToConfirm}
                    onConfirm={confirmConfig.onConfirm}
                    onCancel={confirmConfig.onCancel}
                />
            }
            <div className="paziente_imp_actions_main_div_upper">
                <h1>Azioni</h1>
                <div className="paziente_imp_actions_main_div">
                    <button
                        className=""
                        onClick={() =>
                            showConfirm(
                                "Conferma eliminazione",
                                "Sei sicuro di voler eliminare questo paziente?\nL'azione è irreversibile.",
                                true,
                                "elimina",
                                () => handleDeletePaziente(),
                                () => resetConfirm()
                            )
                        }
                    >
                        Elimina paziente
                    </button>
                    <button
                        className=""
                        onClick={() =>
                            showConfirm(
                                `Conferma ${paziente.exit ? "rientro" : "uscita"}`,
                                `Vuoi davvero ${paziente.exit ? "far rientrare" : "far uscire"} il paziente?`,
                                false,
                                "",
                                () => handleUscitaORientro(),
                                () => resetConfirm()
                            )
                        }
                    >
                        Fai {paziente.exit ? "rientrare" : "uscire"} paziente
                    </button>
                </div>
            </div>
        </>
    );
}