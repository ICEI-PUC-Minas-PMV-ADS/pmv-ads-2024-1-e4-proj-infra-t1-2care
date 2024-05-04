import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import TopBar from '../../components/TopBar/TopBar';
import { Typography, Grid } from '@mui/material';
import RequestList from '../../components/Requests/RequestList';

const RequestsCareReceiver = () => {
    document.title = 'Propostas Enviadas';

    const getHeaderText = () => {
        return 'Veja as suas propostas enviadas:';
    };

    return (
        <div>
            <TopBar />
            <NavBar />
            <Grid container justifyContent="center" style={{ marginTop: '5vh' }}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h5" gutterBottom>{getHeaderText()}</Typography>
                    <RequestList userType="careReceiver" hideActions={true}/> 
                </Grid>
            </Grid>
        </div>
    )
}

export default RequestsCareReceiver;
