import React from 'react';
import NavigationButton from '../../NavigationButton/NavigationButton';
import Grid from '@mui/material/Grid';
//import { Link } from 'react-router-dom';

const ProfileCardCareReceiver = () => {
    return (
        <Grid container spacing={2} className="profileCard" direction="column" alignItems="center" style={{ marginTop: '2rem' }}>
            <Grid item xs={12}>
                <h2>Renata Silva</h2>
                <h3>-</h3>
            </Grid>

            <Grid item xs={12}>
                <img 
                    alt="Renata Silva" 
                    src="https://img.freepik.com/fotos-gratis/fechar-o-jovem-em-um-churrasco_23-2149271990.jpg?t=st=1713220706~exp=1713224306~hmac=a4aef687ef53707d135c35ca7753f000e2e522e5e97bbfe8a63736b5ac1d16b6&w=1380"
                />
            </Grid>

            <Grid item xs={12}>
                <NavigationButton to="/sent-requests" text="Propostas Enviadas" />
            </Grid>
            <Grid item xs={12}>
                <NavigationButton to="/reviews" text="Avaliações Feitas" />
            </Grid>

            <Grid item xs={12}>
                <p>Membro(a) desde 2020</p>
            </Grid>
        </Grid>
    );
};

export default ProfileCardCareReceiver;