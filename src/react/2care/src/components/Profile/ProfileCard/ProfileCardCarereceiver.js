import NavigationButton from '../../NavigationButton/NavigationButton';
import { Link } from 'react-router-dom';

const ProfileCardCarereciver = () => {
    return (
        <div className='profileCard'>
            <h2>Renata Silva</h2>
            <h3>Cuidador</h3>
            {/* 
            Client
            <h6>Familiar</h6> */}
            <img src='https://img.freepik.com/fotos-gratis/fechar-o-jovem-em-um-churrasco_23-2149271990.jpg?t=st=1713220706~exp=1713224306~hmac=a4aef687ef53707d135c35ca7753f000e2e522e5e97bbfe8a63736b5ac1d16b6&w=1380'></img>
            <NavigationButton to="/requests" text="Propostas Enviadas" />
            <NavigationButton to="/request" text="Avaliações Feitas" />

            {/* 
            Client
            <button>Propostas Enviadas</button>
            <button>Avaliações Feitas</button> */}
            <p>Membro(a) desde </p>
        </div>
    )
}

export default ProfileCardCarereciver;