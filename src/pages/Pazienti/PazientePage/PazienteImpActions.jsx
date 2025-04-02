import Alert from "../../../components/alert"
import ConfirmModal from "../../../components/confirm_modal"
import { useState } from "react";

export default function PazienteImpActions({ paziente }) {

    const [openConfirm, setOpenConfirm] = useState(false);
    const [confirmConfig, setConfirmConfig] = useState({
        Title: "success",
        Description: "",
        TextConfirm: false,
        TextToConfirm: ""
    });

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

    const showConfirm = (title, description, textConfirm, textToConfirm) => {
        setAlertConfig({ Type: type, Title: title, Description: description });
        setOpenAlert(true);
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
                />
            }
            <div className="paziente_imp_actions_main_div">
                <button
                    className="button_important"
                    onClick={() => showAlert}
                >
                    Elimina paziente
                </button>
                <button className="button_important">
                    Fai {paziente.exit ? "rientrare" : "uscire"} paziente
                </button>
            </div>
        </>
    );
}