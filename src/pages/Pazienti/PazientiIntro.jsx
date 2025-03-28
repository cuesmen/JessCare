import { SiStagetimer } from "react-icons/si";
import { FaCheckCircle } from "react-icons/fa";

export default function Pazientintro({ onClick }) {
    return (
        <>
            <div className="pazienti_intro_list">
                <div
                    className="pazienti_intro_div"
                    onClick={() => onClick("In Corso")}
                >
                    <a><SiStagetimer /></a>
                    In corso
                </div>
                <div
                    className="pazienti_intro_div"
                    onClick={() => onClick("Concluso")}
                >
                    <a><FaCheckCircle /></a>
                    Conclusi
                </div>
            </div>
        </>
    );
};