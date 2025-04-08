import { useState, useEffect } from "react";
import { supabase } from "../../../supabaseClient";
import IconInput from "../../../components/IconInput";
import IconSelect from "../../../components/IconSelect";
import IconDate from "../../../components/IconDate";
import {
    FaUser,
    FaBirthdayCake,
    FaPhone,
    FaEnvelope,
    FaCalendarPlus,
    FaCalendarMinus,
    FaVenusMars,
    FaDiagnoses
} from "react-icons/fa";
import GeneralNavigation from "../../../components/GeneralNavigation/general_navigation";
import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Alert from "../../../components/alert"
import { computeFirstBySex } from '../../../utils/utils'
import { useLoader } from "../../../main/LoaderContext";


// Componente per l'aggiunta di un nuovo paziente
export default function PazienteAdd({ modify }) {

    const { showLoader, hideLoader } = useLoader();

    const queryParams = new URLSearchParams(location.search);
    const pazienteId = queryParams.get("id");
    const statusQuery = queryParams.get("status");

    const [form, setForm] = useState({
        name: "",
        surname: "",
        birth: "",
        cellphone: "",
        email: "",
        entry: "",
        sex: "",
        diagnosis_incoming: ""
    });
    const navigate = useNavigate();

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


    // Gestisce l'aggiornamento dei campi del form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const clearForm = () => {
        setForm({
            name: "",
            surname: "",
            birth: "",
            cellphone: "",
            email: "",
            entry: "",
            sex: "",
            diagnosis_incoming: ""
        });
    };


    // Valida i dati inseriti nel form prima dell'invio
    const validateForm = () => {
        const { name, surname, birth, cellphone, entry, sex, email } = form;

        if (!name || !surname || !birth || !cellphone || !entry || !email || !sex) {
            return "Compila tutti i campi obbligatori (*)";
        }

        if (!/^\d{10}$/.test(cellphone)) {
            return "Numero di telefono non valido (usa solo cifre, senza prefisso)";
        }

        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return "Email non valida";
        }

        if (!["M", "F"].includes(sex)) {
            return "Il sesso deve essere M o F";
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0); // per confrontare solo la data

        const birthDate = new Date(birth);
        const entryDate = new Date(entry);

        birthDate.setHours(0, 0, 0, 0);
        entryDate.setHours(0, 0, 0, 0);

        if (birthDate > today) {
            return "La data di nascita non può essere nel futuro";
        }

        if (entryDate > today) {
            return "La data di entrata non può essere nel futuro";
        }

        return "";
    };

    // Invia i dati a Supabase per l'inserimento nel database
    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = validateForm();
        if (validationError) {
            showAlert("error", "Errore di validazione", validationError);
            return;
        }

        const fullNumber = "+39" + form.cellphone;

        if (modify) {
            const { error } = await supabase
                .from("Paziente")
                .update({
                    ...form,
                    cellphone: fullNumber
                })
                .eq("id", pazienteId);

            if (error) {
                console.error(error);
                showAlert("error", "Errore di aggiornamento", `Non è stato possibile aggiornare il paziente. Errore: \n ${error.message}`);
            } else {
                showAlert("success", "Paziente aggiornato", "Il paziente è stato aggiornato correttamente.");
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }

        } else {
            const { error } = await supabase
                .from("Paziente")
                .insert([{
                    ...form,
                    cellphone: fullNumber
                }]);

            if (error) {
                console.error(error);
                showAlert("error", "Errore di inserimento", `Non è stato possibile salvare il paziente. Errore: \n ${error.message}`);
            } else {
                showAlert("success", "Paziente aggiunto", "Il paziente è stato inserito correttamente.");
                clearForm();
            }
        }
    };


    const handleOnClickGoBack = () => {
        navigate("/pazienti");
        window.location.reload();
    };

    function formatPhone(value) {
        const cleaned = value.replace(/\D/g, "").slice(0, 10);
        const part1 = cleaned.slice(0, 3);
        const part2 = cleaned.slice(3, 6);
        const part3 = cleaned.slice(6, 10);
        return [part1, part2, part3].filter(Boolean).join(" ");
    }







    const fetchPazienteById = async () => {
        const { data, error } = await supabase
            .from("Paziente")
            .select("*")
            .eq("id", pazienteId);

        if (error) {
            console.error("Errore nel recupero del paziente:", error);
            showAlert("error", "Errore", "Errore nel recupero dei dati del paziente.");
        } else {
            if (data && data.length > 0) {
                const paziente = data[0];

                // Rimuove il prefisso +39 dal numero per l'input
                paziente.cellphone = paziente.cellphone?.replace("+39", "");

                setForm({
                    name: paziente.name || "",
                    surname: paziente.surname || "",
                    birth: paziente.birth || "",
                    cellphone: paziente.cellphone || "",
                    email: paziente.email || "",
                    entry: paziente.entry || "",
                    sex: paziente.sex || "",
                    diagnosis_incoming: paziente.diagnosis_incoming || ""
                });
            } else {
                showAlert("error", "Non trovato", "Nessun paziente trovato con questo ID.");
            }
        }
    };

    useEffect(() => {
        if (modify) {
            showLoader()
            fetchPazienteById();
            hideLoader();
        }
    }, []);

    const breadcrumbs = modify
        ? [
            { label: "Pazienti", path: "/pazienti?&status=none", active: false, onClick: 'reloadPAZ' },
            { label: statusQuery === "in-corso" ? "In corso" : "Conclusi", path: `/pazienti?&status=${statusQuery}`, active: false },
            { label: "Dettagli Paziente", path: `/dettagli-paziente?&status=${statusQuery}&id=${pazienteId}`, active: false },
            { label: "Modifica Paziente", path: `/paziente-modifica?&status=${statusQuery}&id=${pazienteId}`, active: false },
            { label: `${computeFirstBySex(form.sex)} ${form.surname}`, path: `/paziente-modifica?&status=${statusQuery}&id=${pazienteId}`, active: true }
        ]
        : [
            { label: "Pazienti", path: "/pazienti?&status=none", active: false, onClick: 'reloadPAZ' },
            { label: "Aggiungi Paziente", path: "/paziente-add", active: true, onClick: 'reloadPAZ' }
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
                            {/* Informazioni generali */}
                            <div className="paziente_add_form_group form_general">
                                <h4>Informazioni Generali</h4>

                                <IconInput title="Nome *" type="text" name="name" value={form.name} onChange={handleChange} icon={<FaUser />} />
                                <IconInput title="Cognome *" type="text" name="surname" value={form.surname} onChange={handleChange} icon={<FaUser />} />

                                <IconDate
                                    title="Data di nascita *" type="date" name="birth" value={form.birth} onChange={handleChange} icon={<FaBirthdayCake />}
                                />
                                <IconSelect
                                    title="Sesso *"
                                    name="sex"
                                    value={form.sex}
                                    onChange={handleChange}
                                    required
                                    icon={<FaVenusMars />}
                                    options={[
                                        { label: "Uomo", value: "M" },
                                        { label: "Donna", value: "F" }
                                    ]}
                                />
                                <IconInput title="Diagnosi in ingresso" type="text" name="diagnosis_incoming" value={form.diagnosis_incoming} onChange={handleChange} icon={<FaDiagnoses />} />
                            </div>

                            {/* Contatti */}
                            <div className="paziente_add_form_group form_contacts">
                                <h4>Contatti</h4>

                                <IconInput
                                    title="Telefono *"
                                    type="text"
                                    name="cellphone"
                                    value={formatPhone(form.cellphone)}
                                    onChange={(e) => {
                                        const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
                                        setForm((prev) => ({ ...prev, cellphone: digits }));
                                    }}
                                    maxLength={13}
                                    required
                                    icon={<FaPhone />}
                                />

                                <IconInput title="Email *" type="email" name="email" value={form.email} onChange={handleChange} icon={<FaEnvelope />} />
                            </div>

                            {/* Degenza */}
                            <div className="paziente_add_form_group form_stay">
                                <h4>Degenza</h4>

                                <IconDate
                                    title="Data di entrata *" type="date" name="entry" value={form.entry} onChange={handleChange} icon={<FaCalendarPlus />}
                                />
                            </div>
                        </div>
                        {/* Errori e azioni */}
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
