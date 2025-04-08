import PropTypes from 'prop-types';
import { computeAge, computeSex, computeFirstBySex, formatDateTime } from "../../../utils/utils";
import { supabase } from '../../../supabaseClient';
import { useLoader } from "../../../main/LoaderContext";
import { useState, useEffect } from 'react';
import GeneralNavigation from '../../../components/GeneralNavigation/general_navigation';
import PazienteInfoCard from './PazienteInfoCard';
import PazienteAppuntamenti from './PazienteAppuntamenti';
import { FaUserPlus } from "react-icons/fa";
import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import PazienteImpActions from './PazienteImpActions';
import { FaArrowRightLong } from "react-icons/fa6";
import AppuntamentiCalendar from '../../Appuntamenti/Calendar/AppuntamentiCalendar';

export default function PazientePage() {
    const { showLoader, hideLoader } = useLoader();
    const [paziente, setPaziente] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id");
    const statusQuery = queryParams.get("status");

    const fetchPazienteById = async () => {
        showLoader();

        const { data, error } = await supabase
            .from('Paziente')
            .select('*')
            .eq('id', id);

        if (error) {
            console.error('Errore nel recupero dei pazienti:', error);
            setErrorMessage('Errore nel recupero dei dati del paziente.');
        } else {
            if (data && data.length > 0) {
                setPaziente(data[0]);
            } else {
                setPaziente(null);
                setErrorMessage('Nessun paziente trovato con questo ID.');
            }
        }

        hideLoader();
    };

    useEffect(() => {
        fetchPazienteById();
    }, []);

    const computerLabel = () => {
        let toRet;
        if (statusQuery === "in-corso")
            toRet = [
                { label: "Pazienti", path: "/pazienti?&status=none", active: false },
                { label: "In Corso", path: "/pazienti?&status=in-corso", active: false },
                { label: `${computeFirstBySex(paziente.sex)} ${paziente.surname}`, path: `/dettagli-paziente?&status=in-corso&id=${id}`, active: true }
            ];
        else if (statusQuery === "concluso")
            toRet = [
                { label: "Pazienti", path: "/pazienti?&status=none", active: false },
                { label: "Conclusi", path: "/pazienti?&status=concluso", active: false },
                { label: `${computeFirstBySex(paziente.sex)} ${paziente.surname}`, path: `/dettagli-paziente?&status=concluso&id=${id}`, active: true }
            ];
        else
            toRet = [{ label: "Pazienti", path: "/pazienti?", active: false }];
        return toRet;
    }

    const breadcrumbs = paziente ? [...computerLabel()] : [];

    const handleOnClickGoBack = () => {
        navigate(`/pazienti?&status=${statusQuery}`)
    }

    const handleOnAddUser = () => {
        navigate(`/paziente-add`)
    }


    return (
        <>
            {errorMessage && <div className="error-message">{errorMessage}</div>}

            {paziente && (
                <>
                    <div className='MainDiv'>
                        <GeneralNavigation
                            breadcrumbs={breadcrumbs}
                            icon1={<IoArrowBackCircle />}
                            icon1OnClick={handleOnClickGoBack}
                            icon2={<FaUserPlus />}
                            icon2OnClick={handleOnAddUser}
                        />
                        <div className='PazientePage_MainDiv'>
                            <div className='paziente_modal_main_div'>
                                <div className='paziente_modal_main'>
                                    <p className='paziente_modal_id'>{paziente.id}</p>
                                    <div className='paziente_modal_main_circle'>{paziente.name.charAt(0).toUpperCase()}</div>
                                    <div className='paziente_modal_main_gen'>
                                        <div className='paziente_modal_main_name'>{computeFirstBySex(paziente.sex)} {paziente.name} {paziente.surname}</div>
                                        <div className='paziente_modal_main_email'>{paziente.email}</div>
                                        <button onClick={() => navigate(`/paziente-modifica?&id=${paziente.id}&status=${statusQuery}`)}>Modifica profilo</button>
                                    </div>
                                </div >
                                <div className='paziente_modal_main_left'>
                                    <div className='paziente_modal_main_left_icon'><FaArrowRightLong /></div>
                                    <PazienteInfoCard title="Sesso" desc={computeSex(paziente.sex)} />
                                    <PazienteInfoCard title="Status" desc={paziente.exit ? "Concluso" : "In Corso"} />
                                    <PazienteInfoCard title="Età" desc={computeAge(paziente.birth)} />
                                    <PazienteInfoCard title="Data di nascità" desc={paziente.birth} />
                                    <PazienteInfoCard title="Telefono" desc={paziente.cellphone} />
                                    <PazienteInfoCard title="Data di entrata" desc={paziente.entry} />
                                    <PazienteInfoCard title="Data di uscita" desc={paziente.exit} />
                                    <PazienteInfoCard title="Diagnosi in ingresso" desc={paziente.diagnosis_incoming} />
                                    <PazienteInfoCard title="Creato il" desc={formatDateTime(paziente.created_at)} />
                                </div>
                            </div>
                        </div>
                        <div className='paziente_page_appuntamenti_calendar'>
                            <AppuntamentiCalendar paziente={paziente} />
                        </div>
                        <PazienteImpActions paziente={paziente} status={statusQuery} />
                    </div>
                </>
            )}
        </>
    );
}

PazientePage.propTypes = {
    paziente: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        name: PropTypes.string.isRequired,
        surname: PropTypes.string.isRequired,
        birth: PropTypes.string.isRequired,
        sex: PropTypes.string,
        cellphone: PropTypes.string,
        email: PropTypes.string,
        entry: PropTypes.string,
        exit: PropTypes.string,
        diagnosis_incoming: PropTypes.string,
        created_at: PropTypes.string,
    }).isRequired,
};
