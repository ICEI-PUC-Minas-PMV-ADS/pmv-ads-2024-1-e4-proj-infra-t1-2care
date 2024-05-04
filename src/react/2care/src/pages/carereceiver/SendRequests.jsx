import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import NavBar from '../../components/NavBar/NavBar';
import TopBar from '../../components/TopBar/TopBar';
import { sendProposalToCaregiver } from '../../services/careReceiverService';
import CaregiverCard from '../../components/CaregiverCard/CaregiverCard';
import '../../components/CaregiverCard/CaregiverCard.css';

function SendRequests() {
  const theme = useTheme();
  const [selectedDate, setSelectedDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [totalHours, setTotalHours] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [error, setError] = useState('');

  // Função para lidar com a mudança de data
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  // Função para lidar com a mudança de hora inicial
  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  // Função para lidar com a mudança de hora final
  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

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
    setTotalPayment(parseFloat((totalHours * 20).toFixed(2)) || 0);
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
    };

    try {
      // Envia a proposta para o serviço do cuidador
      const response = await sendProposalToCaregiver(proposalData);
      console.log("Resposta da API:", response);
      console.log("Proposta enviada com sucesso!");
      // Adicione aqui qualquer manipulação de sucesso necessária, como redirecionar o usuário ou exibir uma mensagem de sucesso.
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
        <Grid item xs={12} md={10} lg={8}>
          <Typography variant="h5" gutterBottom>
            Envie uma proposta
          </Typography>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
            <CaregiverCard
              image="https://img.freepik.com/fotos-gratis/enfermeira-negra-em-seu-espaco-de-trabalho_52683-100571.jpg"
              name="Nome do Cuidador"
              showDescription={false}
              showName={true}
              especialization="Especialização do Cuidador"
            />
            <form onSubmit={handleSubmit} style={{ width: '50%' }}>
              <TextField
                label="Data"
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Hora Inicial"
                type="time"
                value={startTime}
                onChange={handleStartTimeChange}
                onBlur={calculateTotalHours}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300,
                }}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Hora Final"
                type="time"
                value={endTime}
                onChange={handleEndTimeChange}
                onBlur={calculateTotalHours}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300,
                }}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Total de Horas"
                type="number"
                value={totalHours}
                InputProps={{ readOnly: true }}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Valor da Hora"
                type="number"
                value={20} // Valor fixo de R$20,00 que será mudado quando eu conseguir pegar do cuidador
                InputProps={{ readOnly: true }}
                fullWidth
                margin="normal"
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
              {error && <Typography color="error">{error}</Typography>}
              <Button variant="contained" color="primary" type="submit">
                Enviar Proposta
              </Button>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default SendRequests;
