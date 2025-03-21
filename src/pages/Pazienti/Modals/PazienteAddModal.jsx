import { useState } from "react";
import { supabase } from "../../../supabaseClient";
import IconInput from "../../../components/IconInput";
import { FaUser, FaBirthdayCake, FaPhone, FaEnvelope, FaCalendarPlus, FaCalendarMinus } from "react-icons/fa";


export default function PazienteAddModal({ onClose, onSuccess }) {
    const [form, setForm] = useState({
        name: "",
        surname: "",
        birth: "",
        cellphone: "",
        email: "",
        entrata: "",
        uscita: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        if (!form.name || !form.surname || !form.birth || !form.cellphone || !form.entrata) {
            return "Compila tutti i campi obbligatori (*)";
        }

        if (!/^\+?\d[\d\s]*$/.test(form.cellphone)) {
            return "Numero di telefono non valido";
        }

        if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            return "Email non valida";
        }

        return "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        const { error } = await supabase.from("Paziente").insert([form]);

        if (error) {
            console.error(error);
            setError("Errore durante l'inserimento");
        } else {
            setSuccess("Paziente inserito con successo");
            if (onSuccess) onSuccess();
            if (onClose) onClose();
        }
    };
    return (
        <div className="paziente_modal_main_div">
            <form onSubmit={handleSubmit}>
                {/* Gruppo: Informazioni generali */}
                <div className="form_group form_general">
                    <h4>Informazioni Generali</h4>

                    <label>Nome *</label>
                    <IconInput
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        icon={<FaUser />}
                    />

                    <label>Cognome *</label>
                    <IconInput
                        type="text"
                        name="surname"
                        value={form.surname}
                        onChange={handleChange}
                        icon={<FaUser />}
                    />

                    <label>Data di nascita *</label>
                    <div className="input_with_icon">
                        <FaBirthdayCake className="input_icon" />
                        <input
                            type="date"
                            name="birth"
                            value={form.birth}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Gruppo: Contatti */}
                <div className="form_group form_contacts">
                    <h4>Contatti</h4>

                    <label>Telefono *</label>
                    <IconInput
                        type="text"
                        name="cellphone"
                        value={form.cellphone}
                        onChange={handleChange}
                        icon={<FaPhone />}
                    />

                    <label>Email</label>
                    <IconInput
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        icon={<FaEnvelope />}
                    />
                </div>

                {/* Gruppo: Dati di degenza */}
                <div className="form_group form_stay">
                    <h4>Degenza</h4>

                    <label>Data entrata *</label>
                    <div className="input_with_icon">
                        <FaCalendarPlus className="input_icon" />
                        <input
                            type="date"
                            name="entrata"
                            value={form.entrata}
                            onChange={handleChange}
                        />
                    </div>

                    <label>Data uscita</label>
                    <div className="input_with_icon">
                        <FaCalendarMinus className="input_icon" />
                        <input
                            type="date"
                            name="uscita"
                            value={form.uscita}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Errori e azioni */}
                <div className="form_group form_actions">
                    {error && <p className="error">{error}</p>}
                    {success && <p className="success">{success}</p>}

                    <button type="submit">Salva</button>
                    <button type="button" onClick={onClose}>Annulla</button>
                </div>
            </form>
        </div>
    );
};      