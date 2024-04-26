import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import '../App.css';
import NavBar from '../../components/NavBar/NavBar'
import TopBar from '../../components/TopBar/TopBar'
import ProfileCardCareReceiver from '../../components/Profile/ProfileCard/ProfileCardCareReceiver';
import Grid from '@mui/material/Grid';
import CareReceiverProfileForm from '../../components/Profile/ProfileForm/CarereceiverProfileForm';
import { getUserData } from '../../services/userService';
import { getCareReceiverData } from '../../services/careReceiverService';

function ProfileCareReceiver() {
  const [userData, setUserData] = useState({});
  const [careReceiverData, setCareReceiverData] = useState({});
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Perfil';
    //da pra receber props e não fazer o request caso necessario, mas creio que só vai acontecer no caregiver.
    getUserData().then((result) => {
      console.log(result.user_type_display, result.user_type_display === 'CareReceiver')
      result.user_type_display === "CareReceiver" ? setUserData(result) : navigate('/')
    })//minha ideia era colocar no componente pra não ter que ficar me repetindo, mas as chances de alguém renderizar as infos erradas pq algum request falhou era grande.
    getCareReceiverData().then((result) => {
      setCareReceiverData(result)
    })

  }, []);
  
  return (
    <div>
      <TopBar />
      <NavBar />

      <Grid container justifyContent="center" style={{ marginTop: '5vh' }}>
        <Grid item xs={3}>
          <ProfileCardCareReceiver userData={userData} careReceiverData={careReceiverData} />
        </Grid>
        <Grid item xs={8}>
          <CareReceiverProfileForm userData={userData} careReceiverData={careReceiverData} />
        </Grid>
      </Grid>
    </div>
  );
}

export default ProfileCareReceiver;