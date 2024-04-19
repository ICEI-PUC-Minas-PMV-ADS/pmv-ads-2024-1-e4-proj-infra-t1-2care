import React from 'react';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
// import ResponsiveAppBar from '../components/layout/ResponsiveAppBar';
import Home from '../pages/home.jsx'
import ProfileCareReceiver from '../pages/ProfileCareReceiver.jsx';
import ProfileCaregiver from '../pages/ProfileCaregiver.jsx'
import Login from '../pages/Login.js'
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme/theme.js';
import SendRequest from '../pages/SendRequest.js';
import Requests from '../pages/Requests.js';
import Ratings from '../pages/Ratings.js';
import Register from '../pages/Register.js';

export default (props) => (
    <ThemeProvider theme={theme}>
        <BrowserRouter >
            {/* <ResponsiveAppBar /> */}
            <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="home" element={<Home />} />
            <Route path="ProfileCareReceiver" element={<ProfileCareReceiver />} />
            <Route path="ProfileCaregiver" element={<ProfileCaregiver />} />
            <Route path="request" element={<SendRequest />} />
            <Route path="requests" element={<Requests />} />
            <Route name="Rating" path="ratings" element={<Ratings />} />
            <Route name="Register" path="register" element={<Register />} />
            <Route name="Rating" path="ratings" element={<Ratings />} />
            </Routes>
        </BrowserRouter >
    </ThemeProvider>
)