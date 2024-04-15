import React from 'react';

import NavBar from "../components/NavBar/NavBar";
import TopBar from "../components/TopBar/TopBar";
import CaregiverList from "../components/CaregiverList/CaregiverList";
import RequestCard from '../components/RequestCard/RequestCard';
import { useTheme } from '@mui/material/styles';
import './App.css'


const ProposalsSent = () => {
    const theme = useTheme();

    return (
        <div className="App">
            <TopBar></TopBar>
            <NavBar></NavBar>
            <h1>Veja suas propostas enviadas: </h1>
            <CaregiverList></CaregiverList>
            <RequestCard></RequestCard>
        </div >
    )
}

export default ProposalsSent;