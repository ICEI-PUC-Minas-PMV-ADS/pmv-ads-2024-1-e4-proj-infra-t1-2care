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

      <main>
        <div className='columnLeft25' >
          <ProfileCard></ProfileCard>
        </div>
        <div className='columnRight70'>
          <CaregiverForm></CaregiverForm>
          {/* <CarereceiverForm></CarereceiverForm> */}
        </div>
      </main>
    </div>
  );
}

export default Home;
