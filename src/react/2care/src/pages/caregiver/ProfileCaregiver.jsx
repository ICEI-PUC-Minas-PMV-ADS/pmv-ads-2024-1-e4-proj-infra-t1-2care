import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useTheme, Box, Typography, Tabs, Tab, Grid, Button } from '@mui/material';
import { toast } from 'react-toastify';
import NavBar from '../../components/NavBar/NavBar';
import TopBar from '../../components/TopBar/TopBar';
import ProfileCardCaregiver from '../../components/Profile/ProfileCard/ProfileCardCaregiver';
import CaregiverProfileForm from '../../components/Profile/ProfileForm/CaregiverProfileForm';
import SpecializationList from '../../components/ListSelection/SpecializationListSelection';
import QualificationList from '../../components/ListSelection/QualificationList';
import WorkExperienceList from '../../components/ListSelection/WorkExperienceList';
import AvailabilityList from '../../components/ListSelection/AvailabilityList';
import { getUserData } from '../../services/userService';
import { getCaregiverData } from '../../services/caregiverService';
import TabPanel from '../../components/TabPanel';
import '../App.css';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function ProfileCaregiver(props) {
  const [userData, setUserData] = useState({});
  const [caregiverData, setCaregiverData] = useState({});
  const [value, setValue] = useState(0);
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    document.title = 'Perfil';

    // pegar dados do user
    getUserData().then((result) => {
      if (result.user_type_display === "Caregiver") {
        setUserData(result);
      } else {
        navigate('/');
      }
    });

    // pegar dado do caregiver
    getCaregiverData().then((result) => {
      setCaregiverData(result);
      setIsProfileComplete(result ? true : false);
    });
  }, []);

  // navegar entre as abass
  const handleChange = (event, newValue) => {
    if (newValue !== 0 && !isProfileComplete) {
      getCaregiverData().then((result) => {
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
          <ProfileCardCaregiver userData={userData} caregiverData={caregiverData} />
        </Grid>
        <Grid item xs={8}>
          <Box sx={{ width: '100%' }}>
            <Tabs value={value} onChange={handleChange} aria-label="edit profile tabs">
              <Tab label="Informações Pessoais" {...a11yProps(0)} />
              <Tab label="Especializações" {...a11yProps(1)} />
              <Tab label="Qualificações" {...a11yProps(2)} />
              <Tab label="Experiência de trabalho" {...a11yProps(3)} />
              <Tab label="Horários Disponíveis" {...a11yProps(4)} />
            </Tabs>
            <TabPanel value={value} index={0}>
              <CaregiverProfileForm userData={userData} caregiverData={caregiverData} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <SpecializationList caregiverData={caregiverData} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <QualificationList caregiverData={caregiverData} />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <WorkExperienceList caregiverData={caregiverData} />
            </TabPanel>
            <TabPanel value={value} index={4}>
              <AvailabilityList caregiverData={caregiverData} />
            </TabPanel>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProfileCaregiver;