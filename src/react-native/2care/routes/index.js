import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme/theme.js';
import EditProfileCaregiver from '../pages/caregiver/EditProfileCaregiver.jsx';  // Garanta que o caminho está correto
import Home from '../pages/home.jsx';
import Login from '../pages/Login.js';

export default (props) => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile/caregiver/edit" element={<EditProfileCaregiver />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);