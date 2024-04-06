import RatingStars from '../RatingStars/RatingStars';
import './CaregiverCard.css'

const CaregiverCard = (props) => {
    return (
        <div className='caregiverCard'>
            <img src={props.image} alt={props.name} />
            <div className='description'>
                <h4>{props.name}</h4>
                <p>Especialização: {props.especialization}</p>
                <p>Distância: {props.distance ? props.distance != '' : 'cadastre-se para descobrir!'}</p>
                <p>Avaliações: </p>
                <RatingStars stars={3.7} />
            </div>
        </div>
    )
}

export default CaregiverCard;