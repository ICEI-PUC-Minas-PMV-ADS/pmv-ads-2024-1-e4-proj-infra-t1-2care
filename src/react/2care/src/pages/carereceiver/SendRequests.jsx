import React, { useState } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import TopBar from '../../components/TopBar/TopBar';
import ProfileCardCaregiver from '../../components/Profile/ProfileCard/ProfileCardCaregiver';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { format, parse } from 'date-fns';

function SendRequests() {
  const [selectedDate, setSelectedDate] = useState('');
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');
  const caregiverData = {
    name: 'Nome do Cuidador',
    picture: 'url_da_foto_do_cuidador.jpg',
  };
  const valorHora = 10; // o certo seria o valor que o cuidador cadastrou 

  const handleSendRequest = () => {
    console.log('Enviado com sucesso!');
  };

  const calculateTotalValue = (start, end, valuePerHour) => {
    const startTime = parse(start, 'HH:mm', new Date());
    let endTime = parse(end, 'HH:mm', new Date());

    if (endTime < startTime) {
      endTime = parse(end, 'HH:mm', new Date(new Date(selectedDate).getTime() + 24 * 60 * 60 * 1000));
    }

    const diffInMs = endTime - startTime;
    const diffInHours = diffInMs / (1000 * 60 * 60);

    return diffInHours * valuePerHour;
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleStartDateTimeChange = (e) => {
    setStartDateTime(e.target.value);
  };

  const handleEndDateTimeChange = (e) => {
    setEndDateTime(e.target.value);
  };

  return (
    <div>
      <TopBar />
      <NavBar />
      <Grid container justifyContent="center" style={{ marginTop: '5vh' }}>
        <Grid item xs={3}>
          <ProfileCardCaregiver userData={caregiverData} />
        </Grid>
        <Grid item xs={8}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <h2>Envie sua proposta</h2>
            <div>
              <label>Data:</label>
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </div>
            <div>
              <label>Hora Inicial:</label>
              <input
                type="time"
                value={startDateTime}
                onChange={handleStartDateTimeChange}
              />
            </div>
            <div>
              <label>Hora Final:</label>
              <input
                type="time"
                value={endDateTime}
                onChange={handleEndDateTimeChange}
              />
            </div>
            {selectedDate && startDateTime && endDateTime && (
              <div>
                <p>Data do envio da proposta: {format(new Date(), 'dd/MM/yyyy HH:mm')}</p>
                <p>Valor por hora: R${valorHora.toFixed(2)}</p>
                <p>Valor a pagar: R${calculateTotalValue(startDateTime, endDateTime, valorHora).toFixed(2)}</p>
                <Button variant="contained" onClick={handleSendRequest}>
                  Enviar Proposta
                </Button>
              </div>
            )}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default SendRequests;
