import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import TopBar from '../../components/TopBar/TopBar';
import { Typography, Grid } from '@mui/material';
import RequestList from '../../components/Requests/RequestList';

const RequestsCaregiver = () => {
    document.title = 'Propostas Recebidas';

    const getHeaderText = () => {
        return 'Veja as suas propostas recebidas:';
    };

    return (
        <div>
            <TopBar />
            <NavBar />
            <Grid container justifyContent="center" style={{ marginTop: '5vh' }}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h5" gutterBottom>{getHeaderText()}</Typography>
                    <RequestList userType="caregiver" />
                </Grid>
            </Grid>
        </div>
    )
}

export default RequestsCaregiver;
