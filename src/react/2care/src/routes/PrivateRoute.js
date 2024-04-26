import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isLoggedIn } from '../services/authService';

export const PrivateRouteWrapper = () => {
    return isLoggedIn() ? <Outlet /> : <Navigate to="/" />;
}