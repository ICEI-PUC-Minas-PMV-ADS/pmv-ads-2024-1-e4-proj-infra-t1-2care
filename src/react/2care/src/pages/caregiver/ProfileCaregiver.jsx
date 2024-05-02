import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import NavBar from '../../components/NavBar/NavBar';
import TopBar from '../../components/TopBar/TopBar';
import ProfileCardCaregiver from '../../components/Profile/ProfileCard/ProfileCardCaregiver';
import '../App.css';
import CaregiverProfileForm from '../../components/Profile/ProfileForm/CaregiverProfileForm';
import { getUserData } from '../../services/userService';
import { getCaregiverData } from '../../services/caregiverService';

function ProfileCaregiver(props) {
    const [userData, setUserData] = useState({});
    const [caregiverData, setCaregiverData] = useState({});
    const theme = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Perfil';
        //da pra receber props e não fazer o request caso necessario, mas tem que parar de entrar em getUserData pq vai redirecionar.

        getUserData().then((result) => {
            result.user_type_display === "Caregiver" ? setUserData(result) : navigate('/')
            
        })//minha ideia era colocar no componente pra não ter que ficar me repetindo, mas as chances de alguém renderizar as infos erradas pq algum request falhou era grande.
        getCaregiverData().then((result) => {
            setCaregiverData(result)
        })
        console.log(caregiverData)
    }, []);

    return (
        <div>
            <TopBar />
            <NavBar />

            <Grid container justifyContent="center" style={{ 'marginTop': '5vh' }}>
                <Grid item xs={3}>
                    <ProfileCardCaregiver userData={userData} caregiverData={caregiverData}/>
                </Grid>
                <Grid item xs={8}>
                    <CaregiverProfileForm userData={userData} caregiverData={caregiverData}/>
                </Grid>
            </Grid>
        </div>
    );
}

export default ProfileCaregiver;
