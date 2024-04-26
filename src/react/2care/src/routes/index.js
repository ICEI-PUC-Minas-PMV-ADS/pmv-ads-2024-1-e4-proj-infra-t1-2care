import React from 'react';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import { PrivateRouteWrapper } from './PrivateRoute.js';
import Home from '../pages/home.jsx'
import ProfileCareReceiver from '../pages/carereceiver/ProfileCareReceiver.jsx';
import ProfileCaregiver from '../pages/caregiver/ProfileCaregiver.jsx'
import Login from '../pages/Login.js'
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme/theme.js';
import SendRequest from '../pages/SendRequest.js';
import Requests from '../pages/Requests.js';
import Register from '../pages/Register.js';
import CaregiverCalendar from '../pages/caregiver/CaregiverCalendar.jsx';
import CaregiverEvaluations from '../pages/caregiver/CaregiverEvaluations.jsx';
import ProfileCaregiverSpec from '../pages/caregiver/ProfileCaregiverSpec.jsx';

export default (props) => (
    <ThemeProvider theme={theme}>
        <BrowserRouter >
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route exact path='/home' element={<Home/>}/>
                <Route path="register/:type" element={<Register />} />
                <Route path="profile/caregiver" element={<ProfileCaregiver />} />
                <Route path='profile/caregiver/spec' element={<ProfileCaregiverSpec />} />
                <Route name="CaregiverCalendar" path="profile/caregiver/calendar" element={<CaregiverCalendar />} />
                <Route name="CaregiverEvaluations" path="profile/caregiver/evaluations" element={<CaregiverEvaluations />} />

                <Route exact path='/' element={<PrivateRouteWrapper/>}>
                    <Route path="profile/carereceiver" element={<ProfileCareReceiver />} />
                    <Route path="request" element={<SendRequest />} />
                    <Route path="requests" element={<Requests />} />
                </Route>
            </Routes>
        </BrowserRouter >
    </ThemeProvider>
)