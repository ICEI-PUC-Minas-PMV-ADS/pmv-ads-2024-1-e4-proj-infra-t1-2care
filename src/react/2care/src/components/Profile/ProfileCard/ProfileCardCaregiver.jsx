import React from 'react';
//import { Link } from 'react-router-dom';
import NavigationButton from '../../NavigationButton/NavigationButton';
import Grid from '@mui/material/Grid';


const ProfileCardCaregiver = () => {
    return (
        <Grid container spacing={2} className="profileCard" direction="column" alignItems="center" style={{ marginTop: '2rem' }}>
            <Grid item xs={12}>
                <h2>Maria Fontes</h2>
                <h3>Cuidador</h3>
            </Grid>

            <Grid item xs={12}>
                <img 
                    alt="Maria Fontes" 
                    src="https://img.freepik.com/fotos-gratis/enfermeira-negra-em-seu-espaco-de-trabalho_52683-100571.jpg"
                />
            </Grid>

            <Grid item xs={12}>
                <NavigationButton to="/requests" text="Propostas Recebidas" />
            </Grid>
            <Grid item xs={12}>
                <NavigationButton to="/calendar" text="Agenda" />
            </Grid>
            <Grid item xs={12}>
                <NavigationButton to="/reviews" text="Avaliações Recebidas" />
            </Grid>

            <Grid item xs={12}>
                <p>Membro(a) desde 2020</p>
            </Grid>
        </Grid>
    );
};

export default ProfileCardCaregiver;