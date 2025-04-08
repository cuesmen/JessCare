import React from 'react';
import { FaUser, FaClock, FaCalendarAlt, FaExternalLinkAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ColloquioCard = ({ colloquio }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/colloquio-visualizza?id=${colloquio.id}`);
    };

    return (
        <div className="colloquio-card">
            <div className="colloquio-card-icon" onClick={handleNavigate}>
                <FaExternalLinkAlt />
            </div>
            <h3>Colloquio {colloquio.id}</h3>
            <p>
                <span className="icon"><FaUser /></span>
                <strong>Paziente:</strong> {colloquio.Paziente.name} {colloquio.Paziente.surname}
            </p>
            <p>
                <span className="icon"><FaCalendarAlt /></span>
                <strong>Data:</strong> {new Date(colloquio.date).toLocaleDateString()}
            </p>
            <p>
                <span className="icon"><FaClock /></span>
                <strong>Durata:</strong> {colloquio.duration} minuti
            </p>
        </div>
    );
};

export default ColloquioCard;
