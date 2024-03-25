import React from 'react';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import ResponsiveAppBar from '../components/layout/ResponsiveAppBar';
import Home from '../pages/home.jsx'
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme/theme.js';

export default (props) => (
    <ThemeProvider theme={theme}>
        <BrowserRouter >
            <ResponsiveAppBar />
            <Routes>
            <Route exact path="/" element={<Home />} />
            </Routes>
        </BrowserRouter >
    </ThemeProvider>
)