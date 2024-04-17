import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';

import './App.css';
import NavBar from '../components/NavBar/NavBar'
import TopBar from '../components/TopBar/TopBar'
import ProfileCardCaregiver from '../components/Profile/ProfileCard/ProfileCardCaregiver'
import AgendaList from '../components/Profile/AgendaList'
import CaregiverForm from '../components/Forms/CaregiverForm';
import CarereceiverForm from '../components/Forms/CarereceiverForm';

function ProfileCaregiver() {
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
          <ProfileCardCaregiver></ProfileCardCaregiver>
        </div>
        <div className='columnRight70'>
          <CaregiverForm></CaregiverForm>
          {/* <CarereceiverForm></CarereceiverForm> */}
          {/* <AgendaList></AgendaList> */}
        </div>
      </main>
    </div>
  );
}

export default ProfileCaregiver;
