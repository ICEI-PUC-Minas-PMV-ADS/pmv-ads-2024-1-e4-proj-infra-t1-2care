import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';

import './App.css';
import NavBar from '../components/NavBar/NavBar'
import TopBar from '../components/TopBar/TopBar'
import ProfileCard from '../components/Profile/ProfileCard/ProfileCardCaregiver'
import ProfileCardCarereciver from '../components/Profile/ProfileCard/ProfileCardCarereceiver';
import AgendaList from '../components/Profile/AgendaList'
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
          <ProfileCardCarereciver></ProfileCardCarereciver>
        </div>
        <div className='columnRight70'>
          <CarereceiverForm></CarereceiverForm>
          {/* <CarereceiverForm></CarereceiverForm> */}
          {/* <AgendaList></AgendaList> */}
        </div>
      </main>
    </div>
  );
}

export default Home;
