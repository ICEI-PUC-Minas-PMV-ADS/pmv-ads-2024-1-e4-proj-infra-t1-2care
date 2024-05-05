import React, { useState } from 'react';
import RatingStars from '../Ratings/RatingStars';
import './CaregiverCard.css';

const CaregiverCard = (props) => {
    return (
        <div className='caregiverCard'>
            <img src={props.image} alt={props.name} />
            {props.showName && (
                <h4>{props.name}</h4>
            )}
            <div className='description'>
                <p>Especialização: {props.especialization}</p>
                <p>Distância: {props.distance ? props.distance : 'cadastre-se para descobrir!'}</p>
                <p>Avaliações: </p>
                <RatingStars stars={3.7} />
            </div>
        </div>
    );
};

export default CaregiverCard;
