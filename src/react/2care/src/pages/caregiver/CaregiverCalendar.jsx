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
import { getSelfCalendar } from '../../services/caregiverService';
import NavBar from '../../components/NavBar/NavBar'
import TopBar from '../../components/TopBar/TopBar'
import ProfileCardCaregiver from '../../components/Profile/ProfileCard/ProfileCardCaregiver'
import '../App.css';

function CaregiverCalendar() {
  const theme = useTheme();
  const [userData, setUserData] = useState({});
  const [showFirstCalendar, setShowFirstCalendar] = useState(true);
  const [focusedDate, setFocusedDate] = useState(new Date());
  const [unavailable, setUnavailable] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    //da pra receber props e não fazer o request caso necessario, mas tem que parar de entrar em getUserData pq vai redirecionar.
    getUserData().then((result) => {
      result.user_type_display === "Caregiver" ? setUserData(result) : navigate('/')
    })
    
    getSelfCalendar().then((result) => {
      setUnavailable(result ? result : {})
    })
  }, []);

  const isHourDisabled = (hour) => {
    const disableHours = (unavailable["fixed_unavailable_hours"] || [])
    return disableHours.some((h) => hour === h.hour);
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
                      daysOfWeek: [0, 1, 2, 3, 4, 5, 6].filter(i => {
                        return !(unavailable["fixed_unavailable_days"] || []).some(day => day.day === i);
                      }),
                      startTime: null,
                      endTime: null
                    }} 
                    slotLaneClassNames={(slotInfo) => {
                      //Gambiarra detected. 
                      const hour = slotInfo.date.getHours();
                      return isHourDisabled(hour) ? 'disabled-hour' : '';
                    }}
                    //select={handleDateSelect}
                    events={(unavailable["custom_unavailable_days"] || []).map(day => {
                      return {
                        title: 'Unavilable',
                        start: day.day+ "T00:00:00",
                        end: day.day + "T23:59:59", 
                        color: 'grey',
                      }
                    })}
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
    if (!unavailable) return false;

    const weekDayUnavailable = unavailable["fixed_unavailable_days"] || [];
    const customDayUnavailable = unavailable["custom_unavailable_days"] || [];
    const dayOfWeek = date.toDate().getDay();
    
    const isWeekDayUnavailable = weekDayUnavailable.some(day => day.day === dayOfWeek);
    const isCustomDayUnavailable = customDayUnavailable.some(day => day.day === date.toDate().toISOString().split('T')[0])
    
    return isWeekDayUnavailable || isCustomDayUnavailable;
}
}

export default CaregiverCalendar;
