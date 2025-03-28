export default function PazienteInfoCard({title, desc}){
    return (
        <>
        <div className="paziente_info_card">
            <div className="paziente_info_card_title">
                {title}
            </div>
            <div className="paziente_info_card_desc">
                {desc}
            </div>
        </div>
        </>
    );
}