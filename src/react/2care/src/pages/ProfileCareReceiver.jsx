import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';

import './App.css';
import NavBar from '../components/NavBar/NavBar'
import TopBar from '../components/TopBar/TopBar'
import ProfileCardCareReceiver from '../components/Profile/ProfileCard/ProfileCardCareReceiver';
import CarereceiverForm from '../components/Forms/CarereceiverForm';
import Grid from '@mui/material/Grid';

function ProfileCareReceiver() {
  const theme = useTheme();
  useEffect(() => {
    document.title = 'Perfil';
  }, []);

  return (
    <div>
      <TopBar />
      <NavBar />

      <Grid container spacing={-20} justifyContent="center">
        <Grid item xs={false} sm={2} /> 
        <Grid item xs={12} sm={6} md={3}>
          <ProfileCardCareReceiver />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <CarereceiverForm />
        </Grid>
        <Grid item xs={false} sm={1} />
      </Grid>
    </div>
  );
}

export default ProfileCareReceiver;
