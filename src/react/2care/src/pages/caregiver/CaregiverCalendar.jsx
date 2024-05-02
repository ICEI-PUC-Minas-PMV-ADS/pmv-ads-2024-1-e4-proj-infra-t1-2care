import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useNavigate } from "react-router-dom";
import { ptBR } from '@mui/x-date-pickers/locales';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { getUserData } from '../../services/userService';
import NavBar from '../../components/NavBar/NavBar'
import TopBar from '../../components/TopBar/TopBar'
import ProfileCardCaregiver from '../../components/Profile/ProfileCard/ProfileCardCaregiver'

function CaregiverCalendar() {
  const theme = useTheme();
  const [events, setEvents] = useState([]);
  const [userData, setUserData] = useState({});
  const [showFirstCalendar, setShowFirstCalendar] = useState(true);
  const [focusedDate, setFocusedDate] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {

    //da pra receber props e não fazer o request caso necessario, mas tem que parar de entrar em getUserData pq vai redirecionar.
    getUserData().then((result) => {
      result.user_type_display === "Caregiver" ? setUserData(result) : navigate('/')
    })
    

  }, []);

  useEffect(() => {
    document.title = 'Calendar';

    const dummyEvents = [ 
      {
        title: 'Unavilable',
        start: '2024-04-01',
        end: '2024-04-03',
        color: 'grey',
      },
      {
        title: 'Unavilable',
        start: '2024-04-05',
        end: '2024-04-07',
        color: 'grey',
      },
      {
        title: 'Unavilable',
        start: '2024-04-12T10:00:00',
        end: '2024-04-12T12:00:00',
        color: 'grey',
      },
      {
        title: 'Unavilable',
        start: '2024-04-13T13:00:00',
        end: '2024-04-13T15:00:00',
        color: 'grey',
      },
    ];

    setEvents(dummyEvents);
  }, []);

  return (
    <div className='App'>
      <TopBar></TopBar>
      <NavBar></NavBar>

      <Grid container justifyContent="center" style={{'marginTop': '5vh'}}>
        <Grid item xs={3}>
        <ProfileCardCaregiver  userData={userData}/>
        </Grid>
        <Grid item xs={8}>
          <Card>
            <CardHeader
              title="Dias e horários indisponiveis:"
            />
            <Box m={2}>
              {showFirstCalendar ? (

                <LocalizationProvider dateAdapter={AdapterDayjs} locale={ptBR} adapterLocale={ptBR}>
                  <DateCalendar onChange={handleDateChange} shouldDisableDate={disableDates}   style={{ border: '1px solid #ccc', backgroundColor: theme.palette.background.primary , borderRadius: '8px' }} />
                </LocalizationProvider>

              ) : (

                <Box m={4}>
                  <Button variant="contained" onClick={handleDateChange}>Voltar</Button>
                  <FullCalendar
                    initialDate={focusedDate}
                    plugins={[timeGridPlugin, interactionPlugin]}
                    initialView='timeGridWeek'
                    selectable={false}
                    businessHours={{
                      daysOfWeek: [1, 2, 3, 4, 5],
                      startTime: '08:00',
                      endTime: '18:00'
                    }}
                    //select={handleDateSelect}
                    events={events}
                    slotLabelFormat={{
                      hour: 'numeric',
                      minute: '2-digit',
                      omitZeroMinute: true,
                      hour12: false
                    }}
                    locale={ptBrLocale}
                  />
                </Box>

              )}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
  function handleDateChange(newDate) {
    setFocusedDate(new Date(newDate))
    setShowFirstCalendar(!showFirstCalendar);
  };
  //#function handleDateSelect(info) {
  //  console.log('Selected date:', info.startStr);
  //}
  function disableDates(date) {
    return date.toDate().getDay() === 0 || date.toDate().getDay() === 6;
  }
}

export default CaregiverCalendar;
