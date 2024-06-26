import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { useNavigate, useLocation } from "react-router-dom";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { getUserData, lo } from '../../services/userService';
import { isLoggedIn } from '../../services/authService';
import { getEvaluationData, getAllowedToEvaluate } from '../../services/caregiverService';
import NavBar from '../../components/NavBar/NavBar'
import TopBar from '../../components/TopBar/TopBar'
import RatingList from '../../components/Ratings/RatingList';
import ProfileCardCaregiver from '../../components/Profile/ProfileCard/ProfileCardCaregiver'

import EvaluationModal from '../../components/Profile/EvaluationModal';

function CaregiverEvaluations(props) {
  const theme = useTheme();
  const [userData, setUserData] = useState({});
  const [caregiverData, setCaregiverData] = useState({});
  const [evaluationData, setEvaluationData] = useState({});
  const [canEvaluate, setCanEvaluate] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const caregiverProps = location.state.caregiver

  useEffect(() => {
    document.title = 'Avaliações';

    if(caregiverProps?.caregiverData?.evaluations){

      setUserData(caregiverProps.userData)
      setEvaluationData(caregiverProps.caregiverData.evaluations)

      setCaregiverData(caregiverProps.caregiverData);
      if(isLoggedIn()){
        getAllowedToEvaluate(caregiverProps.caregiverData.id).then((result) => {
          setCanEvaluate(result)
        })
      }

    }else{

      getUserData().then((result) => {
        result.user_type_display === "Caregiver" ? setUserData(result) : navigate('/')
      })

      getEvaluationData().then((result) => {
        setEvaluationData(result)
      })
    }

  }, []);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div className='App'>
      <TopBar></TopBar>
      <NavBar></NavBar>

      <Grid container justifyContent="center" style={{'marginTop': '5vh'}}>
        <Grid item xs={3}>
          <ProfileCardCaregiver userData={userData} caregiverData={caregiverData}  isSelf={caregiverProps ? false : true}/>
        </Grid>
        <Grid item xs={8}>
          <Card sx={{ borderRadius: 4 }} style={{ height: '80vh', overflowY: 'auto' }}>
            <CardHeader
              title="Veja as avaliações feitas:"
              sx={{
                margin: '0.5em',
                marginBottom: 0,
                paddingBottom: 0,
                textAlign: 'left',
                color: theme.palette.primary.main,
                fontSize: '1.2rem',
                '& .MuiTypography-root': {
                  fontWeight: 500
                }
              }}
            />
            <Box m={2}>
                <RatingList evaluationdata={evaluationData}  userData={userData}/>
            </Box>
            <Box m={2}>
                {canEvaluate ? <Button
                    variant="contained"
                    onClick={handleOpenModal}
                    style={{
                      color: 'white',
                      backgroundColor: '#B65138',
                      borderRadius: '2em',
                      width: '15em',
                    }}
                  >
                    Avaliar
                  </Button> 
                : "" }
            </Box>
          </Card>
        </Grid>
      </Grid>
      <EvaluationModal caregiverId={caregiverProps?.caregiverData?.id} open={openModal} handleClose={handleCloseModal} />
    </div>
  );
}

export default CaregiverEvaluations;
