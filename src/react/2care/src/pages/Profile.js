import React from 'react';
import { useTheme } from '@mui/material/styles';

import './App.css';
import NavBar from '../components/NavBar/NavBar'
import TopBar from '../components/TopBar/TopBar'
import ProfileCard from '../components/ProfileCard/ProfileCard'
import CaregiverForm from '../components/Forms/CaregiverForm';
import CarereceiverForm from '../components/Forms/CarereceiverForm';

function Home() {
  const theme = useTheme();

  return (
    // <div style={{ backgroundColor: theme.palette.background.light  }}>
    //   <h1> 2Care</h1>
    // </div>
    <div className="App">
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
