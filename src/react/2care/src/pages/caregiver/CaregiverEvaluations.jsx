import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { getUserData } from '../../services/userService';
import { getEvaluationData, getAllowedToEvaluate } from '../../services/caregiverService';
import NavBar from '../../components/NavBar/NavBar'
import TopBar from '../../components/TopBar/TopBar'
import RatingList from '../../components/Ratings/RatingList';
import ProfileCardCaregiver from '../../components/Profile/ProfileCard/ProfileCardCaregiver'

import EvaluationModal from '../../components/Profile/EvaluationModal';

function CaregiverEvaluations() {
  const theme = useTheme();
  const [userData, setUserData] = useState({});
  const [evaluationData, setEvaluationData] = useState({});
  const [canEvaluate, setCanEvaluate] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Avaliações';

    //da pra receber props e não fazer o request caso necessario, mas tem que parar de entrar em getUserData pq vai redirecionar.
    getUserData().then((result) => {
      result.user_type_display === "Caregiver" ? setUserData(result) : navigate('/')
      if(result["id"]){
        getAllowedToEvaluate(result["id"]).then((result) => {
          setCanEvaluate(result)
        })
      }
    })
    getEvaluationData().then((result) => {
      setEvaluationData(result)
    })

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
          <ProfileCardCaregiver  userData={userData}/>
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
      <EvaluationModal caregiverId={userData["id"]} open={openModal} handleClose={handleCloseModal} />
    </div>
  );
}

export default CaregiverEvaluations;
