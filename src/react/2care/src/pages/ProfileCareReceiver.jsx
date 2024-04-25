import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import './App.css';
import NavBar from '../components/NavBar/NavBar'
import TopBar from '../components/TopBar/TopBar'
import ProfileCardCareReceiver from '../components/Profile/ProfileCard/ProfileCardCareReceiver';
import Grid from '@mui/material/Grid';
import CareReceiverProfileForm from '../components/Profile/ProfileForm/CarereceiverProfileForm';

function ProfileCareReceiver() {
  const theme = useTheme();
  useEffect(() => {
    document.title = 'Perfil';
  }, []);

  return (
    <div>
      <TopBar />
      <NavBar />

      <Grid container justifyContent="center" style={{ marginTop: '5vh' }}>
        <Grid item xs={3}>
          <ProfileCardCareReceiver />
        </Grid>
        <Grid item xs={8}>
          <CareReceiverProfileForm />
        </Grid>
      </Grid>
    </div>
  );
}

export default ProfileCareReceiver;