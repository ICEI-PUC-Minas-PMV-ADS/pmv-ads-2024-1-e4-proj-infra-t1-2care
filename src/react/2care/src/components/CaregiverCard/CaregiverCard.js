import React, { useState } from 'react';
import RatingStars from '../Ratings/RatingStars';
import './CaregiverCard.css';

const CaregiverCard = (props) => {
    const [showSpecialization, setShowSpecialization] = useState(false);

    const handleMouseEnter = () => {
        setShowSpecialization(true);
    };

    const handleMouseLeave = () => {
        setShowSpecialization(false);
    };

    return (
        <div className='caregiverCard' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <img src={props.image} alt={props.name} />
            {props.showName && (
                <h4>{props.name}</h4>
            )}
            {(props.showDescription || showSpecialization) && (
                <div className='description'>
                    <p>Especialização: {props.especialization}</p>
                    <p>Distância: {props.distance ? props.distance : 'cadastre-se para descobrir!'}</p>
                    <p>Avaliações: </p>
                    <RatingStars stars={3.7} />
                </div>
            )}
        </div>
    );
};

export default CaregiverCard;
