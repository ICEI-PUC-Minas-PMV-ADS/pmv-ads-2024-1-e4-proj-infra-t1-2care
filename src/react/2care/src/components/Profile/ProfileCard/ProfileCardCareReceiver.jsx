import React from 'react';
import NavigationButton from '../../NavigationButton/NavigationButton';

const ProfileCardCareReceiver = () => {
    return (
        <div className="profileCard">
            <h2>Renata Silva</h2>
            <h3>-</h3>

            <img 
                alt="Renata Silva" 
                src="https://img.freepik.com/fotos-gratis/fechar-o-jovem-em-um-churrasco_23-2149271990.jpg?t=st=1713220706~exp=1713224306~hmac=a4aef687ef53707d135c35ca7753f000e2e522e5e97bbfe8a63736b5ac1d16b6&w=1380"
            />

            <NavigationButton to="/sent-requests" text="Propostas Enviadas" />
            <NavigationButton to="/reviews" text="Avaliações Feitas" />

            <p>Membro(a) desde 2020</p>
        </div>
    );
};

export default ProfileCardCareReceiver;