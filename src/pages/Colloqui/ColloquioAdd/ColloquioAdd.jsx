import { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";
import IconInput from "../../../components/IconInput";
import IconSelect from "../../../components/IconSelect";
import IconDate from "../../../components/IconDate";
import GeneralNavigation from "../../../components/GeneralNavigation/general_navigation";
import { FaCalendarPlus, FaUser, FaFileAlt, FaClock } from "react-icons/fa";
import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Alert from "../../../components/alert";
import { useLoader } from "../../../main/LoaderContext";

/**
 * Componente per aggiungere o modificare un colloquio associato a un paziente
 */
export default function ColloquioAdd({ modify }) {
    const navigate = useNavigate();
    const { showLoader, hideLoader } = useLoader();

    const queryParams = new URLSearchParams(location.search);
    const colloquioId = queryParams.get("id");
    const search = queryParams.get('search');

    const [form, setForm] = useState({
        id_paziente: "",
        notes: "",
        date: "",
        duration: ""
    });

    const [pazienti, setPazienti] = useState([]);
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

    // Recupera tutti i pazienti dal database
    const fetchPazienti = async () => {
        const { data, error } = await supabase
            .from("Paziente")
            .select("id, name, surname, sex");

        if (error) {
            console.error(error);
            showAlert("error", "Errore", "Errore durante il recupero dei pazienti.");
        } else {
            const formatted = data.map(p => ({
                value: p.id,
                label: `${p.name} ${p.surname}`
            }));
            setPazienti(formatted);
        }
    };

    // Recupera i dati del colloquio se siamo in modalità modifica
    const fetchColloquio = async () => {
        const { data, error } = await supabase
            .from("Colloquio")
            .select("*")
            .eq("id", colloquioId);

        if (error) {
            console.error(error);
            showAlert("error", "Errore", "Errore durante il recupero del colloquio.");
        } else if (data && data.length > 0) {
            const isoDate = new Date(data[0].date).toISOString(); // es: 2025-04-15T00:00:00.000Z
            const dateFormatted = isoDate.substring(0, 16);
            setForm({
                id_paziente: data[0].id_paziente,
                notes: data[0].notes || "",
                date: dateFormatted,
                duration: data[0].duration || ""
            });
            console.log('date', dateFormatted)
        } else {
            showAlert("error", "Non trovato", "Colloquio non trovato.");
        }
    };

    // Validazione del form prima dell'invio
    const validateForm = () => {
        const { id_paziente, date, duration } = form;
        if (!id_paziente || !date || !duration) {
            return "Compila tutti i campi obbligatori (*)";
        }

        if (isNaN(duration) || parseInt(duration) <= 0) {
            return "La durata deve essere un numero positivo";
        }

        return "";
    };

    // Gestisce l'invio del form per creare o aggiornare un colloquio
    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = validateForm();
        if (validationError) {
            showAlert("error", "Errore di validazione", validationError);
            return;
        }

        showLoader();

        if (modify) {
            const { error } = await supabase
                .from("Colloquio")
                .update(form)
                .eq("id", colloquioId);

            hideLoader();

            if (error) {
                console.error(error);
                showAlert("error", "Errore", `Impossibile aggiornare il colloquio. Errore: ${error.message}`);
            } else {
                showAlert("success", "Successo", "Colloquio aggiornato con successo.");
            }
        } else {
            const { error } = await supabase
                .from("Colloquio")
                .insert([form]);

            hideLoader();

            if (error) {
                console.error(error);
                showAlert("error", "Errore", `Impossibile aggiungere il colloquio. Errore: ${error.message}`);
            } else {
                showAlert("success", "Successo", "Colloquio aggiunto con successo.");
                setForm({
                    id_paziente: "",
                    notes: "",
                    date: "",
                    duration: ""
                });
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleGoBack = () => {
        navigate("/colloqui");
        window.location.reload();
    };

    useEffect(() => {
        showLoader();
        fetchPazienti();
        if (modify) fetchColloquio();
        hideLoader();
    }, []);

    return (
        <>
            <div className="MainDiv">
                <GeneralNavigation
                    breadcrumbs={[
                        ...(search !== "null" ? [{ label: "Colloqui", path: "/colloqui", active: false }] : []),
                        {
                            label:
                                search === "lista"
                                    ? "Lista Generale"
                                    : search === "paziente"
                                        ? "Cerca Paziente"
                                        : "Colloqui",
                            path: `/colloqui?&search=${search}`,
                            active: false,
                        },
                        {
                            label: modify ? "Modifica Colloquio" : "Nuovo Colloquio",
                            path: "#",
                            active: true,
                        },
                    ]}

                    icon1={<IoArrowBackCircle />}
                    icon1OnClick={() => navigate(-1)}
                />
                <div className="colloquio_add_main">
                    <form className="colloquio_add_main_form" onSubmit={handleSubmit}>
                        <h4>Dettagli Colloquio</h4>

                        <IconSelect
                            title="Paziente *"
                            name="id_paziente"
                            value={form.id_paziente}
                            onChange={handleChange}
                            required
                            icon={<FaUser />}
                            options={pazienti}
                        />

                        <IconInput
                            title="Note"
                            type="textarea"
                            name="notes"
                            value={form.notes}
                            onChange={handleChange}
                            icon={<FaFileAlt />}
                            height="200px" // Altezza personalizzata più lunga
                        />

                        <IconDate
                            title="Data *"
                            name="date"
                            value={form.date}
                            onChange={handleChange}
                            required
                            icon={<FaCalendarPlus />}
                            showTime={true}
                        />


                        <IconInput
                            title="Durata (minuti) *"
                            type="number"
                            name="duration"
                            value={form.duration}
                            onChange={handleChange}
                            required
                            icon={<FaClock />}
                        />

                        <div className="colloquio_add_form_actions">
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
