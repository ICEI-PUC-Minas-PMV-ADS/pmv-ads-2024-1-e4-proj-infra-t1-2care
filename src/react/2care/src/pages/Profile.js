import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';

import './App.css';
import NavBar from '../components/NavBar/NavBar'
import TopBar from '../components/TopBar/TopBar'
import ProfileCard from '../components/ProfileCard/ProfileCard'
import CaregiverForm from '../components/Forms/CaregiverForm';
import CarereceiverForm from '../components/Forms/CarereceiverForm';

function Home() {
  const theme = useTheme();
  useEffect(() => {
    document.title = 'Perfil';
  }, []);

  return (
    <div>
      <TopBar></TopBar>
      <NavBar></NavBar>

      <header style={{ display: 'flex', margin: '1em' }}>
        <ProfileCard></ProfileCard>
        {/* <CaregiverForm></CaregiverForm> */}
        <CarereceiverForm></CarereceiverForm>
     </header>
    </div>
  );
}

export default Home;
