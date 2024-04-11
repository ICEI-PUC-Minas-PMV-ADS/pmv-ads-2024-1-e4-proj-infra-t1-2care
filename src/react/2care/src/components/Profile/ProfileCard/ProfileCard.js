import './ProfileCard.css'
import { Link } from 'react-router-dom';

const ProfileCard = () => {
    return (
        <div className='profileCard'>
            <h2>Ellen Gonçalves</h2>
            <h6>Cuidador</h6>
            {/* 
            Client
            <h6>Familiar</h6> */}
            <img src='https:\\github.com\ellen-goncalves.png'></img>
            
            <button>Propostas Recebidas</button>
            <button>Agenda</button>
            <Link to="/request">
                <button>Enviar proposta</button>
            </Link>
            {/* 
            Client
            <button>Propostas Enviadas</button>
            <button>Avaliações Feitas</button> */}
            <p>Membro desde </p>
        </div>
    )
}

export default ProfileCard;