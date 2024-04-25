import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import NavBar from '../components/NavBar/NavBar';
import TopBar from '../components/TopBar/TopBar';
import ProfileCardCaregiver from '../components/Profile/ProfileCard/ProfileCardCaregiver';
import './App.css';
import CaregiverProfileForm from '../components/Profile/ProfileForm/CaregiverProfileForm';

function ProfileCaregiver() {
  const theme = useTheme();
  useEffect(() => {
    document.title = 'Perfil';
  }, []);

  return (
    <div>
        <TopBar />
        <NavBar />

        <Grid container justifyContent="center" style={{'marginTop': '5vh'}}>
            <Grid item xs={3}>
                <ProfileCardCaregiver/>
            </Grid>
            <Grid item xs={8}>
                < CaregiverProfileForm />
            </Grid>
        </Grid>
    </div>
);
}

export default ProfileCaregiver;
