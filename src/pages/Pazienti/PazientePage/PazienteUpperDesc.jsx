import PazienteInfoCard from './PazienteInfoCard';
import { FaArrowRightLong } from "react-icons/fa6";

export default function PazienteUpperDesc({paziente, navigate, computeFirstBySex, computeSex, computeAge, formatDateTime, statusQuery}) {
    return (
        <>
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
        </>
    );
}