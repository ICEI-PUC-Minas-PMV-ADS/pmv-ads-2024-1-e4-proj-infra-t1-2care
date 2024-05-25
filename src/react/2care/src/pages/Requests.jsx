import React from 'react';
import NavBar from '../components/NavBar/NavBar';
import TopBar from '../components/TopBar/TopBar';
import { Typography, Grid } from '@mui/material';
import RequestList from '../components/Requests/RequestList';
import { getRequestsList } from '../services/caregiverService';
import { getUserType } from '../services/userService';

const Requests = () => {
    const [requestList, setRequestList] = React.useState([])
    const [userType, setUserType] = React.useState('')
    document.title = 'Propostas';

    React.useEffect(() => {
        const usert = getUserType()
        setUserType(usert ? usert : '')
    }, []);

    const getHeaderText = () => {
        return userType == "Caregiver" ?  'Veja as suas propostas recebidas:' : 'Veja as suas propostas enviadas:'
    };

    React.useEffect(() => {
        getRequestsList().then((result) => {
            setRequestList(result ? result : []);
        });
    }, []);

    return (
        <div>
            <TopBar />
            <NavBar />
            <Grid container justifyContent="center" style={{ marginTop: '5vh' }}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h5" gutterBottom>{getHeaderText()}</Typography>
                    <RequestList requestList={requestList} />
                </Grid>
            </Grid>
        </div>
    )
}

export default Requests;
