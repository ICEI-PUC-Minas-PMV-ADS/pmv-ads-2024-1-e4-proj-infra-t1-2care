import React from 'react';
import NavigationButton from '../../NavigationButton/NavigationButton';

const ProfileCardCaregiver = () => {
    return (
        <div className="profileCard">
            <h2>Maria Fontes</h2>
            <h3>Cuidador</h3>

            <img 
                alt="Maria Fontes"
                src='https://img.freepik.com/fotos-gratis/enfermeira-negra-em-seu-espaco-de-trabalho_52683-100571.jpg'
            />
            <NavigationButton to="/requests" text="Propostas Recebidas" />
            <NavigationButton to="/requests" text="Agenda" />
            <NavigationButton to="/request" text="Avaliações Recebidas" />

            <p>Membro(a) desde 2021</p>
        </div>
    );
};

export default ProfileCardCaregiver;