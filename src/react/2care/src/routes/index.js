import React from 'react';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
// import ResponsiveAppBar from '../components/layout/ResponsiveAppBar';
import Home from '../pages/home.jsx'
import Profile from '../pages/Profile.js'
import Login from '../pages/Login.js'
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme/theme.js';
import SendRequest from '../pages/SendRequest.js';
import Requests from '../pages/Requests.js';
import Ratings from '../pages/Ratings.js';

export default (props) => (
    <ThemeProvider theme={theme}>
        <BrowserRouter >
            {/* <ResponsiveAppBar /> */}
            <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="home" element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="request" element={<SendRequest />} />
            <Route path="requests" element={<Requests />} />
            <Route path="ratings" element={<Ratings />} />
            </Routes>
        </BrowserRouter >
    </ThemeProvider>
)