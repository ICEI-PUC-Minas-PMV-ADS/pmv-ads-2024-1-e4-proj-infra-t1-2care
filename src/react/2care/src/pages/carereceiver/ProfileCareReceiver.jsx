import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import '../App.css';
import NavBar from '../../components/NavBar/NavBar'
import TopBar from '../../components/TopBar/TopBar'
import ProfileCardCareReceiver from '../../components/Profile/ProfileCard/ProfileCardCareReceiver';
import { Grid, Box, Tab, Tabs, Typography } from '@mui/material';
import CareReceiverProfileForm from '../../components/Profile/ProfileForm/CarereceiverProfileForm';
import { getUserData } from '../../services/userService';
import { getCareReceiverData } from '../../services/careReceiverService';
import { toast } from 'react-toastify';

import SpecialCareList from '../../components/ListSelection/SpecialCareListSelection';

function ProfileCareReceiver() {
  const [userData, setUserData] = useState({});
  const [careReceiverData, setCareReceiverData] = useState({});
  const [value, setValue] = useState(0);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Perfil';
    //da pra receber props e não fazer o request caso necessario, mas creio que só vai acontecer no caregiver.

    getUserData().then((result) => {
      result.user_type_display === "CareReceiver" ? setUserData(result) : navigate('/')
    })//minha ideia era colocar no componente pra não ter que ficar me repetindo, mas as chances de alguém renderizar as infos erradas pq algum request falhou era grande.

    getCareReceiverData().then((result) => {
      setCareReceiverData(result)
      setIsProfileComplete(result ? true : false)
    })

  }, []);

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    if (newValue !== 0 && !isProfileComplete) {
      getCareReceiverData().then((result) => {
        result ? setValue(newValue) : toast.warn("Complete o perfil antes de prosseguir para as outras abas.");
      })
    } else {
      setValue(newValue);
    }
  };
  
  return (
    <div>
      <TopBar />
      <NavBar />

      <Grid container justifyContent="center" style={{ marginTop: '5vh' }}>
        <Grid item xs={3}>
          <ProfileCardCareReceiver userData={userData} careReceiverData={careReceiverData} />
        </Grid>
        <Grid item xs={8}>
          <Box sx={{ width: '100%' }}>
            <Tabs value={value} onChange={handleChange} aria-label="edit profile tabs">
              <Tab label="Informações Pessoais" {...a11yProps(0)} />
              <Tab label="Cuidados especiais" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
              <CareReceiverProfileForm userData={userData} careReceiverData={careReceiverData} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <SpecialCareList careReceiverData={careReceiverData} />
            </TabPanel>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProfileCareReceiver;