import React from 'react';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import ResponsiveAppBar from '../components/layout/ResponsiveAppBar';
import Home from '../pages/home.jsx'
import Profile from '../pages/Profile.js'
import Login from '../pages/Login.js'
import SendProposal from '../pages/SendProposal.js'
import ProposalsSent from '../pages/ProposalsSent.js'
import ProposalsReceived from '../pages/ProposalsReceived.js'
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme/theme.js';

export default (props) => (
    <ThemeProvider theme={theme}>
        <BrowserRouter >
            {/* <ResponsiveAppBar /> */}
            <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="home" element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="sendProposal" element={<SendProposal />} /> 
            <Route path="proposalsSent" element={<ProposalsSent />} /> 
            <Route path="proposalsReceived" element={<ProposalsReceived />} />
            </Routes>
        </BrowserRouter >
    </ThemeProvider>
)