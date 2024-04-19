import React from 'react';
//import { Link } from 'react-router-dom';
import NavigationButton from '../../NavigationButton/NavigationButton';
import Grid from '@mui/material/Grid';


const ProfileCardCaregiver = () => {
    return (
        <div className='profileCard'>
            <h2>Maria Fontes</h2>
            <h3>Cuidador</h3>

            <img src='https://img.freepik.com/fotos-gratis/enfermeira-negra-em-seu-espaco-de-trabalho_52683-100571.jpg'></img>
            <NavigationButton to="/requests" text="Propostas Recebidas" />
            <NavigationButton to="/requests" text="Agenda" />
            <NavigationButton to="/request" text="Avaliações Recebidas" />

            <p>Membro(a) desde </p>
        </div>
    );
};

export default ProfileCardCaregiver;