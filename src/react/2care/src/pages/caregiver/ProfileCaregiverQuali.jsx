import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import NavBar from '../../components/NavBar/NavBar';
import TopBar from '../../components/TopBar/TopBar';
import { useNavigate } from "react-router-dom";
import ProfileCardCaregiver from '../../components/Profile/ProfileCard/ProfileCardCaregiver';
import CaregiverForm from '../../components/Forms/CaregiverForm';
import '../App.css';
import QualificationForm from '../../components/Forms/QualificationForm';
import { getUserData } from '../../services/userService';

function ProfileCaregiverQuali() {
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(() => {
        document.title = 'Perfil';

        getUserData().then((result) => {
            result.user_type_display === "Caregiver" ? setUserData(result) : navigate('/')
        })
  }, []);

  return (
    <div>
        <TopBar />
        <NavBar />

        <Grid container justifyContent="center" style={{'marginTop': '5vh'}}>
            <Grid item xs={3}>
                <ProfileCardCaregiver userData={userData}/>
            </Grid>
            <Grid item xs={8}>
                <QualificationForm />
            </Grid>
        </Grid>
    </div>
);
}

export default ProfileCaregiverQuali;
