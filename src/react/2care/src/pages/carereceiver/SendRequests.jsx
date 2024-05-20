import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import { toast } from 'react-toastify';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import NavBar from '../../components/NavBar/NavBar';
import TopBar from '../../components/TopBar/TopBar';
import { sendProposalToCaregiver } from '../../services/caregiverService';
import ProfileCardCaregiver from '../../components/Profile/ProfileCard/ProfileCardCaregiver';
import '../../components/CaregiverCard/CaregiverCard.css';

function SendRequests() {
  const theme = useTheme();
  const [caregiverData, setCaregiverData] = useState({});
  const [userData, setUserData] = useState({});
  const [selectedDate, setSelectedDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [totalHours, setTotalHours] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const caregiverProps = location.state?.caregiver

  useEffect(() => {
    document.title = 'Perfil';

    if (caregiverProps) {

      setUserData(caregiverProps.userData);
      setCaregiverData(caregiverProps.caregiverData);

    } else {
      navigate('/');
    }
  }, []);

  // Função para calcular o total de horas com base nas horas de início e fim
  const calculateTotalHours = () => {
    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);
    const hours = (end - start) / (1000 * 60 * 60);
    setTotalHours(parseFloat(hours.toFixed(2)) || 0);
  };

  // Efeito para recalcular as horas totais sempre que as horas de início ou fim mudarem
  useEffect(() => {
    calculateTotalHours();
  }, [startTime, endTime]);

  // Efeito para recalcular o pagamento total com base nas horas totais
  useEffect(() => {
    setTotalPayment(parseFloat((totalHours * caregiverProps.caregiverData.hour_price).toFixed(2)) || 0);
  }, [totalHours]);

  // Função para lidar com o envio do formulário
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    // Verifica se todos os campos necessários estão preenchidos
    if (!selectedDate || !startTime || !endTime) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    // Dados da proposta a serem enviados
    const proposalData = {
      date: selectedDate,
      startTime: startTime,
      endTime: endTime,
      caregiver: caregiverProps.caregiverData.id
    };

    try {
      sendProposalToCaregiver(proposalData).then(result => result ? toast.success('Proposta enviada com sucesso!',{onClose: () => {navigate("/requests");}, autoClose:1000}) : "");

    } catch (error) {
      console.error("Erro ao enviar proposta:", error);
      setError('Erro ao enviar proposta. Por favor, tente novamente mais tarde.');
    }
  };

  return (
    <div>
      <TopBar />
      <NavBar />

      <Grid container justifyContent="center" style={{ marginTop: '5vh' }}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Envie uma proposta
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <ProfileCardCaregiver userData={userData} caregiverData={caregiverData}  isSelf={caregiverProps ? false : true}/>
        </Grid>
        <Grid item xs={8}>
          
            <form onSubmit={handleSubmit}>
              <TextField
                label="Data"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  min: new Date().toISOString().split("T")[0], // Sets min date to today
                }}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Hora Inicial"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                onBlur={calculateTotalHours}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 3600,
                }}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Hora Final"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                onBlur={calculateTotalHours}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 3600,
                }}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Valor Total a Pagar"
                type="number"
                value={totalPayment}
                InputProps={{ readOnly: true }}
                fullWidth
                margin="normal"
              />
              {/* Mensagem de erro, se houver */}
   

              <Box display="flex" justifyContent="flex-end" mt={2}>
                <Button variant="contained" color="primary" type="submit">
                  Enviar Proposta
                </Button>
              </Box>
            </form>
        </Grid>
      </Grid>
    </div>
  );
}

export default SendRequests;
