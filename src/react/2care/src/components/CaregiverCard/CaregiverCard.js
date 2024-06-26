import React from 'react';
import { Link } from 'react-router-dom';
import RatingStars from '../Ratings/RatingStars';
import './CaregiverCard.css';

const CaregiverCard = (props) => {

    return (
        <Link to={{ pathname: `/profile/Caregiver` }} state={{ caregiver: props.caregiver }} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className='caregiverCard' style={{width:"100%", height:"100%"}}>
                <img src={props.caregiver.picture && props.caregiver.picture != "null" ? props.caregiver.picture : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfwfJ-sfBI_mfosIiy1R3wpv6vVQp25hGPIPsjYP93Og&s"}
                    alt={props.caregiver.name} />
                {props.caregiver.showName && (
                    <h4>{props.caregiver.name}</h4>
                )}
                <div className='description'>
                    <h2><strong>{props.caregiver.name} </strong></h2>
                    <p><strong>Distância:</strong> {props.caregiver.distance >= 0 ? `${props.caregiver.distance} km de distância` : 'cadastre-se para descobrir!'}</p>
                    <p><strong>Experiência:</strong> {props.caregiver.career_time} Anos de experiência</p>
                    <p><strong>Custo da diária:</strong> R$ {props.caregiver.day_price ? props.caregiver.day_price : "---"} </p>
                    <p><strong>Custo da hora:</strong> R$ {props.caregiver.hour_price} </p>
                    <p><strong>Avaliações:</strong></p>
                    <RatingStars stars={props.caregiver.final_rating} />
                </div>
            </div>
        </Link>
    );
};

export default CaregiverCard;
