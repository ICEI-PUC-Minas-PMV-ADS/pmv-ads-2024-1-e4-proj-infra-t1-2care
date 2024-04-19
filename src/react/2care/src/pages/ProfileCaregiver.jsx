import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import NavBar from '../components/NavBar/NavBar';
import TopBar from '../components/TopBar/TopBar';
import ProfileCardCaregiver from '../components/Profile/ProfileCard/ProfileCardCaregiver';
import CaregiverForm from '../components/Forms/CaregiverForm';
import './App.css';

function ProfileCaregiver() {
  const theme = useTheme();
  useEffect(() => {
      document.title = 'Perfil';
  }, []);

  return (
    <div>
        <TopBar />
        <NavBar />

        <Grid container spacing={-20} justify="center">
            <Grid item xs={false} sm={2} /> 
            <Grid item xs={12} sm={6} md={3}>
                <ProfileCardCaregiver />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
                <CaregiverForm />
            </Grid>
            <Grid item xs={false} sm={1} />
        </Grid>
    </div>
);
}

export default ProfileCaregiver;
