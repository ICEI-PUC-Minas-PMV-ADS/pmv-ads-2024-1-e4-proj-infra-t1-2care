import React from 'react';

import NavBar from "../components/NavBar/NavBar";
import TopBar from "../components/TopBar/TopBar";
import RequestCard from '../components/RequestCard/RequestCard';
import { useTheme } from '@mui/material/styles';
import './App.css'

const SendProposal = () => {
    const theme = useTheme();

    return (
        <div className="App">
            <TopBar></TopBar>
            <NavBar></NavBar>
            <RequestCard></RequestCard>
        </div >
    )
}

export default SendProposal;