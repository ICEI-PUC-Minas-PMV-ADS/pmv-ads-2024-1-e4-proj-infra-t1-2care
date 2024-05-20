import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation  } from "react-router-dom";
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
import { getUserData, getUserType } from '../../services/userService';
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
  
  const location = useLocation();
  const caregiverProps = location.state?.caregiver


  useEffect(() => {
    document.title = 'Perfil';

    if (caregiverProps) {
 
      setUserData({
        address: caregiverProps.address,
        birth_date: caregiverProps.birth_date,
        date_joined: caregiverProps.date_joined,
        gender: caregiverProps.gender,
        name: caregiverProps.name,
        picture: caregiverProps.picture,
        preferred_contact: caregiverProps.preferred_contact,
        phone: caregiverProps.phone,
        email: caregiverProps.email
      });

      setCaregiverData({
        hour_price: caregiverProps.hour_price,
        day_price: caregiverProps.day_price,
        max_request_km: caregiverProps.max_request_km,
        career_time: caregiverProps.career_time,
        additional_info: caregiverProps.additional_info,
        specializations: caregiverProps.specializations,
        qualifications: caregiverProps.qualifications,
        work_exp: caregiverProps.work_exp,
        fixed_unavailable_days: caregiverProps.fixed_unavailable_days,
        fixed_unavailable_hours: caregiverProps.fixed_unavailable_hours,
        custom_unavailable_days: caregiverProps.custom_unavailable_days,
        evaluations: caregiverProps.evaluations,
      });

    } else if (getUserType() === "Caregiver") {

      getUserData().then((result) => {
        setUserData(result);
      });

      getCaregiverData().then((result) => {
        setCaregiverData(result);
        setIsProfileComplete(result ? true : false);
      });

    }
    else {
      navigate('/');
    }
  }, []);

  // navegar entre as abass
  const handleChange = (event, newValue) => {
    if (newValue !== 0 && !isProfileComplete && !caregiverProps) {
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
          <ProfileCardCaregiver userData={userData} caregiverData={caregiverData}  isSelf={caregiverProps ? false : true}/>
        </Grid>
        <Grid item xs={8}>
          <Box sx={{ width: '100%' }}>
            <Tabs value={value} onChange={handleChange} aria-label="edit profile tabs">
              <Tab label="Informações Pessoais" {...a11yProps(0)} />
              <Tab label="Especializações" {...a11yProps(1)} />
              <Tab label="Qualificações" {...a11yProps(2)} />
              <Tab label="Experiência de trabalho" {...a11yProps(3)} />
              {!caregiverProps &&
                <Tab label="Horários Disponíveis" {...a11yProps(4)} />
              }
            </Tabs>
            <TabPanel value={value} index={0}>
              <CaregiverProfileForm userData={userData} caregiverData={caregiverData} isSelf={caregiverProps ? false : true}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <SpecializationList caregiverData={caregiverProps ? caregiverData : undefined} isSelf={caregiverProps ? false : true}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <QualificationList caregiverData={caregiverProps ? caregiverData : undefined} isSelf={caregiverProps ? false : true}/>
            </TabPanel>
            <TabPanel value={value} index={3}>
              <WorkExperienceList caregiverData={caregiverProps ? caregiverData : undefined} isSelf={caregiverProps ? false : true}/>
            </TabPanel>
            {!caregiverProps &&
              <TabPanel value={value} index={4}>
                <AvailabilityList caregiverData={caregiverProps ? caregiverData : undefined} isSelf={caregiverProps ? false : true}/>
              </TabPanel>
            }
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProfileCaregiver;