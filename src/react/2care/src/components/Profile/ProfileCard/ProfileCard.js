import NavigationButton from '../../NavigationButton/NavigationButton';
import { Link } from 'react-router-dom';

const ProfileCard = () => {
    return (
        <div className='profileCard'>
            <h2>Maria Fontes</h2>
            <h3>Cuidador</h3>
            {/* 
            Client
            <h6>Familiar</h6> */}
            <img src='https://img.freepik.com/fotos-gratis/enfermeira-negra-em-seu-espaco-de-trabalho_52683-100571.jpg'></img>
            <NavigationButton to="/requests" text="Propostas Recebidas" />
            <button>Agenda</button>
            <NavigationButton to="/request" text="Enviar proposta" />

            {/* 
            Client
            <button>Propostas Enviadas</button>
            <button>Avaliações Feitas</button> */}
            <p>Membro desde </p>
        </div>
    )
}

export default ProfileCard;