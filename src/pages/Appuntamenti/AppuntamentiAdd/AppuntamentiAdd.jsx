import { useState, useEffect } from "react";
import { supabase } from "../../../supabaseClient";
import IconInput from "../../../components/IconInput";
import IconDate from "../../../components/IconDate";
import IconTime from "../../../components/IconTime";
import GeneralNavigation from "../../../components/GeneralNavigation/general_navigation";
import Alert from "../../../components/alert";
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import { FaCalendarAlt, FaClock, FaUser, FaStickyNote } from "react-icons/fa";

export default function AppuntamentoAdd({ modify }) {
    const queryParams = new URLSearchParams(location.search);
    const appuntamentoId = queryParams.get("id");

    const [form, setForm] = useState({
        title: "",
        date: "",
        hour_start: "",
        hour_end: "",
        notes: "",
        id_paziente: ""
    });

    const [openAlert, setOpenAlert] = useState(false);
    const [alertConfig, setAlertConfig] = useState({
        Type: "success",
        Title: "",
        Description: ""
    });

    const navigate = useNavigate();

    const showAlert = (type, title, description) => {
        setAlertConfig({ Type: type, Title: title, Description: description });
        setOpenAlert(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const clearForm = () => {
        setForm({
            title: "",
            date: "",
            hour_start: "",
            hour_end: "",
            notes: "",
            id_paziente: ""
        });
    };

    const validateForm = () => {
        const { title, date, hour_start, hour_end, id_paziente } = form;

        if (!title || !date || !hour_start || !hour_end || !id_paziente) {
            return "Compila tutti i campi obbligatori (*)";
        }

        return "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = validateForm();
        if (validationError) {
            showAlert("error", "Errore di validazione", validationError);
            return;
        }

        if (modify) {
            const { error } = await supabase
                .from("Appuntamenti")
                .update(form)
                .eq("id", appuntamentoId);

            if (error) {
                console.error(error);
                showAlert("error", "Errore di aggiornamento", error.message);
            } else {
                showAlert("success", "Appuntamento aggiornato", "L'appuntamento è stato aggiornato correttamente.");
                setTimeout(() => window.location.reload(), 1000);
            }

        } else {
            const { error } = await supabase
                .from("Appuntamenti")
                .insert([form]);

            if (error) {
                console.error(error);
                if (error.message.includes("duplicate key value violates unique constraint"))
                    showAlert("error", "Errore di inserimento", "Esiste già un appuntamento per questo paziente per questa data e ora");
                else
                    showAlert("error", "Errore di inserimento", error.message);
            } else {
                showAlert("success", "Appuntamento aggiunto", "L'appuntamento è stato inserito correttamente.");
                clearForm();
            }
        }
    };

    const fetchAppuntamentoById = async () => {
        const { data, error } = await supabase
            .from("Appuntamenti")
            .select("*")
            .eq("id", appuntamentoId);

        if (error) {
            console.error("Errore nel recupero dell'appuntamento:", error);
            showAlert("error", "Errore", "Errore nel recupero dei dati.");
        } else if (data && data.length > 0) {
            setForm(data[0]);
        } else {
            showAlert("error", "Non trovato", "Nessun appuntamento trovato con questo ID.");
        }
    };

    useEffect(() => {
        if (modify) fetchAppuntamentoById();
    }, []);

    const handleOnClickGoBack = () => {
        navigate("/appuntamenti");
        window.location.reload();
    };

    const breadcrumbs = modify
        ? [
            { label: "Appuntamenti", path: "/appuntamenti", active: false },
            { label: "Modifica Appuntamento", path: `/appuntamento-modifica?id=${appuntamentoId}`, active: true }
        ]
        : [
            { label: "Appuntamenti", path: "/appuntamenti", active: false },
            { label: "Aggiungi Appuntamento", path: "/appuntamento-aggiungi", active: true }
        ];

    return (
        <>
            <div className="MainDiv">
                <GeneralNavigation
                    breadcrumbs={breadcrumbs}
                    icon1={<IoArrowBackCircle />}
                    icon1OnClick={handleOnClickGoBack}
                />
                <div className="paziente_add_main">
                    <form className="paziente_add_main_form" onSubmit={handleSubmit}>
                        <div className="paziente_add_main_form_lower">
                            <div className="paziente_add_form_group form_general">
                                <h4>Dettagli Appuntamento</h4>

                                <IconInput title="Titolo *" type="text" name="title" value={form.title} onChange={handleChange} icon={<FaCalendarAlt />} />
                                <IconDate title="Data *" type="date" name="date" value={form.date} onChange={handleChange} icon={<FaCalendarAlt />} />
                                <IconTime title="Ora Inizio *" name="hour_start" value={form.hour_start} onChange={handleChange} icon={<FaClock />} />
                                <IconTime title="Ora Fine *" name="hour_end" value={form.hour_end} onChange={handleChange} icon={<FaClock />} />
                                <IconInput title="ID Paziente *" type="number" name="id_paziente" value={form.id_paziente} onChange={handleChange} icon={<FaUser />} />
                                <IconInput title="Note" type="text" name="notes" value={form.notes} onChange={handleChange} icon={<FaStickyNote />} />
                            </div>
                        </div>
                        <div className="paziente_add_form_actions">
                            <button type="submit">Salva</button>
                        </div>
                    </form>
                </div>
            </div>
            {openAlert &&
                <Alert
                    Type={alertConfig.Type}
                    Title={alertConfig.Title}
                    Description={alertConfig.Description}
                    Modal={true}
                    onClose={() => setOpenAlert(false)}
                />
            }
        </>
    );
}
