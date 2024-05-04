import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useTheme, Box, Typography, Tabs, Tab, Grid, Button } from '@mui/material';
import NavBar from '../../components/NavBar/NavBar';
import TopBar from '../../components/TopBar/TopBar';
import ProfileCardCaregiver from '../../components/Profile/ProfileCard/ProfileCardCaregiver';
import CaregiverProfileForm from '../../components/Profile/ProfileForm/CaregiverProfileForm';
import SpecializationList from '../../components/ListSelection/SpecializationListSelection';
import QualificationList from '../../components/ListSelection/QualificationList';
import { getUserData } from '../../services/userService';
import { getCaregiverData } from '../../services/caregiverService';
import '../App.css';

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
        setIsProfileComplete(true);
      } else {
        navigate('/');
      }
    });

    // pegar dado do caregiver
    getCaregiverData().then((result) => {
      setCaregiverData(result);
    });
  }, []);

    // navegar entre as abass
  const handleChange = (event, newValue) => {
    if (newValue !== 0 && !isProfileComplete) {
      alert("Complete o perfil antes de prosseguir para as outras abas.");
    } else {
      setValue(newValue);
    }
  };

    // salvar dados perfil, especializações e qualificações
  const handleSaveProfile = () => {
    //logica de salvar perfil provavelmente por aqui
    alert("Perfil salvo com sucesso!");
    setIsProfileComplete(true);
  };

  const handleSaveSpecializations = () => {
    //salvar spec aqui
    alert("Especializações salvas com sucesso!");
  };

  const handleSaveQualifications = () => {
    //salvar quali aqui
    alert("Qualificações salvas com sucesso!");
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
              <Tab label="Especializações" {...a11yProps(1)} disabled={!isProfileComplete} />
              <Tab label="Qualificações" {...a11yProps(2)} disabled={!isProfileComplete} />
            </Tabs>
            <TabPanel value={value} index={0}>
              <CaregiverProfileForm userData={userData} caregiverData={caregiverData} />
              <button type="submit" onClick={handleSaveProfile}>Salvar Alterações</button>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <SpecializationList caregiverData={caregiverData} />
              <button type="submit" onClick={handleSaveSpecializations}>Salvar Alterações</button>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <QualificationList caregiverData={caregiverData} />
              <button type="submit" onClick={handleSaveQualifications}>Salvar Alterações</button>
            </TabPanel>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProfileCaregiver;